import Project from '../models/project.js';

export const getAllProjects = async (req, res) => {
    if(req.query.userId){
        const projects = await Project.find({userId: req.query.userId});

        res.status(201).json({
            result: projects
        });
    }
    else{
        const projects = await Project.find();

        res.status(201).json({
            result: projects
        });
    }
}

export const createProject = async (req, res) => {
    if((req.body.userId && req.body.userId != '') && (req.body.name && req.body.name != '')){
        const userId = req.body.userId;
        const name = req.body.name;

        const project = new Project({
            userId: userId,
            name: name,
            description: (req.body.description && req.body.description != '') ? req.body.description : null,
            goalAmount: (req.body.goalAmount && req.body.goalAmount != '') ? req.body.goalAmount : null,
            goalDate: (req.body.goalDate && req.body.goalDate != '') ? req.body.goalDate : null
        });

        await project.save();

        res.status(201).json({
            result: "Project created !"
        });
    }
}

export const getProject = async (req, res) => {
    const project = await Project.findById(req.params.projectId);

    if(!project){
        res.status(401).json({
            result: "Unknown project ID !",
        });
    }
    else{
        res.status(201).json({
            result: project
        });
    }
}

export const modifyProject = async (req, res) => {
    const project = await Project.findById(req.params.projectId);

    if(!project){
        res.status(401).json({
            result: "Unknown project ID !",
        });
    }
    else{
        project.name = (req.body.name) ? req.body.name : category.name;
        project.description = (req.body.description) ? req.body.description : project.description,
        project.goalAmount = (req.body.goalAmount) ? req.body.goalAmount : project.goalAmount,
        project.goalDate = (req.body.goalDate) ? req.body.goalDate : project.goalDate

        await project.save();

        res.status(201).json({
            result: "Project modified !"
        });
    }
}

export const deleteProject = async (req, res) => {
    const project = await Project.findById(req.params.projectId);

    if(!project){
        res.status(401).json({
            result: "Unknown project ID !",
        });
    }
    else{
        await Project.findByIdAndDelete(req.params.projectId);

        res.status(201).json({
            result: "Project deleted !",
        });
    }
}