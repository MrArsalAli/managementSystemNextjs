import connectDB from "@/lib/connectDB";
import { UserModal } from "@/lib/modals/UserModal";
import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

async function handleLogin(obj) {
  await connectDB();
  const user = await UserModal.findOne({ email: obj.email });
  if (user) {
    return user;
  } else {
    let newUser = await UserModal(obj);
    newUser = await newUser.save();
    return newUser;
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  
providers: [
  Providers.Google({
    clientId: process.env.AUTH_GOOGLE_ID,
    clientSecret: process.env.AUTH_GOOGLE_SECRET,
    authorization: {
      params: {
        redirect_uri: process.env.BASE_URL + "/api/auth/callback/google",
      },
    },
  }),
],
  callbacks: {
    async signIn({ account, profile }) {
      if (account.provider === "google") {
        let obj = {
          firstName: profile.given_name,
          lastName: profile.family_name,
          email: profile.email,
          picture: profile.picture,
        };
        const user = await handleLogin(obj);
        return {user};
      }
    },
    async jwt({ token }) {
      const user = await handleLogin({ email: token.email });
      token.role = user.role;
      token._id = user._id;
      return token;
    },
    session({ session, token }) {
      session.user._id = token._id;
      session.user.role = token.role;
      // console.log("session==> ",session)
      return session;
    },
  },
});
