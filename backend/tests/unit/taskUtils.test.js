// Example unit test for a utility function
function formatTaskTitle(title) {
  return title.trim().toUpperCase();
}

test('formatTaskTitle trims and uppercases the title', () => {
  expect(formatTaskTitle('  hello world  ')).toBe('HELLO WORLD');
}); 