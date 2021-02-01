import { CardAssociationCollectorHandler } from "../../src/services/card-association-collector-handler";
import { CardAssociationCollectorImpl } from "../../src/services/card-association-collector-impl";
import { CONSTANTS } from "../../src/utils/constants";
import * as HttpStatus from "http-status-codes";
import { CardAssociationCollectorRequest } from "../../src/models/card-association-collector-request";

describe("CardAssociationCollectorImpl", () => {
  const dynamoAdapterSpy = jasmine.createSpyObj("DynamoAdapter", ["save"]);
  const saveSpy = dynamoAdapterSpy.save as jasmine.Spy;

  let service: CardAssociationCollectorHandler;

  beforeEach(() => {
    service = new CardAssociationCollectorImpl(dynamoAdapterSpy);
  });

  it("save ok", (done) => {
    saveSpy.and.returnValue(Promise.resolve(null));

    service.save("", new CardAssociationCollectorRequest({ data: "data" })).then((res) => {
      expect(res).toEqual(null);
      done();
    });
  });

  it("save error", (done) => {
    saveSpy.and.returnValue(Promise.reject("ERROR"));

    service.save("", new CardAssociationCollectorRequest({ data: "data" })).catch((err) => {
      expect(err.code).toEqual(CONSTANTS.ERROR_CODE);
      done();
    });
  });
});
