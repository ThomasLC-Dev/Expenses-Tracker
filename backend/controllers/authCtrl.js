import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import User from '../models/user.js';

export const register = async (req, res) => {
    if((req.body.email && req.body.email != '') && (req.body.password && req.body.password != '') && (req.body.firstname && req.body.firstname != '') && (req.body.lastname && req.body.lastname != '')){
        const email = req.body.email;
        const password = await bcrypt.hash(req.body.password, 12);
        const firstname = req.body.firstname;
        const lastname = req.body.lastname;

        const user = new User({
            email: email,
            password: password,
            firstname: firstname,
            lastname: lastname
        });

        await user.save();

        res.status(200).json({
            result: "User register !"
        });
    }
    else{
        res.status(400).json({
            result: "All fields are required !"
        });
    }
}

export const login = async (req, res) => {
    if((req.body.email && req.body.email != '') && (req.body.password && req.body.password != '')){
        const email = req.body.email;
        const password = req.body.password;

        const user = await User.findOne({email: email});

        if(!user){
            res.status(401).json({
                result: "Unknown email !",
            });
        }
        else{
            const passwordMatch = await bcrypt.compare(password, user.password);
            if (passwordMatch) {
                const token = jwt.sign({
                    authUserId: user._id.toString(),
                    authUserEmail: user.email
                }, process.env.SECRET_KEY, { expiresIn: "1h" });

                res.status(200).json({
                    token: token
                });
            }
            else {
                res.status(401).json({
                    result: "Wrong password !",
                });
            }
        }
    }
    else{
        res.status(400).json({
            result: "All fields are required !"
        });
    }
}