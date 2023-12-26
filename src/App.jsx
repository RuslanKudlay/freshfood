import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import Home from './components/home/Home';
import { Routes, Route } from 'react-router-dom';
import NotFound from './components/notFound/NotFound';
import Login from './components/login/Login';
import AdminDashboard from './components/admin/adminDashboard/AdminDashboard'
import Measurement from './components/admin/adminDashboard/measurement/Measurement';
import Product from './components/admin/adminDashboard/products/Product';
import Role from './components/admin/adminDashboard/roles/Role';
import TypeProduct from './components/admin/adminDashboard/typeProducts/TypeProduct';
import User from './components/admin/adminDashboard/users/User';


const Admin = React.lazy(() => import('./components/admin/Admin'));

const App = () => {
  return (
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route path="/admin" element={<Admin />}>

        <Route path="login" element={<Login />} />

        <Route path="dashboard" element={<AdminDashboard />}>
          <Route path="measurement" element={<Measurement />} />
          <Route path="product" element={<Product />} />
          <Route path="role" element={<Role />} />
          <Route path="type-product" element={<TypeProduct />} />
          <Route path="user" element={<User />} />
        </Route>

      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
