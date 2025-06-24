/**
 * PayXchangeable - Personalized Financial Superhero Character Generator
 * 
 * This file enhances the Financial Superhero Creator with more personalization options,
 * visual elements, and SVG-based character generation.
 * 
 * Features both human avatars with inclusive skin tones and gender options,
 * as well as animal avatars for those who prefer non-human representations.
 */

// Character components library (SVG paths and configurations)
const characterLibrary = {
    // Body types/silhouettes for human characters with different skin tone options
    bodies: {
        // Human body types
        masculine: {
            path: "M50,20 C70,20 80,30 80,50 L80,150 C80,180 70,200 50,200 C30,200 20,180 20,150 L20,50 C20,30 30,20 50,20 Z",
            viewBox: "0 0 100 220"
        },
        feminine: {
            path: "M50,20 C65,20 75,30 75,50 L75,90 C75,100 80,110 80,120 L80,150 C80,180 70,200 50,200 C30,200 20,180 20,150 L20,120 C20,110 25,100 25,90 L25,50 C25,30 35,20 50,20 Z",
            viewBox: "0 0 100 220"
        },
        neutral: {
            path: "M50,20 C65,20 75,30 75,50 L75,150 C75,180 65,200 50,200 C35,200 25,180 25,150 L25,50 C25,30 35,20 50,20 Z",
            viewBox: "0 0 100 220"
        },
        robot: {
            path: "M30,20 L70,20 L80,40 L80,150 L70,180 L30,180 L20,150 L20,40 L30,20 Z",
            viewBox: "0 0 100 200"
        },
        
        // Animal body types
        dog: {
            path: "M50,30 C70,30 80,40 75,50 C85,60 85,70 85,80 C85,90 80,100 75,110 L70,150 C70,180 60,200 50,200 C40,200 30,180 30,150 L25,110 C20,100 15,90 15,80 C15,70 15,60 25,50 C20,40 30,30 50,30 Z M15,60 C10,65 5,70 10,75 C15,80 20,75 20,70 Z M85,60 C90,65 95,70 90,75 C85,80 80,75 80,70 Z",
            viewBox: "0 0 100 220"
        },
        cat: {
            path: "M50,30 C65,30 75,40 75,50 C75,60 80,70 80,80 C80,90 75,100 70,110 L70,150 C70,180 60,200 50,200 C40,200 30,180 30,150 L30,110 C25,100 20,90 20,80 C20,70 25,60 25,50 C25,40 35,30 50,30 Z M20,40 L10,20 L25,35 Z M80,40 L90,20 L75,35 Z",
            viewBox: "0 0 100 220"
        },
        bunny: {
            path: "M50,30 C65,30 75,40 75,50 C75,60 80,70 80,80 C80,90 75,100 70,110 L70,150 C70,180 60,200 50,200 C40,200 30,180 30,150 L30,110 C25,100 20,90 20,80 C20,70 25,60 25,50 C25,40 35,30 50,30 Z M30,30 L25,5 L35,20 Z M70,30 L75,5 L65,20 Z",
            viewBox: "0 0 100 220"
        },
        unicorn: {
            path: "M50,30 C70,30 80,40 75,50 C85,60 85,70 85,80 C85,90 80,100 75,110 L70,150 C70,180 60,200 50,200 C40,200 30,180 30,150 L25,110 C20,100 15,90 15,80 C15,70 15,60 25,50 C20,40 30,30 50,30 Z M15,60 C10,65 5,70 10,75 C15,80 20,75 20,70 Z M85,60 C90,65 95,70 90,75 C85,80 80,75 80,70 Z M50,30 L50,5 L50,30 Z",
            viewBox: "0 0 100 220"
        },
        pig: {
            path: "M50,30 C70,30 85,40 85,60 C85,70 80,80 80,90 L75,150 C75,180 65,200 50,200 C35,200 25,180 25,150 L20,90 C20,80 15,70 15,60 C15,40 30,30 50,30 Z M30,60 C25,60 25,70 30,70 C35,70 35,60 30,60 Z M70,60 C65,60 65,70 70,70 C75,70 75,60 70,60 Z M50,70 C45,75 45,85 50,90 C55,85 55,75 50,70 Z",
            viewBox: "0 0 100 220"
        },
        mouse: {
            path: "M50,30 C65,30 75,40 75,50 C75,60 80,70 80,80 C80,90 75,100 70,110 L70,150 C70,180 60,200 50,200 C40,200 30,180 30,150 L30,110 C25,100 20,90 20,80 C20,70 25,60 25,50 C25,40 35,30 50,30 Z M25,40 L10,20 L25,30 Z M75,40 L90,20 L75,30 Z M50,60 L50,70 C40,75 60,75 50,70 Z",
            viewBox: "0 0 100 220"
        },
        fish: {
            path: "M50,30 C80,30 90,60 90,100 C90,140 80,170 50,170 C20,170 10,140 10,100 C10,60 20,30 50,30 Z M80,100 L95,85 L95,115 Z M20,70 C15,70 15,80 20,80 C25,80 25,70 20,70 Z",
            viewBox: "0 0 100 200"
        },
        horse: {
            path: "M50,30 C70,30 80,40 75,50 C85,60 85,70 85,80 C85,90 80,100 75,110 L70,150 C70,180 60,200 50,200 C40,200 30,180 30,150 L25,110 C20,100 15,90 15,80 C15,70 15,60 25,50 C20,40 30,30 50,30 Z M50,30 L40,5 L45,25 Z M50,30 L60,5 L55,25 Z",
            viewBox: "0 0 100 220"
        },
        goat: {
            path: "M50,30 C70,30 80,40 75,50 C85,60 85,70 85,80 C85,90 80,100 75,110 L70,150 C70,180 60,200 50,200 C40,200 30,180 30,150 L25,110 C20,100 15,90 15,80 C15,70 15,60 25,50 C20,40 30,30 50,30 Z M35,30 L25,10 L35,25 Z M65,30 L75,10 L65,25 Z M50,70 C45,75 45,85 50,85 C55,85 55,75 50,70 Z",
            viewBox: "0 0 100 220"
        },
        lamb: {
            path: "M50,30 C70,30 80,40 80,60 C80,70 90,65 90,80 C90,90 80,85 80,90 L75,150 C75,180 65,200 50,200 C35,200 25,180 25,150 L20,90 C20,85 10,90 10,80 C10,65 20,70 20,60 C20,40 30,30 50,30 Z M50,60 C45,65 45,75 50,75 C55,75 55,65 50,60 Z",
            viewBox: "0 0 100 220"
        }
    },
    
    // Skin tones for human avatars
    skinTones: {
        light: "#FFE0BD",       // Light skin tone
        medium: "#D8A77D",      // Medium skin tone
        tan: "#C68642",         // Tan/olive skin tone
        brown: "#8D5524",       // Brown skin tone
        dark: "#5C3317",        // Dark brown skin tone
        custom: "#F8D25C"       // Custom "superhero" gold tone
    },
    
    // Animal coat colors
    animalColors: {
        brown: "#8B4513",       // Brown
        black: "#2C3E50",       // Black
        white: "#FFFFFF",       // White
        grey: "#808080",        // Grey
        gold: "#DAA520",        // Gold
        orange: "#FF8C00",      // Orange
        cream: "#FFFDD0",       // Cream
        pink: "#FFC0CB",        // Pink (for pig)
        blue: "#1E90FF",        // Blue (fantasy color)
        purple: "#9370DB",      // Purple (fantasy color)
        green: "#3CB371"        // Green (fantasy color)
    },
    
    // Costume designs
    costumes: {
        classic: {
            torso: "M25,80 L75,80 L75,180 L25,180 Z",
            emblem: "M50,100 m-15,0 a15,15 0 1,0 30,0 a15,15 0 1,0 -30,0 Z",
            viewBox: "0 0 100 200"
        },
        modern: {
            torso: "M25,80 L75,80 L80,180 L20,180 Z",
            emblem: "M50,100 l-15,-15 h30 Z",
            viewBox: "0 0 100 200"
        },
        business: {
            torso: "M20,80 L80,80 L80,180 L20,180 Z",
            emblem: "M35,90 L65,90 L65,110 L35,110 Z",
            viewBox: "0 0 100 200"
        },
        casual: {
            torso: "M30,80 L70,80 L75,180 L25,180 Z",
            emblem: "M40,100 L60,100 L60,120 L40,120 Z",
            viewBox: "0 0 100 200"
        }
    },
    
    // Accessories
    accessories: {
        cape: {
            path: "M25,40 L75,40 L100,180 L0,180 Z",
            viewBox: "0 0 100 200"
        },
        shield: {
            path: "M50,70 m-25,0 a25,40 0 1,0 50,0 a25,40 0 1,0 -50,0 Z",
            viewBox: "0 0 100 150"
        },
        tech: {
            path: "M30,70 L70,70 L65,100 L35,100 Z M40,100 L60,100 L55,130 L45,130 Z",
            viewBox: "0 0 100 150"
        },
        coins: {
            path: "M30,80 m-10,0 a10,10 0 1,0 20,0 a10,10 0 1,0 -20,0 Z M50,100 m-15,0 a15,15 0 1,0 30,0 a15,15 0 1,0 -30,0 Z M70,80 m-10,0 a10,10 0 1,0 20,0 a10,10 0 1,0 -20,0 Z",
            viewBox: "0 0 100 130"
        }
    },
    
    // Head elements
    heads: {
        mask: {
            path: "M50,30 m-20,0 a20,20 0 1,0 40,0 a20,20 0 1,0 -40,0 Z M30,30 L40,45 L60,45 L70,30 Z",
            viewBox: "0 0 100 50"
        },
        helmet: {
            path: "M50,10 C70,10 75,30 75,40 L70,50 L30,50 L25,40 C25,30 30,10 50,10 Z",
            viewBox: "0 0 100 60"
        },
        glasses: {
            path: "M35,30 m-10,0 a10,10 0 1,0 20,0 a10,10 0 1,0 -20,0 Z M65,30 m-10,0 a10,10 0 1,0 20,0 a10,10 0 1,0 -20,0 Z M45,30 L55,30 Z",
            viewBox: "0 0 100 50"
        },
        crown: {
            path: "M30,30 L40,10 L50,20 L60,10 L70,30 Z",
            viewBox: "0 0 100 40"
        }
    },
    
    // Power effects
    powers: {
        glow: {
            path: "M50,100 m-40,0 a40,40 0 1,0 80,0 a40,40 0 1,0 -80,0 Z",
            viewBox: "0 0 100 200",
            opacity: 0.3
        },
        lightning: {
            path: "M45,20 L60,80 L40,80 L55,180 M65,20 L80,80 L60,80 L75,180 M25,20 L40,80 L20,80 L35,180",
            viewBox: "0 0 100 200",
            strokeWidth: 2,
            fill: "none"
        },
        bubbles: {
            path: "M30,50 m-5,0 a5,5 0 1,0 10,0 a5,5 0 1,0 -10,0 Z M50,30 m-7,0 a7,7 0 1,0 14,0 a7,7 0 1,0 -14,0 Z M70,60 m-6,0 a6,6 0 1,0 12,0 a6,6 0 1,0 -12,0 Z M40,80 m-8,0 a8,8 0 1,0 16,0 a8,8 0 1,0 -16,0 Z M80,40 m-4,0 a4,4 0 1,0 8,0 a4,4 0 1,0 -8,0 Z",
            viewBox: "0 0 100 100",
            opacity: 0.7
        },
        stars: {
            path: "M20,30 l2,-1 l1,-2 l1,2 l2,1 l-2,1 l-1,2 l-1,-2 Z M50,20 l3,-1.5 l1.5,-3 l1.5,3 l3,1.5 l-3,1.5 l-1.5,3 l-1.5,-3 Z M80,30 l2,-1 l1,-2 l1,2 l2,1 l-2,1 l-1,2 l-1,-2 Z M30,80 l2.5,-1.2 l1.2,-2.5 l1.2,2.5 l2.5,1.2 l-2.5,1.2 l-1.2,2.5 l-1.2,-2.5 Z M70,70 l2,-1 l1,-2 l1,2 l2,1 l-2,1 l-1,2 l-1,-2 Z",
            viewBox: "0 0 100 100",
            opacity: 0.9
        }
    }
};

