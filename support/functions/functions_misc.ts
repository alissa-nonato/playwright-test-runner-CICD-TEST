import { Page } from '@playwright/test';

// Checks to see if a response was resolved after clicking a button
// with the specified x and y coordinates
// optional timeout parameter in ms
export async function responseOk (
    page: Page, 
    regex: RegExp,
    x: number, 
    y: number,
    pageTimeoutMS?: number,
    responseTimeoutMS: number = 60000
): Promise<boolean> {

    if (pageTimeoutMS !== undefined && pageTimeoutMS > 0) {
        await page.waitForTimeout(pageTimeoutMS);
    }

    // Promise.all prevents a race condition between clicking and waiting for the response
    const [response] = await Promise.all([
        page.waitForResponse(regex, {timeout: responseTimeoutMS}),  // Waits for the next response with the specified url (RegEx)
        page.mouse.click(x, y)                                      // Clicking button triggers the response
    ]);

    // Returns a boolean stating whether the response was successful (status range 200-299) or not
    return response.ok();  
}