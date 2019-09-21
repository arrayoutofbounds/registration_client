const dev = {
  apiGateway: {
    REGION: "ap-southeast-2",
    URL: "https://u42qnebxb3.execute-api.ap-southeast-2.amazonaws.com/dev"
  },
  cognito: {
    REGION: "ap-southeast-2",
    USER_POOL_ID: "ap-southeast-2_Mf2N0bSyY",
    APP_CLIENT_ID: "5ucm36rqrg4s74jedc6vp9iem9",
    IDENTITY_POOL_ID: "ap-southeast-2:f547e26e-9f06-40bd-932e-53830c9b37e1"
  }
};

const prod = {

};

// const prod = {
//   apiGateway: {
//     REGION: "ap-southeast-2",
//     URL: "https://2udrwnawji.execute-api.ap-southeast-2.amazonaws.com/prod"
//   },
//   cognito: {
//     REGION: "ap-southeast-2",
//     USER_POOL_ID: "ap-southeast-2_oaxep6LyF",
//     APP_CLIENT_ID: "77ntskc6c2cjkgenn3djjgjvot",
//     IDENTITY_POOL_ID: "ap-southeast-2:ad413222-9c05-4f3b-8168-8b920008373a"
//   }
// };

// Default to dev if not set
const config = process.env.REACT_APP_STAGE === 'prod'
  ? dev
  : dev;

export default {
  // Add common config values here
  ...config
};
