const youtubeUrl = "https://www.youtube.com";
const youtubeSearchResultsUrl = `${youtubeUrl}/results`;
const youtubeWatchUrl = `${youtubeUrl}/watch`;

var studyMode = false;

window.onload = function() {
    fetch(chrome.runtime.getURL('resources/status.json'))
        .then(response => response.json())
        .then(data => {
            studyMode = data.studyMode == 1 ? true : false;
            alert("Study Mode: " + studyMode); // This will work correctly here

            // Call functions or execute code that depends on studyMode here
            handlePage();
        })
        .catch(error => {
            console.error('Error fetching status:', error);
        });
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
            quote.innerHTML = "You're doing great! Keep going!";
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

function handlePage() {
    // Home page
    if (window.location.href.includes(youtubeUrl) && !window.location.href.includes('/watch') && !window.location.href.includes('/results')) {
        if (studyMode) {
            const body = document.querySelector('body');
            const title = document.querySelector('title');
            title.innerHTML = "Study Mode";
            

            fetch(chrome.runtime.getURL('resources/homePage.html'))
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
            const interval = setInterval(() => {
                removeElementsFromWatch(interval);
            }, 500);
        } else {
            console.log("Study Mode is off");
        }
    }
}

// Update page when URL changes
var oldUrl = window.location.href;
setInterval(function() {
    if(window.location.href != oldUrl) {
        oldUrl = window.location.href
        window.location.reload();
    }
}, 1000);