require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const { notifyError } = require('./utils/errorNotifier');
const { errorAlert, errorHandler } = require('./middleware/errorAlert.middleware');
const app = express(); // Define app first

// CORS configuration
const corsOptions = {
  origin: ['http://localhost:3000', 'http://localhost:3001', 'http://localhost:5005', 'http://localhost:5006', 'http://localhost:3004', 'https://api.blackmontadvisory.com', 'https://blackmontadvisory.com', 'https://www.blackmontadvisory.com', 'https://dev.blackmontadvisory.com', 'http://localhost:5059', 'http://localhost:3090'],
  credentials: true,
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTIONS']
};
app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

// Rich reports (many sections, rich text, tables, chart rows) outgrow the 100 KB
// default, after which every save would 413 and nothing would persist again.
app.use(express.json({ limit: '10mb' }));

app.use(errorAlert);


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

// Legacy acceptance path. The proposal page used to post here when acceptance
// was meant to run through SignNow; that integration never existed and has been
// removed, but a proposal a customer already had open still posts to this URL.
// Safe to delete once no stale pages remain in the wild.
app.post('/api/signnow/accept-proposal', digitalProposalRoutes.acceptProposal);

const partnershipContactFormRoutes = require('./routes/partnership-contact-form');
app.use('/api/partnership-contact-form', partnershipContactFormRoutes);

const dealsRoutes = require('./routes/deals');
app.use('/api/deals', dealsRoutes);

const imTemplatesRoutes = require('./routes/imTemplates');
app.use('/api/im-templates', imTemplatesRoutes);

const acquisitionReportsRoutes = require('./routes/acquisitionReports');
app.use('/api/acquisition-reports', acquisitionReportsRoutes);

const acquisitionRoutes = require('./routes/acquisition');
app.use('/api/acquisition', acquisitionRoutes);

const accessAnalyticsRoutes = require('./routes/accessAnalytics');
app.use('/api/access-analytics', accessAnalyticsRoutes);

const imFollowUpRoutes = require('./routes/imFollowUp');
app.use('/api/im-follow-up', imFollowUpRoutes);

const vendorRoutes = require('./routes/vendor');
app.use('/api/vendor', vendorRoutes);

const offerTermSheetRoutes = require('./routes/offerTermSheets');
app.use('/api/offer-term-sheets', offerTermSheetRoutes);

app.use('/uploads', express.static('uploads'));


app.use(errorHandler);


// Shut the PDF renderer's Chrome down with the server, so restarts don't leave
// orphaned browser processes behind.
const { closePdfBrowser } = require('./utils/proposalPdf');
for (const signal of ['SIGINT', 'SIGTERM']) {
  process.on(signal, async () => {
    await closePdfBrowser();
    process.exit(0);
  });
}

process.on('unhandledRejection', (reason) => {
  console.error('Unhandled Rejection:', reason);
  notifyError({ source: 'unhandledRejection', error: reason });
});
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
  notifyError({ source: 'uncaughtException', error: err });
});


const PORT = process.env.PORT || 5059;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 
