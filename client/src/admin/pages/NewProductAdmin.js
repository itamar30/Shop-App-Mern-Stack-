import React, { useState } from "react";
import { useNavigate } from "react-router";
import styled from "styled-components";
import { publicRequest, userRequest } from "../../requestMethods";
import { mobile } from "../../responsive";
import app from "../firebase";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";

import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { UploadFile } from "@mui/icons-material";

const Title = styled.h3`
  font-size: 40px;
  font-weight: 700;
`;

const Container = styled.div`
  margin: 30px;
  padding-bottom: 200px;

  ${mobile({ paddingBottom: "200px" })}
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
  justify-content: space-around;
  ${mobile({ flexDirection: "column" })}
`;
const LeftSide = styled.div`
  flex: 1;
  flex-direction: column;
`;

const RightSide = styled.div`
  flex: 1;
  flex-direction: column;
  justify-content: space-between;
`;
const CenterSide = styled.div`
  flex: 0.1;
`;
const MobileDiv = styled.div`
  ${mobile({ width: "100%" })}
`;

const Label = styled.label`
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 20px;
  margin-top: 20px;
  margin-right: ${(props) => props.myType && "10px"};
  margin-left: ${(props) => props.myType && "10px"};
`;

const Input = styled.input`
  font-size: 20px;
  background-color: transparent;
  border: 1px solid black;
  border-radius: 5px;
  padding: 10px 0;
  padding-left: 8px;
`;

const ColorContainer = styled.div`
  margin: 21px 0px;
  ${mobile({ margin: "0px" })}
`;
const Bottom = styled.div``;
const Both = styled.div`
  flex-direction: column;
`;

const CheckBox = styled.div`
  display: flex;
  border: 1px solid black;
  flex-wrap: wrap;
  padding: 20px;
`;

const DescInput = styled.textarea`
  font-size: 20px;
  background-color: transparent;
  border: 1px solid black;
  border-radius: 5px;
  height: 160px;
`;

const Right2 = styled.input`
  flex: 1;
`;
const Left2 = styled.input`
  flex: 1;
`;

const FileInput = styled.input`
  font-size: 20px;
  background-color: transparent;

  border-radius: 5px;
  padding: 10px 0;
  padding-left: 8px;
`;

const LabelinputContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 70%;
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
  ${mobile({ width: "70%" })}
`;

const Error = styled.div`
  color: red;
  font-size: 20px;
