/**
 * CineSphere - Modern Cinema Web Application
 * Core Interactive Logic
 */

document.addEventListener('DOMContentLoaded', () => {
  // =========================================================================
  // 1. Data Store: Movies & Concessions
  // =========================================================================

  const moviesData = [
    {
      id: 'dune-2',
      title: 'Dune: Part Two',
      rating: '8.6',
      cert: 'PG-13',
      duration: '2h 46m',
      formats: ['IMAX 3D', 'DOLBY ATMOS'],
      genres: ['Sci-Fi', 'Adventure', 'Action'],
      status: 'now-showing',
      isImax: true,
      synopsis: 'Paul Atreides unites with Chani and the Fremen while seeking revenge against the conspirators who destroyed his family, facing a choice between the love of his life and the fate of the universe.',
      poster: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=800&q=80',
      backdrop: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1920&q=80',
      trailerUrl: 'https://www.youtube.com/embed/Way9Dexny3w',
      showtimes: ['13:15', '16:30', '19:45', '22:30'],
      auditorium: 'Auditorium 1 (IMAX Laser)'
    },
    {
      id: 'spiderman-homecoming',
      title: 'Spider-Man: Homecoming',
      rating: '7.4',
      cert: 'PG-13',
      duration: '2h 13m',
      formats: ['IMAX 3D', 'DOLBY ATMOS', '4DX'],
      genres: ['Action', 'Adventure', 'Sci-Fi'],
      status: 'now-showing',
      isImax: true,
      synopsis: 'Peter Parker balances his life as an ordinary high school student in Queens with his superhero alter-ego Spider-Man, and finds himself on the trail of a new menace, the Vulture, prowling the skies of New York City.',
      poster: 'https://images.unsplash.com/photo-1635805737707-575885ab0820?auto=format&fit=crop&w=800&q=80',
      backdrop: 'https://images.unsplash.com/photo-1604200213928-ba3cf4fc8436?auto=format&fit=crop&w=1920&q=80',
      trailerUrl: 'https://www.youtube.com/embed/n9DwoQ7HWvI',
      showtimes: ['13:00', '16:15', '19:30', '22:45'],
      auditorium: 'Auditorium 4 (IMAX 3D)'
    },
    {
      id: 'oppenheimer',
      title: 'Oppenheimer',
      rating: '8.9',
      cert: 'R',
      duration: '3h 00m',
      formats: ['70MM IMAX', 'DOLBY CINEMA'],
      genres: ['Biography', 'Drama', 'History'],
      status: 'now-showing',
      isImax: true,
      synopsis: 'The story of American scientist J. Robert Oppenheimer and his role in the development of the atomic bomb during the Manhattan Project, exploring the moral weight of world-changing invention.',
      poster: 'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?auto=format&fit=crop&w=800&q=80',
      backdrop: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1920&q=80',
      trailerUrl: 'https://www.youtube.com/embed/uYPbbksJxIg',
      showtimes: ['14:00', '17:45', '21:15'],
      auditorium: 'Auditorium 2 (70mm Large Format)'
    },
    {
      id: 'interstellar',
      title: 'Interstellar (IMAX Special)',
      rating: '8.7',
      cert: 'PG-13',
      duration: '2h 49m',
      formats: ['IMAX LASER', 'DOLBY ATMOS'],
      genres: ['Sci-Fi', 'Adventure', 'Drama'],
      status: 'now-showing',
      isImax: true,
      synopsis: 'When Earth becomes uninhabitable in the future, a farmer and ex-NASA pilot, Joseph Cooper, is tasked to pilot a spacecraft, along with a team of researchers, to find a new planet for humans.',
      poster: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&w=800&q=80',
      backdrop: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=1920&q=80',
      trailerUrl: 'https://www.youtube.com/embed/zSWdZVtXT7E',
      showtimes: ['12:30', '15:45', '19:00', '22:15'],
      auditorium: 'Auditorium 1 (IMAX Laser)'
    },
    {
      id: 'cyberpunk-neon',
      title: 'Neon Odyssey: 2099',
      rating: '8.4',
      cert: 'R',
      duration: '2h 18m',
      formats: ['4DX MOTION', '3D SURROUND'],
      genres: ['Action', 'Sci-Fi', 'Thriller'],
      status: 'now-showing',
      isImax: false,
      synopsis: 'In a rain-drenched megacity ruled by rogue AI syndicates, an augmented detective uncovers a digital conspiracy threatening to wipe humanity’s collective memories.',
      poster: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=800&q=80',
      backdrop: 'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?auto=format&fit=crop&w=1920&q=80',
      trailerUrl: 'https://www.youtube.com/embed/Way9Dexny3w',
      showtimes: ['15:00', '18:15', '21:00', '23:45'],
      auditorium: 'Auditorium 3 (4DX Multisensory)'
    },
    {
      id: 'spider-verse',
      title: 'Spider-Verse: Beyond',
      rating: '8.8',
      cert: 'PG',
      duration: '2h 20m',
      formats: ['IMAX 3D', 'DOLBY ATMOS'],
      genres: ['Animation', 'Action', 'Adventure'],
      status: 'coming-soon',
      isImax: true,
      synopsis: 'Miles Morales catapults across the Multiverse once more to reunite with Gwen Stacy and a formidable league of Spider-Heroes fighting for the survival of every dimension.',
      poster: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=800&q=80',
      backdrop: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1920&q=80',
      trailerUrl: 'https://www.youtube.com/embed/cqGjhVJWtEg',
      showtimes: ['Premiere Nov 14', 'Adv. Tickets'],
      auditorium: 'Grand Horizon IMAX'
    },
    {
      id: 'batman-part-2',
      title: 'The Batman: Part II',
      rating: '8.5',
      cert: 'PG-13',
      duration: '2h 55m',
      formats: ['DOLBY VISION', 'IMAX'],
      genres: ['Action', 'Crime', 'Drama'],
      status: 'coming-soon',
      isImax: true,
      synopsis: 'The Dark Knight delves deeper into the submerged criminal underworld of Gotham City as a ruthless new mastermind begins systematically destabilizing city infrastructure.',
      poster: 'https://images.unsplash.com/photo-1509248961158-e54f6934749c?auto=format&fit=crop&w=800&q=80',
      backdrop: 'https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?auto=format&fit=crop&w=1920&q=80',
      trailerUrl: 'https://www.youtube.com/embed/mqqft2x_Aa4',
      showtimes: ['Premiere Dec 05', 'Adv. Tickets'],
      auditorium: 'Auditorium 1 (IMAX Laser)'
    }
  ];

  const concessionsData = [
    {
      id: 'snack-popcorn-combo',
      name: 'Truffle Butter Popcorn Combo',
      desc: 'Large warm artisanal popped corn infused with white truffle butter + two large fountain beverages.',
      price: 14.50,
      image: 'https://images.unsplash.com/photo-1578849278619-e73505e9610f?auto=format&fit=crop&w=600&q=80',
      tag: 'Best Seller'
    },
    {
      id: 'snack-nachos',
      name: 'Artisan Loaded Nachos',
      desc: 'Crispy stone-ground tortilla chips smothered with warm jalapeño queso, guacamole, and roasted salsa.',
      price: 11.00,
      image: 'https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?auto=format&fit=crop&w=600&q=80',
      tag: 'Hot & Fresh'
    },
    {
      id: 'snack-soda',
      name: 'Craft Botanical Soda Duo',
      desc: 'Choice of artisan Wild Cherry Vanilla, Blood Orange Fizz, or Craft Spiced Root Beer on tap.',
      price: 6.50,
      image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=600&q=80',
      tag: 'Ice Cold'
    },
    {
      id: 'snack-icecream',
      name: 'Gourmet Churros & Dip',
      desc: 'Freshly fried Spanish cinnamon sugar churro bites served with warm dulce de leche and dark chocolate dip.',
      price: 8.50,
      image: 'https://images.unsplash.com/photo-1624300629298-e9de39c13be5?auto=format&fit=crop&w=600&q=80',
      tag: 'Sweet Treat'
    }
  ];

  // Pricing Model
  const SEAT_PRICES = {
    standard: 12.50,
    premium: 16.00,
    vip: 22.00
  };

  // =========================================================================
  // 2. State Management
  // =========================================================================

  let currentHeroIndex = 0;
  let activeFilter = 'all';
  let searchQuery = '';
  let selectedDateString = '';
  let selectedCinemaLocation = 'Grand Horizon IMAX - Downtown';

  // Booking Modal State
  let currentBookingMovie = null;
  let currentBookingShowtime = '19:30';
  let selectedSeats = []; // e.g. [{ row: 'E', num: 6, tier: 'premium', price: 16.00 }]
  let bookedSnacks = {};  // snackId -> quantity

  // Occupied seats cache per movie ID to feel realistic
  const occupiedSeatsCache = {
    'dune-2': ['A3', 'A4', 'C5', 'C6', 'C7', 'E3', 'E4', 'F6', 'F7'],
    'spiderman-homecoming': ['A4', 'B5', 'C4', 'C5', 'D6', 'E5', 'E6', 'F4', 'G6'],
    'oppenheimer': ['B2', 'B3', 'D4', 'D5', 'E8', 'E9', 'G5', 'G6'],
    'interstellar': ['C3', 'C4', 'D7', 'D8', 'F4', 'F5', 'G7'],
    'cyberpunk-neon': ['A5', 'B6', 'D2', 'D3', 'E5']
  };

  // =========================================================================
  // 3. Elements Selection
  // =========================================================================

  const navbar = document.getElementById('navbar');
  const locationSelect = document.getElementById('locationSelect');
  const movieSearch = document.getElementById('movieSearch');
  const clearSearch = document.getElementById('clearSearch');
  const quickBookBtn = document.getElementById('quickBookBtn');
  const mobileToggle = document.getElementById('mobileToggle');
  const mobileMenu = document.getElementById('mobileMenu');

  // Hero Elements
  const heroBackdrop = document.getElementById('heroBackdrop');
  const heroTitle = document.getElementById('heroTitle');
  const heroSynopsis = document.getElementById('heroSynopsis');
  const heroGenres = document.getElementById('heroGenres');
  const heroCert = document.getElementById('heroCert');
  const heroDuration = document.getElementById('heroDuration');
  const heroBookBtn = document.getElementById('heroBookBtn');
  const heroTrailerBtn = document.getElementById('heroTrailerBtn');
  const heroThumbnails = document.getElementById('heroThumbnails');

  // Movie Catalog Elements
  const categoryTabs = document.getElementById('categoryTabs');
  const datePills = document.getElementById('datePills');
  const moviesGrid = document.getElementById('moviesGrid');
  const noResults = document.getElementById('noResults');
  const resetFiltersBtn = document.getElementById('resetFiltersBtn');

  // Concessions & Membership
  const concessionsGrid = document.getElementById('concessionsGrid');
  const joinVipBtn = document.getElementById('joinVipBtn');

  // Booking Modal Elements
  const bookingModal = document.getElementById('bookingModal');
  const closeBookingModal = document.getElementById('closeBookingModal');
  const modalMoviePoster = document.getElementById('modalMoviePoster');
  const modalMovieFormat = document.getElementById('modalMovieFormat');
  const modalMovieCert = document.getElementById('modalMovieCert');
  const modalMovieTitle = document.getElementById('modalMovieTitle');
  const modalSelectedDate = document.getElementById('modalSelectedDate');
  const modalSelectedTime = document.getElementById('modalSelectedTime');
  const modalAuditorium = document.getElementById('modalAuditorium');
  const seatsMatrix = document.getElementById('seatsMatrix');
  const bookingSnacksList = document.getElementById('bookingSnacksList');
  const selectedSeatsDisplay = document.getElementById('selectedSeatsDisplay');
  const totalPriceDisplay = document.getElementById('totalPriceDisplay');
  const confirmBookingBtn = document.getElementById('confirmBookingBtn');

  // Ticket Modal Elements
  const ticketModal = document.getElementById('ticketModal');
  const closeTicketModal = document.getElementById('closeTicketModal');
  const ticketMovieImg = document.getElementById('ticketMovieImg');
  const ticketMovieTitle = document.getElementById('ticketMovieTitle');
  const ticketExperienceBadge = document.getElementById('ticketExperienceBadge');
  const ticketLocation = document.getElementById('ticketLocation');
  const ticketAuditorium = document.getElementById('ticketAuditorium');
  const ticketDate = document.getElementById('ticketDate');
  const ticketTime = document.getElementById('ticketTime');
  const ticketSeats = document.getElementById('ticketSeats');
  const ticketConcessions = document.getElementById('ticketConcessions');
  const ticketCode = document.getElementById('ticketCode');
  const printTicketBtn = document.getElementById('printTicketBtn');
  const newBookingBtn = document.getElementById('newBookingBtn');

  // Trailer Modal
  const trailerModal = document.getElementById('trailerModal');
  const closeTrailerModal = document.getElementById('closeTrailerModal');
  const trailerIframe = document.getElementById('trailerIframe');
  const trailerTitle = document.getElementById('trailerTitle');
  const trailerDescription = document.getElementById('trailerDescription');

  // Toast
  const toast = document.getElementById('toast');
  const toastMessage = document.getElementById('toastMessage');

  // =========================================================================
  // 4. Hero Carousel
  // =========================================================================

  function renderHeroThumbnails() {
    heroThumbnails.innerHTML = '';
    moviesData.slice(0, 5).forEach((movie, idx) => {
      const thumb = document.createElement('div');
      thumb.className = `hero-thumb ${idx === currentHeroIndex ? 'active' : ''}`;
      thumb.innerHTML = `<img src="${movie.poster}" alt="${movie.title}">`;
      thumb.addEventListener('click', () => {
        setHeroMovie(idx);
      });
      heroThumbnails.appendChild(thumb);
    });
  }

  function setHeroMovie(index) {
    currentHeroIndex = index;
    const movie = moviesData[index];
    if (!movie) return;

    // Visual transition
    heroBackdrop.style.opacity = '0.4';
    setTimeout(() => {
      heroBackdrop.style.backgroundImage = `url('${movie.backdrop}')`;
      heroBackdrop.style.opacity = '1';
    }, 200);

    heroTitle.textContent = movie.title;
    heroSynopsis.textContent = movie.synopsis;
    heroCert.textContent = movie.cert;
    heroDuration.textContent = movie.duration;

    heroGenres.innerHTML = movie.genres.map(g => `<span class="genre-pill">${g}</span>`).join('');

    // Update active thumb
    document.querySelectorAll('.hero-thumb').forEach((thumb, i) => {
      thumb.classList.toggle('active', i === index);
    });

    // Update Hero actions
    heroBookBtn.onclick = () => openBookingForMovie(movie, movie.showtimes[0] || '19:30');
    heroTrailerBtn.onclick = () => openTrailerModal(movie);
  }

  // Auto-advance hero every 8s
  let heroInterval = setInterval(() => {
    const featuredCount = Math.min(moviesData.length, 5);
    const nextIdx = (currentHeroIndex + 1) % featuredCount;
    setHeroMovie(nextIdx);
  }, 8000);

  // =========================================================================
  // 5. Date Selector
  // =========================================================================

  function initDates() {
    datePills.innerHTML = '';
    const today = new Date();
    const days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    for (let i = 0; i < 7; i++) {
      const d = new Date();
      d.setDate(today.getDate() + i);

      const pill = document.createElement('button');
      pill.className = `date-pill ${i === 0 ? 'active' : ''}`;

      let dayText = days[d.getDay()];
      if (i === 0) dayText = 'TODAY';
      else if (i === 1) dayText = 'TMRW';

      const fullFormatted = `${days[d.getDay()]}, ${months[d.getMonth()]} ${d.getDate()}`;
      if (i === 0) selectedDateString = fullFormatted;

      pill.innerHTML = `
        <span class="date-day">${dayText}</span>
        <span class="date-num">${d.getDate()}</span>
      `;

      pill.addEventListener('click', () => {
        document.querySelectorAll('.date-pill').forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        selectedDateString = fullFormatted;
        showToast(`Selected date: ${selectedDateString}`);
      });

      datePills.appendChild(pill);
    }
  }

  // =========================================================================
  // 6. Movie Catalog Grid Rendering & Filtering
  // =========================================================================

  function renderMoviesGrid() {
    const filtered = moviesData.filter(movie => {
      // Category filter
      let matchFilter = true;
      if (activeFilter === 'now-showing') matchFilter = (movie.status === 'now-showing');
      else if (activeFilter === 'coming-soon') matchFilter = (movie.status === 'coming-soon');
      else if (activeFilter === 'imax') matchFilter = movie.isImax;

      // Search query
      let matchSearch = true;
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase();
        matchSearch = movie.title.toLowerCase().includes(q) ||
                      movie.genres.some(g => g.toLowerCase().includes(q)) ||
                      movie.synopsis.toLowerCase().includes(q);
      }

      return matchFilter && matchSearch;
    });

    if (filtered.length === 0) {
      moviesGrid.innerHTML = '';
      noResults.style.display = 'block';
      return;
    }

    noResults.style.display = 'none';
    moviesGrid.innerHTML = filtered.map(movie => {
      const isComingSoon = movie.status === 'coming-soon';
      
      const showtimeButtons = movie.showtimes.map(st => {
        if (isComingSoon) {
          return `<span class="showtime-chip">${st}</span>`;
        }
        return `
          <button class="showtime-chip" onclick="window.bookMovieShowtime('${movie.id}', '${st}')">
            ${st}
          </button>
        `;
      }).join('');

      return `
        <div class="movie-card">
          <div class="movie-poster-wrapper">
            <img src="${movie.poster}" alt="${movie.title}" loading="lazy">
            <div class="poster-badges">
              <span class="format-badge highlight">${movie.formats[0]}</span>
              <span class="rating-badge">★ ${movie.rating}</span>
            </div>
            <div class="poster-overlay-btn" onclick="window.viewTrailerById('${movie.id}')">
              <span class="play-circle">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <polygon points="5 3 19 12 5 21 5 3"></polygon>
                </svg>
              </span>
            </div>
          </div>

          <div class="movie-details">
            <div class="movie-tags">
              ${movie.genres.slice(0, 2).map(g => `<span>#${g}</span>`).join(' ')}
            </div>
            <h3 class="movie-name">${movie.title}</h3>
            <div class="movie-short-info">
              <span class="cert-badge">${movie.cert}</span>
              <span>&bull;</span>
              <span>${movie.duration}</span>
            </div>

            <div class="showtimes-box">
              <span class="showtimes-label">${isComingSoon ? 'Release Schedule' : 'Today\'s Showtimes'}</span>
              <div class="showtime-chips">
                ${showtimeButtons}
              </div>
            </div>
          </div>
        </div>
      `;
    }).join('');
  }

  // =========================================================================
  // 7. Concessions Showcase
  // =========================================================================

  function renderConcessions() {
    concessionsGrid.innerHTML = concessionsData.map(item => `
      <div class="snack-card">
        <div class="snack-img">
          <img src="${item.image}" alt="${item.name}" loading="lazy">
          <span class="snack-tag">${item.tag}</span>
        </div>
        <div class="snack-info">
          <div class="snack-header">
            <h4 class="snack-title">${item.name}</h4>
            <span class="snack-price">$${item.price.toFixed(2)}</span>
          </div>
          <p class="snack-desc">${item.desc}</p>
          <div class="snack-action">
            <button class="btn btn-outline" style="width: 100%;" onclick="window.quickAddSnack('${item.name}')">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <line x1="5" y1="12" x2="19" y2="12"></line>
              </svg>
              Pre-Order With Ticket
            </button>
          </div>
        </div>
      </div>
    `).join('');
  }

  // =========================================================================
  // 8. Seating Matrix & Reservation Logic
  // =========================================================================

  function renderSeatsMatrix(movieId) {
    seatsMatrix.innerHTML = '';
    selectedSeats = [];
    bookedSnacks = {};

    const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
    const occupiedList = occupiedSeatsCache[movieId] || ['B3', 'C4', 'D5', 'F6'];

    rows.forEach(rowLetter => {
      const rowDiv = document.createElement('div');
      rowDiv.className = 'seat-row';

      // Left Row label
      const leftLabel = document.createElement('span');
      leftLabel.className = 'row-label';
      leftLabel.textContent = rowLetter;
      rowDiv.appendChild(leftLabel);

      const itemsDiv = document.createElement('div');
      itemsDiv.className = 'seat-grid-items';

      // Determine tier for this row
      let tier = 'standard';
      if (['C', 'D', 'E'].includes(rowLetter)) tier = 'premium';
      if (['F', 'G'].includes(rowLetter)) tier = 'vip';

      for (let num = 1; num <= 10; num++) {
        // Add an aisle gap between seat 2 and 3, and between 8 and 9
        if (num === 3 || num === 9) {
          const gap = document.createElement('div');
          gap.className = 'seat-gap';
          itemsDiv.appendChild(gap);
        }

        const seatId = `${rowLetter}${num}`;
        const isOccupied = occupiedList.includes(seatId);

        const seatBtn = document.createElement('button');
        seatBtn.className = `seat ${tier} ${isOccupied ? 'occupied' : ''}`;
        seatBtn.dataset.seatId = seatId;
        seatBtn.dataset.tier = tier;
        seatBtn.dataset.price = SEAT_PRICES[tier];
        seatBtn.setAttribute('title', `${seatId} - ${tier.toUpperCase()} ($${SEAT_PRICES[tier].toFixed(2)})`);
        seatBtn.textContent = num;

        if (!isOccupied) {
          seatBtn.addEventListener('click', () => toggleSeatSelection(seatBtn, seatId, tier, SEAT_PRICES[tier]));
        }

        itemsDiv.appendChild(seatBtn);
      }

      rowDiv.appendChild(itemsDiv);

      // Right Row label
      const rightLabel = document.createElement('span');
      rightLabel.className = 'row-label';
      rightLabel.textContent = rowLetter;
      rowDiv.appendChild(rightLabel);

      seatsMatrix.appendChild(rowDiv);
    });

    renderBookingSnacks();
    updateBookingTotals();
  }

  function toggleSeatSelection(btn, seatId, tier, price) {
    const existingIndex = selectedSeats.findIndex(s => s.id === seatId);

    if (existingIndex > -1) {
      selectedSeats.splice(existingIndex, 1);
      btn.classList.remove('selected');
    } else {
      if (selectedSeats.length >= 8) {
        showToast('Maximum 8 seats per booking session');
        return;
      }
      selectedSeats.push({ id: seatId, tier, price });
      btn.classList.add('selected');
    }

    updateBookingTotals();
  }

  function renderBookingSnacks() {
    bookingSnacksList.innerHTML = concessionsData.map(item => `
      <div class="booking-snack-item">
        <div class="booking-snack-info">
          <h5>${item.name}</h5>
          <span>$${item.price.toFixed(2)}</span>
        </div>
        <div class="counter-box">
          <button class="counter-btn" onclick="window.updateSnackCount('${item.id}', -1)">&minus;</button>
          <span class="counter-value" id="snack-count-${item.id}">0</span>
          <button class="counter-btn" onclick="window.updateSnackCount('${item.id}', 1)">&#43;</button>
        </div>
      </div>
    `).join('');
  }

  window.updateSnackCount = function(snackId, change) {
    const current = bookedSnacks[snackId] || 0;
    const nextVal = Math.max(0, current + change);
    bookedSnacks[snackId] = nextVal;

    const countElem = document.getElementById(`snack-count-${snackId}`);
    if (countElem) {
      countElem.textContent = nextVal;
    }
    updateBookingTotals();
  };

  function updateBookingTotals() {
    // Seats total
    const seatsTotal = selectedSeats.reduce((sum, seat) => sum + seat.price, 0);

    // Snacks total
    let snacksTotal = 0;
    for (const [snackId, qty] of Object.entries(bookedSnacks)) {
      if (qty > 0) {
        const item = concessionsData.find(c => c.id === snackId);
        if (item) snacksTotal += item.price * qty;
      }
    }

    const grandTotal = seatsTotal + snacksTotal;

    // Display updates
    if (selectedSeats.length === 0) {
      selectedSeatsDisplay.textContent = 'None';
      confirmBookingBtn.disabled = true;
    } else {
      selectedSeatsDisplay.textContent = selectedSeats.map(s => s.id).join(', ');
      confirmBookingBtn.disabled = false;
    }

    totalPriceDisplay.textContent = `$${grandTotal.toFixed(2)}`;
  }

  // =========================================================================
  // 9. Booking Modal Handlers
  // =========================================================================

  function openBookingForMovie(movie, showtime = '19:30') {
    if (movie.status === 'coming-soon') {
      showToast(`Tickets for "${movie.title}" will open 2 weeks prior to premiere.`);
      return;
    }

    currentBookingMovie = movie;
    currentBookingShowtime = showtime;

    modalMoviePoster.src = movie.poster;
    modalMovieTitle.textContent = movie.title;
    modalMovieFormat.textContent = movie.formats[0] || 'IMAX 3D';
    modalMovieCert.textContent = movie.cert;
    modalSelectedDate.textContent = selectedDateString || 'Today';
    modalSelectedTime.textContent = showtime;
    modalAuditorium.textContent = movie.auditorium;

    renderSeatsMatrix(movie.id);

    bookingModal.classList.add('open');
    bookingModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeBooking() {
    bookingModal.classList.remove('open');
    bookingModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  closeBookingModal.addEventListener('click', closeBooking);

  // Global helper for card showtime clicks
  window.bookMovieShowtime = function(movieId, time) {
    const movie = moviesData.find(m => m.id === movieId);
    if (movie) {
      openBookingForMovie(movie, time);
    }
  };

  // Quick book top movie
  quickBookBtn.addEventListener('click', () => {
    const firstNowShowing = moviesData.find(m => m.status === 'now-showing');
    if (firstNowShowing) {
      openBookingForMovie(firstNowShowing, firstNowShowing.showtimes[0]);
    }
  });

  // =========================================================================
  // 10. E-Ticket Pass Generation & Checkout
  // =========================================================================

  confirmBookingBtn.addEventListener('click', () => {
    if (selectedSeats.length === 0) return;

    // Generate random Ticket Reference code
    const randomCode = 'CS-' + Math.floor(1000 + Math.random() * 9000) + '-' + Math.floor(100 + Math.random() * 900);
    
    ticketMovieImg.src = currentBookingMovie.backdrop;
    ticketMovieTitle.textContent = currentBookingMovie.title;
    ticketExperienceBadge.textContent = currentBookingMovie.formats[0];
    ticketLocation.textContent = locationSelect.value;
    ticketAuditorium.textContent = currentBookingMovie.auditorium;
    ticketDate.textContent = selectedDateString;
    ticketTime.textContent = currentBookingShowtime;
    ticketSeats.textContent = selectedSeats.map(s => s.id).join(', ');
    ticketCode.textContent = randomCode;

    // Concessions summary
    const snackEntries = Object.entries(bookedSnacks).filter(([_, qty]) => qty > 0);
    if (snackEntries.length > 0) {
      const snacksSummary = snackEntries.map(([id, qty]) => {
        const item = concessionsData.find(c => c.id === id);
        return `${qty}x ${item ? item.name : ''}`;
      }).join(', ');
      ticketConcessions.textContent = snacksSummary;
    } else {
      ticketConcessions.textContent = 'None';
    }

    // Close booking modal and show ticket modal
    closeBooking();
    ticketModal.classList.add('open');
    ticketModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    showToast('🎉 Booking Confirmed! Your digital boarding pass is ready.');
  });

  function closeTicket() {
    ticketModal.classList.remove('open');
    ticketModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  closeTicketModal.addEventListener('click', closeTicket);
  newBookingBtn.addEventListener('click', () => {
    closeTicket();
    document.getElementById('movies').scrollIntoView({ behavior: 'smooth' });
  });

  printTicketBtn.addEventListener('click', () => {
    window.print();
  });

  // =========================================================================
  // 11. Trailer Modal Controller
  // =========================================================================

  function openTrailerModal(movie) {
    trailerIframe.src = `${movie.trailerUrl}?autoplay=1`;
    trailerTitle.textContent = `${movie.title} - Official Trailer`;
    trailerDescription.textContent = movie.synopsis;

    trailerModal.classList.add('open');
    trailerModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeTrailer() {
    trailerIframe.src = '';
    trailerModal.classList.remove('open');
    trailerModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  closeTrailerModal.addEventListener('click', closeTrailer);

  window.viewTrailerById = function(movieId) {
    const movie = moviesData.find(m => m.id === movieId);
    if (movie) openTrailerModal(movie);
  };

  // Close modals on clicking backdrop
  [bookingModal, ticketModal, trailerModal].forEach(modal => {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        if (modal === trailerModal) closeTrailer();
        else if (modal === bookingModal) closeBooking();
        else if (modal === ticketModal) closeTicket();
      }
    });
  });

  // Escape key closes modals
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (trailerModal.classList.contains('open')) closeTrailer();
      if (bookingModal.classList.contains('open')) closeBooking();
      if (ticketModal.classList.contains('open')) closeTicket();
    }
  });

  // =========================================================================
  // 12. Category Tabs & Search Listeners
  // =========================================================================

  categoryTabs.addEventListener('click', (e) => {
    const btn = e.target.closest('.tab-btn');
    if (!btn) return;

    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    activeFilter = btn.dataset.filter;
    renderMoviesGrid();
  });

  movieSearch.addEventListener('input', (e) => {
    searchQuery = e.target.value;
    clearSearch.style.display = searchQuery ? 'block' : 'none';
    renderMoviesGrid();
  });

  clearSearch.addEventListener('click', () => {
    movieSearch.value = '';
    searchQuery = '';
    clearSearch.style.display = 'none';
    renderMoviesGrid();
  });

  resetFiltersBtn.addEventListener('click', () => {
    searchQuery = '';
    movieSearch.value = '';
    clearSearch.style.display = 'none';
    activeFilter = 'all';
    document.querySelectorAll('.tab-btn').forEach((b, i) => b.classList.toggle('active', i === 0));
    renderMoviesGrid();
  });

  locationSelect.addEventListener('change', (e) => {
    selectedCinemaLocation = e.target.value;
    showToast(`Cinema changed to: ${selectedCinemaLocation}`);
  });

  // Quick Add Snack from Menu
  window.quickAddSnack = function(snackName) {
    showToast(`Added ${snackName} to pre-orders. Choose your seats to checkout!`);
    const firstMovie = moviesData[0];
    openBookingForMovie(firstMovie, firstMovie.showtimes[0]);
  };

  // Membership Club CTA
  joinVipBtn.addEventListener('click', () => {
    showToast('🌟 VIP Elite Pass activated! Enjoy 2 free monthly passes and concessions discounts.');
  });

  // Newsletter
  window.subscribeNewsletter = function() {
    const input = document.getElementById('newsletterEmail');
    if (input && input.value) {
      showToast(`Thank you! 15% discount voucher sent to ${input.value}`);
      input.value = '';
    }
  };

  // Mobile menu toggle
  mobileToggle.addEventListener('click', () => {
    mobileMenu.classList.toggle('open');
  });

  document.querySelectorAll('.mobile-link').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
    });
  });

  // Scroll effect on header
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // Toast helper
  let toastTimer;
  function showToast(msg) {
    toastMessage.textContent = msg;
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toast.classList.remove('show');
    }, 3800);
  }

  // =========================================================================
  // 13. Initialization
  // =========================================================================
  renderHeroThumbnails();
  setHeroMovie(0);
  initDates();
  renderMoviesGrid();
  renderConcessions();
});
