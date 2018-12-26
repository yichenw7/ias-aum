import './login.less';
import React from 'react';
import { Button, Icon, Input, message } from 'antd';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';
import UserCache from '@caches/UserCache';
import md5 from 'blueimp-md5';
import { QBService } from 'ss-web-start';
import Loading from '@components/loading';
import receive from '@utils/receive';
import action from '../../actions';

class Login extends React.PureComponent {
  state = {
    username: '',
    password: '',
  };

  constructor(props) {
    super(props);
    if (props.title) {
      window.document.title = props.title;
    }
  }

  componentWillMount() {
    // action.emit("user.login",{'user': 'test','password': 'test'})
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.login) {
      console.log(nextProps.login.token)
    }
    receive.call(this,'login',nextProps)
      .success((result) => {
        console.log(111)
        const {history, location} = nextProps;
        console.log(result)
        UserCache.user = result;
        if (location && location.state) {
          history.push(location.state);
        } else {
          history.push('/aum');
        }
      })
      .error(err => (!err && message(err)));
  }

  handleSubmit = () => {
    const {username, password} = this.state;
    if (!username || username === '') {
      message.info('请输入用户名');
      return;
    }
    if (!password || password === '') {
      message.info('请输入密码');
      return;
    }
    UserCache.login({username, password: md5(password)});
  };

  handleChange = (key, value) => {
    this.setState({[key]: value});
  };

  render() {
    const {prefixCls} = this.props;

    return (
      <div className={`${prefixCls}-login`}>
        <div className={`${prefixCls}-login-container`}>
          <Input prefix={<Icon type='user' />}
                 placeholder='Username'
                 onChange={e => this.handleChange('username', e.target.value)}
                 onPressEnter={this.handleSubmit}
          />
          <Input prefix={<Icon type='lock' />}
                 type='password'
                 placeholder='Password'
                 onChange={e => this.handleChange('password', e.target.value)}
                 onPressEnter={this.handleSubmit}
          />
          <Button type='primary'
                htmlType='submit'
                onClick={this.handleSubmit}
          >登录
              {/* <Link to="/aum">登录</Link> */}
          </Button>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  
  return {
    login: state.user.login,
  };
}


export default connect(mapStateToProps)(Login);

