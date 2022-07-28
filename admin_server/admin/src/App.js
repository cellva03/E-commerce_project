  // creating useState hook for user data and the loading state
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './pages/home/Home';
import Login from './components/login/Login';
import Signup from './components/signup/Signup';
import UserList from './pages/userPages/usersList/UserList';
import NewUser from './pages/userPages/newuser/NewUser';
import SingleUser from './pages/userPages/singleuser/SingleUser';
import ProductList from './pages/productPages/productList/ProductList';
import NewProduct from './pages/productPages/newproduct/NewProduct';
import SingleProduct from './pages/productPages/singleproduct/SingleProduct';
import Bulk from './pages/bulk/Bulk';
import Sales from './pages/sales/Sales';
import Discount from './pages/discount/Discount';
import SingleDiscount from './pages/discount/SingleDiscount';



function App() {
  return (
    <>
    {/* Creating a react router to navigate through the all available pages */}
      <Router>
        <Routes>
          <Route path="/">
              <Route index element={<Login/>} />
              <Route path='register' element={<Signup/>} />
              <Route path='home' element={<Home/>} />
              <Route path='user'>
                <Route index element={<UserList />} />
                <Route path='new' element={<NewUser/>} />
                <Route path=':id' element={<SingleUser/>} />
              </Route>
              <Route path='product'>
                <Route index element={<ProductList/>} />
                <Route path='new' element={<NewProduct/>} />
                <Route path=':id' element={<SingleProduct/>} />
              </Route>
              <Route path='bulk'>
                <Route index element={<Bulk/>} />
              </Route>
              <Route path='discount'>
                <Route index element={<Discount/>} />
                <Route path=':id' element={<SingleDiscount/>} />  
              </Route>
              <Route path='sales'>
                <Route index element={<Sales/>} />
              </Route>
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
