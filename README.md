# How to fork and clone
One quick note about cloning this project. If you wish to make commits and push your own code, you'll need to fork the project first. Forking allows you to have your own copy of this repository by adding a duplicate version in your own profile!

You can see the fork button in the top right corner of every GitHub project; click it and a copy of the project will be added to your GitHub profile under the same name as the original project.

<img width="612" alt="github fork" src="https://user-images.githubusercontent.com/10578605/157998981-4bfd1f83-825c-4664-b22d-b2c7d471dc70.png">

After forking the project, simply clone it the way you would from the new forked project in your own GitHub repository and you can commit and push to it freely!

# After you fork and clone:

## Install dependencies
In your terminal after you clone your project down, remember to run either `yarn` or `npm install` to build all the dependencies in the project.

## Set your firebase config

Remember to replace the config variable in your firebase.utils.js with your own config object from the firebase dashboard! Navigate to the project settings gear icon > project settings and scroll down to the config code. Copy the object in the code and replace the variable in your cloned code.

<img width="1261" alt="Screen Shot 2022-03-11 at 8 51 22 PM" src="https://user-images.githubusercontent.com/10578605/157999158-10e921cc-9ee5-46f6-a0c5-1ae5686f54f3.png">

# Branching strategy

After forking this repository and cloning it down, you will have access to all the lesson branches with code at different checkpoints throughout the course. If for some reason you need to work from the codebase at one of these lesson branch checkpoints, follow these steps:

1. Checkout to the lesson-# (let's use lesson-15 as an example) branch
```
git checkout lesson-15
```
2. Branch off from lesson-15. This will create a new branch where the code of lesson-15 is the basis for your new branch. You can name your new branch whatever you want! Let's say we use my-main-branch as the name.
```
git checkout -b my-main-branch
```
3. Now you can just code on this branch, push code from this branch up to your forked repo etc. The main thing to remember is that you want to be on this branch for your own code, so remember what you named this branch!




# Notes

- Package-lock.json locks any specific library or package to the specific project to prevent version     clashes
-  SCSS allows you to follow an heirarchy for developing css and it compiles to normal css for the browser.

## Routing 
- Upgrading React Router V5 to V6 will result in breaking changes Here is the tutorial for upgrading:    https://reactrouter.com/en/main/upgrading/v5
- Great tutorial from React Router that will expose me to Vite: https://reactrouter.com/en/main/start/tutorial

- Fragment from react is used as a container for elements that require a parent but it does NOT render <Fragment>

- In react you are able to import an SVG and cast it as an Component and consume it as a Component

- box-sizing: border-box; accounts for total width and whatever the width is set it will auto the padding to fit within and the border IE if width is 90 and padding is 20 total width will be 90 NOT 110

- Outlet is used to display child content via the routes and any route within


```

<Routes>
      <Route path="/" element={<NavigationBar/>}>
        <Route index element={<Home/>}/>
        <Route path="shop" element={<Shop/>}/>
      </Route>
</Routes>

// And in the Navigation Bar Component you can use the Outlet

<Fragment>
            <div className='navigation'>
                <Link className='logo-container' to='/'>
                    <CrwnLogo/>
                </Link>
                <div className='nav-links-container'>
                    <Link className='nav-link' to='/shop'>
                        SHOP
                    </Link>
                </div>
            </div>
        <Outlet/>
    </Fragment>

// Now if you navigate to / The Navigation Bar it will display all child content below the bar

// The Link is gets rendered into a normal anchor tag so in CSS or SCSS you can refer to it as a 


```


## Firebase

- It's possible you may encounter a google Authorization error that says 403:restricted_client. If you do, here are the instructions to fix it!

There should be a Learn More link in the popup, clicking that should take you to the Google APIs console that has three tabs under the header named Credentials, OAuth Consent Screen, and Domain Verification. Go to the OAuth Consent Screen tab and update the Application Name to "crwn-clothing" or any other name you're comfortable with (i.e. the name of your project). Click on save at the bottom, then try logging into your verified Google account thereafter.

