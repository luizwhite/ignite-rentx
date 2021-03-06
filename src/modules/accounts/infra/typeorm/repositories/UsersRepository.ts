import { getRepository, Repository } from 'typeorm';

import { ICreateUserDTO } from '@modules/accounts/dtos/ICreateUserDTO';
import { User } from '@modules/accounts/infra/typeorm/entities/User';
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';

class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  async create({
    name,
    email,
    password,
    driver_license,
    avatar = null,
    id,
  }: ICreateUserDTO): Promise<void> {
    const user = this.repository.create({
      name,
      email,
      password,
      driver_license,
      avatar,
      id,
    });

    await this.repository.save(user);
  }

  async findByEmail(email: string): Promise<User | null> {
    const userFound = await this.repository.findOne({ email });

    return userFound || null;
  }

  async findById(id: string): Promise<User | null> {
    const userFound = await this.repository.findOne(id);

    return userFound || null;
  }

  async updatePassword(id: string, password: string): Promise<void> {
    await this.repository.save({
      id,
      password,
    });
  }

  async updateAvatar(id: string, avatar: string): Promise<void> {
    await this.repository.save({
      id,
      avatar,
    });
  }
}

export { UsersRepository };
