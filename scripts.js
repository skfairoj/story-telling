/**
 * ==========================================
 * THE FORGOTTEN LIBRARY - INTERACTIVE STORY
 * ==========================================
 * 
 * Technologies: HTML, CSS, JavaScript
 * Project Type: Choose-Your-Own-Adventure
 * 
 * This script handles:
 * - Story data management
 * - Scene navigation and transitions
 * - User choice handling
 * - History tracking for back navigation
 * - Ending screen display
 */

// ==========================================
// STORY DATA
// ==========================================

const storyData = {
    // Starting scene
    start: {
        id: "start",
        title: "The Discovery",
        text: `<p>The old bookshop had been closed for decades, its windows thick with dust and mystery. But tonight, the door stands slightly ajar, a warm golden light spilling onto the rain-slicked cobblestones.</p>
               <p>You push the door open. Inside, towering shelves stretch impossibly high, filled with books that seem to whisper your name. At the center of the room, a leather-bound tome rests on an ornate pedestal, its cover pulsing with an ethereal glow.</p>
               <p>As you approach, the book opens on its own, revealing blank pages that slowly fill with shimmering text...</p>`,
        choices: [
            { text: "Read the glowing text aloud", nextScene: "read_aloud" },
            { text: "Touch the mysterious book", nextScene: "touch_book" },
            { text: "Explore the towering shelves first", nextScene: "explore_shelves" }
        ]
    },

    // Branch 1: Read aloud
    read_aloud: {
        id: "read_aloud",
        title: "Words of Power",
        text: `<p>Your voice fills the dusty air as you speak the ancient words. They feel strange on your tongue—syllables that seem older than language itself.</p>
               <p>The room begins to shift. The shelves rearrange themselves, creating a corridor of light. At its end, you glimpse another world: a vast library floating among the stars, its spires reaching toward infinite galaxies.</p>
               <p>A spectral librarian materializes before you, their form flickering like candlelight. "You have spoken the Words of Passage," they intone. "You may enter the Celestial Archives... but be warned, not all who enter find their way back."</p>`,
        choices: [
            { text: "Step through to the Celestial Archives", nextScene: "celestial_archives" },
            { text: "Ask the librarian about the dangers", nextScene: "ask_dangers" },
            { text: "Decline and close the book", nextScene: "close_book" }
        ]
    },

    // Branch 2: Touch book
    touch_book: {
        id: "touch_book",
        title: "The Book's Memory",
        text: `<p>The moment your fingers touch the ancient leather, visions flood your mind. You see centuries of readers—scholars, mystics, wanderers—each drawn here by fate.</p>
               <p>Among the memories, one stands out: a young woman in Victorian dress, her eyes filled with determination. She discovered something in these pages, something that changed reality itself.</p>
               <p>The vision fades, leaving you with a choice. The book has shown you two hidden passages: one leads to where the woman's journey began, another to where it ended.</p>`,
        choices: [
            { text: "Follow the woman's beginning", nextScene: "woman_beginning" },
            { text: "Seek where her journey ended", nextScene: "woman_ending" },
            { text: "Search for your own path in the visions", nextScene: "own_path" }
        ]
    },

    // Branch 3: Explore shelves
    explore_shelves: {
        id: "explore_shelves",
        title: "Among the Forgotten Tomes",
        text: `<p>You wander through the labyrinthine shelves, trailing your fingers along leather spines etched with titles in languages both familiar and impossible. Some books seem to lean toward you as you pass; others shrink away.</p>
               <p>Deep in the stacks, you discover three unusual volumes:</p>
               <p>A book bound in what appears to be starlight, constantly shifting and shimmering. A tome wrapped in chains, from which muffled whispers escape. And a simple, worn journal that feels inexplicably warm to the touch.</p>`,
        choices: [
            { text: "Open the book of starlight", nextScene: "starlight_book" },
            { text: "Attempt to unchain the whispering tome", nextScene: "chained_tome" },
            { text: "Read the warm journal", nextScene: "warm_journal" }
        ]
    },

    // Deeper branches
    celestial_archives: {
        id: "celestial_archives",
        title: "The Celestial Archives",
        text: `<p>You step through the corridor of light and find yourself floating among the stars. The Celestial Archives stretch in every direction—an infinite library suspended in the cosmos.</p>
               <p>Books orbit around you like planets, each containing the knowledge of a different civilization. You could spend eternity here, learning secrets of the universe.</p>
               <p>A constellation shifts, forming words in the darkness: "What truth do you seek?"</p>`,
        choices: [
            { text: "Seek the meaning of existence", nextScene: "ending_enlightenment" },
            { text: "Search for the way home", nextScene: "ending_return" }
        ]
    },

    ask_dangers: {
        id: "ask_dangers",
        title: "The Librarian's Warning",
        text: `<p>"The dangers are many," the spectral librarian replies, their voice echoing like wind through empty halls. "Time flows differently in the Archives. What feels like hours may be years, or centuries. And the knowledge you gain... it changes you."</p>
               <p>They lean closer, their ethereal eyes searching yours. "But perhaps the greatest danger is finding what you truly seek. Are you prepared for truths that cannot be unlearned?"</p>`,
        choices: [
            { text: "Accept the risk and enter the Archives", nextScene: "celestial_archives" },
            { text: "Heed the warning and close the book", nextScene: "close_book" }
        ]
    },

    close_book: {
        id: "close_book",
        title: "The Wise Choice",
        text: `<p>With trembling hands, you gently close the ancient tome. The golden light fades, and the spectral librarian nods with what might be approval—or perhaps disappointment.</p>
               <p>"Perhaps wisdom is knowing when not to seek knowledge," they whisper as they fade away. "The Library will remember you. When you are ready, it will call again."</p>
               <p>You step back into the night, the rain washing away the otherworldly feeling. But you know, deep in your heart, that you will return someday.</p>`,
        isEnding: true,
        endingTitle: "The Patient Seeker",
        endingText: "You chose wisdom over curiosity. The Forgotten Library will wait for your return, its secrets preserved for another day. Sometimes the bravest choice is knowing when to walk away."
    },

    woman_beginning: {
        id: "woman_beginning",
        title: "Victoria's First Discovery",
        text: `<p>The vision pulls you back to 1887. You stand invisible beside Victoria Ashworth as she first enters this very bookshop, then new and bustling with customers.</p>
               <p>You watch her discover the pedestal book, see her eyes widen as she reads its secrets. She learned to walk between stories, to step into the narratives of any book she touched.</p>
               <p>The vision offers you a gift: her knowledge, passed through time. But accepting it means carrying her burden too—the weight of infinite stories.</p>`,
        choices: [
            { text: "Accept Victoria's gift", nextScene: "ending_storywalker" },
            { text: "Witness but do not take", nextScene: "ending_witness" }
        ]
    },

    woman_ending: {
        id: "woman_ending",
        title: "The Final Chapter",
        text: `<p>The vision shifts forward, and you see Victoria as an old woman, her eyes still bright with wonder. She sits in a cottage made entirely of books, pages forming walls and stories serving as windows to other worlds.</p>
               <p>"I have lived a thousand lives," she says, somehow aware of your presence across time. "Every story I entered became part of me. Now I am ready to become a story myself."</p>
               <p>She offers you her hand. "Will you help me write my final chapter?"</p>`,
        choices: [
            { text: "Help Victoria complete her story", nextScene: "ending_legacy" },
            { text: "Let her journey end as it must", nextScene: "ending_peace" }
        ]
    },

    own_path: {
        id: "own_path",
        title: "Your Story Begins",
        text: `<p>You push past the borrowed memories, seeking something that belongs only to you. The visions swirl and part, revealing a blank page in the cosmic narrative.</p>
               <p>The book speaks directly to your mind: "Every reader who enters these halls has a story to tell. What is yours?"</p>
               <p>Before you, two quills materialize—one of shadow, one of light. Both can write your destiny, but each leads down a very different path.</p>`,
        choices: [
            { text: "Write with the quill of light", nextScene: "ending_creator" },
            { text: "Write with the quill of shadow", nextScene: "ending_mysterious" }
        ]
    },

    starlight_book: {
        id: "starlight_book",
        title: "Stellar Knowledge",
        text: `<p>As you open the book of starlight, the cosmos unfolds before you. Each page contains a different galaxy, and as you read, you understand the mathematical poetry underlying all of creation.</p>
               <p>The knowledge is beautiful but overwhelming. You could dive deeper, risking losing yourself in the infinite... or you could take just a fragment and return to your world, forever changed but still yourself.</p>`,
        choices: [
            { text: "Dive into infinity", nextScene: "ending_cosmic" },
            { text: "Take a fragment and return", nextScene: "ending_starkeeper" }
        ]
    },

    chained_tome: {
        id: "chained_tome",
        title: "The Bound Secret",
        text: `<p>The chains resist at first, but as you work at them, they begin to dissolve. The whispers grow louder, becoming a chorus of voices—all the secrets ever kept, all the truths ever hidden.</p>
               <p>The book opens, and you understand: this tome contains every lie ever told and the truth behind each one. With this knowledge, you could expose any deception, see through any mask.</p>
               <p>But the book warns you: "Truth without mercy is just another kind of cruelty. How will you use what you learn?"</p>`,
        choices: [
            { text: "Accept the burden of truth", nextScene: "ending_truthseeker" },
            { text: "Seal the book again", nextScene: "ending_merciful" }
        ]
    },

    warm_journal: {
        id: "warm_journal",
        title: "The Heart's Record",
        text: `<p>The journal opens to reveal handwritten entries, but they're not from the past—they're from your future. Every major decision you will ever make, every love, every loss, every triumph is recorded here.</p>
               <p>You could read ahead, know exactly how your life will unfold. Or you could trust the journey and close the book, letting your story write itself.</p>`,
        choices: [
            { text: "Read your future", nextScene: "ending_foresight" },
            { text: "Close the book and live the mystery", nextScene: "ending_faith" }
        ]
    },

    // Endings
    ending_enlightenment: {
        id: "ending_enlightenment",
        title: "The Enlightened",
        isEnding: true,
        endingTitle: "Keeper of Cosmic Wisdom",
        endingText: "You chose to seek ultimate truth among the stars. The Archives revealed the meaning of existence, and though you could never fully return to your old life, you became a guide for others who seek the same answers. Your wisdom echoes through the ages."
    },

    ending_return: {
        id: "ending_return",
        title: "The Homecoming",
        isEnding: true,
        endingTitle: "The Wanderer Returns",
        endingText: "You found your way back, carrying just enough starlight to illuminate the ordinary world with wonder. The Forgotten Library became your secret haven, a place to visit when life needed magic. You proved that one can touch infinity and still choose home."
    },

    ending_storywalker: {
        id: "ending_storywalker",
        title: "The Storywalker",
        isEnding: true,
        endingTitle: "Walker Between Tales",
        endingText: "Victoria's gift became yours. Now you walk between stories, living a thousand lives while never losing your own. Every book is a doorway, every tale a new adventure. The Library chose well—you carry its magic into the world."
    },

    ending_witness: {
        id: "ending_witness",
        title: "The Witness",
        isEnding: true,
        endingTitle: "Guardian of Memories",
        endingText: "You chose to witness without taking. This selfless act earned you a different gift—you became the Library's memory keeper, able to share its stories without being consumed by them. You help others find their own paths through the infinite shelves."
    },

    ending_legacy: {
        id: "ending_legacy",
        title: "The Legacy",
        isEnding: true,
        endingTitle: "The Story Continues",
        endingText: "Together with Victoria, you wrote the final chapter of her tale—and the first chapter of your own. Her cottage of books became yours, and her legacy of walking between stories continues through you. The Library gained a new guardian."
    },

    ending_peace: {
        id: "ending_peace",
        title: "Peaceful Transition",
        isEnding: true,
        endingTitle: "The Gentle Goodbye",
        endingText: "You let Victoria's story end as all stories must—with grace and completion. In return, she blessed you with her gratitude and a single, precious gift: the knowledge that all endings are also beginnings. You left the Library changed, carrying her wisdom."
    },

    ending_creator: {
        id: "ending_creator",
        title: "The Creator",
        isEnding: true,
        endingTitle: "Author of Worlds",
        endingText: "With the quill of light, you wrote new stories into existence. Worlds bloomed from your imagination, populated by characters who lived and loved and dreamed. You became a creator, your stories joining the infinite shelves of the Forgotten Library."
    },

    ending_mysterious: {
        id: "ending_mysterious",
        title: "The Mysterious One",
        isEnding: true,
        endingTitle: "Shadow Scribe",
        endingText: "The quill of shadow wrote stories that others were afraid to tell—tales of ambiguity, of moral complexity, of beautiful darkness. Your stories became the Library's most sought-after volumes, inspiring readers to embrace the unknown."
    },

    ending_cosmic: {
        id: "ending_cosmic",
        title: "One with the Cosmos",
        isEnding: true,
        endingTitle: "The Infinite Mind",
        endingText: "You became one with the cosmic knowledge, your consciousness expanding to encompass galaxies. Though your physical form faded, your awareness became eternal, a bright point of understanding in the vast universe. You are now part of the Library's greatest mystery."
    },

    ending_starkeeper: {
        id: "ending_starkeeper",
        title: "The Starkeeper",
        isEnding: true,
        endingTitle: "Bearer of Starlight",
        endingText: "You took a fragment of stellar knowledge and returned to Earth. Now you see the universe's patterns in everyday things—in the spiral of a shell, the branch of a tree, the flow of time. The starlight within you guides others toward wonder."
    },

    ending_truthseeker: {
        id: "ending_truthseeker",
        title: "The Truthseeker",
        isEnding: true,
        endingTitle: "Voice of Honesty",
        endingText: "You accepted the burden of truth, vowing to use it with wisdom and compassion. Now you can see through any deception, but more importantly, you help others find their own truth. The chained book's whispers became your gift to the world."
    },

    ending_merciful: {
        id: "ending_merciful",
        title: "The Merciful",
        isEnding: true,
        endingTitle: "Guardian of Secrets",
        endingText: "You understood that some truths are better left hidden—not from cowardice, but from mercy. The book rewarded your wisdom, granting you the ability to know which secrets protect and which harm. You became a keeper of necessary mysteries."
    },

    ending_foresight: {
        id: "ending_foresight",
        title: "The Prophet",
        isEnding: true,
        endingTitle: "Seer of Paths",
        endingText: "You read your future and gained the knowledge of what's to come. But with foresight came a choice: to follow the written path, or to write a new one. You chose wisely, using your knowledge not as a cage but as a compass. The future is no longer fixed."
    },

    ending_faith: {
        id: "ending_faith",
        title: "The Faithful",
        isEnding: true,
        endingTitle: "Embracer of Mystery",
        endingText: "You closed the journal, choosing to live your story rather than read it. The Library recognized your courage and blessed you with the greatest gift of all: the ability to be fully present in each moment, your future unwritten and full of possibility."
    }
};

