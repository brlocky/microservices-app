import { todo } from '@app/common/proto/todo';
import { Injectable } from '@nestjs/common';
import { TodoEntity } from '../models/todo.entity';
import { TodoRepository } from '../repositories/todo.repository';

@Injectable()
export class TodoService {
  constructor(private readonly repo: TodoRepository) {
    this.repo = repo;
  }

  async create(
    payload: todo.CreateTodoRequest,
  ): Promise<todo.CreateTodoResponse> {
    const todo = new TodoEntity();
    todo.message = payload.message;
    todo.userId = payload.userId;
    todo.completed = false;

    const item = await this.repo.save(todo);
    return {
      item,
    };
  }

  async findAll(
    payload: todo.GetAllTodoRequest,
  ): Promise<todo.GetAllTodoResponse> {
    const items = await this.repo.find({
      take: 10,
      order: {
        createdAt: 'DESC',
      },
    });
    return {
      items
    };
  }
}
