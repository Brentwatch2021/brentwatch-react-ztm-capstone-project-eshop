import { Link, Outlet } from 'react-router-dom';
import './navigation-bar.styles.scss'
import { Fragment } from 'react';
import { ReactComponent as CrwnLogo } from '../../assets/crown.svg'

const NavigationBar = () => {
    return (
    <Fragment>
            <div className='navigation'>
                <Link className='logo-container' to='/'>
                    <CrwnLogo/>
                </Link>
                <div className='nav-links-container'>
                    <Link className='nav-link' to='/sign-in'>
                        Sign In
                    </Link>
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