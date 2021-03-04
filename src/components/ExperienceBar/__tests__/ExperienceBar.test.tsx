import { render, screen } from '@testing-library/react';

import { ChallengesProviderMock } from '../../../__mocks__/ContextsMocks';
import { ExperienceBar } from '../ExperienceBar';

describe('ExperienceBarComponent', () => {
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

    test('Render without currentExperience', async () => {
      render(ChallengesProviderMock(<ExperienceBar />));

      const currentExperienceElement = screen.getByLabelText(/0 xp/i);
      const experienceToNextLevelElement = screen.getByText(/16 xp/i);

      expect(currentExperienceElement).toBeInTheDocument();
      expect(currentExperienceElement).toHaveStyle('left: 0%');

      expect(experienceToNextLevelElement).toBeInTheDocument();
    });

    test('Render with currentExperience', async () => {
      render(ChallengesProviderMock(<ExperienceBar />, 0, 8));

      const currentExperienceElement = screen.getByText(/8 xp/i);
      const experienceToNextLevelElement = screen.getByText(/8 xp/i);

      expect(currentExperienceElement).toBeInTheDocument();
      expect(currentExperienceElement).toHaveStyle('left: 50%');

      expect(experienceToNextLevelElement).toBeInTheDocument();
    });
  });
});
