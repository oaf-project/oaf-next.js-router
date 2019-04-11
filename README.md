[![Build Status](https://travis-ci.org/oaf-project/oaf-next.js-router.svg?branch=master)](https://travis-ci.org/oaf-project/oaf-next.js-router)
[![Known Vulnerabilities](https://snyk.io/test/github/oaf-project/oaf-next.js-router/badge.svg?targetFile=package.json)](https://snyk.io/test/github/oaf-project/oaf-next.js-router?targetFile=package.json)
[![Greenkeeper badge](https://badges.greenkeeper.io/oaf-project/oaf-next.js-router.svg)](https://greenkeeper.io/)
[![npm](https://img.shields.io/npm/v/oaf-next.js-router.svg)](https://www.npmjs.com/package/oaf-next.js-router)

# Oaf Next.js Router
An accessible wrapper for [Next.js](https://github.com/zeit/next.js/)'s router.

## Usage

`_app.tsx`:

```typescript
import App from "next/app";
import { wrapRouter } from "oaf-next.js-router";
import Router from "next/router";

export default class MyApp extends App {
  componentDidMount() {
    // We only want to do this on the client, not the server.
    wrapRouter(Router);
  }
}
```
