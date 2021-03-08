// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig =
  process.env.NODE_ENV === 'production'
    ? {
        apiKey: '',
        authDomain: '',
        projectId: '',
        storageBucket: '',
        messagingSenderId: '',
        appId: ''
        measurementId: '',
      }
    : {
        apiKey: '',
        authDomain: 'localhost:9099',
        projectId: '',
        storageBucket: '',
        messagingSenderId: '',
        appId: '',
        measurementId: '',
        databaseURL: 'localhost:8080',
      };

export const httpConfig = {
  baseURL: `http://example.com`,
  timeout: 5000,
  headers: {},
};
