import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Todo } from './entities/todo.entity';

@Injectable()
export class TodosRepository extends Repository<Todo> {
  constructor(private dataSource: DataSource) {
    super(Todo, dataSource.createEntityManager());
  }
}
