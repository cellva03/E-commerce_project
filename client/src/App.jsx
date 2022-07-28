// importing all the necessary components and libraries
import Product from "./pages/Product";
import Home from "./pages/Home";
import './app.css'
import Register from "./pages/Register";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import 'bootstrap/dist/css/bootstrap.min.css';
import Wish from "./pages/Wish";
import Shop from './components/Shop';
import Order from "./pages/Order";
import Coupon from "./pages/Coupon";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

const App = () => {

  // Router for the application
  return(
    <Router>
      <Routes>
        <Route path="/">
          <Route index element={<Home />} />
          <Route path='login' element={<Login />} />
          <Route path='register' element={<Register />} />
          <Route path="cart" element={<Cart/>} />
          <Route path="wish" element={<Wish/>} />
          <Route path="shop" element={<Shop/>} />
          <Route path="order" element={<Order/>} />
          <Route path="coupon" element={<Coupon/>} />
          <Route path='products'>
            <Route path=':id' element={<Product />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  )
};

export default App;