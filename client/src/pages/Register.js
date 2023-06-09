import styled from "styled-components";
import { mobile } from "../responsive";
import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import axios from "axios";
import { publicRequest } from "../requestMethods";
import { login } from "../redux/apiCalls";
import { useSelector, useDispatch } from "react-redux";
import Swal from "sweetalert2";
import Navbar from "../components/Navbar";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #f5fafd;

  display: flex;
  align-items: center;
  justify-content: center;
  ${mobile({ alignItems: "flex-start", paddingTop: "40px" })}
`;

const Wrapper = styled.div`
  width: 40%;
  padding: 20px;
  background-color: #fcf5f5;
  ${mobile({ width: "75%" })}
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;

const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 20px 10px 0px 0px;
  padding: 10px;
  background-color: #fcf5f5;
`;

const Agreement = styled.span`
  font-size: 12px;
  margin: 20px 0px;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: purple;
  color: white;
  cursor: pointer;
  margin-bottom: 10px;
`;

const Error = styled.div`
  color: red;
`;

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmed, setPasswordConfirmed] = useState("");
  const [secondError, setSecondError] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleRegister = async (e) => {
    e.preventDefault();
    if (password !== passwordConfirmed) {
      return;
    }
    try {
      const res = await publicRequest.post("/auth/register", {
        username,
        email,
        password,
      });
      login(dispatch, { username, password });

      setSecondError(false);
    } catch (error) {
      setSecondError(true);
    }
  };
  return (
    <>
      <Navbar />

      <Container>
        <Wrapper>
          <Title>CREATE AN ACCOUNT</Title>
          <Form>
            <Input
              placeholder="username"
              onChange={(e) => setUsername(e.target.value)}
            />
            <Input
              placeholder="email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              placeholder="password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <Input
              placeholder="confirm password"
              onChange={(e) => setPasswordConfirmed(e.target.value)}
            />
            <Agreement>
              By creating an account, I consent to the processing of my personal
              data in accordance with the <b>PRIVACY POLICY</b>
            </Agreement>
            <Button onClick={handleRegister}>CREATE</Button>
          </Form>
          <Link to="/">
            <Button>GO HOME</Button>
            {password !== passwordConfirmed && (
              <Error>Passwords do not match</Error>
            )}
            {secondError && <Error>Fill the form again please</Error>}
          </Link>
        </Wrapper>
      </Container>
    </>
  );
};

export default Register;
