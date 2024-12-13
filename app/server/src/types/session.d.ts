/* eslint-disable no-unused-vars */
import 'express-session';

// Adds account data to session
declare module 'express-session' {
  interface SessionData {
    account : {
      username?: string;
      isAdmin?: boolean;
    }
  }
}
