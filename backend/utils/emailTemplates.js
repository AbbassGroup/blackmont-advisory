const { formatFrom } = require('./emailFrom');

const createAdminNotificationEmail = (proposal, type = 'created') => {
  const isUpdate = type === 'updated';
  const subject = isUpdate
    ? 'Digital Proposal Updated - Review Required'
    : 'New Digital Proposal Created - Review Required';

  const actionText = isUpdate
    ? 'A digital proposal has been updated and requires your review.'
    : 'A new digital proposal has been created and requires your review and approval.';

  const dateField = isUpdate
    ? `Last Updated: ${new Date(proposal.updatedAt).toLocaleString()}`
    : `Created At: ${new Date(proposal.createdAt).toLocaleString()}`;

  const statusField = isUpdate
    ? `Status: ${proposal.isApproved ? 'Approved' : 'Pending'}`
    : `Created By: ${proposal.createdBy}`;

  return {
    from: formatFrom(process.env.EMAIL_FROM),
    to: 'sadeq@abbass.group',
    subject: subject,
    text: `${actionText}

Proposal Details:
Business Name: ${proposal.businessName}
Business Value: ${proposal.businessValue}
Broker: ${proposal.brokerName}
Customer Name: ${proposal.customerName}
Customer Email: ${proposal.customerEmail}
${statusField}
${dateField}

Please log into the admin dashboard to review this ${isUpdate ? 'updated' : ''} proposal.

Admin Dashboard: ${process.env.FRONTEND_URL}/admin

Regards,
Blackmont Advisory`,
    html: `
      <h2>${subject}</h2>
      <p>${actionText}</p>
      
      <h3>Proposal Details:</h3>
      <ul>
        <li><strong>Business Name:</strong> ${proposal.businessName}</li>
        <li><strong>Business Value:</strong> ${proposal.businessValue}</li>
        <li><strong>Broker:</strong> ${proposal.brokerName}</li>
        <li><strong>Customer Name:</strong> ${proposal.customerName}</li>
        <li><strong>Customer Email:</strong> ${proposal.customerEmail}</li>
        <li><strong>${isUpdate ? 'Status' : 'Created By'}:</strong> ${isUpdate ? (proposal.isApproved ? 'Approved' : 'Pending') : proposal.createdBy}</li>
        <li><strong>${isUpdate ? 'Last Updated' : 'Created At'}:</strong> ${isUpdate ? new Date(proposal.updatedAt).toLocaleString() : new Date(proposal.createdAt).toLocaleString()}</li>
      </ul>
      
      <p>Please log into the admin dashboard to review this ${isUpdate ? 'updated' : ''} proposal.</p>
      <p><a href="${process.env.FRONTEND_URL}/admin" style="background-color: #56C1BC; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Review Proposal</a></p>
      
      <p>Regards,<br/>
      Blackmont Advisory</p>
    `
  };
};

