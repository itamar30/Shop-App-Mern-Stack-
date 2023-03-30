import React, { useState, useEffect } from "react";
import styled from "styled-components";
import ProductChart from "../components/ProductChart";
import { productData } from "../myData";
import PublishIcon from "@mui/icons-material/Publish";
import { Link, useNavigate } from "react-router-dom";
import { mobile } from "../../responsive";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { updateProduct } from "../../redux/apiCalls";
import { useDispatch } from "react-redux";
import { userRequest } from "../../requestMethods";
import app from "../firebase";
import Swal from "sweetalert2";
import { isMobile } from "../../responsive";

import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { UploadFile } from "@mui/icons-material";
import Navbar from "../../components/Navbar";
const Container = styled.div`
  padding: 30px;
  padding-bottom: 200px;
  background-color: #f5fafd;
  ${mobile({ paddingBottom: "250px" })}
`;

const Title = styled.h3`
  font-size: 40px;
  font-weight: 700;
`;
const SmallStitle = styled.h3`
  font-size: 30px;
  font-weight: 700;
`;

const Left = styled.div`
  flex: 3;
  -webkit-box-shadow: 0px 0px 15px -10px black;
  box-shadow: 0px 0px 15px -10px black;
  border: 1px solid gray;
  padding: 25px;
  ${mobile({ marginBottom: "40px", marginTop: "20px" })}
`;
const Center = styled.div`
  flex: 0.3;
`;
const Right = styled.div`
  flex: 2;
  -webkit-box-shadow: 0px 0px 15px -10px black;
  box-shadow: 0px 0px 15px -10px black;
  border: 1px solid gray;
`;
const InnerContainer = styled.div`
  display: flex;
  margin: 30px 20px;
  ${mobile({ flexDirection: "column" })}
`;
const InnerContainerTwo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80%;
  margin-left: 40px;
  margin-top: 10px;

  ${mobile({ height: "400px" })}
`;

const MobileDiv3 = styled.div`
  ${mobile({ height: "80px", marginBottom: "50px" })}
`;

const InnerLeft = styled.div`
  flex: 1;
  justify-content: flex-end;
  ${mobile({
    height: "100%",
  })}
`;
const InnerRight = styled.div`
  flex: 1;
  justify-content: flex-start;
  ${mobile({
    narginRight: "30px",

    height: "100%",
  })}
`;
const IconContainer = styled.div`
  height: 100px;
  display: flex;
  align-items: center;
`;
const SmallestTitle = styled.div`
  font-size: 25px;
  font-weight: bold;
  height: 100px;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Icon = styled.img`
  height: 70px;
  width: 70px;
  border-radius: 50%;
`;

const LeftRow = styled.div`
  font-weight: bold;
  font-size: 20px;
  margin: 10px 0;
`;

const RightRow = styled.div`
  font-weight: 300;
  font-size: 20px;
  margin: 10px 0;
`;

const Form = styled.form`
  margin: 20px 0;
`;

const BottomContainer = styled.div`
  -webkit-box-shadow: 0px 0px 15px -10px black;
  box-shadow: 0px 0px 15px -10px black;
  border: 1px solid gray;
  margin: 30px 20px;
  ${mobile({ paddingBottom: "25px", marginTop: "30px" })}
`;

const FormTitle = styled.div`
  font-size: 20px;
  font-weight: 400;
`;

const LabelinputContainer = styled.div`
  display: flex;
  flex-direction: column;

  ${mobile({ width: "80%" })}
`;
const CheckBox = styled.div`
  display: flex;
  border: 1px solid gray;
  flex-wrap: wrap;
  padding: 20px;
`;
const ColorContainer = styled.div`
  margin: 21px 0px;
  ${mobile({ margin: "0px" })}
`;

const LeftSide = styled.div`
  flex: 1;
`;
const MobileDiv = styled.div`
  ${mobile({ flexDirection: "column" })}
`;
const RightSide = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-end;
  ${mobile({ flexDirection: "column" })}
