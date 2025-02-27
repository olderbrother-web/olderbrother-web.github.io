let currentPage = 1;
const productsPerPage = 20; // Adjust this based on the API's default

// Fetch products using corsproxy.io to bypass CORS
async function fetchProducts(page) {
    try {   
        const joyabuyUrl = `https://joyabuy.com/search-info/get-tb-shop-full?ShopId=36347402&Page=${page}&Language=en`;
        const encodedUrl = encodeURIComponent(joyabuyUrl);
        const response = await fetch(`https://api.codetabs.com/v1/proxy/?quest=${encodedUrl}`, {
            headers: {
                'accept': 'application/json',
                'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/133.0.0.0 Safari/537.36',
            },
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch products: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        if (!data.data?.shopProducts?.productList) {
            throw new Error('Invalid response format');
        }

        return {
            resultList: data.data.shopProducts.productList.map(product => ({
                img: product.imgUrl,
                title: product.name,
                discountPrice: product.discountPrice,
                currencyCode: 'CNY',
                href: `https://item.taobao.com/item.htm?id=${product.id}`
            }))
        };
    } catch (error) {
        console.error('Error fetching products:', error);
        return null;
    }
}

// Render products on the page
function renderProducts(products, append = false) {
    const productGrid = document.getElementById('product-grid');
    
    if (!append) {
        productGrid.innerHTML = ''; // Clear existing products if not appending
    }

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
}

// Load all products
async function loadAllProducts() {
    let currentPage = 1;
    let hasMoreProducts = true;
    const productGrid = document.getElementById('product-grid');
    productGrid.innerHTML = '<p>Loading products...</p>'; // Initial loading message

    while (hasMoreProducts) {
        const data = await fetchProducts(currentPage);
        if (data && data.resultList && data.resultList.length > 0) {
            renderProducts(data.resultList, currentPage > 1);
            currentPage++;
            console.log(`Loaded page ${currentPage - 1}`);
        } else {
            hasMoreProducts = false;
            console.log('No more products to load');
        }
    }

    if (currentPage === 1) {
        productGrid.innerHTML = '<p>No products found. Please try again later.</p>';
    }
}

// Call loadAllProducts when the page loads
window.addEventListener('load', loadAllProducts);
