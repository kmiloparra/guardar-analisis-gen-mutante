export const ADAPTERS = {
  DynamoAdapter: Symbol.for("DynamoAdapter"),
};

export const SERVICES = {
  ConnectService: Symbol.for("ConnectionService"),
  DisconnectService: Symbol.for("DisconnectionService"),
};


export const CONSTANTS = {
  EMPTY: "",
  OK: "OK",
  REGION: "us-east-2",
  API_VERSION: "2012-08-10",
  SUCCESSFUL_MESSAGE: "Registro guardado de manera exitosa",
  ERROR_MESSAGE: "El registro NO fue almacenado",
  ERROR_CODE: "001",
  

  TABLE_NAME: "registro-gen",
  INDEX_NAME: "index-name",
  DOMAIN_NAME: "domain-name",
  STAGE: "stage",
};
