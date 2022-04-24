export type TOption = 'cancel' | 'overwrite' | 'other';

export interface IDialogConfirm {
  display: boolean;
  response: ( option: TOption ) => void;
}
