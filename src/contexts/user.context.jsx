import { createContext, useEffect, useState } from 'react'
import { createUserDocumentFromAuth, onAuthStateChangedListener } from '../utils/firebase/firebase.utils';

// actual value you wanna access
export const UserContext = createContext({
    currentUser: null,
    setCurrentUser: () => null,
});

export const UserProvider = ({children}) => {

    const [currentUser,setCurrentUser] = useState(null);
    const value = { currentUser,setCurrentUser };

    useEffect(() => {
        const unsubscribe = onAuthStateChangedListener((user) => {
            if(user)
            {
                createUserDocumentFromAuth(user)
            }
            setCurrentUser(user);
        })

        return unsubscribe;
    },[])

    // The provider is setup with the setter and getter functions
    // for all children to have access to get or set the values above
    return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}
