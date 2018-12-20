import UserCache from '@caches/UserCache';
import { message } from 'antd';

export const onEffect = async (action, response) => {
  try {
    const body = await response.json();
    action.status = body.status;
    action.loading = false;
    
    action.success = response.status === 200;
    if (response.status === 200) {
      if(action.url.indexOf('aum')){
        action.success = true;
        action.result = body;
      }
      else {
        action.success = false;
        action.error = '服务端异常';
      }
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
      option.headers.userId = UserCache.user.userId;
    }
  }
  return option;
};
