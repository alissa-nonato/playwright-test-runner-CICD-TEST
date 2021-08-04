export type Coordinates = {
  x: number;
  y: number;
};

export type ObjProperty = 'key' | 'name' | 'text' | 'frame';

export type IsVisibleProperty = 'visible' | 'worldVisible' | 
  'textObject.visible' | 'textObject.worldVisible';

export type PositionProperty = 'position' | 'worldPosition' | 'worldGamePosition';

export type WindowScale = {
  scaleX: number;
  scaleY: number;
}