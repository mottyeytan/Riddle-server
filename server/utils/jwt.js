import jwt from 'jsonwebtoken';
import 'dotenv/config';

export const generateToken = (name, role = 'user') => {
    return jwt.sign({ name, role }, process.env.JWT_SECRET, { expiresIn: '1d' });
};

export const verifyToken = (token) => {
    return jwt.verify(token, process.env.JWT_SECRET);
};