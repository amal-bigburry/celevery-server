/*
 * Company License: Bigburry Hypersystems LLP
 * All rights reserved © Bigburry Hypersystems LLP
 */

/**
 * @fileoverview This file declares a unique symbol token which is used for the purpose 
 * of dependency injection within the NestJS framework. The symbol represents the abstract 
 * reference to the Hero repository, which allows the NestJS dependency injection system 
 * to resolve and inject the appropriate implementation class wherever it is required in 
 * the application.
 *
 * This pattern enables decoupling between interface definitions and their concrete 
 * implementations, which is beneficial for testing, mocking, and maintaining scalable architecture.
 *
 * Company: Bigburry Hypersystems LLP
 */

export const HERO_REPOSITORY = Symbol('HERO_REPOSITORY');