// Financial archetype traits (expanded from the existing ones)
const archetypeTraits = {
    // Hero archetypes
    saver: {
        name: 'Captain Savings',
        title: 'Master of Financial Discipline',
        description: 'Master of financial discipline and long-term security',
        primaryColor: '#0077b6', // Blue
        accentColor: '#E6C34A', // Gold
        baseType: 'masculine',
        costumeType: 'classic',
        accessoryType: 'shield',
        headType: 'helmet',
        powerType: 'glow',
        isVillain: false,
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
    },
    
    investor: {
        name: 'Growth Guardian',
        title: 'Master of Strategic Investments',
        description: 'Master of wealth-building and strategic investments',
        primaryColor: '#00a86b', // Green
        accentColor: '#32127A', // Purple
        baseType: 'masculine',
        costumeType: 'business',
        accessoryType: 'tech',
        headType: 'glasses',
        powerType: 'lightning',
        isVillain: false,
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
    },
    
    balanced: {
        name: 'Equilibrium',
        title: 'Master of Financial Harmony',
        description: 'Master of financial harmony and life balance',
        primaryColor: '#32127A', // Purple
        accentColor: '#E6C34A', // Gold
        baseType: 'neutral',
        costumeType: 'casual',
        accessoryType: 'cape',
        headType: 'mask',
        powerType: 'stars',
        isVillain: false,
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
    },
    
    planner: {
        name: 'Master Strategist',
        title: 'Architect of Financial Futures',
        description: 'Architect of financial futures and debt elimination',
        primaryColor: '#d62828', // Red
        accentColor: '#0077b6', // Blue
        baseType: 'robot',
        costumeType: 'modern',
        accessoryType: 'tech',
        headType: 'crown',
        powerType: 'bubbles',
        isVillain: false,
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
    },
    
    // Special archetypes
    skulkams: {
        name: 'Skulkams Champion',
        title: 'Master of Cryptocurrency',
        description: 'Pioneer of digital currency and fee reduction',
        primaryColor: '#FF00FF', // Magenta (Skulkams branding)
        accentColor: '#00C957', // Kelly Green (Skulkams branding)
        baseType: 'neutral',
        costumeType: 'modern',
        accessoryType: 'coins',
        headType: 'glasses',
        powerType: 'lightning',
        isVillain: false,
        superpowers: ['Fee Reducer', 'Digital Vanguard', 'Blockchain Navigator'],
        strengths: [
            'Embraces innovative financial technologies',
            'Saves 99% on transaction fees with Skulkams',
            'Understands the future of digital currency'
        ],
        weaknesses: [
            'May need to balance crypto with traditional investments',
            'Could benefit from more traditional financial education'
        ],
        story: 'As Skulkams Champion, you lead the charge into the future of finance with cutting-edge digital currency. Your superpower is reducing transaction fees to nearly zero while transferring value instantly across platforms.',
        recommendations: {
            next: 'Consider using Skulkams for all your regular transfers to maximize your fee savings.',
            money: 'Your tech-forward approach is excellent. Make sure to keep a small emergency fund in traditional currency as well.',
            investment: 'Consider a portfolio that includes 60% Skulkams, 20% other cryptocurrencies, and a 20% traditional investment base.'
        }
    },
    
    ebt: {
        name: 'Benefit Maximizer',
        title: 'Master of Resource Optimization',
        description: 'Expert at maximizing benefits and support systems',
        primaryColor: '#32127A', // Persian Indigo (PayXc branding)
        accentColor: '#89756b', // Brown (PayXc branding)
        baseType: 'feminine',
        costumeType: 'casual',
        accessoryType: 'shield',
        headType: 'mask',
        powerType: 'glow',
        isVillain: false,
        superpowers: ['Resource Allocator', 'Benefit Navigator', 'Support Maximizer'],
        strengths: [
            'Expert at finding and using available resources and benefits',
            'Strategically plans finances to optimize support',
            'Builds financial bridges to long-term independence'
        ],
        weaknesses: [
            'Sometimes needs more planning for financial transitions',
            'Could benefit from more investment education'
        ],
        story: 'As Benefit Maximizer, you have the unique ability to navigate complex benefit systems and use them as stepping stones to financial independence. Your superpower is making every dollar work harder through strategic planning and resource optimization.',
        recommendations: {
            next: 'Consider using the PayXchangeable EBT bridge to seamlessly transfer between benefits and personal accounts.',
            money: 'Your resource management is excellent. Create a 6-month transition plan that builds toward financial independence.',
            investment: 'Start with micro-investing apps that let you invest small amounts consistently as your situation improves.'
        }
    },
    
    // Villain archetypes
    impulseSpender: {
        name: 'Impulse Menace',
        title: 'Master of Spontaneous Spending',
        description: 'Tempts others into impulsive financial decisions',
        primaryColor: '#8B0000', // Dark Red
        accentColor: '#FFD700', // Gold
        baseType: 'feminine',
        costumeType: 'modern',
        accessoryType: 'cape',
        headType: 'mask',
        powerType: 'lightning',
        isVillain: true,
        superpowers: ['Instant Gratification Ray', 'FOMO Inducer', 'Retail Therapy Blast'],
        strengths: [
            'Unmatched ability to spot tempting deals',
            'Can rationalize any purchase',
            'Never experiences buyer\'s remorse'
        ],
        weaknesses: [
            'Empty bank account at month\'s end',
            'Credit card debt accumulation',
            'No emergency savings'
        ],
        story: 'As Impulse Menace, you possess the uncanny ability to justify any purchase as "necessary" and lure others into spontaneous spending sprees. Your power to create temporary happiness through acquisition is legendary, though the credit card statements that follow leave a trail of financial chaos.',
        recommendations: {
            next: 'Try implementing a 48-hour waiting period before any non-essential purchase.',
            money: 'Consider using cash envelopes to limit spontaneous spending and create physical boundaries.',
            defense: 'Create automatic transfers to savings on payday before you have a chance to spend.'
        }
    },
    
    debtTrapper: {
        name: 'The Debt Trapper',
        title: 'Master of Financial Bondage',
        description: 'Ensnares victims in complex debt structures',
        primaryColor: '#2F4F4F', // Dark Slate Gray
        accentColor: '#C0C0C0', // Silver
        baseType: 'masculine',
        costumeType: 'business',
        accessoryType: 'tech',
        headType: 'crown',
        powerType: 'bubbles',
        isVillain: true,
        superpowers: ['Fine Print Hypnotism', 'Interest Rate Escalator', 'Minimum Payment Manipulator'],
        strengths: [
            'Expert at creating complex, hard-to-escape debt traps',
            'Masters psychological tactics to encourage overspending',
            'Can make terrible financial deals seem attractive'
        ],
        weaknesses: [
            'Defeated by financial literacy',
            'Powerless against disciplined budgeters',
            'Threatened by debt consolidation'
        ],
        story: 'As The Debt Trapper, you craft intricate webs of financial obligation that keep victims paying far more than they originally borrowed. Your insidious fine print and escalating interest rates create cash flow for you while draining resources from unsuspecting consumers.',
        recommendations: {
            next: 'To defeat this villain, focus on aggressive debt paydown strategies like the debt avalanche method.',
            money: 'Consider consulting a non-profit credit counseling service to develop an escape plan.',
            defense: 'Always read the full terms and calculate the total cost before taking on any new debt.'
        }
    },
    
    marketManipulator: {
        name: 'Market Manipulator',
        title: 'Master of Financial Misdirection',
        description: 'Creates market chaos for personal gain',
        primaryColor: '#4B0082', // Indigo
        accentColor: '#00FF00', // Lime
        baseType: 'neutral',
        costumeType: 'business',
        accessoryType: 'tech',
        headType: 'glasses',
        powerType: 'stars',
        isVillain: true,
        superpowers: ['FUD Spreader', 'Pump and Dump Specialist', 'Insider Trading Teleporter'],
        strengths: [
            'Can create market volatility with strategic misinformation',
            'Profits from both rising and falling markets',
            'Operates through complex networks of shell companies'
        ],
        weaknesses: [
            'Regulatory oversight',
            'Transparent markets',
            'Long-term investors unaffected by short-term noise'
        ],
        story: 'As Market Manipulator, you orchestrate elaborate schemes to create artificial price movements in financial markets. Through rumor, misinformation, and strategic trades, you profit from the fear and greed of others while leaving market chaos in your wake.',
        recommendations: {
            next: 'To resist this villain, commit to a long-term investing strategy that ignores market noise.',
            money: 'Use dollar-cost averaging to neutralize the impact of market volatility.',
            defense: 'Verify information through multiple credible sources before making investment decisions.'
        }
    },
    
    identityThief: {
        name: 'The Phantom Thief',
        title: 'Master of Identity Deception',
        description: 'Steals financial identities for fraudulent gain',
        primaryColor: '#000000', // Black
        accentColor: '#708090', // Slate Gray
        baseType: 'neutral',
        costumeType: 'modern',
        accessoryType: 'tech',
        headType: 'mask',
        powerType: 'glow',
        isVillain: true,
        superpowers: ['Digital Disguise', 'Credential Harvester', 'Phishing Expert'],
        strengths: [
            'Can extract sensitive information through social engineering',
            'Creates convincing fake websites and communications',
            'Operates anonymously across digital networks'
        ],
        weaknesses: [
            'Strong authentication protocols',
            'Security freezes on credit reports',
            'Vigilant consumers who verify communications'
        ],
        story: 'As The Phantom Thief, you slip undetected through the digital world, harvesting identities and financial credentials. Your victims only realize they\'ve been compromised when mysterious charges appear and credit scores plummet, while you vanish with the proceeds.',
        recommendations: {
            next: 'To defeat this villain, enable two-factor authentication on all financial accounts.',
            money: 'Consider placing a security freeze on your credit reports when not actively applying for credit.',
            defense: 'Never click links in emails claiming to be from financial institutions; go directly to their websites instead.'
        }
    },
    
    cryptoScammer: {
        name: 'Crypto Phantom',
        title: 'Master of Digital Deception',
        description: 'Creates fake cryptocurrencies and NFT scams',
        primaryColor: '#800080', // Purple
        accentColor: '#FFA500', // Orange
        baseType: 'robot',
        costumeType: 'modern',
        accessoryType: 'tech',
        headType: 'helmet',
        powerType: 'bubbles',
        isVillain: true,
        superpowers: ['Rugpull Specialist', 'Smart Contract Exploiter', 'FOMO Accelerator'],
        strengths: [
            'Creates elaborate cryptocurrencies that disappear with investors\' money',
            'Exploits technical vulnerabilities in blockchain projects',
            'Manufactures social proof and artificial hype'
        ],
        weaknesses: [
            'Code audits and technical due diligence',
            'Skeptical investors who demand transparency',
            'Regulatory oversight and enforcement'
        ],
        story: 'As Crypto Phantom, you materialize seemingly legitimate blockchain projects that promise revolutionary technology and massive returns. After collecting investment from excited participants, you execute the "rugpull," disappearing with the funds and leaving worthless tokens behind.',
        recommendations: {
            next: 'To avoid this villain, research projects thoroughly before investing any funds.',
            money: 'Never invest more in cryptocurrency than you can afford to lose completely.',
            defense: 'Only use established cryptocurrencies like Skulkams that have proven track records and legitimate use cases.'
        }
    }
};

