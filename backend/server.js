import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import NodeCache from 'node-cache';

dotenv.config();

const app = express();
const cache = new NodeCache({ stdTTL: 3600 });
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// --- MongoDB Connection ---
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB Connected...');
  } catch (err) {
    console.error(err.message);
    process.exit(1); // Exit process with failure
  }
};
connectDB();

// --- Mongoose User Schema and Model ---
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model('user', UserSchema);

// --- JWT Generation ---
const generateToken = (user) => {
  return jwt.sign({ id: user.id, name: user.name }, process.env.JWT_SECRET, {
    expiresIn: '8h',
  });
};

// --- Auth Endpoints ---
app.post('/api/auth/register', async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Please enter all fields' });
  }

  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }

    user = new User({
      name,
      email,
      password,
    });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();

    const token = generateToken(user);
    res.status(201).json({
      token,
      user: { name: user.name, email: user.email },
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Please enter all fields' });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = generateToken(user);
    res.json({
      token,
      user: { name: user.name, email: user.email },
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// --- Auth Middleware ---
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

  if (token == null) return res.sendStatus(401); // if there isn't any token

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403); // if token is no longer valid
    req.user = user;
    next(); // move on to the next middleware
  });
};


// --- Mock Data (Preserved) ---
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

// --- API Routes ---
app.get('/api/states', (req, res) => {
  res.json([{ id: 1, name: 'Madhya Pradesh', code: 'MP' }]);
});

app.get('/api/districts', (req, res) => {
  res.json(mpDistricts);
});

// Example of a protected route
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
