import axios from 'axios';
import './commands';

before(() => {
  axios.defaults.baseURL = 'https://app.template.com';
});
