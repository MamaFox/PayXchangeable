/**
 * PayXchangeable Financial Learning Game
 * Implements gamified financial education features
 */

// Game data storage
const gameData = {
    player: {
        name: "FinancePro",
        level: 14,
        currentXP: 2350,
        nextLevelXP: 3000,
        streak: 12,
        coins: 850
    },
    achievements: {
        completed: [
            "savings-master",
            "budgeting-pro",
            "first-investment",
            "week-streak",
            "knowledge-seeker",
            "debt-reducer",
            "community-contributor"
        ],
        locked: [
            "module-master",
            "month-streak",
            "diversified-portfolio",
            "financial-freedom"
        ]
    },
    modules: {
        completed: [
            "budgeting-basics",
            "debt-management",
            "saving-strategies",
            "investment-fundamentals",
            "retirement-planning"
        ],
        inProgress: [],
        available: [
            "tax-strategies"
        ],
        locked: [
            "stock-market-investing",
            "real-estate-investing",
            "advanced-investing"
        ]
    },
    quests: {
        daily: {
            completed: false,
            streak: 4,
            maxStreak: 5
        },
        weekly: {
            progress: 1,
            maxProgress: 3
        }
    }
};

// Store in localStorage to persist game data
if (!localStorage.getItem('payxchangeableGame')) {
    localStorage.setItem('payxchangeableGame', JSON.stringify(gameData));
} else {
    try {
        const storedData = JSON.parse(localStorage.getItem('payxchangeableGame'));
        Object.assign(gameData, storedData);
    } catch (e) {
        console.error('Error loading game data:', e);
        localStorage.setItem('payxchangeableGame', JSON.stringify(gameData));
    }
}

// Save game data
function saveGameData() {
    localStorage.setItem('payxchangeableGame', JSON.stringify(gameData));
}

// Handle course replay for interactive buttons
function replayCourse(courseType) {
    // Generate custom title based on course type
    let moduleTitle = "";
    switch(courseType) {
        case 'budgeting':
            moduleTitle = "Budgeting Basics";
            break;
        case 'debt':
            moduleTitle = "Debt Management";
            break;
        case 'saving':
            moduleTitle = "Saving Strategies";
            break;
        case 'investment':
            moduleTitle = "Investment Fundamentals";
            break;
        case 'retirement':
            moduleTitle = "Retirement Planning";
            break;
        default:
            moduleTitle = "Financial Module";
    }
    
    // Show the module content modal
    showModuleContent(moduleTitle);
}

// Handle starting a new course
function startCourse(courseType) {
    // Generate custom title based on course type
    let moduleTitle = "";
    let moduleXP = 350; // Default XP for new courses
    
    switch(courseType) {
        case 'tax':
            moduleTitle = "Tax Strategies";
            break;
        default:
            moduleTitle = "Financial Module";
    }
    
    // Show module completion modal first (simulates taking the course)
    showModuleModal(moduleTitle, moduleXP);
    
    // Mark as completed and add to player's completed modules
    const moduleId = moduleTitle.toLowerCase().replace(/\s+/g, '-');
    if (!gameData.modules.completed.includes(moduleId)) {
        gameData.modules.completed.push(moduleId);
        
        // Remove from available list
        const availableIndex = gameData.modules.available.indexOf(moduleId);
        if (availableIndex !== -1) {
            gameData.modules.available.splice(availableIndex, 1);
        }
        
        // Add XP
        awardXP(moduleXP);
        
        // Check for achievements
        checkForAchievements();
        
        // Save game state
        saveGameData();
        
        // Update the button text to "Replay"
        // Find card by card title text content
        const cardTitles = document.querySelectorAll('.module-card .card-title');
        let moduleCard = null;
        
        for (let i = 0; i < cardTitles.length; i++) {
            if (cardTitles[i].textContent === moduleTitle) {
                moduleCard = cardTitles[i].closest('.module-card');
                break;
            }
        }
        
        if (moduleCard) {
            const button = moduleCard.querySelector('.btn-animated');
            if (button) {
                button.textContent = 'Replay';
                button.onclick = function() { replayCourse(courseType); };
            }
            
            // Add completion indicator
            addCompletionIndicator(moduleCard);
        }
    }
}

