console.log("This is a popup!")

// Will work on this later
document.getElementById('toggle').onclick = function(){
    fetch(chrome.runtime.getURL('resources/status.json'))
        .then(response => response.json())
        .then(data => {
            fetch(chrome.runtime.getURL('resources/status.json'), {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ studyMode: !data.studyMode })
                })
            });
    }