// Featured Products Data
const featuredItems = [
    {
        id: 1,
        name: 'Modern Algerian Salon',
        image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc',
        price: '3000 DZD/day',
        description: 'Luxurious modern salon ideal for events and weddings'
    },
    {
        id: 2,
        name: 'Large Dining Table',
        image: 'https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf',
        price: '2500 DZD/day',
        description: 'Dining table for 10 people with chairs'
    },
    {
        id: 3,
        name: 'Complete Bedroom',
        image: 'https://images.unsplash.com/photo-1505693314120-0d443867891c',
        price: '5000 DZD/day',
        description: 'Complete bedroom including bed, wardrobe, and dressing table'
    }
];

// Append featured products to the page
function loadFeaturedItems() {
    const featuredSlider = document.querySelector('.featured-slider');
    if (!featuredSlider) return;
    
    featuredItems.forEach(item => {
        const itemCard = document.createElement('div');
        itemCard.className = 'featured-item fade-in';
        
        itemCard.innerHTML = `
            <div class="featured-item-inner">
                <img src="${item.image}" alt="${item.name}" loading="lazy">
                <div class="featured-item-content">
                    <h3>${item.name}</h3>
                    <p class="price">${item.price}</p>
                    <p class="description">${item.description}</p>
                    <button onclick="rentItem(${item.id})" class="rent-button">Book Now</button>
                </div>
            </div>
        `;
        
        featuredSlider.appendChild(itemCard);
    });
}

// Activate tab buttons
const tabButtons = document.querySelectorAll('.tab-button');
const productCards = document.querySelectorAll('.product-card');

tabButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        tabButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to the selected button
        button.classList.add('active');
        
        const category = button.dataset.category;
        
        // Filter products
        productCards.forEach(card => {
            if (category === 'all' || card.dataset.category === category) {
                card.style.display = 'block';
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, 10);
            } else {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });
    });
});

// Rent item function
function rentItem(button) {
    const card = button.closest('.product-card');
    const productName = card.querySelector('h3').textContent;
    const productPrice = card.querySelector('.price').textContent;
    
    showNotification(`Preparing your booking request for ${productName}...`, 'success');
    
    setTimeout(() => {
        const message = `Do you want to book ${productName}?\nPrice: ${productPrice}`;
        if (confirm(message)) {
            showNotification('We will contact you shortly to confirm the booking', 'success');
        }
    }, 500);
}

// Activate contact form with input validation
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const city = document.getElementById('city').value;
        const message = document.getElementById('message').value.trim();
        
        // Validate inputs
        if (name.length < 3) {
            showNotification('Please enter a valid name');
            return;
        }
        
        if (!isValidEmail(email)) {
            showNotification('Please enter a valid email address');
            return;
        }
        
        if (!isValidPhone(phone)) {
            showNotification('Please enter a valid phone number');
            return;
        }

        if (!city) {
            showNotification('Please select a city');
            return;
        }
        
        if (message.length < 10) {
            showNotification('Please enter a longer message');
            return;
        }
        
        showNotification('Your message has been received successfully! We will get back to you shortly', 'success');
        this.reset();
    });
}

// Helper functions
function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidPhone(phone) {
    // Validate Algerian phone number format
    return /^(0)(5|6|7)[0-9]{8}$/.test(phone);
}

function showNotification(message, type = 'error') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Activate scroll effects
function handleScroll() {
    const elements = document.querySelectorAll('.fade-in');
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementBottom = element.getBoundingClientRect().bottom;
        
        if (elementTop < window.innerHeight && elementBottom > 0) {
            element.classList.add('active');
        }
    });
}

// Load page and activate effects
window.addEventListener('load', () => {
    loadFeaturedItems();
    handleScroll();
});

// Activate scroll effects on scroll
window.addEventListener('scroll', handleScroll);

// Activate responsive menu
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > lastScroll && currentScroll > 100) {
        navbar.style.transform = 'translateY(-100%)';
    } else {
        navbar.style.transform = 'translateY(0)';
    }
    
    if (currentScroll === 0) {
        navbar.style.boxShadow = '0 2px 15px rgba(0,0,0,0.1)';
    } else {
        navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.2)';
    }
    
    lastScroll = currentScroll;
});

// Manage bookings
let bookings = JSON.parse(localStorage.getItem('bookings')) || [];

// Add new booking function
function addBooking(booking) {
    bookings.push({
        ...booking,
        totalPrice: booking.totalPrice.replace('DZD', 'دج') // Update currency
    });
    localStorage.setItem('bookings', JSON.stringify(bookings));
    displayBookings();
    showNotification('Booking added successfully', 'success');
}

