console.log("popjs is called.")

const hide = document.getElementById("hide");
const open = document.getElementById("open");

hide.addEventListener("click", function() {;
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {data: 'close'}, function(response) {
      console.log('sent..');
      return Promise.resolve("Dummy response to keep the console quiet");
    })
  })
});

open.addEventListener("click", function() {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {data: 'open'}, function(response) {
      console.log('sent..');
      return Promise.resolve("Dummy response to keep the console quiet");
    })
  })
});










