import { useContext, useState } from 'react';

import FormInput from '../form-input/form-input.component';
import Button, { BUTTON_TYPE_CLASSES } from '../button/button.component';
import { UserContext } from '../../contexts/user.context';

import {
  signInAuthUserWithEmailAndPassword,
  signInWithGooglePopup,
} from '../../utils/firebase/firebase.utils';

import './sign-in-form.styles.scss';

const defaultFormFields = {
  email: '',
  password: '',
};

const SignInForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;
  


  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const signInWithGoogle = async () => {
    await signInWithGooglePopup();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const { user} = await signInAuthUserWithEmailAndPassword(email, password);
      resetFormFields();
    } catch (error) 
    {
        switch (error.code) 
        {
          case 'auth/app-deleted':
            alert('Unable to authenicate project unavailable from firebase.');
            break;
          case 'auth/app-not-authorized':
            alert('This app is not authorized');
            break;
          case 'auth/argument-error':
            alert('Argument Error.');
            break;
          case 'auth/invalid-api-key':
            alert('Invalid API Key.');
            break;
          case 'auth/invalid-user-token':
            alert('Invalid user token.');
            break;
          case 'auth/network-request-failed':
            alert('Network error.');
            break;
          case 'auth/requires-recent-login':
            alert('A sensitive operation has commenced please sign in again for the operation to complete.');
            break;
          case 'auth/user-disabled':
            alert('The user has been disabled.');
            break;
          case 'auth/user-not-found':
            alert('User not found.');
            break;
          case 'auth/wrong-password':
            alert('Wrong password please try again.');
            break;
          case 'auth/email-already-in-use':
            alert('Email already in use.');
            break;
          case 'auth/weak-password':
            alert('Weak Password.');
            break;
          default:
            alert('An unknown error occurred.');
            break;
        }
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormFields({ ...formFields, [name]: value });
  };

  return (
    <div className='sign-in-container'>
      <h2>Already have an account?</h2>
      <span>Sign in with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label='Email'
          type='email'
          required
          onChange={handleChange}
          name='email'
          value={email}
        />

        <FormInput
          label='Password'
          type='password'
          required
          onChange={handleChange}
          name='password'
          value={password}
        />
        <div className='sign-in-form-submit-buttons-container'>
          <Button type='submit'>Sign In</Button>
          <Button 
            buttonType={BUTTON_TYPE_CLASSES.google}
            type='button'
            onClick={signInWithGoogle}
          >
            Sign In With Google
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SignInForm;