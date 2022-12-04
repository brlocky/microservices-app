import { Column, Entity, ObjectIdColumn, PrimaryColumn } from 'typeorm';
import { ObjectID } from 'mongodb';

@Entity('user')
export class UserEntity {
  @ObjectIdColumn()
  _id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column({ select: false })
  password: string;

  // @Column({ type: 'enum', enum: Role, default: Role.USER })
  // role: Role;
}
