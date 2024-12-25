import React from "react";
import "./TaggingPrompt.scss";
import ReactDOM from "react-dom/client";
// import { useNavigate } from "react-router-dom";

export function TaggingPrompt({ website }: { website: string }) {
  // const navigate = useNavigate()
  function handleTagNow() {
    chrome.runtime.getBackgroundPage((backgroundPage) => {
      if (backgroundPage){
        backgroundPage.location.href = '/configure';
      }
    });
    closePrompt();
  }

  function closePrompt() {
    const root = document.getElementById("recenter_untagged_prompt");
    if (root) {
      root.remove();
    }
  }

  const logo = chrome.runtime.getURL("images/recenter_logo.png");

  return (
    <div id="tagging_prompt">
      <div id="tagging_prompt__title">
        <div id="tagging_prompt__title__logo">
          <img src={logo} alt="logo" />
        </div>
        <div id="tagging_prompt__title__text">
          <h1>Recenter</h1>
        </div>
      </div>
      <div id="tagging_prompt__line">
        Tag This Website
      </div>
      <div id="tagging_prompt__message">
        You've spent more than 5 minutes on{" "}
        <span className="highlight">{website}</span>. Would you like to tag it as
        Productive, Non-Productive, or Unsure?
      </div>
      <div id="tagging_prompt__buttons">
        <button id="tagging_prompt__tag_button" onClick={handleTagNow}>
          Tag Now
        </button>
        <button id="tagging_prompt__dismiss_button" onClick={closePrompt}>
          Dismiss
        </button>
      </div>
    </div>
  );
}

export function insertTaggingPrompt(website: string) {
  if (document.getElementById("recenter_untagged_prompt") !== null) {
    return;
  }
  const root = document.createElement("div");
  root.id = "recenter_untagged_prompt";
  document.body.appendChild(root);
  const rootDiv = ReactDOM.createRoot(root);
  rootDiv.render(
    <React.StrictMode>
      <TaggingPrompt website={website} />
    </React.StrictMode>
  );
}
