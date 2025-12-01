import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import App from '../App';
jest.mock('../api/api');
import * as api from '../api/api';

test('loads and shows bugs and allows create', async () => {
  api.fetchBugs.mockResolvedValue([{ _id: '1', title: 'bug1', description: '', status: 'open' }]);
  api.createBug.mockResolvedValue({ _id: '2', title: 'new bug', description: '', status: 'open' });

  render(<App />);
  await waitFor(() => expect(api.fetchBugs).toHaveBeenCalled());
  expect(screen.getByText('bug1')).toBeInTheDocument();

  fireEvent.change(screen.getByLabelText('Title'), { target: { value: 'new bug' } });
  fireEvent.click(screen.getByText('Report Bug'));
  await waitFor(() => expect(api.createBug).toHaveBeenCalled());
  expect(screen.getByText('new bug')).toBeInTheDocument();
});
