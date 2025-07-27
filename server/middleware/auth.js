import jwt from 'jsonwebtoken';


// middleware to check if the user is connected 
export function requireAuthMiddleware(req, res, next) {
    try {
        const token = req.headers.authorization.split(' ')[1];
        
        if (!token) {
            return res.status(401).json({ message: 'Access denied. No token provided.' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Invalid token.' });
    }
}

// middleware to check if the user is an admin
export async function requireAdminMiddleware(req, res, next) {
    try{
        const token = req.headers.authorization.split(' ')[1];
        if (!token) {
            return res.status(403).json({ message: 'Unauthorized' });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (decoded.role !== 'admin') {
            return res.status(403).json({ message: 'Unauthorized' });
        }
        req.user = decoded;
        next();
        
    }catch(err){
        console.log(err);
        res.status(500).json({ message: 'internal server error', err });
    }
}

// middleware to check if the user is a user
export async function requireUserMiddleware(req, res, next) {
    try{
        const token = req.headers.authorization.split(' ')[1];
        if (!token) {
            return res.status(403).json({ message: 'Unauthorized' });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (decoded.role !== 'user' && decoded.role !== 'admin') {
            return res.status(403).json({ message: 'Unauthorized' });
        }
        req.user = decoded;
        next();

    }catch(err){
        console.log(err);
        res.status(500).json({ message: 'internal server error', err });
    }
}