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

export interface IGetPcInfo {
  cpu: string;
  arc: string;
  disks: IDisk[];
  monitor: IMonitor | null;
  os: string;
  osType: string;
  osVersion: string;
  ram: number;
  video: IVideoCard;
}
