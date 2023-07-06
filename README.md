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

##### React Context

This is a global state management pattern provided by react here is an example:

```

import { createContext, useState } from 'react'

// actual value you wanna access
export const UserContext = createContext({
    currentUser: null,
    setCurrentUser: () => null,
});

export const UserProvider = ({children}) => {

    const [currentUser,setCurrentUser] = useState(null);
    const value = { currentUser,setCurrentUser };

    // The provider is setup with the setter and getter functions
    // for all children to have access to get or set the values above
    return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}


```

In order to to set the global state:

```

...

import { UserContext } from '../../contexts/user.context';
import { ...,useContext} from 'react'

...

// This will allow this component to set the current user
const { setCurrentUser } = useContext(UserContext)

...

const { user} = await signInAuthUserWithEmailAndPassword(email, password);
setCurrentUser(user);

...

```

And to use the current user in a component so when it changes you can do the following:

```

const { currentUser } = useContext(UserContext)

```

Each component that uses the useContext and specifically the UserContext will rerender:

for example:

```

import { Link, Outlet } from 'react-router-dom';
import './navigation-bar.styles.scss'
import { Fragment, useContext } from 'react';
import { ReactComponent as CrwnLogo } from '../../assets/crown.svg'
import { UserContext } from '../../contexts/user.context';

const NavigationBar = () => {
    // This will caus a rerender when 
    // the user context is updated from the sign in
    const { currentUser } = useContext(UserContext)
    

    return (
    <Fragment>
            <div className='navigation'>
                <Link className='logo-container' to='/'>
                    <CrwnLogo/>
                </Link>
                <div className='nav-links-container'>
                    <Link className='nav-link' to='/auth'>
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

```

This navigation bar will rerender each time the UserContext gets updated and specifically because its an function component.

```

{
    // This will caus a rerender when 
    // the user context is updated from the sign in
    const { currentUser } = useContext(UserContext)
    

    return (...)
}

```


A way to centralize the authentication in an app below via user context 


```

useEffect(() => {
        const unsubscribe = onAuthStateChangedListener((user) => {
            if(user)
            {
                createUserDocumentFromAuth(user)
            }
            setCurrentUser(user);
        })
        
        // This will clean the function to prevent memory leak and if there is complete callback
        // subscribed on the firebase method onAuthStateChanged it would call the complete callback
        return unsubscribe;
    },[])


```

This allows for when a change occurs to the singleton auth object in my application it will reflect to whichever component is listening to the currentUser object centralizing 


##### Observer pattern 

The observer pattern emerges using the onAuthStateChanged(auth,callback) from 'firebase/auth'

Subject (Publisher/Observable):

The subject in this case is the Firebase Authentication service.
It maintains the current authentication state, including information about whether a user is signed in or signed out.

Observer (Subscriber/Listener):

You can register multiple observers (subscribers) using the onAuthStateChanged method.
- In our case as stated above we encapsulate the subscription so the user context can be consumed from any component by using the UserContext

Subscription:

When you call onAuthStateChanged, you are subscribing to receive notifications whenever the authentication state changes.
The Firebase Authentication service keeps track of the subscribers and triggers the registered callbacks whenever there is a change in the authentication state.
Notification:

When there is a change in the authentication state, such as a user signing in or signing out, Firebase Authentication notifies all the subscribed callbacks by invoking them.
The notification includes relevant information about the updated authentication state, such as the user's details.

Callback Execution:

Each registered callback function is executed in response to the notification.
The callback functions can perform actions based on the updated authentication state, such as updating the UI, redirecting the user, or performing additional logic.


##### Firebase Batch Method

The batch method works much like a transaction it can do multiple changes in the DB for different Document and if one of the instances fails the entire transaction fails and this is where the firebase Batch method comes into play:

```

 const batch = writeBatch(db);

    objectsToAdd.forEach((object) => {
      const docRef = doc(collectionRef,object.title.toLowerCase());
      batch.set(docRef, object);
    });

    // Execute Transaction
    await batch.commit();

```


##### React Use Effect

