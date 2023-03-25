import styled from "styled-components";
import { mobile } from "../responsive";
import { useNavigate } from "react-router";
import logos from "../Images/logoss.png";
import { Link } from "react-router-dom";

const Container = styled.div`
  width: 100%;
  height: 70vh;
  display: flex;
  position: relative;
  overflow: hidden;
  ${mobile({ display: "none" })}
  margin-bottom: 40px;
`;

const ImgContainer = styled.div`
  height: 100%;
  width: 100%;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
`;

const Image = styled.img`
  height: 100%;
  width: 100%;
  object-fit: contain;
  align-items: center;
  justify-content: center;
`;
const InfoContainer = styled.div`
  padding: 50px;
`;

const Title = styled.h1`
  font-size: 70px;
`;

const Desc = styled.p`
  margin: 50px 0px;
  font-size: 20px;
  font-weight: 500;
  letter-spacing: 3px;
`;

const Button = styled.button`
  padding: 10px;
  font-size: 20px;
  background-color: transparent;
  cursor: pointer;
  border: 1px solid black;
`;

const Brands = () => {
  const history = useNavigate();

  return (
    <Container>
      <Link to={"/products"}>
        <ImgContainer>
          <Image src={logos} />
        </ImgContainer>
      </Link>
      {/* <InfoContainer>
        <Title>fvfv</Title>
        <Desc>vfvf</Desc>

        <Button>SHOW NOW</Button>
      </InfoContainer> */}
    </Container>
  );
};

export default Brands;