// ==========================================
// STATE MANAGEMENT
// ==========================================

let currentScene = null;
let history = []; // For back navigation

// ==========================================
// DOM ELEMENTS
// ==========================================

const titleScreen = document.getElementById('title-screen');
const storyScreen = document.getElementById('story-screen');
const endingScreen = document.getElementById('ending-screen');

const sceneTitle = document.getElementById('scene-title');
const sceneText = document.getElementById('scene-text');
const choicesContainer = document.getElementById('choices-container');
const backBtn = document.querySelector('.back-btn');

const endingTitle = document.getElementById('ending-title');
const endingText = document.getElementById('ending-text');

// ==========================================
// SCREEN MANAGEMENT
// ==========================================

/**
 * Shows a specific screen and hides others
 * @param {string} screenId - The ID of the screen to show
 */
function showScreen(screenId) {
    // Remove active class from all screens
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    
    // Add active class to target screen
    document.getElementById(screenId).classList.add('active');
}

// ==========================================
// STORY NAVIGATION
// ==========================================

/**
 * Starts the story from the beginning
 */
function startStory() {
    history = [];
    navigateToScene('start');
    showScreen('story-screen');
}

/**
 * Restarts the story from the title screen
 */
function restartStory() {
    history = [];
    currentScene = null;
    showScreen('title-screen');
}

