import { initializeApp } from 'firebase/app';
import { getAuth, 
    signInWithRedirect,
    signInWithPopup, 
    GoogleAuthProvider } 
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

  const provider = new GoogleAuthProvider();

  provider.setCustomParameters({
    prompt: "select_account"
  });


  export const auth = getAuth();
  export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

  // this method by default gets the db assoicated with the 
  // firebase/app instance 
  export const db = getFirestore();

  export const createUserDocumentFromAuth = async (userAuth) => {
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
            createdAt
          });
      }
      catch(error)
      {
        console.log(`Error creating user from Google Sign In ${error}`)
      }
    }
    return userDocRef;
  }



