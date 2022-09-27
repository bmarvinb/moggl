import { createGlobalStyle } from 'styled-components'
import ProximaNovaBold from './theme/fonts/ProximaNova-Bold.woff'
import ProximaNovaExtrabold from './theme/fonts/ProximaNova-Extrabold.woff'
import ProximaNovaLight from './theme/fonts/ProximaNova-Light.woff'
import ProximaNovaRegular from './theme/fonts/ProximaNova-Regular.woff'
import ProximaNovaSemibold from './theme/fonts/ProximaNova-Semibold.woff'

export const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'ProximaNova';
    font-weight: 300;
    src: local('ProximaNova'),
      url(${ProximaNovaLight}) format('woff');
  }
  @font-face {
    font-family: 'ProximaNova';
    font-weight: 400;
    src: local('ProximaNova'),
      url(${ProximaNovaRegular}) format('woff');
  }
  @font-face {
    font-family: 'ProximaNova';
    font-weight: 500;
    src: local('ProximaNova'),
      url(${ProximaNovaSemibold}) format('woff');
  }
  @font-face {
    font-family: 'ProximaNova';
    font-weight: 700;
    src: local('ProximaNova'),
      url(${ProximaNovaBold}) format('woff');
  }
  @font-face {
    font-family: 'ProximaNova';
    font-weight: 900;
    src: local('ProximaNova'),
      url(${ProximaNovaExtrabold}) format('woff');
  }

  * {
    box-sizing: border-box;
    font-family: 'ProximaNova';
  }

  html,
  body {
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
    overscroll-behavior: none;
  }

  #root {
    height: 100%;
  }

  :root {
    --primary0: #dceefb;
    --primary1: #b6e0fe;
    --primary2: #84c5f4;
    --primary3: #64b1e8;
    --primary4: #4098d7;
    --primary5: #2680c2;
    --primary6: #186faf;
    --primary7: #0f609b;
    --primary8: #0a558c;
    --primary9: #003e6b;
    --secondary0: #fffbea;
    --secondary1: #fff3c4;
    --secondary2: #fce588;
    --secondary3: #fadb5f;
    --secondary4: #f7c948;
    --secondary5: #f0B429;
    --secondary6: #de911d;
    --secondary7: #cb6e17;
    --secondary8: #b44d12;
    --secondary9: #8d2b0b;
    --neutral0: #fbfcfd; // #f0f4f8
    --neutral1: #f0f4f8; // d9e2ec  
    --neutral2: #d9e2ec; // bcccdc  
    --neutral3: #bcccdc; // 9fb3c8  
    --neutral4: #9fb3c8; // 829ab1  
    --neutral5: #829ab1; // 627d98  
    --neutral6: #627d98; // 486581  
    --neutral7: #486581; // 334e68  
    --neutral8: #334e68; // 243b53  
    --neutral9: #102a43; // 102a43  
    --cyan0: #e0fcff;
    --cyan1: #bef8fd;
    --cyan2: #87eaf2;
    --cyan3: #54d1db;
    --cyan4: #38bec9;
    --cyan5: #2cb1bc;
    --cyan6: #14919b;
    --cyan7: #0e7c86;
    --cyan8: #0a6b74;
    --cyan9: #044e54;
    --red0: #ffeeee;
    --red1: #facdcd;
    --red2: #f29b9b;
    --red3: #e66a6a;
    --red4: #d64545;
    --red5: #ba2525;
    --red6: #a61b1b;
    --red7: #911111;
    --red8: #78oaoa;
    --red9: #610404;

    --fontSizeXs: 0.75rem;
    --fontSizeSm: 0.875rem;
    --fontSizebase: 1rem;
    --fontSizeLg: 1.125rem;
    --fontSizeXl: 1.25rem;
    
    --lineHeightXs: 1rem;
    --lineHeightSm: 1.25rem;
    --lineHeightBase: 1.5rem;
    --lineHeightLg: 1.75rem;
    --lineHeightXl: 1.75rem;
    
    --shadowXs: 0 1px 2px 0 rgb(0 0 0 / 0.05);
    --shadowSm: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
    --shadowMd: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
    --shadowLg:
      0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
    --shadowXl:
      0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);
    --shadowInner: inset 0 2px 4px 0 rgb(0 0 0 / 0.05);

    --roundedSm: 0.125rem; 
    --rounded: 0.25rem; 
    --roundedMd: 0.375rem; 
    --roundedLg: 0.5rem; 
    --roundedXl: 0.75rem; 
  }
`
