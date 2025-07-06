import { createGlobalStyle } from 'styled-components';

import OpenSansBoldTTF from './OpenSans/OpenSans-Bold.ttf';
import OpenSansBoldItalicTTF from './OpenSans/OpenSans-BoldItalic.ttf';
import OpenSansExtraBoldTTF from './OpenSans/OpenSans-ExtraBold.ttf';
import OpenSansExtraBoldItalicTTF from './OpenSans/OpenSans-ExtraBoldItalic.ttf';
import OpenSansItalicTTF from './OpenSans/OpenSans-Italic.ttf';
import OpenSansLightTTF from './OpenSans/OpenSans-Light.ttf';
import OpenSansLightItalicTTF from './OpenSans/OpenSans-LightItalic.ttf';
import OpenSansRegularTTF from './OpenSans/OpenSans-Regular.ttf';
import OpenSansSemiBoldTTF from './OpenSans/OpenSans-SemiBold.ttf';
import OpenSansSemiBoldItalicTTF from './OpenSans/OpenSans-SemiBoldItalic.ttf';

// Matter font imports
import MatterLightWOFF from './Matter/Matter-Light.woff';
import MatterRegularWOFF from './Matter/Matter-Regular.woff';
import MatterMediumWOFF from './Matter/Matter-Medium.woff';
import MatterSemiBoldWOFF from './Matter/Matter-SemiBold.woff';
import MatterBoldWOFF from './Matter/Matter-Bold.woff';
import MatterHeavyWOFF from './Matter/Matter-Heavy.woff';

export default createGlobalStyle`
  @font-face {
    font-family: 'Open Sans Bold';
    src: local('Open Sans Bold'), url(${OpenSansBoldTTF});
    font-style: normal;
  }

  @font-face {
    font-family: 'Open Sans Bold Italic';
    src: local('Open Sans Bold Italic'), url(${OpenSansBoldItalicTTF});
    font-style: normal;
  }

  @font-face {
    font-family: 'Open Sans ExtraBold';
    src: local('Open Sans Extra'), url(${OpenSansExtraBoldTTF});
    font-style: normal;
  }

  @font-face {
    font-family: 'Open Sans ExtraBold Italic';
    src: local('Open Sans ExtraBold Italic'), url(${OpenSansExtraBoldItalicTTF});
    font-style: normal;
  }

  @font-face {
    font-family: 'Open Sans Italic';
    src: local('Open Sans Italic'), url(${OpenSansItalicTTF});
    font-style: normal;
  }

  @font-face {
    font-family: 'Open Sans Light';
    src: local('Open Sans Light'), url(${OpenSansLightTTF});
    font-style: normal;
  }

  @font-face {
    font-family: 'Open Sans Light Italic';
    src: local('Open Sans Light Italic'), url(${OpenSansLightItalicTTF});
    font-style: normal;
  }

  @font-face {
    font-family: 'Open Sans Regular';
    src: local('Open Sans Regular'), url(${OpenSansRegularTTF});
    font-style: normal;
  }

  @font-face {
    font-family: 'Open Sans SemiBold';
    src: local('Open Sans SemiBold'), url(${OpenSansSemiBoldTTF});
    font-style: normal;
  }

  @font-face {
    font-family: 'Open Sans SemiBold Italic';
    src: local('Open Sans SemiBold Italic'), url(${OpenSansSemiBoldItalicTTF});
    font-style: normal;
  }

  /* Matter font family */
  @font-face {
    font-family: 'Matter';
    src: local('Matter Light'), url(${MatterLightWOFF}) format('woff');
    font-weight: 300;
    font-style: normal;
    font-display: swap;
  }

  @font-face {
    font-family: 'Matter';
    src: local('Matter Regular'), url(${MatterRegularWOFF}) format('woff');
    font-weight: 400;
    font-style: normal;
    font-display: swap;
  }

  @font-face {
    font-family: 'Matter';
    src: local('Matter Medium'), url(${MatterMediumWOFF}) format('woff');
    font-weight: 500;
    font-style: normal;
    font-display: swap;
  }

  @font-face {
    font-family: 'Matter';
    src: local('Matter SemiBold'), url(${MatterSemiBoldWOFF}) format('woff');
    font-weight: 600;
    font-style: normal;
    font-display: swap;
  }

  @font-face {
    font-family: 'Matter';
    src: local('Matter Bold'), url(${MatterBoldWOFF}) format('woff');
    font-weight: 700;
    font-style: normal;
    font-display: swap;
  }

  @font-face {
    font-family: 'Matter';
    src: local('Matter Heavy'), url(${MatterHeavyWOFF}) format('woff');
    font-weight: 900;
    font-style: normal;
    font-display: swap;
  }
`;
