// Fetch products using corsproxy.io to bypass CORS
async function fetchProducts() {
    const targetUrl = 'https://front.superbuy.com/shoppingguide/get-shop-goods-list';
    const params = new URLSearchParams({
        shopId: "36347402",
        sellerPlatform: "TB",
        priceSort: "0",
        priceStart: "0",
        priceEnd: "0",
        currPage: "1"
    });
    const proxyUrl = `https://corsproxy.io/?${encodeURIComponent(targetUrl + '?' + params)}`;
    
    try {
        const response = await fetch(proxyUrl, {
            method: 'GET',
            headers: {
                'Accept': 'application/json, text/plain, */*',
            }
        });

        if (!response.ok) {
            throw new Error('Failed to fetch products');
        }

        const data = await response.json();
        console.log('Fetched data:', data); // Log the fetched data
        return data.data.resultList;
    } catch (error) {
        console.error('Error fetching products:', error);
        return [];
    }
}

// Render products on the page
async function renderProducts() {
    const productGrid = document.getElementById('product-grid');
    productGrid.innerHTML = '<p>Loading products...</p>'; // Loading message

    try {
        const products = await fetchProducts();
        console.log('Products:', products); // Log the products

        if (!products || products.length === 0) {
            productGrid.innerHTML = '<p>No products found. Please try again later.</p>';
            return;
        }

        productGrid.innerHTML = ''; // Clear loading message

        products.forEach(product => {
            const productCard = document.createElement('div');
            productCard.classList.add('product-card', 'animate-on-scroll');
            productCard.innerHTML = `
                <div class="product-image-container">
                    <img src="${product.img}" alt="${product.title}">
                </div>
                <div class="product-info">
                    <h3>${product.title}</h3>
                    <p>${product.discountPrice} ${product.currencyCode}</p>
                    <a href="${product.href}" target="_blank" class="product-link">View on Taobao</a>
                </div>
            `;
            productGrid.appendChild(productCard);
        });

        // Trigger animation for newly added elements
        if (typeof handleScrollAnimations === 'function') {
            handleScrollAnimations();
        }
    } catch (error) {
        console.error('Error rendering products:', error);
        productGrid.innerHTML = '<p>Error loading products. Please try again later.</p>';
    }
}

// Mode toggle functionality
function setupModeToggle() {
    const modeToggle = document.getElementById('modeToggle');
    const body = document.body;
    const currentMode = localStorage.getItem('mode') || 'dark';

    // Set initial mode
    body.classList.add(currentMode + '-mode');
    modeToggle.textContent = currentMode === 'dark' ? '☀️' : '🌙';

    modeToggle.addEventListener('click', () => {
        body.classList.toggle('light-mode');
        const newMode = body.classList.contains('light-mode') ? 'light' : 'dark';
        localStorage.setItem('mode', newMode);
        modeToggle.textContent = newMode === 'dark' ? '☀️' : '🌙';
    });
}

// Call renderProducts and setupModeToggle when the page loads
window.addEventListener('load', () => {
    renderProducts();
    setupModeToggle();
});
