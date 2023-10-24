import { getAccessToken } from './tokenStore'; 

export default async function handler(req, res) {
    const access_token = getAccessToken();
    console.log('Received access_token:', access_token);
    if (!access_token) {
        return res.status(400).json({ error: 'Access token is missing.' });
    }
    res.json(
        {
           access_token
        });
}