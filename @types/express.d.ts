
declare module NodeJS {
  // Augment the global namespace
  interface Global {
    // Extend the global namespace with your custom properties
    user: any;
  }
}

declare namespace Express {
    interface Request {
      user?: any; // Assuming User is the type of your user object
    }
  }