// Display bookings function
function displayBookings() {
    const bookingsList = document.getElementById('bookingsList');
    if (!bookingsList) return;

    bookingsList.innerHTML = '';
    
    if (bookings.length === 0) {
        bookingsList.innerHTML = '<div class="no-bookings">No bookings yet</div>';
        return;
    }

    bookings.forEach((booking, index) => {
        const bookingItem = document.createElement('div');
        bookingItem.className = 'booking-item';
        
        bookingItem.innerHTML = `
            <img src="${booking.productImage}" alt="${booking.productName}">
            <div class="booking-info">
                <h3>${booking.productName}</h3>
                <div class="booking-details">
                    <div class="booking-detail">
                        <i class="fas fa-calendar"></i>
                        <span>Pickup Date: ${booking.startDate}</span>
                    </div>
                    <div class="booking-detail">
                        <i class="fas fa-clock"></i>
                        <span>Duration: ${booking.duration} days</span>
                    </div>
                    <div class="booking-detail">
                        <i class="fas fa-money-bill-wave"></i>
                        <span>Total Price: ${booking.totalPrice}</span>
                    </div>
                    <div class="booking-status ${getStatusClass(booking.status)}">
                        ${getStatusText(booking.status)}
                    </div>
                </div>
            </div>
        `;
        
        bookingsList.appendChild(bookingItem);
    });
}

// Get booking status class function
function getStatusClass(status) {
    switch(status) {
        case 'pending': return 'status-pending';
        case 'confirmed': return 'status-confirmed';
        case 'completed': return 'status-completed';
        default: return 'status-pending';
    }
}

// Get booking status text function
function getStatusText(status) {
    switch(status) {
        case 'pending': return 'Pending';
        case 'confirmed': return 'Confirmed';
        case 'completed': return 'Completed';
        default: return 'Pending';
    }
}

// Open booking modal function
function openRentModal(productCard) {
    const modal = document.getElementById('modalOverlay');
    const modalProductImage = document.getElementById('modalProductImage');
    const modalProductName = document.getElementById('modalProductName');
    const modalProductPrice = document.getElementById('modalProductPrice');
    
    const productImage = productCard.querySelector('img').src;
    const productName = productCard.querySelector('h3').textContent;
    const productPrice = productCard.querySelector('.price').textContent;
    
    modalProductImage.src = productImage;
    modalProductName.textContent = productName;
    modalProductPrice.textContent = productPrice;
    
    // Reset form
    document.getElementById('bookingForm').reset();
    
    // Set minimum date to today
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('rentDate').min = today;
    
    // Update total price
    updateTotalPrice();
    
    // Show modal
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

// Close booking modal function
function closeRentModal() {
    const modal = document.getElementById('modalOverlay');
    modal.style.display = 'none';
    document.body.style.overflow = '';
}

// Update total price function
function updateTotalPrice() {
    const duration = parseInt(document.getElementById('rentDuration').value) || 1;
    const priceText = document.getElementById('modalProductPrice').textContent;
    const dailyPrice = parseInt(priceText.match(/\d+/)[0]);
    const totalPrice = duration * dailyPrice;
    
    document.getElementById('totalPrice').textContent = `${totalPrice} DZD`;
}

// Validate Algerian phone number function
function isValidAlgerianPhone(phone) {
    const phoneRegex = /^(05|06|07)[0-9]{8}$/;
    return phoneRegex.test(phone);
}

// Add event listeners on page load
document.addEventListener('DOMContentLoaded', function() {
    // Booking form
    const bookingForm = document.getElementById('bookingForm');
    const rentDuration = document.getElementById('rentDuration');
    const modal = document.getElementById('modalOverlay');
    
    // Update total price on duration change
    if (rentDuration) {
        rentDuration.addEventListener('input', updateTotalPrice);
    }
    
    // Handle booking form submission
    if (bookingForm) {
        bookingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const phoneNumber = document.getElementById('rentPhone').value;
            if (!isValidAlgerianPhone(phoneNumber)) {
                showNotification('Please enter a valid Algerian phone number (starts with 05, 06, or 07 followed by 8 digits)');
                return;
            }
            
            const booking = {
                productName: document.getElementById('modalProductName').textContent,
                productImage: document.getElementById('modalProductImage').src,
                customerName: document.getElementById('rentName').value,
                phoneNumber: phoneNumber,
                startDate: document.getElementById('rentDate').value,
                duration: parseInt(document.getElementById('rentDuration').value),
                totalPrice: document.getElementById('totalPrice').textContent,
                status: 'pending',
                bookingDate: new Date().toISOString()
            };
            
            // Save booking
            addBooking(booking);
            
            // Show success message
            showNotification('Booking added successfully! We will contact you shortly');
            
            // Close modal
            closeRentModal();
        });
    }
    
    // Close modal on outside click
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === this) {
                closeRentModal();
            }
        });
    }
    
    // Add event listeners to rent buttons
    document.querySelectorAll('.rent-button').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const productCard = this.closest('.product-card');
            openRentModal(productCard);
        });
    });
});

// Validate email function
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Validate password function
function isValidPassword(password) {
    return password.length >= 8;
}

