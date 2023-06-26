import NavigationBar from "./components/navigation-bar/navigation-bar.component";
import Home from "./routes/home/home.component";
import { Routes,Route } from "react-router-dom";


const Shop = () => 
{
  return <h1>I am the shop</h1>;
}

const App = () => { 
  return (
    <Routes>
      <Route path="/" element={<NavigationBar/>}>
        <Route index element={<Home/>}/>
        <Route path="shop" element={<Shop/>}/>
      </Route>
    </Routes>
  );
};

export default App;
