import { Link, Outlet } from 'react-router-dom';
import './navigation-bar.styles.scss'
import { Fragment, useContext } from 'react';
import { ReactComponent as CrwnLogo } from '../../assets/crown.svg'
import { UserContext } from '../../contexts/user.context';
import { signOutUser } from '../../utils/firebase/firebase.utils';


const NavigationBar = () => {
    // This will caus a rerender when 
    // the user context is updated from the sign in
    const { currentUser } = useContext(UserContext)
    
    const signOutHandler = async (event) => 
    {
        await signOutUser();
    }

    return (
    <Fragment>
            <div className='navigation'>
                <Link className='logo-container' to='/'>
                    <CrwnLogo/>
                </Link>
                <div className='nav-links-container'>
                   {currentUser ? (
                         <span className='nav-link' onClick={signOutHandler}>SIGN OUT</span>
                    ) : (
                        <Link className='nav-link' to='/auth'>
                    Sign In
                    </Link>
                    ) 
                }

                    <Link className='nav-link' to='/shop'>
                        SHOP
                    </Link>
                </div>
            </div>
        <Outlet/>
    </Fragment>
    );
}

export default NavigationBar;