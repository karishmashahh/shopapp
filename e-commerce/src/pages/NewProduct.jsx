import styled from "styled-components";
import { mobile } from "../responsive";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import FileBase from "react-file-base64";
import { publicRequest } from "../requestMethod";
import Navbar from "../components/Navbar";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://images.pexels.com/photos/6984661/pexels-photo-6984661.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")
      center;
  background-size: cover;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  padding-top: 30px;
  width: 40%;
  padding: 20px;
  background-color: white;
  ${mobile({ width: "75%" })}
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 20px 10px 0px 0px;
  padding: 10px;
`;

const Button = styled.button`
  width: 50%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
  margin-top: 10px;
`;
const Linkk = styled.a`
  margin: 20px 0px;
  font-size: 12px;
  text-decoration: underline;
  cursor: pointer;
  color: black;
`;
const Contain = styled.div`
  display: flex;
  flex: 2;
  flex-direction: column;
  padding: 10px;
`;
const Error = styled.span`
  color: red;
`;

const NewProduct = () => {
  const dispatch = useDispatch();
  const history = useNavigate();
  const [title, setTitle] = useState("");
  const [brand, setBrand] = useState("");
  const [desc, setDesc] = useState("");
  const [category, setCategories] = useState("");
  const [section, setSection] = useState("Men");
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [price, setPrice] = useState("");
  const [img, setImg] = useState("");
  let error = "";

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      category.push(section.toLowerCase());
      const res = await publicRequest.post("/products/newproduct", {
        brand,
        title,
        desc,
        img,
        category,
        section,
        size,
        color,
        price,
      });
      history("/");
    } catch (e) {
      error = 1;
      console.log(e);
    }
  };
  return (
    <Container>
      <Navbar />
      <Wrapper>
        <Title>ADD NEW PRODUCT</Title>
        <Form>
          <Input
            placeholder="Name of Product"
            onChange={(e) => setTitle(e.target.value)}
          />
          <Input
            placeholder="Brand of Product"
            onChange={(e) => setBrand(e.target.value)}
          />
          <Input
            placeholder="Description"
            onChange={(e) => setDesc(e.target.value)}
          />
          <Input
            placeholder="Categories"
            onChange={(e) => setCategories(e.target.value.split(","))}
          />
          <select
            name="section"
            id="section"
            style={{
              flex: 1,
              minwidth: "40%",
              margin: "20px 10px 0px 0px",
              padding: "10px",
            }}
            onChange={(e) => setSection(e.target.value)}
          >
            <option value="Men" selected>
              Men
            </option>
            <option value="Women">Women</option>
            <option value="Accessories">Accesories</option>
          </select>
          <Input placeholder="Size" onChange={(e) => setSize(e.target.value)} />

          <Input
            placeholder="Color"
            onChange={(e) => setColor(e.target.value)}
          />
          <Input
            placeholder="Price"
            onChange={(e) => setPrice(e.target.value)}
          />
          <FileBase
            type="file"
            multiple={false}
            onDone={({ base64 }) => setImg(base64)}
          />
          <Contain>
            <Button onClick={handleClick}>ADD</Button>
            {error && <Error>Something went wrong..</Error>}
          </Contain>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default NewProduct;
