import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import type { Provider } from "next-auth/providers"

import { AuthorizeUser, AuthResponse } from "./interfaces";
import { loginAction, refreshTokenAction } from "./actions/auth";




const providers: Provider[] = [
  Credentials({
    id: 'mainCredentials',
    name: 'mainCredentials',
    credentials: {
      email: {}, //email: { label:'Correo', type:'text',  },
      password: {} /// password: {label:'Contrasena', type:'password'}
    },
    authorize: async (credentials) => {
      const { email, password } = credentials as { email: string, password: string };
      const data = await loginAction({ email, password });
      if (data.status >= 400) return null;

      const { accessToken, refreshToken, user } = data.data as AuthResponse;
      const authorizeUser: AuthorizeUser = {
        ...user,
        backendTokens: {
          accessToken,
          refreshToken
        }
      }
      return { data: authorizeUser }

    },
  }),
];



//lista de proveedores sin contar el de credenciales
export const providerMap = providers
  .map((provider) => {
    if (typeof provider === "function") {
      const providerData = provider()
      return { id: providerData.id, name: providerData.name }
    } else {
      return { id: provider.id, name: provider.name }
    }
  })
  .filter((provider) => provider.id !== "mainCredentials")





export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: providers,
  pages: {
    signIn: '/auth/login',
    error: '/auth/login',
    signOut: '/',
  },
  session: {
    strategy: 'jwt',
    maxAge: 60,       //segundos
    updateAge: 10     //segundos
  },


  callbacks: {
    async jwt({ token, user }) {
      // const expired = new Date((token?.exp || 1) * 1000).getTime();   //if(trigger == undefined){}
      if (!user) {
        try {
          const rs = await refreshTokenAction(token.user?.data?.backendTokens?.refreshToken);
          
          const { accessToken, refreshToken, user } = rs.data as AuthResponse;
          const authorizeUser: AuthorizeUser = {
            ...user,
            backendTokens: {
              accessToken,
              refreshToken
            }
          }
          token.user = { data:authorizeUser}
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
          console.error({ error: "ocurrio un error al refrescar Token "})
        }
        return token;
      }


      token.user = user;
      token.email = user?.data.email;
      token.name = user?.data.names
      return token;
    },
    session: ({ session, token}) => {
      //user solo funciona cuando startegy:'database'
      // se accede a traves de `useSession().data.user` or `auth().user`
      session.user = token.user
      return session;
    },
  },


  /*  logger:{
     error: (e)=>{
       new AuthError(e.message+" trace:"+e.stack, { cause: e.cause});
     }
   } */

});
