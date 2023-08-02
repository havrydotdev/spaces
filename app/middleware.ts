import { withAuth } from "next-auth/middleware";

const publicFileRegex = /\.(.*)$/;
const anonymousRoutes = ["/notes"]; // The whitelisted routes

export default withAuth({
  callbacks: {
    authorized: ({ req }) => {
      const { pathname } = req.nextUrl;

      // Important! The below only checks if there exists a token. The token is not validated! This means
      // unauthenticated users can set a next-auth.session-token cookie and appear authorized to this
      // middleware. This is not a big deal because we do validate this cookie in the backend and load
      // data based off of its value. This middleware simply redirects unauthenticated users to the login
      // page (and sets a callbackUrl) for all routes, except static files, api routes, Next.js internals,
      // and the whitelisted anonymousRoutes above.
      return Boolean(
        req.cookies.get("next-auth.session-token") || // check if there's a token
          pathname.startsWith("/_next") || // exclude Next.js internals
          pathname.startsWith("/api") || //  exclude all API routes
          pathname.startsWith("/static") || // exclude static files
          publicFileRegex.test(pathname) || // exclude all files in the public folder
          anonymousRoutes.includes(pathname)
      );
    },
  },
  // If you have custom pages like I do, these should be whitelisted!
  pages: {
    error: "/auth/error",
    signIn: "/login",
    verifyRequest: "/auth/verify-request",
  },
});
