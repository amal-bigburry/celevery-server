/**
 * © Bigburry Hypersystems LLP. All rights reserved.
 * This source code is confidential and intended only for internal use.
 * Unauthorized copying, modification, distribution, or disclosure is prohibited.
 */
/**
 * importing the required packages
 */
import { Module } from '@nestjs/common';
import { GeneratorController } from './infrastructureLayer/controllers/generator.controller';
import { GenerateUuidUseCase } from './applicationLayer/usecases/generator.usercase';
/**
 * module definition for mqtt handling
 */
@Module({
  imports: [],
  controllers: [GeneratorController],
  providers: [GenerateUuidUseCase],
  exports: [],
})
export class GeneratorModule {}
