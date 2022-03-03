import User from '../models/user.js';

export const getAllUsers = async (req, res) => {
    const users = await User.find();

    res.status(201).json({
        result: users
    });
}

export const getUser = async (req, res) => {
    const user = await User.findById(req.params.userId);

    if(!user){
        res.status(401).json({
            result: "Unknown user ID !",
        });
    }
    else{
        res.status(201).json({
            result: user
        });
    }
}

export const modifyUser = async (req, res) => {
    const user = await User.findById(req.params.userId);

    if(!user){
        res.status(401).json({
            result: "Unknown user ID !",
        });
    }
    else{
        user.email = (req.body.email) ? req.body.email : expense.email;
        user.firstname = (req.body.firstname) ? req.body.firstname : expense.firstname;
        user.lastname = (req.body.lastname) ? req.body.lastname : expense.lastname;
        await user.save();

        res.status(201).json({
            result: "User modified !"
        });
    }
}

export const deleteUser = async (req, res) => {
    const user = await User.findById(req.params.userId);

    if(!user){
        res.status(401).json({
            result: "Unknown user ID !",
        });
    }
    else{
        await User.findByIdAndDelete(req.params.userId);

        res.status(201).json({
            result: "User deleted !",
        });
    }
}