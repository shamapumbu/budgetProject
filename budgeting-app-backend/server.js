const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');
const plaidController = require('./controllers/plaidController');
const authenticate = require('./middleware/authenticate');
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

//authentication routes
app.use('/api/auth', authRoutes)

// Add these lines to use the Plaid routes
app.get('/api/plaid/link_token', authenticate, plaidController.getLinkToken);
app.post('/api/plaid/exchange_public_token', authenticate, plaidController.exchangePublicToken);
app.get('/api/plaid/transactions', authenticate, plaidController.getTransactions);

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
  console.error('Error connecting to MongoDB:', err);
});

// Routes
// TODO: Implement API routes

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
