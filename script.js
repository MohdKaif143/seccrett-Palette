// Global variables
const WHATSAPP_NUMBER = '1234567890'; // Replace with your actual WhatsApp Business number

// Product data
const products = [
    { name: 'Crochet Bloom Gift Wrap', price: 455.00, image: 'product img/prod1/img1.jpg', category: 'bouqet' },
    { name: 'Strawberry Crochet cap', price: 28.00, image: 'product img/prod2/img1.jpg', category: 'cap' },
    { name: ' Sunny Chick Crochet Hair Clip', price: 32.00, image: 'product img/prod3/prod3img1.jpg', category: 'accessories' },
    { name: 'Mini Whale Crochet Keychain', price: 22.00, image: 'product img/prod4/prod4img1.jpg', category: 'keychain' },
    { name: 'Forever Bloom Crochet Bouquet', price: 18.00,  image: 'product img/prod5/prod5img1.jpg', category: 'baby' },
    { name: 'Blossom Hug Crochet Hair Clip', price: 15.00,image: 'product img/prod6/prod6img1.jpg', category: 'home' },
    { name: 'Cozy Throw Pillow', price: 35.00, emoji: '🛏️', category: 'home' },
    { name: 'Amigurumi Cat', price: 25.00, emoji: '🐱', category: 'toys' },
    { name: 'Crochet Handbag', price: 40.00, emoji: '👜', category: 'accessories' },
    { name: 'Kitchen Dishcloths Set', price: 12.00, emoji: '🧽', category: 'kitchen' },
    { name: 'Granny Square Afghan', price: 65.00, emoji: '🌈', category: 'blankets' },
    { name: 'Baby Security Blanket', price: 24.00, emoji: '🍼', category: 'baby' },
    { name: 'Crochet Plant Hanger', price: 20.00, emoji: '🪴', category: 'home' },
    { name: 'Fingerless Gloves', price: 26.00, emoji: '🧤', category: 'accessories' },
    { name: 'Amigurumi Unicorn', price: 30.00, emoji: '🦄', category: 'toys' },
    { name: 'Table Runner', price: 38.00, emoji: '🏠', category: 'home' },
    { name: 'Crochet Bookmark Set', price: 8.00, emoji: '📚', category: 'accessories' },
    { name: 'Baby Hat and Mittens Set', price: 28.00, emoji: '👶', category: 'baby' },
    { name: 'Pot Holders Set', price: 14.00, emoji: '🍳', category: 'kitchen' },
    { name: 'Meditation Cushion Cover', price: 45.00, emoji: '🧘', category: 'home' }
];

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Small delay to ensure DOM is fully ready
    setTimeout(() => {
        initializeNavigation();
        initializeSearch();
        loadProducts();
        
        // Debug logging for mobile navigation
        const hamburger = document.querySelector('.hamburger');
        const navMenu = document.querySelector('.nav-menu');
        
        if (hamburger && navMenu) {
            console.log('Navigation elements found and initialized');
        } else {
            console.log('Navigation elements not found');
        }
    }, 100);
});

// Navigation functionality
function initializeNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        // Remove any existing event listeners
        hamburger.removeEventListener('click', toggleMenu);
        
        // Add click event listener
        hamburger.addEventListener('click', toggleMenu);
        
        // Close menu when clicking on nav links
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = 'auto';
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
    }
}

// Toggle menu function
function toggleMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        
        // Prevent body scroll when menu is open
        if (navMenu.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    }
}

// Search functionality
function initializeSearch() {
    const searchInputs = document.querySelectorAll('#searchInput, #productSearchInput');
    const searchButtons = document.querySelectorAll('.search-button');
    
    searchInputs.forEach(input => {
        if (input) {
            input.addEventListener('input', handleSearch);
            input.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    handleSearch();
                }
            });
        }
    });
    
    searchButtons.forEach(button => {
        if (button) {
            button.addEventListener('click', handleSearch);
        }
    });
}

// Handle search functionality
function handleSearch() {
    const searchTerm = document.querySelector('#searchInput')?.value.toLowerCase() || 
                      document.querySelector('#productSearchInput')?.value.toLowerCase() || '';
    
    const currentPage = window.location.pathname.split('/').pop();
    
    if (currentPage === 'products.html') {
        filterProducts(searchTerm);
    } else if (currentPage === 'index.html' || currentPage === '') {
        filterFeaturedProducts(searchTerm);
    }
}

// Filter products on products page
function filterProducts(searchTerm) {
    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchTerm) ||
        product.category.toLowerCase().includes(searchTerm)
    );
    
    displayProducts(filteredProducts);
    
    const noResults = document.getElementById('noResults');
    if (noResults) {
        noResults.style.display = filteredProducts.length === 0 ? 'block' : 'none';
    }
}

// Filter featured products on home page
function filterFeaturedProducts(searchTerm) {
    const featuredGrid = document.getElementById('featuredGrid');
    if (!featuredGrid) return;
    
    const productCards = featuredGrid.querySelectorAll('.product-card');
    let visibleCount = 0;
    
    productCards.forEach(card => {
        const productName = card.getAttribute('data-name').toLowerCase();
        if (productName.includes(searchTerm)) {
            card.style.display = 'block';
            visibleCount++;
        } else {
            card.style.display = 'none';
        }
    });
    
    // Show message if no products found
    let noResultsMsg = featuredGrid.querySelector('.no-results-message');
    if (visibleCount === 0 && searchTerm.length > 0) {
        if (!noResultsMsg) {
            noResultsMsg = document.createElement('div');
            noResultsMsg.className = 'no-results-message';
            noResultsMsg.innerHTML = '<p>No products found. <a href="products.html">View all products</a></p>';
            noResultsMsg.style.gridColumn = '1 / -1';
            noResultsMsg.style.textAlign = 'center';
            noResultsMsg.style.padding = '40px';
            noResultsMsg.style.color = '#666';
            featuredGrid.appendChild(noResultsMsg);
        }
        noResultsMsg.style.display = 'block';
    } else if (noResultsMsg) {
        noResultsMsg.style.display = 'none';
    }
}

