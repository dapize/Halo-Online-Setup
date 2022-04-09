import { RefObject } from "react";

export interface IMenuSelectItem {
  label: string;
  value: string;
}

export interface IMenuSelect {
  display: boolean;
  anchorRef: RefObject<HTMLButtonElement>;
  onClose: (item?: IMenuSelectItem) => void
  items: IMenuSelectItem[];
  value: IMenuSelectItem['value'];
}
