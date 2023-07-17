import { Outlet } from 'react-router-dom';
import Directory from '../../components/categories/directory.component';


const Home = () => { 
  return (
    <>
    <Outlet/>
    <Directory/>
    </>
  );
};

export default Home;
