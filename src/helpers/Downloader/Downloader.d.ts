export interface IFile {
  url: string;
  path: string[];
}

export type TFnProgress = ( percentage: number ) => void;
export type TFnFinish = ( error: unknown ) => void;
export type TFnError = ( error: unknown | null ) => void;

export interface ISubscribersObj {
  progress: TFnProgress[];
  finish: TFnFinish[];
  error: TFnError[];
}

export interface ISubscriber {
  type: 'progress' | 'finish' | 'error';
  cb: TFnProgress | TFnFinish | TFnError;
}

