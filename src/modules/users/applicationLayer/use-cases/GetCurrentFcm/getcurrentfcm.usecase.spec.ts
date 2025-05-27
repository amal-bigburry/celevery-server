import { UserRepository } from '../../interfaces/user.interface';
import { Getcurrentfcmusecase } from './getcurrentfcm.usecase';

describe('Getcurrentfcmusecase', () => {
  let usecase: Getcurrentfcmusecase;
  let mockUserRepo: jest.Mocked<UserRepository>;

  beforeEach(() => {
    mockUserRepo = {
      getfcm: jest.fn(),
      // add other methods if required
    } as unknown as jest.Mocked<UserRepository>;

    usecase = new Getcurrentfcmusecase(mockUserRepo);
  });

  it('should return the correct FCM token for a user ID', async () => {
    mockUserRepo.getfcm.mockResolvedValue('fcm_token_123');

    const result = await usecase.execute('user_id_abc');

    expect(mockUserRepo.getfcm).toHaveBeenCalledWith('user_id_abc');
    expect(result).toBe('fcm_token_123');
  });

  it('should propagate errors from the repository', async () => {
    mockUserRepo.getfcm.mockRejectedValue(new Error('Repository error'));

    await expect(usecase.execute('user_id_abc')).rejects.toThrow('Repository error');
  });
});
