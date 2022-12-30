import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import styled from "styled-components";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Newsletter from "../components/Newsletter";
import Products from "../components/Products";
import { mobile } from "../responsive";
import { useDispatch } from "react-redux";
import { publicRequest } from "../requestMethod";
import Product from "../components/Product";

const Container = styled.div`
  padding: 20px;
  display: inline-flex;
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap;
`;

const Wishlist = () => {
  const dispatch = useDispatch();
  const userid = JSON.parse(localStorage.getItem("profile"))._id;
  const [allProducts, setAllProducts] = useState([]);

  useEffect(() => {
    const func = async () => {
      const products = await publicRequest.get("/user/wishlist");
      setAllProducts(
        products.data.filter((product) => product.userid === userid)
      );
    };
    func();
  }, []);
  const deleteProduct = async (id) => {
    const checkk = userid + id;
    await publicRequest.delete(`/products/wishlist/${checkk}`);

    setAllProducts(allProducts.filter((product) => product.check !== checkk));
  };

  return (
    <div>
      <Announcement />
      <Navbar />
      <Container>
        {allProducts.map((item) => (
          <Product item={item} key={item.productid} func={deleteProduct} />
        ))}
      </Container>
      <Newsletter />
      <Footer />
    </div>
  );
};

export default Wishlist;
