import { Dispatch, SetStateAction } from "react";
import { TLanguage } from '@pages/Welcome/components/Language';
import { IChecksItems } from "@pages/Welcome/components/Extras";
import { IGetPcInfo } from "@utils/getPcInfo";

export interface IMainContext {
  installationPath: string;
  setInstallationPath: Dispatch<SetStateAction<string>>;
  language: TLanguage;
  setLanguage: Dispatch<SetStateAction<TLanguage>>;
  extraChecks: IChecksItems;
  setExtraChecks: Dispatch<SetStateAction<IChecksItems>>;
  pcInfo: IGetPcInfo | undefined;
  setPcInfo: Dispatch<SetStateAction<IGetPcInfo|undefined>>;
}
