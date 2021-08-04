// import { BrowserContextOptions, expect } from '@playwright/test';
// import type { Page } from 'playwright';
// import { Coordinates, WindowScale } from '../support/types';
// import { Login } from './login.class';
// import { getObjProperty, getObjPosition, isObjVisible } from '../support/functions/functions_objects';
// import { AUTOMATION_OBJS, COORD_OFFSET, TIMEOUT_MS } from '../support/const_objects';

// export class Shiverchill {
//     readonly page: Page;
//     // add loginPage property
//     readonly login: Login;

//     constructor(page: Page, url: string, user: string, pass: string, contextOptions: BrowserContextOptions) {
//         this.page = page;
//         // initialize login object 
//         this.login = new Login(this.page, url, user, pass, contextOptions);
//     }

//     async goToShiverchillFromHome (scale: WindowScale) {
//         await this.login.initalLogin(this.login.url!, this.login.user!, this.login.pass!, this.login.contextOptions!);
//         await this.login.playFromHome(scale);

//         // click world map btn
//         const worldMapBtn: Coordinates = await getObjPosition(this.login.page, 'name', AUTOMATION_OBJS.WORLD_MAP_BTN, 'worldPosition');
//         await this.login.page.mouse.click(
//             ((worldMapBtn.x * scale.scaleX) + COORD_OFFSET), 
//             ((worldMapBtn.y * scale.scaleY) + COORD_OFFSET)
//         );

//         // click Shiverchill obj on map
//         const shiverchillObj: Coordinates = await getObjPosition(this.page, 'frame', AUTOMATION_OBJS.SHIVERCHILL_GRAPHIC);
//         await this.page.mouse.click(
//             ((shiverchillObj.x * scale.scaleX) + COORD_OFFSET), 
//             ((shiverchillObj.y * scale.scaleY) + COORD_OFFSET)
//         );

//         // click play btn on PvE screen
//         const playBtn: Coordinates = await getObjPosition(this.page, 'name', AUTOMATION_OBJS.PVE_PLAY_BTN, 'worldPosition');
    
//         await this.page.mouse.click(
//             ((playBtn.x * scale.scaleX) + COORD_OFFSET), 
//             ((playBtn.y * scale.scaleY) + COORD_OFFSET)
//         );  
        
//         // click close button on Membership pop-up if it appears (only appears after school hours when playing from home)
//         const isVisible: boolean = await isObjVisible(this.page, 'name', AUTOMATION_OBJS.MEM_CLOSE_BTN, 'worldVisible', TIMEOUT_MS.HALF_SEC, 5);
    
//         if(isVisible) {
//             const closeBtn: Coordinates = await getObjPosition(this.page, 'name', AUTOMATION_OBJS.MEM_CLOSE_BTN, 'worldPosition');
        
//             await this.page.mouse.click(
//                 ((closeBtn.x * scale.scaleX) + COORD_OFFSET), 
//                 ((closeBtn.y * scale.scaleY) + COORD_OFFSET)
//             );
//         }    
//     }

//     async goToShiverchillFromSchool () {
//         // don't add membership here
//         // maybe think about putting common steps in a diff function for both home and school to call
//     }
// }