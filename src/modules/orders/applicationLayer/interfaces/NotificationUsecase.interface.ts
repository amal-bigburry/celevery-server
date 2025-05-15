export interface INotificationUseCase {
  execute({title, message, token}): Promise<string>;
}