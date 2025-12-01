import { render, screen, fireEvent } from '@testing-library/react';
import BugForm from '../components/BugForm';

test('shows validation error when title empty', async () => {
  const mockCreate = jest.fn().mockResolvedValue({});
  render(<BugForm onCreated={mockCreate} />);
  fireEvent.submit(screen.getByRole('form', { name: /bug-form/i }) || screen.getByLabelText('bug-form'));
  // fallback: query by button
  fireEvent.click(screen.getByText('Report Bug'));
  expect(screen.getByRole('alert')).toHaveTextContent('Title required');
});
