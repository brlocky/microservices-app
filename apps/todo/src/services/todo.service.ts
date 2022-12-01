import { todo } from '@app/common/proto/todo';
import { Injectable, NotFoundException } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { NotFoundError } from 'rxjs';
import { Todo } from '../models/todo.entity';
import { TodosRepository } from '../repositories/todo.repository';

@Injectable()
export class TodoService {
  constructor(private readonly repo: TodosRepository) {
    this.repo = repo;
  }

  async create(data: todo.CreateTodoRequest): Promise<Todo> {
    return this.repo.save({...data});
  }

  async findAll(): Promise<todo.GetAllTodoResponse> {
    return {
      todos: await this.repo.find(),
    };
  }
}
