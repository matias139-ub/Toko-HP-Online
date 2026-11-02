import LogRocket from "logrocket";

const appId = import.meta.env.VITE_LOGROCKET_APP_ID;

if (appId) {
  LogRocket.init(appId, {
    dom: {
      inputSanitizer: true
    },
    network: {
      requestSanitizer(request) {
        const url = (request.url || "").toLowerCase();
        const headers = { ...(request.headers || {}) };

        for (const key of Object.keys(headers)) {
          if (key.toLowerCase() === "authorization") {
            headers[key] = null;
          }
        }

        const isAuthRequest =
          url.includes("/api/auth/login") ||
          url.includes("/api/auth/register");

        return {
          ...request,
          headers,
          body: isAuthRequest ? null : request.body
        };
      },
      responseSanitizer(response) {
        const url = (response.url || "").toLowerCase();
        const isAuthResponse =
          url.includes("/api/auth/login") ||
          url.includes("/api/auth/register");

        return isAuthResponse
          ? { ...response, body: null }
          : response;
      }
    }
  });
}

export function identifyLogRocketUser(user) {
  if (appId && user?.id) {
    LogRocket.identify(String(user.id));
  }
}