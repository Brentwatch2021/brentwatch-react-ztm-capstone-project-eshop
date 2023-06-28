import { createUserDocumentFromAuth, signInWithGooglePopup } from '../../utils/firebase/firebase.utils'
import './button.styles.scss'

const BUTTON_TYPE_CLASSES = {
        google: 'google-sign-in',
        inverted: 'inverted',
        email:'email-sign-in'
    }

const Button = ({children, buttonType, ...otherProps}) => {


    const signInWithGoogle = async () => {
        const { user } = await signInWithGooglePopup();
        await createUserDocumentFromAuth(user);
    }

    const handleGoogleSignIn = (event) => 
    {
        signInWithGoogle();
    }

    return(
        <button className={`button-container ${BUTTON_TYPE_CLASSES[buttonType]}`} {...otherProps}
        onClick={BUTTON_TYPE_CLASSES[buttonType] === 'google-sign-in' ? handleGoogleSignIn : null} >
            {children}
        </button>
    );
}

export default Button;