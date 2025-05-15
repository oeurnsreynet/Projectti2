import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import Homepage from './page/Homepage';


import About from './page/About';
import Products from './page/Products';
import Cart from './page/Cart';
import { CartProvider } from "./context/CartContext";
import { UserProvider } from "./context/UserContext";
import Contact from './page/Contact';

function App() {
  return (
    // <Router>
    //    <div className="App">
    //     <Routes>
    //       <Route path='/' element={<Homepage/>}/>
    //       <Route path='/about' element={<About/>}/>
    //       <Route path='/products' element={<Products/>}/>
    //       <Route path='/cart' element={<Cart/>}/>
    //     </Routes>
      
    //   </div>
    // </Router>
    <div className='App'>
      <CartProvider>
        <UserProvider>
        <Router>
          <Routes>
            <Route path='/' element={<Homepage/>}/>
            <Route path='/about' element={<About/>}/>
           <Route path='/products' element={<Products/>}/> 
           <Route path='/cart' element={<Cart/>}/>
           <Route path='/contact' element={<Contact/>}/>
          </Routes>
        </Router>
        </UserProvider>
      </CartProvider>
    </div>
   
  );
}

export default App;
