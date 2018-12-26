import UserCache from '@caches/UserCache';
import { message } from 'antd';

export const onEffect = async (action, response) => {
  try {
    const body = await response.json();
    action.status = response.status;
    action.loading = false;

    action.success = response.status === 200;
    if (response.status === 200) {
      action.success = true;
      action.result = body;
    } else {
      action.success = false;
      action.error = '服务端异常';
    }
  } catch (err) {
    message.error(err.message);
    action.success = false;
    action.error = '服务端异常';
  }
  return action;
}

export const onFetchOption = (option, item) => {
  if (item.key !== 'user.login') {
    if (UserCache.user) {
      option.headers = option.headers || {};
      option.headers.Authorization = UserCache.user.token;
    }
  }
  return option;
};
