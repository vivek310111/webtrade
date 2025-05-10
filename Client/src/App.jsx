import './App.css'
import { Routes,Route} from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from '../src/pages/Home'
import Login from './pages/Login'
import Register from './pages/register'
import Listing from './pages/Listing'
import axios from 'axios'
import {Toaster} from 'react-hot-toast'
import Cart from './pages/Cart'
import ContactForm from './pages/Contact'
import Pricing from './pages/Pricing'
import About from './pages/About'
import Admin from './pages/AdminContact'
import AdminContact from './pages/AdminContact'
import SellerDashboard from './pages/SellerDashboard'
import AdminDashboard from './pages/AdminDashboard'
import ManageListing from './pages/ManageListing'
import SellerListing from './pages/SellerListing'
import CheckOut from './pages/CheckOut'
import OrderConfirm from './pages/OrderConfirm'
import MyOrder from './pages/MyOrder'
import OrderDetails from './pages/OrderDetails'
import Sales from './pages/Sales'
import AdminReports from './pages/AdminReports'
import OrderReports from './pages/OrderReports'
import AdminOrderSummary from './pages/OrderSummary'

axios.defaults.baseURL = 'http://localhost:8000'
axios.defaults.withCredentials = true

function App() {
  return (
    <>
    <Toaster position='bottom-center' toastOptions={{duration: 2000,  
      style: {
      background: '#777',
      color: '#000000',
      animation: 'custom-enter 1s ease',
      fontFamily:'poppins',
      fontWeight:'500',
     
    }
    }}/>
    <Routes>
      <Route path='/' element={<About />} />
      <Route path='/seller/listing' element={<Listing />} />  
      <Route path='/login' element={<Login />} />
      <Route path='/home' element={<Home />} />
      <Route path='/cart' element={<Cart />} />
      <Route path='/checkout' element={< CheckOut/>}/>
      <Route path='/order' element={< OrderConfirm/>}></Route>
      <Route path='/contact' element={<ContactForm />} />
      <Route path='/pricing' element={<Pricing />} />
      <Route path='/register' element={<Register />}/>
      <Route path='/admin/contact' element={<AdminContact />} />
      <Route path='/seller/dashboard' element={<SellerDashboard />}></Route>
      <Route path='/admin/dashboard' element={<AdminDashboard />}></Route>
      <Route path='/admin/manage-listings' element={< ManageListing/>}></Route>
      <Route path='/seller/your-listings' element={< SellerListing/>}></Route>
      <Route path='/myorders' element={< MyOrder/>}></Route>
      <Route path='/order-details/:orderId' element={< OrderDetails/>}></Route>
      <Route path='/seller/sales' element={< Sales/>}></Route>
      <Route path='/admin/reports' element={< AdminReports/>}></Route>
      <Route path='admin/orders' element={<OrderReports />}></Route>
      <Route path='/admin-order-summary/:orderId' element={<AdminOrderSummary />}></Route>
      </Routes>
    </>
  )
}

export default App
