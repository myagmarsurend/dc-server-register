import { jwtDecode } from "jwt-decode";

const decodeToken = (token) => {
  try {
    const decoded = jwtDecode(token);
    return decoded.data;
  } catch (error) {
    console.log("Failed to decode token:", error);
    return null;
  }
};
export default decodeToken;
