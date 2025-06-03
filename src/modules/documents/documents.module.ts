/**
 * © Bigburry Hypersystems LLP. All rights reserved.
 * This source code is confidential and intended only for internal use.
 * Unauthorized copying, modification, distribution, or disclosure is prohibited.
 */
/**
 * Imports all the required packages into the system
 */
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtStrategy } from 'src/middlewares/jwt.strategy';
import { DocumentsController } from './infrastructureLayer/controllers/documents.controller';
import { DocumentSchema } from './infrastructureLayer/models/documents.schema';
import { DocumentRepositoryImpl } from './infrastructureLayer/implimentations/documentRepository.implimentation';
import { DOCUMENT_REPOSITORY } from './tokens/documentRepository.token';
import { GET_TC } from './tokens/gettermsandcondition.token';
import { GET_PP } from './tokens/getprivacypolicay.token';
import { GetTermsAndConditionsuseCase } from './applicationLayer/use-cases/GetTermsAndConditions.usecase';
import { GetPrivacyAndPolicyUseCase } from './applicationLayer/use-cases/GetPrivacyAndPolicy.usecase';
/**
 * module definition for document handling
 */
@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Documents', schema: DocumentSchema }]),
  ],
  controllers: [DocumentsController],
  providers: [
    JwtStrategy,
    GetTermsAndConditionsuseCase,
    GetPrivacyAndPolicyUseCase,
    {
      provide: DOCUMENT_REPOSITORY,
      useClass: DocumentRepositoryImpl,
    },
    {
      provide: GET_TC,
      useClass: DocumentRepositoryImpl,
    },
    {
      provide: GET_PP,
      useClass: DocumentRepositoryImpl,
    },
  ],
  exports: [],
})
export class DocumentModule {}
