const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { OrganizationModel,OrganizationProfile } = require('../Models/OrganizationModel');

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
        const organizationId = await createprofile(req.body.email,req.body.description,req.body.sector, req.body.phoneNumber, req.body.name);
        res.status(201).json({ message: 'Organization created successfully', organizationId });
        // Create a new organization profile docum
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function createprofile(email,description,sector,name,phoneNumber){
    //find the organization id using email
    const id= await OrganizationModel.findOne({
        email:email
    });
    const organizationProfile = new OrganizationProfile({
        name: name,
        email: email,
        description,
        industry:sector,
        organizationId:id,
        contact:phoneNumber
    });
    console.log(organizationProfile);
    await organizationProfile.save();
}

async function login(req, res) {
    try {
        const { email, password } = req.body;
        const expirydate = 24 * 60 * 60 * 1000; 

        const organization = await OrganizationModel.findOne({ email });
        if (!organization || !(await bcrypt.compare(password, organization.password))) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }
        const token = jwt.sign({ id: organization._id }, 'jab', { expiresIn: '1h' });
        res.cookie('jwt',  token, { maxAge: expirydate });
        res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

//get user details
const getOrganizationProfile = async (req, res) => {
    try {
        const jwt1 = req.body.jwt;
        const user = jwt.verify(jwt1, 'jab');
        // Find the organization profile 
        const organizationProfile = await OrganizationProfile.findOne({ organizationId: user.id })
        console.log(organizationProfile);
        if (!organizationProfile) {
            return res.status(404).json({ message: 'Organization profile not found' });
        }
        res.status(200).json({ organizationProfile });

    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};


// Update the organization profile using the same organization id only pro

async function updateOrganizationProfile(req, res) {
    try{
        const jwt1 = req.body.jwt;
        const user = jwt.verify(jwt1, 'jab');
        const organizationProfile = await OrganizationProfile.findOne({ organizationId: user.id });
        // Update the organization profile projects,contact,profile description,
        organizationProfile.projects = req.body.projects;
        organizationProfile.contact = req.body.contact;
        organizationProfile.description = req.body.description;
        await organizationProfile.save();
        res.status(200).json({ message: 'Organization profile updated successfully' });
    }
    catch (error) {
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

async function logout(req, res) {
    res.cookie('jwt', '', { maxAge: 1 });
    res.send('logged out');
}

// Update the organization profile using the same organization id




module.exports = { signup, login, getOrganizationProfile, updateOrganizationProfile, checkAuthenticated, checkNotAuthenticated, logout};