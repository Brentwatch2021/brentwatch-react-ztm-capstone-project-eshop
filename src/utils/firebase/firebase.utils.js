import { initializeApp } from 'firebase/app';
import { getAuth, 
    signInWithRedirect,
    signInWithPopup, 
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    
   } 
    from 'firebase/auth'

import { getFirestore,doc,getDoc,setDoc } from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyBSqq-8DmKrICPt3ZPYLuxsgXNibWE90gw",
    authDomain: "react-ztm-course-crwn-clothing.firebaseapp.com",
    projectId: "react-ztm-course-crwn-clothing",
    storageBucket: "react-ztm-course-crwn-clothing.appspot.com",
    messagingSenderId: "602742854405",
    appId: "1:602742854405:web:13c9399a4a8c1a9b3b9d6c"
  };


  const firebaseApp = initializeApp(firebaseConfig);

  // You can multiple providers this is why you 
  // need to instantiate a new provider
  const googleprovider = new GoogleAuthProvider();

  // Allows for the popup to select google account
  googleprovider.setCustomParameters({
    prompt: "select_account"
  });

  // Auth is a singleton as it keeps track in the entire application
  export const auth = getAuth()
  export const signInWithGooglePopup = () => signInWithPopup(auth, googleprovider);
  export const signInWithGoogleRedirect = () => 
  {
    signInWithRedirect(auth,googleprovider)
  }


  // this method by default gets the db assoicated with the 
  // firebase/app instance 
  export const db = getFirestore();

  export const createUserDocumentFromAuth = async (userAuth,additonalInformation = {}) => {

    if(!userAuth) return;
    // Even though the users collection does not exist 
    // Firestore will automatically generate the collection
    const userDocRef = doc(db, 'users', userAuth.uid);

    const userSnapshot = await getDoc(userDocRef)

      // create / set the document with the data from userAuth in my collection
    if(!userSnapshot.exists())
    {
      const { displayName, email , photoURL} = userAuth;
      const createdAt = new Date();

      try 
      {
        await setDoc(userDocRef,
          {
            displayName,
            email,
            photoURL,
            createdAt,
            ...additonalInformation
          });
      }
      catch(error)
      {
        console.log(`Error creating user from Google Sign In ${error}`)
      }
    }
    return userDocRef;
  }


  export const createAuthUserWithEmailAndPassword = async (email,password) => {
    if(!email || !password) return;
    
    return await createUserWithEmailAndPassword(auth, email,password);
  }

  export const signInAuthUserWithEmailAndPassword = async (email,password) => {
    if(!email || !password) return;
    
    return await signInWithEmailAndPassword(auth,email,password);
  }

  export const signOutUser = async () => await signOut(auth);

  export const onAuthStateChangedListener = (callback) => onAuthStateChanged(auth,callback)


