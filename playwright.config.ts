import { PlaywrightTestConfig, devices } from '@playwright/test';
import { LoginFixture } from './fixtures/login.fixture';

const config: PlaywrightTestConfig = {
    // Look for test files in the "tests" directory, relative to this configuration file
    testDir: 'tests',
    outputDir: 'test-results',
    // Each test is given 60 seconds
    timeout: 300000,
    // Forbid test.only on CI
    forbidOnly: !!process.env.CI,
    // 30 retries for each test
    retries: 3,
    // Limit the number of workers on CI, use default locally
    workers: process.env.CI ? 2 : 5,
    use: {
        //headless: false,
        //viewport: { width: 1280, height: 720 },
        ignoreHTTPSErrors: true,
        video: 'on-first-retry',
        trace: 'on-first-retry',
        screenshot: 'only-on-failure',
        bypassCSP: true,
        launchOptions: {
            slowMo: 100,
        },
    },
    reporter: [
        ['list'],
        //['json', {  outputFile: 'test-results/test-results.json' }]
    ],
    projects: [
        {
            name: 'Chromium',
            use: {
                // Configure the browser to use.
                browserName: 'chromium',

                // Any Chromium-specific options.
                viewport: { width: 600, height: 800 },
            },
        },

        {
            name: 'WebKit',
            use: { browserName: 'webkit' },
        },

        //"iPhone 6" tests use Chromium browser.
        {
            name: 'iPhone 6',
            use: {
                browserName: 'chromium',
                //device: devices['iPhone 6'],
                //...devices['iPhone 6'],   // not true emulation; need to explicitly set viewport and userAgent without this
                // viewport: devices['iPhone 6'].viewport,
                // userAgent: devices['iPhone 6'].userAgent
                contextOptions: {
                    viewport: devices['iPhone 6'].viewport,
                    userAgent: devices['iPhone 6'].userAgent,
                    isMobile: devices['iPhone 6'].isMobile
                },     
                //...devices["iPhone 6"]
            },
        },

        // "Pixel 4" tests use WebKit browser.
        {
            name: 'Pixel 4',
            use: {
                browserName: 'webkit',
                contextOptions: {
                    viewport: devices['Pixel 4'].viewport,
                    userAgent: devices['Pixel 4'].userAgent,
                    isMobile: devices['Pixel 4'].isMobile
                },   
            },
        },
    ],
};
export default config;
