import { Container } from "inversify";

import { SERVICES } from "./utils/constants";
import { ADAPTERS } from "./utils/constants";
import { GuardarAnalisisGenMutanteController } from "./controllers/guardar-analisis-gen-mutante-controller";
import { GuardarAnalisisGenMutanteImpl } from "./services/guardar-analisis-gen-mutante-impl";
import { DynamoAdapterImpl } from "./adapters/data-bases/dynamo/dynamo-adapter-impl";
import { DynamoAdapter } from "./adapters/data-bases/dynamo/dynamo-adapter";
import { GuardarAnalisisGenMutanteHandler } from "./services/guardar-analisis-gen-mutante-handler";

const AppContainer: Container = new Container();
AppContainer.bind<GuardarAnalisisGenMutanteController>(GuardarAnalisisGenMutanteController).to(
  GuardarAnalisisGenMutanteController,
);
AppContainer.bind<GuardarAnalisisGenMutanteHandler>(SERVICES.ConnectService).to(
  GuardarAnalisisGenMutanteImpl,
);
AppContainer.bind<DynamoAdapter>(ADAPTERS.DynamoAdapter).to(DynamoAdapterImpl);

export { AppContainer };
