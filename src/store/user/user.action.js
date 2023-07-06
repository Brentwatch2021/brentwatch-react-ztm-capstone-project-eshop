import { createAction } from '../../utils/reducer/reducer.utils'
import USER_ACTION_TYPES from './user.types'

export const setCurrentUser = (user) => 
        createAction(USER_ACTION_TYPES.SET_CURRENT_USER, user);

//     CHECK_USER_SESSION: 'user/CHECK_USER_SESSION',
//     GOOGLE_SIGN_IN_START: 'user/GOOGLE_SIGN_IN_START',
//     EMAIL_SIGN_IN_START: 'user/SIGN_IN_START',
//     SIGN_IN_SUCCESS: 'user/SIGN_IN_SUCCESS',
//     SIGN_IN_FAILURE: 'user/SIGN_IN_FAILURE',

export const checkUserSession = () => createAction(USER_ACTION_TYPES.CHECK_USER_SESSION);

export const googleSignInStart = () => createAction(USER_ACTION_TYPES.GOOGLE_SIGN_IN_START);

export const emailSignInStart = (email,password) => createAction(USER_ACTION_TYPES.EMAIL_SIGN_IN_START, {email,password});

export const signinSuccess = (user) => createAction(USER_ACTION_TYPES.SIGN_IN_SUCCESS, user);

export const signInFailed = (error) => createAction(USER_ACTION_TYPES.SIGN_IN_FAILED, error);

export const signUpStart = (email,password,displayName) => createAction(USER_ACTION_TYPES.SIGN_UP_START, { email,password,displayName });

export const signupSuccess = (user, additionalInformation) => createAction(USER_ACTION_TYPES.SIGN_UP_SUCCESS, {user, additionalInformation})

export const signUpFailed = (error) => createAction(USER_ACTION_TYPES.SIGN_UP_START, error);

export const signOutStart = () => createAction(USER_ACTION_TYPES.SIGN_OUT_START);

export const signOutSuccess = () => createAction(USER_ACTION_TYPES.SIGN_OUT_SUCCESS);

export const signOutFailed = () => createAction(USER_ACTION_TYPES.SIGN_OUT_FAILED);


