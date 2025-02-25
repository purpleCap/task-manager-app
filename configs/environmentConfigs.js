import {REACT_APP_ENV} from '@env';

const dev = {
    API_ENDPOINT_URL: 'http://10.0.2.2:8080',
  };
const prod = {
    API_ENDPOINT_URL: 'https://task-manager-s3f3.onrender.com',
  };
  
  console.log("ENV  ", REACT_APP_ENV);
  const getEnv = () => {
    switch (REACT_APP_ENV) {
      case 'dev':
        return dev;
      case 'prod':
        return prod;
      default:
        return dev;
    }
  };
  
  // eslint-disable-next-line import/prefer-default-export
  export const env = getEnv();