app.post('/api/eoi', async (req, res) => {
  try {
    const { purchaserName, purchaserEmail, purchaserPhone, purchaserAddress, purchaserCity, purchaserState, purchaserPostcode, purchaserCountry, businessName, businessCity, businessState, purchasePrice, depositValue, balanceOfPurchase, settlementDate, weeksFromContract, subjectTo, solicitorName, solicitorEmail, solicitorPhone, solicitorAddress, solicitorCity, solicitorState, solicitorPostcode } = req.body;
    const msg = {
      to: process.env.ADMIN_EMAIL,
      from: process.env.SENDGRID_FROM_EMAIL,
      subject: 'New EOI Form Submission',
      text: `New EOI Form Submission\n\nPurchaser Details:\nName: ${purchaserName}\nEmail: ${purchaserEmail}\nPhone: ${purchaserPhone}\nAddress: ${purchaserAddress}\nCity: ${purchaserCity}\nState: ${purchaserState}\nPostcode: ${purchaserPostcode}\nCountry: ${purchaserCountry}\n\nBusiness Details:\nName: ${businessName}\nCity: ${businessCity}\nState: ${businessState}\n\nPrice Details:\nPurchase Price: ${purchasePrice}\nDeposit Value: ${depositValue}\nBalance Of Purchase: ${balanceOfPurchase}\n\nSettlement Date:\nDate: ${settlementDate}\nWeeks From Contract: ${weeksFromContract}\n\nSubject To:\n${subjectTo}\n\nSolicitor Details:\nName: ${solicitorName}\nEmail: ${solicitorEmail}\nPhone: ${solicitorPhone}\nAddress: ${solicitorAddress}\nCity: ${solicitorCity}\nState: ${solicitorState}\nPostcode: ${solicitorPostcode}`,
      html: `<h1>New EOI Form Submission</h1><h2>Purchaser Details:</h2><p>Name: ${purchaserName}<br>Email: ${purchaserEmail}<br>Phone: ${purchaserPhone}<br>Address: ${purchaserAddress}<br>City: ${purchaserCity}<br>State: ${purchaserState}<br>Postcode: ${purchaserPostcode}<br>Country: ${purchaserCountry}</p><h2>Business Details:</h2><p>Name: ${businessName}<br>City: ${businessCity}<br>State: ${businessState}</p><h2>Price Details:</h2><p>Purchase Price: ${purchasePrice}<br>Deposit Value: ${depositValue}<br>Balance Of Purchase: ${balanceOfPurchase}</p><h2>Settlement Date:</h2><p>Date: ${settlementDate}<br>Weeks From Contract: ${weeksFromContract}</p><h2>Subject To:</h2><p>${subjectTo}</p><h2>Solicitor Details:</h2><p>Name: ${solicitorName}<br>Email: ${solicitorEmail}<br>Phone: ${solicitorPhone}<br>Address: ${solicitorAddress}<br>City: ${solicitorCity}<br>State: ${solicitorState}<br>Postcode: ${solicitorPostcode}</p>`,
    };
    await sendMail(msg);
    res.status(200).json({ message: 'EOI form submitted successfully' });
  } catch (error) {
    console.error('Error submitting EOI form:', error);
    res.status(500).json({ error: 'Failed to submit EOI form' });
  }
}); 