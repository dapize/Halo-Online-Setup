export type TOption = 'reinit' | 'cancel';

export interface IDialogRelaunch {
  display: boolean;
  response: ( option: TOption ) => void;
}
