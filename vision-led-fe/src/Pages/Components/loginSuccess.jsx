import { Navigate, useNavigate, useParams } from 'react-router-dom';
import * as UserServices from '../../Services/UserServices'
import { useQuery } from '@tanstack/react-query'
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../../Redux/Slides/userSlide';
import { useEffect } from 'react';
import jwt_decode from "jwt-decode";
import { updateUser } from '../../Redux/Slides/userSlide';


export default function LoginSuccess() {
    const userSelector = useSelector(state => state.user);
    const orderSelector = useSelector(state => state.order);
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const { provider, userId } = useParams()

    const loginSuccess = async () => {
        const res = await UserServices.LoginSuccess(provider, userId);
        return res;
    }

    const { isLoading, data, isSuccess } = useQuery(['userLoggedIn', provider, userId], loginSuccess);

    useEffect(() => {
        if (isSuccess) {
            if (data?.access_token !== undefined) {
                localStorage.setItem('access_token', data?.access_token);
                if (data?.access_token) {
                    const decoded = jwt_decode(data?.access_token);
                    if (decoded?.id) {
                        handleGetDetailsUser(decoded?.id, data?.access_token);
                    }
                }
            }
        }
    }, [isSuccess])
    const handleLink = (link) => {
        if (link !== "") {
            navigate(`/${link}`);
        } else {
            navigate(`/`);
        }
    }
    const handleGetDetailsUser = async (id, token) => {
        const res = await UserServices.GetDetailsUser(id, token);
        dispatch(updateUser({ ...res?.data, access_token: token }))
    }
    const { isLoggedIn } = useSelector(state => state.user)

    return (
        <>
            {userSelector.inOrder === false ?
                (isLoggedIn || isSuccess) && <Navigate to={'/'} replace={true} />
                :
                (isLoggedIn || isSuccess) && <Navigate to={`/payment/form/${orderSelector.orderId}`} replace={true} />

            }
        </>
    )
}