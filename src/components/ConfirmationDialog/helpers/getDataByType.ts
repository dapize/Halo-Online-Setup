import { IconAlertCircle, IconAlertTriangle, IconAlertOctagon } from '@tabler/icons';
import { TDataByType, TDialog } from '../ConfirmationDialog.d';

export const getDataByType = (type: TDialog): TDataByType => {
  switch (type) {
    case 'error':
      return {
        color: '#f6274a',
        icon: IconAlertTriangle
      }

    case 'warning':
      return {
        color: '#fc0',
        icon: IconAlertOctagon
      }

    case 'info':
      return {
        color: '#009EFF',
        icon: IconAlertCircle
      }
  }
}
