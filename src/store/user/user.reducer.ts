import {USER_ACTION_TYPES} from './user.types';
import { UserData } from '../../utils/firebase/firebase.utils';
import { AnyAction } from 'redux';
import { signInFailed, signInSuccess, signOutFailed, signOutSuccess, signUpFailed } from './user.action';

export type UserState = {
    readonly currentUser:UserData | null;
    readonly isLoading:Boolean;
    readonly error:Error | null;
}

export const USER_INITIAL_STATE:UserState = {
    currentUser: null,
    isLoading: false,
    error:null,
}

// the root reducer runs through all the reducer actions 
// hence why at the end of each reducer we should by default 
// return the original state
export const userReducer = (state = USER_INITIAL_STATE, action:AnyAction) => {
    
    if(signInSuccess.match(action))
    {
        return { ...state, currentUser: action.payload }
    }

    if(signOutSuccess.match(action))
    {
        return { ...state, currentUser: null }
    }

    if(signUpFailed.match(action) || 
    signOutFailed.match(action) || 
    signInFailed.match(action))
    {
        return { ...state, error: action.payload };  
    }

    return state;
}