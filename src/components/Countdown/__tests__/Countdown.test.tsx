import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';

import {
  ChallengesProviderMock,
  CountdownProviderMock,
} from '../../../__mocks__/ContextsMocks';
import { Countdown } from '../Countdown';

describe('CountdownComponent', () => {
  describe('Render', () => {
    test('Render default 25 minutes', () => {
      render(CountdownProviderMock(<Countdown />));

      const spanFirstElement = screen.getByText(/2/i);
      const spanSecondElement = screen.getByText(/5/i);
      const secondsElement = screen.getAllByText(/0/i);

      const startCountdownButton = screen.getByText(/Start New Cycle/i);

      expect(spanFirstElement).toBeInTheDocument();
      expect(spanSecondElement).toBeInTheDocument();
      expect(secondsElement).toHaveLength(2);

      expect(startCountdownButton).toBeInTheDocument();
    });
  });

  describe('Events', () => {
    jest.useFakeTimers();
    beforeAll(async () => {
      globalThis.Notification = ({
        requestPermission: jest.fn(),
        permission: 'dennied',
      } as unknown) as jest.Mocked<typeof Notification>;
      window.HTMLMediaElement.prototype.play = jest.fn();
    });
    afterAll(async () => {
      cleanup();
      jest.clearAllTimers();
      jest.clearAllMocks();
    });

    test('Simulate click event start countdown', async () => {
      render(CountdownProviderMock(<Countdown />));

      const startCountdownButton = screen.getByText(/Start New Cycle/i);

      expect(startCountdownButton).toBeInTheDocument();

      fireEvent.click(startCountdownButton);

      await waitFor(() => {
        jest.advanceTimersByTime(1000);

        const spanFirstElement = screen.getByText(/2/i);
        const spanSecondElement = screen.getByText(/4/i);
        const spanThirdElement = screen.getByText(/5/i);
        const spanFourthElement = screen.getByText(/9/i);

        expect(spanFirstElement).toBeInTheDocument();
        expect(spanSecondElement).toBeInTheDocument();
        expect(spanThirdElement).toBeInTheDocument();
        expect(spanFourthElement).toBeInTheDocument();

        const quitCountdownButton = screen.getByText(/Quit Cycle/i);
        expect(quitCountdownButton).toBeInTheDocument();
      });
    });

    test('Simulate click event quit countdown started after 50 seconds', async () => {
      render(CountdownProviderMock(<Countdown />));

      const startCountdownButton = screen.getByText(/Start New Cycle/i);

      expect(startCountdownButton).toBeInTheDocument();

      fireEvent.click(startCountdownButton);

      await waitFor(() => {
        jest.advanceTimersByTime(50000);
        jest.runOnlyPendingTimers();

        const spanFirstElement = screen.getByText(/2/i);
        const spanSecondElement = screen.getByText(/4/i);
        const spanThirdElement = screen.getByText(/1/i);
        const spanFourthElement = screen.getByText(/0/i);

        expect(spanFirstElement).toBeInTheDocument();
        expect(spanSecondElement).toBeInTheDocument();
        expect(spanThirdElement).toBeInTheDocument();
        expect(spanFourthElement).toBeInTheDocument();
      });

      const quitCountdownButton = screen.getByText(/Quit Cycle/i);
      expect(quitCountdownButton).toBeInTheDocument();

      fireEvent.click(quitCountdownButton);

      await waitFor(() => {
        expect(screen.queryByText(/Quit Cycle/i)).toBeNull();
      });
    });

    test('Simulate finisher event countdown started after 25 minutes', async () => {
      render(ChallengesProviderMock(CountdownProviderMock(<Countdown />)));

      const startCountdownButton = screen.getByText(/Start New Cycle/i);

      expect(startCountdownButton).toBeInTheDocument();

      fireEvent.click(startCountdownButton);

      await waitFor(async () => {
        jest.advanceTimersByTime(2500000);
        jest.runOnlyPendingTimers();

        const spansElement = screen.getAllByText(/0/i);
        const finishedCountdownButton = screen.getByText(/Cycle Finished/i);

        expect(spansElement).toHaveLength(4);
        expect(finishedCountdownButton).toBeInTheDocument();
      });
    });
  });
});
