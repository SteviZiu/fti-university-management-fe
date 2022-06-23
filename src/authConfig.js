export const msalConfig = {
    auth: {
      clientId: "80e8215c-d81f-48be-a5fd-bf702d7ffaff",
      authority: "https://login.microsoftonline.com/73744c82-802f-4f14-b3be-a97df0787d17", // This is a URL (e.g. https://login.microsoftonline.com/{your tenant ID})
      redirectUri: "http://localhost:3000/",
    },
    cache: {
      cacheLocation: "sessionStorage", // This configures where your cache will be stored
      storeAuthStateInCookie: false, // Set this to "true" if you are having issues on IE11 or Edge
    }
  };

  // Add scopes here for ID token to be used at Microsoft identity platform endpoints.
  export const loginRequest = {
    //redirectStartPage: "/dashboard",
   scopes: ["User.Read", 'profile' , 'calendars.read']
  };
  
  // Add the endpoints here for Microsoft Graph API services you'd like to use.
  export const graphConfig = {
    graphMeEndpoint: "https://graph.microsoft.com/v1.0/me",
  };