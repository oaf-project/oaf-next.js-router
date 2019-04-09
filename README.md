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
