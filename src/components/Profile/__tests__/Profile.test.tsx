import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ChallengesProviderMock } from '../../../__tests__/__mocks__/ContextsMocks';
import { Profile } from '../Profile';
import client from 'next-auth/client';
jest.mock('next-auth/client');

describe('ProfileComponent', () => {
  describe('Render', () => {
    beforeAll(() => {
      globalThis.Notification = ({
        requestPermission: jest.fn(),
        permission: 'granted',
      } as unknown) as jest.Mocked<typeof Notification>;
    });

    afterAll(() => {
      jest.clearAllMocks();
    });

    test('Render without level', async () => {
      render(ChallengesProviderMock(<Profile />));

      const imgProfile = screen.getByAltText(/Teste/i);
      const nameProfile = screen.getByText(/Teste/i);
      const levelProfile = screen.getByText(/Level 1/i);

      expect(imgProfile).toBeInTheDocument();
      expect(nameProfile).toBeInTheDocument();
      expect(levelProfile).toBeInTheDocument();
    });

    test('Render with level', async () => {
      render(ChallengesProviderMock(<Profile />, 2));

      const imgProfile = screen.getByAltText(/Teste/i);
      const nameProfile = screen.getByText(/Teste/i);
      const levelProfile = screen.getByText(/Level 2/i);

      expect(imgProfile).toBeInTheDocument();
      expect(nameProfile).toBeInTheDocument();
      expect(levelProfile).toBeInTheDocument();
    });
  });

  describe('Events', () => {
    beforeAll(() => {
      globalThis.Notification = ({
        requestPermission: jest.fn(),
        permission: 'granted',
      } as unknown) as jest.Mocked<typeof Notification>;
    });

    afterAll(() => {
      jest.clearAllMocks();
    });

    test('Clicks signOut Button', async () => {
      render(ChallengesProviderMock(<Profile />));

      const imgProfile = screen.getByAltText(/Teste/i);
      const nameProfile = screen.getByText(/Teste/i);
      const singOut = screen.getByText(/SingOut/i);

      expect(imgProfile).toBeInTheDocument();
      expect(nameProfile).toBeInTheDocument();
      expect(singOut).toBeInTheDocument();

      (client.signOut as jest.Mock).mockReturnValueOnce([{}, false]);
      userEvent.click(singOut);

      await waitFor(() => {
        expect(screen.queryByAltText(/Teste/i)).toBeNull();
        expect(screen.queryByText(/Teste/i)).toBeNull();
      });
    });
  });
});
