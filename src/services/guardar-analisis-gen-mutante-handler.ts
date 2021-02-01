export interface GuardarAnalisisGenMutanteHandler {
  guardar(dna: string, esMutante: boolean): Promise<any>;
}
