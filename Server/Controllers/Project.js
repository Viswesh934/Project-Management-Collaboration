const jwt= require('jsonwebtoken');
const Project = require('../Models/Project');
const Organization = require('../Models/OrganizationModel');

// constant create project
const createProject = async (req, res) => {
    try{
        const token = req?.cookies?.jwt;
        const decoded = jwt.verify(token, 'jab');
        const project = new Project({
            title: req.body.title,
            description: req.body.description,
            organizationId: decoded.id,
            githubLink: req.body.githubLink,
            techUsed: req.body.techUsed
        });
        if(req.body.teamMembers){
            project.teamMembers = req.body.teamMembers;
        }
        console.log(project);
        await project.save();
        res.status(200).json({ message: 'Project created successfully' });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// constant get all projects
const getAllProjects = async(req,res)=>{
    try{
        const token = req?.cookies?.jwt;
        const decoded = jwt.verify(token, 'jab');

        const projects = await Project.find({ organizationId: decoded.id });
        res.status(200).json({ projects });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// constant edit project
const editProject = async(req,res)=>{
    try{
        console.log(req.body);
        const token = req?.cookies?.jwt;
        const decoded = jwt.verify(token, 'jab');
        console.log(req.params.id)
        const project = await Project.findById(req.params.id);
        console.log(project);
        if (project.organizationId.toString() !== decoded.id.toString()) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        project.title = req.body.title;
        project.description = req.body.description;
        if(req.body.teamMembers){
            project.teamMembers = req.body.teamMembers;
        }
        project.githubLink = req.body.githubLink;
        project.techUsed = req.body.techUsed;
        await project.save();
        res.status(200).json({ message: 'Project updated successfully' });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// constant delete project
const deleteProject = async(req,res)=>{
    try{
        const project = await Project.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Project deleted successfully' });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = { createProject, getAllProjects, editProject, deleteProject };