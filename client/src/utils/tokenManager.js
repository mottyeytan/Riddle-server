import jwt from 'jsonwebtoken';
import fs from 'fs/promises';
import chalk from 'chalk';

const TOKEN_FILE = './client-token.json';

export async function saveToken(token) {
    try {
        const tokenData = {
            token,
            timestamp: Date.now(),
            expiresAt: Date.now() + (24 * 60 * 60 * 1000) // 24 שעות 
        };
        
        await fs.writeFile(TOKEN_FILE, JSON.stringify(tokenData, null, 2));
        console.log(chalk.gray("--------------------------"))
        console.log(chalk.yellow("Token saved successfully"));
        console.log(chalk.gray("--------------------------"))
    } catch (error) {
        console.error("Error saving token:", error);
    }
}

export async function getToken() {
    try {
        const data = await fs.readFile(TOKEN_FILE, 'utf8');
        const tokenData = JSON.parse(data);

        const decoded = jwt.decode(tokenData.token);
        const role = decoded.role;
        
        if (Date.now() > tokenData.expiresAt) {
            console.log('token expired, removing...');
            await removeToken();
            return null;
        }
        
        return {token: tokenData.token, role: role};
    } catch (error) {
        
        return null;
    }
}

export async function removeToken() {
    try {
        await fs.unlink(TOKEN_FILE);
        console.log("Token removed successfully");
    } catch (error) {
        
    }
}

export async function isLoggedIn() {
    const token = await getToken();
    return token !== null;
}

export async function getCurrentUser() {
    const token = await getToken();
    if (!token) return null;
    
    try {
        
        const decoded = jwt.decode(token);
        return decoded;
    } catch (error) {
        return null;
    }
}

export async function isAdmin() {
    const user = await getCurrentUser();
    return user?.role === 'admin';
}

export async function isUser() {
    const user = await getCurrentUser();
    return user?.role === 'user' || user?.role === 'admin';
} 