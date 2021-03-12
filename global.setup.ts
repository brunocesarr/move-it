export const mockNotification = (): void => {
  const originalNotification = global.Notification;

  globalThis.Notification = ({
    requestPermission: jest.fn(),
    permission: 'granted',
    ...originalNotification,
  } as unknown) as jest.Mocked<typeof Notification>;
};
