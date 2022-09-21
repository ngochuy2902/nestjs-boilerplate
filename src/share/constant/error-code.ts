export const ErrorCode = {
  // Common
  BAD_REQUEST: 'NEST-400',
  UNAUTHORIZED: 'NEST-401',
  FORBIDDEN: 'NEST-403',
  NOT_FOUND: 'NEST-404',
  INTERNAL_SERVER_ERROR: 'NEST-500',

  // Validator exception error code (Default: NEST-1xxx)
  USER_ALREADY_EXIST: 'NEST-1001',
  WRONG_PASSWORD: 'NEST-1002',
  INVALID_REFRESH_TOKEN: 'NEST-1003',

  // Object not found exception (Default: NEST-4xxx)
  USER_NOT_FOUND: 'NEST-4001',
};
