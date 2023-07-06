import Home from "./routes/home/home.component";
import { Routes,Route } from "react-router-dom";
import Authentication from "./routes/authentication/authentication.component";
import Shop from "./routes/shop/shop.component";
import Checkout from "./routes/checkout/checkout.component";
import NavigationBar from "./routes/navigation-bar/navigation-bar.component";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { createUserDocumentFromAuth, onAuthStateChangedListener } from "./utils/firebase/firebase.utils";
import { checkUserSession, setCurrentUser } from "./store/user/user.action";



const App = () => { 
  const dispatch = useDispatch();


  useEffect(()=> {
    // const unsubscribe = onAuthStateChangedListener((user) => {
    //     if(user)
    //     {
    //       createUserDocumentFromAuth(user);
    //     }

        dispatch(checkUserSession());
    // });

    // return unsubscribe;

    // warning below is to add the dispatch however we know its 
    // only going to be dispatched once
  },[])

  return (
    <Routes>
      <Route path="/" element={<NavigationBar/>}>
        <Route index element={<Home/>}/>
        {/* This is the wildcard for any paramters after shop/* */}
        <Route path="shop/*" element={<Shop/>}/>
        <Route path="auth" element={<Authentication/>}/>
        <Route path="checkout" element={<Checkout/>}/>
      </Route>
    </Routes>
  );
};

export default App;
