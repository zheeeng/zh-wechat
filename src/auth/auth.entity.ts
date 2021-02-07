import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  static fromUsernameAddPassowrd(username: string, password: string) {
    const user = new User()
    user.username = username
    user.password = password

    return user
  }

  static fromUsernameId(id: number, userEntity: Partial<User>) {
    const user = new User()
    user.id = id
    Object.assign(user, userEntity)

    return user
  }

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column({ default: true })
  isActive: boolean;

  @Column({ type: 'timestamp' })
  createdAt: Date;
}
