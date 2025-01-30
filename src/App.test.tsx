import { render } from '@testing-library/react';
import App from './App';

test('true is truthy', () => {
  render(<App />);
  expect(true).toBeTruthy();
});