// Start a quest
function startQuest() {
    // Show quest modal with instructions
    const modal = document.createElement('div');
    modal.className = 'modal fade';
    modal.id = 'questModal';
    modal.innerHTML = `
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Weekly Investment Mission</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <p>Your mission is to research and compare 3 investment options to enhance your portfolio.</p>
                    <div class="alert alert-info">
                        <strong>Instructions:</strong>
                        <ol>
                            <li>Choose 3 different investment types (stocks, bonds, ETFs, etc.)</li>
                            <li>Research their performance, risks, and potential returns</li>
                            <li>Create a comparison spreadsheet or document</li>
                            <li>Return here to upload your comparison</li>
                        </ol>
                    </div>
                    <div class="quest-rewards-list mb-3">
                        <h6>Rewards:</h6>
                        <div class="d-flex align-items-center mb-2">
                            <i class="bi bi-stars me-2"></i> 250 XP
                        </div>
                        <div class="d-flex align-items-center">
                            <i class="bi bi-coin me-2"></i> 125 Coins
                        </div>
                    </div>
                    <div class="progress mb-3" style="height: 10px;">
                        <div class="progress-bar bg-success" role="progressbar" style="width: 33%;" aria-valuenow="33" aria-valuemin="0" aria-valuemax="100"></div>
                    </div>
                    <p class="text-muted">Progress: 1/3 steps completed</p>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-animated">Upload Comparison</button>
                </div>
            </div>
        </div>
    `;
    
    // Add to document and show
    document.body.appendChild(modal);
    const bsModal = new bootstrap.Modal(modal);
    bsModal.show();
    
    // Update progress
    gameData.quests.weekly.progress++;
    if (gameData.quests.weekly.progress > gameData.quests.weekly.maxProgress) {
        gameData.quests.weekly.progress = gameData.quests.weekly.maxProgress;
    }
    
    // Save game data
    saveGameData();
    
    // Remove modal from DOM after closing
    modal.addEventListener('hidden.bs.modal', function() {
        modal.remove();
    });
}

// Event listeners for interactive elements
document.addEventListener('DOMContentLoaded', function() {
    // Initialize XP bar
    updateXPBar();
    
    // Attach event listeners to all module buttons
    attachModuleListeners();
    
    // Attach event listeners to quest buttons
    attachQuestListeners();
    
    // Initialize achievement display
    updateAchievementDisplay();
    
    // Initialize random daily challenge
    if (!gameData.quests.daily.completed) {
        initializeDailyChallenge();
    }
});

// Update XP bar display
function updateXPBar() {
    const xpBar = document.querySelector('.xp-bar');
    const xpText = document.querySelector('.stats-card p.text-muted');
    
    if (xpBar && xpText) {
        const xpPercentage = (gameData.player.currentXP / gameData.player.nextLevelXP) * 100;
        xpBar.style.width = `${xpPercentage}%`;
        xpText.textContent = `${gameData.player.currentXP} XP / ${gameData.player.nextLevelXP} XP to Level ${gameData.player.level + 1}`;
    }
}

// Attach event listeners to learning module buttons
function attachModuleListeners() {
    const moduleButtons = document.querySelectorAll('.module-card .btn-animated:not(.disabled)');
    
    moduleButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Get the module name from the card title
            const card = this.closest('.module-card');
            const moduleTitle = card.querySelector('.card-title').textContent;
            const moduleXP = parseInt(card.querySelector('.module-xp').textContent.match(/\d+/)[0]);
            const isCompleted = card.querySelector('.module-status-complete');
            const isReplay = this.textContent.toLowerCase() === 'replay';
            
            // Don't award XP for replays
            if (!isReplay && !isCompleted) {
                // Show module completion modal
                showModuleModal(moduleTitle, moduleXP);
                
                // Mark module as completed if it's not already
                const moduleId = moduleTitle.toLowerCase().replace(/\s+/g, '-');
                if (!gameData.modules.completed.includes(moduleId)) {
                    gameData.modules.completed.push(moduleId);
                    
                    // Remove from available list if it was there
                    const availableIndex = gameData.modules.available.indexOf(moduleId);
                    if (availableIndex !== -1) {
                        gameData.modules.available.splice(availableIndex, 1);
                    }
                    
                    // Add XP to player
                    awardXP(moduleXP);
                    
                    // Add completion indicator
                    addCompletionIndicator(card);
                    
                    // Check for new achievements
                    checkForAchievements();
                    
                    // Save game state
                    saveGameData();
                }
            } else {
                // Show module content for replays
                showModuleContent(moduleTitle);
            }
        });
    });
}

// Attach event listeners to quest buttons
function attachQuestListeners() {
    // Daily challenge button
    const dailyChallengeBtn = document.querySelector('.quest-card.daily-challenge .btn-animated');
    if (dailyChallengeBtn) {
        dailyChallengeBtn.addEventListener('click', function(e) {
            e.preventDefault();
            showDailyChallenge();
        });
    }
    
    // Weekly quest button
    const weeklyQuestBtn = document.querySelector('.quest-card:not(.daily-challenge) .btn-animated');
    if (weeklyQuestBtn) {
        weeklyQuestBtn.addEventListener('click', function(e) {
            e.preventDefault();
            showWeeklyQuest();
        });
    }
}

