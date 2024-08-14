const youtubeUrl = "https://www.youtube.com";
let studyMode = true;

if (window.location.href.includes(youtubeUrl)) {
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
