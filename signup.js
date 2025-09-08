document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initPasswordToggles();
    initFormValidation();
    initSocialButtons();
    initAnimations();
    initCosmicEffects();
    initPasswordStrength();
});

// Password Toggle Functionality
function initPasswordToggles() {
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirmPassword');
    const passwordToggle = document.getElementById('passwordToggle');
    const confirmPasswordToggle = document.getElementById('confirmPasswordToggle');

    // Password toggle
    passwordToggle.addEventListener('click', function() {
        togglePasswordVisibility(passwordInput, passwordToggle);
    });

    // Confirm password toggle
    confirmPasswordToggle.addEventListener('click', function() {
        togglePasswordVisibility(confirmPasswordInput, confirmPasswordToggle);
    });
}

function togglePasswordVisibility(input, toggle) {
    const toggleIcon = toggle.querySelector('i');
    
    if (input.type === 'password') {
        input.type = 'text';
        toggleIcon.classList.remove('fa-eye');
        toggleIcon.classList.add('fa-eye-slash');
    } else {
        input.type = 'password';
        toggleIcon.classList.remove('fa-eye-slash');
        toggleIcon.classList.add('fa-eye');
    }
}

// Form Validation and Submission
function initFormValidation() {
    const signupForm = document.getElementById('signupForm');
    const firstNameInput = document.getElementById('firstName');
    const lastNameInput = document.getElementById('lastName');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirmPassword');
    const termsCheckbox = document.getElementById('terms');

    // Real-time validation
    firstNameInput.addEventListener('input', function() {
        validateName(this, 'First name');
    });

    lastNameInput.addEventListener('input', function() {
        validateName(this, 'Last name');
    });

    emailInput.addEventListener('input', function() {
        validateEmail(this);
    });

    passwordInput.addEventListener('input', function() {
        validatePassword(this);
        updatePasswordStrength(this.value);
    });

    confirmPasswordInput.addEventListener('input', function() {
        validateConfirmPassword(this, passwordInput.value);
    });

    // Form submission
    signupForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (validateForm()) {
            showLoadingState();
            simulateSignup();
        }
    });
}

// function validateName(input, fieldName) {
//     const name = input.value.trim();
    
//     if (name === '') {
//         showInputError(input, `${fieldName} is required`);
//         return false;
//     } else if (name.length < 2) {
//         showInputError(input, `${fieldName} must be at least 2 characters`);
//         return false;
//     } else if (!/^[a-zA-Z\s]+$/.test(name)) {
//         showInputError(input, `${fieldName} can only contain letters and spaces`);
//         return false;
//     } else {
//         showInputSuccess(input);
//         return true;
//     }
// }

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
    } else if (password.length < 8) {
        showInputError(input, 'Password must be at least 8 characters');
        return false;
    } else if (!/(?=.*[a-z])/.test(password)) {
        showInputError(input, 'Password must contain at least one lowercase letter');
        return false;
    } else if (!/(?=.*[A-Z])/.test(password)) {
        showInputError(input, 'Password must contain at least one uppercase letter');
        return false;
    } else if (!/(?=.*\d)/.test(password)) {
        showInputError(input, 'Password must contain at least one number');
        return false;
    } else {
        showInputSuccess(input);
        return true;
    }
}

function validateConfirmPassword(input, password) {
    const confirmPassword = input.value;
    
    if (confirmPassword === '') {
        showInputError(input, 'Please confirm your password');
        return false;
    } else if (confirmPassword !== password) {
        showInputError(input, 'Passwords do not match');
        return false;
    } else {
        showInputSuccess(input);
        return true;
    }
}

