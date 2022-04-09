import { createContext, ReactNode, FC, useState } from "react"
import { IChecksItems } from "../../pages/Welcome/components/Extras";
import { TLanguage } from "../../pages/Welcome/components/Language";
import { IMainContext } from './main.d';

export const MainContext = createContext<IMainContext | null>(null);

export const MainProvider: FC<ReactNode> = ( { children }) => {
  const [installationPath, setInstallationPath] = useState<string>('loading...');
  const [language, setLanguage] = useState<TLanguage>('es');
  const [checks, setChecks] = useState<IChecksItems>({
    menu: true,
    desktop: true,
    hardware: true
  });

  const value: IMainContext = {
    installationPath,
    setInstallationPath,
    language,
    setLanguage,
    checks,
    setChecks
  }

  return (
    <MainContext.Provider value={value}>
      { children }
    </MainContext.Provider>
  )
}
