/**
 * PayXchangeable - My Account JavaScript
 * 
 * This file handles the functionality for the My Account page,
 * including platform management, transactions, and digital debit cards.
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize data
    initializeData();
    
    // Set up navigation
    setupNavigation();
    
    // Initialize digital cards
    initializeDigitalCards();
    
    // Initialize platform functionality
    initializePlatformFunctionality();
    
    // Initialize transaction display
    initializeTransactions();
    
    // Quick transfer functionality
    initializeQuickTransfer();
    
    // Initialize card modals
    initializeCardModals();
});

// Demo data for user account
let accountData = {
    user: {
        id: 1,
        name: 'User Account',
        email: 'account@example.com',
        phone: '(555) 123-4567'
    },
    platforms: {
        ebt: {
            name: 'EBT Cash Benefits',
            connected: true,
            balance: 450.75,
            cardNumber: '**** **** **** 5678',
            lastUpdated: new Date().toISOString()
        },
        paypal: {
            name: 'PayPal',
            connected: true,
            balance: 325.50,
            email: 'user****@example.com',
            lastUpdated: new Date().toISOString()
        },
        zelle: {
            name: 'Zelle',
            connected: true,
            balance: 210.25,
            phone: '(***) *** - 5678',
            lastUpdated: new Date().toISOString()
        },
        venmo: {
            name: 'Venmo',
            connected: false
        },
        cashapp: {
            name: 'Cash App',
            connected: false
        },
        applecash: {
            name: 'Apple Cash',
            connected: false
        },
        fxams: {
            name: 'FXAMS Cryptocurrency',
            connected: true,
            balance: 250.00,
            walletAddress: 'fxm1qxy2gpfgx2wlzzvsn85a90v4wys7a9xdlnvnpgd',
            lastUpdated: new Date().toISOString()
        }
    },
    transactions: [
        {
            id: 1,
            date: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
            source: 'ebt',
            destination: 'zelle',
            description: 'Transfer to Zelle',
            amount: 150.00,
            fee: 1.35, // EBT gets 10% discount on standard 1% fee
            status: 'completed'
        },
        {
            id: 2,
            date: new Date(Date.now() - 14 * 60 * 60 * 1000).toISOString(),
            source: 'paypal',
            destination: 'fxams',
            description: 'FXAMS Cryptocurrency Purchase',
            amount: 100.00,
            fee: 0.50, // 0.5% for investment/crypto transfers
            status: 'completed'
        },
        {
            id: 3,
            date: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
            source: 'paypal',
            destination: 'utility',
            description: 'Electricity Bill Payment',
            amount: 75.50,
            fee: 0.76, // Standard 1% fee
            status: 'completed'
        },
        {
            id: 4,
            date: new Date(Date.now() - 25 * 60 * 60 * 1000).toISOString(),
            source: 'ebt',
            destination: 'unknown',
            description: 'EBT Transfer',
            amount: 50.00,
            fee: 0.45, // EBT gets 10% discount on standard 1% fee
            status: 'refund_pending'
        }
    ],
    digitalCards: [
        {
            id: 1,
            name: 'EBT Digital Card',
            platform: 'ebt',
            cardNumber: '4532 1111 2222 5678',
            expiry: '05/28',
            cvv: '123',
            cardHolder: 'EBT CARDHOLDER',
            billingAddress: '123 Main St, Anytown, US 12345',
            status: 'active',
            settings: {
                onlineTransactions: true,
                internationalTransactions: false,
                transactionLimit: 1000
            }
        },
        {
            id: 2,
            name: 'PayPal Digital Card',
            platform: 'paypal',
            cardNumber: '4111 2222 3333 4321',
            expiry: '08/27',
            cvv: '456',
            cardHolder: 'PAYPAL USER',
            billingAddress: '123 Main St, Anytown, US 12345',
            status: 'active',
            settings: {
                onlineTransactions: true,
                internationalTransactions: false,
                transactionLimit: 1000
            }
        }
    ],
    activityLog: [
        {
            id: 1,
            type: 'login',
            description: 'Account Login',
            details: 'You logged in successfully from Chrome on Windows',
            ipAddress: '192.168.1.***',
            location: 'Your usual location',
            timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString()
        },
        {
            id: 2,
            type: 'transfer',
            description: 'Transfer Completed',
            details: 'You transferred $150.00 from EBT Cash to Zelle with a $1.35 fee (10% discount applied)',
            transactionId: '987654321',
            timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString()
        },
        {
            id: 3,
            type: 'platform',
            description: 'Platform Connected',
            details: 'You connected your FXAMS Cryptocurrency wallet',
            platformDetails: 'Wallet: fxm1q***xdlnvnpgd',
            timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString()
        },
        {
            id: 4,
            type: 'transfer',
            description: 'Crypto Purchase',
            details: 'You purchased $100.00 of FXAMS cryptocurrency from PayPal with a $0.50 fee',
            transactionId: '987654322',
            timestamp: new Date(Date.now() - 14 * 60 * 60 * 1000).toISOString()
        },
        {
            id: 5,
            type: 'platform',
            description: 'Platform Connected',
            details: 'You connected your PayPal account',
            platformDetails: 'Email: user****@example.com',
            timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()
        },
        {
            id: 6,
            type: 'settings',
            description: 'Settings Changed',
            details: 'You updated your notification preferences',
            timestamp: new Date(Date.now() - 26 * 60 * 60 * 1000).toISOString()
        },
        {
            id: 7,
            type: 'transfer',
            description: 'Refund Requested',
            details: 'You requested a refund for a $75.00 transfer from EBT Cash',
            reason: 'Exceeded Budget',
            timestamp: new Date(Date.now() - 27 * 60 * 60 * 1000).toISOString()
        }
    ]
};

// Initialize data
function initializeData() {
    // Load data from localStorage if available
    const savedData = localStorage.getItem('payxchangeable_account_data');
    if (savedData) {
        try {
            accountData = JSON.parse(savedData);
        } catch (error) {
            console.error('Error parsing saved data:', error);
            // Continue with default data
        }
    }
    
    // Update UI with current data
    updateBalanceDisplays();
    updatePlatformBadges();
}

// Save data to localStorage
function saveData() {
    localStorage.setItem('payxchangeable_account_data', JSON.stringify(accountData));
}

// Set up navigation
function setupNavigation() {
    // Sidebar links
    const sidebarLinks = document.querySelectorAll('.sidebar-link');
    sidebarLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            if (this.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                const section = this.getAttribute('data-section');
                if (section) {
                    showSection(section);
                    
                    // Update active state
                    sidebarLinks.forEach(link => link.classList.remove('active'));
                    this.classList.add('active');
                }
            }
        });
    });
    
    // In-page navigation
    const inPageLinks = document.querySelectorAll('.sidebar-nav');
    inPageLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const section = this.getAttribute('data-section');
            if (section) {
                showSection(section);
                
                // Update active state on sidebar
                sidebarLinks.forEach(link => {
                    if (link.getAttribute('data-section') === section) {
                        link.classList.add('active');
                    } else {
                        link.classList.remove('active');
                    }
                });
            }
        });
    });
}

// Show a specific section
function showSection(sectionId) {
    // Hide all sections
    const sections = document.querySelectorAll('.account-section');
    sections.forEach(section => section.classList.add('d-none'));
    
    // Show the requested section
    const sectionToShow = document.getElementById(`${sectionId}-section`);
    if (sectionToShow) {
        sectionToShow.classList.remove('d-none');
    }
}

// Update balance displays
function updateBalanceDisplays() {
    // Update platform balances
    const balanceElements = document.querySelectorAll('.platform-balance');
    balanceElements.forEach(element => {
        const platform = element.getAttribute('data-platform');
        if (platform && accountData.platforms[platform] && accountData.platforms[platform].connected) {
            element.textContent = `$${accountData.platforms[platform].balance.toFixed(2)}`;
        }
    });
    
    // Update total balance
    const totalBalance = Object.values(accountData.platforms)
        .filter(platform => platform.connected)
        .reduce((sum, platform) => sum + (platform.balance || 0), 0);
    
    const totalBalanceElement = document.getElementById('total-balance');
    if (totalBalanceElement) {
        totalBalanceElement.textContent = `$${totalBalance.toFixed(2)}`;
    }
    
    // Update platform count
    const connectedCount = Object.values(accountData.platforms)
        .filter(platform => platform.connected).length;
    
    const platformCountElement = document.getElementById('platform-count');
    if (platformCountElement) {
        platformCountElement.textContent = connectedCount;
    }
    
    // Update balance cards in the dashboard
    const balanceDisplay = document.getElementById('balance-display');
    if (balanceDisplay) {
        balanceDisplay.innerHTML = '';
        
        Object.entries(accountData.platforms)
            .filter(([_, platform]) => platform.connected)
            .forEach(([key, platform]) => {
                const balanceCard = document.createElement('div');
                balanceCard.className = 'col-md-4 mb-3';
                balanceCard.innerHTML = `
                    <div class="balance-card">
                        <div class="d-flex align-items-center mb-2">
                            <img src="assets/images/${key}.svg" alt="${platform.name}" height="24" class="me-2">
                            <h6 class="mb-0">${platform.name}</h6>
                        </div>
                        <div class="d-flex justify-content-between align-items-center">
                            <span class="fs-4 fw-bold">$${platform.balance.toFixed(2)}</span>
                            <a href="#linked-accounts" class="btn btn-sm btn-outline-primary sidebar-nav" data-section="linked-accounts">Details</a>
                        </div>
                    </div>
                `;
                balanceDisplay.appendChild(balanceCard);
            });
    }
    
    // Update dropdown options for source platforms
    const sourceSelect = document.getElementById('quickSourceSelect');
    if (sourceSelect) {
        sourceSelect.innerHTML = '<option value="">Select source platform</option>';
        
        Object.entries(accountData.platforms)
            .filter(([_, platform]) => platform.connected)
            .forEach(([key, platform]) => {
                const option = document.createElement('option');
                option.value = key;
                option.textContent = `${platform.name} ($${platform.balance.toFixed(2)})`;
                sourceSelect.appendChild(option);
            });
    }
    
    // Update dropdown options for destination platforms
    const destSelect = document.getElementById('quickDestinationSelect');
    if (destSelect) {
        destSelect.innerHTML = '<option value="">Select destination platform</option>';
        
        Object.entries(accountData.platforms)
            .filter(([key, platform]) => platform.connected && key !== 'ebt') // Exclude EBT as destination
            .forEach(([key, platform]) => {
                const option = document.createElement('option');
                option.value = key;
                option.textContent = platform.name;
                destSelect.appendChild(option);
            });
    }
}

// Update connected platform badges
function updatePlatformBadges() {
    const connectedPlatforms = document.querySelector('.connected-platforms');
    if (connectedPlatforms) {
        connectedPlatforms.innerHTML = '';
        
        Object.entries(accountData.platforms)
            .filter(([_, platform]) => platform.connected)
            .forEach(([key, platform]) => {
                const badge = document.createElement('div');
                badge.className = 'platform-badge active';
                badge.innerHTML = `
                    <img src="assets/images/${key}.svg" alt="${platform.name}">
                    <span>${platform.name}</span>
                `;
                connectedPlatforms.appendChild(badge);
            });
    }
}

// Initialize platform functionality
function initializePlatformFunctionality() {
    // Platform details buttons
    const detailsButtons = document.querySelectorAll('.platform-details-btn');
    detailsButtons.forEach(button => {
        button.addEventListener('click', function() {
            const platform = this.getAttribute('data-platform');
            showPlatformDetails(platform);
        });
    });
    
    // Platform connect buttons
    const connectButtons = document.querySelectorAll('.platform-connect-btn');
    connectButtons.forEach(button => {
        button.addEventListener('click', function() {
            const platform = this.getAttribute('data-platform');
            const connectModal = document.getElementById('connectPlatformModal');
            if (connectModal) {
                // Store the platform in the modal
                connectModal.setAttribute('data-platform', platform);
                
                // Update the modal title
                const modalTitle = connectModal.querySelector('.modal-title');
                if (modalTitle) {
                    modalTitle.textContent = `Connect ${accountData.platforms[platform].name}`;
                }
            }
        });
    });
    
    // Connect platform button in modal
    const connectPlatformBtn = document.getElementById('connect-platform-btn');
    if (connectPlatformBtn) {
        connectPlatformBtn.addEventListener('click', function() {
            const connectModal = document.getElementById('connectPlatformModal');
            const platform = connectModal.getAttribute('data-platform');
            
            const username = document.getElementById('platform-username').value;
            const password = document.getElementById('platform-password').value;
            const terms = document.getElementById('platform-terms').checked;
            
            if (!username || !password || !terms) {
                showAlert('Please fill in all fields and accept the terms', 'danger');
                return;
            }
            
            // Connect the platform
            accountData.platforms[platform].connected = true;
            accountData.platforms[platform].balance = 100.00; // Demo balance
            
            // For PayPal, store email
            if (platform === 'paypal') {
                accountData.platforms[platform].email = username;
            } 
            // For others, store a partial phone number
            else {
                accountData.platforms[platform].phone = username.replace(/(\d{3})\d{4}(\d{4})/, '($1) *** - $2');
            }
            
            // Add an activity log entry
            accountData.activityLog.unshift({
                id: Date.now(),
                type: 'platform',
                description: 'Platform Connected',
                details: `You connected your ${accountData.platforms[platform].name} account`,
                platformDetails: platform === 'paypal' ? `Email: ${username}` : `Phone: ${username.replace(/(\d{3})\d{4}(\d{4})/, '($1) *** - $2')}`,
                timestamp: new Date().toISOString()
            });
            
            // Save data
            saveData();
            
            // Update UI
            updateBalanceDisplays();
            updatePlatformBadges();
            
            // Close modal
            const bsModal = bootstrap.Modal.getInstance(connectModal);
            bsModal.hide();
            
            // Clear form
            document.getElementById('platform-username').value = '';
            document.getElementById('platform-password').value = '';
            document.getElementById('platform-terms').checked = false;
            
            // Show success message
            showAlert(`${accountData.platforms[platform].name} connected successfully!`, 'success');
            
            // Reload page to reflect changes
            setTimeout(() => {
                location.reload();
            }, 1500);
        });
    }
}

// Show platform details
function showPlatformDetails(platform) {
    // Hide all platform details
    const allDetails = document.querySelectorAll('.platform-details');
    allDetails.forEach(detail => detail.classList.remove('active'));
    
    // Show the selected platform's details
    const platformDetails = document.getElementById(`${platform}-platform-details`);
    if (platformDetails) {
        platformDetails.classList.add('active');
    }
    
    // Load platform's transactions
    loadPlatformTransactions(platform);
}

// Load transactions for a specific platform
function loadPlatformTransactions(platform) {
    const transactionsList = document.querySelector(`.platform-transactions[data-platform="${platform}"]`);
    const transactionTable = document.querySelector(`.platform-transaction-table[data-platform="${platform}"]`);
    
    if (transactionsList) {
        transactionsList.innerHTML = '';
        
        // Get this platform's transactions
        const platformTransactions = accountData.transactions
            .filter(transaction => transaction.source === platform || transaction.destination === platform)
            .sort((a, b) => new Date(b.date) - new Date(a.date))
            .slice(0, 3); // Only the 3 most recent
        
        if (platformTransactions.length === 0) {
            transactionsList.innerHTML = '<div class="list-group-item">No recent transactions found.</div>';
        } else {
            platformTransactions.forEach(transaction => {
                const isOutgoing = transaction.source === platform;
                const amount = isOutgoing ? -transaction.amount : transaction.amount;
                
                const item = document.createElement('div');
                item.className = 'list-group-item transaction-card';
                item.innerHTML = `
                    <div class="d-flex w-100 justify-content-between">
                        <h6 class="mb-1">${transaction.description}</h6>
                        <small class="${amount < 0 ? 'text-danger' : 'text-success'}">${amount < 0 ? '-' : '+'}$${Math.abs(amount).toFixed(2)}</small>
                    </div>
                    <small class="text-muted">
                        ${isOutgoing ? 'To: ' + formatPlatformName(transaction.destination) : 'From: ' + formatPlatformName(transaction.source)} • 
                        ${formatDate(transaction.date)}
                    </small>
                `;
                transactionsList.appendChild(item);
            });
        }
    }
    
    if (transactionTable) {
        transactionTable.innerHTML = '';
        
        // Get all of this platform's transactions
        const platformTransactions = accountData.transactions
            .filter(transaction => transaction.source === platform || transaction.destination === platform)
            .sort((a, b) => new Date(b.date) - new Date(a.date));
        
        if (platformTransactions.length === 0) {
            transactionTable.innerHTML = '<tr><td colspan="5" class="text-center">No transactions found.</td></tr>';
        } else {
            platformTransactions.forEach(transaction => {
                const isOutgoing = transaction.source === platform;
                const amount = isOutgoing ? -transaction.amount : transaction.amount;
                
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${formatDate(transaction.date)}</td>
                    <td>${transaction.description}</td>
                    <td class="${amount < 0 ? 'text-danger' : 'text-success'}">${amount < 0 ? '-' : '+'}$${Math.abs(amount).toFixed(2)}</td>
                    <td>
                        <span class="badge ${getStatusBadgeClass(transaction.status)}">${formatStatus(transaction.status)}</span>
                    </td>
                    <td>
                        <button class="btn btn-sm btn-outline-primary me-1" data-bs-toggle="modal" data-bs-target="#transactionDetailsModal" data-transaction-id="${transaction.id}">
                            <i class="bi bi-info-circle"></i>
                        </button>
                        ${transaction.status === 'completed' ? `
                        <button class="btn btn-sm btn-outline-secondary" data-transaction-id="${transaction.id}">
                            <i class="bi bi-file-earmark-arrow-down"></i>
                        </button>
                        ` : ''}
                    </td>
                `;
                transactionTable.appendChild(row);
            });
        }
    }
}

// Initialize transaction display
function initializeTransactions() {
    // Populate all transactions table
    const transactionsBody = document.getElementById('all-transactions-body');
    if (transactionsBody) {
        accountData.transactions.sort((a, b) => new Date(b.date) - new Date(a.date)).forEach(transaction => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${formatDate(transaction.date)}</td>
                <td>
                    <div class="d-flex align-items-center">
                        <img src="assets/images/${transaction.source}.svg" alt="${formatPlatformName(transaction.source)}" height="16" class="me-1">
                        ${formatPlatformName(transaction.source)}
                    </div>
                </td>
                <td>
                    <div class="d-flex align-items-center">
                        <img src="assets/images/${transaction.destination === 'utility' ? 'utility-bill' : transaction.destination}.svg" alt="${formatPlatformName(transaction.destination)}" height="16" class="me-1" onerror="this.src='https://placehold.co/16x16/32127A/FFFFFF?text=${transaction.destination[0].toUpperCase()}'">
                        ${formatPlatformName(transaction.destination)}
                    </div>
                </td>
                <td>${transaction.description}</td>
                <td>$${transaction.amount.toFixed(2)}</td>
                <td>
                    ${transaction.fee > 0 ? 
                        `$${transaction.fee.toFixed(2)}${
                            transaction.source === 'ebt' ? 
                                ' <span class="badge bg-success">10% off</span>' : 
                                (transaction.destination === 'fxams' ? 
                                    ' <span class="badge bg-info">0.5%</span>' : 
                                    ' <span class="badge bg-secondary">1%</span>')
                        }` : 
                        'Free'
                    }
                </td>
                <td><span class="badge ${getStatusBadgeClass(transaction.status)}">${formatStatus(transaction.status)}</span></td>
                <td>
                    <button class="btn btn-sm btn-outline-primary me-1" data-bs-toggle="modal" data-bs-target="#transactionDetailsModal" data-transaction-id="${transaction.id}">
                        <i class="bi bi-info-circle"></i>
                    </button>
                    ${transaction.status === 'completed' ? `
                    <button class="btn btn-sm btn-outline-secondary" data-transaction-id="${transaction.id}">
                        <i class="bi bi-file-earmark-arrow-down"></i>
                    </button>
                    ` : ''}
                </td>
            `;
            transactionsBody.appendChild(row);
        });
    }
    
    // Update transaction analytics
    document.getElementById('total-transfers-count').textContent = accountData.transactions.length;
    
    const totalAmount = accountData.transactions
        .filter(t => new Date(t.date) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)) // Last 30 days
        .reduce((sum, t) => sum + t.amount, 0);
    document.getElementById('total-transfers-amount').textContent = `$${totalAmount.toFixed(2)}`;
    
    // Simulate fees saved
    document.getElementById('fees-saved').textContent = '$2.85';
    
    // Populate activity log
    const activityLog = document.getElementById('activity-log-container');
    if (activityLog) {
        activityLog.innerHTML = '';
        accountData.activityLog.forEach(activity => {
            const item = document.createElement('div');
            item.className = `activity-log-item ${activity.type}`;
            
            let icon;
            switch (activity.type) {
                case 'login':
                    icon = 'person-check';
                    break;
                case 'transfer':
                    icon = 'arrow-left-right';
                    break;
                case 'platform':
                    icon = 'link-45deg';
                    break;
                case 'settings':
                    icon = 'gear';
                    break;
                default:
                    icon = 'info-circle';
            }
            
            item.innerHTML = `
                <div class="d-flex justify-content-between">
                    <h6><i class="bi bi-${icon} me-2"></i> ${activity.description}</h6>
                    <small class="text-muted">${formatRelativeTime(activity.timestamp)}</small>
                </div>
                <p class="mb-0">${activity.details}</p>
                ${activity.ipAddress ? `<small class="text-muted">IP: ${activity.ipAddress} (${activity.location})</small>` : ''}
                ${activity.transactionId ? `<small class="text-muted">Transaction ID: ${activity.transactionId}</small>` : ''}
                ${activity.platformDetails ? `<small class="text-muted">${activity.platformDetails}</small>` : ''}
                ${activity.reason ? `<small class="text-muted">Reason: ${activity.reason}</small>` : ''}
            `;
            activityLog.appendChild(item);
        });
    }
    
    // Transaction filter
    const transactionFilter = document.getElementById('transaction-filter');
    if (transactionFilter) {
        transactionFilter.addEventListener('change', function() {
            const filter = this.value;
            const rows = document.querySelectorAll('#all-transactions-body tr');
            
            if (filter === 'all') {
                rows.forEach(row => row.style.display = '');
            } else {
                rows.forEach(row => {
                    const sourcePlatform = row.cells[1].textContent.trim();
                    if (sourcePlatform.toLowerCase().includes(filter)) {
                        row.style.display = '';
                    } else {
                        row.style.display = 'none';
                    }
                });
            }
        });
    }
    
    // Activity filter
    const activityFilter = document.getElementById('activity-filter');
    if (activityFilter) {
        activityFilter.addEventListener('change', function() {
            const filter = this.value;
            const items = document.querySelectorAll('.activity-log-item');
            
            if (filter === 'all') {
                items.forEach(item => item.style.display = '');
            } else {
                items.forEach(item => {
                    if (item.classList.contains(filter)) {
                        item.style.display = '';
                    } else {
                        item.style.display = 'none';
                    }
                });
            }
        });
    }
}

// Initialize quick transfer functionality
function initializeQuickTransfer() {
    const quickTransferButton = document.getElementById('quickTransferButton');
    if (quickTransferButton) {
        quickTransferButton.addEventListener('click', function() {
            const source = document.getElementById('quickSourceSelect').value;
            const destination = document.getElementById('quickDestinationSelect').value;
            const amount = parseFloat(document.getElementById('quickTransferAmount').value);
            
            if (!source || !destination) {
                showAlert('Please select source and destination platforms', 'danger');
                return;
            }
            
            if (source === destination) {
                showAlert('Source and destination cannot be the same', 'danger');
                return;
            }
            
            if (isNaN(amount) || amount <= 0) {
                showAlert('Please enter a valid amount', 'danger');
                return;
            }
            
            // Calculate estimated fee for balance check
            let estimatedFeeRate = 0.01; // Standard 1% fee
            
            // Apply EBT discount if applicable
            if (source === 'ebt') {
                estimatedFeeRate = 0.01 * 0.9; // 10% discount
            }
            
            // Apply crypto rate if applicable
            if (destination === 'fxams') {
                estimatedFeeRate = 0.005; // 0.5% for investments
            }
            
            const estimatedFee = amount * estimatedFeeRate;
            const totalCost = amount + estimatedFee;
            
            // Check if user has enough funds including fee
            if (accountData.platforms[source].balance < totalCost) {
                showAlert(`Insufficient funds in ${accountData.platforms[source].name}. Your balance is $${accountData.platforms[source].balance.toFixed(2)} but this transfer would cost $${totalCost.toFixed(2)} including a $${estimatedFee.toFixed(2)} fee.`, 'danger');
                return;
            }
            
            // Calculate fee based on platform type
            let fee = 0;
            let feeRate = 0.01; // Standard 1% fee for regular transfers
            
            // Apply EBT/Government benefits discount (10% off fees)
            if (source === 'ebt') {
                feeRate = 0.01 * 0.9; // 10% discount on fee
            }
            
            // Apply crypto fee rate (0.5%)
            if (destination === 'fxams') {
                feeRate = 0.005; // 0.5% for investment/crypto transfers
            }
            
            // Calculate fee amount
            fee = amount * feeRate;
            
            // Process the transfer (fee gets added on top of transfer amount)
            accountData.platforms[source].balance -= (amount + fee);
            accountData.platforms[destination].balance += amount;
            
            // Add transaction record
            const transaction = {
                id: Date.now(),
                date: new Date().toISOString(),
                source: source,
                destination: destination,
                description: `Transfer to ${accountData.platforms[destination].name}`,
                amount: amount,
                fee: fee,
                status: 'completed'
            };
            
            accountData.transactions.unshift(transaction);
            
            // Add activity log
            accountData.activityLog.unshift({
                id: Date.now(),
                type: 'transfer',
                description: 'Transfer Completed',
                details: `You transferred $${amount.toFixed(2)} from ${accountData.platforms[source].name} to ${accountData.platforms[destination].name}`,
                transactionId: transaction.id.toString(),
                timestamp: new Date().toISOString()
            });
            
            // Save data
            saveData();
            
            // Update UI
            updateBalanceDisplays();
            
            // Clear form
            document.getElementById('quickTransferAmount').value = '';
            
            // Show success message with fee information
            showAlert(`Transfer of $${amount.toFixed(2)} to ${accountData.platforms[destination].name} successful! A fee of $${fee.toFixed(2)} was charged.`, 'success');
        });
    }
}

// Initialize digital cards
function initializeDigitalCards() {
    // Set up freeze checkbox
    const freezeCheckbox = document.getElementById('confirmFreezeCheckbox');
    const freezeButton = document.getElementById('confirm-freeze-btn');
    
    if (freezeCheckbox && freezeButton) {
        freezeCheckbox.addEventListener('change', function() {
            freezeButton.disabled = !this.checked;
        });
    }
    
    // Handle the create card button
    const createCardBtn = document.getElementById('create-card-btn');
    if (createCardBtn) {
        createCardBtn.addEventListener('click', function() {
            const platform = document.getElementById('cardPlatform').value;
            const cardName = document.getElementById('cardName').value;
            const design = document.querySelector('input[name="cardDesign"]:checked').value;
            const spendingLimit = document.getElementById('spendingLimit').value;
            const onlinePayments = document.getElementById('enableOnlinePayments').checked;
            const nfcPayments = document.getElementById('enableNFC').checked;
            const internationalPayments = document.getElementById('enableInternational').checked;
            
            if (!platform || !cardName) {
                showAlert('Please fill in all required fields', 'danger');
                return;
            }
            
            // Generate a card number
            const cardNumber = generateCardNumber();
            
            // Generate expiry date (3 years from now)
            const expiry = generateExpiryDate();
            
            // Generate CVV
            const cvv = Math.floor(100 + Math.random() * 900).toString();
            
            // Create card
            const newCard = {
                id: Date.now(),
                name: cardName,
                platform: platform,
                cardNumber: cardNumber,
                expiry: expiry,
                cvv: cvv,
                cardHolder: platform.toUpperCase() + ' USER',
                billingAddress: '123 Main St, Anytown, US 12345',
                status: 'active',
                design: design,
                settings: {
                    onlineTransactions: onlinePayments,
                    nfcPayments: nfcPayments,
                    internationalTransactions: internationalPayments,
                    transactionLimit: parseInt(spendingLimit)
                }
            };
            
            // Add to digital cards
            accountData.digitalCards.push(newCard);
            
            // Add activity log
            accountData.activityLog.unshift({
                id: Date.now(),
                type: 'platform',
                description: 'Digital Card Created',
                details: `You created a digital debit card for ${accountData.platforms[platform].name}`,
                timestamp: new Date().toISOString()
            });
            
            // Save data
            saveData();
            
            // Close modal
            const createCardModal = document.getElementById('createCardModal');
            const bsModal = bootstrap.Modal.getInstance(createCardModal);
            bsModal.hide();
            
            // Show success message
            showAlert(`Digital card for ${accountData.platforms[platform].name} created successfully!`, 'success');
            
            // Reload page to show new card
            setTimeout(() => {
                location.reload();
            }, 1500);
        });
    }
}

// Initialize card modals
function initializeCardModals() {
    // Set up the card details modal
    const cardDetailsModal = document.getElementById('cardDetailsModal');
    if (cardDetailsModal) {
        cardDetailsModal.addEventListener('show.bs.modal', function(event) {
            const button = event.relatedTarget;
            const cardType = button.getAttribute('data-card-type');
            
            // Find the card data
            const card = accountData.digitalCards.find(card => card.platform === cardType);
            
            if (card) {
                // Update modal content with card details
                const cardNumberInput = this.querySelector('.modal-body input[value="4532 1111 2222 5678"]');
                if (cardNumberInput) cardNumberInput.value = card.cardNumber;
                
                const expiryInput = this.querySelector('.modal-body input[value="05/28"]');
                if (expiryInput) expiryInput.value = card.expiry;
                
                const cvvInput = this.querySelector('.modal-body input[value="123"]');
                if (cvvInput) cvvInput.value = card.cvv;
                
                const cardHolderInput = this.querySelector('.modal-body input[value="EBT CARDHOLDER"]');
                if (cardHolderInput) cardHolderInput.value = card.cardHolder;
                
                const billingAddressInput = this.querySelector('.modal-body textarea');
                if (billingAddressInput) billingAddressInput.value = card.billingAddress;
                
                const linkedPlatformInput = this.querySelector('.modal-body input[value="EBT Cash Benefits"]');
                if (linkedPlatformInput) linkedPlatformInput.value = accountData.platforms[card.platform].name;
                
                // Set checkboxes
                const onlineTransactionsCheckbox = document.getElementById('enableOnlineTransactions');
                if (onlineTransactionsCheckbox) onlineTransactionsCheckbox.checked = card.settings.onlineTransactions;
                
                const internationalTransactionsCheckbox = document.getElementById('enableInternationalTransactions');
                if (internationalTransactionsCheckbox) internationalTransactionsCheckbox.checked = card.settings.internationalTransactions;
                
                // Set transaction limit
                const transactionLimitSelect = this.querySelector('.modal-body select');
                if (transactionLimitSelect) {
                    const options = transactionLimitSelect.options;
                    for (let i = 0; i < options.length; i++) {
                        if (parseInt(options[i].value) === card.settings.transactionLimit) {
                            options[i].selected = true;
                            break;
                        }
                    }
                }
            }
        });
        
        // Save card settings
        const saveCardSettingsBtn = document.getElementById('save-card-settings-btn');
        if (saveCardSettingsBtn) {
            saveCardSettingsBtn.addEventListener('click', function() {
                const cardDetailsModal = document.getElementById('cardDetailsModal');
                const cardType = cardDetailsModal.querySelector('input[value="EBT Cash Benefits"]').value;
                
                // Find the platform from the display name
                let platform = '';
                for (const [key, value] of Object.entries(accountData.platforms)) {
                    if (value.name === cardType) {
                        platform = key;
                        break;
                    }
                }
                
                // Find the card
                const cardIndex = accountData.digitalCards.findIndex(card => card.platform === platform);
                
                if (cardIndex !== -1) {
                    // Update card settings
                    accountData.digitalCards[cardIndex].settings.onlineTransactions = document.getElementById('enableOnlineTransactions').checked;
                    accountData.digitalCards[cardIndex].settings.internationalTransactions = document.getElementById('enableInternationalTransactions').checked;
                    
                    const transactionLimitSelect = cardDetailsModal.querySelector('.modal-body select');
                    accountData.digitalCards[cardIndex].settings.transactionLimit = parseInt(transactionLimitSelect.value);
                    
                    // Save data
                    saveData();
                    
                    // Close modal
                    const bsModal = bootstrap.Modal.getInstance(cardDetailsModal);
                    bsModal.hide();
                    
                    // Show success message
                    showAlert('Card settings updated successfully!', 'success');
                }
            });
        }
    }
    
    // Set up the freeze card modal
    const cardFreezeModal = document.getElementById('cardFreezeModal');
    if (cardFreezeModal) {
        const freezeButton = document.getElementById('confirm-freeze-btn');
        if (freezeButton) {
            freezeButton.addEventListener('click', function() {
                const cardType = cardFreezeModal.getAttribute('data-card-type');
                
                // Find the card
                const cardIndex = accountData.digitalCards.findIndex(card => card.platform === cardType);
                
                if (cardIndex !== -1) {
                    // Toggle card status
                    const currentStatus = accountData.digitalCards[cardIndex].status;
                    accountData.digitalCards[cardIndex].status = currentStatus === 'active' ? 'frozen' : 'active';
                    
                    // Add activity log
                    accountData.activityLog.unshift({
                        id: Date.now(),
                        type: 'platform',
                        description: currentStatus === 'active' ? 'Card Frozen' : 'Card Unfrozen',
                        details: `You ${currentStatus === 'active' ? 'froze' : 'unfroze'} your ${accountData.platforms[cardType].name} digital card`,
                        timestamp: new Date().toISOString()
                    });
                    
                    // Save data
                    saveData();
                    
                    // Close modal
                    const bsModal = bootstrap.Modal.getInstance(cardFreezeModal);
                    bsModal.hide();
                    
                    // Show success message
                    showAlert(`Card ${currentStatus === 'active' ? 'frozen' : 'unfrozen'} successfully!`, 'success');
                    
                    // Reload page to reflect changes
                    setTimeout(() => {
                        location.reload();
                    }, 1500);
                }
            });
        }
    }
    
    // Custom spending limit handling
    const spendingLimitSelect = document.getElementById('spendingLimit');
    const customLimitField = document.getElementById('customLimitField');
    
    if (spendingLimitSelect && customLimitField) {
        spendingLimitSelect.addEventListener('change', function() {
            if (this.value === 'custom') {
                customLimitField.classList.remove('d-none');
            } else {
                customLimitField.classList.add('d-none');
            }
        });
    }
}

// Helper function: Format date
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleString();
}

// Helper function: Format relative time
function formatRelativeTime(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffSec = Math.floor(diffMs / 1000);
    const diffMin = Math.floor(diffSec / 60);
    const diffHour = Math.floor(diffMin / 60);
    const diffDay = Math.floor(diffHour / 24);
    
    if (diffMs < 0) {
        return 'in the future';
    } else if (diffSec < 60) {
        return 'Just now';
    } else if (diffMin < 60) {
        return `${diffMin} minute${diffMin > 1 ? 's' : ''} ago`;
    } else if (diffHour < 24) {
        return `${diffHour} hour${diffHour > 1 ? 's' : ''} ago`;
    } else if (diffDay < 7) {
        return `${diffDay} day${diffDay > 1 ? 's' : ''} ago`;
    } else {
        return date.toLocaleDateString();
    }
}

// Helper function: Format platform name
function formatPlatformName(platform) {
    switch (platform) {
        case 'ebt':
            return 'EBT Cash Benefits';
        case 'paypal':
            return 'PayPal';
        case 'zelle':
            return 'Zelle';
        case 'venmo':
            return 'Venmo';
        case 'cashapp':
            return 'Cash App';
        case 'applecash':
            return 'Apple Cash';
        case 'utility':
            return 'Utility Bill';
        case 'unknown':
            return 'Unknown';
        default:
            return platform.charAt(0).toUpperCase() + platform.slice(1);
    }
}

// Helper function: Format transaction status
function formatStatus(status) {
    switch (status) {
        case 'completed':
            return 'Completed';
        case 'pending':
            return 'Pending';
        case 'failed':
            return 'Failed';
        case 'refund_pending':
            return 'Refund Pending';
        case 'refunded':
            return 'Refunded';
        default:
            return status.charAt(0).toUpperCase() + status.slice(1);
    }
}

// Helper function: Get status badge class
function getStatusBadgeClass(status) {
    switch (status) {
        case 'completed':
            return 'bg-success';
        case 'pending':
            return 'bg-warning';
        case 'failed':
            return 'bg-danger';
        case 'refund_pending':
            return 'bg-info';
        case 'refunded':
            return 'bg-secondary';
        default:
            return 'bg-secondary';
    }
}

// Generate card number
function generateCardNumber() {
    let cardNumber = '4';
    for (let i = 0; i < 15; i++) {
        cardNumber += Math.floor(Math.random() * 10);
    }
    
    // Format it with spaces
    return cardNumber.replace(/(\d{4})(\d{4})(\d{4})(\d{4})/, '$1 $2 $3 $4');
}

// Generate expiry date (3 years from now)
function generateExpiryDate() {
    const date = new Date();
    date.setFullYear(date.getFullYear() + 3);
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString().slice(-2);
    return `${month}/${year}`;
}

// Display an alert message
function showAlert(message, type = 'success') {
    const alertPlaceholder = document.querySelector('.container');
    
    const wrapper = document.createElement('div');
    wrapper.innerHTML = `
        <div class="alert alert-${type} alert-dismissible fade show" role="alert">
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
    `;
    
    alertPlaceholder.prepend(wrapper);
    
    // Auto dismiss after 5 seconds
    setTimeout(() => {
        const alert = bootstrap.Alert.getOrCreateInstance(wrapper.querySelector('.alert'));
        alert.close();
    }, 5000);
}