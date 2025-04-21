// ===============================
// Art Quote of the Day Script
// ===============================

// Holds the selected quote object (used globally for sharing)
let quote = null;

// ===============================
// Fetch Quotes from JSON File
// ===============================
fetch('quotes.json')
  .then(response => response.json())
  .then(quotes => {
    // Get the current date as a unique string
    const today = new Date().toDateString();

    // Format the date for display (e.g., "Monday, March 25, 2025")
    const displayDate = new Date().toLocaleDateString(undefined, {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    // Inject the formatted date into the DOM
    document.querySelector('.quote-date').textContent = displayDate;

    // Create a hash from the date to select a quote
    const hash = [...today].reduce((sum, char) => sum + char.charCodeAt(0), 0);
    const index = hash % quotes.length;
    const quote = quotes[index];

    // Set main quote text
    document.querySelector('.quote-content').textContent = quote.content;

    // Set author image and name
    const authorImg = document.querySelector('.author-photo');
    authorImg.src = quote.AuthorImage;
    authorImg.alt = quote.author;
    document.querySelector('.author-name').textContent = quote.author;

    // Set author bio
    document.querySelector('.quote-bio').textContent = `- ${quote.bio}`;

    // Set artwork info
    document.querySelector('.quote-art-info').textContent = quote.artInfo || '';
    document.querySelector('.quote-medium').textContent = `Medium: ${quote.medium}`;
    document.querySelector('.quote-piece-year').textContent =
      quote.piece && quote.year
        ? `“${quote.piece}” (${quote.year})`
        : quote.piece
        ? `“${quote.piece}”`
        : '';

    // ✅ Set artwork image
    const img = document.querySelector('.quote-image');
    img.src = quote.ArtImage;
    img.alt = quote.author;

    // ✅ Display artist email if available
    const contactEl = document.querySelector('.quote-contact');
    if (quote.contact?.email) {
      contactEl.innerHTML = `Email: <a href="mailto:${quote.contact.email}">${quote.contact.email}</a>`;
    } else {
      contactEl.innerHTML = '';
    }
  })
  .catch(error => {
    console.error('Failed to load quotes:', error);
  });


// ===============================
// Share Button Functionality
// ===============================

// Get DOM references
const shareBtn = document.querySelector('.share-quote-btn');
const shareStatus = document.querySelector('.share-status');

// Add click event for the share button
shareBtn.addEventListener('click', () => {
  // Prevent action if quote hasn't loaded yet
  if (!quote) return;

  // Format quote for sharing
  const text = `"${quote.content}" — ${quote.author}`;

  // Try to use Web Share API if available (mobile-friendly)
  if (navigator.share) {
    navigator.share({
      title: 'Art Quote of the Day',
      text: text,
      url: window.location.href
    }).then(() => {
      shareStatus.textContent = 'Thanks for sharing!';
    }).catch(err => {
      shareStatus.textContent = 'Sharing canceled.';
    });

  // Fallback: copy quote to clipboard
  } else {
    navigator.clipboard.writeText(text)
      .then(() => {
        shareStatus.textContent = 'Quote copied to clipboard!';
      })
      .catch(() => {
        shareStatus.textContent = 'Failed to copy quote.';
      });
  }
});

/* {
  "content": "" ,
  "author": "",
  "ArtImage": "",
  "AuthorImage": "",
  "bio": "",
  "medium": "",
  "piece": "",
  "year": "",
  "artInfo": "",
  "contact": {
      "email": ""
  }
},*/