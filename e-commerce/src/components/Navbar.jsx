import React, { useEffect, useState } from "react";
import styled from "styled-components";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import Badge from "@mui/material/Badge";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { mobile } from "../responsive";
import { useSelector } from "react-redux";
import { Link, useNavigate, useResolvedPath } from "react-router-dom";
import { publicRequest } from "../requestMethod";
import { useLocation } from "react-router";

const Container = styled.div`
  height: 60px;
  ${mobile({ height: "50px" })}
  background-color: white;
  width: 100%;
  margin-bottom: 10px;
  margin-top: 5px;
`;
const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  ${mobile({ padding: "10px 0px" })}
`;

const Left = styled.div`
  flex: 1; //to divide space equally
  display: flex;
  align-items: center;
`;

const Language = styled.span`
  font-size: 14 px;
  cursor: pointer;
  ${mobile({ display: "none" })}
`;

const SearchContainer = styled.div`
  border: 0.5px solid lightgray;
  display: flex;
  align-items: center;
  margin-left: 25px;
  padding: 5px;
`;

const Input = styled.input`
  border: none;
  ${mobile({ width: "50px" })}
`;

const Center = styled.div`
  flex: 1;
  text-align: center;
`;

const Logo = styled.h1`
  font-weight: bold;
  ${mobile({ fontSize: "16px" })};
  cursor: pointer;
`;

const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  ${mobile({ flex: 2, justifyContent: "center" })}
`;

const MenuItem = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-left: 25px;
  ${mobile({ fontSize: "12px", marginLeft: "10px" })};
  color: black;
`;

const Navbar = () => {
  const [user, setUser] = useState("");
  const location = useLocation();
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("profile"));
    setUser(user);
  }, []);
  const history = useNavigate();

  const [quantity, setQuantity] = useState(0);
  const getQuantity = async () => {
    const products = (await publicRequest.get("/cart")).data;
    products.filter((product) => product.userid === user._id);
    setQuantity(products.length);
  };
  if (user) getQuantity();
  const handleLogout = (e) => {
    setUser("");
    localStorage.clear();
    history("/");
    setQuantity("");
  };
  const [catToSearch, setCatToSearch] = useState("");
  const search = () => {
    history(`/products/${catToSearch}`);
  };
  const path = location.pathname.split("/")[1];
  const isWishlist = path === "wishlist" ? 1 : 0;
  const addProduct = path === "newproduct" ? 1 : 0;

  return (
    <Container>
      <Wrapper>
        <Left>
          <Language>EN</Language>
          <SearchContainer>
            <Input
              placeholder="Search Category"
              onChange={(e) => setCatToSearch(e.target.value)}
            />
            <SearchOutlinedIcon
              style={{
                color: "gray",
                fontSize: 16,
                cursor: "pointer",
              }}
              onClick={search}
            />
          </SearchContainer>
        </Left>
        <Center>
          <Logo
            onClick={() => {
              history("/");
            }}
          >
            SHOP SHOP
          </Logo>
        </Center>
        <Right>
          {!user && (
            <MenuItem
              onClick={() => {
                history("/register");
              }}
            >
              REGISTER
            </MenuItem>
          )}
          {user && !addProduct && (
            <MenuItem
              onClick={() => {
                history("/newproduct");
              }}
            >
              ADD PRODUCT
            </MenuItem>
          )}
          {user && !isWishlist && (
            <MenuItem
              onClick={() => {
                history("/wishlist");
              }}
            >
              WISHLIST
            </MenuItem>
          )}
          {!user ? (
            <MenuItem
              onClick={() => {
                history("/login");
              }}
            >
              SIGN IN
            </MenuItem>
          ) : (
            <MenuItem onClick={handleLogout}>LOGOUT</MenuItem>
          )}

          <Link to="/cart">
            <MenuItem>
              {user && (
                <Badge badgeContent={quantity} color="primary">
                  <ShoppingCartOutlinedIcon />
                </Badge>
              )}
            </MenuItem>
          </Link>
        </Right>
      </Wrapper>
    </Container>
  );
};

export default Navbar;