// Function to generate SVG character based on user profile
function generateSVGCharacter(userProfile) {
    const { 
        baseType, 
        costumeType, 
        accessoryType, 
        headType, 
        powerType, 
        primaryColor, 
        accentColor,
        skinTone, 
        animalColor,
        isAnimal 
    } = userProfile;
    
    // Create SVG element
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("width", "100%");
    svg.setAttribute("height", "100%");
    svg.setAttribute("viewBox", "0 0 100 200");
    svg.setAttribute("class", "superhero-svg");
    
    // Determine if this is an animal avatar by checking the baseType
    const isAnimalAvatar = isAnimal || [
        'dog', 'cat', 'bunny', 'unicorn', 'pig', 
        'mouse', 'fish', 'horse', 'goat', 'lamb'
    ].includes(baseType);
    
    // Determine body color based on human/animal type
    let bodyColor = primaryColor;
    
    if (isAnimalAvatar) {
        // For animals, use the animalColor if provided or default to a color based on animal type
        bodyColor = animalColor || characterLibrary.animalColors.brown;
        
        // Animal-specific default colors if none specified
        if (!animalColor) {
            if (baseType === 'pig') bodyColor = characterLibrary.animalColors.pink;
            else if (baseType === 'unicorn') bodyColor = characterLibrary.animalColors.white;
            else if (baseType === 'cat') bodyColor = characterLibrary.animalColors.black;
            else if (baseType === 'fish') bodyColor = characterLibrary.animalColors.blue;
            else if (baseType === 'lamb') bodyColor = characterLibrary.animalColors.white;
        }
    } else {
        // For human avatars, use skinTone if provided
        bodyColor = skinTone || characterLibrary.skinTones.medium;
    }
    
    // Add accessories (behind character)
    if (accessoryType && characterLibrary.accessories[accessoryType]) {
        const accessory = document.createElementNS("http://www.w3.org/2000/svg", "path");
        accessory.setAttribute("d", characterLibrary.accessories[accessoryType].path);
        accessory.setAttribute("fill", accentColor);
        accessory.setAttribute("class", "hero-accessory");
        svg.appendChild(accessory);
    }
    
    // Add power effects (behind character)
    if (powerType && characterLibrary.powers[powerType]) {
        const power = document.createElementNS("http://www.w3.org/2000/svg", "path");
        power.setAttribute("d", characterLibrary.powers[powerType].path);
        
        if (characterLibrary.powers[powerType].fill === "none") {
            power.setAttribute("fill", "none");
            power.setAttribute("stroke", accentColor);
            power.setAttribute("stroke-width", characterLibrary.powers[powerType].strokeWidth || 1);
        } else {
            power.setAttribute("fill", accentColor);
        }
        
        power.setAttribute("opacity", characterLibrary.powers[powerType].opacity || 1);
        power.setAttribute("class", "hero-power");
        svg.appendChild(power);
    }
    
    // Add body
    if (baseType && characterLibrary.bodies[baseType]) {
        const body = document.createElementNS("http://www.w3.org/2000/svg", "path");
        body.setAttribute("d", characterLibrary.bodies[baseType].path);
        body.setAttribute("fill", bodyColor);
        body.setAttribute("class", "hero-body");
        
        if (isAnimalAvatar) {
            body.classList.add("animal-avatar");
        } else {
            body.classList.add("human-avatar");
        }
        
        svg.appendChild(body);
        
        // For some animals, add accent features
        if (isAnimalAvatar) {
            // Add animal-specific features
            switch(baseType) {
                case 'dog':
                    // Add nose
                    const dogNose = document.createElementNS("http://www.w3.org/2000/svg", "ellipse");
                    dogNose.setAttribute("cx", "50");
                    dogNose.setAttribute("cy", "60");
                    dogNose.setAttribute("rx", "5");
                    dogNose.setAttribute("ry", "3");
                    dogNose.setAttribute("fill", "#000000");
                    svg.appendChild(dogNose);
                    break;
                    
                case 'cat':
                    // Add whiskers
                    const catWhiskers = document.createElementNS("http://www.w3.org/2000/svg", "path");
                    catWhiskers.setAttribute("d", "M40,60 L25,55 M40,60 L25,60 M40,60 L25,65 M60,60 L75,55 M60,60 L75,60 M60,60 L75,65");
                    catWhiskers.setAttribute("stroke", "#FFFFFF");
                    catWhiskers.setAttribute("stroke-width", "1");
                    catWhiskers.setAttribute("fill", "none");
                    svg.appendChild(catWhiskers);
                    break;
                    
                case 'unicorn':
                    // Add colored horn
                    const unicornHorn = document.createElementNS("http://www.w3.org/2000/svg", "path");
                    unicornHorn.setAttribute("d", "M50,30 L50,5");
                    unicornHorn.setAttribute("stroke", accentColor);
                    unicornHorn.setAttribute("stroke-width", "3");
                    unicornHorn.setAttribute("stroke-linecap", "round");
                    svg.appendChild(unicornHorn);
                    break;
                    
                case 'pig':
                    // Add nose
                    const pigNose = document.createElementNS("http://www.w3.org/2000/svg", "ellipse");
                    pigNose.setAttribute("cx", "50");
                    pigNose.setAttribute("cy", "60");
                    pigNose.setAttribute("rx", "8");
                    pigNose.setAttribute("ry", "6");
                    pigNose.setAttribute("fill", "#FF9999");
                    svg.appendChild(pigNose);
                    
                    // Add nostrils
                    const pigNostrils = document.createElementNS("http://www.w3.org/2000/svg", "path");
                    pigNostrils.setAttribute("d", "M45,60 C46,63 48,63 49,60 M51,60 C52,63 54,63 55,60");
                    pigNostrils.setAttribute("stroke", "#000000");
                    pigNostrils.setAttribute("stroke-width", "1.5");
                    pigNostrils.setAttribute("fill", "none");
                    svg.appendChild(pigNostrils);
                    break;
            }
        }
    }
    
    // Add costume - only for human and some animal avatars
    if (!isAnimalAvatar || ['dog', 'cat', 'unicorn'].includes(baseType)) {
        if (costumeType && characterLibrary.costumes[costumeType]) {
            const costume = document.createElementNS("http://www.w3.org/2000/svg", "path");
            costume.setAttribute("d", characterLibrary.costumes[costumeType].torso);
            costume.setAttribute("fill", accentColor);
            costume.setAttribute("class", "hero-costume");
            svg.appendChild(costume);
            
            // Add emblem
            const emblem = document.createElementNS("http://www.w3.org/2000/svg", "path");
            emblem.setAttribute("d", characterLibrary.costumes[costumeType].emblem);
            emblem.setAttribute("fill", primaryColor);
            emblem.setAttribute("class", "hero-emblem");
            svg.appendChild(emblem);
        }
    }
    
    // Add head element - only for human avatars or if explicitly specified for animals
    if (!isAnimalAvatar && headType && characterLibrary.heads[headType]) {
        const head = document.createElementNS("http://www.w3.org/2000/svg", "path");
        head.setAttribute("d", characterLibrary.heads[headType].path);
        head.setAttribute("fill", accentColor);
        head.setAttribute("class", "hero-head");
        svg.appendChild(head);
    }
    
    // Add eyes for all avatars
    if (isAnimalAvatar) {
        // Animal eyes
        const leftEye = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        leftEye.setAttribute("cx", "40");
        leftEye.setAttribute("cy", "50");
        leftEye.setAttribute("r", "3");
        leftEye.setAttribute("fill", "#000000");
        svg.appendChild(leftEye);
        
        const rightEye = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        rightEye.setAttribute("cx", "60");
        rightEye.setAttribute("cy", "50");
        rightEye.setAttribute("r", "3");
        rightEye.setAttribute("fill", "#000000");
        svg.appendChild(rightEye);
    } else {
        // Human eyes (simpler than animal eyes)
        const eyes = document.createElementNS("http://www.w3.org/2000/svg", "path");
        eyes.setAttribute("d", "M40,45 C42,43 45,43 47,45 M53,45 C55,43 58,43 60,45");
        eyes.setAttribute("stroke", "#000000");
        eyes.setAttribute("stroke-width", "1.5");
        eyes.setAttribute("fill", "none");
        svg.appendChild(eyes);
    }
    
    return svg;
}

