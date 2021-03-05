import { render, screen } from '@testing-library/react';
import { ChallengesProviderMock } from '../../../__mocks__/ContextsMocks';
import { CompleteChallenges } from '../CompleteChallenges';

describe('CompleteChallengesComponent', () => {
  describe('Render', () => {
    beforeAll(async () => {
      globalThis.Notification = ({
        requestPermission: jest.fn(),
        permission: 'dennied',
      } as unknown) as jest.Mocked<typeof Notification>;
    });
    test('Render default', () => {
      render(ChallengesProviderMock(<CompleteChallenges />));

      const spanChallengesCompletedText = screen.getByText(
        /Challenges completed/i,
      );
      const spanChallengesCompletedNumberText = screen.getByText(/0/i);

      expect(spanChallengesCompletedText).toBeInTheDocument();
      expect(spanChallengesCompletedNumberText).toBeInTheDocument();
    });

    test('Render with challenges completed', () => {
      render(ChallengesProviderMock(<CompleteChallenges />, 0, 0, 5));

      const spanChallengesCompletedText = screen.getByText(
        /Challenges completed/i,
      );
      const spanChallengesCompletedNumberText = screen.getByText(/5/i);

      expect(spanChallengesCompletedText).toBeInTheDocument();
      expect(spanChallengesCompletedNumberText).toBeInTheDocument();
    });
  });
});
