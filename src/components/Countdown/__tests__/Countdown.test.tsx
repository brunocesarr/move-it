import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import { CountdownProviderMock } from '../../../__mocks__/ContextsMocks';
import { Countdown } from '../Countdown';

describe('CountdownComponent', () => {
  describe('Render', () => {
    test('Render default 25:00', () => {
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
    afterAll(() => {
      jest.clearAllTimers();
    });

    test('Simulate click event start countdown', () => {
      render(CountdownProviderMock(<Countdown />));

      const startCountdownButton = screen.getByText(/Start New Cycle/i);

      expect(startCountdownButton).toBeInTheDocument();

      fireEvent.click(startCountdownButton);

      waitFor(() => {
        expect(startCountdownButton).not.toBeInTheDocument();

        const quitCountdownButton = screen.getByText(/Quit Cycle/i);
        expect(quitCountdownButton).toBeInTheDocument();
      });
    });
  });
});
