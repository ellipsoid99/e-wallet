declare global {
  namespace NodeJS {
    interface ProcessEnv {
      GITHUB_AUTH_TOKEN: string;
      NODE_ENV: "development" | "production";
      NEXTAUTH_API_URL: "http://localhost:4000";
      API_URL: "http://localhost:4000";
      REACT_APP_BASE_URL: "http://localhost:4000";
      PORT?: string;
      PWD: string;
    }
  }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {};
