import { createRoot } from 'react-dom/client';
import styles from '../../index.css?inline';
import '../../index.css';
import App from '@/App';
import { ShadowRootContext } from '@/components/ui/select';
import type { InsurancesType } from '@/mocks/summary.mock';

function getStoreToken(element: HTMLElement) {
  const token = element.getAttribute('data-store-token');
  if (!token) {
    throw new Error('Missing store token');
  }
  return token;
}

function getInsuranceType(element: HTMLElement): InsurancesType {
  const insuranceType = element.getAttribute('data-insurance-type');
  if (!insuranceType) {
    throw new Error('Missing insurance type');
  }
  return insuranceType as InsurancesType;
}

function initializaWidget() {
  try {
    const widgetContainer = document.getElementById('kover');
    if (!widgetContainer) {
      return;
    }

    const shadowRoot = widgetContainer.attachShadow({ mode: 'open' });
    const shadowWidgetContent = document.createElement('div');
    const widgetPortalContainer = document.createElement('div');
    widgetPortalContainer.id = 'widget-container';
    shadowRoot.appendChild(widgetPortalContainer);

    const styleElement = document.createElement('style');

    styleElement.setAttribute('type', 'text/css');
    styleElement.textContent = styles;

    shadowRoot.appendChild(styleElement);
    widgetPortalContainer.appendChild(shadowWidgetContent);
    // shadowRoot.appendChild(shadowWidgetContent);

    const insuranceType = getInsuranceType(widgetContainer);
    const token = getStoreToken(widgetContainer);
    const root = createRoot(shadowWidgetContent);
    root.render(
      <ShadowRootContext.Provider value={shadowRoot}>
        <App storeToken={token} insuranceType={insuranceType} />
      </ShadowRootContext.Provider>
    );
  } catch (error) {
    console.error(error, 'Error while initializing widget');
  }
}

document.addEventListener('DOMContentLoaded', initializaWidget);
