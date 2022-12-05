/**
* This file is auto-generated by nestjs-proto-gen-ts
*/

import { Observable } from 'rxjs';
import { Metadata } from '@grpc/grpc-js';

export namespace user {
    export interface UserGrpcService {
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
    }
    export interface User {
        id?: string;
        name?: string;
        email?: string;
    }
    // Register
    export interface RegisterRequest {
        name?: string;
        email?: string;
        password?: string;
    }
    export interface RegisterResponse {
        user?: user.User;
    }
    // Login
    export interface LoginRequest {
        email?: string;
        password?: string;
    }
    export interface LoginResponse {
        user?: user.User;
    }
}

