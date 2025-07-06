import React from 'react';
import PropTypes from 'prop-types';

import { useIsMobile } from 'hooks';

const InfoDetail = ({ title, content }) => (
  <div>
    <div>
      <p>{title}</p>
      <p>{content}</p>
    </div>
  </div>
);

InfoDetail.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
};

const Features = () => {
  const { isMobile } = useIsMobile();

  return (
    <>
      <div
        className="main-container automation"
        style={{ borderBottom: isMobile ? 'none' : 'solid 1px #D8D8D8' }}
      >
        <div className="container" style={{ position: 'relative' }}>
          <div
            className="common-heading feature-heading"
            style={{
              textAlign: 'center',
              marginTop: isMobile ? '30px' : '0px',
            }}
          >
            email automation
          </div>
          {!isMobile && (
            <div className="automation-img-wrapper-centered">
              <video
                muted
                autoPlay
                loop
                src="extension-assets/extension-gif-email.mp4"
                alt="ext-highlights"
                width={620}
              />
            </div>
          )}
          <div className="features-horizontal-wrapper">
            <div className="feature">
              {isMobile && (
                <div className="feature-img-wrapper">
                  <img
                    src="extension-assets/click-to-email-icon.png"
                    alt="click-to-email-icon"
                    width={74}
                  />
                </div>
              )}
              <div className="feature-header">Click to Email</div>
              <div className="feature-description">
                speed up your workflow with single click emails.
              </div>
              {!isMobile && (
                <div className="feature-img-wrapper">
                  <img
                    src="extension-assets/click-to-email-icon.png"
                    alt="click-to-email-icon"
                    width={74}
                  />
                </div>
              )}
            </div>
            <div className="feature">
              {isMobile && (
                <div className="feature-img-wrapper">
                  <img src="extension-assets/template-icon.png" alt="template-icon" width={56} />
                </div>
              )}
              <div className="feature-header">Email Templates</div>
              <div className="feature-description">customize load inquiries to your liking.</div>
              {!isMobile && (
                <div className="feature-img-wrapper">
                  <img src="extension-assets/template-icon.png" alt="template-icon" width={56} />
                </div>
              )}
            </div>
            <div className="feature">
              {isMobile && (
                <div className="feature-img-wrapper">
                  <img src="extension-assets/gmail-icon.png" alt="gmail-icon" width={74} />
                </div>
              )}
              <div className="feature-header">Gmail Integrated</div>
              <div className="feature-description">
                all correspondence is linked with your Gmail account.
              </div>
              {!isMobile && (
                <div className="feature-img-wrapper">
                  <img src="extension-assets/gmail-icon.png" alt="gmail-icon" width={74} />
                </div>
              )}
            </div>
          </div>
          {isMobile && (
            <>
              <div className="automation-img-wrapper-centered">
                <video
                  muted
                  autoPlay
                  loop
                  src="extension-assets/extension-gif-email.mp4"
                  alt="ext-highlights"
                  width={620}
                />
              </div>
            </>
          )}
        </div>
      </div>
      <div className="main-container automation">
        <div className="container" style={{ position: 'relative' }}>
          <div className="common-heading feature-heading">market data</div>
          <div className="row align-items-center no-margin">
            <div className="features-wrapper">
              <div className="automation-info-wrapper">
                <InfoDetail title="Market Insights" content="color-coded destination markets." />
                <InfoDetail
                  title="Pricing Insights"
                  content="AI-generated prices  and average broker rates."
                />
                <InfoDetail
                  title="Best Load"
                  content="Our AI highlights the next best load for you."
                />
              </div>
            </div>
          </div>
          <div className="automation-img-wrapper">
            <video
              muted
              autoPlay
              loop
              src="extension-assets/extension-gif-market.mp4"
              alt="ext-highlights"
              width={620}
            />
          </div>
        </div>
      </div>
      <div className="main-container automation">
        <div className="container">
          <div className="common-heading common-heading-reversed feature-heading">
            search helpers
          </div>
          <div className="row align-items-center no-margin justify-end">
            <div className="features-wrapper">
              <div className="automation-info-wrapper-reversed">
                <InfoDetail
                  title="Comment Filtering"
                  content="filter out loads that you don't care about."
                />
                <InfoDetail
                  title="Advanced Filtering"
                  content="skip cross-border and non-factored loads, minimum mile by time filter."
                />
                <InfoDetail
                  title="Click to Gmaps"
                  content="open Google Maps with a single click."
                />
              </div>
            </div>
          </div>
          <div className="automation-img-wrapper-reversed">
            <video
              muted
              autoPlay
              loop
              src="extension-assets/extension-gif-filters.mp4"
              alt="ext-highlights"
              width={620}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Features;
