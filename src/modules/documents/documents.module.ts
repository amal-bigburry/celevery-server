/**
 * IMports all the required packages into the system
 */
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtStrategy } from 'src/middlewares/jwt.strategy';
import { DocumentsController } from './infrastructureLayer/controllers/documents.controller';
import { DocumentSchema } from './applicationLayer/repositories/documents.schema';
import { DocumentRepositoryImpl } from './infrastructureLayer/repositories/documentRepository.implimentation';
import { DOCUMENT_REPOSITORY } from './applicationLayer/tokens/documentRepository.token';
import { GET_TC } from './applicationLayer/tokens/gettermsandcondition.token';
import { GET_PP } from './applicationLayer/tokens/getprivacypolicay.token';
import { GetTermsAndConditionsuseCase } from './applicationLayer/use-cases/GetTermsAndConditions.usecase';
import { GetPrivacyAndPolicyUseCase } from './applicationLayer/use-cases/GetPrivacyAndPolicy.usecase';
/**
 * module
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
      provide: DOCUMENT_REPOSITORY, // ✅ token-based provider
      useClass: DocumentRepositoryImpl,
    },
    {
      provide: GET_TC, // ✅ token-based provider
      useClass: DocumentRepositoryImpl,
    },
    {
      provide: GET_PP, // ✅ token-based provider
      useClass: DocumentRepositoryImpl,
    },
  ],
  exports: [],
})
export class DocumentModule {}