`;
const BothSides = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 10px 30px;

  ${mobile({
    flexDirection: "column",
    paddingBottom: "30px",
    marginTop: "30px",
    width: "100%",
  })}
`;

const Button = styled.div`
  height: 35px;

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
  overflow-x: hidden;
`;

const Label = styled.label`
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 20px;
  margin-top: 10px;
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
  ${mobile({
    fontSize: "15px",
  })}
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

const ImgRight = styled.img`
  height: 150px;
  width: 150px;
  border-radius: 15px;
`;

const SomeDiv = styled.div`
  display: flex;
  justify-content: space-between;

  width: 70%;
`;
const InnerRightSideDiv = styled.div`
  flex-direction: column;
  margin-top: 50px;
  margin-right: 50px;
`;

const IconDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-left: 30px;
  cursor: pointer;
`;
const SomeDiv2 = styled.div`
  display: flex;
`;

const CreateButton = styled.div`
  height: 35px;
  width: 90px;
  font-size: 20px;
  font-weight: 400;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  background-color: teal;
  color: white;
`;
const ColorCircle = styled.div`
  background-color: ${(props) => props.back};
  height: 20px;
  width: 20px;
  border-radius: 50%;
  border: 1px solid black;
  ${mobile({ height: "15px", width: "15px" })}
`;

const TopContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin: 10px 20px;
`;
const FileInput = styled.input`
  font-size: 20px;
  background-color: transparent;

  border-radius: 5px;
  padding: 10px 0;
  padding-left: 8px;
  margin: 10px, 0;
  ${mobile({
    marginTop: "20px",
    marginBottom: "20px",
  })}