When using an async function inside UseEffect you dont want to pass an async function but rather create one like below anything async in useEffect rather define new one and call it

```

useEffect(() => {
        const getCategoriesMap = async () => {
            const categoryMap = await getCategoriesAndDocuments();
            console.log(categoryMap)
        }

        getCategoriesMap();
    },[])


```

##### React Router Nested Routes

```

{/* This is the wildcard for any paramters after shop/* */}
        <Route path="shop/*" element={<Shop/>}/>

```

##### js tip

Loop over array keys to build content based on key of array:

```

{Object.keys(categoriesMap).map((title) => {
        const products = categoriesMap[title];
        return (
          <CategoryPreview key={title} title={title} products={products} />
        );
      })}

```

##### Styled Components 

This is a third party library which allows for your styles to be componentierized to prevent styles from overriding each other unlike plain css or scss.

However when integrating styled components remember to clear cache or old HTML tags with old classes will remain dorment so ctrl + R.

You are able to pass props into the styled component and consume them:

```

export const BackgroundImage = styled.div`
      width: 100%;
      height: 100%;
      background-size: cover;
      background-position: center;
      background-image: ${({ imageUrl }) => `url(${imageUrl})`}
`;

```

There is some trade offs with using styled components it compiles at runtime so therefore performance does take a hit however in a enterprise level application where you might be able to afford to take a hit on performance to prevent error redundancy then this approach will work especially on 20 to 30 person developer team.

##### Netlify

You are able to setup the Continues Integration by adding this command for create-react-app which allows 
the netlify build action to override the default strict conditions in create react app to allow for the 
build. 

This will need to be added to the package.json file.



```

 "build": "CI=false react-scripts build",

```

To prevent any page not found issues in netlify online app be sure to add the _redirects file under public folder

```

/* index.html 200

```

This will allow the react app to function as an SPA so if a route like 'netlifyapp/shop/hats' occurs it always returns index.html to allow the react router to determine the page etc.



##### Redux

![ACTIONS Example](src/note_reducers.jpg)

Example with reducers and context:

![Reducers Dataflow Example](src/note_reducers_context.jpg)

Example with redux data flow:

![Redux Data flow Example](src/note_redux_flow.jpg) 


Actions:

Action in Redux terminology refers to a plain JavaScript object, sometimes accompanied by helper methods, that describes an intention to change the application's state.

```

export const clearItemFromCart = (cartItems, cartItemToRemove) =>
{
        const newCartItems = clearCartItem(cartItems,cartItemToRemove);
        return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
}

```

To Consume an action from a component you will always need to dispatch it and with this setup we 
need to supply the current cartItems array so you would also need to supply the current list of cartItems

```
    // useDispatch from 'react-redux'
    const dispatch = useDispatch();
    // useSelector from 'react-redux'
    const cartItems = useSelector(selectCartItems);
    
    const clearItemHandler = () => { 
      dispatch(clearItemFromCart(cartItems,cartItem));
    }

```

Reducers:

In Redux, a reducer is a pure function responsible for handling actions and producing the next state of an application. It takes in the current state and an action as input and returns the new state. Reducers are designed to be predictable and should not mutate the state directly. Instead, they create a new state object based on the current state and the action received. The reducer is a crucial component in Redux as it determines how the state should be updated in response to different actions.

```

import { CATEGORIES_ACTION_TYPES } from "./category.types";

export const CATEGORIES_INITIAL_STATE = {
    categories: [],
}

export const categoriesReducer = (state = CATEGORIES_INITIAL_STATE, action = {}) =>
{
    const { type, payload } = action;

    switch(type) {
        case CATEGORIES_ACTION_TYPES.SET_CATEGORIES:
            return { ...state, categories: payload }
        default:
            return state;
    }
}

```

Selectors:

Selectors in Redux are functions that retrieve and compute derived data from the application state. They help decouple the components from the structure of the state, promoting reusability and allowing efficient memoization for performance optimization using libraries like Reselect.

Types:

