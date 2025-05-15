/**
 * Importing all the required packages
 */
import { Module } from '@nestjs/common';
import { UserModule } from './modules/users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { OrderModule } from './modules/orders/orders.module';
import { CakeModule } from './modules/cakes/cakes.modules';
import { CakeCategoryModule } from './modules/cakecategories/cakecategories.module';
import { NotificationModule } from './modules/Notifications/notification.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import serviceAccount from './firebaseCredentials.json'; // correct relative path
import * as admin from 'firebase-admin';
import { MqttModule } from './modules/mqtt/mqtt.module';
import { PaymentModule } from './modules/payments/payments.module';
import { StoreModule } from './modules/stores/store.module';
import { TwilioModule } from './modules/OTP/otp.module';
import { DocumentModule } from './modules/documents/documents.module';
import { AnalyticsModule } from './modules/analytics/analytics.module';

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
});

// AppModule
@Module({
  imports: [
    /**
     * User Module Handles all the user related queries
     */
    UserModule,
    /**
     * Order Module Handles all order related things like creating order, canceling and so on.
     */
    OrderModule,
    /**
     * Cake Module handles cake related quarires like , get cake info, add cake and others.
     */
    CakeModule,
    /**
     * Mqtt Module that helps to communicate data using mqtt protocol
     */
    MqttModule,
    /**
     * Cake Category Module that helps to manage category in the application
     */
    CakeCategoryModule,
    /**
     * Helps to Notify the users, Makes it easy to manage notifications like push notification
     */
    NotificationModule,
    /**
     * Handles all the payment related things. And Manage all payment related queries
     */
    PaymentModule,
    /**
     * MAnages all Store related things
     */
    StoreModule,
    /**
     * Handles OTP related Functinalities for authentication of users into our application
     */
    TwilioModule,
    /**
     * Handles terms and conditioon , privacy policay and other documents
     */
    DocumentModule,
    /**
     * Handle analytics related queries 
     */
    AnalyticsModule,
    /**
     * Enable Environmentable varialble in the application
     */
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    /**
     * Connected MongoDB Database to the application
     */
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI'), // ✅ read from .env
      }),
    }),
  ],
  controllers: [],
  providers: [],
})

// Export AppModule
export class AppModule {}