// Open registration modal function
function openRegisterModal() {
    const modal = document.getElementById('registerModal');
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

// Close registration modal function
function closeRegisterModal() {
    const modal = document.getElementById('registerModal');
    modal.style.display = 'none';
    document.body.style.overflow = '';
}

// Save user data function
function saveUserData(userData) {
    let users = JSON.parse(localStorage.getItem('users') || '[]');
    users.push(userData);
    localStorage.setItem('users', JSON.stringify(users));
}

// Check if email exists function
function isEmailExists(email) {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    return users.some(user => user.email === email);
}

// Add event listeners on page load
document.addEventListener('DOMContentLoaded', function() {
    // Register button
    const registerBtn = document.getElementById('registerBtn');
    if (registerBtn) {
        registerBtn.addEventListener('click', openRegisterModal);
    }

    // Registration form
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Validate email
            const email = document.getElementById('email').value;
            if (!isValidEmail(email)) {
                showNotification('Please enter a valid email address');
                return;
            }

            // Check if email exists
            if (isEmailExists(email)) {
                showNotification('This email is already registered');
                return;
            }

            // Validate password
            const password = document.getElementById('password').value;
            if (!isValidPassword(password)) {
                showNotification('Password must be at least 8 characters long');
                return;
            }

            // Validate password confirmation
            const confirmPassword = document.getElementById('confirmPassword').value;
            if (password !== confirmPassword) {
                showNotification('Passwords do not match');
                return;
            }

            // Validate phone number
            const phone = document.getElementById('phone').value;
            if (!isValidAlgerianPhone(phone)) {
                showNotification('Please enter a valid Algerian phone number');
                return;
            }

            // Collect user data
            const userData = {
                fullName: document.getElementById('fullName').value,
                email: email,
                phone: phone,
                password: password, // In a real application, password should be hashed
                city: document.getElementById('city').value,
                registrationDate: new Date().toISOString()
            };

            // Save user data
            saveUserData(userData);

            // Show success message
            showNotification('Registration successful! You can now log in');

            // Close modal and reset form
            closeRegisterModal();
            registerForm.reset();
        });
    }

    // Close modal on outside click
    const registerModal = document.getElementById('registerModal');
    if (registerModal) {
        registerModal.addEventListener('click', function(e) {
            if (e.target === this) {
                closeRegisterModal();
            }
        });
    }
});

// Login functions
function openLoginModal() {
    const modal = document.getElementById('loginModal');
    if (modal) {
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }
}

function closeLoginModal() {
    const modal = document.getElementById('loginModal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

function loginUser(userData) {
    // Get existing users from localStorage
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    
    // Find user with matching email
    const user = users.find(u => u.email === userData.email);
    
    if (user && user.password === userData.password) {
        // Store logged in user info (except password)
        const { password, ...userInfo } = user;
        localStorage.setItem('currentUser', JSON.stringify(userInfo));
        
        // Update UI
        updateAuthUI();
        closeLoginModal();
        showNotification('Login successful!', 'success');
        return true;
    }
    
    showNotification('Invalid email or password');
    return false;
}

function logout() {
    localStorage.removeItem('currentUser');
    updateAuthUI();
    showNotification('Logged out successfully', 'success');
}

function updateAuthUI() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const loginBtn = document.getElementById('loginBtn');
    const registerBtn = document.getElementById('registerBtn');
    
    if (currentUser) {
        // User is logged in
        if (loginBtn) loginBtn.textContent = 'Logout';
        if (registerBtn) registerBtn.style.display = 'none';
    } else {
        // User is logged out
        if (loginBtn) loginBtn.textContent = 'Login';
        if (registerBtn) registerBtn.style.display = 'inline-block';
    }
}

// Add event listeners on page load
document.addEventListener('DOMContentLoaded', function() {
    // Login button
    const loginBtn = document.getElementById('loginBtn');
    if (loginBtn) {
        loginBtn.addEventListener('click', function() {
            const currentUser = JSON.parse(localStorage.getItem('currentUser'));
            if (currentUser) {
                // If user is logged in, log them out
                logout();
            } else {
                // If user is not logged in, show login modal
                openLoginModal();
            }
        });
    }

    // Login form
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = document.getElementById('loginEmail').value;
            const password = document.getElementById('loginPassword').value;
            
            if (!isValidEmail(email)) {
                showNotification('Please enter a valid email address');
                return;
            }
            
            loginUser({ email, password });
            loginForm.reset();
        });
    }

    // Initialize auth UI
    updateAuthUI();
});

// Show notifications function
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => notification.classList.add('show'), 100);
    
    // Hide and remove notification
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Top menu effects
document.addEventListener('DOMContentLoaded', function() {
    const navbar = document.querySelector('.navbar');
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const menuBackdrop = document.querySelector('.menu-backdrop');
    const navLinksItems = document.querySelectorAll('.nav-links a');

    // Scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Toggle menu on mobile
    menuToggle.addEventListener('click', function() {
        menuToggle.classList.toggle('active');
        navLinks.classList.toggle('active');
        menuBackdrop.classList.toggle('active');
        document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
    });

    // Close menu on backdrop click
    menuBackdrop.addEventListener('click', function() {
        menuToggle.classList.remove('active');
        navLinks.classList.remove('active');
        menuBackdrop.classList.remove('active');
        document.body.style.overflow = '';
    });

    // Close menu on link click
    navLinksItems.forEach(link => {
        link.addEventListener('click', function() {
            menuToggle.classList.remove('active');
            navLinks.classList.remove('active');
            menuBackdrop.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
});
