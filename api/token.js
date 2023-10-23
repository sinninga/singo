export default async function handler(req, res) {
    const { access_token } = req.query;
    if (!access_token) {
        return res.status(400).json({ error: 'Access token is missing.' });
    }
    res.json(
        {
           access_token: access_token
        })
}