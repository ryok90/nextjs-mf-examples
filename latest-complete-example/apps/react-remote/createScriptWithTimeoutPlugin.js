/*
This plugin ensure that a script will eargerly timeout if a remote is unavailable. With macOS, this is not an issue as a ERR_CONNECTION_REFUSED is
returned within about 20ms but on Windows, it can takes up to 2500ms.
*/

const isDebug = true;

function log(...args) {
    if (isDebug) {
        console.log(...args);
    }
}

export default function () {
    return {
        name: "create-script-with-timeout",
        async beforeRequest(args) {
            console.log("*********beforeRequest", args);

            throw new Error("beforeRequest - timeout");

            return args;
        },
        async errorLoadRemote(args) {
            console.log("*********errorLoadRemote", args);
        },
        createScript({ url }) {
            log(`[create-script-with-timeout] handling ${url}.`);

            const element = document.createElement("script");

            // Adding a timestamp to make sure the remote entry points are never cached.
            // View: https://github.com/module-federation/module-federation-examples/issues/566.
            element.src = `${url}?t=${Date.now()}`;
            element.type = "text/javascript";
            element.async = true;

            // let timeoutId = undefined;

            // element.onload = () => {
            //     log(`[create-script-with-timeout] ${url} has loaded.`);

            //     window.clearTimeout(timeoutId);
            // };

            // element.onerror = (error) => {
            //     log(`[create-script-with-timeout] ${url} failed.`, error);
            // };

            // // Eagerly reject the loading of a script, it's too long when a remote is unavailable.
            // timeoutId = window.setTimeout(() => {
            //     log(`[create-script-with-timeout] ${url} has time-outed.`);

            //     throw new Error(`Remote script "${url}" time-outed.`);
            // }, 500);

            return element;
        }
    }
}