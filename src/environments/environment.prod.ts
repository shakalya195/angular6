import { AuthServiceConfig, FacebookLoginProvider, GoogleLoginProvider, LinkedinLoginProvider } from "angular-6-social-login";
export const environment = {
  production: true,
  socket_url:'http://localhost:8001/',
  baseUrl:'http://localhost:8001/',  /*local Link*/
  instagram:{
    clientId:'ba6118ee53ed45baa95427da3ce603ac',
    clientSecret:'8e96d16c3e094f7c973b4dc3e6c9e947'
  },
};
export function getAuthServiceConfigs() {
  let config = new AuthServiceConfig(
      [
        {
          id: FacebookLoginProvider.PROVIDER_ID,
          provider: new FacebookLoginProvider("274714200079893")
        },
        {
          id: GoogleLoginProvider.PROVIDER_ID,
          provider: new GoogleLoginProvider("384044908668-688192be3bfkrgg2b23v42gbe8n1eap7.apps.googleusercontent.com")
        },
        {
          id: LinkedinLoginProvider.PROVIDER_ID,
          provider: new LinkedinLoginProvider("1098828800522-m2ig6bieilc3tpqvmlcpdvrpvn86q4ks.apps.googleusercontent.com")
        },
      ]
  );
  return config;
}