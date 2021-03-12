import { render, screen } from '@testing-library/react';
import { ChallengesProviderMock } from '../../../__mocks__/ContextsMocks';
import { ChallengeBox } from '../ChallengeBox';

describe('ChallengeBoxComponent', () => {
  describe('Render', () => {
    beforeAll(async () => {
      globalThis.Notification = ({
        requestPermission: jest.fn(),
        permission: 'granted',
      } as unknown) as jest.Mocked<typeof Notification>;
    });
    test('Render default', () => {
      render(ChallengesProviderMock(<ChallengeBox />));

      const titleChallengeBoxText = screen.getByText(
        /Finish a cycle to receive a challenge/i,
      );
      const descriptionChallengeBoxText = screen.getByText(
        /Go to the next level by completing challenges./i,
      );

      expect(titleChallengeBoxText).toBeInTheDocument();
      expect(descriptionChallengeBoxText).toBeInTheDocument();
    });
  });
});
