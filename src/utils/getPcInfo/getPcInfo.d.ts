export interface IDisk {
  letter: string;
  type: number;
  size: number;
  free: number;
}

export interface IMonitor {
  scaleFactor: number;
  height: number;
  width: number;
}

export interface IVideoCard {
  vram: number;
  name: string;
}