/**
 * Navigates to a specific scene
 * @param {string} sceneId - The ID of the scene to navigate to
 */
function navigateToScene(sceneId) {
    const scene = storyData[sceneId];
    
    if (!scene) {
        console.error(`Scene not found: ${sceneId}`);
        return;
    }
    
    // Check if it's an ending
    if (scene.isEnding) {
        showEnding(scene);
        return;
    }
    
    // Save current scene to history before navigating
    if (currentScene) {
        history.push(currentScene);
    }
    
    currentScene = sceneId;
    renderScene(scene);
    updateBackButton();
}

/**
 * Goes back to the previous scene
 */
function goBack() {
    if (history.length === 0) return;
    
    const previousSceneId = history.pop();
    currentScene = previousSceneId;
    renderScene(storyData[previousSceneId]);
    updateBackButton();
}

/**
 * Updates the back button's disabled state
 */
function updateBackButton() {
    backBtn.disabled = history.length === 0;
}

// ==========================================
// RENDERING
// ==========================================

/**
 * Renders a scene to the story screen
 * @param {Object} scene - The scene object to render
 */
function renderScene(scene) {
    // Update title
    sceneTitle.textContent = scene.title;
    
    // Update text with animation
    sceneText.style.opacity = '0';
    sceneText.style.transform = 'translateY(20px)';
    
    setTimeout(() => {
        sceneText.innerHTML = scene.text;
        sceneText.style.transition = 'all 0.4s ease-out';
        sceneText.style.opacity = '1';
        sceneText.style.transform = 'translateY(0)';
    }, 100);
    
    // Render choices
    renderChoices(scene.choices);
}