const createCustomerApprovalEmail = (proposal) => {
  return {
    from: formatFrom(process.env.EMAIL_FROM),
    to: proposal.customerEmail,
    cc: proposal?.brokerEmail === "sadeq@abbass.group" ? "sadeq@abbass.group" : `${proposal?.brokerEmail}, sadeq@abbass.group`,
    subject: 'Your Business Proposal Has Been Prepared | Blackmont Advisory',
    text: `Dear ${proposal.customerName || proposal.brokerName},

Your business appraisal for ${proposal.businessName} has been completed and approved.

You can view your complete business appraisal report by clicking the link below:
${process.env.FRONTEND_URL}/proposal?id=${proposal._id}&email=${encodeURIComponent(proposal.customerEmail)}

If you have any questions about your appraisal or would like to discuss next steps, please don't hesitate to contact us.

Regards,
Blackmont Advisory
Phone: (03) 9103 1317
Email: info@blackmontadvisory.com
Website: www.blackmontadvisory.com`,
    html: `

        <h2 style="color: #333; margin-bottom: 20px;">Your Business Proposal has been prepared</h2>
        
        <p style="color: #333; line-height: 1.6;">Dear ${proposal.customerName || proposal.brokerName},</p>
        
        <p style="color: #333; line-height: 1.6;">Your business appraisal for <strong>${proposal.businessName}</strong> has been completed and approved.</p>
        
        <p style="color: #333; line-height: 1.6;">You can view your complete business appraisal report by clicking the link below:</p>
        
        <div style="margin: 30px 0;">
          <a href="${process.env.FRONTEND_URL}/proposal?id=${proposal._id}&email=${encodeURIComponent(proposal.customerEmail)}" 
             style="background-color: #56C1BC; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; display: inline-block; font-weight: bold;">View Report</a>
        </div>
        
        <p style="color: #333; line-height: 1.6;">If you have any questions about your appraisal or would like to discuss next steps, please don't hesitate to contact us.</p>
        
        <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #eee;">
          <p style="color: #333; line-height: 1.6; margin-bottom: 5px;"><strong>Regards,</strong></p>
          <p style="color: #333; line-height: 1.6; margin-bottom: 5px;">Blackmont Advisory</p>
          <p style="color: #333; line-height: 1.6; margin-bottom: 5px;">Phone: (03) 9103 1317</p>
          <p style="color: #333; line-height: 1.6; margin-bottom: 5px;">Email: info@blackmontadvisory.com</p>
          <p style="color: #333; line-height: 1.6; margin-bottom: 0;">Website: <a href="https://www.blackmontadvisory.com" style="color: #56C1BC;">www.blackmontadvisory.com</a></p>
        </div>
    `
  };
};

// Helper function to format amount with unit
const formatAmount = (amount, unit) => {
  if (!amount) return 'N/A';
  const symbol = unit === 'Dollar' ? '$' : '';
  const suffix = unit === 'Percentage' ? '%' : '';
  return `${symbol}${amount}${suffix}`;
};

