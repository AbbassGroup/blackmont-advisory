require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express(); // Define app first

// CORS configuration
const corsOptions = {
  origin: ['http://localhost:3000', 'http://localhost:5005', 'http://localhost:5006', 'http://localhost:3004', 'https://api.blackmontadvisory.com', 'https://blackmontadvisory.com', 'https://www.blackmontadvisory.com', 'https://dev.blackmontadvisory.com', 'http://localhost:5059', 'http://localhost:3090'],
  credentials: true,
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTIONS']
};
app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

app.use(express.json());

// MongoDB Connection
console.log('MONGODB_URI:', process.env.MONGODB_URI);
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('MongoDB connected');
    // Start the post-approval IM follow-up email scheduler.
    const { startImFollowUpScheduler } = require('./utils/imFollowUpScheduler');
    startImFollowUpScheduler();
  })
  .catch((err) => console.error('MongoDB connection error:', err));


app.get('/', (req, res) => {
  res.send('Blackmont Advisory API is running');
});

const listingsRoutes = require('./routes/listings');
app.use('/api/listings', listingsRoutes);

const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

const valuationsRoutes = require('./routes/valuations');
app.use('/api/valuations', valuationsRoutes);

const confidentialityRoutes = require('./routes/confidentiality');
app.use('/api/confidentiality', confidentialityRoutes);

const eoiRoutes = require('./routes/eoi');
app.use('/api/eoi', eoiRoutes);

const enquiriesRoute = require('./routes/enquiries');
app.use('/api/enquiries', enquiriesRoute);

const digitalProposalRoutes = require('./routes/digitalProposal');
app.use('/api/digital-proposals', digitalProposalRoutes);

const seekEmailRoutes = require('./routes/seekEmail');
app.use('/api/seekbusiness-email', seekEmailRoutes);

const signNowRoutes = require('./routes/signNow');
app.use('/api/signnow', signNowRoutes);

const partnershipContactFormRoutes = require('./routes/partnership-contact-form');
app.use('/api/partnership-contact-form', partnershipContactFormRoutes);

const dealsRoutes = require('./routes/deals');
app.use('/api/deals', dealsRoutes);

const imTemplatesRoutes = require('./routes/imTemplates');
app.use('/api/im-templates', imTemplatesRoutes);

const accessAnalyticsRoutes = require('./routes/accessAnalytics');
app.use('/api/access-analytics', accessAnalyticsRoutes);

const imFollowUpRoutes = require('./routes/imFollowUp');
app.use('/api/im-follow-up', imFollowUpRoutes);

const vendorRoutes = require('./routes/vendor');
app.use('/api/vendor', vendorRoutes);

app.use('/uploads', express.static('uploads'));

const PORT = process.env.PORT || 5059;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 
