// src/math/math.service.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { AddToFavouritesUsecase } from './AddToFavourites.usecase';
import { HttpStatus } from '@nestjs/common';

describe('AddToFavourites', () => {
  let service: AddToFavouritesUsecase;



  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AddToFavouritesUsecase],
    }).compile();

    service = module.get<AddToFavouritesUsecase>(AddToFavouritesUsecase);
  });

  let testuser = {
    user_id:'68345b47bc76a1e7e6621c2c',
    cake_id:"6836b1fdc8f13f7a4f82bd41"
  }

  it('should add cake to favourites', () => {
    expect(service.execute(testuser.user_id, testuser.cake_id)).toBe(HttpStatus.CREATED)
    // expect(service.add(2, 3)).toBe(5);
  });
});