`;

const NewProductAdmin = () => {
  const [imgPath, setImgPath] = useState(null);
  const [size, setSize] = useState([]);
  const [color, setColor] = useState([]);
  const [category, setCategory] = useState([]);
  const [price, setPrice] = useState(null);
  const [title, setTitle] = useState(null);
  const [desc, setDesc] = useState(null);
  const [produt, setProduct] = useState({});
  const [isEroor, setIsError] = useState(false);
  const [error, setError] = useState("");
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const user = useSelector((state) => state.user.currentUser);

  const navigate = useNavigate();

  const handleSizes = (checked, name) => {
    if (checked && size.indexOf(name) === -1) {
      setSize((prev) => [...prev, name]);
    }
    if (!checked) {
      setSize((prev) => prev.filter((s) => s !== name));
    }
  };
  const handleColors = (checked, name) => {
    if (checked && color.indexOf(name) === -1) {
      setColor((prev) => [...prev, name]);
    }
    if (!checked) {
      setColor((prev) => prev.filter((s) => s !== name));
    }
  };
  const handleCategories = (checked, name) => {
    if (checked && category.indexOf(name) === -1) {
      setCategory((prev) => [...prev, name]);
    }
    if (!checked) {
      setCategory((prev) => prev.filter((s) => s !== name));
    }
  };

  const uploadFile = async () => {
    if (user === null || !user.isAdmin) {
      Swal.fire(
        "LOG IN AS ADMIN PLEASE",
        "you are not alowed to do that",
        "question"
      );
    } else {
      let timerInterval;

      if (
        title === null ||
        desc === null ||
        price === null ||
        size.length === 0 ||
        color.length === 0 ||
        category.length === 0
      ) {
        setIsError(true);
        return;
      }
      setIsError(false);
      const storage = getStorage(app);
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);

      Swal.fire({
        title: "Details Are being saved",

        timer: 3000,
        timerProgressBar: true,
        didOpen: () => {
          Swal.showLoading();
          const b = Swal.getHtmlContainer().querySelector("b");
          timerInterval = setInterval(() => {
            b.textContent = Swal.getTimerLeft();
          }, 100);
        },
        willClose: () => {
          clearInterval(timerInterval);
        },
      }).then((result) => {
        /* Read more about handling dismissals below */
        if (result.dismiss === Swal.DismissReason.timer) {
          console.log("I was closed by the timer");
        }
      });

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Observe state change events such as progress, pause, and resume
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
            default:
          }
        },
        (error) => {
          // Handle unsuccessful uploads
        },

        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            const res = await userRequest.post("/products", {
              title,
              desc,
              price,
              img: downloadURL,
              color,
              size,
              category,
            });
            console.log(res.data);
          });
          setTimeout(() => {
            navigate("/productsAdmin");
          }, 3100);
        }
      );
    }
  };

  return (
    <Container>
      <Title>New Product</Title>

      <Form>
        <LeftSide>
          <LabelinputContainer>
            <Label for="Product Image">Product Image</Label>
            <FileInput
              type="file"
              placeholder="Product Image"
              id="Product Image"
              name="Product Image"
              onChange={(e) => {
                setFile(e.target.files[0]);
                setFileName(e.target.files[0]?.name + new Date().getTime());
              }}
            ></FileInput>
          </LabelinputContainer>
          <LabelinputContainer>
            <Label for="Product Name">Product Name</Label>
            <Input
              placeholder="Product Name"
              id="Product Name"
              name="Product Name"
              onChange={(e) => setTitle(e.target.value)}
            ></Input>
          </LabelinputContainer>

          <LabelinputContainer>
            <Label for="desc">Product Description</Label>
            <DescInput
              placeholder="Description"
              onChange={(e) => setDesc(e.target.value)}
            ></DescInput>
          </LabelinputContainer>
          <LabelinputContainer>
            <Label for="price">Price</Label>
            <Input
              placeholder="Price"
              id="price"
              name="price"
              type={Number}
              onChange={(e) => setPrice(e.target.value)}
            ></Input>
          </LabelinputContainer>
        </LeftSide>

        <RightSide>
          <LabelinputContainer>
            <Label>Size</Label>

            <CheckBox>
              <MobileDiv>
                <Input
                  type="checkbox"
                  id="S"
                  name="S"
                  onChange={(e) => {
                    handleSizes(e.target.checked, e.target.name);
                  }}
                />
                <Label myType={true} for="S">
                  S
                </Label>

                <Input
                  type="checkbox"
                  id="M"
                  name="M"
                  onChange={(e) => {
                    handleSizes(e.target.checked, e.target.name);
                  }}
                />
                <Label for="M" myType={true}>
                  M
                </Label>
              </MobileDiv>
              <MobileDiv>
                <Input
                  type="checkbox"
                  id="L"
                  name="L"
                  onChange={(e) => {
                    handleSizes(e.target.checked, e.target.name);
                  }}
                />
                <Label for="L" myType={true}>
                  L
                </Label>

                <Input
                  type="checkbox"
                  id="XL"
                  name="XL"
                  onChange={(e) => {
                    handleSizes(e.target.checked, e.target.name);
                  }}
                />
                <Label for="XL" myType={true}>
                  XL
                </Label>
              </MobileDiv>
            </CheckBox>
            <Label>Color</Label>

            <CheckBox>
              <ColorContainer>
                <MobileDiv>
                  <Input
                    type="checkbox"
                    id="Red"
                    name="Red"
                    onChange={(e) => {
                      handleColors(e.target.checked, e.target.name);
                    }}
                  />
                  <Label
                    for="Red"
                    myType={true}
                    style={{ marginRight: "25px" }}
                  >
                    Red
                  </Label>

                  <Input
                    type="checkbox"
                    id="Blue"
                    name="Blue"
                    onChange={(e) => {
                      handleColors(e.target.checked, e.target.name);
                    }}
                  />
                  <Label for="Blue" myType={true}>
                    Blue
                  </Label>
                </MobileDiv>

                <MobileDiv>
                  <Input
                    type="checkbox"
                    id="White"
                    name="White"
                    onChange={(e) => {
                      handleColors(e.target.checked, e.target.name);
                    }}
                  />
                  <Label for="White" myType={true}>
                    White
                  </Label>

                  <Input
                    type="checkbox"
                    id="Black"
                    name="Black"
                    onChange={(e) => {
                      handleColors(e.target.checked, e.target.name);
                    }}
                  />
                  <Label for="Black" myType={true}>
                    Black
                  </Label>
                </MobileDiv>
              </ColorContainer>

              <ColorContainer>
                <MobileDiv>
                  <Input
                    type="checkbox"
                    id="Green"
                    name="Green"
                    onChange={(e) => {
                      handleColors(e.target.checked, e.target.name);
                    }}
                  />
                  <Label for="Green" myType={true}>
                    Green
                  </Label>

                  <Input
                    type="checkbox"
                    id="Brown"
                    name="Brown"
                    onChange={(e) => {
                      handleColors(e.target.checked, e.target.name);
                    }}
                  />
                  <Label for="Brown" myType={true}>
                    Brown
                  </Label>
                </MobileDiv>
                <MobileDiv>
                  <Input
                    type="checkbox"
                    id="Yellow"
                    name="Yellow"
                    onChange={(e) => {
                      handleColors(e.target.checked, e.target.name);
                    }}
                  />
                  <Label for="Yellow" myType={true}>
                    Yellow
                  </Label>
                </MobileDiv>
              </ColorContainer>
            </CheckBox>
            <Label>Category</Label>

            <CheckBox>
              <MobileDiv>
                <Input
                  type="checkbox"
                  id="jeans"
                  name="jeans"
                  onChange={(e) => {
                    handleCategories(e.target.checked, e.target.name);
                  }}
                />
                <Label for="jeans" myType={true}>
                  jeans
                </Label>

                <Input
                  type="checkbox"
                  id="coats"
                  name="coats"
                  onChange={(e) => {
                    handleCategories(e.target.checked, e.target.name);
                  }}
                />
                <Label for="coats" myType={true}>
                  coats
                </Label>
              </MobileDiv>
              <MobileDiv>
                <Input
                  type="checkbox"
                  id="shirts"
                  name="shirts"
                  onChange={(e) => {
                    handleCategories(e.target.checked, e.target.name);
                  }}
                />
                <Label for="shirts" myType={true}>
                  shirts
                </Label>
              </MobileDiv>
            </CheckBox>
          </LabelinputContainer>
        </RightSide>
      </Form>
      {isEroor && <Error>Fill all fields please</Error>}
      <Center>
        <Button onClick={uploadFile}>Create</Button>
      </Center>
    </Container>
  );
};

export default NewProductAdmin;
