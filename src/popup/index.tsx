import "./index.css";


import { useEffect, useState } from "react"
import CodeMirror from "@uiw/react-codemirror";
import { vscodeDark } from "@uiw/codemirror-theme-vscode";
import { langs, loadLanguage } from '@uiw/codemirror-extensions-langs';


enum language { 
  Javascript = "javascript",
  CSS = "css"
}

const siteUrl = "fakeUrl"

function IndexPopup() {
  const [settings, setSettings] = useState({ javascript: "", css: "" });
  const [lang, setLang] = useState(language.Javascript)
  
//[siteUrl+language.Javascript, siteUrl+language.CSS]

  useEffect(() => {
    chrome.storage.sync.get(siteUrl, (result) => {
      setSettings({ ...settings, ...result[siteUrl] });
      console.log("result from storage:");
      
      console.log(result[siteUrl]);
      
    });
  }, []);

  function update(key: string, value: string) {
    console.log("something was updated");
    console.log(value);

    chrome.storage.sync.set({ [key]: { ...settings, [lang]: value } }, () => {
      setSettings({ ...settings, [lang]: value });
    });
  }

  function handleTabClick(event, tabName: language) {
    // Find all buttons
    const buttons = document.querySelectorAll('button');
  
    // Remove 'active' class and set aria-selected="false" for all buttons
    buttons.forEach(button => {
      button.classList.remove('active');
      button.setAttribute('aria-selected', 'false');
    });

    // Add 'active' class and set aria-selected="true" for the clicked button
    event.target.classList.add('active');
    event.target.setAttribute('aria-selected', 'true');
  
    // Add your tab switching logic here
    console.log(tabName + " tab selected");

    console.log("test get parent");
    console.log(event.target);
    
    setLang(tabName)
  }
  

  return (
    <div id="root">
      <div id="head">
        <div id="title">
          <h1>Costomize your web</h1>
          <h4>Your browser. Your rules.</h4>
        </div>
        <ul>
          <button
            aria-selected="true"
            className="tab-button"
            onClick={(event) => handleTabClick(event, language.Javascript)}
          >
            JavaScript
          </button>
          <button
            aria-selected="false"
            className="tab-button"
            onClick={(event) => handleTabClick(event, language.CSS)}
          >
            CSS
          </button>
        </ul>
      </div>
      <div>
        <CodeMirror
          value={lang == language.Javascript ? settings.javascript : settings.css}
          theme={vscodeDark}
          extensions={[loadLanguage(lang)]}
          data-language={lang}
          onChange={(e, u) =>  { update(siteUrl, e); console.log(e, u); } }
          style={{ maxHeight: '485px', overflow: 'auto'}}
        />
      </div>
      <button onClick={() => chrome.storage.sync.clear()}> clear cache </button>
    </div>
  )
}
export default IndexPopup
