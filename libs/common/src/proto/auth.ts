/**
* This file is auto-generated by nestjs-proto-gen-ts
*/

import { Observable } from 'rxjs';
import { Metadata } from '@grpc/grpc-js';

export namespace auth {
    export interface AuthGrpcService {
        register(
            data: RegisterRequest,
            metadata?: Metadata,
            ...rest: any[]
        ): Observable<RegisterResponse>;
        login(
            data: LoginRequest,
            metadata?: Metadata,
            ...rest: any[]
        ): Observable<LoginResponse>;
        validate(
            data: ValidateRequest,
            metadata?: Metadata,
            ...rest: any[]
        ): Observable<ValidateResponse>;
    }
    // Register
    export interface RegisterRequest {
        name?: string;
        email?: string;
        password?: string;
    }
    export interface RegisterResponse {
        status?: number;
        error?: string[];
    }
    // Login
    export interface LoginRequest {
        email?: string;
        password?: string;
    }
    export interface LoginResponse {
        status?: number;
        error?: string[];
        token?: string;
    }
    // Validate
    export interface ValidateRequest {
        token?: string;
    }
    export interface ValidateResponse {
        status?: number;
        error?: string[];
        userId?: number;
    }
}

