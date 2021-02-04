import "reflect-metadata";
import { GuardarAnalisisGenMutanteHandler } from "../../src/services/guardar-analisis-gen-mutante-handler";
import { GuardarAnalisisGenMutanteImpl } from "../../src/services/guardar-analisis-gen-mutante-impl";
import { CONSTANTS } from '../../src/utils/constants';

describe("GuardarAnalisisGenMutanteImpl", () => {
  const dynamoAdapterSpy = jasmine.createSpyObj("DynamoAdapter", ["save"]);
  const saveSpy = dynamoAdapterSpy.save as jasmine.Spy;

  let service: GuardarAnalisisGenMutanteHandler;

  beforeEach(() => {
    service = new GuardarAnalisisGenMutanteImpl(dynamoAdapterSpy);
  });

  it("save ok", (done) => {
    saveSpy.and.returnValue(Promise.resolve(null));

    service.guardar("", true).then((res) => {
      expect(res).toEqual(null);
      done();
    });
  });

  it("save error", (done) => {
    saveSpy.and.returnValue(Promise.reject("ERROR"));

    service.guardar("", true).then((err) => {
      expect(err.code).toEqual(CONSTANTS.ERROR_CODE);
      done();
    });
  });
});
