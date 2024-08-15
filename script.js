const youtubeUrl = "https://www.youtube.com";
const youtubeSearchResultsUrl = `${youtubeUrl}/results`;
const youtubeWatchUrl = `${youtubeUrl}/watch`;
let studyMode = true;

// Motivational quotes

function generateQuote() {
    const quotes = [
        "The only way to achieve the impossible is to believe it is possible.",
        "Success is not final, failure is not fatal: It is the courage to continue that counts.",
        "Your only limit is your mind.",
        "Dream big, work hard, stay focused, and surround yourself with good people.",
        "Believe in yourself and all that you are. Know that there is something inside you that is greater than any obstacle.",
        "Start where you are. Use what you have. Do what you can.",
        "Success doesn't come from what you do occasionally, it comes from what you do consistently.",
        "The future belongs to those who believe in the beauty of their dreams.",
        "Don’t watch the clock; do what it does. Keep going.",
        "Difficult roads often lead to beautiful destinations.",
        "You're doing great! Keep going!"
      ];
      
    const randomIndex = Math.floor(Math.random() * quotes.length);
    return quotes[randomIndex];
}

// Remove elements from search page
function removeElementsFromSearch() {
    const interval = setInterval(() => {
        // Search bar and buttons
        const personalBar = document.querySelector('#guide');
        // Masthead container
        const mastheadContainer = document.querySelector('#masthead-container');
        // Dismissable divs (recommended videos to another topic)
        const dismissables = document.querySelectorAll('ytd-shelf-renderer');
        // Shorts
        const reelShelves = document.querySelectorAll('ytd-reel-shelf-renderer');

        // Different ad divs
        const ads = document.querySelectorAll('ytd-search-pyv-renderer');
        const ads2 = document.querySelectorAll('ytd-promoted-sparkles-web-renderer');


        if(personalBar) { personalBar.remove();}
        if(mastheadContainer) { mastheadContainer.remove();}
        if(ads) { ads.forEach(function(ad) { ad.remove(); }); }
        if(ads2) { ads2.forEach(function(ad) { ad.remove(); }); }

        dismissables.forEach(function(dismissable) {
            dismissable.remove();
        });

        reelShelves.forEach(function(reelShelf) {
            reelShelf.remove();
        });

    }, 500); // Remove elements every 500ms
}

// Remove elements from watch page
function removeElementsFromWatch() {
    const interval = setInterval(() => {
        // Recommended videos
        const recommendedVideos = document.querySelector('#secondary');
        // Masthead container
        const mastheadContainer = document.querySelector('#masthead-container');
        // Video info & comments
        const below = document.querySelector('#below');
        // HTML
        const html = document.querySelector('html');
        html.style.overflow = "hidden";
    
        
        var foundMasthead = false;
        var foundRecommendedVideos = false;
        var foundBelow = false;

        if (mastheadContainer) {
            mastheadContainer.remove();
            foundMasthead = true;
        }

        if (recommendedVideos) {
            recommendedVideos.innerHTML = "";

            const quote = document.createElement('p');
            quote.innerHTML = generateQuote();
            quote.style.fontSize = "20px";
            quote.style.color = "#fff";
            recommendedVideos.appendChild(quote);

            foundRecommendedVideos = true;
        }

        if (below) {
            below.remove();
            foundBelow = true;
        }

        if (foundMasthead && foundRecommendedVideos && foundBelow) {
            clearInterval(interval);
        }

    }, 500);
}

// Home page
if (window.location.href.includes(youtubeUrl) && !window.location.href.includes('/watch') && !window.location.href.includes('/results')) {
    if (studyMode) {
        const body = document.querySelector('body');
        const title = document.querySelector('title');
        title.innerHTML = "Study Mode";
        

        fetch(chrome.runtime.getURL('pages/homePage.html'))
            .then(response => response.text())
            .then(data => {
                body.innerHTML = data;
                
                const searchButton = document.getElementById('search-button');

                searchButton.onclick = () => {
                    const searchInput = document.getElementById('search-input').value;
                    window.location.href = `${youtubeUrl}/results?search_query=${searchInput}`;
                }
            })

    } else {
        console.log("Study Mode is off");
    }
}

// Search results page
if(window.location.href.includes(youtubeSearchResultsUrl)) {
    if (studyMode) {
        removeElementsFromSearch();
    } else {
        console.log("Study Mode is off");
    }
}

// Watch page

if(window.location.href.includes(youtubeWatchUrl)){
    if(studyMode) {
        removeElementsFromWatch();
    } else {
        console.log("Study Mode is off");
    }
}