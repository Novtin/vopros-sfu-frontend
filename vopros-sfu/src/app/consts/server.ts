const SERVER_URL = import.meta.env.VITE_SERVER_URL;

const API_VERSION = 'v1';

const API_PREFIX = 'api';

const BASE_API_URL = `${SERVER_URL}/${API_PREFIX}/${API_VERSION}`;

export { SERVER_URL, BASE_API_URL, API_VERSION, API_PREFIX };
