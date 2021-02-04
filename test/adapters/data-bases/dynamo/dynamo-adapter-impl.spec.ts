  import "reflect-metadata";
  import { DynamoAdapter } from "../../../../src/adapters/data-bases/dynamo/dynamo-adapter";
  import { DynamoAdapterImpl } from "../../../../src/adapters/data-bases/dynamo/dynamo-adapter-impl";

  describe("DynamoDB adapter test", async () => {
    
    let adapter: DynamoAdapter;

    beforeEach(() => {
      adapter = new DynamoAdapterImpl();
    });

    it("Test save ok", (done) => {
     
      adapter["docClient"]["put"] = (params: any, callback) => {
        return { promise: () => new Promise((resolve) => resolve(`PutItem succeeded`)) };
      };
      let msm ="PutItem succeeded";
      adapter.save("dna", true).then((res) => {
        expect(msm).toEqual(res.toString().substring(0,msm.length));
        done();
      });
    });

    it("Test save error connec dynamodb", (done) => {
      
      adapter["docClient"]["put"] = (params: any, callback) => {
        return { promise: () => new Promise((resolve, reject) => reject(`Error`)) };
      };
      adapter.save("dna", true).catch((err) => {
        console.log("err; ",err);
        expect(err).toEqual("Error");
        done();
      });
    });
  });
