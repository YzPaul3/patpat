import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  publicRoutes: ["/", "/api/webhook/clerk"], // A list of routes that should be accessible without authentication
  ignoredRoutes: ["/api/webhook/clerk"], // A list of routes that should be ignored by the middleware
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
