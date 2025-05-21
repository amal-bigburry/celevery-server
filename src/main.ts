/**
 * @fileoverview This is the main entry point of the application using the NestJS framework.
 * The bootstrap function is defined as an asynchronous function to initialize and start the server.
 * Environment variables are loaded using the dotenv package for configuration management.
 * The NestFactory creates an application instance from the AppModule which is the root module of the application.
 * Global validation pipes are applied to ensure data validation and transformation automatically on incoming requests.
 * The application listens on a port specified in the environment variable PORT, defaulting to 3000 if not provided.
 * This setup enables a robust and scalable server configuration for handling HTTP requests.
 * 
 * Company: BigBurry HyperSystems LLP
 */

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as dotenv from 'dotenv';

/**
 * The bootstrap function serves as the asynchronous entry point of the Cake Factory application.
 * It performs the following major operations:
 * - Loads environment variables securely using dotenv configuration.
 * - Creates an application instance leveraging NestFactory with the root AppModule.
 * - Configures global pipes with validation rules ensuring security and data integrity.
 * - Starts the HTTP server on the designated port to accept incoming requests.
 * This approach follows best practices for initializing a NestJS application with validation and environment management.
 * 
 * Company: BigBurry HyperSystems LLP
 */
async function bootstrap() {
  dotenv.config();
  const app = await NestFactory.create(AppModule);
    // Enable CORS
  app.enableCors({
    origin: '*', // <-- frontend origin
    // credentials: true,               // <-- allow cookies / auth headers
  });

  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  await app.listen(process.env.PORT ?? 3000);
}

/**
 * Invokes the bootstrap function to initialize the Cake Factory backend service.
 * This marks the starting point for the entire application's lifecycle.
 * Proper error handling and logging would typically be added here in a full implementation.
 * 
 * Company: BigBurry HyperSystems LLP
 */
bootstrap();
