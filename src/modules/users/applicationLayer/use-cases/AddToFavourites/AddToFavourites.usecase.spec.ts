import { USER_REPOSITORY } from 'src/modules/users/tokens/userRepository.token';
import { UserRepository } from '../../interfaces/user.interface';
import { AddToFavouritesUsecase } from './AddToFavourites.usecase';

describe('AddToFavouritesUsecase', () => {
  let usecase: AddToFavouritesUsecase;
  let mockUserRepository: jest.Mocked<UserRepository>;

  beforeEach(() => {
    mockUserRepository = {
      addFavourite: jest.fn(),
      // ...include other UserRepository methods if needed
    } as unknown as jest.Mocked<UserRepository>;

    usecase = new AddToFavouritesUsecase(mockUserRepository);
  });

  it('should call addFavourite with correct parameters', async () => {
    mockUserRepository.addFavourite.mockResolvedValue('Success');

    const result = await usecase.execute('user123', 'cake456');

    expect(mockUserRepository.addFavourite).toHaveBeenCalledWith('user123', 'cake456');
    expect(result).toBe('Success');
  });

  it('should propagate errors from the repository', async () => {
    mockUserRepository.addFavourite.mockRejectedValue(new Error('DB error'));

    await expect(usecase.execute('user123', 'cake456')).rejects.toThrow('DB error');
  });
});
