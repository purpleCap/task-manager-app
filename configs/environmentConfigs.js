const dev = {
    API_ENDPOINT_URL: 'http://10.0.2.2:8080',
  };
  
  
  const getEnv = () => {
    switch (process.env.REACT_APP_ENV) {
      case 'dev':
        return dev;
    //   case 'prod':
    //     return prod;
    //   case 'stag':
    //     return stag;
      default:
        return dev;
    }
  };
  
  // eslint-disable-next-line import/prefer-default-export
  export const env = getEnv();