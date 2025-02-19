import * as Sentry from '@sentry/react';

Sentry.init({
    dsn: 'https://c5ebc83eaa264daf4831da046f47ddce@o4508778682187776.ingest.de.sentry.io/4508778687234128',
    integrations: [
        Sentry.browserTracingIntegration(),
        Sentry.replayIntegration(),
    ],
    tracesSampleRate: 1.0,
    tracePropagationTargets: ['localhost'],
    replaysSessionSampleRate: 1.0,
    replaysOnErrorSampleRate: 1.0,
});
