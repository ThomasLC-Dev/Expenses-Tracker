import jwt from 'jsonwebtoken';

const checkAuth = async (req, res, next) => {
    const authorizationHeader = req.get('Authorization');
    
    if(!authorizationHeader){
        res.status(401).json({
            error: "No token found !"
        });
    }
    else{
        const token = authorizationHeader.split(' ')[1];
        let decodedToken;
        
        try{
            decodedToken = await jwt.verify(token, process.env.SECRET_KEY);

            req.authUserId = decodedToken.authUserId;
            req.authUserEmail = decodedToken.authUserEmail;
            next();
        }
        catch(err){
            res.status(401).json({
                error: "Invalid token !"
            });
        }
    }

}

export default checkAuth;