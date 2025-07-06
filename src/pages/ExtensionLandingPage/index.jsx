import React from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import {
  ExtensionIntro,
  ExtensionFeatures,
  ExtensionPricing,
  OwnerSection,
  OwnerSectionSmall,
} from 'components';
import { useIsMobile } from 'hooks';

const ExtensionLandingPage = () => {
  const history = useHistory();
  const onConfrimHandleSubmit = async (values) => {
    const webhookUrl =
      process.env.REACT_APP_ENV === 'PRODUCTION'
        ? 'https://hooks.slack.com/services/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'
        : 'https://hooks.slack.com/services/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';

    const formatedText = `A new user signed up as a Carrier,
Below are details information of it:
       ${JSON.stringify({ ...values }, null, 4)}
      `;
    const stringFormattedData = {
      text: formatedText,
    };

    const res = await axios.post(webhookUrl, JSON.stringify(stringFormattedData), {
      withCredentials: false,
      transformRequest: [
        (transFormData, headers) => {
          delete headers.post['Content-Type'];
          return transFormData;
        },
      ],
    });

    if (res.status === 200) {
      history.push({
        pathname: '/carrier-sign-up',
        state: {
          data: {
            interested: values,
          },
        },
      });
    } else {
      console.error('There was an error.  Please try again later.');
    }
  };

  const { isMobile } = useIsMobile();

  return (
    <>
      <ExtensionIntro onHandleSubmit={onConfrimHandleSubmit} />
      <ExtensionFeatures />
      {/* <ExtensionPricing /> */}
      {/* {isMobile ? <OwnerSection noDots color="#008080" small /> : <OwnerSectionSmall />} */}
    </>
  );
};

export default ExtensionLandingPage;
