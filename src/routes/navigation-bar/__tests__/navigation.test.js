import * as reactRedux from 'react-redux';
import { screen,fireEvent } from '@testing-library/react';
import NavigationBar from '../navigation-bar.component';
import { renderWithProviders } from '../../../utils/test-utils';
import { SignOutStart} from '../../../store/user/user.action';

describe('Navigation tests', () => {
    
    test('It should render a Sign In link if there is no currentUser', () => {
        renderWithProviders(<NavigationBar/>, {
            preloadedState: {
                user: {
                    currentUser: null,
                },
            },
        });

        const signInLinkElement = screen.getByText(/sign in/i);
        expect(signInLinkElement).toBeInTheDocument();

    });


    test('It should not render Sign in if there is a current user', () => {
        renderWithProviders(<NavigationBar/>, {
            preloadedState: {
                user: {
                    currentUser:{}
                },
            },
        });

        // When checking if item is present use querybytext
        expect(screen.queryByText('SIGN IN')).toBeNull();

    });

    test('It should render Sign Out if there is a currentUser', () => {
        renderWithProviders(<NavigationBar />, {
            preloadedState: {
                user: {
                    currentUser:{},
                },
            },
        });

        expect(screen.getByText('SIGN OUT')).toBeInTheDocument();


    });


    test('It Should render cart dropdown if isCartOpen is true', () => {
        renderWithProviders(<NavigationBar/> , {
            preloadedState:{
                cart:{
                    isCartOpen:true,
                    cartItems:[],
                },
            },
        });


        expect(screen.getByText(/your cart is empty/i)).toBeInTheDocument()
    });

    test('It should not render a cart dropdown if isCartOpen is false', () => {
        renderWithProviders(<NavigationBar/> , {
            preloadedState:{
                cart:{
                    isCartOpen:false,
                    cartItems:[],
                },
            },
        });


        expect(screen.queryByText('Your cart is empty')).toBeNull();
    });


    test('It should dispatch signOutStart action when clicking on the Sign Out link', async () => {
        const mockDispatch = jest.fn();
        jest.spyOn(reactRedux, 'useDispatch').mockReturnValue(mockDispatch);
    
        renderWithProviders(<NavigationBar />, {
          preloadedState: {
            user: {
              currentUser: {},
            },
          },
        });
    
        expect(screen.getByText('SIGN OUT')).toBeInTheDocument();
    
        await fireEvent.click(screen.getByText('SIGN OUT'));
    
        expect(mockDispatch).toHaveBeenCalled();
        expect(mockDispatch).toHaveBeenCalledWith(signOutStart());
    
        mockDispatch.mockClear();
      });








});

