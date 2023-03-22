import axios from "axios";

const BASE_URL = "https://shop-app-server-y65y.onrender.com/api/";
const TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzZTNhY2YyMDZmYTBjNzhlODVkMjEzNyIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY3Njg4MTM0NX0.MRS2AbMTGefQyMyK6020kx73dKui25D1mo62ddf-JPg";

//fetch data
export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
  headers: { token: `Bearer ${TOKEN}` },
});
