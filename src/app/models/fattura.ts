//import { Cliente } from "./cliente";
import { Stato } from "./stato";

export interface Fattura {
  id: number;
  data: string;
  numero: number;
  anno: number;
  importo: number;
  stato: Stato;
  cliente: any;
}
