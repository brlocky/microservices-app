import { Column, Entity, ObjectIdColumn } from 'typeorm';

@Entity()
export class TodoEntity {
  @ObjectIdColumn()
  id: string;

  @Column()
  message: string;

  @Column()
  user_id: string;

  @Column({ default: false })
  completed: boolean;

}