/**
 * Renders the choice buttons for a scene
 * @param {Array} choices - Array of choice objects
 */
function renderChoices(choices) {
    choicesContainer.innerHTML = '';
    
    choices.forEach((choice, index) => {
        const button = document.createElement('button');
        button.className = 'choice-btn';
        button.textContent = choice.text;
        button.onclick = () => navigateToScene(choice.nextScene);
        
        // Stagger animation
        button.style.opacity = '0';
        button.style.transform = 'translateX(-20px)';
        
        setTimeout(() => {
            button.style.transition = 'all 0.3s ease-out';
            button.style.opacity = '1';
            button.style.transform = 'translateX(0)';
        }, 300 + (index * 100));
        
        choicesContainer.appendChild(button);
    });
}

/**
 * Shows the ending screen
 * @param {Object} scene - The ending scene object
 */
function showEnding(scene) {
    endingTitle.textContent = scene.endingTitle;
    endingText.textContent = scene.endingText;
    showScreen('ending-screen');
}

// ==========================================
// INITIALIZATION
// ==========================================

/**
 * Initialize the application
 */
function init() {
    // Ensure title screen is shown on load
    showScreen('title-screen');
    
    // Keyboard navigation support
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            if (storyScreen.classList.contains('active')) {
                restartStory();
            }
        }
        if (e.key === 'Backspace' && storyScreen.classList.contains('active')) {
            e.preventDefault();
            goBack();
        }
    });
}

// Run initialization when DOM is loaded
document.addEventListener('DOMContentLoaded', init);

// Also run if DOM is already loaded
if (document.readyState !== 'loading') {
    init();
}
