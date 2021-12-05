import { useState, useRef } from 'react';
import { Input, Button, message, Alert } from 'antd';
import ReactCodeInput from 'react-verification-code-input';

import { connect } from 'react-redux';
import { setSignInDrawerVisible } from '../../redux/signin-drawer/signin-drawer.actions';

import { auth } from '../../firebase/firebase';
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';

import './signin.styles.scss';

function formatPhoneNumber(value) {
  // if input value is falsy eg if the user deletes the input, then just return
  if (!value) return value;

  // clean the input for any non-digit values.
  const phoneNumber = value.replace(/[^\d]/g, '');

  // phoneNumberLength is used to know when to apply our formatting for the phone number
  const phoneNumberLength = phoneNumber.length;

  // we need to return the value with no formatting if its less then four digits
  // this is to avoid weird behavior that occurs if you  format the area code to early
  if (phoneNumberLength < 4) return phoneNumber;

  // if phoneNumberLength is greater than 4 and less the 7 we start to return
  // the formatted number
  if (phoneNumberLength < 7) {
    return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`;
  }

  // finally, if the phoneNumberLength is greater then seven, we add the last
  // bit of formatting and return it.
  return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(
    3,
    6
  )}-${phoneNumber.slice(6, 10)}`;
}

function SignIn({ inputRef, setSignInDrawerVisible }) {
  const [inputValue, setInputValue] = useState('');
  const recaptchaVerifierRef = useRef();
  const [confirmationResult, setConfirmationResult] = useState();
  const [phoneNumUI, setPhoneNumUI] = useState(true);

  const getOTP = () => {
    if (inputValue.length !== 14) return;

    setPhoneNumUI(false);
    recaptchaVerifierRef.current = new RecaptchaVerifier(
      'recaptcha',
      {
        size: 'invisible',
        callback: () => {
          // reCAPTCHA solved, allow signInWithPhoneNumber.
          onSignInSubmit();
        },
      },
      auth
    );
    recaptchaVerifierRef.current.render();
    recaptchaVerifierRef.current.verify();
  };

  const onSignInSubmit = () => {
    console.log('inputValue: ' + inputValue);
    signInWithPhoneNumber(
      auth,
      `+1 ${inputValue}`,
      recaptchaVerifierRef.current
    )
      .then((confirmationResult) => {
        // SMS sent. Prompt user to type the code from the message, then sign the
        // user in with confirmationResult.confirm(code).
        setConfirmationResult(confirmationResult);
      })
      .catch((error) => {
        // Error; SMS not sent
        console.log('SMS not sent: ' + error.message);
      });
  };

  const confirmCode = (code) => {
    confirmationResult
      .confirm(code)
      .then((result) => {
        // User signed in successfully.
        setSignInDrawerVisible(false);
        message.success('登陆成功!', 5);
        const user = result.user;
        console.log(user);
      })
      .catch((error) => {
        // User couldn't sign in (bad verification code?)
        console.log("User couldn't sign in: " + error.message);
      });
  };

  const handleInput = (e) => {
    // this is where we'll call the phoneNumberFormatter function
    const formattedPhoneNumber = formatPhoneNumber(e.target.value);
    // we'll set the input value using our setInputValue
    setInputValue(formattedPhoneNumber);
  };

  return (
    <form className='signin-form'>
      {phoneNumUI ? (
        <div>
          <h2>输入您的手机号码</h2>
          <br />
          <Input
            ref={inputRef}
            size='large'
            placeholder='手机号码'
            prefix='🇺🇸 +1'
            onChange={(e) => handleInput(e)}
            value={inputValue}
            onPressEnter={getOTP}
          />
          <br />
          <br />
          <div className='get-code-button'>
            <Button type='primary' ghost loading={false} onClick={getOTP}>
              换取验证码
            </Button>
          </div>
        </div>
      ) : (
        <div>
          <h2>输入6位数验证码</h2>
          <br />
          <div className='code-input'>
            <ReactCodeInput
              fieldWidth={54}
              fieldHeight={45}
              onComplete={confirmCode}
            />
          </div>
        </div>
      )}
      <br />
      {/* <Alert message='Error' type='error' showIcon /> */}
      <div id='recaptcha' />
    </form>
  );
}

const mapDispatchToProps = (dispatch) => ({
  setSignInDrawerVisible: (visible) =>
    dispatch(setSignInDrawerVisible(visible)),
});

export default connect(null, mapDispatchToProps)(SignIn);
