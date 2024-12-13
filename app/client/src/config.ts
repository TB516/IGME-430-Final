const SERVER_URL = import.meta.env.PROD ? 'https://igme-430-final-app-server-320ae5ec9b58.herokuapp.com' : 'http://localhost:3001';
const API_URL = import.meta.env.PROD ? 'https://igme-430-final-api-4431d83a3c44.herokuapp.com' : 'http://localhost:3000';

export { SERVER_URL, API_URL }