import NavigationBar from "./components/navigation-bar/navigation-bar.component";
import Home from "./routes/home/home.component";
import { Routes,Route } from "react-router-dom";
import Authentication from "./routes/authentication/authentication.component";
import Shop from "./routes/shop/shop.component";




const App = () => { 
  return (
    <Routes>
      <Route path="/" element={<NavigationBar/>}>
        <Route index element={<Home/>}/>
        <Route path="shop" element={<Shop/>}/>
        <Route path="auth" element={<Authentication/>}/>
      </Route>
    </Routes>
  );
};

export default App;
