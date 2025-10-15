const menuBtn = document.getElementById("menu-btn");
const navLinks = document.getElementById("nav-links");
const menuBtnIcon = menuBtn.querySelector("i");

menuBtn.addEventListener("click", (e) => {
  navLinks.classList.toggle("open");

  const isOpen = navLinks.classList.contains("open");
  menuBtnIcon.setAttribute("class", isOpen ? "ri-close-line" : "ri-menu-line");
});

navLinks.addEventListener("click", (e) => {
  navLinks.classList.remove("open");
  menuBtnIcon.setAttribute("class", "ri-menu-line");
});

// Search Toggle ( Currently not in use )
// const navSearch = document.getElementById("nav-search");

// navSearch.addEventListener("click", (e) => {
//   navSearch.classList.toggle("open");
// });

const scrollRevealOption = {
  distance: "50px",
  origin: "bottom",
  duration: 1000,
};

ScrollReveal().reveal(".header__image img", {
  ...scrollRevealOption,
  origin: "right",
});
ScrollReveal().reveal(".header__content div", {
  duration: 1000,
  delay: 500,
});
ScrollReveal().reveal(".header__content h1", {
  ...scrollRevealOption,
  delay: 1000,
});
ScrollReveal().reveal(".header__content p", {
  ...scrollRevealOption,
  delay: 1500,
});

ScrollReveal().reveal(".deals__card", {
  ...scrollRevealOption,
  interval: 500,
});

ScrollReveal().reveal(".about__image img", {
  ...scrollRevealOption,
  origin: "right",
});
ScrollReveal().reveal(".about__card", {
  duration: 1000,
  interval: 500,
  delay: 500,
});

const swiper = new Swiper(".swiper", {
  loop: true,
});

// Product detail section
function changeMainImage(src) {
  document.getElementById('mainProductImage').src = src;
  
  // Update gambar
  document.querySelectorAll('.thumbnail').forEach(thumb => {
    thumb.classList.remove('active');
  });
  
  event.target.parentElement.classList.add('active');
}

function increaseQuantity() {
  const quantityInput = document.getElementById('quantity');
  let currentValue = parseInt(quantityInput.value);
  if (currentValue < 10) {
    quantityInput.value = currentValue + 1;
  }
}

function decreaseQuantity() {
  const quantityInput = document.getElementById('quantity');
  let currentValue = parseInt(quantityInput.value);
  if (currentValue > 1) {
    quantityInput.value = currentValue - 1;
  }
}

// Cart functionality
function addToCart() {
  const cartCountElement = document.querySelector('.cart-count');
  let currentCount = parseInt(cartCountElement.textContent);

  const quantityInput = document.getElementById('quantity');
  const quantity = parseInt(quantityInput.value);
  
  
  const newCount = currentCount + quantity;
  cartCountElement.textContent = newCount;
  
  
  cartCountElement.style.animation = 'cartBounce 0.6s ease';
  
  
  showAddToCartMessage();
  
  
  setTimeout(() => {
    cartCountElement.style.animation = '';
  }, 600);
}

function showAddToCartMessage() {
  let notification = document.getElementById('cart-notification');
  
  if (!notification) {
    notification = document.createElement('div');
    notification.id = 'cart-notification';
    notification.className = 'cart-notification';
    document.body.appendChild(notification);
  }
  
  const quantityInput = document.getElementById('quantity');
  const quantity = parseInt(quantityInput.value);
  
  notification.innerHTML = `
    <i class="bi bi-check-circle-fill"></i>
    <span>${quantity} item${quantity > 1 ? 's' : ''} added to cart!</span>
  `;
  
  notification.classList.add('show');
  
  
  setTimeout(() => {
    notification.classList.remove('show');
  }, 3000);
}

