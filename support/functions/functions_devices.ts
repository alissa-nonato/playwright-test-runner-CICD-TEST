import { BrowserContextOptions, Page, devices, ViewportSize, expect } from '@playwright/test';
import { Coordinates, IsVisibleProperty, ObjProperty, PositionProperty,  WindowScale,  } from "../types";
import { TIMEOUT_MS, DEFAULT_VIEWPORT, LOW_END_USER_AGENTS, COORD_OFFSET, AUTOMATION_OBJS } from "../const_objects";
import { getObjPosition } from './functions_objects';

export async function getWinScale (viewport?: ViewportSize | null | undefined, contextOptions?: BrowserContextOptions | undefined): Promise<WindowScale> {
   
    if(viewport !== undefined) {
        return { 
            scaleX: viewport!.width / DEFAULT_VIEWPORT.WIDTH,
            scaleY: viewport!.height / DEFAULT_VIEWPORT.HEIGHT
        };
    }
    
    if(contextOptions?.viewport !== undefined) {
        return { 
            scaleX: contextOptions?.viewport!.width / DEFAULT_VIEWPORT.WIDTH,
            scaleY: contextOptions?.viewport!.height / DEFAULT_VIEWPORT.HEIGHT
        };
    }

    // return default scale for the default resolution: 1280x720
    // if viewport and contextOptions are undefined
    return {
        scaleX: 1,
        scaleY: 1
    };

}

export async function isLowEndDevice(contextOptions: BrowserContextOptions){
    let lowEndDeviceFound: boolean = false;
        for (const [key, value] of Object.entries(LOW_END_USER_AGENTS)) {
            if(contextOptions.isMobile && contextOptions.userAgent === value 
                && (contextOptions.viewport !== devices['Galaxy Tab S4'].viewport 
                && contextOptions.viewport !== devices['Galaxy Tab S4 landscape'].viewport)) {
                lowEndDeviceFound = true;
                break;
            }
        }
    return lowEndDeviceFound;
}

export async function closeLowEndDevicePopup(page: Page, contextOptions: BrowserContextOptions) {
    const scale = await getWinScale(undefined, contextOptions);

    const result: Coordinates = await getObjPosition(page, 'name', AUTOMATION_OBJS.LOW_END_OKAY_BTN,'worldPosition', TIMEOUT_MS.ONE_SEC);
        await page.mouse.click(
            ((result.x * scale.scaleX) + COORD_OFFSET), 
            ((result.y * scale.scaleY) + COORD_OFFSET)
        );
  }