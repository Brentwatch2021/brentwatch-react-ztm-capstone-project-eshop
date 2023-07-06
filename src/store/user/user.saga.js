import { takeLatest, put, all, call } from 'redux-saga/effects'

import  USER_ACTION_TYPES  from './user.types'

import { signinSuccess, signInFailed, signupSuccess, signOutFailed, signOutSuccess } from './user.action';


import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth, getCurrentUser, signInAuthUserWithEmailAndPassword, signInWithGooglePopup, signOutUser } from '../../utils/firebase/firebase.utils';



export function* getUserSnapshotFromUserAuth(userAuth,additionalInformation)
{
  try
  {
    const userSnapshot = yield call(createUserDocumentFromAuth,userAuth,additionalInformation);
    yield put(signinSuccess({id: userSnapshot.id, ...userSnapshot.data()}))
  }
  catch(error)
  {
    yield put(signInFailed,error);
  }
}


export function* isUserAuthenticated() {
    try{
        const userAuth = yield call(getCurrentUser);
        if(!userAuth) return;
        yield call(getUserSnapshotFromUserAuth,userAuth);
    }
    catch(error)
    {
      yield put(signInFailed,error);
    }
}



export function* Email_And_Password_SignIn({ payload: { email, password }})
{
  try
  {
    const { user } = yield call(signInAuthUserWithEmailAndPassword,email,password);
    yield call(getUserSnapshotFromUserAuth,user)
  }
  catch(error)
  {
    yield put(signInFailed(error));
  }
}


export function* Google_Sign_In()
{
  try 
  {
    const { user } = yield call(signInWithGooglePopup);
    yield call(getUserSnapshotFromUserAuth,user);
  }
  catch(error)
  {
    yield put(signInFailed(error));
  }
}

export function* Sign_Up({ payload: {email,password,displayName}})
{
  const { user } = yield call(createAuthUserWithEmailAndPassword,email,password);
  // create signInafter action with userAuth and display name dispatching signUpSuccess
  yield put(signupSuccess(user,{displayName}));
}

export function* SignInAfterSignUp({payload:{user,additionalInformation}})
{
  try 
  {
    yield call(getUserSnapshotFromUserAuth,user,additionalInformation);
  }
  catch(error)
  {
    yield put(signInFailed(error))
  }
}

export function* SignOut()
{
  try 
  {
    yield call(signOutUser)
    yield put(signOutSuccess())
  }
  catch(error)
  {
    put(signOutFailed(error))
  }
}

export function* onCheckUserSession() {
    yield takeLatest(USER_ACTION_TYPES.CHECK_USER_SESSION, isUserAuthenticated)
}

export function* onEmailAndPasswordSignIn()
{
    yield takeLatest(USER_ACTION_TYPES.EMAIL_SIGN_IN_START, Email_And_Password_SignIn)
}

export function* onGoogleSignIn()
{
  yield takeLatest(USER_ACTION_TYPES.GOOGLE_SIGN_IN_START, Google_Sign_In);
}

export function* onSignUp()
{
  yield takeLatest(USER_ACTION_TYPES.SIGN_UP_START, Sign_Up)
}

export function* onSignInAfterSignUp()
{
  yield takeLatest(USER_ACTION_TYPES.SIGN_UP_SUCCESS, SignInAfterSignUp)
}

export function* onSignOut()
{
  yield takeLatest(USER_ACTION_TYPES.SIGN_OUT_START,SignOut);
}

export function* userSagas()
{
    yield all([call(onCheckUserSession),
      call(onEmailAndPasswordSignIn),
      call(onGoogleSignIn),
      call(onSignUp),
      call(onSignInAfterSignUp),
      call(onSignOut)])
}

