import styled from "styled-components";
import { mobile } from "../responsive";
import react, { useState } from "react";
import { login } from "../redux/apiCalls";
import { useSelector, useDispatch } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import Swal from "sweetalert2";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://images.pexels.com/photos/6984650/pexels-photo-6984650.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")
      center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 25%;
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
  margin: 10px 0;
  padding: 10px;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  margin-right: 10px;
  color: white;
  cursor: pointer;
  margin-bottom: 10px;
  &:disabled {
    color: green;
    cursor: not-allowed;
  }
`;
const Error = styled.span`
  color: red;
`;
const ButtonsContainer = styled.div`
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const UserLink = styled.a`
  margin: 5px 0px;
  font-size: 12px;
  text-decoration: underline;
  cursor: pointer;
`;

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const location = useLocation();

  console.log(!location.pathname.includes("/login"));

  const handleClick = (e) => {
    e.preventDefault();

    login(dispatch, { username, password });
  };

  const { isFetching, error } = useSelector((state) => state.user);

  return (
    <Container>
      <Wrapper>
        <Title>SIGN IN</Title>
        <Form>
          <Input
            placeholder="username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <Input
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
            type="password"
          />
          <ButtonsContainer>
            <Button onClick={handleClick} disabled={isFetching}>
              LOGIN
            </Button>
            <Link to="/">
              <Button>GO HOME</Button>
            </Link>
          </ButtonsContainer>
          {error && <Error>Something went wrong...</Error>}

          <Link to="/register">
            <UserLink>DO NOT YOU REMEMBER THE PASSWORD?</UserLink>
          </Link>

          <Link to="/register">
            <UserLink>CREATE A NEW ACCOUNT</UserLink>
          </Link>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Login;
