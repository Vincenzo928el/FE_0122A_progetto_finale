import { Comune } from "./comune";

export interface Cliente {
  id : number;
  ragioneSociale: string;
  partitaIva: string;
  tipoCliente: string;
  email: string;
  pec: string;
  telefono: string;
  nomeContatto: string;
  cognomeContatto: string;
  telefonoContatto: string;
  emailContatto: string;

  indirizzoSedeOperativa: {
    id: number,
    via: string,
    civico: string,
    cap: string,
    localita: string,
    comune: Comune
  };

  indirizzoSedeLegale: {
    id: number,
    via: string,
    civico: string,
    cap: string,
    localita: string,
    comune: Comune
  };

  dataInserimento: string,
  dataUltimoContatto: string,
  fatturatoAnnuale: number
}
