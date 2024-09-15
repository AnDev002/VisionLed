const User = require("../Models/User")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const { v4: uuidv4 } = require('uuid');
const { generalAccessToken, generalRefreshToken } = require("./JwtServices")
const createUser = (newUser) => {
    return new Promise(async (resolve, reject) => {
        const { name, email, password, confirmPassword, phone, address } = newUser
        try {
            const checkUser = await User.findOne({
                email: email
            })
            if (checkUser !== null) {
                resolve({
                    status: "ERR",
                    message: "the email is already"
                })
            }
            const hashedPassword = bcrypt.hashSync(password, 10)
            const createdUser = await User.create({
                name,
                email,
                password: hashedPassword,
                phone,
                address
            })
            if (createdUser) {
                resolve({
                    status: "OK",
                    message: "SUCCESS",
                    data: createdUser
                })
            }
        } catch (error) {
            console.log(error);
        }
    })
}

const loginUser = (userLogin) => {
    return new Promise(async (resolve, reject) => {
        const { email, password } = userLogin
        try {
            const checkUser = await User.findOne({
                email: email
            })
            if (checkUser === null) {
                resolve({
                    status: "ERR",
                    message: "the user is not defined"
                })
            } else {
                try {
                    const comparePassword = bcrypt.compareSync(password, checkUser.password)
                    if (!comparePassword) {
                        resolve({
                            status: "ERR",
                            message: "the password or user is incorrect"
                        })
                    }
                } catch (error) {
                    console.log("error ", error);
                }
                const access_token = await generalAccessToken({
                    id: checkUser.id,
                    isAdmin: checkUser.isAdmin
                })

                const refresh_token = await generalRefreshToken({
                    id: checkUser.id,
                    isAdmin: checkUser.isAdmin
                })

                resolve({
                    status: "OK",
                    message: "SUCCESS",
                    access_token,
                    refresh_token
                })
            }


        } catch (error) {
            console.log(error);
        }
    })
}

const loginWithGoogle = (res, userLogin) => {
    return new Promise(async (resolve, reject) => {
        const { emailId, name, email, googlePhotoUrl } = userLogin
        try {
            const user = await User.findOne({
                email: email
            })
            console.log("user name: ", name)
            if (user) {
                const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
                const { password, ...rest } = user._doc;

                res.status(200).cookie("access_token", token, {
                    httpOnly: true
                }).redirect(`${process.env.URL_CLIENT}/login-success/google/${emailId}`);
            } else {
                const generatedPassword = 
                  Math.random().toString(36).slice(-8) + 
                  Math.random().toString(36).slice(-8);
                const hashedPassword = bcrypt.hashSync(generatedPassword, 10);
                const newUser = new User({
                    name: name.toLowerCase().split(" ").join("") + Math.round().toString(9).slice(-4),
                    email,
                    emailId,
                    avatar: googlePhotoUrl,
                    password: hashedPassword
                });
                await newUser.save();

                const token = jwt.sign({
                    id: newUser._id,

                }, process.env.JWT_SECRET);

                const { password, ...rest } = newUser._doc;
                res.status(200).cookie("access_token", token, {
                    httpOnly: true,
                    secure: true,
                    maxAge: 24 * 60 * 60 * 1000, 
                    sameSite: "strict"
                }).redirect(`${process.env.URL_CLIENT}/login-success/google/${emailId}`);
                //     res.redirect(`${process.env.URL_CLIENT}/login-success/${req.user?.provider}/${req.user?.id}`)
            }
        } catch (error) {
            console.log(error);
        }
    })
}

const updateUser = (id, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkUser = await User.findOne({
                _id: id
            })
            if (checkUser === null) {
                resolve({
                    status: "OK",
                    message: "The user is not defined"
                })
            }

            const updatedUser = await User.findByIdAndUpdate(id, data, { new: true })

            resolve({
                status: "OK",
                message: "SUCCESS",
                data: updatedUser
            })
        } catch (error) {
            console.log(error);
        }
    })
}

const deleteUser = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkUser = await User.findOne({
                _id: id
            })
            if (checkUser === null) {
                resolve({
                    status: "OK",
                    message: "The user is not defined"
                })
            }

            await User.findByIdAndDelete(id)

            resolve({
                status: "OK",
                message: "DELETE USER SUCCESS"
            })
        } catch (error) {
            console.log(error);
        }
    })
}

const getAllUser = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const allUser = await User.find().select('name address email phone isAdmin avatar type_login')

            resolve({
                status: "OK",
                message: "GET ALL USER SUCCESS",
                data: allUser
            })
        } catch (error) {
            console.log(error);
        }
    })
}

const getDetailsUser = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const user = await User.findOne({
                _id: id
            })
            if (user === null) {
                resolve({
                    status: "OK",
                    message: "The user is not defined"
                })
            }

            resolve({
                status: "OK",
                message: "GET USER DETAILS SUCCESS",
                data: user
            })
        } catch (error) {
            console.log(error);
        }
    })
}

const getUserWithProvider = (id, provider) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = null
            if (provider === 'google') {
                user = await User.findOne({
                    emailId: id
                })
            } else if (provider === 'facebook') {
                user = await User.findOne({
                    facebookId: id
                })
            }
            if (user === null) {
                resolve({
                    status: "OK",
                    message: "The user is not defined"
                })
            }
            resolve({
                status: "OK",
                message: "GET USER DETAILS SUCCESS",
                data: user
            })
        } catch (error) {
            console.log(error);
        }
    })
}

const loginSuccess = (id, provider) => {
    return new Promise(async (resolve, reject) => {
        try {
            let checkUser = null
            if (provider === 'facebook') {
                checkUser = await User.findOne({
                    facebookId: id
                })
            } else if (provider === 'google') {
                checkUser = await User.findOne({
                    emailId: id
                })
            }
            if (checkUser === null) {
                reject({
                    status: "ERR",
                    message: "USER IS NOT DEFINED"
                })
            } else {
                const access_token = await generalAccessToken({
                    id: checkUser.id,
                    isAdmin: checkUser.isAdmin
                })

                const refresh_token = await generalRefreshToken({
                    id: checkUser.id,
                    isAdmin: checkUser.isAdmin
                })
                resolve({
                    status: "OK",
                    message: "LOGIN SUCCESS",
                    access_token,
                    refresh_token
                })
            }
        } catch (error) {
            console.log(error);
        }
    })
}

module.exports = {
    createUser,
    loginUser,
    updateUser,
    deleteUser,
    getAllUser,
    getDetailsUser,
    loginSuccess,
    getUserWithProvider,
    loginWithGoogle
}