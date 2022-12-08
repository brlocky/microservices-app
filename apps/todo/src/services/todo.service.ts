import { todo } from '@app/common/proto/todo';
import { Injectable } from '@nestjs/common';
import { TodoRepository } from '../repositories/todo.repository';

@Injectable()
export class TodoService {
  constructor(private readonly repo: TodoRepository) {
    this.repo = repo;
  }

  async create(payload: todo.CreateTodoRequest): Promise<todo.CreateTodoResponse> {
    const item = await this.repo.save(payload);
    return {
      item
    };
  }

  async findAll(payload: todo.GetAllTodoRequest): Promise<todo.GetAllTodoResponse> {
    const items = await this.repo.find();
    return {
      items
    };
  }
}
