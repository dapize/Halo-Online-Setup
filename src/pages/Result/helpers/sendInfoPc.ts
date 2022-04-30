import { fetch } from "@tauri-apps/api/http"
import { getPcInfo } from "@utils/getPcInfo";

export const sendInfoPc = async (): Promise<boolean> => {
  const info = await getPcInfo();
  const { ok } = await fetch('http://localhost:8000/hardware', {
    method: 'POST',
    body: {
      payload: info,
      type: 'Json'
    }
  });
  return ok
}
