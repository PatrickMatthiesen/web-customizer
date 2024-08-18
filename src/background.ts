import { url } from "inspector"

export {}

console.log("Service worker is running");

// TODO: fill with urls of sites that we have in local storage
const filter = {
  url: [
    {
      urlMatches: 'https://www.crunchyroll.com/*',
    },
  ],
};

chrome.webNavigation.onBeforeNavigate.addListener((details) => {
  console.log("Before navigate at: ", details.url)
    if (details.frameId !== 0) return
    //We need this to start the service worker before web load.
})
  
chrome.webNavigation.onCommitted.addListener((details) => {
  if (details.frameId !== 0) return
  if (details.url) {
      console.log("On commit at: " + details.url)
  }
})

// chrome.storage.onChanged.addListener((changes, namespace) => {
//   if (namespace !== "local") return
//   if (changes.theme) {
//       // TODO: add injection when the script has been changed for live update, but only if setting has been set for the current session

//     // chrome.tabs.query({ url: "https://learnit.itu.dk/*" }, (tabs) => {
//     //   injectCurrentTheme(tabs.map((tab) => tab.id), oldTheme)
//     // })
//   }
// })