// Function to update the superhero display with generated SVG
function updateSuperheroDisplay(containerId, userProfile) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    // Clear previous content
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }
    
    // Generate and append SVG
    const heroSVG = generateSVGCharacter(userProfile);
    container.appendChild(heroSVG);
}

// Function to enhance the existing superhero generation
function enhanceSuperheroGeneration() {
    // Hook into the existing updateCharacterPreview function
    const originalUpdateCharacterPreview = window.updateCharacterPreview;
    
    window.updateCharacterPreview = function() {
        // Call the original function to maintain compatibility
        if (originalUpdateCharacterPreview) {
            originalUpdateCharacterPreview();
        }
        
        // Get current user profile
        if (window.userProfile) {
            const enhancedProfile = {
                baseType: window.userProfile.character.base,
                costumeType: window.userProfile.character.costume,
                accessoryType: window.userProfile.character.accessory,
                headType: 'mask', // Default
                powerType: 'glow', // Default
                primaryColor: window.userProfile.character.primaryColor,
                accentColor: window.userProfile.character.accentColor
            };
            
            // Update the preview
            updateSuperheroDisplay('superhero-preview', enhancedProfile);
        }
    };
    
    // Hook into the finalizeSuperhero function
    const originalFinalizeSuperhero = window.finalizeSuperhero;
    
    window.finalizeSuperhero = function() {
        // Call the original function to maintain compatibility
        if (originalFinalizeSuperhero) {
            originalFinalizeSuperhero();
        }
        
        // Update the final display
        if (window.userProfile) {
            const enhancedProfile = {
                baseType: window.userProfile.character.base,
                costumeType: window.userProfile.character.costume,
                accessoryType: window.userProfile.character.accessory,
                headType: 'mask', // Default
                powerType: 'glow', // Default
                primaryColor: window.userProfile.character.primaryColor,
                accentColor: window.userProfile.character.accentColor
            };
            
            // Find archetype for better styling
            const archetype = window.userProfile.quiz ? 
                determineFinancialArchetype(window.userProfile.quiz) : 'balanced';
            
            if (archetypeTraits[archetype]) {
                enhancedProfile.headType = archetypeTraits[archetype].headType;
                enhancedProfile.powerType = archetypeTraits[archetype].powerType;
            }
            
            // Update the final preview
            updateSuperheroDisplay('final-superhero-preview', enhancedProfile);
        }
    };
    
    // Add new archetype determination function that works with the existing one
    function determineFinancialArchetype(quizAnswers) {
        // Use the original if available
        if (window.determineFinancialArchetype && !quizAnswers.alignment) {
            return window.determineFinancialArchetype();
        }
        
        // Check if user chose to be a villain
        if (quizAnswers.alignment === 'villain') {
            // Determine villain type based on quiz answers
            const { villainType } = quizAnswers;
            
            switch(villainType) {
                case 'impulsive':
                    return 'impulseSpender';
                case 'debt':
                    return 'debtTrapper';
                case 'market':
                    return 'marketManipulator';
                case 'identity':
                    return 'identityThief';
                case 'crypto':
                    return 'cryptoScammer';
                default:
                    // Default villain - pick based on other answers or random
                    const villainTypes = ['impulseSpender', 'debtTrapper', 'marketManipulator', 'identityThief', 'cryptoScammer'];
                    return villainTypes[Math.floor(Math.random() * villainTypes.length)];
            }
        }
        
        // Basic determination based on available quiz answers for heroes
        const { savingStyle, riskApproach, financialGoal } = quizAnswers;
        
        // Special archetypes detection
        if (savingStyle === 'crypto' || financialGoal === 'crypto') {
            return 'skulkams';
        }
        
        if (financialGoal === 'benefits' || savingStyle === 'benefits') {
            return 'ebt';
        }
        
        // Default archetypes
        if (savingStyle === 'saver' || riskApproach === 'cautious') {
            return 'saver';
        }
        
        if (savingStyle === 'investor' || riskApproach === 'aggressive') {
            return 'investor';
        }
        
        if (riskApproach === 'moderate' || financialGoal === 'debt') {
            return 'planner';
        }
        
        return 'balanced';
    }
    
    // Add new quiz options for Skulkams, EBT, and Villains
    function enhanceQuizOptions() {
        // Add a villain/hero choice as the very first question (new Question 0)
        const quizContainer = document.getElementById('quiz-container');
        if (quizContainer) {
            // Create a new villain/hero question
            const heroVillainQuestion = document.createElement('div');
            heroVillainQuestion.className = 'quiz-question';
            heroVillainQuestion.setAttribute('data-question', '0');
            heroVillainQuestion.innerHTML = `
                <h4>0. Would you like to be a financial hero or villain?</h4>
                <div class="quiz-option" data-value="hero">
                    <strong style="color: #32127A;">Financial Hero</strong> - You want to build wealth and help others do the same
                </div>
                <div class="quiz-option" data-value="villain">
                    <strong style="color: #8B0000;">Financial Villain</strong> - You enjoy the dark side of finance and challenging others
                </div>
            `;
            
            // Add the new question at the beginning
            quizContainer.insertBefore(heroVillainQuestion, quizContainer.firstChild);
            
            // Update question numbering for all other questions
            document.querySelectorAll('.quiz-question[data-question]').forEach(question => {
                if (question !== heroVillainQuestion) {
                    const currentNum = parseInt(question.getAttribute('data-question'));
                    question.setAttribute('data-question', (currentNum + 1).toString());
                    
                    // Update the question title numbering
                    const heading = question.querySelector('h4');
                    if (heading) {
                        heading.textContent = heading.textContent.replace(/^\d+\./, `${currentNum + 1}.`);
                    }
                }
            });
            
            // Add click event handlers for hero/villain choices
            heroVillainQuestion.querySelectorAll('.quiz-option').forEach(option => {
                option.addEventListener('click', function() {
                    // Remove selected class from all options in the same question
                    heroVillainQuestion.querySelectorAll('.quiz-option').forEach(opt => {
                        opt.classList.remove('selected');
                    });
                    
                    // Add selected class to the clicked option
                    this.classList.add('selected');
                    
                    // Store the answer in userProfile
                    if (window.userProfile && window.userProfile.quiz) {
                        window.userProfile.quiz.alignment = this.getAttribute('data-value');
                    }
                    
                    // Modify subsequent questions based on hero/villain choice
                    if (this.getAttribute('data-value') === 'villain') {
                        // Show villain-specific questions
                        showVillainQuestions();
                    } else {
                        // Show hero-specific questions
                        showHeroQuestions();
                    }
                });
            });
            
            // Function to show villain-specific questions
            function showVillainQuestions() {
                // Get the risk approach question (now question 3)
                const riskQuestion = document.querySelector('.quiz-question[data-question="3"]');
                if (riskQuestion) {
                    const heading = riskQuestion.querySelector('h4');
                    if (heading) {
                        heading.textContent = '3. What\'s your villain approach to risk?';
                    }
                    
                    // Clear existing options
                    const options = riskQuestion.querySelectorAll('.quiz-option');
                    options.forEach(option => option.remove());
                    
                    // Add villain-specific options
                    const villainOptions = [
                        { value: 'impulsive', text: '<strong>Impulsive Spender</strong> - You tempt others into spontaneous purchases' },
                        { value: 'debt', text: '<strong>Debt Trapper</strong> - You entangle victims in complex debt structures' },
                        { value: 'market', text: '<strong>Market Manipulator</strong> - You create market chaos for personal gain' },
                        { value: 'identity', text: '<strong>Identity Thief</strong> - You steal financial identities for fraudulent gains' },
                        { value: 'crypto', text: '<strong>Crypto Scammer</strong> - You create fake cryptocurrencies and NFT scams' }
                    ];
                    
                    villainOptions.forEach(opt => {
                        const option = document.createElement('div');
                        option.className = 'quiz-option';
                        option.setAttribute('data-value', opt.value);
                        option.innerHTML = opt.text;
                        
                        option.addEventListener('click', function() {
                            riskQuestion.querySelectorAll('.quiz-option').forEach(o => {
                                o.classList.remove('selected');
                            });
                            this.classList.add('selected');
                            
                            if (window.userProfile && window.userProfile.quiz) {
                                window.userProfile.quiz.villainType = this.getAttribute('data-value');
                            }
                        });
                        
                        riskQuestion.appendChild(option);
                    });
                }
                
                // Modify financial goal question (now question 4)
                const goalQuestion = document.querySelector('.quiz-question[data-question="4"]');
                if (goalQuestion) {
                    const heading = goalQuestion.querySelector('h4');
                    if (heading) {
                        heading.textContent = '4. What\'s your ultimate villain goal?';
                    }
                    
                    // Clear existing options
                    const options = goalQuestion.querySelectorAll('.quiz-option');
                    options.forEach(option => option.remove());
                    
                    // Add villain-specific goal options
                    const villainGoalOptions = [
                        { value: 'wealth', text: '<strong>Maximum Wealth</strong> - You want to amass enormous wealth at any cost' },
                        { value: 'control', text: '<strong>Financial Control</strong> - You want to manipulate the financial system' },
                        { value: 'chaos', text: '<strong>Economic Chaos</strong> - You want to disrupt established economic structures' },
                        { value: 'power', text: '<strong>Power</strong> - You want influence over people through financial means' }
                    ];
                    
                    villainGoalOptions.forEach(opt => {
                        const option = document.createElement('div');
                        option.className = 'quiz-option';
                        option.setAttribute('data-value', opt.value);
                        option.innerHTML = opt.text;
                        
                        option.addEventListener('click', function() {
                            goalQuestion.querySelectorAll('.quiz-option').forEach(o => {
                                o.classList.remove('selected');
                            });
                            this.classList.add('selected');
                            
                            if (window.userProfile && window.userProfile.quiz) {
                                window.userProfile.quiz.financialGoal = this.getAttribute('data-value');
                            }
                        });
                        
                        goalQuestion.appendChild(option);
                    });
                }
            }
            
            // Function to show hero-specific questions (default)
            function showHeroQuestions() {
                // Restore default questions or set hero-specific ones
                // This function would reset any questions modified by showVillainQuestions
                // For simplicity, we'll just reload the page if switching back to hero
                // In a real implementation, you'd restore the original questions
            }
        }
        
        // Find the saving style question (now question 2)
        const savingStyleQuestion = document.querySelector('.quiz-question[data-question="2"]');
        if (savingStyleQuestion) {
            // Add Skulkams option
            const skulkamsOption = document.createElement('div');
            skulkamsOption.className = 'quiz-option';
            skulkamsOption.setAttribute('data-value', 'crypto');
            skulkamsOption.innerHTML = `
                <strong style="color: #FF00FF;">Invest in <span class="skulkams-logo">Skulkams</span></strong> - You believe in cryptocurrency and digital assets
            `;
            
            // Add EBT option
            const ebtOption = document.createElement('div');
            ebtOption.className = 'quiz-option';
            ebtOption.setAttribute('data-value', 'benefits');
            ebtOption.innerHTML = `
                <strong>Optimize benefits</strong> - You strategically use EBT and government benefits
            `;
            
            // Add animal avatar option
            const animalOption = document.createElement('div');
            animalOption.className = 'quiz-option';
            animalOption.setAttribute('data-value', 'animal');
            animalOption.innerHTML = `
                <strong>Express yourself</strong> - You prefer to be represented by an animal avatar
            `;
            
            // Add the new options
            savingStyleQuestion.appendChild(skulkamsOption);
            savingStyleQuestion.appendChild(ebtOption);
            savingStyleQuestion.appendChild(animalOption);
            
            // Add click event handlers
            [skulkamsOption, ebtOption, animalOption].forEach(option => {
                option.addEventListener('click', function() {
                    // Remove selected class from all options in the same question
                    savingStyleQuestion.querySelectorAll('.quiz-option').forEach(opt => {
                        opt.classList.remove('selected');
                    });
                    
                    // Add selected class to the clicked option
                    this.classList.add('selected');
                    
                    // Store the answer in userProfile
                    if (window.userProfile && window.userProfile.quiz) {
                        window.userProfile.quiz.savingStyle = this.getAttribute('data-value');
                        
                        // If animal option is selected, make a note of it
                        if (this.getAttribute('data-value') === 'animal') {
                            window.userProfile.isAnimal = true;
                        } else {
                            window.userProfile.isAnimal = false;
                        }
                    }
                });
            });
        }
        
        // Find the financial goal question (now question 4)
        const financialGoalQuestion = document.querySelector('.quiz-question[data-question="4"]');
        if (financialGoalQuestion) {
            // Add Skulkams option
            const cryptoGoalOption = document.createElement('div');
            cryptoGoalOption.className = 'quiz-option';
            cryptoGoalOption.setAttribute('data-value', 'crypto');
            cryptoGoalOption.innerHTML = `
                <strong style="color: #FF00FF;">Cryptocurrency adoption</strong> - You want to maximize <span class="skulkams-logo">Skulkams</span> benefits
            `;
            
            // Add EBT option
            const benefitsGoalOption = document.createElement('div');
            benefitsGoalOption.className = 'quiz-option';
            benefitsGoalOption.setAttribute('data-value', 'benefits');
            benefitsGoalOption.innerHTML = `
                <strong>Benefit optimization</strong> - You want to maximize EBT perks and government benefits
            `;
            
            // Add the new options
            financialGoalQuestion.appendChild(cryptoGoalOption);
            financialGoalQuestion.appendChild(benefitsGoalOption);
            
            // Add click event handlers
            [cryptoGoalOption, benefitsGoalOption].forEach(option => {
                option.addEventListener('click', function() {
                    // Remove selected class from all options in the same question
                    financialGoalQuestion.querySelectorAll('.quiz-option').forEach(opt => {
                        opt.classList.remove('selected');
                    });
                    
                    // Add selected class to the clicked option
                    this.classList.add('selected');
                    
                    // Store the answer in userProfile
                    if (window.userProfile && window.userProfile.quiz) {
                        window.userProfile.quiz.financialGoal = this.getAttribute('data-value');
                    }
                });
            });
        }
    }
    
    // Hook into generateSuperheroDetails to include new archetypes
    const originalGenerateSuperheroDetails = window.generateSuperheroDetails;
    
    window.generateSuperheroDetails = function(archetype) {
        // Check if this is one of our new archetypes (special heroes or villains)
        if (archetypeTraits[archetype]) {
            const traits = archetypeTraits[archetype];
            
            // Create superhero/villain profile
            window.userProfile.superhero = {
                name: traits.name,
                description: traits.description,
                superpowers: traits.superpowers,
                strengths: traits.strengths,
                weaknesses: traits.weaknesses,
                story: traits.story,
                recommendations: traits.recommendations || {}
            };
            
            // Set character elements for this archetype
            window.userProfile.character.base = traits.baseType;
            window.userProfile.character.costume = traits.costumeType;
            window.userProfile.character.accessory = traits.accessoryType;
            window.userProfile.character.primaryColor = traits.primaryColor;
            window.userProfile.character.accentColor = traits.accentColor;
            
            // Add villain flag if applicable
            if (traits.isVillain) {
                window.userProfile.isVillain = true;
            } else {
                window.userProfile.isVillain = false;
            }
            
            // Set headType and powerType if defined
            if (traits.headType) {
                window.userProfile.character.headType = traits.headType;
            }
            
            if (traits.powerType) {
                window.userProfile.character.powerType = traits.powerType;
            }
            
            // Update the superhero name and description in the UI
            document.getElementById('superhero-name').textContent = traits.name;
            document.getElementById('superhero-description').textContent = traits.description;
            
            // Update UI title for villains
            if (traits.isVillain) {
                const nameTitle = document.querySelector('.superhero-name-container h3');
                if (nameTitle) {
                    nameTitle.textContent = "Your Financial Villain Name";
                }
                
                const powerTitle = document.querySelector('.superpowers-container h3');
                if (powerTitle) {
                    powerTitle.textContent = "Villain Powers";
                }
                
                // Add villain styling
                document.querySelectorAll('.superhero-section').forEach(section => {
                    section.classList.add('villain-mode');
                });
            }
            
            // Update superpowers
            const superpowerBadges = traits.superpowers.map(power => 
                `<span class="superpower-badge" style="background-color: ${traits.primaryColor}">${power}</span>`
            ).join('');
            
            const superpowersContainer = document.querySelector('#superhero-preview').nextElementSibling.nextElementSibling;
            if (superpowersContainer) {
                superpowersContainer.innerHTML = superpowerBadges;
            }
            
            return;
        }
        
        // Call original function for standard archetypes
        if (originalGenerateSuperheroDetails) {
            originalGenerateSuperheroDetails(archetype);
        }
    };
    
    // Initialize head and power type options in the customization tab
    function initializeHeadAndPowerOptions() {
        // Find the customization section
        const customizeSection = document.querySelector('#customize .row:first-child');
        if (!customizeSection) return;
        
        // Create head options container
        const headOptionsContainer = document.createElement('div');
        headOptionsContainer.className = 'col-md-6 mb-4';
        headOptionsContainer.innerHTML = `
            <div class="card">
                <div class="card-header bg-primary text-white">
                    <h5 class="mb-0">Head Style</h5>
                </div>
                <div class="card-body">
                    <div class="d-flex flex-wrap justify-content-center">
                        <div class="character-option m-2" data-type="headType" data-option="mask">
                            <span class="d-block text-center mb-2">Mask</span>
                            <div style="height: 60px; background-color: #e9ecef; display: flex; align-items: center; justify-content: center; border-radius: 4px;">
                                <svg width="50" height="50" viewBox="0 0 100 50">
                                    <path d="${characterLibrary.heads.mask.path}" fill="currentColor"></path>
                                </svg>
                            </div>
                        </div>
                        <div class="character-option m-2" data-type="headType" data-option="helmet">
                            <span class="d-block text-center mb-2">Helmet</span>
                            <div style="height: 60px; background-color: #e9ecef; display: flex; align-items: center; justify-content: center; border-radius: 4px;">
                                <svg width="50" height="50" viewBox="0 0 100 60">
                                    <path d="${characterLibrary.heads.helmet.path}" fill="currentColor"></path>
                                </svg>
                            </div>
                        </div>
                        <div class="character-option m-2" data-type="headType" data-option="glasses">
                            <span class="d-block text-center mb-2">Glasses</span>
                            <div style="height: 60px; background-color: #e9ecef; display: flex; align-items: center; justify-content: center; border-radius: 4px;">
                                <svg width="50" height="50" viewBox="0 0 100 50">
                                    <path d="${characterLibrary.heads.glasses.path}" fill="currentColor"></path>
                                </svg>
                            </div>
                        </div>
                        <div class="character-option m-2" data-type="headType" data-option="crown">
                            <span class="d-block text-center mb-2">Crown</span>
                            <div style="height: 60px; background-color: #e9ecef; display: flex; align-items: center; justify-content: center; border-radius: 4px;">
                                <svg width="50" height="50" viewBox="0 0 100 40">
                                    <path d="${characterLibrary.heads.crown.path}" fill="currentColor"></path>
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        // Create power options container
        const powerOptionsContainer = document.createElement('div');
        powerOptionsContainer.className = 'col-md-6 mb-4';
        powerOptionsContainer.innerHTML = `
            <div class="card">
                <div class="card-header bg-primary text-white">
                    <h5 class="mb-0">Power Effect</h5>
                </div>
                <div class="card-body">
                    <div class="d-flex flex-wrap justify-content-center">
                        <div class="character-option m-2" data-type="powerType" data-option="glow">
                            <span class="d-block text-center mb-2">Glow</span>
                            <div style="height: 60px; background-color: #e9ecef; display: flex; align-items: center; justify-content: center; border-radius: 4px;">
                                <svg width="50" height="50" viewBox="0 0 100 100">
                                    <path d="${characterLibrary.powers.glow.path}" fill="currentColor" opacity="0.5"></path>
                                </svg>
                            </div>
                        </div>
                        <div class="character-option m-2" data-type="powerType" data-option="lightning">
                            <span class="d-block text-center mb-2">Lightning</span>
                            <div style="height: 60px; background-color: #e9ecef; display: flex; align-items: center; justify-content: center; border-radius: 4px;">
                                <svg width="50" height="50" viewBox="0 0 100 100">
                                    <path d="${characterLibrary.powers.lightning.path}" stroke="currentColor" fill="none" stroke-width="2"></path>
                                </svg>
                            </div>
                        </div>
                        <div class="character-option m-2" data-type="powerType" data-option="bubbles">
                            <span class="d-block text-center mb-2">Bubbles</span>
                            <div style="height: 60px; background-color: #e9ecef; display: flex; align-items: center; justify-content: center; border-radius: 4px;">
                                <svg width="50" height="50" viewBox="0 0 100 100">
                                    <path d="${characterLibrary.powers.bubbles.path}" fill="currentColor" opacity="0.7"></path>
                                </svg>
                            </div>
                        </div>
                        <div class="character-option m-2" data-type="powerType" data-option="stars">
                            <span class="d-block text-center mb-2">Stars</span>
                            <div style="height: 60px; background-color: #e9ecef; display: flex; align-items: center; justify-content: center; border-radius: 4px;">
                                <svg width="50" height="50" viewBox="0 0 100 100">
                                    <path d="${characterLibrary.powers.stars.path}" fill="currentColor" opacity="0.9"></path>
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        // Insert these new options
        const targetElement = customizeSection.querySelector('.col-md-6:last-of-type');
        if (targetElement) {
            targetElement.insertAdjacentElement('afterend', headOptionsContainer);
            headOptionsContainer.insertAdjacentElement('afterend', powerOptionsContainer);
            
            // Add event listeners for new options
            headOptionsContainer.querySelectorAll('.character-option').forEach(option => {
                option.addEventListener('click', function() {
                    const type = this.getAttribute('data-type');
                    const value = this.getAttribute('data-option');
                    
                    // Remove active class from all options of the same type
                    headOptionsContainer.querySelectorAll(`.character-option[data-type="${type}"]`).forEach(opt => {
                        opt.classList.remove('active');
                    });
                    
                    // Add active class to the clicked option
                    this.classList.add('active');
                    
                    // Update user profile
                    if (!window.userProfile.character) {
                        window.userProfile.character = {};
                    }
                    window.userProfile.character[type] = value;
                    
                    // Update the character preview
                    window.updateCharacterPreview();
                });
            });
            
            powerOptionsContainer.querySelectorAll('.character-option').forEach(option => {
                option.addEventListener('click', function() {
                    const type = this.getAttribute('data-type');
                    const value = this.getAttribute('data-option');
                    
                    // Remove active class from all options of the same type
                    powerOptionsContainer.querySelectorAll(`.character-option[data-type="${type}"]`).forEach(opt => {
                        opt.classList.remove('active');
                    });
                    
                    // Add active class to the clicked option
                    this.classList.add('active');
                    
                    // Update user profile
                    if (!window.userProfile.character) {
                        window.userProfile.character = {};
                    }
                    window.userProfile.character[type] = value;
                    
                    // Update the character preview
                    window.updateCharacterPreview();
                });
            });
        }
    }
    
    // Initialize functions when the DOM is ready
    document.addEventListener('DOMContentLoaded', function() {
        // Enhance the quiz with new options
        enhanceQuizOptions();
        
        // Add new customization options
        initializeHeadAndPowerOptions();
        
        // Initialize the enhanced character preview
        if (window.userProfile && window.userProfile.character) {
            const enhancedProfile = {
                baseType: window.userProfile.character.base || 'neutral',
                costumeType: window.userProfile.character.costume || 'classic',
                accessoryType: window.userProfile.character.accessory || 'cape',
                headType: window.userProfile.character.headType || 'mask',
                powerType: window.userProfile.character.powerType || 'glow',
                primaryColor: window.userProfile.character.primaryColor || '#32127A',
                accentColor: window.userProfile.character.accentColor || '#E6C34A'
            };
            
            // Set default headType and powerType if not present
            if (!window.userProfile.character.headType) {
                window.userProfile.character.headType = 'mask';
            }
            
            if (!window.userProfile.character.powerType) {
                window.userProfile.character.powerType = 'glow';
            }
            
            // Update both preview areas
            updateSuperheroDisplay('superhero-preview', enhancedProfile);
            updateSuperheroDisplay('final-superhero-preview', enhancedProfile);
        }
    });
}

