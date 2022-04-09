import { Dispatch, SetStateAction } from "react";
import { TLanguage } from './../../pages/Welcome/components/Language/Language.d';
import { IChecksItems } from "../../pages/Welcome/components/Extras";

export interface IMainContext {
  installationPath: string;
  setInstallationPath: Dispatch<SetStateAction<string>>;
  language: TLanguage;
  setLanguage: Dispatch<SetStateAction<TLanguage>>;
  checks: IChecksItems;
  setChecks: Dispatch<SetStateAction<IChecksItems>>;
}
