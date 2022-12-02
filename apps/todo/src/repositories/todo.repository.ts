import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { TodoEntity } from '../models/todo.entity';

@Injectable()
export class TodoRepository extends Repository<TodoEntity> {
  constructor(private dataSource: DataSource) {
    super(TodoEntity, dataSource.createEntityManager());
  }
}
