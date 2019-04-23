import { DefaultQuery, RouterProps } from "next/router";
import { defaultSettings, RouterSettings } from "oaf-routing";
import { announce, elementFromHash, resetFocus } from "oaf-side-effects";

// tslint:disable: no-if-statement
// tslint:disable: no-expression-statement

export { defaultSettings, RouterSettings } from "oaf-routing";

const resetFocusWithTimeout = (settings: RouterSettings<string, void>) => {
  setTimeout(() => {
    resetFocus(
      settings.primaryFocusTarget,
      // TODO: get hash from url param instead
      elementFromHash(location.hash),
    );
  }, settings.renderTimeout);
};

export const wrapRouter = <Q = DefaultQuery>(
  router: RouterProps<Q>,
  settingsOverrides?: Partial<RouterSettings<string, void>>,
): (() => void) => {
  const settings = {
    ...defaultSettings,
    ...settingsOverrides,
  };

  // tslint:disable-next-line: no-let
  let previousRoute: string = router.route;

  const handleRouteChangeComplete = async (url: string): Promise<void> => {
    if (settings.shouldHandleAction(previousRoute, url)) {
      resetFocusWithTimeout(settings);

      if (settings.announcePageNavigation) {
        const title = await settings.documentTitle(url);
        announce(
          settings.navigationMessage(title, url),
          settings.announcementsDivId,
        );
      }
    }

    previousRoute = url;
  };

  const handleHashChangeComplete = (url: string) => {
    if (settings.shouldHandleAction(previousRoute, url)) {
      resetFocusWithTimeout(settings);
    }

    previousRoute = url;
  };

  router.events.on("routeChangeComplete", handleRouteChangeComplete);
  router.events.on("hashChangeComplete", handleHashChangeComplete);

  return () => {
    router.events.off("routeChangeComplete", handleRouteChangeComplete);
    router.events.off("hashChangeComplete", handleHashChangeComplete);
  };
};
