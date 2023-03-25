import Cart from "./pages/Cart";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Product from "./pages/Product";
import ProductList from "./pages/ProductList";
import Register from "./pages/Register";
import { useSelector } from "react-redux";
import NewProduct from "./pages/NewProduct";
import Wishlist from "./pages/Wishlist";
import Success from "./pages/Success";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useEffect, useState } from "react";

const App = () => {
  const [user, setUser] = useState("");
  useEffect(() => {
    const func = async () => {
      const user = JSON.parse(localStorage.getItem("profile"));
      setUser(user);
    };
    func();
  }, []);
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/products/:category" element={<ProductList />} />
        <Route path="/products" element={<ProductList />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="success" element={<Success />} />

        <Route path="/register" element={<Register />} />
        <Route path="/newproduct" element={<NewProduct />} />
      </Routes>
    </Router>
  );
};

export default App;
