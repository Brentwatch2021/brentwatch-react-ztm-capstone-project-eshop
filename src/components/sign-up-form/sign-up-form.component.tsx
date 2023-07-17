import { ChangeEvent, FormEvent, useState } from "react";
import FormInput from '../form-input/form-input.component'
import { SignUpContainer } from './sign-up-form.styles'
import Button from "../button/button.component";
import { useDispatch } from "react-redux";
import { signUpStart } from "../../store/user/user.action";
import { AuthError, AuthErrorCodes } from "firebase/auth";


const defaultformFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
}

const SignUpForm = () => 
{
    const [formFields, setFormFields] = useState(defaultformFields);
    const {  displayName, email,password, confirmPassword } = formFields;
    const dispatch = useDispatch();

    const resetFormFields = () => 
    {
        setFormFields(defaultformFields);
    }

    const handleSubmit = async (event:FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if(password !== confirmPassword)
        {
            alert("passwords do not match");
            return;
        }

        try
        {
            //const { user } = await createAuthUserWithEmailAndPassword(email,password);
            dispatch(signUpStart(email,password,displayName));
            //await createUserDocumentFromAuth(user, { displayName });
            resetFormFields();
        }
        catch(error)
        {
            const errorCode = (error as AuthError).code;
            switch (errorCode) 
            {
                case AuthErrorCodes.APP_NOT_INSTALLED:
                    alert('Unable to Sign Up: App not installed.');
                    break;
                case AuthErrorCodes.APP_NOT_AUTHORIZED:
                    alert('Unable to Sign Up: This app is not authorized');
                    break;
                case AuthErrorCodes.ARGUMENT_ERROR:
                    alert('Unable to Sign Up: Arguments Error.');
                    break;
                case AuthErrorCodes.INVALID_API_KEY:
                    alert('Unable to Sign Up: Invalid API Key.');
                    break;
                case AuthErrorCodes.INVALID_CUSTOM_TOKEN:
                    alert('Unable to Sign Up: Invalid custom token.');
                    break;
                case AuthErrorCodes.NETWORK_REQUEST_FAILED:
                    alert('Unable to Sign Up: Network error.');
                    break;
                case AuthErrorCodes.INVALID_SESSION_INFO:
                    alert('Unable to Sign Up: A sensitive operation has commenced please sign in again for the operation to complete.');
                    break;
                case AuthErrorCodes.EMAIL_EXISTS:
                    alert('Unable to Sign Up: Email already in use.');
                    break;
                case AuthErrorCodes.WEAK_PASSWORD:
                    alert('Unable to Sign Up:  Weak Password.');
                    break;
                default:
                    alert('Unable to Sign Up: An unknown error occurred.');
                    break;
            }
        }
    }

    const handleChange = (event:ChangeEvent<HTMLInputElement>) => 
    {
        const { name, value } = event.target;

        setFormFields({
            ...formFields,
            [name]:value
        })
    }

    return(
            <SignUpContainer>
            <h2>Don't have an account?</h2>
            <span>Sign up with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput label='Display Name'name="displayName" 
                 type="text" required onChange={handleChange}
                  value={displayName}/>

                <FormInput label='Email' name="email" 
                type="email" required onChange={handleChange} 
                value={email}/>

                <FormInput label='Password' name="password" 
                type="password" required onChange={handleChange} 
                value={password}/>

                <FormInput label='Confirm Password' name="confirmPassword" 
                type="password" required onChange={handleChange} 
                value={confirmPassword}/>
                
                <Button type="submit">Sign Up</Button>
            </form>
            </SignUpContainer>
    );
}

export default SignUpForm;