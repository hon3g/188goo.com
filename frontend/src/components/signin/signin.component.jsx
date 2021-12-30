import { useState, useRef } from 'react';
import { Input, Button, message, Alert } from 'antd';
import ReactCodeInput from 'react-verification-code-input';

import { connect } from 'react-redux';
import { setSignInDrawerVisible } from '../../redux/signin-drawer/signin-drawer.actions';
import { setAccountDrawerVisible } from '../../redux/account-drawer/account-drawer.actions';

import { auth } from '../../firebase/firebase';
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';

import usFlag from '../../assets/us.png';

import './signin.styles.scss';

export function formatPhoneNumber(value) {
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

export function isValidPhoneNum(phoneNum) {
  // Check (NXX) NXX-XXXX, N=digits 2–9, X=digits 0–9
  const regex = new RegExp(/\([2-9]\d\d\) [2-9]\d\d-\d{4}/);
  if (!regex.test(phoneNum)) return false;
  // Check for at least 3 distinct numbers
  const set = new Set(phoneNum.replace(/[^\d]/g, ''));
  if (set.size <= 3) return false;

  return true;
}

function SignIn({ inputRef, setSignInDrawerVisible, setAccountDrawerVisible }) {
  const [inputValue, setInputValue] = useState('');
  const recaptchaVerifierRef = useRef();
  const [confirmationResult, setConfirmationResult] = useState();
  const [phoneNumUI, setPhoneNumUI] = useState(true);
  const [errMsg, setErrMsg] = useState(false);

  const getOTP = () => {
    if (!isValidPhoneNum(inputValue)) {
      setErrMsg('号码格式不正确');
      return;
    }
    setErrMsg(false);
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
      .catch(() => {
        // Error; SMS not sent
        alert('验证码未能发送, 请稍后再尝试');
        setSignInDrawerVisible(false);
      });
  };

  const confirmCode = (code) => {
    if (!confirmationResult) return;

    confirmationResult
      .confirm(code)
      .then(() => {
        // User signed in successfully.
        setSignInDrawerVisible(false);
        message.success('登陆成功!');
      })
      .catch(() => {
        // User couldn't sign in (bad verification code?)
        setErrMsg('验证码不正确');
      });
  };

  const handlePhoneNumInput = (e) => {
    // this is where we'll call the phoneNumberFormatter function
    const formattedPhoneNumber = formatPhoneNumber(e.target.value);
    // we'll set the input value using our setInputValue
    setInputValue(formattedPhoneNumber);
  };

  return (
    <form className='signin-form' onSubmit={(e) => e.preventDefault()}>
      {phoneNumUI ? (
        <div>
          <h2>输入您的手机号码</h2>
          <br />
          <Input
            ref={inputRef}
            size='large'
            prefix={[<img src={usFlag} alt='' className='us-flag'/>, '+1']}
            type='tel'
            pattern='[0-9]*'
            onChange={handlePhoneNumInput}
            value={inputValue}
            onPressEnter={getOTP}
          />
          <br />
          <br />
          <div className='get-code-button'>
            <Button type='primary' size='large' loading={false} onClick={getOTP}>
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
      {errMsg ? <Alert message={errMsg} type='error' showIcon /> : null}
      <div id='recaptcha' />
    </form>
  );
}

const mapDispatchToProps = (dispatch) => ({
  setSignInDrawerVisible: (visible) =>
    dispatch(setSignInDrawerVisible(visible)),
  setAccountDrawerVisible: (visible) =>
    dispatch(setAccountDrawerVisible(visible)),
});

export default connect(null, mapDispatchToProps)(SignIn);
