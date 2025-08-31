document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initPasswordToggle();
    initFormValidation();
    initSocialButtons();
    initAnimations();
    initParticleSystem();
});

// Password Toggle Functionality
function initPasswordToggle() {
    const passwordInput = document.getElementById('password');
    const passwordToggle = document.getElementById('passwordToggle');
    const toggleIcon = passwordToggle.querySelector('i');

    passwordToggle.addEventListener('click', function() {
        if (passwordInput.type === 'password') {
            passwordInput.type = 'text';
            toggleIcon.classList.remove('fa-eye');
            toggleIcon.classList.add('fa-eye-slash');
        } else {
            passwordInput.type = 'password';
            toggleIcon.classList.remove('fa-eye-slash');
            toggleIcon.classList.add('fa-eye');
        }
    });
}

// Form Validation and Submission
function initFormValidation() {
    const loginForm = document.getElementById('loginForm');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');

    // Real-time validation
    emailInput.addEventListener('input', function() {
        validateEmail(this);
    });

    passwordInput.addEventListener('input', function() {
        validatePassword(this);
    });

    // Form submission
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (validateForm()) {
            showLoadingState();
            simulateLogin();
        }
    });
}

function validateEmail(input) {
    const email = input.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (email === '') {
        showInputError(input, 'Email is required');
        return false;
    } else if (!emailRegex.test(email)) {
        showInputError(input, 'Please enter a valid email');
        return false;
    } else {
        showInputSuccess(input);
        return true;
    }
}

function validatePassword(input) {
    const password = input.value;
    
    if (password === '') {
        showInputError(input, 'Password is required');
        return false;
    } else if (password.length < 6) {
        showInputError(input, 'Password must be at least 6 characters');
        return false;
    } else {
        showInputSuccess(input);
        return true;
    }
}

function validateForm() {
    const emailValid = validateEmail(document.getElementById('email'));
    const passwordValid = validatePassword(document.getElementById('password'));
    
    return emailValid && passwordValid;
}

function showInputError(input, message) {
    const wrapper = input.closest('.input-wrapper');
    wrapper.classList.add('error');
    
    // Remove existing error message
    const existingError = wrapper.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
    
    // Add new error message
    const errorMessage = document.createElement('div');
    errorMessage.className = 'error-message';
    errorMessage.textContent = message;
    errorMessage.style.cssText = `
        color: #ff6b6b;
        font-size: 12px;
        margin-top: 5px;
        animation: slideInDown 0.3s ease;
    `;
    
    wrapper.appendChild(errorMessage);
}

function showInputSuccess(input) {
    const wrapper = input.closest('.input-wrapper');
    wrapper.classList.remove('error');
    
    // Remove error message
    const errorMessage = wrapper.querySelector('.error-message');
    if (errorMessage) {
        errorMessage.remove();
    }
}

function showLoadingState() {
    const loginBtn = document.querySelector('.login-btn');
    const btnText = loginBtn.querySelector('.btn-text');
    const btnIcon = loginBtn.querySelector('.btn-icon i');
    
    // Store original content
    loginBtn.dataset.originalText = btnText.textContent;
    loginBtn.dataset.originalIcon = btnIcon.className;
    
    // Show loading state
    btnText.textContent = 'Signing In...';
    btnIcon.className = 'fas fa-spinner fa-spin';
    loginBtn.disabled = true;
}

function hideLoadingState() {
    const loginBtn = document.querySelector('.login-btn');
    const btnText = loginBtn.querySelector('.btn-text');
    const btnIcon = loginBtn.querySelector('.btn-icon i');
    
    // Restore original content
    btnText.textContent = loginBtn.dataset.originalText;
    btnIcon.className = loginBtn.dataset.originalIcon;
    loginBtn.disabled = false;
}

function simulateLogin() {
    // Simulate API call
    setTimeout(() => {
        hideLoadingState();
        showSuccessMessage();
        
        // Redirect to main page after success
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 2000);
    }, 2000);
}

function showSuccessMessage() {
    // Create success notification
    const notification = document.createElement('div');
    notification.className = 'success-notification';
    notification.innerHTML = `
        <i class="fas fa-check-circle"></i>
        <span>Login successful! Redirecting...</span>
    `;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #4CAF50, #45a049);
        color: white;
        padding: 15px 25px;
        border-radius: 10px;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
        display: flex;
        align-items: center;
        gap: 10px;
        z-index: 1000;
        animation: slideInRight 0.5s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.5s ease';
        setTimeout(() => {
            notification.remove();
        }, 500);
    }, 3000);
}

