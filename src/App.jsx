import Register from "./components/registerPage/Register"
import LoginPage from './components/loginPage/LoginPage'
import HomePage from "./components/homePage/HomePage"
import ProductDetailsPage from "./components/productDetailsPage/ProductDetailsPage"
import SuccessPage from "./components/SuccessFullPage/SuccessPage"
import MyCart from './components/myCart/MyCart'
import Checkout from "./components/checkout/Checkout"
import InVoice from './components/InVoicePages/inVoice/InVoice'
import MyInVoice from "./components/InVoicePages/MyInVoice/MyInVoice"
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
   <>
     <BrowserRouter basename="/frontendFinal">
        <Routes>
        <Route path="/" element={<HomePage/> } />
        <Route path="/register" element={<Register />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/ProductDetails" element={<ProductDetailsPage />} />
          <Route path="/Sucess" element={< SuccessPage  />} />
          <Route path="/MyCart" element={< MyCart  />} />
          <Route path="/checkout" element={< Checkout  />} />
          <Route path="/Invoice" element={< InVoice  />} />
          <Route path="/MyInVoice" element={< MyInVoice  />} />
          
        </Routes>
        </BrowserRouter>
        
   </>
  )
}

export default App