// Show module completion modal
function showModuleModal(moduleTitle, xpEarned) {
    // Create modal element
    const modal = document.createElement('div');
    modal.className = 'modal fade';
    modal.id = 'moduleCompletionModal';
    modal.innerHTML = `
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-body text-center p-5">
                    <h3 class="mb-4">Module Completed!</h3>
                    <div class="mb-4">
                        <i class="bi bi-check-circle-fill" style="font-size: 4rem; color: #10B981;"></i>
                    </div>
                    <h4>${moduleTitle}</h4>
                    <p class="mt-4 mb-3">You've earned:</p>
                    <div class="d-flex justify-content-center align-items-center mb-4">
                        <i class="bi bi-stars" style="font-size: 1.5rem; color: #6941E0; margin-right: 0.5rem;"></i>
                        <span style="font-size: 1.5rem; font-weight: bold;">${xpEarned} XP</span>
                    </div>
                    <button class="btn btn-animated" data-bs-dismiss="modal">Continue</button>
                </div>
            </div>
        </div>
    `;
    
    // Add to document and show
    document.body.appendChild(modal);
    const bsModal = new bootstrap.Modal(modal);
    bsModal.show();
    
    // Remove modal from DOM after closing
    modal.addEventListener('hidden.bs.modal', function() {
        modal.remove();
    });
}

// Show module content
function showModuleContent(moduleTitle) {
    // Create module content modal
    const modal = document.createElement('div');
    modal.className = 'modal fade';
    modal.id = 'moduleContentModal';
    modal.innerHTML = `
        <div class="modal-dialog modal-xl">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">${moduleTitle}</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="col-lg-8">
                            <div class="ratio ratio-16x9 mb-4">
                                <div class="d-flex align-items-center justify-content-center bg-light">
                                    <div class="text-center">
                                        <div style="font-size: 48px;">▶️</div>
                                        <p>${moduleTitle} Video</p>
                                    </div>
                                </div>
                            </div>
                            
                            <h4>Key Learning Points</h4>
                            <ul class="mb-4">
                                <li>Understanding ${moduleTitle.toLowerCase()} fundamentals</li>
                                <li>How to apply these concepts to your personal finances</li>
                                <li>Practical strategies and techniques</li>
                                <li>Common mistakes to avoid</li>
                                <li>Tools and resources to help you succeed</li>
                            </ul>
                            
                            <div class="interactive-exercise border rounded p-4 mb-4">
                                <h4>Interactive Exercise</h4>
                                <p>Apply what you've learned in this practical exercise.</p>
                                <div class="mb-3">
                                    <label for="exerciseInput" class="form-label">Your answer:</label>
                                    <textarea class="form-control" id="exerciseInput" rows="3" placeholder="Enter your answer here..."></textarea>
                                </div>
                                <button class="btn btn-animated" id="submitExercise">Submit</button>
                            </div>
                        </div>
                        
                        <div class="col-lg-4">
                            <div class="card mb-4">
                                <div class="card-body">
                                    <h5>Module Resources</h5>
                                    <ul class="list-group list-group-flush">
                                        <li class="list-group-item d-flex justify-content-between align-items-center">
                                            <span>Module PDF Guide</span>
                                            <i class="bi bi-file-earmark-pdf"></i>
                                        </li>
                                        <li class="list-group-item d-flex justify-content-between align-items-center">
                                            <span>Calculation Worksheet</span>
                                            <i class="bi bi-file-earmark-spreadsheet"></i>
                                        </li>
                                        <li class="list-group-item d-flex justify-content-between align-items-center">
                                            <span>Related Articles</span>
                                            <i class="bi bi-link-45deg"></i>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            
                            <div class="card">
                                <div class="card-body">
                                    <h5>Community Discussion</h5>
                                    <div class="mb-3">
                                        <div class="d-flex mb-2">
                                            <img src="https://placehold.co/100/32127A/FFFFFF?text=JS" alt="User" class="rounded-circle" width="40" height="40">
                                            <div class="ms-2">
                                                <div><strong>JohnSmith92</strong></div>
                                                <div class="text-muted small">This module helped me save $200 last month!</div>
                                            </div>
                                        </div>
                                        <div class="d-flex mb-2">
                                            <img src="https://placehold.co/100/32127A/FFFFFF?text=MD" alt="User" class="rounded-circle" width="40" height="40">
                                            <div class="ms-2">
                                                <div><strong>MoneyDiva</strong></div>
                                                <div class="text-muted small">Great tips, especially about automation.</div>
                                            </div>
                                        </div>
                                    </div>
                                    <textarea class="form-control mb-2" rows="2" placeholder="Add your comment..."></textarea>
                                    <button class="btn btn-sm btn-animated">Post</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-animated">Take Quiz</button>
                </div>
            </div>
        </div>
    `;
    
    // Add to document and show
    document.body.appendChild(modal);
    const bsModal = new bootstrap.Modal(modal);
    bsModal.show();
    
    // Submit exercise button
    const submitBtn = modal.querySelector('#submitExercise');
    if (submitBtn) {
        submitBtn.addEventListener('click', function() {
            const input = modal.querySelector('#exerciseInput').value;
            if (input.length > 10) {
                this.innerHTML = '<i class="bi bi-check-circle"></i> Submitted';
                this.classList.add('btn-success');
                this.disabled = true;
                
                // Show feedback
                const feedback = document.createElement('div');
                feedback.className = 'alert alert-success mt-3';
                feedback.innerHTML = '<strong>Great job!</strong> Your answer has been submitted for review.';
                this.parentNode.appendChild(feedback);
                
                // Add a small amount of XP for participation
                awardXP(10, false);
            } else {
                alert('Please provide a more detailed answer.');
            }
        });
    }
    
    // Remove modal from DOM after closing
    modal.addEventListener('hidden.bs.modal', function() {
        modal.remove();
    });
}

