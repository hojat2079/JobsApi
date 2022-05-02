const { StatusCodes } = require("http-status-codes");
const BadRequestError = require("../errors/bad-request");
const UnAuthenticated = require("../errors/unauthenticated");
const User = require('../models/User')

const register = async (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        throw new BadRequestError('please provide name, email, password!!');
    }
    const user = await User.create({ ...req.body });
    const token = user.createJWT();
    res.status(StatusCodes.CREATED).json({ user: { name: user.name }, token });

}
const login = async (req, res) => {
    const { email, password } = req.body
    if (!email || !password) {
        throw new BadRequestError('please provide Email, Password');
    }
    const user = await User.findOne({ email });
    if (!user) {
        throw new UnAuthenticated('the Email is not founded!!');
    }
    const passwordValidation = await user.comparePassword(password);
    if (!passwordValidation) {
        throw new UnAuthenticated('The password is incorrect.!!!');
    }

    const token = user.createJWT();
    res.status(StatusCodes.OK).json({ user: { name: user.name }, token });
}

module.exports = {
    register,
    login
}