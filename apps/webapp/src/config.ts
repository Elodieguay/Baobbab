const defaultPort = import.meta.env.VITE_API_PORT || '5000';
const defaultUrl = `http://localhost:${defaultPort}`;

export const config = {
    apiUrl: import.meta.env.VITE_API_URL || defaultUrl,
};