// Load products based on current page
function loadProducts() {
    const currentPage = window.location.pathname.split('/').pop();
    
    if (currentPage === 'products.html') {
        displayProducts(products);
    }
}

// Display products on products page
function displayProducts(productList) {
    const productsGrid = document.getElementById('productsGrid');
    if (!productsGrid) return;
    
    productsGrid.innerHTML = '';
    
    productList.forEach(product => {
        const productCard = createProductCard(product);
        productsGrid.appendChild(productCard);
    });
}

// Create product card element
function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.setAttribute('data-name', product.name);
    
    card.innerHTML = `
        <div class="product-image">
    ${product.image
        ? `<img src="${product.image}" alt="${product.name}" style="width: 100%; border-radius: 10px;">`
        : `<div class="placeholder-image">${product.emoji}</div>`
    }
</div>
        <div class="product-info">
            <h3 class="product-name">${product.name}</h3>
            <p class="product-price">$${product.price.toFixed(2)}</p>
            <button class="buy-button" onclick="buyProduct('${product.name}')">Buy Now</button>
        </div>
    `;
    
    return card;
}

// Buy product function - opens WhatsApp
function buyProduct(productName) {
     if (productName === "Crochet Bloom Gift Wrap") {
    window.location.href = "product1.html"; // Redirect to a custom detail page
    return;
    
  }
  else if (productName === "Strawberry Crochet cap"){
    window.location.href = "product2.html"; // Redirect to a custom detail page
    return;
  }
  else if (productName === " Sunny Chick Crochet Hair Clip"){
    window.location.href = "product3.html"; // Redirect to a custom detail page
    return;
  }
  else if (productName === "Mini Whale Crochet Keychain") {
    window.location.href = "product4.html"; // Redirect to a custom detail page
    return;
  }
  else if (productName === "Forever Bloom Crochet Bouquet") {
    window.location.href = "product5.html"; // Redirect to a custom detail page
    return;
      }
    else if (productName === "Blossom Hug Crochet Hair Clip") {
    window.location.href = "product6.html"; // Redirect to a custom detail page 
    return;
    }
          const message = `Hello! I'm interested in the ${productName}. Could you please provide more details?`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${9867374183}?text=${encodedMessage}`;
    
    // Open WhatsApp in new window/tab
    window.open(whatsappUrl, '_blank');
}

// Smooth scrolling for internal links
document.addEventListener('click', function(e) {
    if (e.target.matches('a[href^="#"]')) {
        e.preventDefault();
        const targetId = e.target.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }
});

// Add loading animation for buy buttons
function addLoadingState(button) {
    const originalText = button.textContent;
    button.textContent = 'Opening WhatsApp...';
    button.disabled = true;
    
    setTimeout(() => {
        button.textContent = originalText;
        button.disabled = false;
    }, 2000);
}

// Enhanced buy product function with loading state
function buyProductWithLoading(productName) {
    const buttons = document.querySelectorAll('.buy-button');
    const clickedButton = Array.from(buttons).find(btn => 
        btn.closest('.product-card').getAttribute('data-name') === productName
    );
    
    if (clickedButton) {
        addLoadingState(clickedButton);
    }
    
    buyProduct(productName);
}

// Add scroll effect to navigation
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        if (window.scrollY > 100) {
            navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
            navbar.style.backdropFilter = 'blur(10px)';
        } else {
            navbar.style.backgroundColor = '#fff';
            navbar.style.backdropFilter = 'none';
        }
    }
});

// Add intersection observer for animations
function addScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe product cards
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
    
    // Observe value cards
    const valueCards = document.querySelectorAll('.value-card');
    valueCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
}

// Initialize scroll animations when page loads
document.addEventListener('DOMContentLoaded', function() {
    // Add delay to allow CSS to load
    setTimeout(addScrollAnimations, 500);
});

// Form validation helper (if forms are added later)
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Utility function to format currency
function formatCurrency(amount) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(amount);
}

// Add to cart functionality (for future expansion)
let cart = [];

function addToCart(product) {
    const existingItem = cart.find(item => item.name === product.name);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    updateCartDisplay();
}

function updateCartDisplay() {
    // This function can be expanded when cart UI is added
    console.log('Cart updated:', cart);
}

// Local storage helpers (for future use - note: these won't work in Claude artifacts)
function saveToStorage(key, data) {
    try {
        localStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
        console.log('Storage not available');
    }
}

function loadFromStorage(key) {
    try {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : null;
    } catch (error) {
        console.log('Storage not available');
        return null;
    }
}

// Error handling for images
document.addEventListener('error', function(e) {
    if (e.target.tagName === 'IMG') {
        e.target.style.display = 'none';
        // Show placeholder instead
        const placeholder = e.target.nextElementSibling;
        if (placeholder && placeholder.classList.contains('placeholder-image')) {
            placeholder.style.display = 'flex';
        }
    }
}, true);

// Performance optimization: Lazy loading for images (when real images are added)
function addLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Initialize all functionality
function init() {
    initializeNavigation();
    initializeSearch();
    loadProducts();
    addLazyLoading();
}

// Make sure everything initializes properly
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}