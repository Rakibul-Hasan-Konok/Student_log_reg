export const PORT = process.env.PORT || 5050;
export const DATABASE = process.env.DATABASE || 'your_mongodb_connection_string';
export const JWT_KEY = process.env.JWT_KEY || 'your_jwt_secret_key';
export const JWT_EXPIRE_TIME = 30 * 24 * 60 * 60; // 30 days
export const MAX_JSON_SIZE = '10MB';
export const URL_ENCODE = true;
export const REQUEST_TIME = 20 * 60 * 1000; // 20 minutes
export const REQUEST_NUMBER = 2000; // limit requests
