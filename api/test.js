export default async function handler(req, res) {
    console.log('test route hit production');
    res.send('Test route response');
}