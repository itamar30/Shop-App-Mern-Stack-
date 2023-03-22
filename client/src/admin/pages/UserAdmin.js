import React, { useState, useEffect } from "react";
import styled from "styled-components";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import MailOutlinedIcon from "@mui/icons-material/MailOutlined";
import PublishIcon from "@mui/icons-material/Publish";
import { Link, useNavigate } from "react-router-dom";
import { mobile } from "../../responsive";
import { userRequest } from "../../requestMethods";
import { useLocation } from "react-router-dom";
import { format } from "timeago.js";
import KeyIcon from "@mui/icons-material/Key";
import LocalPoliceIcon from "@mui/icons-material/LocalPolice";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";
import app from "../firebase";

import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { UploadFile } from "@mui/icons-material";

const Container = styled.div`
  margin: 30px;
  padding-bottom: 200px;
`;

const UserContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const MyButton = styled.div`
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

const Title = styled.h3`
  font-size: 40px;
  font-weight: 700;
`;

const InnerBoxLeft = styled.div`
  border: 2px solid gray;
  margin: 40px 0;
  -webkit-box-shadow: 0px 0px 15px -10px black;
  box-shadow: 0px 0px 15px -10px black;
  flex: 2;
`;

const InnerBoxRight = styled.div`
  display: flex;
  border: 2px solid gray;
  margin: 40px 0;
  -webkit-box-shadow: 0px 0px 15px -10px black;
  box-shadow: 0px 0px 15px -10px black;
  flex: 3;
  ${mobile({ flexDirection: "column" })}
`;

const InnerBoxCenter = styled.div`
  flex: 0.05;
`;

const BoxesContainer = styled.div`
  justify-content: space-between;
  display: flex;
  ${mobile({ flexDirection: "column" })}
`;

const UserTop = styled.div`
  display: flex;
`;
const UserIcon = styled.div`
  margin-right: 15px;
`;
const Icon = styled.img`
  height: 70px;
  width: 70px;
  border-radius: 50%;
`;

const UserTttle = styled.div`
  font-size: 20px;
  font-weight: bold;
`;
const UseDesc = styled.div`
  font-size: 20px;
  font-weight: 300;
  margin: 10px 0;
`;

const UserDescInner = styled.div`
  font-size: 20px;
  font-weight: 300;
  margin: 20px 0;
`;

const TitleAndDescContainer = styled.div``;

const UserBottom = styled.div`
  flex-direction: column;
  margin-top: 10px;
`;

const InnerLeftSideContainer = styled.div`
  margin: 20px;
`;
const BottomRow = styled.div`
  display: flex;
  margin: 15px 0;
`;

const BottomRowsContainer = styled.div`
  flex-direction: column;
  /* justify-content: space-between; */
`;

const BottomIcon = styled.div`
  font-size: 18px;
  margin-right: 10px;
`;

const BottomText = styled.div`
  font-size: 18px;
`;
const Left = styled.div`
  flex: 4;
`;

const Right = styled.div`
  flex: 3;
`;
const FileInput = styled.input`
  font-size: 20px;
  background-color: transparent;

  border-radius: 5px;
  padding: 10px 0;
  padding-left: 8px;
`;

const LeftSideTitle = styled.h3`
  font-size: 28px;
  font-weight: bold;
`;

const InnerLeft = styled.div`
  margin: 20px;
`;
const Form = styled.form`
  margin: 20px 0;
`;

const Input = styled.input`
  font-size: 20px;
  border: none;
  background-color: transparent;
  border-bottom: 1px solid black;
  padding-bottom: 10px;
  padding-top: 10px;
`;

const LabelInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 15px;
`;

const UpdateButton = styled.div`
  display: flex;
  background-color: darkblue;
  color: white;
  font-size: 20px;
  height: 37px;
  width: 70%;
  text-align: center;
  padding: 3px;
  display: flex;
  border-radius: 15px;
  justify-content: center;
  cursor: pointer;
  align-items: center;
  ${mobile({ marginTop: "40px" })}
`;

const InnerRightLEftContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  height: 90%;
  margin: 25px 0;
  overflow: hidden;
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

const IconDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-left: 30px;
  cursor: pointer;
`;
const LabelinputContainer = styled.div`
  display: flex;
  flex-direction: column;
  ${mobile({ width: "80%" })}
`;

const Label = styled.label`
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 20px;
  margin-top: 10px;
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

