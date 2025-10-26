import express from 'express';
import cors from 'cors';
import NodeCache from 'node-cache';
import cron from 'node-cron';
import axios from 'axios';

const app = express();
const cache = new NodeCache({ stdTTL: 3600 });
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Mock data for Madhya Pradesh districts (in real scenario, fetch from data.gov.in)
const mpDistricts = [
  { id: 1, name: 'Bhopal', code: 'BP' },
  { id: 2, name: 'Indore', code: 'IN' },
  { id: 3, name: 'Jabalpur', code: 'JP' },
  { id: 4, name: 'Gwalior', code: 'GW' },
  { id: 5, name: 'Ujjain', code: 'UJ' },
  { id: 6, name: 'Sagar', code: 'SG' },
  { id: 7, name: 'Rewa', code: 'RW' },
  { id: 8, name: 'Satna', code: 'ST' }
];

// Mock MGNREGA data
const generateMockData = (districtId) => {
  const baseData = {
    workers: Math.floor(Math.random() * 5000) + 1000,
    households: Math.floor(Math.random() * 3000) + 500,
    expenditure: Math.floor(Math.random() * 50000000) + 10000000,
    person_days: Math.floor(Math.random() * 100000) + 50000,
    completion_rate: Math.floor(Math.random() * 40) + 60
  };
  
  return {
    ...baseData,
    change_percent: Math.floor(Math.random() * 40) - 20,
    district: mpDistricts.find(d => d.id === districtId)?.name
  };
};

// Auth middleware (simple mock)
const users = [];
const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization'];
  if (token === 'mock-token') {
    next();
  } else {
    res.status(401).json({ error: 'Unauthorized' });
  }
};

// Routes
app.get('/api/states', (req, res) => {
  res.json([{ id: 1, name: 'Madhya Pradesh', code: 'MP' }]);
});

app.get('/api/districts', (req, res) => {
  res.json(mpDistricts);
});

app.get('/api/district/:id/summary', authenticateToken, (req, res) => {
  const districtId = parseInt(req.params.id);
  const summary = generateMockData(districtId);
  res.json(summary);
});

app.get('/api/district/:id/history', authenticateToken, (req, res) => {
  const districtId = parseInt(req.params.id);
  const months = 12;
  const history = [];
  
  for (let i = 0; i < months; i++) {
    const date = new Date();
    date.setMonth(date.getMonth() - i);
    history.push({
      month: date.toLocaleString('default', { month: 'short' }),
      year: date.getFullYear(),
      workers: Math.floor(Math.random() * 5000) + 1000,
      expenditure: Math.floor(Math.random() * 50000000) + 10000000,
      person_days: Math.floor(Math.random() * 100000) + 50000
    });
  }
  
  res.json(history.reverse());
});

// Auth endpoints
app.post('/api/auth/register', (req, res) => {
  const { name, email, password } = req.body;
  users.push({ id: users.length + 1, name, email, password });
  res.json({ token: 'mock-token', user: { name, email } });
});

app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  res.json({ token: 'mock-token', user: { name: 'User', email } });
});

app.get('/api/state/overview', (req, res) => {
  res.json({
    total_workers: 123456,
    total_households: 789012,
    total_expenditure: 987654321,
    average_completion_rate: 85,
    description: 'An overview of the state of Madhya Pradesh.',
    hindiDescription: 'मध्य प्रदेश राज्य का अवलोकन।',
  });
});

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});