// Social Login Buttons
function initSocialButtons() {
    const socialButtons = document.querySelectorAll('.social-btn');
    
    socialButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Add click animation
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
            
            // Simulate social login
            const provider = this.classList.contains('google-btn') ? 'Google' : 'GitHub';
            showSocialLoginMessage(provider);
        });
    });
}

function showSocialLoginMessage(provider) {
    const notification = document.createElement('div');
    notification.className = 'social-notification';
    notification.innerHTML = `
        <i class="fab fa-${provider.toLowerCase()}"></i>
        <span>Connecting to ${provider}...</span>
    `;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #667eea, #764ba2);
        color: white;
        padding: 15px 25px;
        border-radius: 10px;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
        display: flex;
        align-items: center;
        gap: 10px;
        z-index: 1000;
        animation: slideInRight 0.5s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Remove notification after 2 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.5s ease';
        setTimeout(() => {
            notification.remove();
        }, 500);
    }, 2000);
}

// Enhanced Animations
function initAnimations() {
    // Add hover effects to form elements
    const inputs = document.querySelectorAll('input');
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.style.transform = 'translateY(-2px)';
        });
        
        input.addEventListener('blur', function() {
            this.parentElement.style.transform = 'translateY(0)';
        });
    });
    
    // Add ripple effect to buttons
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            createRipple(e, this);
        });
    });
}

function createRipple(event, element) {
    const ripple = document.createElement('span');
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        background: rgba(255, 255, 255, 0.3);
        border-radius: 50%;
        transform: scale(0);
        animation: ripple 0.6s linear;
        pointer-events: none;
    `;
    
    element.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// Particle System
function initParticleSystem() {
    const particlesContainer = document.querySelector('.particles-container');
    
    // Create additional particles dynamically
    for (let i = 0; i < 5; i++) {
        createParticle(particlesContainer);
    }
    
    // Create new particles periodically
    setInterval(() => {
        createParticle(particlesContainer);
    }, 3000);
}

function createParticle(container) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    // Random position and animation
    const startX = Math.random() * window.innerWidth;
    const size = Math.random() * 3 + 2;
    const duration = Math.random() * 5 + 5;
    const delay = Math.random() * 2;
    
    particle.style.cssText = `
        left: ${startX}px;
        width: ${size}px;
        height: ${size}px;
        animation: particleFloat ${duration}s linear ${delay}s infinite;
    `;
    
    container.appendChild(particle);
    
    // Remove particle after animation
    setTimeout(() => {
        if (particle.parentNode) {
            particle.remove();
        }
    }, (duration + delay) * 1000);
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInDown {
        from {
            opacity: 0;
            transform: translateY(-10px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @keyframes slideInRight {
        from {
            opacity: 0;
            transform: translateX(100%);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    @keyframes slideOutRight {
        from {
            opacity: 1;
            transform: translateX(0);
        }
        to {
            opacity: 0;
            transform: translateX(100%);
        }
    }
    
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .input-wrapper.error input {
        border-color: #ff6b6b;
        box-shadow: 0 0 0 2px rgba(255, 107, 107, 0.2);
    }
    
    .input-wrapper.error .input-icon {
        color: #ff6b6b;
    }
`;
document.head.appendChild(style);

// Keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // Enter key to submit form
    if (e.key === 'Enter' && document.activeElement.tagName === 'INPUT') {
        const form = document.getElementById('loginForm');
        if (form) {
            form.dispatchEvent(new Event('submit'));
        }
    }
    
    // Escape key to clear form
    if (e.key === 'Escape') {
        const inputs = document.querySelectorAll('input');
        inputs.forEach(input => {
            input.value = '';
            input.blur();
        });
    }
});

// Accessibility improvements
function initAccessibility() {
    // Add ARIA labels
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const passwordToggle = document.getElementById('passwordToggle');
    
    if (emailInput) emailInput.setAttribute('aria-label', 'Email address');
    if (passwordInput) passwordInput.setAttribute('aria-label', 'Password');
    if (passwordToggle) passwordToggle.setAttribute('aria-label', 'Toggle password visibility');
    
    // Focus management
    const focusableElements = document.querySelectorAll('input, button, a');
    focusableElements.forEach(element => {
        element.addEventListener('keydown', function(e) {
            if (e.key === 'Tab') {
                // Handle tab navigation
                setTimeout(() => {
                    if (document.activeElement === this) {
                        this.style.outline = '2px solid rgba(255, 255, 255, 0.5)';
                        this.style.outlineOffset = '2px';
                    }
                }, 0);
            }
        });
        
        element.addEventListener('blur', function() {
            this.style.outline = '';
        });
    });
}

// Initialize accessibility
initAccessibility(); 