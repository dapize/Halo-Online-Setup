import { createContext, ReactNode, FC, useState } from "react"
import { IGetPcInfo } from "@utils/getPcInfo";
import { IChecksItems } from "@pages/Welcome/components/Extras";
import { TLanguage } from "@pages/Welcome/components/Language";
import { IMainContext } from './main.d';

export const MainContext = createContext<IMainContext | null>(null);

export const MainProvider: FC<ReactNode> = ( { children }) => {
  const [installationPath, setInstallationPath] = useState<string>('cargando...');
  const [language, setLanguage] = useState<TLanguage>('es');
  const [extraChecks, setExtraChecks] = useState<IChecksItems>({
    menu: true,
    desktop: true,
    hardware: true
  });
  const [pcInfo, setPcInfo] = useState<IGetPcInfo>();

  const value: IMainContext = {
    installationPath,
    setInstallationPath,
    language,
    setLanguage,
    extraChecks,
    setExtraChecks,
    pcInfo,
    setPcInfo
  }

  return (
    <MainContext.Provider value={value}>
      { children }
    </MainContext.Provider>
  )
}
