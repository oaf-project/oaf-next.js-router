import { DefaultQuery, RouterProps } from "next/router";
import {
  announce,
  elementFromHash,
  resetFocus,
  Selector,
} from "oaf-side-effects";

// tslint:disable: no-commented-code
// tslint:disable: interface-name
// tslint:disable: no-mixed-interface
// tslint:disable: object-literal-sort-keys
// tslint:disable: no-if-statement
// tslint:disable: no-expression-statement

export interface RouterSettings {
  readonly announcementsDivId: string;
  readonly primaryFocusTarget: Selector;
  readonly documentTitle: (route: string) => Promise<string>;
  readonly navigationMessage: (title: string, route: string) => string;
  readonly shouldHandleAction: (
    previousRoute: string,
    nextRoute: string,
  ) => boolean;
  readonly announcePageNavigation: boolean;
  readonly renderTimeout: number;
}

export const defaultSettings: RouterSettings = {
  announcementsDivId: "announcements",
  primaryFocusTarget: "main h1, [role=main] h1",
  documentTitle: () =>
    new Promise(resolve => setTimeout(() => resolve(document.title))),
  // TODO i18n
  navigationMessage: (title: string): string => `Navigated to ${title}.`,
  shouldHandleAction: () => true,
  announcePageNavigation: true,
  renderTimeout: 0,
};

const resetFocusWithTimeout = (settings: RouterSettings) => {
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
  s?: Partial<RouterSettings>,
): (() => void) => {
  const settings = {
    ...defaultSettings,
    ...s,
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
