import type { Middleware } from '@reduxjs/toolkit';

const rtkErrorLogger: Middleware = () => (next) => (action: any) => {
  if ('error' in action && action.error) {
    // TODO: dispatch snackbar/alert
    console.error('RTK Error:', action.error);
  }
  return next(action);
};
export default rtkErrorLogger;
