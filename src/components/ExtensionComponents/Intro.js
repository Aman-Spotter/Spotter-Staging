import React from 'react';

import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { ReactComponent as GoogleChromeIcon } from 'assets/svgs/chrome_logo.svg';

import { useIsMobile } from 'hooks';

import './index.scss';

const Intro = () => {
  const { isMobile } = useIsMobile();

  return (
    <div className="main-container intro">
      <div className="container">
        <div className="row align-items-center intro-wrapper">
          <div
            className="col"
            style={{
              maxWidth: '50%',
              flexBasis: '50%',
            }}
          >
            <div
              className="common-heading"
              style={{
                whiteSpace: 'nowrap',
                color: '#ffffff',
              }}
            >
              <span className="title" style={{ color: '#fffefe' }}>
                load spotter
              </span>
              <br />
              <span className="subtitle">
                navigate the freight {isMobile ? <br /> : null} market like a Pro
              </span>
            </div>
            <div className="buttons-wrapper">
              <a
                className="carrier-button"
                href="https://chrome.google.com/webstore/detail/dat-companion/anjknaophdgkjljelgjgoieopobgoaci"
                target="_blank"
                rel="noreferrer"
                style={{
                  height: '60px',
                }}
              >
                add to chrome
                <GoogleChromeIcon className="icon" />
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="main-gif-container">
        <video muted autoPlay loop src="extension-assets/extension-main.mp4" alt="intro" />
      </div>
    </div>
  );
};

export default Intro;
