const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { OrganizationModel } = require('../Models/OrganizationModel');

async function signup(req, res) {
    try {
        const { name, email, password, sector, phoneNumber, description, githubUsername } = req.body;

        // Check if the organization already exists
        const existingOrganization = await OrganizationModel.findOne({ email });
        if (existingOrganization) {
            return res.status(400).json({ message: 'Organization already exists' });
        }

        // Hash the password before saving it to the database
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new organization document
        const organization = new OrganizationModel({
            name,
            email,
            password: hashedPassword,
            sector,
            phoneNumber,
            description,
            githubUsername
        });

        // Save the organization to the database
        await organization.save();

        // Generate JWT token 
        const token = jwt.sign({ id: organization._id }, 'your_secret_key', { expiresIn: '1h' });

        // Return the token as part of the response
        res.status(201).json({ message: 'Organization created successfully', token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function login(req, res) {
    try {
        const { email, password } = req.body;


        const organization = await OrganizationModel.findOne({ email });
        if (!organization || !(await bcrypt.compare(password, organization.password))) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }
        const token = jwt.sign({ id: organization._id }, 'your_secret_key', { expiresIn: '1h' });
        res.cookie('jwt',  token, { maxAge: expirydate });
        res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

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


module.exports = { signup, login };