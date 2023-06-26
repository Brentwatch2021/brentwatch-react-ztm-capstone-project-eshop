import { initializeApp } from 'firebase/app';
import { getAuth, 
    signInWithRedirect,
    signInWithPopup, 
    GoogleAuthProvider } 
    from 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyBSqq-8DmKrICPt3ZPYLuxsgXNibWE90gw",
    authDomain: "react-ztm-course-crwn-clothing.firebaseapp.com",
    projectId: "react-ztm-course-crwn-clothing",
    storageBucket: "react-ztm-course-crwn-clothing.appspot.com",
    messagingSenderId: "602742854405",
    appId: "1:602742854405:web:13c9399a4a8c1a9b3b9d6c"
  };


  const firebaseApp = initializeApp(firebaseConfig);

  const provider = new GoogleAuthProvider();

  provider.setCustomParameters({
    prompt: "select_account"
  });


  export const auth = getAuth();
  export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