// Add completion indicator to module card
function addCompletionIndicator(card) {
    if (!card.querySelector('.module-status-complete')) {
        const indicator = document.createElement('div');
        indicator.className = 'module-status-complete';
        indicator.innerHTML = '<i class="bi bi-check-lg"></i>';
        card.appendChild(indicator);
        
        // Change button text from "Start" to "Replay"
        const button = card.querySelector('.btn-animated');
        if (button && button.textContent === 'Start') {
            button.textContent = 'Replay';
        }
    }
}

// Award XP to player
function awardXP(amount, showNotification = true) {
    gameData.player.currentXP += amount;
    
    // Check for level up
    if (gameData.player.currentXP >= gameData.player.nextLevelXP) {
        levelUp();
    } else {
        // Just update XP bar
        updateXPBar();
    }
    
    // Show XP notification
    if (showNotification) {
        showXPNotification(amount);
    }
    
    // Save game data
    saveGameData();
}

// Level up player
function levelUp() {
    // Calculate overflow XP
    const overflowXP = gameData.player.currentXP - gameData.player.nextLevelXP;
    
    // Increase level
    gameData.player.level++;
    
    // Set new XP targets
    gameData.player.currentXP = overflowXP;
    gameData.player.nextLevelXP = Math.floor(gameData.player.nextLevelXP * 1.2); // 20% more XP needed for next level
    
    // Update level badge
    const levelBadge = document.querySelector('.level-badge');
    if (levelBadge) {
        levelBadge.textContent = gameData.player.level;
    }
    
    // Update XP bar
    updateXPBar();
    
    // Show level up modal
    showLevelUpModal();
    
    // Check if any modules are now unlocked
    checkForUnlockedModules();
    
    // Save game data
    saveGameData();
}

// Show level up modal
function showLevelUpModal() {
    // Create modal element
    const modal = document.createElement('div');
    modal.className = 'modal fade';
    modal.id = 'levelUpModal';
    modal.innerHTML = `
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-body text-center p-5">
                    <h3 class="mb-4">Level Up!</h3>
                    <div class="level-badge mb-4" style="margin: 0 auto; font-size: 3rem; width: 100px; height: 100px;">${gameData.player.level}</div>
                    <p class="mb-4">Congratulations! You've reached level ${gameData.player.level}!</p>
                    <div id="unlockMessage"></div>
                    <button class="btn btn-animated mt-3" data-bs-dismiss="modal">Continue</button>
                </div>
            </div>
        </div>
    `;
    
    // Add to document and show
    document.body.appendChild(modal);
    const bsModal = new bootstrap.Modal(modal);
    bsModal.show();
    
    // Check for unlocks at this level
    const unlockMessage = modal.querySelector('#unlockMessage');
    let unlockedModule = null;
    
    if (gameData.player.level >= 15) {
        unlockedModule = 'Stock Market Investing';
    } else if (gameData.player.level >= 18) {
        unlockedModule = 'Real Estate Investing';
    } else if (gameData.player.level >= 20) {
        unlockedModule = 'Advanced Investing';
    }
    
    if (unlockedModule && unlockMessage) {
        unlockMessage.innerHTML = `
            <div class="alert alert-success">
                <i class="bi bi-unlock"></i> New module unlocked: <strong>${unlockedModule}</strong>
            </div>
        `;
    }
    
    // Remove modal from DOM after closing
    modal.addEventListener('hidden.bs.modal', function() {
        modal.remove();
        
        // Refresh page to show unlocked modules if any
        if (unlockedModule) {
            location.reload();
        }
    });
}

// Show XP notification
function showXPNotification(amount) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'position-fixed top-0 end-0 p-3';
    notification.style.zIndex = 1070;
    notification.innerHTML = `
        <div class="toast show" role="alert" aria-live="assertive" aria-atomic="true">
            <div class="toast-header bg-primary text-white">
                <i class="bi bi-stars me-2"></i>
                <strong class="me-auto">XP Earned</strong>
                <button type="button" class="btn-close btn-close-white" data-bs-dismiss="toast" aria-label="Close"></button>
            </div>
            <div class="toast-body d-flex align-items-center">
                <span class="me-2">You earned</span>
                <span class="fw-bold" style="color: #6941E0; font-size: 1.2rem;">+${amount} XP</span>
            </div>
        </div>
    `;
    
    // Add to document
    document.body.appendChild(notification);
    
    // Auto remove after 3 seconds
    setTimeout(() => {
        notification.querySelector('.toast').classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 500);
    }, 3000);
}

