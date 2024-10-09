import { jwtDecode } from "jwt-decode"

const AuthInfo = () => {
    const decode = jwtDecode(localStorage.getItem("token"));
    return decode.role;
}

export default AuthInfo;