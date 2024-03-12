const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { OrganizationModel } = require('../models/organizationmodel');

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

        // If organization is not found or password doesn't match, return an error
        if (!organization || !(await bcrypt.compare(password, organization.password))) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Generate JWT token with organization's id as payload
        const token = jwt.sign({ id: organization._id }, 'your_secret_key', { expiresIn: '1h' });

        // Return the token as part of the response
        res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = { signup, login };