// Check for unlocked modules
function checkForUnlockedModules() {
    // Define level requirements for locked modules
    const levelRequirements = {
        'stock-market-investing': 15,
        'real-estate-investing': 18,
        'advanced-investing': 20
    };
    
    // Check each locked module
    for (const moduleId of [...gameData.modules.locked]) {
        if (gameData.player.level >= levelRequirements[moduleId]) {
            // Move module from locked to available
            const index = gameData.modules.locked.indexOf(moduleId);
            if (index !== -1) {
                gameData.modules.locked.splice(index, 1);
                gameData.modules.available.push(moduleId);
            }
        }
    }
}

// Check for new achievements
function checkForAchievements() {
    // Check for Module Master achievement
    if (gameData.modules.completed.length >= 6 && !gameData.achievements.completed.includes('module-master')) {
        unlockAchievement('module-master', 'Module Master');
    }
}

// Unlock achievement
function unlockAchievement(achievementId, achievementName) {
    // Add to completed achievements if not already there
    if (!gameData.achievements.completed.includes(achievementId)) {
        gameData.achievements.completed.push(achievementId);
        
        // Remove from locked achievements
        const lockedIndex = gameData.achievements.locked.indexOf(achievementId);
        if (lockedIndex !== -1) {
            gameData.achievements.locked.splice(lockedIndex, 1);
        }
        
        // Show achievement unlocked notification
        showAchievementUnlockedModal(achievementName);
        
        // Update achievements display
        updateAchievementDisplay();
        
        // Save game data
        saveGameData();
    }
}

// Show achievement unlocked modal
function showAchievementUnlockedModal(achievementName) {
    // Create modal element
    const modal = document.createElement('div');
    modal.className = 'modal fade';
    modal.id = 'achievementModal';
    modal.innerHTML = `
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-body text-center p-5">
                    <h3 class="mb-4">Achievement Unlocked!</h3>
                    <div class="mb-4">
                        <i class="bi bi-trophy-fill" style="font-size: 4rem; color: #F59E0B;"></i>
                    </div>
                    <h4>${achievementName}</h4>
                    <p class="mt-3 mb-4">Keep up the great work!</p>
                    <div class="d-flex justify-content-center align-items-center mb-4">
                        <i class="bi bi-stars" style="font-size: 1.5rem; color: #6941E0; margin-right: 0.5rem;"></i>
                        <span style="font-size: 1.5rem; font-weight: bold;">+300 XP</span>
                    </div>
                    <button class="btn btn-animated" data-bs-dismiss="modal">Continue</button>
                </div>
            </div>
        </div>
    `;
    
    // Add to document and show
    document.body.appendChild(modal);
    const bsModal = new bootstrap.Modal(modal);
    bsModal.show();
    
    // Award XP for achievement
    awardXP(300, false);
    
    // Remove modal from DOM after closing
    modal.addEventListener('hidden.bs.modal', function() {
        modal.remove();
    });
}

// Update achievement display
function updateAchievementDisplay() {
    const achievementCards = document.querySelectorAll('.achievement-card');
    
    achievementCards.forEach(card => {
        const title = card.querySelector('.achievement-title').textContent;
        const achievementId = title.toLowerCase().replace(/\s+/g, '-');
        
        // Mark as unlocked if in completed list
        if (gameData.achievements.completed.includes(achievementId)) {
            card.classList.add('achievement-unlocked');
        } else {
            card.classList.remove('achievement-unlocked');
        }
    });
    
    // Update achievement counter
    const achievementCounter = document.querySelector('.badge-counter .number');
    if (achievementCounter) {
        achievementCounter.textContent = gameData.achievements.completed.length;
    }
}

// Initialize daily challenge
function initializeDailyChallenge() {
    // Daily challenges are randomized
    const challenges = [
        {
            title: "Budget Quiz Challenge",
            desc: "Test your knowledge of basic budgeting principles."
        },
        {
            title: "Debt Management Challenge",
            desc: "Answer questions about effective debt management strategies."
        },
        {
            title: "Investment Knowledge Check",
            desc: "Test your understanding of investment fundamentals."
        },
        {
            title: "Saving Strategies Quiz",
            desc: "Answer questions about effective saving techniques."
        }
    ];
    
    // Select a random challenge
    const challenge = challenges[Math.floor(Math.random() * challenges.length)];
    
    // Update challenge display
    const challengeTitle = document.querySelector('.quest-card.daily-challenge .quest-title');
    const challengeDesc = document.querySelector('.quest-card.daily-challenge .quest-desc');
    
    if (challengeTitle && challengeDesc) {
        challengeTitle.textContent = challenge.title;
        challengeDesc.textContent = challenge.desc;
    }
}

