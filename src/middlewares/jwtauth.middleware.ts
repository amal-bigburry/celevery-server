/**
 * Importing Required Packages
 */
import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
/***
 * Return an injectable class
 */
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}
