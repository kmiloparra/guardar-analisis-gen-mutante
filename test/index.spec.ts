import "reflect-metadata";
import { handler } from "../src/index";
import { ConfigServer } from "@avaldigitallabs/bocc-ahorro-lib-commons";
import { CardAssociationCollectorController } from "../src/controllers/card-association-collector-controller";
import { CardAssociationCollectorResponse } from "../src/models/card-association-collector-service-response";
import { ResponseEntity } from "@avaldigitallabs/bocc-ahorro-lib-service-handler-resolver";
import { AppContainer } from "../src/inversify.config";

describe("index notification", () => {
  const configSpy = jasmine.createSpyObj("Config", ["get"]);
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
    spyOn(ConfigServer.prototype, "getParameters").and.returnValue(Promise.resolve(configSpy));
  });

  it("handlre ok", (done) => {
    spyOn(CardAssociationCollectorController.prototype, "eventHandler").and.returnValue(
      Promise.resolve(new CardAssociationCollectorResponse("test")),
    );

    handler(event).then((res: ResponseEntity) => {
      expect(res.statusCode).toEqual(200);
      done();
    });
  });
});
