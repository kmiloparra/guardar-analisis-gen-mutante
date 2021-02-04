import "reflect-metadata";
import { handler } from "../src/index";
import { GuardarAnalisisGenMutanteController } from "../src/controllers/guardar-analisis-gen-mutante-controller";
import { GuardarAnalisisGenMutanteResponse } from "../src/models/guardar-analisis-gen-mutante-response";

describe("index notification", () => {
  const event = {
    Records: [
      {
        body: JSON.stringify({
          Message: '{"clientId":"101010101","data":"informacion-1"}',
        }),
      },
    ],
  };

  beforeEach(() => {
    
  });

  it("handlre ok", (done) => {
    spyOn(GuardarAnalisisGenMutanteController.prototype, "eventHandler").and.returnValue(
      Promise.resolve({code:200, msm:"test"}),
    );

    handler(event).then((res :any) => {
      console.log("res: ",res);
      expect(res[0].code).toEqual(200);
      done();
    });
  });

  it("handlre fail", (done) => {
    spyOn(GuardarAnalisisGenMutanteController.prototype, "eventHandler").and.returnValue(
      Promise.reject({code:500, msm:"test"}),
    );

    handler(event).catch((res :any) => {
      console.log("res: ",res);
      expect(res[0].code).toEqual(500);
      done();
    });
  });
});
