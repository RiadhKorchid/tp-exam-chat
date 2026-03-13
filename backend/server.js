const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// In-memory storage
let messages = [
  {
    id: 1,
    author: 'System',
    content: '👋 Bienvenue dans le chat en temps réel !',
    timestamp: new Date().toISOString()
  }
];

// GET /api/messages
app.get('/api/messages', (req, res) => {
  res.json(messages);
});

// POST /api/messages
app.post('/api/messages', (req, res) => {
  const { author, content } = req.body;
  if (!author || !content) {
    return res.status(400).json({ error: 'author et content sont requis' });
  }
  const msg = {
    id: messages.length + 1,
    author: String(author).slice(0, 30),
    content: String(content).slice(0, 500),
    timestamp: new Date().toISOString()
  };
  messages.push(msg);
  res.status(201).json(msg);
});

// Health check
app.get('/', (req, res) => {
  res.json({ status: 'ok', message: 'Chat API is running 🚀', messagesCount: messages.length });
});

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
