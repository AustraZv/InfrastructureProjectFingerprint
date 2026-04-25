import { process as processHar } from "trackhar";

globalThis.TrackHAR = {
  process: processHar
};

globalThis.processHar = processHar;