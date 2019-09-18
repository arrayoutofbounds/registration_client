const dev = {
  s3: {
    REGION: "ap-southeast-2",
    BUCKET: "notes-app-2-api-dev-attachmentsbucket-17y3pwqq2bjf"
  },
  apiGateway: {
    REGION: "ap-southeast-2",
    URL: "https://c25g95yuzj.execute-api.ap-southeast-2.amazonaws.com/dev"
  },
  cognito: {
    REGION: "ap-southeast-2",
    USER_POOL_ID: "ap-southeast-2_69IPeidpz",
    APP_CLIENT_ID: "bpakhoibf1qodl530lafvdi2j",
    IDENTITY_POOL_ID: "ap-southeast-2:0d070093-680b-4db9-ac6d-ee6bfbe2ee27"
  }
};

const prod = {
  s3: {
    REGION: "ap-southeast-2",
    BUCKET: "notes-app-2-api-prod-attachmentsbucket-jml4kw5e0itt"
  },
  apiGateway: {
    REGION: "ap-southeast-2",
    URL: "https://2udrwnawji.execute-api.ap-southeast-2.amazonaws.com/prod"
  },
  cognito: {
    REGION: "ap-southeast-2",
    USER_POOL_ID: "ap-southeast-2_oaxep6LyF",
    APP_CLIENT_ID: "77ntskc6c2cjkgenn3djjgjvot",
    IDENTITY_POOL_ID: "ap-southeast-2:ad413222-9c05-4f3b-8168-8b920008373a"
  }
};

// Default to dev if not set
const config = process.env.REACT_APP_STAGE === 'prod'
  ? prod
  : dev;

export default {
  // Add common config values here
  MAX_ATTACHMENT_SIZE: 5000000,
  ...config
};
