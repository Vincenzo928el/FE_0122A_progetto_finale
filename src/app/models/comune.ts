import { Provincia } from "./provincia";

export interface Comune {
  id: number,
  nome: string,
  provincia: Provincia
}
