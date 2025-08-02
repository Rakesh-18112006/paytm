import NextAuth from "next-auth"

declare module "next-auth" {
    interface User {
        id: string;
        username: string;
        mobile: string;
    }
  interface Session {
    user: {
      id: string;
      username: string;
      mobile: string;
    }
  }
}
declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    username: string;
    mobile: string;
  }
}