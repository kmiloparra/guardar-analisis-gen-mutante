import "reflect-metadata";
import { AppContainer } from "./inversify.config";
import { GuardarAnalisisGenMutanteController } from "./controllers/guardar-analisis-gen-mutante-controller";

let controller: GuardarAnalisisGenMutanteController;

export async function handler(event: any) {

  controller =
    controller ||
    AppContainer.get<GuardarAnalisisGenMutanteController>(GuardarAnalisisGenMutanteController);

  const promises = [];
  event.Records.forEach((record) => {
    const { body } = record;
    promises.push(controller.eventHandler(body));
  });
  const notificationErrors = [];
  return Promise.all(
    promises.map((promise) =>
      promise.catch((e) => {
        notificationErrors.push(e);
      }),
    ),
  ).then((result) => {
    if (notificationErrors.length) {
      throw notificationErrors;
    }
    
    return result;
  });
}
