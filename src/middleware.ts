import authConfig from "@/src/auth/auth.config";
import NextAuth from "next-auth";

const { auth } = NextAuth(authConfig);

export default auth;

// auth will block users without a session from reaching the dashboard
export const config = {
  matcher: ["/dashboard", "/dashboard/:path*"],
};
