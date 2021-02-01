import { injectable, inject } from "inversify";
import { ADAPTERS, CONSTANTS } from "../utils/constants";
import { DynamoAdapter } from "../adapters/data-bases/dynamo/dynamo-adapter";
import { GuardarAnalisisGenMutanteHandler } from "./guardar-analisis-gen-mutante-handler";

@injectable()
export class GuardarAnalisisGenMutanteImpl implements GuardarAnalisisGenMutanteHandler {
  constructor(@inject(ADAPTERS.DynamoAdapter) private dynamoAdapter: DynamoAdapter) {}

  public async guardar(dna: string, esMutante: boolean): Promise<any> {
    try {
      return await this.dynamoAdapter.save(dna, esMutante);
    } catch (err) {
      console.error("Error: ", err);
        return {
          code: CONSTANTS.ERROR_CODE,
          message: CONSTANTS.ERROR_MESSAGE,
        }
    }
  }
}
