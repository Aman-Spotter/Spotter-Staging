import React from 'react';
import { PublicLayout } from 'components';
import * as GS from 'globalStyles';

import './styles.css';

const ExtensionLUD = () => (
  <PublicLayout>
    <GS.Container>
      <div className="privacy-policy-container">
        <div className="tab-content translations-content-item en visible" id="en">
          <h1>Limited Use Disclosure</h1>
          <p>Spotter uses Google API&apos;s to send emails on user&apos;s behalf. </p>

          <p>
            Spotter&apos;s use and transfer to any other app of information received from Google
            APIs will adhere to the{' '}
            <a
              href="https://developers.google.com/terms/api-services-user-data-policy#additional_requirements_for_specific_api_scopes"
              target="_blank"
              rel="noreferrer"
            >
              Google API Services User Data Policy
            </a>
            , including the Limited Use requirements.
          </p>
        </div>
      </div>
    </GS.Container>
  </PublicLayout>
);

export default ExtensionLUD;
