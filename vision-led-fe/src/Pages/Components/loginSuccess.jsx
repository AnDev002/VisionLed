import { Navigate } from 'react-router-dom';

export default function LoginSuccess() {
    const { isLoading, data, isSuccess } = useQuery(['userLoggedIn', provider, userId], loginSuccess);

    useEffect(() => {
        if (isSuccess && data?.access_token) {
            localStorage.setItem('access_token', data?.access_token);
            const decoded = jwt_decode(data?.access_token);
            if (decoded?.id) {
                handleGetDetailsUser(decoded?.id, data?.access_token);
            }
        }
    }, [isSuccess]);

    if (userSelector.inOrder === false && (isLoggedIn || isSuccess)) {
        return <Navigate to='/' replace={true} />;
    }

    if (userSelector.inOrder && (isLoggedIn || isSuccess)) {
        return <Navigate to={`/payment/form/${orderSelector.orderId}`} replace={true} />;
    }

    return <div>Loading...</div>;
}
