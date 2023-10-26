import fetch from 'node-fetch';
const { DEEPL_API_KEY } = process.env;

let deepl_api_key = DEEPL_API_KEY;

const router = express.Router();

router.post('/translate', async (req, res) => {
    try {
        const { text, targetLang } = req.body;

        const deepLApiURL = 'https://api-free.deepl.com/v2/translate';

        const translationRequest = {
            text,
            target_lang: targetLang,
        };

        const response = await fetch(deepLApiURL, {
            method: 'POST',
            headers: {
                'Authorization': `DeepL-Auth-Key ${deepl_api_key}`,
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams(translationRequest).toString(),
        });

        if (response.ok) {
            const data = await response.json();
            const translatedText = data.translations[0].text;
            res.json({ translatedText });
        } else {
            console.error('Error translating text:', response.statusText);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    } catch (error) {
        console.error('Error translating text:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

export default router;