- firebase/app Captures everything required to get firebase going like the initializeApp function

### Instructions Add Web app to Firebase Project

- Make sure firebase npm is installed 

```

npm install firebase

```


- Navigate to project click on the </> icon to add the web app

- Give the web app an nickname and click 
Register

- Copy over the config will look like something below

```

const firebaseConfig = {
    // apparently firebase needs this api key so its fine to be public per firebase documention
  apiKey: "something",
  // This is the Database instance name below
  authDomain: "something",
  projectId: "something",

  storageBucket: "something",
  messagingSenderId: "9999",
  appId: "1:something"
};


```

- In order to make use of the firebase CRUD functions and others you will need to initialize:


```

const firebaseApp = initializeApp(firebaseConfig);


```

- For Authentication with an firebase project you will need to use the 'firebase/auth' module


- You can have multiple authentication providers google,facebook, instagram etc

```

const provider = new GoogleAuthProvider();


```

 - The above allows for the user to sign in with google account.

 - In order to allow the firebase project to be authenticated with a Google account you will need to add the provider to the firebase project

 - Head to the firebase project and click Authentication 

 - Click Get Started Button at the top

 - Click Sign in Method choose the additional provider you would like to add in my case its Google

- Click the Enable on the provider and select the project support email this email will recieve all the support emails

- Click Save

### Firestore essentials

- The users that is located within the authenticated section and lists users is NOT directly linked to the projects firestore IE they are not neccarsily authenticated to access the store they simply users that have signed into the firebase project via the client setup. It will also list users signed in from varios providers: Facebook, Twitter etc ... 

- Firestore is much like any schema it can be classified as a JSON file so its shape should conform for user 1 compared to user 1000.


#### Firestore Database

- Firestore essentials 
    - Collection 
    - Document
    - Data

Much like a folder structure above each separate piece of app info should be considered like a Model. eg a Collection of users , A collection of roles , A collection of todos etc

DOCUMENT smallest unit in firestore it just stores the ID

    TODOID

DATA is the JSON data it can take any shape much like a JSON object

    TODO
     - Name
     - Description
     - Due Date: 
        - Date
        - Time


Collections is a list of these Documents and related data

#### How to create Firestore Database

- Click create database 
- Select Start in production Mode as its easier because it allows for users to set different parts of the documents etc
- Choose Location closest to your location for speed etc
- Click Enable (Note you are unable to change the location so pick wisely)

- Click on rules this is the config for who can modify documents in your firestore

The Below is an extract from the default rules when new database is created

```

rules_version = '2';

service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if false;
    }
  }
}


```


- Update the config to allow for read and write on all documents Where false exists update to true

- Click publish

##### Storing users in Firestore

```

const userDocRef = doc(db, 'users', userAuth.uid);

```

- When this is logged out the userDocRef
    - will represent some document reference
    - path: points to online google uid points to a unique id nothing exists so it does not conflict but it points to a uncreated users collection
    - Now you can use the getDoc method to get the snapshot

```

const userSnapshot = await getDoc(userDocRef)
    console.log(userSnapshot);
    console.log(userSnapshot.exists());

```

- exists() method checks if the user Document exists for the reference and the data within

The following method will create a new users collection if it does not exist and it will create a new user.


```

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

  ```

  - If you check the Data in the firestore it will show a new collection of Users whereas before the setDoc is not called it would shown the UID but not  that it was created in the store itself

The below is an example of using a redirect so when the user navigates away from the base site when it redirects it returns the user object from whatever the provider is google, facebook etc


  ```

  import { auth,signInWithGooglePopup, createUserDocumentFromAuth, signInWithGoogleRedirect } from "../../utils/firebase/firebase.utils";
import { useEffect } from "react"; 
import { getRedirectResult } from 'firebase/auth'


const SignIn = () => 
{

    useEffect(() => {
        GetRedirectedResponse();
    }, [])

    const GetRedirectedResponse = async () => 
    {
        const response = await getRedirectResult(auth);
        if(response)
        {
            const userDocRef = createUserDocumentFromAuth(response.user);
        }
    }

    const logGoogleUser = async () => {
        const { user } = await signInWithGooglePopup();
        const userDocRef = createUserDocumentFromAuth(user);
    }

    ...
}

```


