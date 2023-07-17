import SignUpForm from "../../components/sign-up-form/sign-up-form.component";
import SignInForm from "../../components/sign-in-form/sign-in-form.component";
import { MainSignInContainer } from './authentication.styles'

const Authentication = () => 
{
    return (
        <MainSignInContainer>
            <SignInForm/>
            <SignUpForm/>
        </MainSignInContainer>
    );
}

export default Authentication;