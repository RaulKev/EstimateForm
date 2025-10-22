import { createRoot } from "react-dom/client";
import { EstimateForm } from "./components/EstimateForm";
// import styles from '../../index.css?inline'
import "../../index.css";
import { StrictMode } from "react";
// import { StrictMode } from "react";

function getStoreToken(element: HTMLElement) {
  const token = element.getAttribute("data-store-token");
  if (!token) {
    throw new Error("Missing store token");
  }
  console.log(token);
  return token;
}

function initializaWidget() {
  try {
    const widgetContainer = document.getElementById("kover");

    if (!widgetContainer) {
      return;
    }

    const shadowRoot = widgetContainer.attachShadow({ mode: "open" });
    const shadowWidgetContent = document.createElement("div");
    const linkElement = document.createElement("link");

    linkElement.rel = "stylesheet";
    linkElement.href = "http://localhost:62143/index.css";
    linkElement.setAttribute("data-origin", "estimate-widget");
    // shadowRoot.id = 'root'
    // linkElement.setAttribute("data-origin", "estimate-widget");
    // linkElement.textContent = styles;
    shadowRoot.appendChild(linkElement);

    const token = getStoreToken(widgetContainer);
    const root = createRoot(shadowWidgetContent);
    root.render(
      <StrictMode>
        <EstimateForm storeToken={token} />
      </StrictMode>
    );

    // document.head.appendChild(linkElement);
    shadowRoot.appendChild(shadowWidgetContent);
  } catch (error) {
    console.error(error, 'Error while initializing widget');
  }
}

document.addEventListener('DOMContentLoaded', initializaWidget);


