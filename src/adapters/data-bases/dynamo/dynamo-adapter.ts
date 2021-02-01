import { PromiseResult } from "aws-sdk/lib/request";

export interface DynamoAdapter {
  save(
    dna: string,
    esMutante: boolean,
  ): Promise<PromiseResult<AWS.DynamoDB.DocumentClient.PutItemOutput, AWS.AWSError>>;
}
