import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { ChallengesProviderMock } from '../../../__tests__/__mocks__/ContextsMocks';
import { LevelUpModal } from '../LevelUpModal';

describe('LevelUpModalComponent', () => {
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
      render(ChallengesProviderMock(<LevelUpModal />));

      const congratulationsText = screen.getByText(/Congratulations/i);
      const newLevelMessageText = screen.getByText(
        /You have reached a new level/i,
      );
      const newLevelText = screen.getByText(/1/i);
      const closeModalButton = screen.getByAltText(/Close Modal/i);

      expect(congratulationsText).toBeInTheDocument();
      expect(newLevelMessageText).toBeInTheDocument();
      expect(newLevelText).toBeInTheDocument();
      expect(closeModalButton).toBeInTheDocument();
    });

    test('Render with level', async () => {
      render(ChallengesProviderMock(<LevelUpModal />, 2));

      const congratulationsText = screen.getByText(/Congratulations/i);
      const newLevelMessageText = screen.getByText(
        /You have reached a new level/i,
      );
      const newLevelText = screen.getByText(/2/i);
      const closeModalButton = screen.getByAltText(/Close Modal/i);

      expect(congratulationsText).toBeInTheDocument();
      expect(newLevelMessageText).toBeInTheDocument();
      expect(newLevelText).toBeInTheDocument();
      expect(closeModalButton).toBeInTheDocument();
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

    test('Simulate click event in close button', async () => {
      render(ChallengesProviderMock(<LevelUpModal />));

      const congratulationsText = screen.getByText(/Congratulations/i);
      const newLevelMessageText = screen.getByText(
        /You have reached a new level/i,
      );
      const newLevelText = screen.getByText(/1/i);
      const closeModalButton = screen.getByAltText(/Close Modal/i);

      expect(congratulationsText).toBeInTheDocument();
      expect(newLevelMessageText).toBeInTheDocument();
      expect(newLevelText).toBeInTheDocument();
      expect(closeModalButton).toBeInTheDocument();

      userEvent.click(closeModalButton);

      waitFor(() => {
        expect(congratulationsText).not.toBeInTheDocument();
        expect(newLevelMessageText).not.toBeInTheDocument();
        expect(newLevelText).not.toBeInTheDocument();
        expect(closeModalButton).not.toBeInTheDocument();
      });
    });
  });
});
