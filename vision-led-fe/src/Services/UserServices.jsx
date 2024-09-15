import axios from "axios"
export const axiosJwt = axios.create();

export const LoginUser = async (data) => {
    const res = await axios.post(`https://api.visionled.vn/api/user/sign-in`, data)
    return res.data
}

export const LoginWithGoogle = async (data) => {
    const res = await axios.post(`https://api.visionled.vn/api/user/login-with-google`, data)
    return res.data
}

export const LoginSuccess = async (provider, userId) => {
    const res = await axios.post(`https://api.visionled.vn/api/user/login-success/${provider}/${userId}`)
    return res.data
}

export const LogOutUser = async () => {
    const res = await axios.post(`https://api.visionled.vn/api/user/sign-out`)
    return res.data
}

export const GetDetailsUser = async (id, access_token) => {
    const res = await axiosJwt.get(`https://api.visionled.vn/api/user/get-details/${id}`, {
        headers: {
            token: `Bearer ${access_token}`,
        }
    });
    return res.data;
}

export const UpdateUser = async ({id, access_token, data}) => {
    const res = await axiosJwt.put(`https://api.visionled.vn/api/user/update-user/${id}`, data, {
        headers: {
            token: `Bearer ${access_token}`,
        }
    });
    return res.data;
}

export const GetAllUser = async (access_token) => {
    const res = await axiosJwt.get(`https://api.visionled.vn/api/user/get-all`, {
        headers: {
            token: `Bearer ${access_token}`,
        }
    });
    return res.data;
}

export const GetUserWithProvider = async (token, provider) => {
    const res = await axiosJwt.get(`https://api.visionled.vn/api/user/get-user-with-provider/${provider}`, {
        headers: {
            authentication: token,
        }
    });
    return res.data;
}

export const RefreshToken = async () => {
    const res = await axios.post(`https://api.visionled.vn/api/user/refresh-token`, {
        withCredentials: true,
    });
    return res.data;
}
