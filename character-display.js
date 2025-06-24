/**
 * Character Display JS
 * 
 * This script handles displaying the user's superhero/villain character 
 * across the PayXchangeable website, replacing the old corn mascot.
 */

(function() {
    // Function to generate SVG for a character
    function generateCharacterSVG(profile) {
        if (!profile || !profile.character) return '';
        
        // Default values if some are missing
        const characterType = profile.isVillain ? 'villain' : 'superhero';
        const primaryColor = profile.character.primaryColor || '#3273dc';
        const accentColor = profile.character.accentColor || '#ff3860';
        
        // Create SVG structure based on character parts
        let svg = `
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" class="character-svg">
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
    
    // Function to display user character in specified container
    function displayUserCharacter(containerId) {
        // Try to get user profile from localStorage
        let userProfile;
        try {
            const savedProfile = localStorage.getItem('userProfile');
            if (savedProfile) {
                userProfile = JSON.parse(savedProfile);
            }
        } catch (e) {
            console.error('Error retrieving user profile:', e);
            return;
        }
        
        // If no saved profile, don't display anything
        if (!userProfile) return;
        
        // Find container
        const container = document.getElementById(containerId);
        if (!container) return;
        
        // Generate and insert character SVG
        const characterSvg = generateCharacterSVG(userProfile);
        container.innerHTML = characterSvg;
        
        // Add character name if available and there's a suitable place
        const nameContainer = document.getElementById(`${containerId}-name`);
        if (nameContainer && userProfile.superhero && userProfile.superhero.name) {
            nameContainer.textContent = userProfile.superhero.name;
        }
    }
    
    // Function to replace all corn mascot instances with the user's character
    function replaceAllCornMascots() {
        // Get user profile
        let userProfile;
        try {
            const savedProfile = localStorage.getItem('userProfile');
            if (savedProfile) {
                userProfile = JSON.parse(savedProfile);
            } else {
                // No saved character, nothing to replace
                return;
            }
        } catch (e) {
            console.error('Error retrieving user profile:', e);
            return;
        }
        
        // Look for all corn mascot images
        const cornMascotImages = document.querySelectorAll('img[src*="corn-mascot"]');
        if (cornMascotImages.length === 0) {
            // Also look for character containers that might be empty
            const characterContainers = document.querySelectorAll('.character-container, .mascot-container');
            characterContainers.forEach(container => {
                // Generate SVG
                const characterSvg = generateCharacterSVG(userProfile);
                
                // Replace content
                container.innerHTML = characterSvg;
                
                // Add a class to mark it as replaced
                container.classList.add('user-character-active');
            });
        } else {
            // Replace each corn mascot image
            cornMascotImages.forEach(img => {
                // Create a new div to hold the SVG
                const characterContainer = document.createElement('div');
                characterContainer.className = 'user-character-container';
                characterContainer.style.width = img.width ? `${img.width}px` : '100px';
                characterContainer.style.height = img.height ? `${img.height}px` : '100px';
                
                // Generate SVG
                const characterSvg = generateCharacterSVG(userProfile);
                characterContainer.innerHTML = characterSvg;
                
                // Replace the image with the new container
                if (img.parentNode) {
                    img.parentNode.replaceChild(characterContainer, img);
                }
            });
        }
        
        // Also look for specific character display containers
        const specificContainers = [
            'header-character',
            'sidebar-character',
            'footer-character',
            'mascot-display'
        ];
        
        specificContainers.forEach(containerId => {
            const container = document.getElementById(containerId);
            if (container) {
                const characterSvg = generateCharacterSVG(userProfile);
                container.innerHTML = characterSvg;
                container.classList.add('user-character-active');
            }
        });
    }
    
    // Run when DOM is loaded
    document.addEventListener('DOMContentLoaded', function() {
        console.log('Character display script loaded');
        
        // Check for user profile in localStorage
        try {
            const savedProfile = localStorage.getItem('userProfile');
            if (savedProfile) {
                console.log('Found user profile in localStorage');
                const userProfile = JSON.parse(savedProfile);
                console.log('User profile details:', userProfile);
            } else {
                console.log('No user profile found in localStorage');
            }
        } catch (e) {
            console.error('Error checking for user profile:', e);
        }
        
        // Character display functionality disabled
        console.log('Character display disabled - no guided tour');
        
        // If we're on the financial superhero page, also make sure to attach
        // event listeners to update the character in real-time when customized
        if (window.location.href.includes('financial-superhero.html')) {
            console.log('On financial superhero page');
            
            // Check if customization controls exist
            const customizationSection = document.querySelector('.character-customization');
            if (customizationSection) {
                // Attach event listeners to customization controls
                // (This is handled by financial-superhero.js, so we don't need to duplicate)
                console.log('Financial superhero page detected, character display integration active');
                
                // Debug: Attach save button event listener
                const saveButton = document.getElementById('save-hero');
                if (saveButton) {
                    console.log('Found save button');
                    
                    // We won't override the click handler, just debug when it's clicked
                    const originalClick = saveButton.onclick;
                    saveButton.addEventListener('click', function() {
                        console.log('Save hero button clicked');
                        
                        // Check localStorage after a short delay to see if it was saved
                        setTimeout(() => {
                            try {
                                const savedProfile = localStorage.getItem('userProfile');
                                if (savedProfile) {
                                    console.log('Profile saved successfully');
                                } else {
                                    console.log('Profile not saved to localStorage');
                                }
                            } catch (e) {
                                console.error('Error checking localStorage after save:', e);
                            }
                        }, 500);
                    });
                } else {
                    console.log('Save button not found');
                }
            } else {
                console.log('Customization section not found');
            }
        }
    });
    
    // Expose functions to global scope if needed in other scripts
    window.PayXchangeableCharacter = {
        displayUserCharacter: displayUserCharacter,
        generateCharacterSVG: generateCharacterSVG,
        replaceAllCornMascots: replaceAllCornMascots
    };
})();