import {
  Column,
  CreateDateColumn,
  Entity,
  ObjectIdColumn,
  UpdateDateColumn,
} from 'typeorm';

interface NewTodo {
  message: string;
  userId: string;
}
@Entity()
export class TodoEntity {
  @ObjectIdColumn()
  public id: string;

  @Column()
  public message: string;

  @Column()
  public userId: string;

  @Column()
  public completed: boolean;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  public createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  public updatedAt: Date;
}
