const { validate, ValidationError, Joi } = require('express-validation')
const UserService = require('../services/UserService')

const loginValidation = {
    body: Joi.object({
        email: Joi.string()
            .email()
            .required(),
        password: Joi.string()
            .regex(/[a-zA-Z0-9]{4,20}/)
            .required(),
    }),
}

const registrationValidation = {
    body: Joi.object({
        fullName: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().regex(/[a-zA-Z0-9]{4,20}/).required()
    }),
};

// router.post('/login', validate(loginValidation, {}, {}), async function (req, res, next) {
const loginController = async function (req, res, next) {
    const {
        email,
        password
    } = req.body

    const user = await UserService.findByEmail(email)
    if (!user) {
        next("user not found")
        return
    }

    const isPaswordCorrect = await UserService.checkPassword(user, password)
    if (!isPaswordCorrect) {
        next("pasword is not corespond")
        return
    }

    const token = await UserService.generateToken(user)
    const expirationTime = 24 * 60 * 60 * 1000; // 1 day

    res.cookie("auth", token, {
        httpOnly: true,
        maxAge: expirationTime
    })
    res.send(UserService.toJSON(user))
}

const meController = async function (req, res, next) {
    res.send(UserService.toJSON(req.user))
}

const registerController = async function (req, res, next) {
    try {
        console.log(req.body);
        const { fullName, email, password } = req.body;

        const existingUser = await UserService.findByEmail(email);
        if (existingUser) {
            throw new Error('Email is already registered');
        }

        const newUser = await UserService.addUser({ fullName, email, password });
        const user = await UserService.findByEmail(req.body.email)
        const token = await UserService.generateToken(user)
        const expirationTime = 24 * 60 * 60 * 1000; // 1 day

        res.cookie("auth", token, {
            httpOnly: true,
            maxAge: expirationTime
        })
        console.log(user);
        res.json({
            message: 'Registration successful',
            user: UserService.toJSON(user),
        });

    } catch (error) {

        console.error('Error during registration:', error.message);
        res.status(400).json({ error: error.message });
    }
}
const updateController = async function (req, res, next) {
    try {
        const updateUser = await UserService.updateUser(req.body, req.user.email, req.user._id)
        if (!updateUser.success) {
            throw new Error(updateUser.message);
        }
        const user = await UserService.findByEmail(req.body.email)

        const token = await UserService.generateToken(user)
        const expirationTime = 24 * 60 * 60 * 1000; // 1 day

        res.cookie("auth", token, {
            httpOnly: true,
            maxAge: expirationTime
        })
        res.send(UserService.toJSON(user))
    } catch (error) {
        console.error('Error during update:', error.message);
        res.status(400).json({ error: error.message });
    }
}

const logoutController = async function (req, res, next) {
    res.cookie('auth', '', {
        httpOnly: true,
        expires: new Date(0)
    })
    res.send("")
}


module.exports = {
    loginValidation,
    registrationValidation,
    loginController,
    meController,
    registerController,
    logoutController,
    updateController
};