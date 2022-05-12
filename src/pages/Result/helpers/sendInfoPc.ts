import { fetch } from "@tauri-apps/api/http"
import { getPcInfo, IGetPcInfo } from "@utils/getPcInfo";

export const sendInfoPc = async ( data: IGetPcInfo | undefined ): Promise<boolean> => {
  const info = data || await getPcInfo();
  const { ok } = await fetch(`${process.env.REACT_APP_API}/hardware`, {
    method: 'POST',
    body: {
      payload: info,
      type: 'Json'
    }
  });
  return ok
}
