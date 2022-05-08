import { generateUUID } from '../uuid';

test('can run test', () => {
  expect(generateUUID()).toBeDefined();
});
