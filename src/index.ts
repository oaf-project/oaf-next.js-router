/* eslint-disable functional/functional-parameters */
/* eslint-disable functional/no-let */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable functional/no-expression-statement */
/* eslint-disable functional/no-return-void */

import { SingletonRouter } from "next/router";
import {
  createOafRouter,
  defaultSettings as oafRoutingDefaultSettings,
  RouterSettings,
} from "oaf-routing";

export { RouterSettings } from "oaf-routing";

export const defaultSettings: RouterSettings<string> = {
  ...oafRoutingDefaultSettings,
  // TODO use `history` to track route IDs and action (POP vs PUSH vs REPLACE)?
  restorePageStateOnPop: false,
  // We're not restoring page state ourselves so leave this enabled.
  disableAutoScrollRestoration: false,
};

export const wrapRouter = (
  router: SingletonRouter,
  settingsOverrides?: Partial<RouterSettings<string>>,
): (() => void) => {
  const settings = {
    ...defaultSettings,
    ...settingsOverrides,
  };

  const oafRouter = createOafRouter(settings, (url) => {
    // TODO https://caniuse.com/#feat=url
    // return new URL(url).hash;
    // eslint-disable-next-line no-restricted-globals
    const a = document.createElement("a");
    // eslint-disable-next-line functional/no-expression-statement, functional/immutable-data
    a.href = url;
    return a.hash;
  });

  oafRouter.handleFirstPageLoad(router.route);

  let previousRoute: string = router.route;

  const handleLocationChanged = (url: string): void => {
    // TODO use `history` to track route IDs and action (POP vs PUSH vs REPLACE)?
    const currentLocationKey = undefined;
    const action = undefined;
    oafRouter.handleLocationChanged(
      previousRoute,
      url,
      currentLocationKey,
      action,
    );
    previousRoute = url;
  };

  router.events.on("routeChangeComplete", handleLocationChanged);
  router.events.on("hashChangeComplete", handleLocationChanged);

  return (): void => {
    router.events.off("routeChangeComplete", handleLocationChanged);
    router.events.off("hashChangeComplete", handleLocationChanged);
  };
};
