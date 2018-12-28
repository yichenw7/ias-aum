import React from 'react';
import Bundle from 'react-router-bundle';

export default props => (
  <Bundle load={() => import('@containers/aum/index')}>
    {(COM) => <COM {...props} title='AUM' prefixCls='ss' />}
  </Bundle>
)
