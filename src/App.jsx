import { BrowserRouter, Route, Routes } from "react-router-dom";
import Shop from "./Pages/Shop";
import Shopcategory from './Pages/Shopcategory'
import Product from "./Pages/Product";
import Card from "./Pages/Card";
import LoginSignup from "./Pages/LoginSignup";
import Navbar from "./Components/navbar/Navbar";
import Footer from "./Components/Footer/Footer";
import men_banner from './Components/assets/Frontend_Assets/banner_mens.jpeg'
import women_banner from './Components/assets/Frontend_Assets/banner_women.jpeg'
import banner_kids from './Components/assets/Frontend_Assets/banner_kids.jpeg'
import NetworkStatus from "./Components/networkstatus/NetworkStatus";
import { Toaster } from "react-hot-toast";


function App() {
  return (
 <div>
  <Toaster position="top-right" reverseOrder={false} />
  <BrowserRouter>
  <Navbar/>
  <Routes>
    <Route path='/' element={<Shop/>} />
        <Route path='/First' element={<Shopcategory banner ={men_banner} category = "First"/>} />
        <Route path='/Second' element={<Shopcategory banner={women_banner} category = "Second"/>} />
        <Route path='/Third' element={<Shopcategory banner ={banner_kids} category = "Third"/>} />
          <Route path='/product/:id' element={<Product />} /> 
          <Route path="/card" element={<Card/>}/>
          <Route path="/search"  element={<LoginSignup/>}/>
  </Routes>
  <Footer/>
  </BrowserRouter>
<NetworkStatus/>
 </div>
  );
}

export default App;
