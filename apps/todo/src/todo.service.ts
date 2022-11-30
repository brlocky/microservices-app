import { todo } from '@app/common/proto/todo';
import { Injectable } from '@nestjs/common';
import { Todo } from './entities/todo.entity';
import { TodosRepository } from './todo.repository';

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
