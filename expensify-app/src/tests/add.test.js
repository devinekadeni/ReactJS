const add = (a, b) => a + b;
const generateGreeting = (name = 'Anonymouse') => `Hello ${name}!`;

test('should add two numbers', () => {
  const result = add(3, 4);
  expect(result).toBe(7)
});

test('should add a name', () => {
  const result = generateGreeting('devin');
  expect(result).toBe('Hello devin!');
})

test('should generate greeting for no name', () => {
  const result = generateGreeting();
  expect(result).toBe('Hello Anonymouse!');
})