// Tab functionality
function openTab(evt, tabName) {
  var i, tabcontent, tablinks;
  
  // Hide all tab content
  tabcontent = document.getElementsByClassName("tab-content");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].classList.remove("active");
  }
  
  // Remove active class from all tab buttons
  tablinks = document.getElementsByClassName("tab-btn");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].classList.remove("active");
  }
  
  // Show selected tab content and mark button as active
  document.getElementById(tabName).classList.add("active");
  evt.currentTarget.classList.add("active");
}

// Form validation dan submit review
document.addEventListener('DOMContentLoaded', function() {
  // Star rating functionality (existing code)
  const stars = document.querySelectorAll('.star-rating i');
  let selectedRating = 0;
  
  stars.forEach(star => {
    star.addEventListener('click', function() {
      selectedRating = parseInt(this.getAttribute('data-rating'));
      updateStars(selectedRating);
    });
    
    star.addEventListener('mouseover', function() {
      const hoverRating = parseInt(this.getAttribute('data-rating'));
      updateStars(hoverRating);
    });
  });
  
  document.querySelector('.star-rating').addEventListener('mouseleave', function() {
    updateStars(selectedRating);
  });
  
  function updateStars(rating) {
    stars.forEach((star, index) => {
      if (index < rating) {
        star.classList.add('active');
      } else {
        star.classList.remove('active');
      }
    });
  }

  // Review form validation
  const reviewForm = document.querySelector('.review-form');
  if (reviewForm) {
    reviewForm.addEventListener('submit', function(e) {
      e.preventDefault(); // Prevent default form submission
      
      // Get form elements
      const nameInput = document.getElementById('reviewer-name');
      const commentInput = document.getElementById('review-comment');
      
      // Clear previous error styling
      clearErrors();
      
      let isValid = true;
      
      // Validate name field
      if (!nameInput.value.trim()) {
        showError(nameInput, 'Name is required');
        isValid = false;
      } else if (nameInput.value.trim().length < 2) {
        showError(nameInput, 'Name must be at least 2 characters');
        isValid = false;
      }
      
      // Validate review comment
      if (!commentInput.value.trim()) {
        showError(commentInput, 'Review comment is required');
        isValid = false;
      } else if (commentInput.value.trim().length < 10) {
        showError(commentInput, 'Review must be at least 10 characters');
        isValid = false;
      }
      
      // Validate rating
      if (selectedRating === 0) {
        showRatingError('Please select a rating');
        isValid = false;
      }
      
      // If all validations pass
      if (isValid) {
        submitReview(nameInput.value.trim(), commentInput.value.trim(), selectedRating);
      }
    });
  }
});

// Show error function
function showError(input, message) {
  const formGroup = input.parentElement;
  
  // Remove existing error
  const existingError = formGroup.querySelector('.error-message');
  if (existingError) {
    existingError.remove();
  }
  
  // Add error styling to input
  input.classList.add('error');
  
  // Create error message element
  const errorDiv = document.createElement('div');
  errorDiv.className = 'error-message';
  errorDiv.textContent = message;
  
  // Insert error message after input
  formGroup.appendChild(errorDiv);
}

// Show rating error function
function showRatingError(message) {
  const ratingInput = document.querySelector('.rating-input');
  
  // Remove existing error
  const existingError = ratingInput.querySelector('.error-message');
  if (existingError) {
    existingError.remove();
  }
  
  // Create error message element
  const errorDiv = document.createElement('div');
  errorDiv.className = 'error-message';
  errorDiv.textContent = message;
  
  // Insert error message
  ratingInput.appendChild(errorDiv);
}

// Clear all errors function
function clearErrors() {
  // Remove error styling from inputs
  document.querySelectorAll('.form-group input, .form-group textarea').forEach(input => {
    input.classList.remove('error');
  });
  
  // Remove all error messages
  document.querySelectorAll('.error-message').forEach(error => {
    error.remove();
  });
}

