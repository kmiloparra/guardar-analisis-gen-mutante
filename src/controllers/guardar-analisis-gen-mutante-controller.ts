import { injectable, inject } from "inversify";
import { SERVICES, CONSTANTS } from "../utils/constants";
import { GuardarAnalisisGenMutanteResponse } from "../models/guardar-analisis-gen-mutante-response";
import { GuardarAnalisisGenMutanteHandler } from "../services/guardar-analisis-gen-mutante-handler";

@injectable()
export class GuardarAnalisisGenMutanteController {
  constructor(
    @inject(SERVICES.ConnectService)
    private service: GuardarAnalisisGenMutanteHandler,
  ) {}

  public async eventHandler(
    request: any,
  ): Promise<GuardarAnalisisGenMutanteResponse> {
    await this.service.guardar(JSON.parse(request).dna, JSON.parse(request).esMutante);
    return new GuardarAnalisisGenMutanteResponse(200,CONSTANTS.SUCCESSFUL_MESSAGE);
  }
}
