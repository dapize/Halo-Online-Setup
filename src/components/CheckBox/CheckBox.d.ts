export interface ICheckBox {
  value: string;
  label: string;
  checked?: boolean;
  onChange: ( value: string, checked: boolean ) => void;
}
