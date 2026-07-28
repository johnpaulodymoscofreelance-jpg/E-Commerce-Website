import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';
import { PRODUCTS } from './src/data/products.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini Client
const getAiClient = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.warn('GEMINI_API_KEY is missing. AI Stylist response will use fallback mode.');
    return null;
  }
  return new GoogleGenAI({ apiKey });
};

// API: Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', brand: 'Aurelia Maison de Luxe' });
});

// API: Products endpoint
app.get('/api/products', (req, res) => {
  const { category, search } = req.query;
  let filtered = [...PRODUCTS];

  if (category && category !== 'All') {
    filtered = filtered.filter(p => p.category.toLowerCase() === String(category).toLowerCase());
  }

  if (search) {
    const q = String(search).toLowerCase();
    filtered = filtered.filter(p => 
      p.name.toLowerCase().includes(q) || 
      p.description.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q)
    );
  }

  res.json({ products: filtered });
});

// API: AI Personal Stylist & Concierge Endpoint
app.post('/api/stylist', async (req, res) => {
  try {
    const { prompt, history = [] } = req.body;
    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }

    const ai = getAiClient();
    if (!ai) {
      // High luxury fallback recommendation logic if API key unavailable
      const matched = PRODUCTS.filter(p => 
        prompt.toLowerCase().includes(p.category.toLowerCase()) || 
        prompt.toLowerCase().includes('gold') ||
        prompt.toLowerCase().includes('dress') ||
        prompt.toLowerCase().includes('gift')
      );
      const recommended = (matched.length > 0 ? matched : PRODUCTS.slice(0, 3)).map(p => p.id);

      return res.json({
        reply: `It is my absolute pleasure to assist you at Aurelia Maison de Luxe. Based on your preference, I highly recommend exploring our flagship pieces crafted in Milan, Paris, and Geneva. Each piece comes with white-glove concierge packaging and complimentary insured express delivery.`,
        recommendedProductIds: recommended
      });
    }

    // Build context with Aurelia catalog
    const catalogContext = PRODUCTS.map(p => 
      `- ID: ${p.id}, Name: "${p.name}", Category: ${p.category}, Price: $${p.price}, Description: ${p.subtitle}`
    ).join('\n');

    const systemInstruction = `You are the Head Personal Stylist and Concierge for "Aurelia Maison de Luxe", an ultra-exclusive luxury brand specializing in Haute Couture, Fine Jewelry (18k gold & diamonds), Haute Horlogerie (tourbillon timepieces), Fine Italian Leather Goods, and Maison Fragrance.

Your tone is exceedingly polite, sophisticated, warm, attentive, and cultured (similar to a senior personal shopper at Dior, Harrods, or Place Vendôme).

Available Aurelia Catalog:
${catalogContext}

When recommending products from Aurelia, reference them by exact name and price. At the end of your response, output a JSON block wrapped in triple backticks with key "recommendedProductIds" listing array of product IDs that match the advice.
Example:
\`\`\`json
{
  "recommendedProductIds": ["solis-gold-diamond-choker", "aurelia-cashmere-overcoat"]
}
\`\`\``;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: [
        { role: 'user', parts: [{ text: systemInstruction }] },
        ...history.map((h: any) => ({
          role: h.sender === 'user' ? 'user' : 'model',
          parts: [{ text: h.text }]
        })),
        { role: 'user', parts: [{ text: prompt }] }
      ]
    });

    const replyText = response.text || 'Allow me to curate the perfect ensemble for you.';

    // Extract recommended product IDs if present
    let recommendedProductIds: string[] = [];
    const jsonMatch = replyText.match(/```json\s*(\{[\s\S]*?\})\s*```/);
    if (jsonMatch && jsonMatch[1]) {
      try {
        const parsed = JSON.parse(jsonMatch[1]);
        if (Array.isArray(parsed.recommendedProductIds)) {
          recommendedProductIds = parsed.recommendedProductIds;
        }
      } catch (e) {
        console.warn('Could not parse stylist json IDs', e);
      }
    }

    // Clean JSON block out of visible reply for user readability
    const cleanReply = replyText.replace(/```json\s*\{[\s\S]*?\}\s*```/g, '').trim();

    res.json({
      reply: cleanReply,
      recommendedProductIds
    });
  } catch (error: any) {
    console.error('Stylist API Error:', error);
    res.status(500).json({ error: 'Concierge is currently attending another client. Please try again in a moment.' });
  }
});

// API: Simulated Checkout
app.post('/api/checkout', (req, res) => {
  const { items, shippingAddress, paymentMethod, total } = req.body;
  const orderId = `AUR-${Math.floor(100000 + Math.random() * 900000)}`;
  
  res.json({
    success: true,
    orderId,
    estimatedDelivery: '3-5 Business Days (White-Glove Courier)',
    receiptUrl: '#',
    message: 'Thank you for your order with Aurelia Maison de Luxe.'
  });
});

// Vite Middleware Integration
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[Aurelia Luxury] Express Server running on http://localhost:${PORT}`);
  });
}

startServer();
