import { arch, platform, type, version } from "@tauri-apps/api/os"

export const getPcInfo = async () => {
  const cpuArc = await arch();
  const so = await platform();
  const soType = await type();
  const soVersion = await version();

  return {
    arc: cpuArc,
    so,
    type: soType,
    version: soVersion
  }
}
