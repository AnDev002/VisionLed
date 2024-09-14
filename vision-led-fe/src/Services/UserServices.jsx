import axios from "axios"
export const axiosJwt = axios.create();

export const LoginUser = async (data) => {
    const res = await axios.post(`${process.env.REACT_APP_API_KEY}/user/sign-in`, data)
    return res.data
}

export const LoginSuccess = async (provider, userId) => {
    const res = await axios.post(`${process.env.REACT_APP_API_KEY}/user/login-success/${provider}/${userId}`)
    return res.data
}

export const LogOutUser = async () => {
    const res = await axios.post(`${process.env.REACT_APP_API_KEY}/user/sign-out`)
    return res.data
}

export const GetDetailsUser = async (id, access_token) => {
    const res = await axiosJwt.get(`${process.env.REACT_APP_API_KEY}/user/get-details/${id}`, {
        headers: {
            token: `Bearer ${access_token}`,
        }
    });
    return res.data;
}

export const UpdateUser = async ({id, access_token, data}) => {
    const res = await axiosJwt.put(`${process.env.REACT_APP_API_KEY}/user/update-user/${id}`, data, {
        headers: {
            token: `Bearer ${access_token}`,
        }
    });
    return res.data;
}

export const GetAllUser = async (access_token) => {
    const res = await axiosJwt.get(`${process.env.REACT_APP_API_KEY}/user/get-all`, {
        headers: {
            token: `Bearer ${access_token}`,
        }
    });
    return res.data;
}

export const GetUserWithProvider = async (token, provider) => {
    const res = await axiosJwt.get(`${process.env.REACT_APP_API_KEY}/user/get-user-with-provider/${provider}`, {
        headers: {
            authentication: token,
        }
    });
    return res.data;
}

export const RefreshToken = async () => {
    const res = await axios.post(`${process.env.REACT_APP_API_KEY}/user/refresh-token`, {
        withCredentials: true,
    });
    return res.data;
}