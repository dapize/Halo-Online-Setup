export interface IDisk {
  label: string;
  type: number;
  size: number;
  free: number;
}

export interface IMonitor {
  scaleFactor: number;
  height: number;
  width: number;
}