// Submit review function
function submitReview(name, comment, rating) {
  // Show loading state
  const submitBtn = document.querySelector('.submit-review-btn');
  const originalText = submitBtn.textContent;
  submitBtn.textContent = 'Submitting...';
  submitBtn.disabled = true;
  
  // Simulate API call (replace with actual API call)
  setTimeout(() => {
    // Create new review element
    addNewReview(name, comment, rating);
    
    // Reset form
    document.querySelector('.review-form').reset();
    selectedRating = 0;
    updateStars(0);
    
    // Reset button
    submitBtn.textContent = originalText;
    submitBtn.disabled = false;
    
    // Show success message
    showSuccessMessage('Thank you! Your review has been submitted successfully.');
    
    // Update review count
    updateReviewCount();
    
  }, 2000); // Simulate 2 second delay
}

// Function untuk menambahkan review baru ke DOM
function addNewReview(name, comment, rating) {
  const reviewsContainer = document.querySelector('#reviews .review-item').parentNode;
  const newReviewHTML = `
    <div class="review-item new-review">
      <div class="review-header">
        <div class="reviewer-info">
          <h4>${name}</h4>
          <div class="review-stars">
            ${generateStars(rating)}
          </div>
        </div>
        <span class="review-date">${new Date().toLocaleDateString('en-US', { 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric' 
        })}</span>
      </div>
      <p class="review-text">"${comment}"</p>
    </div>
  `;
  
  // Memasukkan review baru sebelum form tambah review
  const addReviewSection = document.querySelector('.add-review-section');
  addReviewSection.insertAdjacentHTML('beforebegin', newReviewHTML);
  
  // Add animation to new review
  setTimeout(() => {
    document.querySelector('.new-review').classList.add('show');
  }, 10);
}

// Generate stars HTML
function generateStars(rating) {
  let starsHTML = '';
  for (let i = 1; i <= 5; i++) {
    if (i <= rating) {
      starsHTML += '<i class="bi bi-star-fill"></i>';
    } else {
      starsHTML += '<i class="bi bi-star"></i>';
    }
  }
  return starsHTML;
}

// Update review count
function updateReviewCount() {
  const reviewCount = document.querySelectorAll('.review-item').length;
  const reviewCountElement = document.querySelector('.review-count');
  reviewCountElement.textContent = `Based on ${reviewCount} review${reviewCount > 1 ? 's' : ''}`;
  
  // Update tab button
  const reviewsTabBtn = document.querySelector('[onclick="openTab(event, \'reviews\')"]');
  reviewsTabBtn.textContent = `REVIEWS (${reviewCount})`;
}

// Show success message
function showSuccessMessage(message) {
  let notification = document.getElementById('review-success-notification');
  
  if (!notification) {
    notification = document.createElement('div');
    notification.id = 'review-success-notification';
    notification.className = 'review-success-notification';
    document.body.appendChild(notification);
  }
  
  notification.innerHTML = `
    <i class="bi bi-check-circle-fill"></i>
    <span>${message}</span>
  `;
  
  notification.classList.add('show');
  
  setTimeout(() => {
    notification.classList.remove('show');
  }, 4000);
}

// Real-time validation
document.addEventListener('DOMContentLoaded', function() {
  const nameInput = document.getElementById('reviewer-name');
  const commentInput = document.getElementById('review-comment');
  
  if (nameInput) {
    nameInput.addEventListener('input', function() {
      if (this.classList.contains('error') && this.value.trim()) {
        this.classList.remove('error');
        const errorMsg = this.parentElement.querySelector('.error-message');
        if (errorMsg) errorMsg.remove();
      }
    });
  }
  
  if (commentInput) {
    commentInput.addEventListener('input', function() {
      if (this.classList.contains('error') && this.value.trim()) {
        this.classList.remove('error');
        const errorMsg = this.parentElement.querySelector('.error-message');
        if (errorMsg) errorMsg.remove();
      }
    });
  }
});


