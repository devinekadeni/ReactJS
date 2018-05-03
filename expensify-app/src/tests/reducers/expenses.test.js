import expensesReducer from '../../reducers/expenses';
import expenses from '../fixtures/expenses';

test('should set default state', () => {
  const state = expensesReducer(undefined, { type: '@@INIT' });
  expect(state).toEqual([]);
});

test('should remove expense by id', () => {
  const action = {
    type: 'REMOVE_EXPENSE',
    id: expenses[1].id
  };
  const state = expensesReducer(expenses, action);
  expect(state).toEqual([ expenses[0], expenses[2]]);
});

test('should not remove if id not found', () => {
  const action = {
    type: 'REMOVE_EXPENSE',
    id: '-1',
  };
  const state = expensesReducer(expenses, action);
  expect(state).toEqual(expenses);
});

test('should add an expense', () => {
  const expense = {
    id: '123',
    description: 'hello',
    note: '',
    createdAt: 2000,
    amount: 12345,
  }
  const action = {
    type: 'ADD_EXPENSE',
    expense
  }
  const state = expensesReducer(expenses, action);
  expect(state).toEqual([...expenses, expense]);
})

test('should edit an expense', () => {
  const action = { 
    type: 'EDIT_EXPENSE',
    id: expenses[1].id,
    updates: { amount: 123 },
  };
  const state = expensesReducer(expenses, action);
  expect(state[1].amount).toBe(123);
});

test('should edit an expense if id not found', () => {
  const action = { 
    type: 'EDIT_EXPENSE',
    id: '-1',
    updates: { amount: 123 },
  };
  const state = expensesReducer(expenses, action);
  expect(state).toEqual(expenses);
});