import { supabase } from "@utils/supabase";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.NEXT_GOOGLE_CLIENT_ID,
      clientSecret: process.env.NEXT_GOOGLE_SECRET,
    }),
  ],
  callbacks: {
    async session({ session }) {
      let res = await supabase
        .from("users")
        .select()
        .eq("email", session?.user.email)
        .single();
      session.user.id = res.data.id;
      return session;
    },
    async signIn({ profile }) {
      try {
        let res = await supabase
          .from("users")
          .select()
          .eq("email", profile.email)
          .single();

        if (res.data) {
          return true;
        } else {
          res = await supabase
            .from("users")
            .insert({
              username: generateUsername("", 3, 12),
              email: profile.email,
              name: profile.name,
            })
            .select();
        }
      } catch (error) {
        console.log(`error\n`);
        console.log(error);
        return false;
      }
    },
  },
};

export const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
