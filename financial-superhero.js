/**
 * PayXchangeable - Financial Superhero Generator
 * 
 * This file handles the functionality for the Financial Superhero Generator,
 * including quiz navigation, character customization, and result generation.
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize quiz navigation
    initQuizNavigation();
    
    // Initialize character customization
    initCharacterCustomization();
    
    // Initialize tab navigation
    initTabNavigation();
    
    // Initialize share functionality
    initShareFunctionality();
});

// Store user's financial profile and character choices
const userProfile = {
    quiz: {
        savingStyle: '',
        riskApproach: '',
        financialGoal: '',
        financialStrength: '',
        trackingStyle: ''
    },
    character: {
        base: 'masculine',
        costume: 'classic',
        accessory: 'cape',
        primaryColor: '#32127A',
        accentColor: '#E6C34A',
        name: ''
    },
    superhero: {
        name: 'Captain Savings',
        description: 'Master of financial discipline and long-term planning',
        superpowers: ['Budget Mastery', 'Debt Crusher', 'Savings Accelerator'],
        strengths: [
            'Consistent saving habits that build wealth over time',
            'Ability to avoid emotional financial decisions',
            'Excellent at planning for the long-term'
        ],
        weaknesses: [
            'Sometimes too cautious with investment opportunities',
            'Could benefit from more financial education'
        ],
        story: 'As Captain Savings, you have extraordinary abilities to maintain financial discipline and create long-term wealth. Your superpower is finding the perfect balance between enjoying life today and building a secure future.',
        recommendations: {
            next: 'Consider automating your savings to build your emergency fund faster. With your disciplined approach, setting up automatic transfers can help you reach your goals sooner.',
            money: 'Your careful approach to spending is excellent. To take it further, track your expenses for 30 days to identify areas where you might optimize further.',
            investment: 'With your cautious approach, consider a diversified portfolio with a mix of stable investments (70%) and growth opportunities (30%).'
        }
    }
};

// Initialize quiz navigation
function initQuizNavigation() {
    const prevButton = document.getElementById('prev-question');
    const nextButton = document.getElementById('next-question');
    const finishButton = document.getElementById('finish-quiz');
    const progressBar = document.querySelector('.progress-bar');
    const quizQuestions = document.querySelectorAll('.quiz-question');
    const totalQuestions = quizQuestions.length;
    let currentQuestion = 1;
    
    // Add click event for quiz options
    document.querySelectorAll('.quiz-option').forEach(option => {
        option.addEventListener('click', function() {
            // Remove selected class from all options in the same question
            const parentQuestion = this.closest('.quiz-question');
            parentQuestion.querySelectorAll('.quiz-option').forEach(opt => {
                opt.classList.remove('selected');
            });
            
            // Add selected class to the clicked option
            this.classList.add('selected');
            
            // Store the answer in userProfile
            const questionNum = parseInt(parentQuestion.getAttribute('data-question'));
            const value = this.getAttribute('data-value');
            
            switch(questionNum) {
                case 1:
                    userProfile.quiz.savingStyle = value;
                    break;
                case 2:
                    userProfile.quiz.riskApproach = value;
                    break;
                case 3:
                    userProfile.quiz.financialGoal = value;
                    break;
                case 4:
                    userProfile.quiz.financialStrength = value;
                    break;
                case 5:
                    userProfile.quiz.trackingStyle = value;
                    break;
            }
        });
    });
    
    // Previous button click
    prevButton.addEventListener('click', function() {
        if (currentQuestion > 1) {
            // Hide current question
            document.querySelector(`.quiz-question[data-question="${currentQuestion}"]`).classList.add('d-none');
            
            // Show previous question
            currentQuestion--;
            document.querySelector(`.quiz-question[data-question="${currentQuestion}"]`).classList.remove('d-none');
            
            // Update buttons
            nextButton.classList.remove('d-none');
            finishButton.classList.add('d-none');
            
            if (currentQuestion === 1) {
                prevButton.disabled = true;
            }
            
            // Update progress bar
            const progress = ((currentQuestion - 1) / totalQuestions) * 100;
            progressBar.style.width = progress + '%';
            progressBar.setAttribute('aria-valuenow', progress);
            progressBar.textContent = Math.round(progress) + '%';
        }
    });
    
    // Next button click
    nextButton.addEventListener('click', function() {
        // Check if the current question has been answered
        const currentQuestionElement = document.querySelector(`.quiz-question[data-question="${currentQuestion}"]`);
        const hasSelected = currentQuestionElement.querySelector('.quiz-option.selected');
        
        if (!hasSelected) {
            alert('Please select an answer before proceeding.');
            return;
        }
        
        if (currentQuestion < totalQuestions) {
            // Hide current question
            currentQuestionElement.classList.add('d-none');
            
            // Show next question
            currentQuestion++;
            document.querySelector(`.quiz-question[data-question="${currentQuestion}"]`).classList.remove('d-none');
            
            // Enable previous button
            prevButton.disabled = false;
            
            // Show finish button on last question
            if (currentQuestion === totalQuestions) {
                nextButton.classList.add('d-none');
                finishButton.classList.remove('d-none');
            }
            
            // Update progress bar
            const progress = ((currentQuestion - 1) / totalQuestions) * 100;
            progressBar.style.width = progress + '%';
            progressBar.setAttribute('aria-valuenow', progress);
            progressBar.textContent = Math.round(progress) + '%';
        }
    });
    
    // Finish button click
    finishButton.addEventListener('click', function() {
        // Check if the current question has been answered
        const currentQuestionElement = document.querySelector(`.quiz-question[data-question="${currentQuestion}"]`);
        const hasSelected = currentQuestionElement.querySelector('.quiz-option.selected');
        
        if (!hasSelected) {
            alert('Please select an answer before proceeding.');
            return;
        }
        
        // Update progress bar to 100%
        progressBar.style.width = '100%';
        progressBar.setAttribute('aria-valuenow', 100);
        progressBar.textContent = '100%';
        
        // Generate superhero based on quiz answers
        generateSuperheroFromQuiz();
        
        // Move to customize tab
        document.getElementById('customize-tab').click();
    });
}

// Initialize character customization
function initCharacterCustomization() {
    // Character option clicks
    document.querySelectorAll('.character-option').forEach(option => {
        option.addEventListener('click', function() {
            const type = this.getAttribute('data-type');
            const value = this.getAttribute('data-option');
            
            // Remove active class from all options of the same type
            document.querySelectorAll(`.character-option[data-type="${type}"]`).forEach(opt => {
                opt.classList.remove('active');
            });
            
            // Add active class to the clicked option
            this.classList.add('active');
            
            // Update userProfile
            userProfile.character[type] = value;
            
            // Update the character preview
            updateCharacterPreview();
        });
    });
    
    // Color option clicks
    const colorOptions = document.querySelectorAll('.color-option');
    colorOptions.forEach(option => {
        option.addEventListener('click', function() {
            const color = this.getAttribute('data-color');
            const colorGroup = this.closest('div');
            
            // Remove active class from all options in the same group
            colorGroup.querySelectorAll('.color-option').forEach(opt => {
                opt.classList.remove('active');
            });
            
            // Add active class to the clicked option
            this.classList.add('active');
            
            // Update userProfile
            if (colorGroup.previousElementSibling.textContent.includes('Primary')) {
                userProfile.character.primaryColor = color;
            } else {
                userProfile.character.accentColor = color;
            }
            
            // Update the character preview
            updateCharacterPreview();
        });
    });
    
    // Regenerate hero button
    document.getElementById('regenerate-hero').addEventListener('click', function() {
        // Show loading overlay
        document.getElementById('loading-overlay').classList.remove('d-none');
        
        // Generate random character options
        const bases = ['masculine', 'feminine', 'neutral', 'robot'];
        const costumes = ['classic', 'modern', 'business', 'casual'];
        const accessories = ['cape', 'shield', 'tech', 'coins'];
        const colors = ['#32127A', '#E6C34A', '#00a86b', '#0077b6', '#d62828', '#ff9f1c'];
        
        userProfile.character.base = bases[Math.floor(Math.random() * bases.length)];
        userProfile.character.costume = costumes[Math.floor(Math.random() * costumes.length)];
        userProfile.character.accessory = accessories[Math.floor(Math.random() * accessories.length)];
        userProfile.character.primaryColor = colors[Math.floor(Math.random() * colors.length)];
        
        // Make sure accent color is different from primary
        let accentColor;
        do {
            accentColor = colors[Math.floor(Math.random() * colors.length)];
        } while (accentColor === userProfile.character.primaryColor);
        
        userProfile.character.accentColor = accentColor;
        
        // Update UI to match new selections
        document.querySelectorAll('.character-option').forEach(option => {
            const type = option.getAttribute('data-type');
            const value = option.getAttribute('data-option');
            
            if (userProfile.character[type] === value) {
                option.classList.add('active');
            } else {
                option.classList.remove('active');
            }
        });
        
        document.querySelectorAll('.color-option').forEach(option => {
            const color = option.getAttribute('data-color');
            const colorGroup = option.closest('div');
            
            if (colorGroup.previousElementSibling.textContent.includes('Primary')) {
                if (color === userProfile.character.primaryColor) {
                    option.classList.add('active');
                } else {
                    option.classList.remove('active');
                }
            } else {
                if (color === userProfile.character.accentColor) {
                    option.classList.add('active');
                } else {
                    option.classList.remove('active');
                }
            }
        });
        
        // Update the character preview after a short delay (simulating generation time)
        setTimeout(() => {
            updateCharacterPreview();
            document.getElementById('loading-overlay').classList.add('d-none');
        }, 1000);
    });
    
    // Save hero button
    document.getElementById('save-hero').addEventListener('click', function() {
        // Get custom name if provided
        const customName = document.getElementById('heroName').value.trim();
        if (customName) {
            userProfile.superhero.name = customName;
            document.getElementById('superhero-name').textContent = customName;
        }
        
        // Finalize the superhero
        finalizeSuperhero();
        
        // Move to result tab
        document.getElementById('result-tab').click();
    });
}

// Initialize tab navigation
function initTabNavigation() {
    const tabs = document.querySelectorAll('button[data-bs-toggle="tab"]');
    
    tabs.forEach(tab => {
        tab.addEventListener('shown.bs.tab', function (event) {
            // If moving to result tab, update final display
            if (event.target.id === 'result-tab') {
                updateFinalDisplay();
            }
        });
    });
}

// Generate superhero based on quiz answers
function generateSuperheroFromQuiz() {
    // Determine the character's financial archetype based on quiz answers
    const archetype = determineFinancialArchetype();
    
    // Generate superhero details based on archetype
    generateSuperheroDetails(archetype);
    
    // Update the character preview
    updateCharacterPreview();
}

// Determine financial archetype based on quiz answers
function determineFinancialArchetype() {
    const { savingStyle, riskApproach, financialGoal, financialStrength, trackingStyle } = userProfile.quiz;
    
    // Simple scoring system to determine archetype
    let saverScore = 0;
    let investorScore = 0;
    let balancedScore = 0;
    let plannerScore = 0;
    
    // Saving style scoring
    if (savingStyle === 'saver') saverScore += 2;
    if (savingStyle === 'investor') investorScore += 2;
    if (savingStyle === 'balanced') balancedScore += 2;
    if (savingStyle === 'spender') balancedScore += 1;
    
    // Risk approach scoring
    if (riskApproach === 'cautious') saverScore += 2;
    if (riskApproach === 'aggressive') investorScore += 2;
    if (riskApproach === 'balanced') balancedScore += 2;
    if (riskApproach === 'moderate') plannerScore += 1;
    
    // Financial goal scoring
    if (financialGoal === 'security') saverScore += 2;
    if (financialGoal === 'growth') investorScore += 2;
    if (financialGoal === 'lifestyle') balancedScore += 2;
    if (financialGoal === 'debt') plannerScore += 2;
    
    // Financial strength scoring
    if (financialStrength === 'discipline') saverScore += 1;
    if (financialStrength === 'knowledge') investorScore += 1;
    if (financialStrength === 'balance') balancedScore += 1;
    if (financialStrength === 'adaptability') plannerScore += 1;
    
    // Tracking style scoring
    if (trackingStyle === 'detailed') plannerScore += 2;
    if (trackingStyle === 'automated') investorScore += 1;
    if (trackingStyle === 'minimal') balancedScore += 1;
    if (trackingStyle === 'intuitive') saverScore += 1;
    
    // Determine the highest score
    const scores = {
        'saver': saverScore,
        'investor': investorScore,
        'balanced': balancedScore,
        'planner': plannerScore
    };
    
    let highestArchetype = 'balanced';
    let highestScore = 0;
    
    for (const [archetype, score] of Object.entries(scores)) {
        if (score > highestScore) {
            highestScore = score;
            highestArchetype = archetype;
        }
    }
    
    return highestArchetype;
}

// Generate superhero details based on archetype
function generateSuperheroDetails(archetype) {
    switch(archetype) {
        case 'saver':
            userProfile.superhero = {
                name: 'Captain Savings',
                description: 'Master of financial discipline and long-term security',
                superpowers: ['Security Shield', 'Emergency Fund Force', 'Budget Mastery'],
                strengths: [
                    'Exceptional ability to save consistently',
                    'Strong resistance to impulse purchases',
                    'Master of financial security and stability'
                ],
                weaknesses: [
                    'Sometimes overly cautious with investment opportunities',
                    'May miss growth opportunities by focusing too much on safety'
                ],
                story: 'As Captain Savings, you have the extraordinary ability to resist financial temptations and build wealth through consistent saving. Your superpower is creating financial security shields that protect you from life\'s unexpected challenges.',
                recommendations: {
                    next: 'Consider diversifying some of your savings into low-risk investments to beat inflation while maintaining your security.',
                    money: 'Your saving discipline is excellent. Look into high-yield savings accounts or CDs to maximize your emergency fund returns.',
                    investment: 'Start with a conservative 80/20 portfolio (80% in stable investments, 20% in growth) to maintain security while adding some growth potential.'
                }
            };
            
            // Set default character elements for this archetype
            userProfile.character.base = 'masculine';
            userProfile.character.costume = 'classic';
            userProfile.character.accessory = 'shield';
            userProfile.character.primaryColor = '#0077b6'; // Blue
            userProfile.character.accentColor = '#E6C34A'; // Gold
            break;
            
        case 'investor':
            userProfile.superhero = {
                name: 'Growth Guardian',
                description: 'Master of wealth-building and strategic investments',
                superpowers: ['Market Vision', 'Risk Calculator', 'Compound Interest Accelerator'],
                strengths: [
                    'Excellent at identifying growth opportunities',
                    'Strategic long-term investment thinking',
                    'Comfortable with calculated risks for greater returns'
                ],
                weaknesses: [
                    'May need to strengthen emergency savings',
                    'Sometimes focuses too much on future gains over present security'
                ],
                story: 'As Growth Guardian, you possess the remarkable ability to see investment opportunities others miss. Your superpower is harnessing the force of compound interest to build wealth exponentially over time.',
                recommendations: {
                    next: 'Ensure you have a solid emergency fund of 3-6 months of expenses before increasing your investment allocation.',
                    money: 'Consider automating both your investments and a small emergency fund contribution to balance growth and security.',
                    investment: 'Your comfort with risk positions you well for a growth-oriented portfolio. Consider a 70/30 split between growth investments and more stable assets.'
                }
            };
            
            // Set default character elements for this archetype
            userProfile.character.base = 'masculine';
            userProfile.character.costume = 'business';
            userProfile.character.accessory = 'tech';
            userProfile.character.primaryColor = '#00a86b'; // Green
            userProfile.character.accentColor = '#32127A'; // Purple
            break;
            
        case 'balanced':
            userProfile.superhero = {
                name: 'Equilibrium',
                description: 'Master of financial harmony and life balance',
                superpowers: ['Balance Beam', 'Present-Future Vision', 'Joy Generator'],
                strengths: [
                    'Excellent at balancing present enjoyment with future security',
                    'Makes mindful spending decisions',
                    'Avoids extremes in financial behaviors'
                ],
                weaknesses: [
                    'May benefit from more specific financial goal-setting',
                    'Sometimes needs more detailed tracking to optimize finances'
                ],
                story: 'As Equilibrium, you have the unique ability to balance life\'s present joys with future financial needs. Your superpower is creating harmony between spending and saving, helping you build wealth without sacrificing quality of life.',
                recommendations: {
                    next: 'Consider setting specific financial goals with deadlines to give your balanced approach more direction.',
                    money: 'Your balanced approach is excellent. Consider using the 50/30/20 rule to further optimize your spending, saving, and investing.',
                    investment: 'A balanced 60/40 portfolio (60% growth investments, 40% conservative options) aligns well with your approach to finances.'
                }
            };
            
            // Set default character elements for this archetype
            userProfile.character.base = 'neutral';
            userProfile.character.costume = 'casual';
            userProfile.character.accessory = 'cape';
            userProfile.character.primaryColor = '#32127A'; // Purple
            userProfile.character.accentColor = '#E6C34A'; // Gold
            break;
            
        case 'planner':
            userProfile.superhero = {
                name: 'Master Strategist',
                description: 'Architect of financial futures and debt elimination',
                superpowers: ['Goal Crystallizer', 'Debt Crusher', 'Future Forecaster'],
                strengths: [
                    'Exceptional ability to create and follow detailed financial plans',
                    'Methodical approach to eliminating debt and building wealth',
                    'Excellent tracking and optimization of finances'
                ],
                weaknesses: [
                    'May sometimes get too focused on the plan and miss opportunities',
                    'Could benefit from more flexibility in financial approach'
                ],
                story: 'As Master Strategist, you have the remarkable ability to create detailed roadmaps to financial success. Your superpower is seeing the optimal path through financial challenges and systematically conquering goals one by one.',
                recommendations: {
                    next: 'Your planning skills are excellent. Consider scheduling quarterly financial review sessions to track progress and adjust your plans.',
                    money: 'Look into zero-based budgeting or similar detailed methods that leverage your planning strengths.',
                    investment: 'Create a detailed investment plan with specific targets for different asset classes. Consider a methodical dollar-cost averaging approach.'
                }
            };
            
            // Set default character elements for this archetype
            userProfile.character.base = 'robot';
            userProfile.character.costume = 'modern';
            userProfile.character.accessory = 'tech';
            userProfile.character.primaryColor = '#d62828'; // Red
            userProfile.character.accentColor = '#0077b6'; // Blue
            break;
    }
    
    // Update the superhero name and description in the UI
    document.getElementById('superhero-name').textContent = userProfile.superhero.name;
    document.getElementById('superhero-description').textContent = userProfile.superhero.description;
    
    // Update superpowers
    const superpowerBadges = userProfile.superhero.superpowers.map(power => 
        `<span class="superpower-badge">${power}</span>`
    ).join('');
    
    const superpowersContainer = document.querySelector('#superhero-preview').nextElementSibling.nextElementSibling;
    superpowersContainer.innerHTML = superpowerBadges;
}

// Function to generate SVG for a character (globally available)
function generateCharacterSVG(profile) {
    if (!profile || !profile.character) return '';
    
    // Default values if some are missing
    const characterType = profile.isVillain ? 'villain' : 'superhero';
    const primaryColor = profile.character.primaryColor || '#32127A';
    const accentColor = profile.character.accentColor || '#E6C34A';
    
    // Create SVG structure based on character parts
    let svg = `
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" class="character-svg" style="width: 100%; height: 100%">
        <g class="character-base" style="fill:${primaryColor}">
            <!-- Base shape -->
            <circle cx="100" cy="100" r="80" />
        </g>
        <g class="character-costume">
            <!-- Costume elements based on user selections -->
            ${getCostumeElements(profile)}
        </g>
        <g class="character-accessory" style="fill:${accentColor}">
            <!-- Accessory elements based on user selections -->
            ${getAccessoryElements(profile)}
        </g>
    </svg>
    `;
    
    return svg;
}

// Helper function to generate costume elements
function getCostumeElements(profile) {
    if (!profile || !profile.character) return '';
    
    let elements = '';
    const costumeType = profile.character.costume || 'classic';
    const primaryColor = profile.character.primaryColor || '#32127A';
    
    // Generate different costume SVG elements based on type
    switch(costumeType) {
        case 'classic':
            elements = `
            <path d="M70,80 L130,80 L130,120 Q100,140 70,120 Z" fill="${primaryColor}" />
            `;
            break;
        case 'modern':
            elements = `
            <rect x="70" y="80" width="60" height="90" rx="10" fill="${primaryColor}" />
            <rect x="80" y="100" width="40" height="20" rx="5" fill="#FFFFFF" opacity="0.3" />
            `;
            break;
        case 'business':
            elements = `
            <rect x="60" y="60" width="80" height="30" rx="15" fill="${primaryColor}" />
            <rect x="75" y="90" width="50" height="60" rx="5" fill="${primaryColor}" />
            `;
            break;
        case 'casual':
            elements = `
            <path d="M50,70 L100,40 L150,70 L130,100 L70,100 Z" fill="${primaryColor}" />
            <rect x="70" y="100" width="60" height="40" fill="${primaryColor}" opacity="0.8" />
            `;
            break;
        default:
            elements = `
            <path d="M70,80 L130,80 L130,120 Q100,140 70,120 Z" fill="${primaryColor}" />
            `;
    }
    
    return elements;
}

// Helper function to generate accessory elements
function getAccessoryElements(profile) {
    if (!profile || !profile.character) return '';
    
    let elements = '';
    const accessoryType = profile.character.accessory || 'cape';
    const accentColor = profile.character.accentColor || '#E6C34A';
    
    // Generate different accessory SVG elements based on type
    switch(accessoryType) {
        case 'cape':
            elements = `
            <path d="M70,60 Q100,80 130,60 L140,150 Q100,170 60,150 Z" fill="${accentColor}" />
            `;
            break;
        case 'shield':
            elements = `
            <path d="M100,50 L120,60 L120,90 Q100,110 80,90 L80,60 Z" fill="${accentColor}" />
            <circle cx="100" cy="75" r="10" fill="#FFFFFF" opacity="0.3" />
            `;
            break;
        case 'tech':
            elements = `
            <rect x="75" y="60" width="50" height="30" rx="5" fill="${accentColor}" />
            <circle cx="85" cy="75" r="5" fill="#FFFFFF" opacity="0.5" />
            <circle cx="100" cy="75" r="5" fill="#FFFFFF" opacity="0.5" />
            <circle cx="115" cy="75" r="5" fill="#FFFFFF" opacity="0.5" />
            `;
            break;
        case 'coins':
            elements = `
            <circle cx="80" cy="85" r="15" fill="${accentColor}" />
            <text x="80" y="90" font-family="Arial" font-size="20" text-anchor="middle" fill="#FFFFFF">$</text>
            <circle cx="120" cy="85" r="15" fill="${accentColor}" />
            <text x="120" y="90" font-family="Arial" font-size="20" text-anchor="middle" fill="#FFFFFF">$</text>
            `;
            break;
        default:
            elements = `
            <path d="M70,60 Q100,80 130,60 L140,150 Q100,170 60,150 Z" fill="${accentColor}" />
            `;
    }
    
    return elements;
}

// Update character preview based on current selections
function updateCharacterPreview() {
    try {
        console.log("Updating character preview");
        
        // Get the preview container
        const previewContainer = document.getElementById('superhero-preview');
        if (!previewContainer) {
            console.error("Preview container not found!");
            return;
        }
        
        // First, ensure we have the necessary DOM structure
        previewContainer.innerHTML = `
            <div class="superhero-part base" id="hero-base"></div>
            <div class="superhero-part costume" id="hero-costume"></div>
            <div class="superhero-part accessory" id="hero-accessory"></div>
        `;
        
        // Get references to the DOM elements for the character parts
        const baseElement = document.getElementById('hero-base');
        const costumeElement = document.getElementById('hero-costume');
        const accessoryElement = document.getElementById('hero-accessory');
        
        if (!baseElement || !costumeElement || !accessoryElement) {
            console.error("One or more character elements not found!");
            return;
        }
        
        // Set background colors based on primary and accent colors
        baseElement.style.backgroundColor = userProfile.character.primaryColor;
        accessoryElement.style.backgroundColor = userProfile.character.accentColor;
        
        // Apply custom styling based on character options
        // Base style
        let baseStyle = '';
        switch(userProfile.character.base) {
            case 'masculine':
                baseStyle = 'border-radius: 10px 10px 30% 30%; height: 70%; width: 40%; margin: 15% auto 0; position: relative;';
                break;
            case 'feminine':
                baseStyle = 'border-radius: 10px 10px 40% 40%; height: 70%; width: 35%; margin: 15% auto 0; position: relative;';
                break;
            case 'neutral':
                baseStyle = 'border-radius: 10px 10px 35% 35%; height: 70%; width: 38%; margin: 15% auto 0; position: relative;';
                break;
            case 'robot':
                baseStyle = 'border-radius: 0; height: 70%; width: 45%; margin: 15% auto 0; position: relative; clip-path: polygon(10% 0%, 90% 0%, 100% 15%, 100% 85%, 90% 100%, 10% 100%, 0% 85%, 0% 15%);';
                break;
        }
        baseElement.style.cssText = baseStyle;
        
        // Costume style
        let costumeStyle = '';
        switch(userProfile.character.costume) {
            case 'classic':
                costumeStyle = 'border-radius: 0; height: 40%; width: 60%; margin: 0 auto; position: absolute; bottom: 0; left: 20%; background-color: #fff;';
                break;
            case 'modern':
                costumeStyle = 'border-radius: 0; height: 50%; width: 70%; margin: 0 auto; position: absolute; bottom: 0; left: 15%; background-color: #333;';
                break;
            case 'business':
                costumeStyle = 'border-radius: 0; height: 45%; width: 100%; margin: 0 auto; position: absolute; bottom: 0; left: 0; background-color: #555;';
                break;
            case 'casual':
                costumeStyle = 'border-radius: 0; height: 35%; width: 80%; margin: 0 auto; position: absolute; bottom: 0; left: 10%; background-color: #777;';
                break;
        }
        costumeElement.style.cssText = costumeStyle;
        
        // Accessory style
        let accessoryStyle = '';
        switch(userProfile.character.accessory) {
            case 'cape':
                accessoryStyle = 'border-radius: 50% 50% 0 0; height: 80%; width: 80%; margin: 0 auto; position: absolute; bottom: 0; left: 10%; z-index: -1;';
                break;
            case 'shield':
                accessoryStyle = 'border-radius: 50%; height: 30%; width: 30%; position: absolute; top: 40%; left: -15%; z-index: 2;';
                break;
            case 'tech':
                accessoryStyle = 'border-radius: 10px; height: 20%; width: 20%; position: absolute; top: 30%; right: -10%; z-index: 2;';
                break;
            case 'coins':
                accessoryStyle = 'border-radius: 50%; height: 15%; width: 15%; position: absolute; bottom: 20%; right: -10%; z-index: 2; box-shadow: 0 0 0 5px rgba(255,255,255,0.6), 10px 10px 0 0 rgba(255,255,255,0.4), 20px 5px 0 0 rgba(255,255,255,0.3);';
                break;
        }
        accessoryElement.style.cssText = accessoryStyle;
        
        // Also update the name and description
        const nameElement = document.getElementById('superhero-name');
        const descElement = document.getElementById('superhero-description');
        
        if (nameElement) {
            nameElement.textContent = userProfile.superhero.name || 'Your Superhero';
        }
        
        if (descElement) {
            descElement.textContent = userProfile.superhero.description || 'Customize your financial superhero';
        }
        
        console.log("Character preview updated successfully");
    } catch (err) {
        console.error("Error updating character preview:", err);
    }
}

// Finalize the superhero and prepare for display
function finalizeSuperhero() {
    // In a real application, this would generate a more detailed superhero
    // based on both quiz results and customization choices
    
    // Make sure all details are set
    if (!userProfile.superhero.name) {
        userProfile.superhero.name = 'Financial Hero';
    }
    
    // Check if this is a villain character (based on available options)
    const villainElements = document.querySelectorAll('.villain-option');
    userProfile.isVillain = false;
    
    villainElements.forEach(element => {
        if (element.classList.contains('active')) {
            userProfile.isVillain = true;
        }
    });
    
    // Add a timestamp for when the character was created/updated
    userProfile.lastUpdated = new Date().toISOString();
    
    // Save the user profile to localStorage so it can be used across the site
    try {
        localStorage.setItem('userProfile', JSON.stringify(userProfile));
        console.log('Character saved to localStorage:', userProfile);
        
        // Show success message
        const saveMessage = document.createElement('div');
        saveMessage.className = 'alert alert-success mt-3';
        saveMessage.innerHTML = `
            <strong>Success!</strong> Your ${userProfile.isVillain ? 'villain' : 'superhero'} character has been saved 
            and will now appear across the PayXchangeable website instead of the corn mascot.
        `;
        
        // Find a good place to show the message
        const saveButton = document.getElementById('save-hero');
        if (saveButton && saveButton.parentNode) {
            saveButton.parentNode.appendChild(saveMessage);
            
            // Remove the message after a few seconds
            setTimeout(() => {
                saveMessage.remove();
            }, 5000);
        }
    } catch (e) {
        console.error('Error saving superhero character:', e);
    }
}

// Update final display
function updateFinalDisplay() {
    try {
        console.log("Updating final display");
        
        // Update superhero display in results using the same approach as preview
        const finalPreview = document.getElementById('final-superhero-preview');
        if (!finalPreview) {
            console.error("Final preview container not found!");
            return;
        }
        
        // First, ensure we have the necessary DOM structure
        finalPreview.innerHTML = `
            <div class="superhero-part base" id="final-hero-base"></div>
            <div class="superhero-part costume" id="final-hero-costume"></div>
            <div class="superhero-part accessory" id="final-hero-accessory"></div>
        `;
        
        // Get references to DOM elements
        const baseElement = document.getElementById('final-hero-base');
        const costumeElement = document.getElementById('final-hero-costume');
        const accessoryElement = document.getElementById('final-hero-accessory');
        
        if (!baseElement || !costumeElement || !accessoryElement) {
            console.error("One or more final character elements not found!");
            return;
        }
        
        // Copy styles from preview elements if they exist
        const previewBase = document.getElementById('hero-base');
        const previewCostume = document.getElementById('hero-costume');
        const previewAccessory = document.getElementById('hero-accessory');
        
        if (previewBase && previewCostume && previewAccessory) {
            baseElement.style.cssText = previewBase.style.cssText;
            costumeElement.style.cssText = previewCostume.style.cssText;
            accessoryElement.style.cssText = previewAccessory.style.cssText;
            
            // Set colors explicitly
            baseElement.style.backgroundColor = userProfile.character.primaryColor;
            accessoryElement.style.backgroundColor = userProfile.character.accentColor;
        } else {
            console.log("Preview elements not found, generating styles from scratch");
            
            // Apply the same styling as in updateCharacterPreview
            baseElement.style.backgroundColor = userProfile.character.primaryColor;
            accessoryElement.style.backgroundColor = userProfile.character.accentColor;
            
            // Base style
            let baseStyle = '';
            switch(userProfile.character.base) {
                case 'masculine':
                    baseStyle = 'border-radius: 10px 10px 30% 30%; height: 70%; width: 40%; margin: 15% auto 0; position: relative;';
                    break;
                case 'feminine':
                    baseStyle = 'border-radius: 10px 10px 40% 40%; height: 70%; width: 35%; margin: 15% auto 0; position: relative;';
                    break;
                case 'neutral':
                    baseStyle = 'border-radius: 10px 10px 35% 35%; height: 70%; width: 38%; margin: 15% auto 0; position: relative;';
                    break;
                case 'robot':
                    baseStyle = 'border-radius: 0; height: 70%; width: 45%; margin: 15% auto 0; position: relative; clip-path: polygon(10% 0%, 90% 0%, 100% 15%, 100% 85%, 90% 100%, 10% 100%, 0% 85%, 0% 15%);';
                    break;
            }
            baseElement.style.cssText = baseStyle;
            
            // Costume style
            let costumeStyle = '';
            switch(userProfile.character.costume) {
                case 'classic':
                    costumeStyle = 'border-radius: 0; height: 40%; width: 60%; margin: 0 auto; position: absolute; bottom: 0; left: 20%; background-color: #fff;';
                    break;
                case 'modern':
                    costumeStyle = 'border-radius: 0; height: 50%; width: 70%; margin: 0 auto; position: absolute; bottom: 0; left: 15%; background-color: #333;';
                    break;
                case 'business':
                    costumeStyle = 'border-radius: 0; height: 45%; width: 100%; margin: 0 auto; position: absolute; bottom: 0; left: 0; background-color: #555;';
                    break;
                case 'casual':
                    costumeStyle = 'border-radius: 0; height: 35%; width: 80%; margin: 0 auto; position: absolute; bottom: 0; left: 10%; background-color: #777;';
                    break;
            }
            costumeElement.style.cssText = costumeStyle;
            
            // Accessory style
            let accessoryStyle = '';
            switch(userProfile.character.accessory) {
                case 'cape':
                    accessoryStyle = 'border-radius: 50% 50% 0 0; height: 80%; width: 80%; margin: 0 auto; position: absolute; bottom: 0; left: 10%; z-index: -1;';
                    break;
                case 'shield':
                    accessoryStyle = 'border-radius: 50%; height: 30%; width: 30%; position: absolute; top: 40%; left: -15%; z-index: 2;';
                    break;
                case 'tech':
                    accessoryStyle = 'border-radius: 10px; height: 20%; width: 20%; position: absolute; top: 30%; right: -10%; z-index: 2;';
                    break;
                case 'coins':
                    accessoryStyle = 'border-radius: 50%; height: 15%; width: 15%; position: absolute; bottom: 20%; right: -10%; z-index: 2; box-shadow: 0 0 0 5px rgba(255,255,255,0.6), 10px 10px 0 0 rgba(255,255,255,0.4), 20px 5px 0 0 rgba(255,255,255,0.3);';
                    break;
            }
            accessoryElement.style.cssText = accessoryStyle;
        }
        
        console.log("Final display updated successfully");
    } catch (err) {
        console.error("Error updating final display:", err);
    }
    
    // Update name and description
    document.getElementById('final-superhero-name').textContent = userProfile.superhero.name;
    document.getElementById('final-superhero-description').textContent = userProfile.superhero.description;
    
    // Update superpowers
    const superpowerBadges = userProfile.superhero.superpowers.map(power => 
        `<span class="superpower-badge">${power}</span>`
    ).join('');
    document.getElementById('final-superpowers').innerHTML = superpowerBadges;
    
    // Update story
    document.getElementById('hero-story').textContent = userProfile.superhero.story;
    
    // Update strengths
    const strengthsList = userProfile.superhero.strengths.map(strength => 
        `<li class="list-group-item"><i class="bi bi-check-circle-fill text-success me-2"></i> ${strength}</li>`
    ).join('');
    document.getElementById('financial-strengths').innerHTML = strengthsList;
    
    // Update weaknesses
    const weaknessesList = userProfile.superhero.weaknesses.map(weakness => 
        `<li class="list-group-item"><i class="bi bi-arrow-up-circle-fill text-primary me-2"></i> ${weakness}</li>`
    ).join('');
    document.getElementById('financial-weaknesses').innerHTML = weaknessesList;
    
    // Update recommendations
    document.getElementById('recommendation-next').textContent = userProfile.superhero.recommendations.next;
    document.getElementById('recommendation-money').textContent = userProfile.superhero.recommendations.money;
    document.getElementById('recommendation-investment').textContent = userProfile.superhero.recommendations.investment;
}

// Initialize share functionality
function initShareFunctionality() {
    // Download button
    document.getElementById('download-superhero').addEventListener('click', function() {
        // In a real application, this would use html2canvas to capture the superhero
        // and download it as an image
        
        const superheroContainer = document.getElementById('final-superhero-preview');
        
        html2canvas(superheroContainer).then(canvas => {
            const imgData = canvas.toDataURL('image/png');
            const link = document.createElement('a');
            link.href = imgData;
            link.download = `${userProfile.superhero.name.replace(/\s+/g, '-').toLowerCase()}.png`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        });
    });
    
    // Share buttons
    document.getElementById('share-facebook').addEventListener('click', function(e) {
        e.preventDefault();
        const shareText = `Meet my financial superhero: ${userProfile.superhero.name}! Create your own at PayXchangeable.`;
        const shareUrl = encodeURIComponent(window.location.href);
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}&quote=${encodeURIComponent(shareText)}`, '_blank');
    });
    
    document.getElementById('share-twitter').addEventListener('click', function(e) {
        e.preventDefault();
        const shareText = `Meet my financial superhero: ${userProfile.superhero.name}! ${userProfile.superhero.description} Create your own at PayXchangeable.`;
        const shareUrl = encodeURIComponent(window.location.href);
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${shareUrl}`, '_blank');
    });
    
    document.getElementById('share-email').addEventListener('click', function(e) {
        e.preventDefault();
        const subject = `Check out my Financial Superhero: ${userProfile.superhero.name}`;
        const body = `I created a financial superhero with PayXchangeable!\n\nMeet ${userProfile.superhero.name}, ${userProfile.superhero.description.toLowerCase()}\n\nCreate your own superhero at: ${window.location.href}`;
        window.location.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    });
}