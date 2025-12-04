import 'dotenv/config'; 

import express from 'express';
import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY }); 

const app = express();
app.use(express.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*'); 
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

app.post('/api/generate', async (req, res) => {
    const { prompt } = req.body;

    if (!prompt) {
        return res.status(400).send({ error: 'Le champ prompt est requis.' });
    }

    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                maxOutputTokens: 150,
            }
        });

        res.json({ text: response.text });
    } catch (error) {
        console.error("Erreur Gemini:", error);
        res.status(500).send({ error: "Échec de la génération du contenu. Vérifiez que votre clé API est valide." });
    }
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT}`);
});