import styled from "styled-components";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Delete from "@mui/icons-material/Close";
import { mobile } from "../responsive";
import StripeCheckout from "react-stripe-checkout";
import { useEffect, useState } from "react";
import { publicRequest } from "../requestMethod";
import { useNavigate } from "react-router";
import { userRequest } from "../requestMethod";

const KEY =
  "pk_test_51M1l9eSJcd6tHdOrmYya69bpjXsC4LNoM2Eo2C4XjNE2KnzcjEEvq7u1HPQWvwtwpgyaLPFpW0h9btkLZOsI10G200PRG2wSw9";
const Container = styled.div``;

const Wrapper = styled.div`
  padding: 20px;
  ${mobile({ padding: "10px" })}
`;

const Title = styled.h1`
  font-weight: 300;
  text-align: center;
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`;

const TopButton = styled.button`
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
  border: ${(props) => props.type === "filled" && "none"};
  background-color: ${(props) =>
    props.type === "filled" ? "black" : "transparent"};
  color: ${(props) => props.type === "filled" && "white"};
`;

const TopTexts = styled.div`
  ${mobile({ display: "none" })}
`;
const TopText = styled.span`
  text-decoration: underline;
  cursor: pointer;
  margin: 0px 10px;
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`;

const Info = styled.div`
  flex: 3;
`;

const Product = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`;

const ProductDetail = styled.div`
  flex: 2;
  display: flex;
`;

const Image = styled.img`
  max-width: 200px;
  width: 100%;
  height: 90%;
`;

const Details = styled.div`
  padding-top: 30px;
  padding-bottom: 60px;
  padding-left: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const ProductName = styled.span`
  font-size: 20px;
`;

const ProductColor = styled.span``;

const ProductSize = styled.span``;

const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  cursor: pointer;
`;

const ProductAmount = styled.div`
  font-size: 24px;
  margin: 5px;
  ${mobile({ margin: "5px 15px" })}
`;

const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 200;
  ${mobile({ marginBottom: "20px" })}
`;

const Hr = styled.hr`
  background-color: #eee;
  border: none;
  height: 1px;
`;

const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  height: 50vh;
`;

const SummaryTitle = styled.h1`
  font-weight: 200;
`;

const SummaryItem = styled.div`
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === "total" && "500"};
  font-size: ${(props) => props.type === "total" && "24px"};
`;

const SummaryItemText = styled.span``;

const SummaryItemPrice = styled.span``;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: black;
  color: white;
  font-weight: 600;
`;

const Cart = () => {
  const user = JSON.parse(localStorage.getItem("profile"))._id;
  const [cart, setCart] = useState([]);
  const [products, setProducts] = useState([]);
  const history = useNavigate();
  useEffect(() => {
    const func = async () => {
      const products = await publicRequest.get("/cart");
      setCart(products.data.filter((product) => product.userid === user));
    };
    func();
  }, []);

  const [stripeToken, setStripeToken] = useState(null);
  const onToken = (token) => {
    setStripeToken(token);
  };
  useEffect(() => {
    const getProducts = async (id) => {
      try {
        const res = await publicRequest.get("/products");
        setProducts(res.data);
      } catch (e) {
        console.log(e);
      }
    };
    getProducts();
  }, []);

  const handlee = async () => {
    try {
      const res = await userRequest.post("/checkout/create-checkout-session", {
        products: productss,
        userId: user,
      });
      if (res.data.url) {
        productss.map((product) => {
          deleteCart(product._id);
        });
        window.location.href = res.data.url;
      }
    } catch (e) {
      console.log(e);
    }
  };

  const arr = [];

  for (let i = 0; i < cart.length; i++) {
    arr.push(cart[i].productid);
  }

  const productss = [];

  products.map((product) => {
    if (arr.includes(product._id)) {
      productss.push(product);
    }
  });

  let total = 0;
  const deleteCart = async (productid) => {
    const checkk = user + productid;
    await publicRequest.delete(`/cart/${checkk}`);

    setProducts(products.filter((product) => product._id !== productid));
  };
  const handle = () => {
    history("/");
  };

  // const stripePromise = loadStripe("pk_test_51M1l9eSJcd6tHdOrmYya69bpjXsC4LNoM2Eo2C4XjNE2KnzcjEEvq7u1HPQWvwtwpgyaLPFpW0h9btkLZOsI10G200PRG2wSw9");

  //   const handlePayment = async () => {
  //     try {
  //       const stripe = await stripePromise;
  //       const res = await publicRequest.get("/cart");
  //       await stripe.redirectToCheckout({
  //         sessionId: res.data.stripeSession.id,
  //       });
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };

  return (
    <Container>
      <Navbar />
      <Announcement />
      <Wrapper>
        <Top>
          <TopButton onClick={handle}>CONTINUE SHOPPING</TopButton>
          <Title>YOUR BAG</Title>
          <TopButton type="filled">CHECKOUT NOW</TopButton>
        </Top>
        <Bottom>
          <Info>
            {productss.map(
              (product) =>
                (total += product.price) && (
                  <Product>
                    <ProductDetail>
                      <Image src={product.img} />
                      <Details>
                        <ProductName>
                          <b>Product:</b> {product.title}
                        </ProductName>

                        {product.color && (
                          <ProductColor>
                            <b>Color:</b> {product.color}
                          </ProductColor>
                        )}
                        {product.size && (
                          <ProductSize>
                            <b>Size:</b> {product.size}
                          </ProductSize>
                        )}
                      </Details>
                    </ProductDetail>
                    <PriceDetail>
                      <ProductAmountContainer>
                        <Delete onClick={(event) => deleteCart(product._id)} />
                        {/* <Add />
                        <ProductAmount>1</ProductAmount>
                        <Remove /> */}
                      </ProductAmountContainer>
                      <ProductPrice>{product.price}</ProductPrice>
                    </PriceDetail>
                  </Product>
                )
            )}
            <Hr />
          </Info>
          <Summary>
            <SummaryTitle>ORDER SUMMARY</SummaryTitle>
            <SummaryItem>
              <SummaryItemText>Subtotal</SummaryItemText>
              <SummaryItemPrice>₹ {total}</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Estimated Shipping</SummaryItemText>
              <SummaryItemPrice>₹ 70.00</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Shipping Discount</SummaryItemText>
              {total >= 500 ? (
                <SummaryItemPrice>₹ -70.00</SummaryItemPrice>
              ) : (
                <SummaryItemPrice>₹ -0.00</SummaryItemPrice>
              )}
            </SummaryItem>
            <SummaryItem type="total">
              <SummaryItemText>Total</SummaryItemText>
              {total >= 500 ? (
                <SummaryItemPrice>₹ {total}</SummaryItemPrice>
              ) : (
                <SummaryItemPrice>₹ {total + 70}</SummaryItemPrice>
              )}
            </SummaryItem>

            {/* <StripeCheckout
              name="Lama Shop"
              image="https://avatars.githubusercontent.com/u/1486366?v=4"
              billingAddress
              shippingAddress
              description={
                total >= 500
                  ? `Your total is ₹${total}`
                  : `Your total is ₹${total + 70}`
              }
              amount={total >= 500 ? total * 100 : (total + 70) * 100}
              token={onToken}
              stripeKey={KEY}
            >
             
            </StripeCheckout> */}
            <Button onClick={handlee}>CHECKOUT NOW</Button>
          </Summary>
        </Bottom>
      </Wrapper>

      <Footer />
    </Container>
  );
};

export default Cart;
