/**
 * PayXchangeable Support Bot Frontend Integration
 * 
 * This script handles the frontend integration with the support bot,
 * providing an interface for users to submit support requests.
 */

document.addEventListener('DOMContentLoaded', function() {
  // Create support bot button and add to the page
  createSupportButton();
  
  // Add event listener to contact forms if they exist
  const contactForms = document.querySelectorAll('.contact-form');
  if (contactForms.length > 0) {
    contactForms.forEach(form => {
      form.addEventListener('submit', handleContactFormSubmit);
    });
  }
});

/**
 * Create a floating support and settings button container
 */
function createSupportButton() {
  const buttonContainer = document.createElement('div');
  buttonContainer.className = 'support-buttons-container';
  buttonContainer.innerHTML = `
    <div class="button-wrapper">
      <button class="btn support-chat-btn" title="Get Support">
        <span class="icon-wrapper"><i class="bi bi-chat-fill"></i></span>
      </button>
      <button class="btn settings-btn" title="Settings">
        <span class="icon-wrapper"><i class="bi bi-gear-fill"></i></span>
      </button>
    </div>
  `;
  document.body.appendChild(buttonContainer);
  
  // Add click handler to open support dialog
  const supportChatBtn = buttonContainer.querySelector('.support-chat-btn');
  supportChatBtn.addEventListener('click', openSupportDialog);
  
  // Add click handler for settings button (placeholder for future functionality)
  const settingsBtn = buttonContainer.querySelector('.settings-btn');
  settingsBtn.addEventListener('click', function() {
    // Placeholder for settings functionality
    alert("Settings functionality coming soon!");
  });
  
  // Add styling for the buttons
  const style = document.createElement('style');
  style.textContent = `
    .support-buttons-container {
      position: fixed;
      bottom: 20px;
      right: 20px;
      z-index: 1000;
      width: 120px;
    }
    
    .button-wrapper {
      display: flex;
      width: 100%;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      border-radius: 8px;
      overflow: hidden;
    }
    
    .support-chat-btn, .settings-btn {
      width: 60px;
      height: 48px;
      margin: 0;
      padding: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.3s ease;
      border: none;
      flex: 1;
    }
    
    .support-chat-btn {
      background-color: #32127A;
      color: white;
      border-right: 1px solid rgba(255,255,255,0.2);
    }
    
    .settings-btn {
      background-color: #32127A;
      color: white;
    }
    
    .support-chat-btn:hover, .settings-btn:hover {
      background-color: #4A1BA3;
    }
    
    .icon-wrapper {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 100%;
    }
    
    .support-buttons-container i {
      font-size: 20px;
    }
    
    .support-dialog {
      position: fixed;
      bottom: 90px;
      right: 20px;
      width: 350px;
      background-color: white;
      border-radius: 10px;
      box-shadow: 0 4px 15px rgba(0,0,0,0.15);
      z-index: 1000;
      overflow: hidden;
      display: none;
    }
    
    .support-dialog-header {
      background-color: #32127A;
      color: white;
      padding: 15px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    
    .support-dialog-body {
      padding: 20px;
    }
    
    .support-dialog-footer {
      padding: 15px;
      border-top: 1px solid #eee;
      text-align: right;
    }
    
    .success-message {
      display: none;
      text-align: center;
      padding: 20px;
    }
    
    .success-icon {
      font-size: 48px;
      color: #28a745;
      margin-bottom: 15px;
    }
  `;
  document.head.appendChild(style);
}

/**
 * Open the support dialog
 */
function openSupportDialog() {
  // Remove any existing dialog
  const existingDialog = document.querySelector('.support-dialog');
  if (existingDialog) {
    existingDialog.remove();
  }
  
  // Create dialog element
  const dialog = document.createElement('div');
  dialog.className = 'support-dialog';
  dialog.innerHTML = `
    <div class="support-dialog-header">
      <h5 class="m-0">PayXchangeable Support</h5>
      <button type="button" class="btn-close btn-close-white" aria-label="Close"></button>
    </div>
    <div class="support-dialog-body">
      <form id="supportForm">
        <div class="mb-3">
          <label for="supportEmail" class="form-label">Email address</label>
          <input type="email" class="form-control" id="supportEmail" required>
        </div>
        <div class="mb-3">
          <label for="supportSubject" class="form-label">Subject</label>
          <input type="text" class="form-control" id="supportSubject" required>
        </div>
        <div class="mb-3">
          <label for="supportMessage" class="form-label">Message</label>
          <textarea class="form-control" id="supportMessage" rows="4" required></textarea>
        </div>
      </form>
      <div class="success-message">
        <div class="success-icon">
          <i class="bi bi-check-circle-fill"></i>
        </div>
        <h5>Thank you for your message!</h5>
        <p>Our support bot will respond to your inquiry shortly.</p>
        <p class="small text-muted">For complex issues, a team member may follow up directly.</p>
      </div>
    </div>
    <div class="support-dialog-footer">
      <button type="button" class="btn btn-secondary me-2" id="cancelSupportBtn">Cancel</button>
      <button type="button" class="btn btn-primary" id="submitSupportBtn">Send Message</button>
    </div>
  `;
  
  document.body.appendChild(dialog);
  
  // Show the dialog with a fade-in effect
  setTimeout(() => {
    dialog.style.display = 'block';
  }, 50);
  
  // Add event listeners
  document.querySelector('.btn-close').addEventListener('click', () => {
    closeDialog(dialog);
  });
  
  document.getElementById('cancelSupportBtn').addEventListener('click', () => {
    closeDialog(dialog);
  });
  
  document.getElementById('submitSupportBtn').addEventListener('click', () => {
    submitSupportRequest(dialog);
  });
}

