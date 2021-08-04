import { BrowserContextOptions, Page, devices, ViewportSize, expect } from '@playwright/test';
import { Coordinates, IsVisibleProperty, ObjProperty, PositionProperty,  WindowScale,  } from "../types";
import { TIMEOUT_MS, DEFAULT_VIEWPORT, LOW_END_USER_AGENTS, COORD_OFFSET, AUTOMATION_OBJS } from "../const_objects";

// looks for an object and asserts that it was found
async function findObj (
    page: Page,
    objProperty: ObjProperty,
    objString: string,
    pageTimeoutMS?: number,
    retries: number = 30,
    returnVal?: boolean
): Promise<void | boolean> {
    let result: string | undefined;
        
    // wait a bit before looking for the object
    if (pageTimeoutMS !== undefined && pageTimeoutMS > 0) {
        await page.waitForTimeout(pageTimeoutMS);
    }

    console.log(`Retries left for '${objString}': ${retries}`);

    try {
        result = await page.evaluate(
            `AUTOMATION.objects.find(
                o => o.${objProperty} === '${objString}'
            ).${objProperty}`
        );
        if(returnVal) {
            return true;
        }
    } catch (error) {
        if (retries > 0) {
            await page.waitForTimeout(TIMEOUT_MS.HALF_SEC);
            return await findObj(page, objProperty, objString, pageTimeoutMS, --retries, returnVal);
        }           
    }          

    if(returnVal) {
        return false;
    } else {
        expect(result).toBeDefined();
    }
}

// returns boolean stating whether or not an object is visible
export async function isObjVisible (
    page: Page,
    objProperty: 'name' | 'text',
    objString: string,
    isVisibleProp: IsVisibleProperty,
    pageTimeoutMS?: number,
    retries: number = 30
): Promise<boolean> {
    const objFound: boolean = await findObj(page, objProperty, objString, pageTimeoutMS, retries, true) as boolean;

    // sometimes a found object is invisible; check for visibility
    if(objFound) {
        return await page.evaluate(
            `AUTOMATION.objects.find(
                (o) => o.${objProperty} === '${objString}'
            ).${isVisibleProp}`
        );
    } else {
        return false;
    }
}

// returns the value of an object's property
export async function getObjProperty (
    page: Page,
    objProperty: ObjProperty,
    objString: string,
    pageTimeoutMS?: number,
    retries: number = 30
): Promise<string> {
    await findObj(page, objProperty, objString, pageTimeoutMS, retries);

    // will only get here if obj is found via findObj
    return await page.evaluate(
        `AUTOMATION.objects.find(
            (o) => o.${objProperty} === '${objString}'
        ).${objProperty}`
    );
}

// returns an object's x and y coordinates
export async function getObjPosition (
    page: Page,
    objProperty: ObjProperty,
    objString: string,
    positionProp?: PositionProperty,
    pageTimeoutMS?: number,
    retries: number = 30
): Promise<Coordinates> {
    await findObj(page, objProperty, objString, pageTimeoutMS, retries);

    // will only get here if obj is found via findObj
    if(objProperty !== 'frame') {
        return await page.evaluate(
            `AUTOMATION.objects.find(
                (o) => o.${objProperty} === '${objString}'
            ).${positionProp}`
        );
    }

    // logic for getting a frame's coordinates are different
    const vertexDataStr: string = 'image.vertexData';

    const vertexDataNum: number[] = await page.evaluate(
        `AUTOMATION.objects.find(
            (o) => o.${objProperty} === '${objString}'
        ).${vertexDataStr}`
    );

    return {
        x: (vertexDataNum[0] + vertexDataNum[4]) / 2,   // (minX + maxX) / 2
        y: (vertexDataNum[1] + vertexDataNum[5]) / 2    // (minY + maxY) / 2
    };

}