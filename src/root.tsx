import { component$ } from "@builder.io/qwik";
import { QwikCityProvider, RouterOutlet } from "@builder.io/qwik-city";

export default component$(() => {
    return (
        <QwikCityProvider>
            <head>
                <meta charSet="utf-8" />
                <link rel="manifest" href="/manifest.json" />
            </head>
            <body lang="en">
                <RouterOutlet />
            </body>
        </QwikCityProvider>
    );
});
