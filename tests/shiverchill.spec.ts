// import { test, expect, describe } from '../fixtures/login.fixture';
// import { getWinScale } from '../support/functions/functions_devices';
// import { getObjProperty } from '../support/functions/functions_objects';
// import { WindowScale } from '../support/types';
// import { URL, AUTOMATION_OBJS, TIMEOUT_MS } from '../support/const_objects';
// import { Login } from '../classes/login.class';
// import { Shiverchill } from '../classes/shiverchill.class';

// // Use fixture
// test.use({baseURL: URL.PRODIGY_FEATURE_BRANCH});

// test('should travel to Shiverchill', async ({page, contextOptions, baseURL, user, pass, viewport}) => {
//     test.skip();
//     test.slow();

//     const sc = new Shiverchill(page, baseURL!, user, pass, contextOptions);
    
    
//     const scale: WindowScale = await getWinScale(viewport, contextOptions);
//     await sc.goToShiverchillFromHome(scale);

//     const bokNPC: string = await getObjProperty(page, 'name', AUTOMATION_OBJS.NPC_BOK, TIMEOUT_MS.ONE_SEC);
//     expect(bokNPC).toStrictEqual(AUTOMATION_OBJS.NPC_BOK);

//     await page.waitForTimeout(2000);
// });