// Show daily challenge
function showDailyChallenge() {
    // Get challenge title
    const challengeTitle = document.querySelector('.quest-card.daily-challenge .quest-title').textContent;
    
    // Create challenge modal
    const modal = document.createElement('div');
    modal.className = 'modal fade';
    modal.id = 'dailyChallengeModal';
    modal.innerHTML = `
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header bg-danger text-white">
                    <h5 class="modal-title"><i class="bi bi-lightning"></i> ${challengeTitle}</h5>
                    <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <p class="mb-4">Complete this short quiz to earn rewards and maintain your daily streak!</p>
                    
                    <form id="dailyChallengeForm">
                        <div class="mb-4">
                            <p><strong>1. Which of the following is NOT a key component of a budget?</strong></p>
                            <div class="form-check mb-2">
                                <input class="form-check-input" type="radio" name="q1" id="q1a" value="a">
                                <label class="form-check-label" for="q1a">Income tracking</label>
                            </div>
                            <div class="form-check mb-2">
                                <input class="form-check-input" type="radio" name="q1" id="q1b" value="b">
                                <label class="form-check-label" for="q1b">Expense categories</label>
                            </div>
                            <div class="form-check mb-2">
                                <input class="form-check-input" type="radio" name="q1" id="q1c" value="c">
                                <label class="form-check-label" for="q1c">Stock market predictions</label>
                            </div>
                            <div class="form-check mb-2">
                                <input class="form-check-input" type="radio" name="q1" id="q1d" value="d">
                                <label class="form-check-label" for="q1d">Savings goals</label>
                            </div>
                        </div>
                        
                        <div class="mb-4">
                            <p><strong>2. What is the 50/30/20 rule in budgeting?</strong></p>
                            <div class="form-check mb-2">
                                <input class="form-check-input" type="radio" name="q2" id="q2a" value="a">
                                <label class="form-check-label" for="q2a">50% savings, 30% needs, 20% wants</label>
                            </div>
                            <div class="form-check mb-2">
                                <input class="form-check-input" type="radio" name="q2" id="q2b" value="b">
                                <label class="form-check-label" for="q2b">50% needs, 30% wants, 20% savings</label>
                            </div>
                            <div class="form-check mb-2">
                                <input class="form-check-input" type="radio" name="q2" id="q2c" value="c">
                                <label class="form-check-label" for="q2c">50% investments, 30% expenses, 20% fun</label>
                            </div>
                            <div class="form-check mb-2">
                                <input class="form-check-input" type="radio" name="q2" id="q2d" value="d">
                                <label class="form-check-label" for="q2d">50% income, 30% taxes, 20% spending</label>
                            </div>
                        </div>
                        
                        <div class="mb-4">
                            <p><strong>3. Which of these is most important to include in an emergency fund?</strong></p>
                            <div class="form-check mb-2">
                                <input class="form-check-input" type="radio" name="q3" id="q3a" value="a">
                                <label class="form-check-label" for="q3a">Money for vacation</label>
                            </div>
                            <div class="form-check mb-2">
                                <input class="form-check-input" type="radio" name="q3" id="q3b" value="b">
                                <label class="form-check-label" for="q3b">3-6 months of living expenses</label>
                            </div>
                            <div class="form-check mb-2">
                                <input class="form-check-input" type="radio" name="q3" id="q3c" value="c">
                                <label class="form-check-label" for="q3c">Money for entertainment</label>
                            </div>
                            <div class="form-check mb-2">
                                <input class="form-check-input" type="radio" name="q3" id="q3d" value="d">
                                <label class="form-check-label" for="q3d">Funds for luxury purchases</label>
                            </div>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-animated" id="submitDailyChallenge">Submit Answers</button>
                </div>
            </div>
        </div>
    `;
    
    // Add to document and show
    document.body.appendChild(modal);
    const bsModal = new bootstrap.Modal(modal);
    bsModal.show();
    
    // Submit challenge button
    const submitBtn = modal.querySelector('#submitDailyChallenge');
    if (submitBtn) {
        submitBtn.addEventListener('click', function() {
            const q1Answer = modal.querySelector('input[name="q1"]:checked')?.value;
            const q2Answer = modal.querySelector('input[name="q2"]:checked')?.value;
            const q3Answer = modal.querySelector('input[name="q3"]:checked')?.value;
            
            if (!q1Answer || !q2Answer || !q3Answer) {
                alert('Please answer all questions.');
                return;
            }
            
            // Calculate score (correct answers)
            let score = 0;
            if (q1Answer === 'c') score++;
            if (q2Answer === 'b') score++;
            if (q3Answer === 'b') score++;
            
            // Calculate XP earned (base 50 + 50 per correct answer)
            const xpEarned = 50 + (score * 50);
            
            // Calculate coins earned
            const coinsEarned = 30 + (score * 20);
            
            // Update daily challenge status
            gameData.quests.daily.completed = true;
            
            // Update streak if not already updated today
            if (!gameData.quests.daily.completed) {
                gameData.quests.daily.streak++;
                gameData.player.streak = gameData.quests.daily.streak;
                
                // Update streak display
                const streakCounter = document.querySelector('.badge-counter:nth-child(3) .number');
                if (streakCounter) {
                    streakCounter.textContent = gameData.player.streak;
                }
                
                // Check for streak achievements
                if (gameData.player.streak >= 30 && !gameData.achievements.completed.includes('month-streak')) {
                    unlockAchievement('month-streak', 'Month Streak');
                }
            }
            
            // Save game data
            saveGameData();
            
            // Show results
            modal.querySelector('.modal-body').innerHTML = `
                <div class="text-center">
                    <h4 class="mb-4">Challenge Complete!</h4>
                    <p>You answered ${score} out of 3 questions correctly.</p>
                    
                    <div class="d-flex justify-content-center gap-4 my-4">
                        <div class="d-flex align-items-center">
                            <i class="bi bi-stars me-2" style="font-size: 1.5rem; color: #6941E0;"></i>
                            <span style="font-size: 1.5rem; font-weight: bold;">+${xpEarned} XP</span>
                        </div>
                        <div class="d-flex align-items-center">
                            <i class="bi bi-coin me-2" style="font-size: 1.5rem; color: #F59E0B;"></i>
                            <span style="font-size: 1.5rem; font-weight: bold;">+${coinsEarned} Coins</span>
                        </div>
                    </div>
                    
                    <div class="alert alert-success">
                        <i class="bi bi-fire"></i> Daily streak: ${gameData.player.streak} days
                    </div>
                </div>
            `;
            
            // Update button
            submitBtn.textContent = 'Continue';
            submitBtn.setAttribute('data-bs-dismiss', 'modal');
            
            // Award XP
            awardXP(xpEarned);
            
            // Update daily challenge card
            updateDailyChallengeCard(true);
        });
    }
    
    // Remove modal from DOM after closing
    modal.addEventListener('hidden.bs.modal', function() {
        modal.remove();
    });
}

