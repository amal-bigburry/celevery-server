import { UserRepository } from '../interfaces/user.interface';
import { CakeEntity } from 'src/modules/cakes/domainLayer/entities/cake.entity';
import { CakeVariant } from 'src/modules/cakes/infrastructureLayer/models/cake.schema';
import { GetMyFavouritesUsecase } from './GetMyFavourites.usecase';

describe('GetMyFavouritesUsecase', () => {
  let usecase: GetMyFavouritesUsecase;
  let mockUserRepository: jest.Mocked<UserRepository>;

  beforeEach(() => {
    mockUserRepository = {
      getFavourite: jest.fn(),
    } as unknown as jest.Mocked<UserRepository>;

    usecase = new GetMyFavouritesUsecase(mockUserRepository);
  });

  it('should return a list of CakeEntity objects', async () => {
    const mockVariants: CakeVariant[] = [
      {
        preparation_time: 45,
        weight: 500,
        cake_mrp: 400,
        cake_price: 350,
      },
    ];

    const mockCakes: CakeEntity[] = [
      new CakeEntity(
        'cake1',
        'Strawberry Delight',
        'Fresh strawberry layers',
        ['strawberry.jpg'],
        'Fruit-based cakes',
        mockVariants,
        'store123',
        ['cat-fruit', 'cat-dessert'],
        4.8
      ),
    ];

    mockUserRepository.getFavourite.mockResolvedValue(mockCakes);

    const result = await usecase.execute('user123');

    expect(mockUserRepository.getFavourite).toHaveBeenCalledWith('user123');
    expect(result).toEqual(mockCakes);
  });

  it('should throw if the repository throws', async () => {
    mockUserRepository.getFavourite.mockRejectedValue(new Error('Database failed'));

    await expect(usecase.execute('user123')).rejects.toThrow('Database failed');
  });
});
