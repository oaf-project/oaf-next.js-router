[![Build Status](https://travis-ci.org/oaf-project/oaf-next.js-router.svg?branch=master)](https://travis-ci.org/oaf-project/oaf-next.js-router)
[![Known Vulnerabilities](https://snyk.io/test/github/oaf-project/oaf-next.js-router/badge.svg?targetFile=package.json)](https://snyk.io/test/github/oaf-project/oaf-next.js-router?targetFile=package.json)
[![Greenkeeper badge](https://badges.greenkeeper.io/oaf-project/oaf-next.js-router.svg)](https://greenkeeper.io/)
[![npm](https://img.shields.io/npm/v/oaf-next.js-router.svg)](https://www.npmjs.com/package/oaf-next.js-router)

[![dependencies Status](https://david-dm.org/oaf-project/oaf-next.js-router/status.svg)](https://david-dm.org/oaf-project/oaf-next.js-router)
[![devDependencies Status](https://david-dm.org/oaf-project/oaf-next.js-router/dev-status.svg)](https://david-dm.org/oaf-project/oaf-next.js-router?type=dev)
[![peerDependencies Status](https://david-dm.org/oaf-project/oaf-next.js-router/peer-status.svg)](https://david-dm.org/oaf-project/oaf-next.js-router?type=peer)

# Oaf Next.js Router
An accessible wrapper for [Next.js](https://github.com/zeit/next.js/)'s router.

## Installation

```sh
# yarn
yarn add oaf-next.js-router

# npm
npm install oaf-next.js-router
```

## Basic Usage

`_app.tsx`:

```diff
import App from "next/app";
+ import { wrapRouter } from "oaf-next.js-router";
import Router from "next/router";

export default class MyApp extends App {
  componentDidMount() {
    ...
+    // We only want to do this on the client, not the server.
+    wrapRouter(Router);
    ...
  }
}
```

## Advanced Usage

```typescript
const settings = {
  announcementsDivId: "announcements",
  primaryFocusTarget: "main h1, [role=main] h1",
  documentTitle: (location: string) => new Promise(resolve => setTimeout(() => resolve(document.title))),
  // BYO localization
  navigationMessage: (title: string, location: string): string => `Navigated to ${title}.`,
  shouldHandleAction: (previousLocation: string, nextLocation: string) => true,
  announcePageNavigation: true,
  setPageTitle: false,
};

wrapRouter(Router, settings);
```
