document.getElementById('toggle').onclick = function() {
    chrome.storage.local.get(['studyMode'], function(result) {

        document.getElementById('toggle').disabled = true;

        const newStudyMode = !result.studyMode;
        chrome.storage.local.set({ studyMode: newStudyMode }, function() {
            chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
                chrome.tabs.reload(tabs[0].id);
            });

            document.getElementById('status').innerHTML = newStudyMode ? 'active' : 'inactive';
            document.getElementById('status').style.color = newStudyMode ? 'green' : 'red';
        });
    });
};

window.onload = function() {
    chrome.storage.local.get(['studyMode'], function(result) {
        const studyMode = result.studyMode;
        document.getElementById('status').innerHTML = studyMode ? 'active' : 'inactive';
        document.getElementById('status').style.color = studyMode ? 'green' : 'red';
    });
};