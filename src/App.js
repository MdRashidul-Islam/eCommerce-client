import { Route, Routes } from "react-router-dom";
import "./App.css";
import AuthProvider from "./Context/AuthProvider";
import AdminRoute from "./pages/Authentication/AdminRoute/AdminRoute";
import Login from "./pages/Authentication/Login/Login";
import PrivateRoute from "./pages/Authentication/PrivateRoute/PrivateRoute";
import Register from "./pages/Authentication/Register/Register";
import AddProduct from "./pages/Dashboard/AddProduct/AddProduct";
import Dashboard from "./pages/Dashboard/Dashboard/Dashboard";
import Feedback from "./pages/Dashboard/Feedback/Feedback";
import MakeAdmin from "./pages/Dashboard/MakeAdmin/MakeAdmin";
import ManageAllOrders from "./pages/Dashboard/ManageAllOrders/ManageAllOrders";
import ManageAllProduct from "./pages/Dashboard/ManageAllProduct/ManageAllProduct";
import MyOrder from "./pages/Dashboard/MyOrder/MyOrder";
import Payment from "./pages/Dashboard/Payment/Payment";

import Home from "./pages/Home/Home/Home";
import Products from "./pages/Products/Products";
import ProductDetails from "./pages/shared/ProductDetails/ProductDetails";

function App() {
  return (
    <>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Home />}>
            <Route path="home" element={<Home />}></Route>
          </Route>

          <Route
            path="products"
            element={
              <PrivateRoute>
                <Products />
              </PrivateRoute>
            }
          ></Route>
          <Route
            path="dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          >
            <Route path="myOrders" element={<MyOrder />}></Route>
            <Route path="feedback" element={<Feedback />} />
            <Route path="payment" element={<Payment />}></Route>
            <Route path="payment/:_id" element={<Payment />}></Route>

            <Route
              path="addProduct"
              element={
                <AdminRoute>
                  <AddProduct />
                </AdminRoute>
              }
            />
            <Route
              path="makeAdmin"
              element={
                <AdminRoute>
                  <MakeAdmin />
                </AdminRoute>
              }
            />
            <Route path="manageAllProducts" element={<ManageAllProduct />} />
            <Route
              path="manageAllOrders"
              element={
                <AdminRoute>
                  <ManageAllOrders />
                </AdminRoute>
              }
            />
          </Route>
          <Route
            path="productDetails/:_id"
            element={
              <PrivateRoute>
                <ProductDetails />
              </PrivateRoute>
            }
          ></Route>
          <Route
            path="products/productDetails/:_id"
            element={<ProductDetails />}
          ></Route>
          <Route path="login" element={<Login />}></Route>
          <Route path="register" element={<Register />}></Route>
        </Routes>
      </AuthProvider>
    </>
  );
}

export default App;