const UserAdmin = () => {
  const location = useLocation();
  const userId = location.pathname.split("/")[2];
  const [user, setuser] = useState();

  useEffect(() => {
    const getUser = async () => {
      const res = await userRequest.get("users/" + userId);
      setuser(res.data);
    };
    getUser();
  }, []);
  const [email, setmail] = useState(user?.email);
  const [username, setusername] = useState(user?.username);
  const [isAdmin, setisAdmin] = useState(false);
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const currentUser = useSelector((state) => state.user.currentUser);

  const navigate = useNavigate();

  const uploadFile = async () => {
    if (currentUser === null || !currentUser.isAdmin) {
      Swal.fire(
        "LOG IN AS ADMIN PLEASE",
        "you are not alowed to do that",
        "question"
      );
    } else {
      let timerInterval;
      if (file === null) {
        Swal.fire({
          title: "Details Are Being Saved..!",

          timer: 1500,
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

        const res = await userRequest.put("users/" + userId, {
          username,
          email,
          isAdmin,
        });
        setTimeout(() => {
          navigate("/userListAdmin");
        }, 2000);
      }

      const storage = getStorage(app);
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);

      Swal.fire({
        title: "Your image is being uploaded!",
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

          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
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
            const res = await userRequest.put("users/" + userId, {
              username,
              email,
              isAdmin,
              img: downloadURL,
            });

            navigate("/userListAdmin");
          });
        }
      );
    }
  };

  return (
    <Container>
      <UserContainer>
        <Title>Edit User</Title>
        <Link to="/newUserAdmin" style={{ textDecoration: "none" }}>
          <MyButton>Create</MyButton>
        </Link>
      </UserContainer>
      <BoxesContainer>
        <InnerBoxLeft>
          <InnerLeftSideContainer>
            <UserTop>
              <UserIcon>
                <Icon src={user?.img || require("../../assets/avatar.jpg")} />
              </UserIcon>
              <TitleAndDescContainer>
                <UserTttle>{user?.username}</UserTttle>
                <UseDesc>
                  {user?.isAdmin === "true" ? "Admin" : "Regulaer User"}
                </UseDesc>
              </TitleAndDescContainer>
            </UserTop>
            <UserBottom>
              <UserDescInner>Acount Details</UserDescInner>
              <BottomRowsContainer>
                <BottomRow>
                  <BottomIcon>
                    <PersonOutlineIcon />
                  </BottomIcon>
                  <BottomText>{user?.username}</BottomText>
                </BottomRow>
                <BottomRow>
                  <BottomIcon>
                    <KeyIcon />
                  </BottomIcon>
                  <BottomText>{user?._id}</BottomText>
                </BottomRow>
                <BottomRow>
                  <BottomIcon>
                    <LocalPoliceIcon />
                  </BottomIcon>
                  <BottomText>
                    {user?.isAdmin === true ? "Admin" : "Regular User"}
                  </BottomText>
                </BottomRow>
                <BottomRow>
                  <BottomIcon>
                    <MailOutlinedIcon />
                  </BottomIcon>
                  <BottomText>{user?.email}</BottomText>
                </BottomRow>
                <BottomRow>
                  <BottomIcon>
                    <CalendarTodayIcon />
                  </BottomIcon>
                  <BottomText>Created {format(user?.createdAt)}</BottomText>
                </BottomRow>
                <BottomRow>
                  <BottomIcon>
                    <CalendarTodayIcon />
                  </BottomIcon>
                  <BottomText>Updated {format(user?.updatedAt)}</BottomText>
                </BottomRow>
              </BottomRowsContainer>
            </UserBottom>
          </InnerLeftSideContainer>
        </InnerBoxLeft>
        <InnerBoxCenter></InnerBoxCenter>
        <InnerBoxRight>
          <Left>
            <InnerLeft>
              <LeftSideTitle>Edit</LeftSideTitle>
              <Form>
                <LabelInputContainer>
                  <Label for="User Name">User Name</Label>
                  <Input
                    placeholder={user?.username}
                    onChange={(e) => setusername(e.target.value)}
                  ></Input>
                </LabelInputContainer>
                <LabelInputContainer>
                  <Label for="User Mail">User Mail</Label>
                  <Input
                    placeholder={user?.email}
                    onChange={(e) => setmail(e.target.value)}
                  ></Input>
                </LabelInputContainer>
                <LabelInputContainer style={{ marginTop: "50px" }}>
                  <Select
                    name="Role"
                    id="Role"
                    onChange={(e) => setisAdmin(e.target.value)}
                  >
                    <Option value="Role">Role</Option>
                    <Option value={true}>Admin</Option>
                    <Option value={false}>Regular User</Option>
                  </Select>
                </LabelInputContainer>
              </Form>
            </InnerLeft>
          </Left>
          <Right>
            <InnerRightLEftContainer>
              <SomeDiv>
                <ImgRight
                  src={user?.img || require("../../assets/avatar.jpg")}
                />
                <IconDiv>
                  <PublishIcon style={{ fontSize: "40px" }} />
                </IconDiv>
              </SomeDiv>
              <SomeDiv>
                <FileInput
                  type="file"
                  placeholder="User Image"
                  id="User Image"
                  name="User Image"
                  onChange={(e) => {
                    setFile(e.target.files[0]);
                    setFileName(e.target.files[0]?.name + new Date().getTime());
                  }}
                ></FileInput>
              </SomeDiv>
              <UpdateButton onClick={uploadFile}>Updtae</UpdateButton>
            </InnerRightLEftContainer>
          </Right>
        </InnerBoxRight>
      </BoxesContainer>
    </Container>
  );
};

export default UserAdmin;
