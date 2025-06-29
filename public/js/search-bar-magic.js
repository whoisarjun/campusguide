// Enhanced facility search with fuzzy matching and visual feedback
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('facilitySearch');
    const facilityCards = document.querySelectorAll('.regular-facility');
    const noResultsMessage = document.getElementById('noResultsMessage');
    const halo = searchInput.closest('.ai-halo');

    // Create searchable data for each facility
    const facilityData = Array.from(facilityCards).map(card => {
        const title = card.querySelector('h1').textContent;
        const description = card.querySelector('p').textContent;
        const badge = card.querySelector('.badge').textContent;

        return {
            element: card,
            title: title,
            description: description,
            badge: badge
        };
    });

    // Initialize Fuse.js for fuzzy search
    const fuseOptions = {
        keys: [
            { name: 'title', weight: 0.5 },
            { name: 'description', weight: 0.3 },
            { name: 'badge', weight: 0.2 }
        ],
        threshold: 0.4,
        includeScore: true,
        minMatchCharLength: 2,
        ignoreLocation: true
    };

    const fuse = new Fuse(facilityData, fuseOptions);

    function performSearch(query) {
        // Clear previous search state
        facilityCards.forEach(card => {
            card.style.display = 'block';
            card.classList.remove('search-hidden');
        });

        // Hide no result message
        if (noResultsMessage) {
            noResultsMessage.style.display = 'none';
            noResultsMessage.classList.remove('show');
        }

        // If no query, show all cards
        if (!query.trim()) {
            return;
        }

        // Perform fuzzy search
        const results = fuse.search(query);

        // If no results found
        if (results.length === 0) {
            // Hide all cards
            facilityCards.forEach(card => {
                card.style.display = 'none';
                card.classList.add('search-hidden');
            });

            // Show no result message with animation
            if (noResultsMessage) {
                noResultsMessage.style.display = 'block';
                setTimeout(() => {
                    noResultsMessage.classList.add('show');
                }, 10);
            }
            return;
        }

        // Show matching results and hide non-matching ones
        const matchingElements = new Set(results.map(result => result.item.element));

        facilityCards.forEach(card => {
            if (matchingElements.has(card)) {
                card.style.display = 'block';
                card.classList.remove('search-hidden');
            } else {
                card.style.display = 'none';
                card.classList.add('search-hidden');
            }
        });
    }

    // Main search input handler
    searchInput.addEventListener('input', function(e) {
        const query = e.target.value;

        // Perform search
        performSearch(query);
    });

    // Focus effects
    searchInput.addEventListener('focus', function() {
        if (halo) halo.classList.add('focused');
    });

    searchInput.addEventListener('blur', function() {
        if (halo) halo.classList.remove('focused');
    });

    // Clear search on escape key
    searchInput.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            searchInput.value = '';
            performSearch('');
        }
    });
});
