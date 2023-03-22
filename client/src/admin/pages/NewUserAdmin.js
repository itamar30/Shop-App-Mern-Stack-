import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { mobile } from "../../responsive";
import { useLocation } from "react-router";
import { userRequest } from "../../requestMethods";
import Swal from "sweetalert2";

const Title = styled.h3`
  font-size: 40px;
  font-weight: 700;
`;

const Container = styled.div`
  margin: 30px;
  padding-bottom: 200px;

  ${mobile({ paddingBottom: "50px" })}
`;
const InnerContainer = styled.div``;

const Left = styled.div`
  flex: 1;
`;

const Right = styled.div`
  flex: 1;
`;
const Center = styled.div`
  flex: 0.3;
`;
const MostCenter = styled.div`
  flex: 0.1;
`;

const Form = styled.form`
  display: flex;
  margin-top: 30px;
  ${mobile({ flexDirection: "column" })}
`;

const Label = styled.label`
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 20px;
  margin-top: 10px;
`;

const Input = styled.input`
  font-size: 20px;
  background-color: transparent;
  border: 1px solid black;
  border-radius: 5px;
  padding: 10px 0;
  padding-left: 8px;
`;

const LabelinputContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
const Select = styled.select`
  background-color: transparent;
  margin-bottom: 20px;
  padding-left: 8px;

  font-size: 20px;
  padding: 10px 0;
`;
const Option = styled.option`
  background-color: transparent;
  padding-left: 8px;
`;

const Button = styled.div`
  height: 35px;
  width: 180px;
  font-size: 20px;
  text-align: center;
  padding: 4px;
  background-color: darkblue;
  color: white;
  cursor: pointer;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 52px;
`;

const NewUserAdmin = () => {
  const handleCreate = () => {
    Swal.fire(
      "LOG IN AS ADMIN PLEASE",
      "you are not alowed to do that",
      "question"
    );
  };

  return (
    <Container>
      <Title>New User</Title>

      <Form>
        <Left>
          <LabelinputContainer>
            <Label for="User Name">User Name</Label>
            <Input
              placeholder="User Name"
              id="User Name"
              name="User Name"
            ></Input>
          </LabelinputContainer>
          <LabelinputContainer>
            <Label for="Email">Email</Label>
            <Input placeholder="Email" id="Email" name="Email"></Input>
          </LabelinputContainer>
          <LabelinputContainer>
            <Label for="Phone">Phone</Label>
            <Input placeholder="Phone" id="Phone" name="Phone"></Input>
          </LabelinputContainer>
          <LabelinputContainer>
            <LabelinputContainer>
              <Label for="Gender">Gender</Label>

              <Select name="Gender" id="Gender">
                <Option value="Gender">Gender</Option>
                <Option value="Male">Male</Option>
                <Option value="Female">Female</Option>
              </Select>
            </LabelinputContainer>
          </LabelinputContainer>
        </Left>
        <MostCenter></MostCenter>
        <Right>
          <LabelinputContainer>
            <Label for="Full Name">Full Name</Label>
            <Input
              placeholder="Full Name"
              id="Full Name"
              name="Full Name"
            ></Input>
          </LabelinputContainer>
          <LabelinputContainer>
            <Label for="Password">Password</Label>
            <Input placeholder="Password" id="Password" name="Password"></Input>
          </LabelinputContainer>
          <LabelinputContainer>
            <Label for="Adress">Adress</Label>
            <Input placeholder="Adress" id="Adress" name="Adress"></Input>
          </LabelinputContainer>
          <LabelinputContainer>
            <Label for="Active">Active</Label>

            <Select name="Active" id="Active">
              <Option value="Yes">Yes</Option>
              <Option value="No">No</Option>
            </Select>
          </LabelinputContainer>
        </Right>
        <Center></Center>
      </Form>
      <Button onClick={handleCreate}>Create</Button>
    </Container>
  );
};

export default NewUserAdmin;
