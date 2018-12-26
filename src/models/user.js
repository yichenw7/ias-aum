import { user } from './urls';

const params = {
  'user': 'test',
  'password': 'test',
};
export default [
  {
    key: 'user.login',
    method: 'post',
    url: () => `${user}`,
  },
];
