import { DefaultQuery, RouterProps } from "next/router";
import {
  createOafRouter,
  defaultSettings as oafRoutingDefaultSettings,
  RouterSettings,
} from "oaf-routing";

// tslint:disable: no-expression-statement

export { RouterSettings } from "oaf-routing";

export const defaultSettings: RouterSettings<string> = {
  ...oafRoutingDefaultSettings,
  // TODO use `history` to track route IDs?
  restorePageStateOnPop: false
};

export const wrapRouter = <Q = DefaultQuery>(
  router: RouterProps<Q>,
  settingsOverrides?: Partial<RouterSettings<string>>,
): (() => void) => {
  const settings = {
    ...defaultSettings,
    ...settingsOverrides,
  };

  const oafRouter = createOafRouter(
    settings,
    // TODO get hash from url param instead
    () => location.hash,
    // TODO use `history` to track route IDs?
    () => "initial",
  );

  oafRouter.handleFirstPageLoad(router.route);

  // tslint:disable-next-line: no-let
  let previousRoute: string = router.route;

  const handleLocationChanged = (url: string) => {
    oafRouter.handleLocationChanged(previousRoute, url);
    previousRoute = url;
  };

  router.events.on("routeChangeComplete", handleLocationChanged);
  router.events.on("hashChangeComplete", handleLocationChanged);

  return () => {
    router.events.off("routeChangeComplete", handleLocationChanged);
    router.events.off("hashChangeComplete", handleLocationChanged);
  };
};
