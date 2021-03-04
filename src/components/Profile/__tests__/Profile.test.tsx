import { render, screen } from '@testing-library/react';
import { ChallengesProviderMock } from '../../../__mocks__/ContextsMocks';
import { Profile } from '../Profile';

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

      const imgProfile = screen.getByAltText(/Bruno Cesar/i);
      const nameProfile = screen.getByText(/Bruno César Silva/i);
      const levelProfile = screen.getByText(/Level 0/i);

      expect(imgProfile).toBeInTheDocument();
      expect(nameProfile).toBeInTheDocument();
      expect(levelProfile).toBeInTheDocument();
    });

    test('Render with level', async () => {
      render(ChallengesProviderMock(<Profile />, 2));

      const imgProfile = screen.getByAltText(/Bruno Cesar/i);
      const nameProfile = screen.getByText(/Bruno César Silva/i);
      const levelProfile = screen.getByText(/Level 2/i);

      expect(imgProfile).toBeInTheDocument();
      expect(nameProfile).toBeInTheDocument();
      expect(levelProfile).toBeInTheDocument();
    });
  });
});
