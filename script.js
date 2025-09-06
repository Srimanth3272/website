// Sample product data
const products = {
    newArrivals: [
        {
            id: 1,
            name: "Elegant Silk Blazer",
            price: 299.99,
            image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&h=500&fit=crop",
            category: "women"
        },
        {
            id: 2,
            name: "Classic Leather Loafers",
            price: 189.99,
            image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=500&fit=crop",
            category: "men"
        },
        {
            id: 3,
            name: "Cashmere Turtleneck",
            price: 159.99,
            image: "https://images.unsplash.com/photo-1571945153237-4929e783af4a?w=400&h=500&fit=crop",
            category: "women"
        },
        {
            id: 4,
            name: "Gold Chain Necklace",
            price: 89.99,
            image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=500&fit=crop",
            category: "accessories"
        }
    ],
    sale: [
        {
            id: 5,
            name: "Designer Handbag",
            price: 199.99,
            originalPrice: 349.99,
            image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=500&fit=crop",
            category: "accessories"
        },
        {
            id: 6,
            name: "Wool Coat",
            price: 249.99,
            originalPrice: 399.99,
            image: "https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=400&h=500&fit=crop",
            category: "women"
        }
    ]
};

// Global state
let cart = [];
let wishlist = [];

// Initialize the website
document.addEventListener('DOMContentLoaded', function() {
    loadProducts();
    setupEventListeners();
});

// Load products into grids
function loadProducts() {
    loadNewArrivals();
    loadSaleProducts();
}

function loadNewArrivals() {
    const grid = document.getElementById('new-arrivals-grid');
    products.newArrivals.forEach(product => {
        const productCard = createProductCard(product);
        grid.appendChild(productCard);
    });
}

function loadSaleProducts() {
    const grid = document.getElementById('sale-grid');
    products.sale.forEach(product => {
        const productCard = createProductCard(product, true);
        grid.appendChild(productCard);
    });
}

function createProductCard(product, isSale = false) {
    const card = document.createElement('div');
    card.className = 'product-card';
    
    const priceHTML = isSale && product.originalPrice ? 
        `<div class="product-price sale">
            <span>$${product.price}</span>
            <span class="original-price">$${product.originalPrice}</span>
        </div>` :
        `<div class="product-price">$${product.price}</div>`;
    
    card.innerHTML = `
        <div class="product-image">
            <img src="${product.image}" alt="${product.name}">
            <div class="product-actions">
                <button class="action-btn">
                    <i class="far fa-heart"></i>
                </button>
                <button class="action-btn">
                    <i class="far fa-eye"></i>
                </button>
            </div>
        </div>
        <div class="product-info">
            <div class="product-name">${product.name}</div>
            ${priceHTML}
        </div>
    `;
    
    return card;
}

function setupEventListeners() {
    // Navigation smooth scroll
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Modal functionality
    const modals = document.querySelectorAll('.modal');
    const loginBtn = document.getElementById('login-btn');
    const cartBtn = document.getElementById('cart-btn');

    loginBtn.addEventListener('click', () => {
        document.getElementById('login-modal').style.display = 'block';
    });

    cartBtn.addEventListener('click', () => {
        document.getElementById('cart-modal').style.display = 'block';
    });

    // Close modals
    document.querySelectorAll('.close').forEach(closeBtn => {
        closeBtn.addEventListener('click', (e) => {
            e.target.closest('.modal').style.display = 'none';
        });
    });

    // CTA button
    document.querySelector('.cta-button').addEventListener('click', () => {
        document.getElementById('new-arrivals').scrollIntoView({ behavior: 'smooth' });
    });
}

// Smooth navbar background change on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});