import { injectable } from "inversify";
import { CONSTANTS } from "../../../utils/constants";
import { DynamoAdapter } from "./dynamo-adapter";
import AWS from "aws-sdk";
import { PromiseResult } from "aws-sdk/lib/request";

export { AWS };

@injectable()
export class DynamoAdapterImpl implements DynamoAdapter {
  private docClient: AWS.DynamoDB.DocumentClient;

  constructor() {
    AWS.config.update({ region: CONSTANTS.REGION });
    this.docClient = new AWS.DynamoDB.DocumentClient({ apiVersion: CONSTANTS.API_VERSION });
  }

  async save(
    dna: string,
    esMutante: boolean,
  ): Promise<PromiseResult<AWS.DynamoDB.DocumentClient.PutItemOutput, AWS.AWSError>> {
    
    const params = {
      TableName: CONSTANTS.TABLE_NAME,
      Item: {
        dna: JSON.stringify(dna),
        esMutante: esMutante,
      },
    };
    return await this.guardarRegistro(params);
  }

  private async guardarRegistro(params: { TableName: string; Item: any }) {
    console.log("params: ", params);
    return await this.docClient
      .put(params, function (err, data) {
        if (err) {
          throw `Unable to add data. Error JSON: ${JSON.stringify(err, null, 2)}`;
        } else {
          return `PutItem succeeded:  ${data}`;
        }
      })
      .promise();
  }
}
