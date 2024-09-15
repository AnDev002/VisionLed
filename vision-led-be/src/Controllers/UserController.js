const UserService = require('../Services/UserServices')
const JwtService = require('../Services/JwtServices')

const createUser = async (req, res) => {
    try {
        const { name, email, address, password, confirmPassword, phone } = req.body
        const reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
        const isCheckEmail = reg.test(email)
        if (!name || !email || !password || !confirmPassword || !phone || !address) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The input is required'
            })
        } else if (!isCheckEmail) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The input is email'
            })
        } else if (password !== confirmPassword) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The password is equal confirmPassword'
            })
        }
        const response = await UserService.createUser(req.body);
        return res.status(200).json(response)
    } catch (error) {
        return res.status(404).json({
            message: error
        })
    }
}

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body
        const reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
        const isCheckEmail = reg.test(email)
        if (!email || !password) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The input is required'
            })
        } else if (!isCheckEmail) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The input is email'
            })
        }

        const response = await UserService.loginUser(req.body);
        const { refresh_token, ...newResponse } = response;
        res.cookie('refresh_token', refresh_token, {
            httpOnly: false,
            secure: true,
            samesite: "strict"
        });
        return res.status(200).json(newResponse)
    } catch (error) {
        return res.status(404).json({
            message: "e: " + error
        })
    }
}

const loginWithGoogle = async(req, res) => {
   // const { name, email, googlePhotoUrl } = req.body;
    try {
       const response = await UserService.loginWithGoogle(res, req.body);
       return res.status(200).json(response)
    } catch (error) {
        next(error);
    }
}

const updateUser = async (req, res) => {
    try {
        const userID = req.params.id
        const data = req.body
        if (!userID) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The user id is required'
            })
        }
        const response = await UserService.updateUser(userID, data);
        return res.status(200).json(response)
    } catch (error) {
        return res.status(404).json({
            message: error
        })
    }
}

const deleteUser = async (req, res) => {
    try {
        const userID = req.params.id
        if (!userID) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The user id is required'
            })
        }
        const response = await UserService.deleteUser(userID);
        return res.status(200).json(response)
    } catch (error) {
        return res.status(404).json({
            message: error
        })
    }
}

const loginSuccess = async (req, res) => {
    try {
        const provider = req.params.provider
        const userId = req.params.id
        if (!userId || !provider) {
            return res.status(200).json({
                status: 'ERR',
                message: 'Missing input'
            })
        }
        const response = await UserService.loginSuccess(userId, provider);
        const { refresh_token, ...newResponse } = response;
        res.cookie('refresh_token', refresh_token, {
            httpOnly: true,
            secure: true, // chuyển thành true khi deploy => https
            samesite: "strict"
        });
        return res.status(200).json(newResponse)
    } catch (error) {
        return res.status(404).json({
            message: error
        })
    }
}

const getAllUser = async (req, res) => {
    try {
        const response = await UserService.getAllUser();
        return res.status(200).json(response)
    } catch (error) {
        return res.status(404).json({
            message: error
        })
    }
}

const getDetailsUser = async (req, res) => {
    try {
        const userID = req.params.id
        if (!userID) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The user id is required'
            })
        }
        const response = await UserService.getDetailsUser(userID);
        return res.status(200).json(response)
    } catch (error) {
        return res.status(404).json({
            message: error
        })
    }
}

const refreshToken = async (req, res) => {
    try {
        const token = req.cookies.refresh_token
        if (!token) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The token is required'
            })
        }
        const response = await JwtService.refreshTokenService(token);
        return res.status(200).json(response)
    } catch (error) {
        return res.status(404).json({
            message: error
        })
    }
}

const signOutUser = async (req, res) => {
    try {
        res.clearCookie('refresh_token');
        return res.status(200).json({
            status: "OK",
            message: "Logout Successfully"
        })
    } catch (error) {
        return res.status(404).json({
            message: error
        })
    }
}

const getUserWithProvider = async (req, res) => {
    try {
        const { currentUser } = req
        const provider = req.params.provider
        if (!currentUser?.emailId && !currentUser?.facebookId || !provider) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The input is required'
            })
        }
        if (currentUser?.emailId) {
            const response = await UserService.getUserWithProvider(currentUser?.emailId, provider);
            return res.status(200).json(response)
        } else {
            const response = await UserService.getUserWithProvider(currentUser?.facebookId, provider);
            return res.status(200).json(response)
        }
    } catch (error) {
        return res.status(404).json({
            message: error
        })
    }
}

module.exports = {
    createUser,
    loginUser,
    updateUser,
    deleteUser,
    getAllUser,
    getDetailsUser,
    refreshToken,
    signOutUser,
    loginSuccess,
    getUserWithProvider,
    loginWithGoogle
}