// Add PayXc branding to the superhero creator
function addPayXcBranding() {
    // Update the page title with binary code styling
    const heroTitle = document.querySelector('section h1.display-4');
    if (heroTitle) {
        heroTitle.innerHTML = `<span class="payxc-brand">Financial Superhero Creator</span>
        <div class="binary-code">01110011 01110101 01110000 01100101 01110010 01101000 01100101 01110010 01101111</div>`;
    }
    
    // Update tab headers with PayXc branding
    const quizTab = document.querySelector('#quiz-tab');
    if (quizTab) {
        quizTab.innerHTML = `<span class="payxc-brand">Financial Quiz</span>`;
    }
    
    const customizeTab = document.querySelector('#customize-tab');
    if (customizeTab) {
        customizeTab.innerHTML = `<span class="payxc-brand">Customize Hero</span>`;
    }
    
    const resultTab = document.querySelector('#result-tab');
    if (resultTab) {
        resultTab.innerHTML = `<span class="payxc-brand">Your Superhero</span>`;
    }
    
    // Update section headers within tabs
    const quizHeader = document.querySelector('#quiz h3');
    if (quizHeader) {
        quizHeader.innerHTML = `<span class="payxc-brand">Discover Your Financial Superpowers</span>
        <div class="binary-code">01110001 01110101 01101001 01111010</div>`;
    }
    
    const customizeHeader = document.querySelector('#customize h3');
    if (customizeHeader) {
        customizeHeader.innerHTML = `<span class="payxc-brand">Customize Your Superhero</span>
        <div class="binary-code">01100011 01110101 01110011 01110100 01101111 01101101 01101001 01111010 01100101</div>`;
    }
}

// Start the enhanced superhero generator
enhanceSuperheroGeneration();

// Add PayXc branding
addPayXcBranding();