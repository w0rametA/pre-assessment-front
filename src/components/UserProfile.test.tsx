import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import UserProfile from './UserProfile';


jest.mock('global', () => ({
  fetch: jest.fn()
}), { virtual: true });

const mockFetch = fetch as jest.MockedFunction<typeof fetch>;

describe('UserProfile Component', () => {
  beforeEach(() => {
    mockFetch.mockClear();
  });

  test('should show loading state initially', () => {
    render(<UserProfile userId="123" />);
    
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  test('data display when fetch success', async () => {

    const userData = {
      name: 'Test Name',
      email: 'test@email.com'
    };

    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => userData
    } as Response);

    render(<UserProfile userId="123" />);
    
    await waitFor(() => {
      expect(screen.getByText('Test Name')).toBeInTheDocument();
    });
    

    expect(screen.getByText('Email: test@email.com')).toBeInTheDocument();
    
    expect(mockFetch).toHaveBeenCalledWith('https://api.example.com/users/123');
  });

  test('should show error message when fetch fails', async () => {
    mockFetch.mockRejectedValueOnce(new Error('Failed to fetch user data'));

    render(<UserProfile userId="123" />);
    

    await waitFor(() => {
      expect(screen.getByText('Error: Failed to fetch user data')).toBeInTheDocument();
    });
  });
});