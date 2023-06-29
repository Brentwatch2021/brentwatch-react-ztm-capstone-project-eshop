import { useState } from "react";
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils"; 
import FormInput from '../form-input/form-input.component'
import FormInputAlt from "../form-input/form-input-alt.component";
import './sign-up-form.styles.scss'
import Button from "../button/button.component";


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


    const resetFormFields = () => 
    {
        setFormFields(defaultformFields);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        if(password !== confirmPassword)
        {
            alert("passwords do not match");
            return;
        }

        try
        {
            const { user } = await createAuthUserWithEmailAndPassword(email,password);
            await createUserDocumentFromAuth(user, { displayName });
            resetFormFields();
        }
        catch(error)
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

        // confirm that passwords matches
        // if(password === confirmPassword)
        // {   
        //     // check if the user is
        //     // authenticated with email and password
        //     if(isUserAuthenticated(email,password))
        //     {

        //     }
        // }
        // else
        // {
        //     alert("Passwords do not match");
        //     return
        // }
        
        // create a user document from 

    }

    const handleChange = (event) => 
    {
        const { name, value } = event.target;

        setFormFields({
            ...formFields,
            [name]:value
        })
    }

    return(
        <div className="sign-up-container">
            <h2>Don't have an account?</h2>
            <span>Sign up with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput label='Display Name'name="displayName" 
                 type="text" required onChange={handleChange}
                  value={displayName}/>

                {/* Alteratve way is also to do input options */}
                {/* <FormInputAlt label='Display Name' inputOptions=
                {{
                    name:'displayName',
                    type: 'text', 
                    required: true,
                    onChange: handleChange,
                    value:displayName
                }}/> */}


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
        </div>
    );
}

export default SignUpForm;