import { createRoot } from "react-dom/client";
import styles from "../../index.css?inline";
import "../../index.css";
import App from "@/App";
import { ShadowRootContext } from "@/components/ui/select";

function getStoreToken(element: HTMLElement) {
  const token = element.getAttribute("data-store-token");
  if (!token) {
    throw new Error("Missing store token");
  }
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
    const widgetPortalContainer = document.createElement("div");
    widgetPortalContainer.id = "widget-container";
    shadowRoot.appendChild(widgetPortalContainer);

    const styleElement = document.createElement("style");

    styleElement.setAttribute('type', 'text/css');
    styleElement.textContent = styles;

    shadowRoot.appendChild(styleElement);
    shadowRoot.appendChild(shadowWidgetContent);

    const token = getStoreToken(widgetContainer);
    const root = createRoot(shadowWidgetContent);
    root.render(
      <ShadowRootContext.Provider value={shadowRoot}>
        <App storeToken={token} />
      </ShadowRootContext.Provider>
    );
  } catch (error) {
    console.error(error, 'Error while initializing widget');
  }
}

document.addEventListener('DOMContentLoaded', initializaWidget);


