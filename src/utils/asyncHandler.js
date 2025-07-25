/**
 * Async handler utility to wrap async functions and automatically catch errors
 * @param {Function} fn - The async function to wrap
 * @returns {Function} - Express middleware function
 */
export const asyncHandler = (fn) => {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

export default asyncHandler;