`;

const ProductAdmin = () => {
  const MONTHS = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Agu",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  let sumSales = 0;
  const [product, setproduct] = useState();

  const location = useLocation();
  const productId = location.pathname.split("/")[2];
  const [pStats, setPStats] = useState([]);
  const [price, setPrice] = useState(product?.price);
  const [title, setTitle] = useState(product?.title);
  const [desc, setDesc] = useState(product?.desc);
  const [inStock, setInStock] = useState(true);
  const [flag, setflag] = useState(false);
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [size, setSize] = useState([]);
  const [color, setColor] = useState([]);
  const [category, setCategory] = useState([]);
  const [allOrders, setAllOrders] = useState([]);
  const [sum, setSum] = useState(0);
  const [sales, setSales] = useState([]);
  const [flag2, setFlag2] = useState(false);
  const [data, setData] = useState([]);
  const [noSales, setNoSales] = useState([
    {
      name: MONTHS[new Date().getMonth() - 1],
      Sales: 0,
    },
  ]);
  const user = useSelector((state) => state.user.currentUser);

  const navigate = useNavigate();

  const handleSizes = (checked, name) => {
    if (checked && size?.indexOf(name) === -1) {
      setSize((prev) => [...prev, name]);
    }
    if (!checked) {
      setSize((prev) => prev.filter((s) => s !== name));
    }
  };
  const handleColors = (checked, name) => {
    if (checked && color?.indexOf(name) === -1) {
      setColor((prev) => [...prev, name]);
    }
    if (!checked) {
      setColor((prev) => prev.filter((s) => s !== name));
    }
  };
  const handleCategories = (checked, name) => {
    if (checked && category?.indexOf(name) === -1) {
      setCategory((prev) => [...prev, name]);
    }
    if (!checked) {
      setCategory((prev) => prev.filter((s) => s !== name));
    }
  };

  useEffect(() => {
    const getProdcuts = async () => {
      const res = await userRequest.get("/products/" + productId);
      setproduct(res.data);
      setflag(true);
    };
    const getOrders = async () => {
      const res = await userRequest.get("/orders");
      setAllOrders(res.data);
    };
    const getByMonth = async () => {
      let myDataForChart = [];

      let sum = [];
      let arr = new Array(12).fill(0);
      let res = await userRequest.get("/orders/findProductsById/" + productId);
      res = res.data;
      res = res.map((item) => {
        sum.push(item.month);
        sum.push(item.total[0]);
      });
      for (let i = 0; i < sum.length; i = i + 2) {
        arr[sum[i] - 1] += sum[i + 1];
      }

      for (let j = 0; j < arr.length; j++) {
        myDataForChart.push({
          name: MONTHS[j],
          Sales: arr[j],
        });
      }
      setData(myDataForChart);
    };

    const getOrderById = () => {
      for (let i = 0; i < allOrders.length; i++) {
        for (let j = 0; j < allOrders[i].products.length; j++) {
          if (allOrders[i].products[j]._id === productId) {
            sumSales += allOrders[i].products[j].quantity;

            setSum((prev) => prev + allOrders[i].products[j].quantity);
            setSales((prev) => [
              ...prev,
              {
                name: MONTHS[
                  new Date(allOrders[i].products[j].createdAt).getMonth()
                ],
                Sales: allOrders[i].products[j].quantity,
              },
            ]);
          }
        }
      }
    };

    const getNumberOfSalesById = async () => {
      const res = await userRequest.get("orders/finding/" + productId);
      setSales(res.data[0].suma);
    };

    getProdcuts();
    getOrders();
    getNumberOfSalesById();
    getByMonth();
  }, [flag, flag2]);

  const uploadFile = async () => {
    if (user === null || !user.isAdmin) {
      Swal.fire(
        "LOG IN AS ADMIN PLEASE",
        "you are not alowed to do that",
        "question"
      );
    } else {
      let timerInterval;
      if (file !== null) {
        Swal.fire({
          title: "Details Are Being Updated",
          timer: 3500,
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
      }

      if (file === null || fileName === null) {
        Swal.fire({
          title: "Details Are Being Updated",
          timer: 2000,
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

        const res = await userRequest.put("/products/" + productId, {
          price: price || product?.price,
          title: title || product?.title,
          desc: desc || product?.desc,
          inStock: inStock || product?.inStock,
          color: color.length !== 0 ? color : product?.color,
          size: size.length !== 0 ? size : product?.size,
          category: category.length !== 0 ? category : category?.color,
        });

        setTimeout(() => {
          navigate("/productsAdmin");
        }, 2500);
        return;
      }
      const storage = getStorage(app);
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);

      // Register three observers:
      // 1. 'state_changed' observer, called any time the state changes
      // 2. Error observer, called on failure
      // 3. Completion observer, called on successful completion
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

        async () => {
          // Handle successful uploads on complete
          // For instance, get the download URL: https://firebasestorage.googleapis.com/...
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            const res = await userRequest.put("/products/" + productId, {
              price,
              title,
              desc,
              inStock,
              img: downloadURL,
              color,
              size,
              category,
            });

            navigate("/productsAdmin");
          });
        }
      );
    }
  };
  console.log(data);
  return (
    <>
      <Navbar />
      <Container>
        <TopContainer>
          <Title>Product</Title>
          <Link to="/newProductAdmin" style={{ textDecoration: "none" }}>
            <CreateButton>Create</CreateButton>
          </Link>
        </TopContainer>
        <InnerContainer>
          <Left>
            <SmallStitle style={{ marginBottom: "15px" }}>Sales</SmallStitle>

            <ProductChart data={data} dataName="name" dataSales="Sales" />
          </Left>
          <Center></Center>
          <Right>
            <InnerContainerTwo>
              <InnerLeft>
                <MobileDiv3>
                  <IconContainer>
                    <Icon src={product?.img} />
                  </IconContainer>
                </MobileDiv3>
                <LeftRow>id :</LeftRow>
                <LeftRow>Sales :</LeftRow>
                <LeftRow>In Stock :</LeftRow>
                <LeftRow>Color :</LeftRow>
                <LeftRow>Size :</LeftRow>
                <LeftRow>Category :</LeftRow>

                <LeftRow
                  style={{
                    marginTop:
                      isMobile() && product?.category.length > 2
                        ? "32px"
                        : "0px",
                  }}
                >
                  Price :
                </LeftRow>
              </InnerLeft>
              <InnerRight>
                <MobileDiv3>
                  <SmallestTitle>{product?.title}</SmallestTitle>
                </MobileDiv3>
                <RightRow>{product?._id.slice(0, 10)}</RightRow>
                <RightRow>{sales > 0 ? sales : 0}</RightRow>

                <RightRow>{product?.inStock.toString()}</RightRow>
                <RightRow
                  style={{
                    display: "flex",
                    marginTop: isMobile && "15px",
                    marginBottom: isMobile && "13px",
                  }}
                >
                  {product?.color.map((item) => (
                    <ColorCircle key={item} back={item}></ColorCircle>
                  ))}
                </RightRow>

                <RightRow>
                  {product?.size.map((item) => (
                    <span key={item}>{item} ,</span>
                  ))}
                </RightRow>

                <RightRow>
                  {product?.category.map((item) => (
                    <span key={item}>{item} ,</span>
                  ))}
                </RightRow>
                <RightRow>{product?.price}</RightRow>
              </InnerRight>
            </InnerContainerTwo>
          </Right>
        </InnerContainer>
        <BottomContainer>
          <BothSides>
            <LeftSide>
              <Form>
                <LabelinputContainer>
                  <Label for="Product Name">Product Name</Label>
                  <Input
                    style={{
                      height: isMobile ? "40px" : "20px",
                    }}
                    placeholder={product?.title}
                    id="Product Name"
                    name="Product Name"
                    onChange={(e) => setTitle(e.target.value)}
                  ></Input>
                </LabelinputContainer>
                <LabelinputContainer>
                  <Label for="Product desc">Product Description</Label>
                  <Input
                    style={{
                      height: isMobile ? "120px" : "20px",
                      textOverflow: isMobile ? "ellipsis" : " ",
                      overflow: "hidden",
                    }}
                    placeholder={product?.desc}
                    id="Product desc"
                    name="Product desc"
                    onChange={(e) => setDesc(e.target.value)}
                  ></Input>
                </LabelinputContainer>
                <LabelinputContainer>
                  <Label for="Product price">Product Price</Label>
                  <Input
                    placeholder={product?.price}
                    id="Product price"
                    name="Product price"
                    onChange={(e) => setPrice(e.target.value)}
                  ></Input>
                </LabelinputContainer>
                {/* <LabelinputContainer>
                <Label for="Active">is Active</Label>

                <Select name="Active" id="Active">
                  <Option value="Active">Active</Option>
                  <Option value="Yes">Yes</Option>
                  <Option value="No">No</Option>
                </Select>
              </LabelinputContainer> */}
                <LabelinputContainer>
                  <Label for="Stock">In Stock</Label>

                  <Select name="Stock" id="Stock">
                    <Option value="Stock">In Stock</Option>
                    <Option value="Yes">Yes</Option>
                    <Option value="No">No</Option>
                  </Select>
                </LabelinputContainer>

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
              </Form>
            </LeftSide>
            <RightSide>
              <InnerRightSideDiv>
                <SomeDiv2>
                  <ImgRight src={product?.img} />
                  <IconDiv>
                    <PublishIcon style={{ fontSize: "40px" }} />
                  </IconDiv>
                </SomeDiv2>
                <SomeDiv2>
                  <FileInput
                    type="file"
                    placeholder="Product Image"
                    id="Product Image"
                    name="Product Image"
                    onChange={(e) => {
                      setFile(e.target.files[0]);
                      setFileName(
                        e.target.files[0]?.name + new Date().getTime()
                      );
                    }}
                  ></FileInput>
                </SomeDiv2>
                <Button onClick={uploadFile}>Update</Button>
              </InnerRightSideDiv>
            </RightSide>
          </BothSides>
        </BottomContainer>
      </Container>
    </>
  );
};

export default ProductAdmin;