In Redux, types refer to action type constants, typically defined as string values, used to identify and differentiate different actions in the application. They are used to handle actions in reducers and ensure consistency throughout the codebase.

When creating your reducer:

```

// the root reducer runs through all the reducer actions 
// hence why at the end of each reducer we should by default 
// return the original state
export const userReducer = (state = USER_INITIAL_STATE, action = {}) => {
    const {type, payload} = action;

    switch (type)
    {
        case USER_ACTION_TYPES.SET_CURRENT_USER:
        return { ...state,currentUser: payload };
        default:
            return state;

    }
}


```

###### Redux Reselect


Reselect is a library for memoized selectors in Redux. It efficiently computes derived data from the Redux store, optimizing performance by avoiding unnecessary recalculations when the input state remains unchanged.


```

import { createSelector } from 'reselect';

const selectCategoryReducer = (state) => state.categories;

export const selectCategories = createSelector(
    [selectCategoryReducer],
    (categoriesSlice) => categoriesSlice.categories
  );

  export const selectCategoriesMap = createSelector(
    [selectCategories],
    (categories) => {
       return categories.reduce((acc, category) => {
            const { title, items} = category;
            acc[title.toLowerCase()] = items;
            return acc;
        },{})
    }
);


```

###### Redux Persist

Redux Persist is a library for persisting the Redux store data across browser refreshes or app restarts. It enables seamless state persistence by automatically storing and rehydrating the state from storage mechanisms like local storage or AsyncStorage.

```

npm install redux-persist

```


The import statement storage from 'redux-persist/lib/storage' is used to import the storage mechanism provided by the Redux Persist library. It provides an abstraction for storage operations, allowing data to be saved and retrieved from the chosen storage engine (e.g., localStorage, AsyncStorage).


In the example below we are casting the storage to use localstorage of the browser by default as the keyname.

```

const persistConfig = {
    key: 'root',
    storage,
    blacklist:['user']
}


```

The blacklist is which named key of the assoiciated reducer should not be stored 
we wont store the user as we are already hooking into firebase onAuth changed hook 
and dont want any unwated conflicting persist issues

###### REDUX THUNK

Redux Thunk is a middleware for Redux that allows writing action creators that return functions instead of plain action objects. These functions can dispatch multiple actions asynchronously, perform side effects like API calls, and delay dispatching actions until certain conditions are met, enhancing the flexibility of Redux workflows.


Example of action been able to dispatch another synchronous action within

```

dispatch(fetchCategoriesStart());

```

Full function here:

``` 

export const fetchCategoriesStartAsync = () => {
  return async (dispatch) => {
    dispatch(fetchCategoriesStart());
    try {
      const categoriesArray = await getCategoriesAndDocumentsForReduxSelector('categories');
      dispatch(fetchCategoriesSuccess(categoriesArray));
    } catch (error) {
      dispatch(fetchCategoriesFailure(error));
    }
  };
};


```


###### REDUX SAGA

Redux Saga is a middleware library for managing side effects in Redux applications. It provides an elegant way to handle asynchronous actions, such as API calls, by using generator functions to create complex and asynchronous workflows, allowing for better control and coordination of application state.


SAGA works much the same as generator functions

Generator function:

A generator function in JavaScript is a special type of function that can be paused and resumed during execution, allowing for the generation of a sequence of values over time. It provides a powerful mechanism for writing code that produces values on demand, making it useful for handling asynchronous operations and iterating over large data sets.


![JS ES 6 2015 Example](src/generator_function.jpg)


#### The Main functions of a saga is the following:


##### CALL 

This effect invokes a function asynchronously and waits for it to complete before proceeding to the next step in the generator.

```
/*
 * @param fn A Generator function, or normal function which either returns a
 *   Promise as result, or any other value.
 * @param args An array of values to be passed as arguments to `fn`
*/
const categoriesArray = yield call(getCategoriesAndDocumentsForReduxSelector, 'categories');

```

##### PUT:

This effect dispatches an action to the Redux store, allowing state changes in response to certain events or triggers.

