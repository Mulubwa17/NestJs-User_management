import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.model';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  async insertUser(
    firstname: string,
    lastname: string,
    email: string,
    contact: number,
  ) {
    const newUser = new this.userModel({ firstname, lastname, email, contact });
    await newUser.save();
    return newUser;
  }

  async getUsers() {
    const users = await this.userModel.find().exec();
    return users.map((user) => ({
      id: user.id,
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      contact: user.contact,
    }));
  }

  async getSingleUser(id: string) {
    const user = await this.findUser(id);
    return {
      id: user.id,
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      contact: user.contact,
    };
  }

  async updateUser(
    id: string,
    lastname: string,
    firstname: string,
    email: string,
    contact: number,
  ) {
    const updatedUser = await this.findUser(id);
    if (firstname) {
      updatedUser.firstname = firstname;
    }
    if (lastname) {
      updatedUser.lastname = lastname;
    }
    if (email) {
      updatedUser.email = email;
    }
    if (contact) {
      updatedUser.contact = contact;
    }
    updatedUser.save();
    return updatedUser;
  }

  async deleteUser(id: string) {
    const result = await this.userModel.deleteOne({ _id: id }).exec();
    if (!result) {
      throw new NotFoundException('Could not find product.');
    }
    return result;
  }

  private async findUser(id: string): Promise<User> {
    let user;
    try {
      user = await this.userModel.findById(id).exec();
    } catch (error) {
      throw new NotFoundException('Could not find product.');
    }
    if (!user) {
      throw new NotFoundException('Could not find product.');
    }
    return user;
  }
}
