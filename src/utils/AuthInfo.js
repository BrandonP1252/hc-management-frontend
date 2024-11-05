import { jwtDecode } from "jwt-decode"

export const AuthInfo = () => {
    const decode = jwtDecode(localStorage.getItem("token"));
    return decode.role;
}

export const getUsername = () => {
    const decode = jwtDecode(localStorage.getItem("token"));
    return decode.sub;
}

