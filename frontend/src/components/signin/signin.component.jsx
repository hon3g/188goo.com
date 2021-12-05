import { useState, useEffect, useRef } from 'react';
import { Input, Button } from 'antd';
import ReactCodeInput from 'react-verification-code-input';

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

function SignIn({ inputRef }) {
  const [inputValue, setInputValue] = useState('');
  const recaptchaVerifierRef = useRef();
  const [confirmationResult, setConfirmationResult] = useState();

  useEffect(() => {
    if (recaptchaVerifierRef.current) return;
    recaptchaVerifierRef.current = new RecaptchaVerifier(
      'invisible-recaptcha',
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
  });

  const onSignInSubmit = () => {
    signInWithPhoneNumber(
      auth,
      '+1(650) 555-3434',
      recaptchaVerifierRef.current
    )
      .then((confirmationResult) => {
        // SMS sent. Prompt user to type the code from the message, then sign the
        // user in with confirmationResult.confirm(code).
        setConfirmationResult(confirmationResult);
      })
      .catch((error) => {
        // Error; SMS not sent
        console.log(error.message);
      });
  };

  const confirmCode = (code) => {
    console.log(code);
    confirmationResult
      .confirm(code)
      .then((result) => {
        // User signed in successfully.
        const user = result.user;
        console.log(user);
      })
      .catch((error) => {
        // User couldn't sign in (bad verification code?)
        console.log(error.message);
      });
  };

  const handleInput = (e) => {
    // this is where we'll call the phoneNumberFormatter function
    const formattedPhoneNumber = formatPhoneNumber(e.target.value);
    // we'll set the input value using our setInputValue
    setInputValue(formattedPhoneNumber);
  };

  return (
    <form>
      <div>输入您的手机号码</div>
      <br />
      <Input
        ref={inputRef}
        size='large'
        placeholder='手机号码'
        prefix='🇺🇸 +1'
        onChange={(e) => handleInput(e)}
        value={inputValue}
      />
      <br />
      <br />
      <div className='code-input'>
        <ReactCodeInput
          fieldWidth={54}
          fieldHeight={45}
          onComplete={confirmCode}
        />
      </div>
      <br />
      <div className='get-code-button'>
        <Button id='invisible-recaptcha' type='primary' ghost loading={false}>
          换取验证码
        </Button>
      </div>
    </form>
  );
}

export default SignIn;
