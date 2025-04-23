// ===============================
// Art Quote of the Day Script
// ===============================

let quote = null;

fetch('quotes.json')
  .then(response => response.json())
  .then(quotes => {
    /* // ✅ Replace this with any date you want to test
    const testDate = new Date('2025-03-21'); // 👈 change date here

    const today = testDate.toDateString();

    const displayDate = testDate.toLocaleDateString(undefined, {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });*/
    const today = new Date().toDateString();
    const displayDate = new Date().toLocaleDateString(undefined, {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    document.querySelector('.quote-date').textContent = displayDate;

    const hash = [...today].reduce((sum, char) => sum + char.charCodeAt(0), 0);
    const index = hash % quotes.length;
    quote = quotes[index];

    //quote/statment
    const contentEl = document.querySelector('.quote-content');
    if (quote.content) {
      contentEl.textContent = `Statment: ${quote.content}`;
      contentEl.style.display = 'block';
    } else {
      contentEl.style.display = 'none';
    }

    // Author image and name
    const authorImg = document.querySelector('.author-photo');
    authorImg.src = quote.AuthorImage;
    authorImg.alt = quote.author;
    document.querySelector('.author-name').textContent = quote.author;

    // Author bio
    const bio = document.querySelector('.quote-bio');
    bio.textContent = quote.bio ? `Bio: ${quote.bio}` : '';
    bio.style.display = quote.bio ? 'block' : 'none';

    // Artwork image
    const img = document.querySelector('.quote-image');
    img.src = quote.ArtImage;
    img.alt = quote.author;

    // Medium
    const mediumEl = document.querySelector('.quote-medium');
    if (quote.medium) {
      mediumEl.textContent = `Medium: ${quote.medium}`;
      mediumEl.style.display = 'inline-block';
    } else {
      mediumEl.style.display = 'none';
    }

    // Piece and year
    const pieceYearEl = document.querySelector('.quote-piece-year');
    if (quote.piece && quote.year) {
      pieceYearEl.textContent = `Artwork: “${quote.piece}” (${quote.year})`;
      pieceYearEl.style.display = 'inline-block';
    } else if (quote.piece) {
      pieceYearEl.textContent = `Artwork: “${quote.piece}”`;
      pieceYearEl.style.display = 'inline-block';
    } else {
      pieceYearEl.style.display = 'none';
    }

    // Art info
    const artInfoEl = document.querySelector('.quote-art-info');
    if (quote.artInfo) {
      artInfoEl.textContent = `Artwork info: ${quote.artInfo}`;
      artInfoEl.style.display = 'block';
    } else {
      artInfoEl.style.display = 'none';
    }

    // ✅ Contact: Email + Website
    const contactEl = document.querySelector('.quote-contact');
    let contactHTML = '';

    if (quote.contact?.email) {
      contactHTML += `Email: <a href="mailto:${quote.contact.email}">${quote.contact.email}</a>`;
    }

    if (quote.contact?.website || quote.contact?.Website) {
      const website = quote.contact.website || quote.contact.Website;
      if (contactHTML) contactHTML += ' | ';
      contactHTML += `Website: <a href="${website}" target="_blank">${website}</a>`;
    }

    contactEl.innerHTML = contactHTML;
    contactEl.style.display = contactHTML ? 'block' : 'none';

  })
  .catch(error => {
    console.error('Failed to load quotes:', error);
  });


// ===============================
// Share Button Functionality
// ===============================
const shareBtn = document.querySelector('.share-quote-btn');
const shareStatus = document.querySelector('.share-status');

shareBtn.addEventListener('click', () => {
  if (!quote) return;

  const text = `"${quote.content}" — ${quote.author}`;

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

// ===============================
// Scroll-based fade-in animation
// ===============================
const observerOptions = {
  threshold: 0.1
};

const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('fade-in');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

document.querySelectorAll('.quote-image-section, .quote-text-section').forEach(section => {
  section.classList.add('fade-init');
  observer.observe(section);
});