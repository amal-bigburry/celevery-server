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
import { TwilioModule } from './modules/OTP/otp.module';
import { DocumentModule } from './modules/documents/documents.module';
import { AnalyticsModule } from './modules/analytics/analytics.module';
import { SellerSupportModule } from './modules/support/support.module';

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
});

@Module({
  imports: [
    // User management
    UserModule,

    // Order management (create, cancel, track orders)
    OrderModule,

    // Cake info management (add, update, retrieve cakes)
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

    // OTP and authentication via Twilio
    TwilioModule,

    // Terms, privacy, and other documents
    DocumentModule,

    // Analytics and reporting
    AnalyticsModule,

    // Seller support and assistance features
    SellerSupportModule,

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
