const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { OrganizationModel } = require('../Models/OrganizationModel');
const ProjectIdea = require('../Models/ProjectIdeasModel');


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

const postProjectIdea = async (req, res) => {
    try {
        const token = req?.cookies?.jwt;
        const decoded = jwt.verify(token, 'jab');
        const { title, description, skillsRequired } = req?.body;
        const projectIdea = new ProjectIdea({
            title,
            description,
            skillsRequired,
            organizationId: decoded.id
        });
        await projectIdea.save();
        res.status(201).send('Project idea posted successfully');
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


const getProjectIdeas = async (req, res) => {
    try {
        const token = req?.cookies?.jwt;
        const decoded = jwt.verify(token, 'jab');
        const projectIdeas = await ProjectIdea.find({ organizationId: decoded.id });
        res.status(200).send(projectIdeas);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


const editProjectIdea = async (req, res) => {
    try {
        const projectId = req?.params?.id;
        const projectIdea = await ProjectIdea.findOne({ _id: projectId });
        projectIdea.title = req?.body?.title;
        projectIdea.description = req?.body?.description;
        projectIdea.skillsRequired = req?.body?.skillsRequired;
        await projectIdea.save();
        res.status(200).send('Project idea updated successfully');
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteProjectIdea = async (req, res) => {
    try {
        const projectId = req?.params?.id;
        await ProjectIdea.deleteOne({ _id: projectId });
        res.status(200).send('Project idea deleted successfully');
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


module.exports = { signup, login };