// Contact form functionality
document.addEventListener('DOMContentLoaded', function() {
  const contactForm = document.getElementById('contactForm');
  
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Get form elements
      const nameInput = document.getElementById('contact-name');
      const emailInput = document.getElementById('contact-email');
      const phoneInput = document.getElementById('contact-phone');
      const messageInput = document.getElementById('contact-message');
      
      // Clear previous errors
      clearContactErrors();
      
      let isValid = true;
      
      // Validate name
      if (!nameInput.value.trim()) {
        showContactError(nameInput, 'Name is required');
        isValid = false;
      } else if (nameInput.value.trim().length < 2) {
        showContactError(nameInput, 'Name must be at least 2 characters');
        isValid = false;
      }
      
      // Validate email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailInput.value.trim()) {
        showContactError(emailInput, 'Email is required');
        isValid = false;
      } else if (!emailRegex.test(emailInput.value.trim())) {
        showContactError(emailInput, 'Please enter a valid email address');
        isValid = false;
      }
      
      // Validate message
      if (!messageInput.value.trim()) {
        showContactError(messageInput, 'Message is required');
        isValid = false;
      } else if (messageInput.value.trim().length < 10) {
        showContactError(messageInput, 'Message must be at least 10 characters');
        isValid = false;
      }
      
      // Validate phone (optional but if provided, should be valid)
      if (phoneInput.value.trim() && phoneInput.value.trim().length < 10) {
        showContactError(phoneInput, 'Please enter a valid phone number');
        isValid = false;
      }
      
      // If all validations pass
      if (isValid) {
        submitContactForm({
          name: nameInput.value.trim(),
          email: emailInput.value.trim(),
          phone: phoneInput.value.trim(),
          message: messageInput.value.trim()
        });
      }
    });
    
    // Real-time validation
    ['contact-name', 'contact-email', 'contact-phone', 'contact-message'].forEach(id => {
      const input = document.getElementById(id);
      if (input) {
        input.addEventListener('input', function() {
          if (this.classList.contains('contact-error') && this.value.trim()) {
            this.classList.remove('contact-error');
            const errorMsg = this.parentElement.querySelector('.contact-error-message');
            if (errorMsg) errorMsg.remove();
          }
        });
      }
    });
  }
});

// Show contact form error
function showContactError(input, message) {
  const formGroup = input.parentElement;
  
  // Remove existing error
  const existingError = formGroup.querySelector('.contact-error-message');
  if (existingError) {
    existingError.remove();
  }
  
  // Add error styling
  input.classList.add('contact-error');
  
  // Create error message
  const errorDiv = document.createElement('div');
  errorDiv.className = 'contact-error-message';
  errorDiv.textContent = message;
  
  // Insert error message
  formGroup.appendChild(errorDiv);
}

// Clear all contact form errors
function clearContactErrors() {
  document.querySelectorAll('.form-contact-group input, .form-contact-group textarea').forEach(input => {
    input.classList.remove('contact-error');
  });
  
  document.querySelectorAll('.contact-error-message').forEach(error => {
    error.remove();
  });
}

// Submit contact form
function submitContactForm(formData) {
  const submitBtn = document.querySelector('.btn-contact-submit');
  const originalText = submitBtn.textContent;
  
  // Show loading state
  submitBtn.textContent = 'SENDING...';
  submitBtn.disabled = true;
  
  // Simulate API call
  setTimeout(() => {
    // Reset form
    document.getElementById('contactForm').reset();
    
    // Reset button
    submitBtn.textContent = originalText;
    submitBtn.disabled = false;
    
    // Show success message
    showContactSuccessMessage('Thank you! Your message has been sent successfully. We will get back to you soon.');
    
    console.log('Contact form submitted:', formData);
    
  }, 2000);
}

// Show contact success message
function showContactSuccessMessage(message) {
  let notification = document.getElementById('contact-success-notification');
  
  if (!notification) {
    notification = document.createElement('div');
    notification.id = 'contact-success-notification';
    notification.className = 'contact-success-notification';
    document.body.appendChild(notification);
  }
  
  notification.innerHTML = `
    <i class="bi bi-check-circle-fill"></i>
    <span>${message}</span>
  `;
  
  notification.classList.add('show');
  
  // Hide notification after 5 seconds
  setTimeout(() => {
    notification.classList.remove('show');
  }, 2000);
}