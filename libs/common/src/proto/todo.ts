/**
* This file is auto-generated by nestjs-proto-gen-ts
*/

import { Observable } from 'rxjs';
import { Metadata } from '@grpc/grpc-js';

export namespace todo {
    export interface TodoGrpcService {
        createTodo(
            data: CreateTodoRequest,
            metadata?: Metadata,
            ...rest: any[]
        ): Observable<CreateTodoResponse>;
        getAllTodo(
            data: GetAllTodoRequest,
            metadata?: Metadata,
            ...rest: any[]
        ): Observable<GetAllTodoResponse>;
    }
    // tslint:disable-next-line:no-empty-interface
    export interface GetAllTodoRequest {
    }
    export interface TodoItem {
        id?: string;
        userId?: string;
        message?: string;
        completed?: boolean;
    }
    export interface CreateTodoRequest {
        message?: string;
        userId?: string;
    }
    export interface CreateTodoResponse {
        id?: string;
        userId?: string;
        message?: string;
        completed?: boolean;
    }
    export interface GetAllTodoResponse {
        todos?: todo.TodoItem[];
    }
}