##### Native Firebase Providers

  - Email/Password
  - Phone
  - Google
  - Facebook
  - Play Games
  - Game Center
  - Apple
  - Github
  - Microsoft
  - Twitter
  - Yahoo

  ```

  import { FacebookAuthProvider } from 'firebase/auth'

  // Above is a built provider becuase its native

  ```


  ##### Email Sign Up and Sign In

  - Add Email/SignUp 
  - Enable 1st option
  - Second option is with email link whereby it sends the user a email they click the link and it signs in automatically however it requires more configuration

  - Firebase obfuscates the storing of passwords from us in order to prevent this sensitive information from been hacked firebase takes care of this work for us as a programmer this is great

  
##### javascript Tip

- I like the way you can pass props via the spread operator to allow mulitple attributes applied to an html element in the example below.

``` 

const FormInput = ({ label, ...otherProps}) => 
{
    return (
        <div className="group">
            <label className={`${otherProps.value.length ? 'shrink' : ''}` } fomr>{label}</label>
            <input className="form-input" {...otherProps}/>
        </div>
    );
}

export default FormInput;

```

also great way to check if property exists or not

```

// label been the destructred label from the previous example
label && (output html)

```

An alternative to the method above is the following Component Change

```

import './form-input.styles.scss'

const FormInputAlt = ({ label, inputOptions}) => 
{
    return (
        <div className='group'>
            <input className='form-input' {...inputOptions} />
            {label && (
                <label 
                className={`${
                    inputOptions.value.length ? 'shrink' : ''
                    } form-input-label`}>{label}</label>)}
        </div>
    );
}

export default FormInputAlt;


```

And the Consumption Change:

```

{/* Alteratve way is also to do input options */}
                <FormInputAlt label='Display Name' inputOptions=
                {{
                    name:'displayName',
                    type: 'text', 
                    required: true,
                    onChange: handleChange,
                    value:displayName
                }}/>

```

The second option allows for a clear separation of concerns in the naming convention like label input and the inputOptions. However I peronsally prefer the first method as it allows for normal property setup on the input tag as opposed to object based property setup allows for the html to be decoupled from the form input component you dont need to write the input in a specific way just the normal way however each person and company differ.

A way to provide different looks in terms of styling for a component

```

const BUTTON_TYPE_CLASSES = {
        google: 'google-sign-in',
        inverted: 'inverted'
    }

const Button = ({children, buttonType, ...otherProps}) => {
    return(
        <button className={`button-container ${BUTTON_TYPE_CLASSES[buttonType]}`} {...otherProps}>
            {children}
        </button>
    );
}

export default Button;

```

TODO For 29/06/2023 implement all the firebase/auth error codes:

```

auth/app-deleted: This error occurs when the Firebase app associated with the authentication service has been deleted.

auth/app-not-authorized: This error indicates that the app is not authorized to use Firebase Authentication.

auth/argument-error: This error occurs when an invalid argument is passed to a Firebase Authentication method.

auth/invalid-api-key: This error suggests that the provided API key is invalid or not authorized to access Firebase Authentication.

auth/invalid-user-token: This error occurs when an invalid user token is provided for authentication.

auth/network-request-failed: This error indicates a network error occurred while making a request to the Firebase Authentication service.

auth/requires-recent-login: This error occurs when a sensitive operation is requested that requires the user to have recently signed in.

auth/user-disabled: This error suggests that the user account has been disabled by an administrator and cannot be used for authentication.

auth/user-not-found: This error occurs when attempting to sign in with an email/password or retrieve a user record that does not exist.

auth/wrong-password: This error indicates that an incorrect password was provided during sign-in.

auth/email-already-in-use: This error occurs when attempting to create a new user account with an email that is already associated with an existing account.

auth/weak-password: This error suggests that the provided password is too weak and does not meet the security requirements.


```













