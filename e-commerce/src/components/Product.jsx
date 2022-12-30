import styled from "styled-components";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Link } from "react-router-dom";
import { publicRequest } from "../requestMethod";
import { useEffect, useState } from "react";

const Info = styled.div`
  opacity: 0;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 3;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.5s ease;
  cursor: pointer;
`;

const Container = styled.div`
  display: inline-flex;
  flex-direction: row;
  margin: 5px;
  width: 270px;
  height: 270px;
  align-items: center;
  justify-content: center;
  background-color: #f5fbfd;
  position: relative;
  &:hover ${Info} {
    opacity: 1;
  }
`;

const Circle = styled.div`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background-color: white;
  position: absolute;
`;

const Image = styled.img`
  height: 90%;
  z-index: 2; // to bring image in front of circle
  max-width: 100%;
  max-height: 100%;
`;

const Icon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px;
  transition: all 0.5s ease;
  &:hover {
    background-color: #e9f5f5;
    transform: scale(1.1);
  }
`;

const Product = ({ item, func }) => {
  const [present, setPresent] = useState(false);
  const [inCart, setInCart] = useState(false);
  const [products, setProducts] = useState([]);
  const user = JSON.parse(localStorage.getItem("profile"));
  useEffect(() => {
    const func = async () => {
      const productss = await publicRequest.get("/user/wishlist");
      setProducts(productss.data);
      if (user) {
        if (!item.productid) {
          const userid = user._id;
          const productid = item._id;

          const isInWishlist = productss.data.find(
            ({ check }) => check === userid + productid
          );

          if (isInWishlist) {
            setPresent(true);
          }
        }
      }
    };
    func();
  }, []);

  const handleClick = async () => {
    const userid = user._id;
    const productid = item._id;
    const check = userid + productid;
    const img = item.img;
    setPresent(true);
    await publicRequest.post("/user/wishlist", {
      userid,
      productid,
      check,
      img,
    });
  };

  const deleteProduct = async () => {
    if (item.productid) {
      func(item.productid);
    } else {
      const userid = user._id;
      const productid = item._id;
      const check = userid + productid;
      await publicRequest.delete(`/products/wishlist/${check}`);
      products.filter(
        (product) =>
          ({ check }) =>
            check !== userid + productid
      );
      setProducts(products);
      setPresent(false);
    }
  };

  // const [image, setImage] = useState(item.img);

  // const getProduct = async () => {
  //   try {
  //     const res = await publicRequest.get("/products/find/" + item.productid);
  //     setImage(res.data.img);
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };
  // if (item.productid) {
  //   getProduct();
  // }
  const addToCart = async () => {
    try {
      const userid = user._id;
      const productid = item.productid ? item.productid : item._id;
      const check = userid + productid;
      await publicRequest.post("/cart", {
        userid,
        productid,
        check,
      });
      setInCart(true);
    } catch (error) {
      console.log(error);
    }
  };
  const [cart, setCart] = useState([]);
  useEffect(() => {
    const func = async () => {
      const products = await publicRequest.get("/cart");
      setCart(products.data);
      if (user) {
        if (item.productid) {
          const userid = user._id;
          const productid = item.productid;
          const isInCart = products.data.find(
            ({ check }) => check === userid + productid
          );
          if (isInCart) setInCart(true);
        } else {
          const userid = user._id;
          const productid = item._id;
          const isInCart = products.data.find(
            ({ check }) => check === userid + productid
          );
          if (isInCart) setInCart(true);
        }
      }
    };
    func();
  }, []);

  const Wish = () => {
    return (
      user &&
      (present || item.productid ? (
        <Icon style={{ color: "#ff3333" }}>
          <FavoriteIcon onClick={deleteProduct} />
        </Icon>
      ) : (
        <Icon>
          <FavoriteBorderIcon onClick={handleClick} />
        </Icon>
      ))
    );
  };
  const Cart = () => {
    return (
      user &&
      (inCart ? (
        <Icon>
          <ShoppingCartIcon />
        </Icon>
      ) : (
        <Icon>
          <ShoppingCartOutlinedIcon onClick={addToCart} />
        </Icon>
      ))
    );
  };
  return (
    <Container>
      <Image src={item.img} />
      <Info>
        <Cart />
        <Icon>
          {item.productid ? (
            <Link to={`/product/${item.productid}`} style={{ color: "black" }}>
              <SearchOutlinedIcon />
            </Link>
          ) : (
            <Link to={`/product/${item._id}`} style={{ color: "black" }}>
              <SearchOutlinedIcon />
            </Link>
          )}
        </Icon>
        <Wish />
      </Info>
    </Container>
  );
};

export default Product;
