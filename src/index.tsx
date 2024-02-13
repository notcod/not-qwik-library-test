import { createQwikCity } from "@builder.io/qwik-city/middleware/node";
import qwikCityPlan from "@qwik-city-plan";
import { renderToStream, type RenderToStreamOptions } from "@builder.io/qwik/server";
import { manifest } from "@qwik-client-manifest";
import { component$ } from "@builder.io/qwik";
import { QwikCityProvider, RouterOutlet } from "@builder.io/qwik-city";

export const Root = component$(() => {
    return (
        <QwikCityProvider>
            <head>
                <meta charSet="utf-8" />
            </head>
            <body lang="en">
                <RouterOutlet />
            </body>
        </QwikCityProvider>
    );
});

export function render(opts: RenderToStreamOptions) {
    return renderToStream(<Root />, {
        manifest,
        ...opts,
        containerAttributes: {
            lang: "en-us",
            ...opts.containerAttributes,
        },
    });
}
export default render;

export const { router } = createQwikCity({ render, qwikCityPlan, manifest });
