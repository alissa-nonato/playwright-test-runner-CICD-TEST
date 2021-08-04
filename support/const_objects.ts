import {devices} from '@playwright/test';

// Define response url (regex) object to wait for when moving to next screen
export const RESPONSE_URL = {
    INITIAL_LOGIN_SCREEN: /.*experiments\/track/,
    HOME_SCHOOL_SCREEN: /.*ui-shiverchill-progress.png/,
    GAME_ENTERED_SCREEN: /.*general-icons-hud.png/,
    PARENT_POPUP: /.*popup-parent-link.png/
  };
  
  // Define screenshot file names
  export const SCREENSHOT = {
    HOME: 'home.png',
    SCHOOL: 'school.png'
  };
  
  // Define timeout values in ms
  export const TIMEOUT_MS = {
    HALF_SEC: 500,
    ONE_SEC: 1000,
    TWO_SECS: 2000,
    THREE_SECS: 3000,
    ONE_MIN: 60000,
    TWO_MIN: 120000,
    THREE_MIN: 180000
  };
  
  // Define URL object for the Prodigy URLs locally
  export const URL = {
    PRODIGY_FEATURE_BRANCH: 'https://alissa-qa.prodigygame.org/Play/',
    PRODIGY_STAGING: 'https://play.prodigygame.org/',
    PRODIGY_INTERNAL_PROD: 'https://internal-play.prodigygame.com/',
    PRODIGY_PROD: 'https://play.prodigygame.com/'
  };
  
  export const COORD_OFFSET = 5;
  
  export const AUTOMATION_OBJS = {
    CHAR_SEL_SCREEN: 'CharSelect',
    HOME_TXT: 'home',
    SCHOOL_TXT: 'school',
    PARENT_LINK_OKAY_BTN: 'playAtSchoolButton',
    LOW_END_OKAY_BTN: 'outState Text',
    MORE_WORLDS_BTN: 'more worlds',
    WORLD_AIRMELD_TXT: 'Airmeld',
    WORLD_MAP_BTN: 'world-map',
    SHIVERCHILL_GRAPHIC: 'btn-shiverchill',
    PVE_PLAY_BTN: 'playButton',
    MEM_CLOSE_BTN: 'closeButton',
    NPC_BOK: 'Bok'
  };
  
  // low end devices based on userAgent property of device
  // causes low end pop-up to appear on login
  export const LOW_END_USER_AGENTS = {
    IPAD_GEN_6: devices['iPad (gen 6)'].userAgent,
    IPHONE_6: devices['iPhone 6'].userAgent,
    IPHONE_6_PLUS: devices['iPhone 6 Plus'].userAgent,
    IPHONE_7: devices['iPhone 7'].userAgent,
    IPHONE_7_PLUS: devices['iPhone 7 Plus'].userAgent,
    IPHONE_8: devices['iPhone 8'].userAgent,
    IPHONE_8_PLUS: devices['iPhone 8 Plus'].userAgent,
    IPHONE_SE: devices['iPhone SE'].userAgent,
    IPHONE_X: devices['iPhone X'].userAgent,
    IPHONE_XR: devices['iPhone XR'].userAgent,
    IPHONE_11: devices['iPhone 11'].userAgent,
    IPHONE_11_PRO: devices['iPhone 11 Pro'].userAgent,
    IPHONE_11_PRO_MAX: devices['iPhone 11 Pro Max'].userAgent,
    IPHONE_12: devices['iPhone 12'].userAgent,
    IPHONE_12_PRO: devices['iPhone 12 Pro'].userAgent,
    IPHONE_12_PRO_MAX: devices['iPhone 12 Pro Max'].userAgent
  };
  
  export const DEFAULT_VIEWPORT = {
    WIDTH: 1280,
    HEIGHT: 720
  };
  
  export const CSS_SELECTORS = {
    LOGIN_BTN: '"Log in"'
  }