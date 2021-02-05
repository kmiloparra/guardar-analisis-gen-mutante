import "reflect-metadata";
import { GuardarAnalisisGenMutanteController } from "../../src/controllers/guardar-analisis-gen-mutante-controller";
import { GuardarAnalisisGenMutanteResponse } from "../../src/models/guardar-analisis-gen-mutante-response";

describe("GuardarAnalisisGenMutanteController", () => {
  const serviceSpy = jasmine.createSpyObj("GuardarAnalisisGenMutanteHandler", ["guardar"]);
  const saveSpy = serviceSpy.guardar as jasmine.Spy;
  let controller: GuardarAnalisisGenMutanteController;

  beforeEach(() => {
    controller = new GuardarAnalisisGenMutanteController(serviceSpy);
  });

  it("should create a controller", () => {
    expect(controller).toBeDefined();
  });

  it("eventHandler ok", (done) => {
    const response = new GuardarAnalisisGenMutanteResponse(200,"Registro guardado de manera exitosa");
    const result = Promise.resolve(response);
    
    saveSpy.and.returnValue(result);

    controller.eventHandler(JSON.stringify({ dna: "",esMutante:"true" })).then((data) => {
      expect(data).toEqual(response);
      done();
    });
  });

  it("eventHandler error", (done) => {
    const result = Promise.reject("Connection error");
    saveSpy.and.returnValue(result);
    controller.eventHandler(JSON.stringify({ dna: "",esMutante:"true" })).catch((err) => {
      expect(err).toEqual("Connection error");
      done();
    });
  });
});