// Update daily challenge card
function updateDailyChallengeCard(completed) {
    const challengeBtn = document.querySelector('.quest-card.daily-challenge .btn-animated');
    if (challengeBtn) {
        if (completed) {
            challengeBtn.textContent = 'Completed';
            challengeBtn.classList.add('btn-success');
            challengeBtn.disabled = true;
        } else {
            challengeBtn.textContent = 'Start Challenge';
            challengeBtn.classList.remove('btn-success');
            challengeBtn.disabled = false;
        }
    }
    
    // Update streak days visualization
    const streakDays = document.querySelectorAll('.streak-day');
    const completedDays = Math.min(gameData.quests.daily.streak, streakDays.length);
    
    streakDays.forEach((day, index) => {
        if (index < completedDays) {
            day.classList.add('streak-day-completed');
        } else {
            day.classList.remove('streak-day-completed');
        }
    });
}

// Show weekly quest
function showWeeklyQuest() {
    // Get quest title
    const questTitle = document.querySelector('.quest-card:not(.daily-challenge) .quest-title').textContent;
    
    // Create weekly quest modal
    const modal = document.createElement('div');
    modal.className = 'modal fade';
    modal.id = 'weeklyQuestModal';
    modal.innerHTML = `
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header" style="background-color: #F59E0B; color: white;">
                    <h5 class="modal-title"><i class="bi bi-mortarboard"></i> ${questTitle}</h5>
                    <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="mb-4">
                        <h4>Weekly Investment Research Mission</h4>
                        <p>Research and compare investment options to enhance your financial knowledge and portfolio diversification.</p>
                        
                        <div class="progress mb-3" style="height: 10px;">
                            <div class="progress-bar bg-success" role="progressbar" style="width: ${(gameData.quests.weekly.progress / gameData.quests.weekly.maxProgress) * 100}%;" aria-valuenow="${gameData.quests.weekly.progress}" aria-valuemin="0" aria-valuemax="${gameData.quests.weekly.maxProgress}"></div>
                        </div>
                        <p class="small text-muted">Progress: ${gameData.quests.weekly.progress}/${gameData.quests.weekly.maxProgress} investment options researched</p>
                    </div>
                    
                    <div class="card mb-4">
                        <div class="card-body">
                            <h5>This Week's Research Task</h5>
                            <p>Choose an investment option to research below. For each option, you'll analyze risk levels, potential returns, and how it fits into a diversified portfolio.</p>
                            
                            <div class="list-group mb-3">
                                <a href="#" class="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
                                    Index Funds
                                    <span class="badge bg-primary rounded-pill">Low Risk</span>
                                </a>
                                <a href="#" class="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
                                    Individual Stocks
                                    <span class="badge bg-danger rounded-pill">Higher Risk</span>
                                </a>
                                <a href="#" class="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
                                    Real Estate Investment Trusts (REITs)
                                    <span class="badge bg-warning rounded-pill">Medium Risk</span>
                                </a>
                            </div>
                            
                            <div id="researchForm" style="display: none;">
                                <h6 class="mb-3">Research Form: <span id="selectedOption"></span></h6>
                                <div class="mb-3">
                                    <label for="riskAssessment" class="form-label">Risk Assessment (1-5)</label>
                                    <input type="range" class="form-range" min="1" max="5" id="riskAssessment">
                                </div>
                                <div class="mb-3">
                                    <label for="potentialReturn" class="form-label">Potential Return (%)</label>
                                    <input type="number" class="form-control" id="potentialReturn" placeholder="Expected annual return">
                                </div>
                                <div class="mb-3">
                                    <label for="researchNotes" class="form-label">Research Notes</label>
                                    <textarea class="form-control" id="researchNotes" rows="3" placeholder="Enter your findings about this investment option..."></textarea>
                                </div>
                                <button type="button" class="btn btn-animated" id="submitResearch">Submit Research</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                </div>
            </div>
        </div>
    `;
    
    // Add to document and show
    document.body.appendChild(modal);
    const bsModal = new bootstrap.Modal(modal);
    bsModal.show();
    
    // Add event listeners to investment options
    const investmentOptions = modal.querySelectorAll('.list-group-item');
    investmentOptions.forEach(option => {
        option.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Show research form
            const researchForm = modal.querySelector('#researchForm');
            if (researchForm) {
                researchForm.style.display = 'block';
                
                // Set selected option text
                const selectedOption = modal.querySelector('#selectedOption');
                if (selectedOption) {
                    selectedOption.textContent = this.textContent.split('\n')[0].trim();
                }
                
                // Scroll to form
                researchForm.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
    
    // Submit research button
    const submitBtn = modal.querySelector('#submitResearch');
    if (submitBtn) {
        submitBtn.addEventListener('click', function() {
            const notes = modal.querySelector('#researchNotes').value;
            if (notes.length < 10) {
                alert('Please enter more detailed research notes.');
                return;
            }
            
            // Increment progress
            gameData.quests.weekly.progress++;
            
            // Check if quest is complete
            const isQuestComplete = gameData.quests.weekly.progress >= gameData.quests.weekly.maxProgress;
            
            // Calculate XP earned
            const xpEarned = isQuestComplete ? 250 : 75;
            
            // Calculate coins earned
            const coinsEarned = isQuestComplete ? 125 : 40;
            
            // Award XP
            awardXP(xpEarned);
            
            // Save game data
            saveGameData();
            
            // Show success message
            modal.querySelector('.modal-body').innerHTML = `
                <div class="text-center">
                    <h4 class="mb-4">Research Submitted!</h4>
                    
                    <div class="d-flex justify-content-center gap-4 my-4">
                        <div class="d-flex align-items-center">
                            <i class="bi bi-stars me-2" style="font-size: 1.5rem; color: #6941E0;"></i>
                            <span style="font-size: 1.5rem; font-weight: bold;">+${xpEarned} XP</span>
                        </div>
                        <div class="d-flex align-items-center">
                            <i class="bi bi-coin me-2" style="font-size: 1.5rem; color: #F59E0B;"></i>
                            <span style="font-size: 1.5rem; font-weight: bold;">+${coinsEarned} Coins</span>
                        </div>
                    </div>
                    
                    <div class="progress mb-3" style="height: 10px;">
                        <div class="progress-bar bg-success" role="progressbar" style="width: ${(gameData.quests.weekly.progress / gameData.quests.weekly.maxProgress) * 100}%;" aria-valuenow="${gameData.quests.weekly.progress}" aria-valuemin="0" aria-valuemax="${gameData.quests.weekly.maxProgress}"></div>
                    </div>
                    <p>Progress: ${gameData.quests.weekly.progress}/${gameData.quests.weekly.maxProgress}</p>
                    
                    ${isQuestComplete ? '<div class="alert alert-success"><i class="bi bi-check-circle-fill"></i> Weekly quest completed!</div>' : ''}
                </div>
            `;
            
            // Update weekly quest card progress bar
            updateWeeklyQuestProgress();
            
            // Update buttons
            modal.querySelector('.modal-footer').innerHTML = `
                <button type="button" class="btn btn-animated" data-bs-dismiss="modal">Continue</button>
            `;
        });
    }
    
    // Remove modal from DOM after closing
    modal.addEventListener('hidden.bs.modal', function() {
        modal.remove();
    });
}

// Update weekly quest progress
function updateWeeklyQuestProgress() {
    const progressBar = document.querySelector('.quest-card:not(.daily-challenge) .progress-bar');
    if (progressBar) {
        const progress = (gameData.quests.weekly.progress / gameData.quests.weekly.maxProgress) * 100;
        progressBar.style.width = `${progress}%`;
        progressBar.setAttribute('aria-valuenow', gameData.quests.weekly.progress);
    }
}