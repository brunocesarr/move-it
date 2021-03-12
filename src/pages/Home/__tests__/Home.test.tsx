import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { ChallengesProviderMock } from '../../../__mocks__/ContextsMocks';
import Home from '../Home';

describe('HomePage', () => {
  describe('Render', () => {
    beforeAll(async () => {
      globalThis.Notification = ({
        requestPermission: jest.fn(),
        permission: 'dennied',
      } as unknown) as jest.Mocked<typeof Notification>;
    });
    afterAll(() => {
      jest.restoreAllMocks();
    });

    test('Render default', () => {
      render(
        ChallengesProviderMock(
          <Home level={1} currentExperience={0} challengesCompleted={0} />,
        ),
      );

      const spanChallengesCompletedText = screen.getByText(
        /Challenges completed/i,
      );
      const boxChallenges = screen.getByText(
        /Finish a cycle to receive a challenge/i,
      );
      const startNewCycleButton = screen.getByText(/Start New Cycle/i);

      expect(spanChallengesCompletedText).toBeInTheDocument();
      expect(boxChallenges).toBeInTheDocument();
      expect(startNewCycleButton).toBeInTheDocument();
    });
  });

  describe('Challenges Events', () => {
    jest.useFakeTimers();
    beforeAll(async () => {
      globalThis.Notification = ({
        requestPermission: jest.fn(),
        permission: 'dennied',
      } as unknown) as jest.Mocked<typeof Notification>;
      window.HTMLMediaElement.prototype.play = jest.fn();
    });
    afterAll(() => {
      jest.clearAllTimers();
      jest.restoreAllMocks();
    });

    test('Complete success challenge', async () => {
      render(
        ChallengesProviderMock(
          <Home level={1} currentExperience={0} challengesCompleted={0} />,
        ),
      );
      const startNewCycleButton = screen.getByText(/Start New Cycle/i);
      fireEvent.click(startNewCycleButton);

      await waitFor(async () => {
        jest.advanceTimersByTime(2500000);

        expect(screen.getByText(/Challenges completed/i)).toBeInTheDocument();
        expect(screen.getByText(/Cycle Finished/i)).toBeInTheDocument();
        expect(screen.getByText(/New Challenge/i)).toBeInTheDocument();
      });

      const succeededButton = screen.getByText(/Succeeded/i);
      expect(succeededButton).toBeInTheDocument();

      fireEvent.click(succeededButton);

      await waitFor(() => {
        expect(screen.queryByText(/Succeeded/i)).toBeNull();

        expect(
          screen.getByText(/Finish a cycle to receive a challenge/i),
        ).toBeInTheDocument();
        expect(screen.getByText(/Start New Cycle/i)).toBeInTheDocument();
      });
    });

    test('Complete failed challenge', async () => {
      render(
        ChallengesProviderMock(
          <Home level={1} currentExperience={0} challengesCompleted={0} />,
        ),
      );
      const startNewCycleButton = screen.getByText(/Start New Cycle/i);
      fireEvent.click(startNewCycleButton);

      await waitFor(async () => {
        jest.advanceTimersByTime(2500000);

        expect(screen.getByText(/Challenges completed/i)).toBeInTheDocument();
        expect(screen.getByText(/Cycle Finished/i)).toBeInTheDocument();
        expect(screen.getByText(/New Challenge/i)).toBeInTheDocument();
      });

      const succeededButton = screen.getByText(/Failed/i);
      expect(succeededButton).toBeInTheDocument();

      fireEvent.click(succeededButton);

      await waitFor(() => {
        expect(screen.queryByText(/Succeeded/i)).toBeNull();

        expect(
          screen.getByText(/Finish a cycle to receive a challenge/i),
        ).toBeInTheDocument();
        expect(screen.getByText(/Start New Cycle/i)).toBeInTheDocument();
      });
    });
  });
});
