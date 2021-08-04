import type { Page } from 'playwright';
import { Coordinates, WindowScale  } from '../support/types';
import { CSS_SELECTORS, RESPONSE_URL, URL, TIMEOUT_MS, COORD_OFFSET, AUTOMATION_OBJS } from '../support/const_objects';
import { isLowEndDevice, closeLowEndDevicePopup } from '../support/functions/functions_devices';
import { isObjVisible, getObjPosition } from '../support/functions/functions_objects';
import { BrowserContextOptions } from '@playwright/test';

// look into why browsers are opening twice when you try to add other vars
export class Login {
    readonly page: Page;
    // readonly url: string | undefined;
    // readonly user: string | undefined;
    // readonly pass: string | undefined;
    // readonly contextOptions: BrowserContextOptions | undefined;


    constructor(page: Page, url?: string, user?: string, pass?: string, contextOptions?: BrowserContextOptions) {
        this.page = page;
        // this.url = url;
        // this.user = user;
        // this.pass = pass;
        // this.contextOptions = contextOptions;
    }

    async initalLogin(url: string, user: string, pass: string, contextOptions: BrowserContextOptions) {
        await this.page.goto(url);
        await Promise.all([
            this.page.waitForNavigation(),             // The promise resolves after navigation has finished
            this.page.click(CSS_SELECTORS.LOGIN_BTN)   // Clicking the 'Log in' button will indirectly cause a navigation
        ]);
    
        // Type into the username and password fields and click Enter to log in
        await this.page.fill('.game-login-username', user);
        await this.page.fill('.game-login-password', pass);

        const responseURL = 
            url === URL.PRODIGY_FEATURE_BRANCH || url === URL.PRODIGY_STAGING
            ? RESPONSE_URL.HOME_SCHOOL_SCREEN : RESPONSE_URL.INITIAL_LOGIN_SCREEN;

        await Promise.all([           
            this.page.waitForResponse(responseURL),    // Waits for the next response with the specified url (RegEx)
            this.page.click(`span >> ${CSS_SELECTORS.LOGIN_BTN}`)          // Clicking button triggers the response
        ]); 

        await this.page.waitForTimeout(TIMEOUT_MS.ONE_SEC);
        
        // close popup if on older mobile device
        if (contextOptions.viewport !== undefined && await isLowEndDevice(contextOptions)) {
            await closeLowEndDevicePopup(this.page, contextOptions);
        } 
    }

    async playFromHome(scale: WindowScale) {
        const homeTxt: Coordinates = await getObjPosition(this.page, 'name', AUTOMATION_OBJS.HOME_TXT, 'worldPosition', TIMEOUT_MS.TWO_SECS);

        await this.page.mouse.click(
            ((homeTxt.x * scale.scaleX) + COORD_OFFSET), 
            ((homeTxt.y * scale.scaleY) + COORD_OFFSET)
        );

        const moreWorldsBtn: Coordinates = await getObjPosition(this.page, 'name', AUTOMATION_OBJS.MORE_WORLDS_BTN, 'worldPosition');
    
        await this.page.mouse.click(
            ((moreWorldsBtn.x * scale.scaleX) + COORD_OFFSET), 
            ((moreWorldsBtn.y * scale.scaleY) + COORD_OFFSET)
        );

        const airmeldTxt: Coordinates = await getObjPosition(this.page, 'text', AUTOMATION_OBJS.WORLD_AIRMELD_TXT, 'worldPosition');
    
        await this.page.mouse.click(
            ((airmeldTxt.x * scale.scaleX) + COORD_OFFSET), 
            ((airmeldTxt.y * scale.scaleY) + COORD_OFFSET)
        );            
    }

    async playFromSchool(scale: WindowScale) {
        const schoolTxt: Coordinates = await getObjPosition(this.page, 'name', AUTOMATION_OBJS.SCHOOL_TXT, 'worldPosition', TIMEOUT_MS.TWO_SECS);
        
        await this.page.mouse.click(
            ((schoolTxt.x * scale.scaleX) + COORD_OFFSET), 
            ((schoolTxt.y * scale.scaleY) + COORD_OFFSET)
        );

        // taking into account parent link popup
        const isParentPopupVisible: boolean = await isObjVisible(this.page, 'name', AUTOMATION_OBJS.PARENT_LINK_OKAY_BTN, 'worldVisible', TIMEOUT_MS.HALF_SEC, 2);

        if(isParentPopupVisible) {
            const parentLinkOkayBtn: Coordinates = await getObjPosition(this.page, 'name', AUTOMATION_OBJS.PARENT_LINK_OKAY_BTN, 'worldPosition');

            await this.page.mouse.click(
                ((parentLinkOkayBtn.x * scale.scaleX) + COORD_OFFSET), 
                ((parentLinkOkayBtn.y * scale.scaleY) + COORD_OFFSET)
            );
        }
    }
}