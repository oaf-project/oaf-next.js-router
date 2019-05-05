import { DefaultQuery, RouterProps } from "next/router";
import {
  createOafRouter,
  defaultSettings as oafRoutingDefaultSettings,
  RouterSettings,
} from "oaf-routing";

// tslint:disable-next-line: no-commented-code
// tslint:disable: no-expression-statement
// tslint:disable: object-literal-sort-keys
// tslint:disable: no-object-mutation

export { RouterSettings } from "oaf-routing";

export const defaultSettings: RouterSettings<string> = {
  ...oafRoutingDefaultSettings,
  // TODO use `history` to track route IDs and action (POP vs PUSH vs REPLACE)?
  restorePageStateOnPop: false,
  // We're not restoring page state ourselves so leave this enabled.
  disableAutoScrollRestoration: false,
};

export const wrapRouter = <Q = DefaultQuery>(
  router: RouterProps<Q>,
  settingsOverrides?: Partial<RouterSettings<string>>,
): (() => void) => {
  const settings = {
    ...defaultSettings,
    ...settingsOverrides,
  };

  const oafRouter = createOafRouter(settings, url => {
    // TODO https://caniuse.com/#feat=url
    // return new URL(url).hash;
    const a = document.createElement("a");
    a.href = url;
    return a.hash;
  });

  oafRouter.handleFirstPageLoad(router.route);

  // tslint:disable-next-line: no-let
  let previousRoute: string = router.route;

  const handleLocationChanged = (url: string) => {
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

  return () => {
    router.events.off("routeChangeComplete", handleLocationChanged);
    router.events.off("hashChangeComplete", handleLocationChanged);
  };
};
