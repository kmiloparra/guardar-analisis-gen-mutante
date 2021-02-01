import "reflect-metadata";
import { DynamoAdapter } from "../../../../src/adapters/data-bases/dynamo/dynamo-adapter";
import { DynamoAdapterImpl } from "../../../../src/adapters/data-bases/dynamo/dynamo-adapter-impl";

describe("DynamoDB adapter test", async () => {
  const configSpy = jasmine.createSpyObj("Config", ["get"]);
  const getSpy = configSpy.get as jasmine.Spy;
  let adapter: DynamoAdapter;

  beforeEach(() => {
    getSpy.and.returnValue("algo");
    adapter = new DynamoAdapterImpl(configSpy);
  });

  it("Test save ok", (done) => {
    adapter["kms"]["encrypt"] = (params: any, callback) => {
      return {
        promise: () => new Promise((resolve) => resolve({ CiphertextBlob: "texto cifrado" })),
      };
    };
    adapter["docClient"]["put"] = (params: any, callback) => {
      return { promise: () => new Promise((resolve) => resolve(`PutItem succeeded`)) };
    };
    adapter.save("1234", "1234").then((res) => {
      expect("5678").toEqual("5678");
      done();
    });
  });

  it("Test save error connec dynamodb", (done) => {
    adapter["kms"]["encrypt"] = (params: any, callback) => {
      return {
        promise: () => new Promise((resolve) => resolve({ CiphertextBlob: "texto cifrado" })),
      };
    };
    adapter["docClient"]["put"] = (params: any, callback) => {
      return { promise: () => new Promise((resolve, reject) => reject(`Error`)) };
    };
    adapter.save("1234", "1234").catch((err) => {
      expect(err).toEqual("Error");
      done();
    });
  });
});
