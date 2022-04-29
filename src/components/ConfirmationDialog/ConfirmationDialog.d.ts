import { ButtonProps, SxProps } from '@mui/material';
import { TablerIcon } from '@tabler/icons';
import { ReactNode } from 'react';

export interface IButton {
  label: string;
  action: () => void;
  variant?: ButtonProps['variant'];
  sx?: SxProps;
  autoFocus?: boolean;
}

export type TDialog = 'error' | 'warning' | 'info';

export interface TDataByType {
  color: string;
  icon: TablerIcon;
}

export interface IConfirmationDialog {
  title: string;
  buttons: IButton[];
  display: boolean;
  onClose: () => void;
  type: TDialog;
}
