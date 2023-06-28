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
            if(error.code === 'auth/email-already-in-use')
            {
                alert('Error unable to create user. Email already in use');
            }
            else
            {
                console.log(`user creation encountered an error ${error}`);
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