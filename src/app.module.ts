/**
 * ******************************************************************************************************
 * AppModule.ts
 * 
 * Main application module for Bigburry Hypersystems LLP platform. It integrates all feature modules such as
 * Users, Orders, Cakes, Notifications, Payments, Stores, OTP, Analytics, and Seller Support.
 * It also sets up MongoDB connection asynchronously using environment variables and initializes Firebase Admin SDK.
 * ******************************************************************************************************
 */
import { Module } from '@nestjs/common';
import { UserModule } from './modules/users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { OrderModule } from './modules/orders/orders.module';
import { CakeModule } from './modules/cakes/cakes.modules';
import { CakeCategoryModule } from './modules/cakecategories/cakecategories.module';
import { NotificationModule } from './modules/Notifications/notification.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import serviceAccount from './firebaseCredentials.json'; // Firebase admin credentials
import * as admin from 'firebase-admin';
import { MqttModule } from './modules/mqtt/mqtt.module';
import { PaymentModule } from './modules/payments/payments.module';
import { StoreModule } from './modules/stores/store.module';
import { DocumentModule } from './modules/documents/documents.module';
import { AnalyticsModule } from './modules/analytics/analytics.module';
import { SellerSupportModule } from './modules/support/support.module';
import { AdvertismentModule } from './modules/Advertisments/advertisment.module';
import { FavouritesModule } from './modules/favourites/favourites.module';
import { OTPModule } from './modules/OTP/otp.module';
// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
});
/**
 * Main module of the applications starts here
 */
@Module({
  imports: [
    // User management
    UserModule,
    // Order management
    OrderModule,
    // Cake management
    CakeModule,
    // MQTT protocol communication
    MqttModule,
    // Cake categories management
    CakeCategoryModule,
    // User notifications (push notifications etc.)
    NotificationModule,
    // Payment processing and management
    PaymentModule,
    // Store management features
    StoreModule,
    // Terms, privacy, and other documents
    DocumentModule,
    // Analytics and reporting
    AnalyticsModule,
    // Seller support and assistance features
    SellerSupportModule,
    // Seller support and assistance features
    AdvertismentModule,
    // Favourites handler
    FavouritesModule ,
    OTPModule,
    // Load environment variables globally
    ConfigModule.forRoot({ isGlobal: true }),
    // MongoDB connection (async with env variables)
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI'),
      }),
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
