document.getElementById("toggle").onclick = function() {
    
    chrome.storage.local.get(["studyMode"], function(result) {
        chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
            const activeTabUrl = tabs[0].url;
            if (!activeTabUrl.includes("youtube.com")) {
                alert("Study mode is only available on youtube.com");
                return;
            }
            const newStudyMode = !result.studyMode;
            chrome.storage.local.set({ studyMode: newStudyMode }, function() {
                chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
                    chrome.tabs.reload(tabs[0].id);
                });

                document.getElementById("status").innerHTML = newStudyMode ? "active" : "inactive";
                document.getElementById("status").style.color = newStudyMode ? "green" : "red";
            });
        });
    });
};

window.onload = function() {
    chrome.storage.local.get(["studyMode"], function(result) {
        const studyMode = result.studyMode;
        document.getElementById("status").innerHTML = studyMode ? "active" : "inactive";
        document.getElementById("status").style.color = studyMode ? "green" : "red";
    });
};
