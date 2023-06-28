
import { auth,signInWithGooglePopup, createUserDocumentFromAuth, signInWithGoogleRedirect } from "../../utils/firebase/firebase.utils";
import { useEffect } from "react"; 
import { getRedirectResult } from 'firebase/auth'
import SignUpForm from "../../components/sign-up-form/sign-up-form.component";

const SignIn = () => 
{

    useEffect(() => {
        GetRedirectedResponse();
    }, [])

    const GetRedirectedResponse = async () => 
    {
        const response = await getRedirectResult(auth);
        if(response)
        {
            const userDocRef = createUserDocumentFromAuth(response.user);
        }
    }

    const logGoogleUser = async () => {
        const { user } = await signInWithGooglePopup();
        const userDocRef = createUserDocumentFromAuth(user);
    }

    


    return (
        <div>
            <h1>Sign In Page</h1> 
            <button type="button" onClick={logGoogleUser}>Sign In With Google</button>
            <button type="button" onClick={signInWithGoogleRedirect}>Sign In With Google Redirect</button>
            <SignUpForm/>
        </div>
    );
}

export default SignIn;