/**
 * Close the support dialog
 * @param {HTMLElement} dialog - The dialog element
 */
function closeDialog(dialog) {
  dialog.style.opacity = '0';
  setTimeout(() => {
    dialog.remove();
  }, 300);
}

/**
 * Submit a support request
 * @param {HTMLElement} dialog - The dialog element
 */
function submitSupportRequest(dialog) {
  const email = document.getElementById('supportEmail').value;
  const subject = document.getElementById('supportSubject').value;
  const message = document.getElementById('supportMessage').value;
  
  if (!email || !subject || !message) {
    alert('Please fill in all fields');
    return;
  }
  
  // Make the actual API call to the support bot endpoint
  console.log('Sending support request to support bot');
  
  fetch('/api/support', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, subject, message }),
  })
  .then(response => response.json())
  .then(data => {
    if (data.success) {
      // Hide the form and show success message
      dialog.querySelector('form').style.display = 'none';
      dialog.querySelector('.success-message').style.display = 'block';
      
      // Change footer
      dialog.querySelector('.support-dialog-footer').innerHTML = `
        <button type="button" class="btn btn-primary" id="closeSupportBtn">Close</button>
      `;
      
      // Add event listener to close button
      document.getElementById('closeSupportBtn').addEventListener('click', () => {
        closeDialog(dialog);
      });
      
      // Auto-close after 5 seconds
      setTimeout(() => {
        closeDialog(dialog);
      }, 5000);
    } else {
      alert('An error occurred. Please try again later.');
    }
  })
  .catch(error => {
    console.error('Error:', error);
    alert('An error occurred. Please try again later.');
  });
  
  // Previous implementation with simulation:
  /*
  fetch('/api/support', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, subject, message }),
  })
  .then(response => response.json())
  .then(data => {
    if (data.success) {
      // Hide the form and show success message
      dialog.querySelector('form').style.display = 'none';
      dialog.querySelector('.success-message').style.display = 'block';
      
      // Change footer
      dialog.querySelector('.support-dialog-footer').innerHTML = `
        <button type="button" class="btn btn-primary" id="closeSupportBtn">Close</button>
      `;
      
      // Add event listener to close button
      document.getElementById('closeSupportBtn').addEventListener('click', () => {
        closeDialog(dialog);
      });
      
      // Auto-close after 5 seconds
      setTimeout(() => {
        closeDialog(dialog);
      }, 5000);
    } else {
      alert('An error occurred. Please try again later.');
    }
  })
  .catch(error => {
    console.error('Error:', error);
    alert('An error occurred. Please try again later.');
  });
  */
}

/**
 * Handle submission of contact forms
 * @param {Event} event - The form submission event
 */
function handleContactFormSubmit(event) {
  event.preventDefault();
  
  const form = event.target;
  const formData = new FormData(form);
  
  const email = formData.get('email');
  const subject = formData.get('subject') || 'Contact Form Submission';
  const message = formData.get('message');
  
  if (!email || !message) {
    alert('Please fill in all required fields');
    return;
  }
  
  // Make the actual API call to the support bot endpoint
  console.log('Sending contact form to support bot');
  
  fetch('/api/support', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, subject, message }),
  })
  .then(response => response.json())
  .then(data => {
    if (data.success) {
      // Show success message
      const submitButton = form.querySelector('button[type="submit"]');
      const originalText = submitButton.textContent;
      submitButton.disabled = true;
      submitButton.innerHTML = '<i class="bi bi-check-circle-fill"></i> Message Sent!';
      
      // Reset form after delay
      setTimeout(() => {
        form.reset();
        submitButton.disabled = false;
        submitButton.textContent = originalText;
      }, 3000);
    } else {
      alert('An error occurred. Please try again later.');
    }
  })
  .catch(error => {
    console.error('Error:', error);
    alert('An error occurred. Please try again later.');
  });
  
  // Previous implementation with simulation:
  /*
  fetch('/api/support', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, subject, message }),
  })
  .then(response => response.json())
  .then(data => {
    if (data.success) {
      // Show success message
      const submitButton = form.querySelector('button[type="submit"]');
      const originalText = submitButton.textContent;
      submitButton.disabled = true;
      submitButton.innerHTML = '<i class="bi bi-check-circle-fill"></i> Message Sent!';
      
      // Reset form after delay
      setTimeout(() => {
        form.reset();
        submitButton.disabled = false;
        submitButton.textContent = originalText;
      }, 3000);
    } else {
      alert('An error occurred. Please try again later.');
    }
  })
  .catch(error => {
    console.error('Error:', error);
    alert('An error occurred. Please try again later.');
  });
  */
}