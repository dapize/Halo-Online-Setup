export type TOption = 'cancel' | 'overwrite' | 'other';

export interface IDialogMainFolder {
  display: boolean;
  response: ( option: TOption ) => void;
}
