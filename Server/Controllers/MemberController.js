const Member = require('../Models/MemberModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const memberSignup = async (req, res, next) => {
    try {
        if(req?.body?.password !== req?.body?.confirmPassword){
            return res.status(400).send('passwords do not match');
        };
        const member = new Member({
            name: req?.body?.name,
            email: req?.body?.email,
            password: await bcrypt.hash(req?.body?.password, 10),
            confirmPassword: req?.body?.confirmPassword,
            gender: req?.body?.gender,
            skills: req?.body?.skills,
            githubUsername: req?.body?.githubUsername
        })
        await member.save();
        res.status(200).send('registration successful');
    }
    catch(err){
        if (err.code === 11000) {
            res.status(400).send('email already exists');
        } else {
            console.log('random error');
            console.log(err);
        }
    }
}

const createToken = async (id) => {
    const token = jwt.sign({ id }, 'jab', { expiresIn: 1000 });
    return token;
};

const comparePassword = async (password, user) => {
    const auth = await bcrypt.compare(password, user?.password);
    return auth;
};

const memberLogin = async (req, res, next) => {
    const email = req?.body?.email;
    const password = req?.body?.password;
    expirydate = 1000 * 60 * 60 * 24 * 3
    try {
        const user = await Member.findOne({ email: email });
        if (user) {
            const auth = await comparePassword(password, user);
            if (auth) {
                const token = await createToken(user?._id);
                res.cookie('jwt',  token, { maxAge: expirydate });
                res.status(200).send('login successful');
            } else {
                res.status(400).send('invalid credentials');
            }
        } else {
            res.status(404).send('user not found');
        }
    } catch (err) {
        console.log(err);
        res.status(500).send('internal server error');
    }
};

const memberLogout = async (req, res) => {
    res.cookie('jwt', '', { maxAge: 1 });
    res.status(200).send('logged out');
};

const checkAuthenticated = async (req, res, next) => {
    const token = req?.cookies?.jwt;
    if (!token) {
        return res.send('not authenticated');
    }
    try {
        const user1 = jwt.verify(token, 'jab');
        req.user = user1;
        next();
    } catch (error) {
        res.send('not authenticated');
    }
};

const checkNotAuthenticated = async (req, res, next) => {
    const token = req?.cookies?.jwt;
    if (token) {
        try {
            const user1 = jwt.verify(token, 'jab');
            req.user = user1;
            return res.send('already authenticated');
        } catch (error) {
            next();
        }
    } else {
        next();
    }
};

module.exports = {
    memberSignup,
    memberLogin,
    memberLogout,
    checkAuthenticated,
    checkNotAuthenticated
}