const createProposalAcceptanceEmail = (proposal, selectedAdvertisement, selectedSuccessFee) => {
  const advertisementAmount = selectedAdvertisement
    ? `${formatAmount(selectedAdvertisement.amount, selectedAdvertisement.unit)} + GST`
    : 'Not selected';

  // Convert <br> to line breaks for text display
  const advertisementText = selectedAdvertisement?.text
    ? selectedAdvertisement.text.replace(/<br\s*\/?>/gi, '\n').replace(/&amp;/g, '&')
    : '';

  const successFeeAmount = selectedSuccessFee
    ? `${formatAmount(selectedSuccessFee.amount, selectedSuccessFee.unit)} + GST`
    : 'Not selected';

  const successFeeText = selectedSuccessFee?.text
    ? selectedSuccessFee.text.replace(/<br\s*\/?>/gi, '\n').replace(/&amp;/g, '&')
    : '';

  const recipients = ['sadeq@abbass.group'];
  if (proposal.brokerEmail && proposal.brokerEmail !== 'sadeq@abbass.group') {
    recipients.push(proposal.brokerEmail);
  }

  return {
    from: formatFrom(process.env.EMAIL_FROM),
    to: recipients.join(', '),
    subject: `Proposal Accepted: ${proposal.businessName} - Business Brokers`,
    text: `PROPOSAL ACCEPTED

A client has accepted a proposal. Please prepare the agreement.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

CUSTOMER DETAILS
Name: ${proposal.customerName || 'N/A'}
Email: ${proposal.customerEmail}

BUSINESS DETAILS
Business Name: ${proposal.businessName}
Business Value: ${proposal.businessValue}
Business Address: ${proposal.businessAddress || 'N/A'}

AGREEMENT DETAILS
Listing Price: ${proposal.listingPrice ? `$${proposal.listingPrice}` : 'N/A'}
Agreement Term: ${proposal.agreementTerm || '90'} days
Performance Bonus: ${proposal.performanceBonus ? `${proposal.performanceBonus}%` : 'N/A'}
Sale Price: ${proposal.salePrice ? `$${proposal.salePrice}` : 'N/A'}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

SELECTED OPTIONS

ADVERTISEMENT: ${advertisementAmount}
${advertisementText}

SUCCESS FEE: ${successFeeAmount}
${successFeeText}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Please prepare and send the agreement to the customer.

— Blackmont Advisory`,
    html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 20px; font-family: Arial, sans-serif; font-size: 14px; line-height: 1.6; color: #333;">
  
  <h2 style="margin: 0 0 5px; color: #333;">Proposal Accepted</h2>
  <p style="margin: 0 0 20px; color: #666;">A client has accepted a proposal. Please prepare the agreement.</p>
  
  <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
  
  <h3 style="margin: 0 0 10px; color: #333; font-size: 14px;">CUSTOMER DETAILS</h3>
  <table style="margin-bottom: 20px;">
    <tr><td style="padding: 2px 10px 2px 0; color: #666;">Name:</td><td>${proposal.customerName || 'N/A'}</td></tr>
    <tr><td style="padding: 2px 10px 2px 0; color: #666;">Email:</td><td>${proposal.customerEmail}</td></tr>
  </table>
  
  <h3 style="margin: 0 0 10px; color: #333; font-size: 14px;">BUSINESS DETAILS</h3>
  <table style="margin-bottom: 20px;">
    <tr><td style="padding: 2px 10px 2px 0; color: #666;">Business Name:</td><td><strong>${proposal.businessName}</strong></td></tr>
    <tr><td style="padding: 2px 10px 2px 0; color: #666;">Business Value:</td><td>${proposal.businessValue}</td></tr>
    <tr><td style="padding: 2px 10px 2px 0; color: #666;">Business Address:</td><td>${proposal.businessAddress || 'N/A'}</td></tr>
  </table>
  
  <h3 style="margin: 0 0 10px; color: #333; font-size: 14px;">AGREEMENT DETAILS</h3>
  <table style="margin-bottom: 20px;">
    <tr><td style="padding: 2px 10px 2px 0; color: #666;">Listing Price:</td><td>${proposal.listingPrice ? `$${proposal.listingPrice}` : 'N/A'}</td></tr>
    <tr><td style="padding: 2px 10px 2px 0; color: #666;">Agreement Term:</td><td>${proposal.agreementTerm || '90'} days</td></tr>
    <tr><td style="padding: 2px 10px 2px 0; color: #666;">Performance Bonus:</td><td>${proposal.performanceBonus ? `${proposal.performanceBonus}%` : 'N/A'}</td></tr>
    <tr><td style="padding: 2px 10px 2px 0; color: #666;">Sale Price:</td><td>${proposal.salePrice ? `$${proposal.salePrice}` : 'N/A'}</td></tr>
  </table>
  
  <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
  
  <h3 style="margin: 0 0 15px; color: #333; font-size: 14px;">SELECTED OPTIONS</h3>
  
  <div style="margin-bottom: 20px; padding: 15px; border: 1px solid #ddd; border-radius: 4px;">
    <p style="margin: 0 0 5px;"><strong>Advertisement:</strong> <span style="color: #56C1BC;">${advertisementAmount}</span></p>
    <p style="margin: 0; color: #666; font-size: 13px; white-space: pre-line;">${selectedAdvertisement?.text ? selectedAdvertisement.text.replace(/<br\s*\/?>/gi, '<br>').replace(/&amp;/g, '&') : 'N/A'}</p>
  </div>
  
  <div style="margin-bottom: 20px; padding: 15px; border: 1px solid #ddd; border-radius: 4px;">
    <p style="margin: 0 0 5px;"><strong>Success Fee:</strong> <span style="color: #56C1BC;">${successFeeAmount}</span></p>
    <p style="margin: 0; color: #666; font-size: 13px; white-space: pre-line;">${selectedSuccessFee?.text ? selectedSuccessFee.text.replace(/<br\s*\/?>/gi, '<br>').replace(/&amp;/g, '&') : 'N/A'}</p>
  </div>
  
  <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
  
 
  <p style="margin: 30px 0 0; color: #999; font-size: 12px;">— Blackmont Advisory</p>
  
</body>
</html>
    `
  };
};

const viewImTemplate = (title, docsJson) => {
  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5.0, user-scalable=yes">
  <title>${title} — Information Memorandum</title>
  <meta name="robots" content="noindex,nofollow">
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    body { background: #1a1a1a; display: flex; flex-direction: column; height: 100dvh; font-family: Arial, sans-serif; user-select: none; -webkit-user-select: none; overflow: hidden; }

    /* ── Header ── */
    header { background: #0d1b2a; color: #fff; padding: 10px 16px; display: flex; align-items: center; gap: 10px; flex-shrink: 0; z-index: 20; }
    header img { height: 28px; flex-shrink: 0; }
    header .title { font-weight: bold; font-size: 15px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; flex: 1; min-width: 0; margin-right: 10px; }
    header .badge { font-size: 11px; opacity: 0.6; white-space: nowrap; display: none; margin-right: 16px; }
    @media (min-width: 600px) { header .badge { display: block; } }

    /* Zoom Controls */
    .zoom-controls { display: flex; align-items: center; gap: 4px; background: rgba(255,255,255,0.1); border-radius: 4px; padding: 2px; z-index: 100; }
    .zoom-controls button { background: none; border: none; color: white; width: 28px; height: 28px; font-size: 18px; cursor: pointer; border-radius: 4px; display: flex; align-items: center; justify-content: center; transition: background 0.2s; }
    .zoom-controls button:hover { background: rgba(255,255,255,0.2); }
    #zoom-val { font-size: 12px; min-width: 44px; text-align: center; user-select: none; }
    
    @media (min-width: 768px) {
      .zoom-controls {
        position: fixed;
        bottom: 30px;
        left: calc(50% + 110px);
        transform: translateX(-50%);
        background: rgba(30, 30, 30, 0.85);
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: 30px;
        padding: 6px 12px;
        box-shadow: 0 10px 30px rgba(0,0,0,0.5);
        backdrop-filter: blur(10px);
        -webkit-backdrop-filter: blur(10px);
      }
      .zoom-controls button {
        width: 36px; height: 36px; font-size: 22px; border-radius: 50%;
      }
      #zoom-val { font-size: 14px; min-width: 60px; font-weight: 500; }
    }

    /* ── Hamburger toggle (mobile only) ── */
    #menu-btn {
      background: none; border: none; color: #fff; cursor: pointer; padding: 4px 6px;
      font-size: 20px; line-height: 1; flex-shrink: 0; display: none;
    }
    @media (max-width: 599px) { #menu-btn { display: block; } }

    /* ── Layout ── */
    #main { display: flex; flex: 1; overflow: hidden; position: relative; }

    /* ── Sidebar ── */
    #sidebar {
      width: 220px; flex-shrink: 0; background: #111827; overflow-y: auto;
      border-right: 1px solid rgba(255,255,255,0.08); display: flex; flex-direction: column;
      transition: transform 0.25s ease;
    }
    /* Mobile: sidebar is an absolute overlay, hidden by default */
    @media (max-width: 599px) {
      #sidebar {
        position: absolute; inset: 0 auto 0 0; z-index: 15; width: 80%; max-width: 280px;
        transform: translateX(-100%);
      }
      #sidebar.open { transform: translateX(0); }
      #overlay { display: block; }
      #overlay.open { opacity: 1; pointer-events: auto; }
    }

    /* Backdrop for mobile sidebar */
    #overlay {
      display: none; position: absolute; inset: 0; background: rgba(0,0,0,0.5);
      z-index: 14; opacity: 0; pointer-events: none; transition: opacity 0.25s;
    }

    #sidebar .label { padding: 14px 14px 6px; font-size: 11px; color: rgba(255,255,255,0.4); text-transform: uppercase; letter-spacing: 0.8px; flex-shrink: 0; }
    #sidebar button {
      background: none; border: none; color: rgba(255,255,255,0.75); cursor: pointer;
      padding: 12px 14px; text-align: left; font-size: 14px; line-height: 1.4;
      border-left: 3px solid transparent; transition: background 0.15s; word-break: break-word; width: 100%;
    }
    #sidebar button:hover { background: rgba(255,255,255,0.06); }
    #sidebar button.active { background: rgba(86,193,188,0.15); border-left-color: #56C1BC; color: #fff; }

    /* ── Scroll area + PDF canvases ── */
    #scroll-area { flex: 1; overflow-y: auto; overflow-x: auto; background: #2a2a2a; padding: 20px; text-align: center; cursor: grab; }
    #scroll-area:active, #scroll-area.grabbing { cursor: grabbing !important; }
    
    :root { --pdf-zoom: 100%; }
    
    .doc-container { display: flex; flex-direction: column; align-items: center; gap: 20px; margin-bottom: 40px; }
    .page-wrapper {
      width: var(--pdf-zoom);
      max-width: 1600px;
      min-width: 300px;
      background: white;
      box-shadow: 0 4px 12px rgba(0,0,0,0.3);
      position: relative;
      display: flex; align-items: center; justify-content: center;
      margin: 0 auto;
      transition: width 0.15s ease-out;
    }
    .pdf-canvas {
      width: 100%; height: auto; display: block;
      pointer-events: none; /* Block right click on canvas */
    }
    .loading-text { color: rgba(255,255,255,0.6); padding: 40px; font-size: 14px; display: flex; align-items: center; gap: 10px; }
    .loader-spinner {
      border: 3px solid rgba(255,255,255,0.1); border-top-color: #56C1BC;
      border-radius: 50%; width: 24px; height: 24px; animation: spin 1s linear infinite;
    }
    @keyframes spin { to { transform: rotate(360deg); } }
    
    @media print { body { display: none !important; } }
  </style>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js"></script>
</head>
<body>
  <header>
    <button id="menu-btn" aria-label="Toggle document list">&#9776;</button>
    <img src="https://www.blackmontadvisory.com/assets/logo.png" alt="ABBASS" onerror="this.style.display='none'">
    <span class="title">${title}</span>
    <span class="badge">Information Memorandum</span>
    
    <div class="zoom-controls">
      <button id="btn-zoom-out" aria-label="Zoom Out">−</button>
      <span id="zoom-val">100%</span>
      <button id="btn-zoom-in" aria-label="Zoom In">+</button>
    </div>
  </header>
  <div id="main">
    <div id="overlay"></div>
    <div id="sidebar">
      <div class="label">Documents</div>
    </div>
    <div id="scroll-area"></div>
  </div>
  <script>
    pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';

    const docs = ${docsJson};
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('overlay');
    const scrollArea = document.getElementById('scroll-area');
    const menuBtn = document.getElementById('menu-btn');
    
    // Zoom state
    let zoomLevel = window.innerWidth >= 768 ? 50 : 100;
    const zoomVal = document.getElementById('zoom-val');
    function updateZoom(newZoom) {
      zoomLevel = Math.max(25, Math.min(newZoom, 400));
      document.documentElement.style.setProperty('--pdf-zoom', zoomLevel + '%');
      zoomVal.textContent = zoomLevel + '%';
    }
    // Initialize initial zoom display
    updateZoom(zoomLevel);
    
    document.getElementById('btn-zoom-in').onclick = () => updateZoom(zoomLevel + 25);
    document.getElementById('btn-zoom-out').onclick = () => updateZoom(zoomLevel - 25);

    // Sidebar toggles
    function openSidebar() { sidebar.classList.add('open'); overlay.classList.add('open'); }
    function closeSidebar() { sidebar.classList.remove('open'); overlay.classList.remove('open'); }
    menuBtn.addEventListener('click', () => sidebar.classList.contains('open') ? closeSidebar() : openSidebar());
    overlay.addEventListener('click', closeSidebar);

    function setActive(idx) {
      sidebar.querySelectorAll('button').forEach((b, i) => b.classList.toggle('active', i === idx));
    }

    // Lazy load observer
    const pageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const wrapper = entry.target;
          if (!wrapper.dataset.loaded) {
            wrapper.dataset.loaded = 'true';
            renderPage(wrapper.dataset.pdfId, wrapper.dataset.pageNum, wrapper);
          }
        }
      });
    }, { root: scrollArea, rootMargin: '800px 0px' });

    // Store loaded PDF documents
    const pdfDocs = {};

    async function loadAllDocuments() {
      scrollArea.innerHTML = '<div class="doc-container loading-text"><div class="loader-spinner"></div>Loading documents...</div>';
      
      const docContainers = [];
      
      for (let i = 0; i < docs.length; i++) {
        const doc = docs[i];
        try {
          // Fetch PDF as base64 JSON to bypass download managers (IDM etc.)
          const response = await fetch(doc.url);
          const json = await response.json();
          const binaryStr = atob(json.data);
          const bytes = new Uint8Array(binaryStr.length);
          for (let j = 0; j < binaryStr.length; j++) bytes[j] = binaryStr.charCodeAt(j);
          const loadingTask = pdfjsLib.getDocument({ data: bytes });
          const pdf = await loadingTask.promise;
          pdfDocs[doc.url] = pdf;
          
          // Get first page solely for aspect ratio
          const page1 = await pdf.getPage(1);
          const vp1 = page1.getViewport({ scale: 1.0 });
          const aspectRatio = (vp1.width / vp1.height).toFixed(4);
          
          const container = document.createElement('div');
          container.className = 'doc-container';
          container.id = 'doc-' + i;
          
          for (let p = 1; p <= pdf.numPages; p++) {
            const wrapper = document.createElement('div');
            wrapper.className = 'page-wrapper';
            wrapper.style.aspectRatio = aspectRatio;
            wrapper.dataset.pdfId = doc.url;
            wrapper.dataset.pageNum = p;
            
            if (p === 1 && i === 0) {
              // Priority render the very first page immediately
              wrapper.dataset.loaded = 'true';
              renderPage(doc.url, p, wrapper);
            } else {
              pageObserver.observe(wrapper);
            }
            container.appendChild(wrapper);
          }
          docContainers.push(container);
          
        } catch (e) {
          console.error("Failed loading PDF", doc.name, e);
        }
      }
      
      scrollArea.innerHTML = '';
      docContainers.forEach(c => scrollArea.appendChild(c));
      
      const docObserver = new IntersectionObserver((entries) => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            const idx = parseInt(e.target.id.replace('doc-', ''), 10);
            setActive(idx);
          }
        });
      }, { root: scrollArea, threshold: 0.1 });
      docContainers.forEach(c => docObserver.observe(c));
      setActive(0);
    }

    async function renderPage(pdfUrl, pageNum, wrapper) {
      const pdf = pdfDocs[pdfUrl];
      if (!pdf) return;
      try {
        const page = await pdf.getPage(parseInt(pageNum, 10));
        // High-DPI crisp render
        const viewport = page.getViewport({ scale: 3.0 });
        const canvas = document.createElement('canvas');
        canvas.width = viewport.width;
        canvas.height = viewport.height;
        canvas.className = 'pdf-canvas';
        
        await page.render({ canvasContext: canvas.getContext('2d'), viewport }).promise;
        wrapper.appendChild(canvas);
      } catch (e) {
        console.error('Error rendering page', pageNum, e);
      }
    }

    // Populate sidebar
    docs.forEach((doc, idx) => {
      const btn = document.createElement('button');
      btn.textContent = doc.name;
      btn.onclick = () => {
        const container = document.getElementById('doc-' + idx);
        if (container) container.scrollIntoView({ behavior: 'smooth' });
        setActive(idx);
        closeSidebar();
      };
      sidebar.appendChild(btn);
    });
    loadAllDocuments();

    // Drag-to-pan functionality
    let isDown = false;
    let startX, startY, scrollLeft, scrollTop;

    scrollArea.addEventListener('mousedown', (e) => {
      // Don't pan if clicking scrollbar or buttons
      if (e.target.tagName.toLowerCase() === 'button') return;
      isDown = true;
      scrollArea.classList.add('grabbing');
      startX = e.pageX - scrollArea.offsetLeft;
      startY = e.pageY - scrollArea.offsetTop;
      scrollLeft = scrollArea.scrollLeft;
      scrollTop = scrollArea.scrollTop;
    });

    window.addEventListener('mouseup', () => {
      isDown = false;
      scrollArea.classList.remove('grabbing');
    });

    window.addEventListener('mousemove', (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - scrollArea.offsetLeft;
      const y = e.pageY - scrollArea.offsetTop;
      const walkX = (x - startX) * 1.5; // Scroll speed multiplier
      const walkY = (y - startY) * 1.5;
      scrollArea.scrollLeft = scrollLeft - walkX;
      scrollArea.scrollTop = scrollTop - walkY;
    });

    // Aggressive security blocks
    document.addEventListener('contextmenu', e => e.preventDefault());
    document.addEventListener('copy', e => e.preventDefault());
    document.addEventListener('cut', e => e.preventDefault());
    document.addEventListener('dragstart', e => e.preventDefault());
    document.addEventListener('selectstart', e => e.preventDefault());
    document.addEventListener('keydown', e => {
      if ((e.ctrlKey || e.metaKey) && ['s','p','a','c'].includes(e.key.toLowerCase())) e.preventDefault();
      if (e.key === 'PrintScreen') e.preventDefault();
    });
  </script>
</body>
</html>`;
}

const createImViewedEmail = ({ prospectName, businessName, timeOpened, brokerEmail, accessDenied = false }) => {
  const subjectPrefix = accessDenied ? 'IM View Attempted' : 'IM Viewed';
  const accessBanner = accessDenied
    ? `<div style="background: #FFF3CD; border: 1px solid #FFECB5; border-radius: 6px; padding: 12px 16px; margin-bottom: 20px; text-align: center;">
        <p style="margin: 0; color: #856404; font-size: 13px;">This prospect attempted to view the IM but their access has been revoked or expired.</p>
      </div>`
    : '';

  return {
    from: formatFrom(process.env.EMAIL_FROM),
    email: brokerEmail,
    subject: `${subjectPrefix}: ${prospectName} (${businessName})`,
    text: `IM Viewed\n\nProspect: ${prospectName}\nBusiness: ${businessName}\nTime opened: ${timeOpened}\n\n— Blackmont Advisory\n(03) 9103 1317 • info@blackmontadvisory.com`,
    html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 20px; font-family: Arial, sans-serif; font-size: 14px; line-height: 1.6; color: #333; background: #f9f9f9;">
  <div style="max-width: 500px; margin: 0 auto; background: #fff; border-radius: 8px; box-shadow: 0 2px 12px rgba(0,0,0,0.08); padding: 32px 28px;">
    <h2 style="margin: 0 0 20px; color: #333; font-size: 18px;">IM Viewed</h2>
    
    ${accessBanner}

    <table style="width: 100%; border-collapse: collapse;">
      <tr>
        <td style="padding: 8px 0; color: #666; width: 120px; vertical-align: top;">Prospect:</td>
        <td style="padding: 8px 0; font-weight: bold;">${prospectName}</td>
      </tr>
      <tr>
        <td style="padding: 8px 0; color: #666; vertical-align: top;">Business:</td>
        <td style="padding: 8px 0; font-weight: bold;">${businessName}</td>
      </tr>
      <tr>
        <td style="padding: 8px 0; color: #666; vertical-align: top;">Time opened:</td>
        <td style="padding: 8px 0;">${timeOpened}</td>
      </tr>
    </table>

    <hr style="border: none; border-top: 1px solid #eee; margin: 24px 0 16px;">
    <p style="margin: 0; color: #999; font-size: 12px;">
      Blackmont Advisory<br/>
      (03) 9103 1317 &bull; info@blackmontadvisory.com
    </p>
  </div>
</body>
</html>
    `
  };
};

module.exports = {
  createAdminNotificationEmail,
  createCustomerApprovalEmail,
  createProposalAcceptanceEmail,
  viewImTemplate,
  createImViewedEmail
};
