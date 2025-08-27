import { initializers } from '@dropins/tools/initializer.js';
import { getConfigValue } from '@dropins/tools/lib/aem/configs.js';
import * as paymentServicesApi from '@dropins/storefront-payment-services/api.js';
import { initializeDropin, getUserTokenCookie as getCustomerToken } from './index.js';
import { fetchPlaceholders } from '../commerce.js';

await initializeDropin(async () => {
  const apiUrl = getConfigValue('commerce-core-endpoint') || getConfigValue('commerce-endpoint');

  const labels = await fetchPlaceholders('placeholders/payment-services.json');
  const langDefinitions = {
    default: {
      ...labels,
    },
  };

  return initializers.mountImmediately(paymentServicesApi.initialize, {
    apiUrl,
    getCustomerToken,
    langDefinitions,
  });
})();
