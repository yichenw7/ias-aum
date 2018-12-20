import { aum30,aum7,mau,wau } from './urls';

export default [
  {
    key: 'aum.aum30',
    method: 'get',
    url: () => `${aum30}`,
  },
  {
    key: 'aum.aum7',
    method: 'get',
    url: () => `${aum7}`,
  },
  {
    key: 'aum.mau',
    method: 'get',
    url: () => `${mau}`,
  },
  {
    key: 'aum.wau',
    method: 'get',
    url: () => `${wau}`,
  },
  

  
];