```

/**
 * Creates an Effect description that instructs the middleware to dispatch an
 * action to the Store. This effect is non-blocking, any errors that are
 * thrown downstream (e.g. in a reducer) will bubble back into the saga.
 *
 * @param action [see Redux `dispatch` documentation for complete info](https://redux.js.org/api/store#dispatchaction)
 */

 yield put(fetchCategoriesSuccess(categoriesArray));

/*
    The yield keyword is used in JavaScript generators and async functions to pause the execution of a function and return a value. It allows the function to be resumed later, and each time the function is resumed, it continues from where it left off, maintaining its internal state.
*/


```

##### all:

This effect allows multiple sagas to be run concurrently, enabling parallel execution of sagas.

```

/**
 * Creates an Effect description that instructs the middleware to run multiple
 * Effects in parallel and wait for all of them to complete. It's quite the
 * corresponding API to standard
 * [`Promise#all`](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Promise/all).
 *
 * #### Example
 *
 * The following example runs two blocking calls in parallel:
 *
 *    import { fetchCustomers, fetchProducts } from './path/to/api'
 *    import { all, call } from `redux-saga/effects`
 *
 *    function* mySaga() {
 *      const [customers, products] = yield all([
 *        call(fetchCustomers),
 *        call(fetchProducts)
 *      ])
 *    }
 */
yield all([call(onFetchCategories)]);


``` 

##### Takelatest

This effect listens for a specified action and, if multiple instances of the action occur, only the latest one is processed while canceling previous ones.


```

/**
 * Spawns a `saga` on each action dispatched to the Store that matches
 * `pattern`. And automatically cancels any previous `saga` task started
 * previously if it's still running.
 *
 * Each time an action is dispatched to the store. And if this action matches
 * `pattern`, `takeLatest` starts a new `saga` task in the background. If a
 * `saga` task was started previously (on the last action dispatched before the
 * actual action), and if this task is still running, the task will be
 * cancelled.
 *
 * #### Example
 *
 * In the following example, we create a basic task `fetchUser`. We use
 * `takeLatest` to start a new `fetchUser` task on each dispatched
 * `USER_REQUESTED` action. Since `takeLatest` cancels any pending task started
 * previously, we ensure that if a user triggers multiple consecutive
 * `USER_REQUESTED` actions rapidly, we'll only conclude with the latest action
 *
 *    import { takeLatest } from `redux-saga/effects`
 *
 *    function* fetchUser(action) {
 *      ...
 *    }
 *
 *    function* watchLastFetchUser() {
 *      yield takeLatest('USER_REQUESTED', fetchUser)
 *    }
 *
 * #### Notes
 *
 * `takeLatest` is a high-level API built using `take` and `fork`. Here is how
 * the helper could be implemented using the low-level Effects
 *
 *    const takeLatest = (patternOrChannel, saga, ...args) => fork(function*() {
 *      let lastTask
 *      while (true) {
 *        const action = yield take(patternOrChannel)
 *        if (lastTask) {
 *          yield cancel(lastTask) // cancel is no-op if the task has already terminated
 *        }
 *        lastTask = yield fork(saga, ...args.concat(action))
 *      }
 *    })
 *
 * @param pattern for more information see docs for [`take(pattern)`](#takepattern)
 * @param saga a Generator function
 * @param args arguments to be passed to the started task. `takeLatest` will add
 *   the incoming action to the argument list (i.e. the action will be the last
 *   argument provided to `saga`)
 */
yield takeLatest(
        CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START,
        fetchCategoriesAsync
    );

// Takes the action as the first paramter and cancels any prior actions running or just started and starts a new action with new saga

```


Here is an example of dispatching another action within an Saga:


```

export function* Sign_Up({ payload: {email,password,displayName}})
{
  try
  {
    const { user } = yield call(createAuthUserWithEmailAndPassword,email,password);
    // dispatch signUpSuccess once user has been created and add the display
    // name as additonal information
    yield put(signupSuccess(user,{displayName}));
  }
  catch(error)
  {
    yield put(signOutFailed(error))
  } 
}

```



































