import { todo } from '@app/common/proto/todo';
import { Injectable } from '@nestjs/common';
import { TodoRepository } from '../repositories/todo.repository';

@Injectable()
export class TodoService {
  constructor(private readonly repo: TodoRepository) {
    this.repo = repo;
  }

  async create(payload: todo.CreateTodoRequest): Promise<todo.CreateTodoResponse> {
    return this.repo.save(payload);
  }

  async findAll(payload: todo.GetAllTodoRequest): Promise<todo.GetAllTodoResponse> {
    return {
      todos: await this.repo.find(),
    };
  }
}
