import moment from 'moment';

export default [{
  id: '1',
  description: 'gum',
  note: '',
  amount: 12345,
  createdAt: 0,
}, {
  id: '2',
  description: 'rent',
  note: '',
  amount: 111111,
  createdAt: moment(0).subtract(4, 'days').valueOf(),
}, {
  id: '3',
  description: 'credit',
  note: '',
  amount: 2222,
  createdAt: moment(0).add(4, 'days').valueOf(),
}]