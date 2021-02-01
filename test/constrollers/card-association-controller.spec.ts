import "reflect-metadata";
import { CardAssociationCollectorController } from "../../src/controllers/card-association-collector-controller";
import { CardAssociationCollectorResponse } from "../../src/models/card-association-collector-service-response";

describe("CardAssociationCollectorController", () => {
  const serviceSpy = jasmine.createSpyObj("CardAssociationCollectorHandler", ["save"]);
  const saveSpy = serviceSpy.save as jasmine.Spy;
  let controller: CardAssociationCollectorController;

  beforeEach(() => {
    controller = new CardAssociationCollectorController(serviceSpy);
  });

  it("should create a controller", () => {
    expect(controller).toBeDefined();
  });

  it("eventHandler ok", (done) => {
    const response = new CardAssociationCollectorResponse("card asociation collector successful");
    const result = Promise.resolve(response);
    saveSpy.and.returnValue(result);
    controller.eventHandler({ data: "data" }).then((data) => {
      expect(data).toEqual(response);
      done();
    });
  });

  it("eventHandler error", (done) => {
    const result = Promise.reject("Connection error");
    saveSpy.and.returnValue(result);
    controller.eventHandler({ data: "data" }).catch((err) => {
      expect(err).toEqual("Connection error");
      done();
    });
  });
});
