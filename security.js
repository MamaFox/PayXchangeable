/**
 * PayXchangeable Security Module
 * 
 * This module implements client-side security features for PayXchangeable,
 * including CSRF protection, input validation, and secure authentication.
 */

// Initialize security module
const PayXcSecurity = (function() {
  'use strict';
  
  // Token for CSRF protection
  let csrfToken = '';
  
  // Initialize security features
  function init() {
    console.log('Initializing PayXchangeable security...');
    fetchCsrfToken();
    setupFormValidation();
    monitorSessionActivity();
    setSecureHeaders();
    enableContentSecurity();
  }
  
  /**
   * Fetch CSRF token from server
   */
  function fetchCsrfToken() {
    // Fetch CSRF token from the server
    fetch('/api/csrf-token')
      .then(response => response.json())
      .then(data => {
        if (data.csrfToken) {
          csrfToken = data.csrfToken;
          console.log('CSRF protection enabled');
        }
      })
      .catch(error => {
        console.error('Failed to fetch CSRF token:', error);
      });
  }
  
  /**
   * Add CSRF token to requests
   * @param {Object} options - Fetch options
   * @returns {Object} Updated fetch options
   */
  function addCsrfToken(options = {}) {
    if (!options.headers) {
      options.headers = {};
    }
    
    // Add CSRF token to headers
    if (csrfToken) {
      options.headers['X-CSRF-Token'] = csrfToken;
    }
    
    return options;
  }
  
  /**
   * Secure fetch wrapper
   * @param {string} url - URL to fetch
   * @param {Object} options - Fetch options
   * @returns {Promise} Fetch promise
   */
  function secureFetch(url, options = {}) {
    options = addCsrfToken(options);
    
    // Add security headers
    if (!options.headers) {
      options.headers = {};
    }
    
    // Add credentials to include cookies
    options.credentials = 'same-origin';
    
    return fetch(url, options)
      .then(response => {
        // Check for session expiration
        if (response.status === 401) {
          // Redirect to login page if session expired
          window.location.href = '/login.html?session=expired';
          return Promise.reject(new Error('Session expired'));
        }
        
        // Check for CSRF error
        if (response.status === 403 && response.headers.get('X-CSRF-Error')) {
          // Refresh CSRF token and retry the request
          return fetch('/api/csrf-token')
            .then(res => res.json())
            .then(data => {
              csrfToken = data.csrfToken;
              options.headers['X-CSRF-Token'] = csrfToken;
              return fetch(url, options);
            });
        }
        
        return response;
      });
  }
  
  /**
   * Set up input validation for forms
   */
  function setupFormValidation() {
    // Find all forms
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
      form.addEventListener('submit', function(event) {
        // Validate form inputs
        if (!validateForm(this)) {
          event.preventDefault();
          return false;
        }
        
        // Add CSRF token to form if it doesn't have one
        if (!this.querySelector('input[name="_csrf"]') && csrfToken) {
          const csrfInput = document.createElement('input');
          csrfInput.type = 'hidden';
          csrfInput.name = '_csrf';
          csrfInput.value = csrfToken;
          this.appendChild(csrfInput);
        }
      });
    });
  }
  
  /**
   * Validate form inputs
   * @param {HTMLFormElement} form - Form to validate
   * @returns {boolean} True if form is valid
   */
  function validateForm(form) {
    let isValid = true;
    
    // Get all inputs
    const inputs = form.querySelectorAll('input, textarea, select');
    
    inputs.forEach(input => {
      // Skip submit buttons and hidden fields
      if (input.type === 'submit' || input.type === 'hidden') {
        return;
      }
      
      // Check for XSS attempts
      if (containsXss(input.value)) {
        markInvalid(input, 'Invalid characters detected');
        isValid = false;
        return;
      }
      
      // Validate based on input type
      switch (input.type) {
        case 'email':
          if (!validateEmail(input.value)) {
            markInvalid(input, 'Please enter a valid email address');
            isValid = false;
          }
          break;
          
        case 'password':
          if (input.dataset.validateStrength && !validatePasswordStrength(input.value)) {
            markInvalid(input, 'Password must be at least 12 characters with uppercase, lowercase, number, and special character');
            isValid = false;
          }
          break;
          
        case 'number':
          if (isNaN(input.value) || input.value === '') {
            markInvalid(input, 'Please enter a valid number');
            isValid = false;
          }
          break;
          
        case 'tel':
          if (!validatePhone(input.value)) {
            markInvalid(input, 'Please enter a valid phone number');
            isValid = false;
          }
          break;
      }
      
      // Check required fields
      if (input.required && (input.value === '' || input.value === null)) {
        markInvalid(input, 'This field is required');
        isValid = false;
      }
    });
    
    return isValid;
  }
  
  /**
   * Mark an input as invalid
   * @param {HTMLElement} input - Input element
   * @param {string} message - Error message
   */
  function markInvalid(input, message) {
    input.classList.add('is-invalid');
    
    // Find or create error message element
    let errorElement = input.parentNode.querySelector('.error-message');
    
    if (!errorElement) {
      errorElement = document.createElement('div');
      errorElement.className = 'error-message';
      input.parentNode.appendChild(errorElement);
    }
    
    errorElement.textContent = message;
    
    // Clear error on input
    input.addEventListener('input', function() {
      this.classList.remove('is-invalid');
      if (errorElement) {
        errorElement.textContent = '';
      }
    }, { once: true });
  }
  
  /**
   * Validate email format
   * @param {string} email - Email to validate
   * @returns {boolean} True if email is valid
   */
  function validateEmail(email) {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(String(email).toLowerCase());
  }
  
  /**
   * Validate phone number format
   * @param {string} phone - Phone number to validate
   * @returns {boolean} True if phone is valid
   */
  function validatePhone(phone) {
    // Basic validation - should be enhanced for international numbers
    const re = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/;
    return re.test(String(phone));
  }
  
  /**
   * Validate password strength
   * @param {string} password - Password to validate
   * @returns {boolean} True if password is strong
   */
  function validatePasswordStrength(password) {
    // Check minimum length
    if (password.length < 12) {
      return false;
    }
    
    // Check for uppercase, lowercase, number, and special character
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecial = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password);
    
    return hasUppercase && hasLowercase && hasNumber && hasSpecial;
  }
  
  /**
   * Check if a string contains XSS attempts
   * @param {string} str - String to check
   * @returns {boolean} True if XSS is detected
   */
  function containsXss(str) {
    if (typeof str !== 'string') return false;
    
    // Common XSS patterns to detect
    const xssPatterns = [
      /<script\b[^>]*>([\s\S]*?)<\/script>/i,
      /javascript:/i,
      /onerror=/i,
      /onclick=/i,
      /eval\([^\)]*\)/i
    ];
    
    return xssPatterns.some(pattern => pattern.test(str));
  }
  
  /**
   * Monitor session activity
   */
  function monitorSessionActivity() {
    let lastActivity = Date.now();
    const sessionTimeout = 30 * 60 * 1000; // 30 minutes
    
    // Update last activity time on user interaction
    ['mousedown', 'keypress', 'scroll', 'touchstart'].forEach(event => {
      document.addEventListener(event, () => {
        lastActivity = Date.now();
      });
    });
    
    // Check session activity periodically
    setInterval(() => {
      const now = Date.now();
      const inactiveTime = now - lastActivity;
      
      // If inactive for too long, warn user
      if (inactiveTime > sessionTimeout - (2 * 60 * 1000)) { // 2 minutes before timeout
        showSessionWarning();
      }
      
      // If session expired, redirect to login
      if (inactiveTime > sessionTimeout) {
        window.location.href = '/login.html?session=timeout';
      }
    }, 60 * 1000); // Check every minute
  }
  
  /**
   * Show session timeout warning
   */
  function showSessionWarning() {
    // Create warning element if it doesn't exist
    if (!document.getElementById('session-warning')) {
      const warning = document.createElement('div');
      warning.id = 'session-warning';
      warning.className = 'session-warning';
      warning.innerHTML = `
        <div class="session-warning-content">
          <h3>Session Expiring Soon</h3>
          <p>Your session will expire in 2 minutes due to inactivity.</p>
          <button id="extend-session">Continue Session</button>
        </div>
      `;
      
      document.body.appendChild(warning);
      
      // Add event listener to extend session
      document.getElementById('extend-session').addEventListener('click', () => {
        // Extend session
        fetch('/api/extend-session', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-CSRF-Token': csrfToken
          },
          credentials: 'same-origin'
        })
        .then(() => {
          // Update last activity time
          lastActivity = Date.now();
          // Remove warning
          document.getElementById('session-warning').remove();
        })
        .catch(error => console.error('Failed to extend session:', error));
      });
    }
  }
  
  /**
   * Set secure headers for content
   */
  function setSecureHeaders() {
    // This is just a placeholder as headers are set by the server
    // Client-side JavaScript cannot set HTTP headers
    console.log('Secure headers enabled on server');
  }
  
  /**
   * Enable Content Security Policy
   */
  function enableContentSecurity() {
    // This is applied via HTTP headers from the server
    // We can report CSP violations here if needed
    window.addEventListener('securitypolicyviolation', (e) => {
      console.error('CSP violation:', e.blockedURI, e.violatedDirective);
      
      // Report violation to server
      fetch('/api/csp-report', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          blockedURI: e.blockedURI,
          violatedDirective: e.violatedDirective,
          documentURI: e.documentURI
        })
      }).catch(err => console.error('Failed to report CSP violation:', err));
    });
  }
  
  // Public API
  return {
    init: init,
    secureFetch: secureFetch,
    validateForm: validateForm,
    validatePasswordStrength: validatePasswordStrength,
    validateEmail: validateEmail
  };
})();

// Initialize security module when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
  PayXcSecurity.init();
  
  // Make PayXcSecurity available globally
  window.PayXcSecurity = PayXcSecurity;
});