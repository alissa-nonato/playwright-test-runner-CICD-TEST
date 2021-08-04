import { test, expect, describe } from '../fixtures/login.fixture';
import { getWinScale } from '../support/functions/functions_devices';
import { getObjProperty } from '../support/functions/functions_objects';
import { WindowScale } from '../support/types';
import { URL, AUTOMATION_OBJS } from '../support/const_objects';
import { Login } from '../classes/login.class';

// Use fixture
test.use({baseURL: URL.PRODIGY_PROD});

test.describe('Log in from home', () => {
    test('should log in', async ({page, baseURL, user, pass, contextOptions}) => {
        //test.skip();
        test.slow();
        const login = new Login(page);
        await login.initalLogin(baseURL!, user, pass, contextOptions);
        
        expect(await page.title()).toContain('Play Prodigy');
        //const screen: string = await getObjProperty(page, 'key', AUTOMATION_OBJS.CHAR_SEL_SCREEN);
        //expect(screen).toStrictEqual(AUTOMATION_OBJS.CHAR_SEL_SCREEN);
        await page.waitForTimeout(2000);
    });


    test('should enter the game from home', async ({page, contextOptions, baseURL, user, pass, viewport}) => {
        test.skip();
        test.slow();

        const login = new Login(page);
        await login.initalLogin(baseURL!, user, pass, contextOptions);
        
        const scale: WindowScale = await getWinScale(viewport, contextOptions);
        await login.playFromHome(scale);

        const worldMapBtn: string = await getObjProperty(page, 'name', AUTOMATION_OBJS.WORLD_MAP_BTN);
        expect(worldMapBtn).toStrictEqual(AUTOMATION_OBJS.WORLD_MAP_BTN);

        await page.waitForTimeout(2000);
    });

    test('should enter the game from school', async ({page, contextOptions, baseURL, user, pass, viewport}) => {
        test.skip();
        test.slow();

        const login = new Login(page);
        await login.initalLogin(baseURL!, user, pass, contextOptions);
        
        const scale: WindowScale = await getWinScale(viewport, contextOptions);
        await login.playFromSchool(scale);

        const worldMapBtn: string = await getObjProperty(page, 'name', AUTOMATION_OBJS.WORLD_MAP_BTN);
        expect(worldMapBtn).toStrictEqual(AUTOMATION_OBJS.WORLD_MAP_BTN);

        await page.waitForTimeout(2000);
    });
});
