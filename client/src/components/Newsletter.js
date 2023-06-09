import { Send } from "@material-ui/icons";
import styled from "styled-components";
import { mobile } from "../responsive";

const Container = styled.form`
  height: 30vh;
  background-color: #fcf5f5;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  ${mobile({ height: "20vh" })}
`;
const Title = styled.div`
  margin-bottom: 20px;
  ${mobile({})}
`;

const Desc = styled.div`
  font-weight: 300;
  margin-bottom: 20px;
  ${mobile({ textAlign: "center" })}
`;

const InputContainer = styled.div`
  width: 50%;
  height: 40px;
  background-color: white;
  display: flex;
  justify-content: space-between;
  border: 1px solid lightgray;
  ${mobile({ width: "80%" })}
`;

const Input = styled.input`
  border: none;
  flex: 8;
  padding-left: 20px;
`;

const Button = styled.button`
  flex: 1;
  border: none;
  background-color: #7ac1d7;
  color: black;
  cursor: pointer;
`;

const Newsletter = () => {
  return (
    <Container
      action="https://getform.io/f/6f324ce7-4791-4d44-88f5-8cbffe2742ea"
      method="POST"
    >
      <Desc>Subscribe to get updates</Desc>
      <InputContainer>
        <Input placeholder="Your email" name="mail" type="email" />
        <Button>
          <Send />
        </Button>
      </InputContainer>
    </Container>
  );
};

export default Newsletter;
