//import { takeLatest, put, all, call } from 'redux-saga/effects'
import { takeLatest, call, put, all } from 'typed-redux-saga/macro';


import  {USER_ACTION_TYPES}  from './user.types'

import { signInSuccess, signInFailed, signupSuccess, signOutFailed, signOutSuccess, EmailSignInStart, SignUpStart, SignUpSuccess } from './user.action';


import { AdditionalInformation, createAuthUserWithEmailAndPassword, createUserDocumentFromAuth, getCurrentUser, signInAuthUserWithEmailAndPassword, signInWithGooglePopup, signOutUser } from '../../utils/firebase/firebase.utils';
import { User } from 'firebase/auth';



export function* getUserSnapshotFromUserAuth(userAuth:User,additionalInformation?:AdditionalInformation)
{
  try
  {
    const userSnapshot = yield*  call(createUserDocumentFromAuth,userAuth,additionalInformation);
    if(userSnapshot)
    yield*  put(signInSuccess({id: userSnapshot.id, ...userSnapshot.data()}))
  }
  catch(error)
  {
    yield* put(signInFailed(error as Error));
  }
}


export function* isUserAuthenticated() {
    try{
        const userAuth = yield* call(getCurrentUser);
        if(!userAuth) return;
        yield* call(getUserSnapshotFromUserAuth,userAuth);
    }
    catch(error)
    {
      yield* put(signInFailed(error as Error));
    }
}



export function* Email_And_Password_SignIn({ payload: { email, password }}:EmailSignInStart)
{
  try
  {
    const  UserCredential  = yield* call(signInAuthUserWithEmailAndPassword,email,password);
    if(UserCredential)
    {
      const { user } = UserCredential;
      yield* call(getUserSnapshotFromUserAuth,user)
    }
    
  }
  catch(error)
  {
    yield* put(signInFailed(error as Error));
  }
}


export function* Google_Sign_In()
{
  try 
  {
    const { user } = yield* call(signInWithGooglePopup);
    yield* call(getUserSnapshotFromUserAuth,user);
  }
  catch(error)
  {
    yield* put(signInFailed(error as Error));
  }
}

export function* Sign_Up({ payload: {email,password,displayName}}:SignUpStart)
{
  try
  {
    const  UserCredential  = yield* call(createAuthUserWithEmailAndPassword,email,password);
    // dispatch signUpSuccess once user has been created and add the display
    // name as additonal information
    if(UserCredential)
    {
      const { user } = UserCredential;
      yield* put(signupSuccess(user,{displayName}));
    }
  }
  catch(error)
  {
    yield* put(signOutFailed(error as Error))
  } 
}

export function* SignInAfterSignUp({payload:{user,additionalDetails}}:SignUpSuccess)
{
  try 
  {
    yield* call(getUserSnapshotFromUserAuth,user,additionalDetails);
  }
  catch(error)
  {
    yield* put(signInFailed(error as Error))
  }
}

export function* SignOut()
{
  try 
  {
    yield* call(signOutUser)
    yield* put(signOutSuccess())
  }
  catch(error)
  {
    put(signOutFailed(error as Error))
  }
}

export function* onCheckUserSession() {
    yield* takeLatest(USER_ACTION_TYPES.CHECK_USER_SESSION, isUserAuthenticated)
}

export function* onEmailAndPasswordSignIn()
{
    yield* takeLatest(USER_ACTION_TYPES.EMAIL_SIGN_IN_START, Email_And_Password_SignIn)
}

export function* onGoogleSignIn()
{
  yield* takeLatest(USER_ACTION_TYPES.GOOGLE_SIGN_IN_START, Google_Sign_In);
}

export function* onSignUp()
{
  yield* takeLatest(USER_ACTION_TYPES.SIGN_UP_START, Sign_Up)
}

export function* onSignInAfterSignUp()
{
  yield* takeLatest(USER_ACTION_TYPES.SIGN_UP_SUCCESS, SignInAfterSignUp)
}

export function* onSignOut()
{
  yield* takeLatest(USER_ACTION_TYPES.SIGN_OUT_START,SignOut);
}

export function* userSagas()
{
    yield* all([call(onCheckUserSession),
      call(onEmailAndPasswordSignIn),
      call(onGoogleSignIn),
      call(onSignUp),
      call(onSignInAfterSignUp),
      call(onSignOut)])
}

