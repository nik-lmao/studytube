const youtubeUrl = "https://www.youtube.com";
const youtubeSearchResultsUrl = `${youtubeUrl}/results`;
let studyMode = true;

if (window.location.href.includes(youtubeUrl) && !window.location.href.includes('/watch') && !window.location.href.includes('/results')) {
    if (studyMode) {
        const body = document.querySelector('body');

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

function removeElementsFromSearch() {
    const personalBar = document.querySelector('#guide');
    const mastheadContainer = document.querySelector('#masthead-container');
    const dismissables = document.querySelectorAll('ytd-shelf-renderer');
    const reelShelves = document.querySelectorAll('ytd-reel-shelf-renderer');

    if(personalBar) { personalBar.remove();}
    if(mastheadContainer) { mastheadContainer.remove();}

    dismissables.forEach(function(dismissable) {
        dismissable.remove();
    });


    reelShelves.forEach(function(reelShelf) {
        reelShelf.remove();
    });
}



if(window.location.href.includes(youtubeSearchResultsUrl)) {
    if (studyMode) {
        removeElementsFromSearch();
    } else {
        console.log("Study Mode is off");
    }
}

window.onscroll = function() {
    if (window.location.href.includes(youtubeSearchResultsUrl)) {
        if (studyMode) {
            removeElementsFromSearch();
        } else {
            console.log("Study Mode is off");
        }
    }
}