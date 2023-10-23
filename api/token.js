const { access_token } = req.query;
console.log('Received access_token:', access_token);

export default async function handler(req, res) {
    if (!access_token) {
        return res.status(400).json({ error: 'Access token is missing.' });
    }
    res.json(
        {
           access_token: access_token
        });

    console.log('Response sent:', { access_token });

}