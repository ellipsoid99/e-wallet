import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export default NextAuth({
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Username", type: "text" },
                password: { label: "Password", type: "password" },
            },
            authorize: async (credentials: any) => {
                const payload = {
                    email: credentials.email,
                    password: credentials.password,
                };
                const AuthAPIUrl: string = `${process.env.NEXTAUTH_API_URL}/login`;
                const res = await fetch(AuthAPIUrl, {
                    method: "POST",
                    body: JSON.stringify(payload),
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

                const user = await res.json();
                // If no error and we have user data, return it
                if (res.ok && user) {
                    user.email = credentials.email;
                    return user;
                }

                if (!res.ok) {
                    return null;
                }
                return null;
            },
        }),
    ],
    secret: process.env.JWT_SECRET,
    pages: {
        signIn: "/login",
        error: "/login",
    },
    callbacks: {
        jwt: ({ token, user }) => {
            if (user) {
                token.id = user.user;
                token.user = user;
            }
            return token;
        },
        session: ({ session, token }) => {
            if (token) {
                const tokenData: any = token.user;
                session.id = token.id;
                session.accessToken = tokenData.data.access;
                session.refreshToken = tokenData.data.refresh;
            }

            return session;
        },
    },
    theme: {
        colorScheme: "auto", // "auto" | "dark" | "light"
        brandColor: "", // Hex color code #33FF5D
        logo: "/vercel.svg", // Absolute URL to image
    },
    // Enable debug messages in the console if you are having problems
    debug: process.env.NODE_ENV === "development",
});