function validateForm() {
    const firstNameValid = validateName(document.getElementById('firstName'), 'First name');
    const lastNameValid = validateName(document.getElementById('lastName'), 'Last name');
    const emailValid = validateEmail(document.getElementById('email'));
    const passwordValid = validatePassword(document.getElementById('password'));
    const confirmPasswordValid = validateConfirmPassword(document.getElementById('confirmPassword'), document.getElementById('password').value);
    const termsAccepted = document.getElementById('terms').checked;
    
    if (!termsAccepted) {
        showTermsError();
        return false;
    }
    
    return firstNameValid && lastNameValid && emailValid && passwordValid && confirmPasswordValid;
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

function showTermsError() {
    const notification = document.createElement('div');
    notification.className = 'terms-error';
    notification.innerHTML = `
        <i class="fas fa-exclamation-triangle"></i>
        <span>Please accept the Terms & Conditions to continue</span>
    `;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #ff6b6b, #ee5a52);
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

// Password Strength Indicator
function initPasswordStrength() {
    const passwordInput = document.getElementById('password');
    
    // Create strength indicator
    const strengthIndicator = document.createElement('div');
    strengthIndicator.className = 'password-strength';
    strengthIndicator.innerHTML = `
        <div class="strength-bar">
            <div class="strength-fill"></div>
        </div>
        <span class="strength-text">Password strength</span>
    `;
    strengthIndicator.style.cssText = `
        margin-top: 10px;
        font-size: 12px;
        color: rgba(255, 255, 255, 0.7);
    `;
    
    const strengthBar = strengthIndicator.querySelector('.strength-fill');
    const strengthText = strengthIndicator.querySelector('.strength-text');
    
    strengthBar.style.cssText = `
        width: 0%;
        height: 4px;
        background: linear-gradient(90deg, #ff6b6b, #ffa500, #ffff00, #90EE90, #00ff00);
        border-radius: 2px;
        transition: width 0.3s ease;
    `;
    
    passwordInput.parentElement.appendChild(strengthIndicator);
    
    // Initially hide the indicator
    strengthIndicator.style.display = 'none';
    
    // Show indicator when user starts typing
    passwordInput.addEventListener('focus', function() {
        strengthIndicator.style.display = 'block';
    });
}

function updatePasswordStrength(password) {
    const strengthIndicator = document.querySelector('.password-strength');
    const strengthBar = strengthIndicator.querySelector('.strength-fill');
    const strengthText = strengthIndicator.querySelector('.strength-text');
    
    let strength = 0;
    let strengthLabel = '';
    let strengthColor = '';
    
    if (password.length >= 8) strength += 20;
    if (/[a-z]/.test(password)) strength += 20;
    if (/[A-Z]/.test(password)) strength += 20;
    if (/\d/.test(password)) strength += 20;
    if (/[^A-Za-z0-9]/.test(password)) strength += 20;
    
    if (strength <= 20) {
        strengthLabel = 'Very Weak';
        strengthColor = '#ff6b6b';
    } else if (strength <= 40) {
        strengthLabel = 'Weak';
        strengthColor = '#ffa500';
    } else if (strength <= 60) {
        strengthLabel = 'Fair';
        strengthColor = '#ffff00';
    } else if (strength <= 80) {
        strengthLabel = 'Good';
        strengthColor = '#90EE90';
    } else {
        strengthLabel = 'Strong';
        strengthColor = '#00ff00';
    }
    
    strengthBar.style.width = strength + '%';
    strengthText.textContent = `Password strength: ${strengthLabel}`;
    strengthText.style.color = strengthColor;
}

function showLoadingState() {
    const signupBtn = document.querySelector('.signup-btn');
    const btnText = signupBtn.querySelector('.btn-text');
    const btnIcon = signupBtn.querySelector('.btn-icon i');
    
    // Store original content
    signupBtn.dataset.originalText = btnText.textContent;
    signupBtn.dataset.originalIcon = btnIcon.className;
    
    // Show loading state
    btnText.textContent = 'Creating Account...';
    btnIcon.className = 'fas fa-spinner fa-spin';
    signupBtn.disabled = true;
}

function hideLoadingState() {
    const signupBtn = document.querySelector('.signup-btn');
    const btnText = signupBtn.querySelector('.btn-text');
    const btnIcon = signupBtn.querySelector('.btn-icon i');
    
    // Restore original content
    btnText.textContent = signupBtn.dataset.originalText;
    btnIcon.className = signupBtn.dataset.originalIcon;
    signupBtn.disabled = false;
}

function simulateSignup() {
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
        <i class="fas fa-rocket"></i>
        <span>Account created successfully! Launching...</span>
    `;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #8A2BE2, #4B0082);
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

// Social Signup Buttons
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
            
            // Simulate social signup
            const provider = this.classList.contains('google-btn') ? 'Google' : 
                           this.classList.contains('github-btn') ? 'GitHub' : 'Facebook';
            showSocialSignupMessage(provider);
        });
    });
}

function showSocialSignupMessage(provider) {
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
        background: linear-gradient(135deg, #8A2BE2, #4B0082);
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

// Cosmic Effects
function initCosmicEffects() {
    // Create additional cosmic particles dynamically
    const cosmicParticles = document.querySelector('.cosmic-particles');
    
    for (let i = 0; i < 5; i++) {
        createCosmicParticle(cosmicParticles);
    }
    
    // Create new particles periodically
    setInterval(() => {
        createCosmicParticle(cosmicParticles);
    }, 4000);
}

function createCosmicParticle(container) {
    const particle = document.createElement('div');
    particle.className = 'cosmic-particle';
    
    // Random position and animation
    const startX = Math.random() * window.innerWidth;
    const size = Math.random() * 4 + 2;
    const duration = Math.random() * 8 + 8;
    const delay = Math.random() * 3;
    
    particle.style.cssText = `
        left: ${startX}px;
        width: ${size}px;
        height: ${size}px;
        animation: cosmicParticleFloat ${duration}s linear ${delay}s infinite;
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
        const form = document.getElementById('signupForm');
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
    const inputs = document.querySelectorAll('input');
    inputs.forEach(input => {
        input.setAttribute('aria-label', input.placeholder);
    });
    
    const passwordToggles = document.querySelectorAll('.password-toggle');
    passwordToggles.forEach(toggle => {
        toggle.setAttribute('aria-label', 'Toggle password visibility');
    });
    
    // Focus management
    const focusableElements = document.querySelectorAll('input, button, a');
    focusableElements.forEach(element => {
        element.addEventListener('keydown', function(e) {
            if (e.key === 'Tab') {
                // Handle tab navigation
                setTimeout(() => {
                    if (document.activeElement === this) {
                        this.style.outline = '2px solid rgba(138, 43, 226, 0.5)';
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