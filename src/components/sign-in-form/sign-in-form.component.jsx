import { useState } from "react";
import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";
import './sign-in-form.styles.scss'
import { signInAuthUserWithEmailAndPassword } from "../../utils/firebase/firebase.utils";

const defaultFormFields = {
    email:'',
    password:''
}

const SignInForm = () => {

    const [formFields, setFormFields] = useState(defaultFormFields); 
    const { email,password } = formFields;


    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    const handleSignin = async (event) => {
        event.preventDefault();
        
        try 
        {
            const response = await signInAuthUserWithEmailAndPassword(email,password);
            console.log(response);
            resetFormFields();
        }
        catch(error)
        {
            if(error.name === 'FirebaseError')
            {
                switch(error.code)
                {
                    case 'auth/wrong-password':
                        alert('Wrong password try again');
                    break;
                    case 'auth/too-many-requests':
                        alert('Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later.');        
                    break;
                    case 'auth/user-not-found':
                        alert('User not found');        
                    break;
                    default:
                        console.log(error);
                }
            }
            else
            {
                console.log(error)
            }
            
            
        }
        

    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormFields({
            ...formFields,
            [name]:value
        })
    }


    return (
        <div>
            <h2>I already have an Account</h2>
            <span>Sign in with your email and password</span>
            <form onSubmit={handleSignin}>
                <FormInput label='Email'name="email" 
                 type="text" required onChange={handleChange}
                  value={email}/>

                <FormInput label='Password'name="password" 
                 type="password" required onChange={handleChange}
                  value={password}/>
                <div className="sign-in-form-submit-buttons-container">
                    <Button type='submit' buttonType='email' email={email} password={password}>Sign in</Button>
                    <Button type='button' buttonType='google'>Sign in with google</Button>
                </div>
            </form>
        </div>
    );
}

export default SignInForm;