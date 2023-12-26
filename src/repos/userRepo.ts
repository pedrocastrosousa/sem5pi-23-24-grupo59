import { Service, Inject } from 'typedi';

import { Document,FilterQuery, Model } from 'mongoose';
import { IUserPersistence } from '../dataschema/IUserPersistence';

import IUserRepo from "../services/IRepos/IUserRepo";
import { User } from "../domain/user";
import { UserId } from "../domain/userId";
import { UserEmail } from "../domain/userEmail";
import { UserMap } from "../mappers/UserMap";
import { Filter } from 'mongodb';

@Service()
export default class UserRepo implements IUserRepo {
  private models: any;
 
  constructor(
    @Inject('userSchema') private userSchema : Model<IUserPersistence & Document>,
    @Inject('logger') private logger
  ) { }
 
  private createBaseQuery (): any {
    return {
      where: {},
    }
  }
 
  public async exists (userId: UserId | string): Promise<boolean> {
 
    const idX = userId instanceof UserId ? (<UserId>userId).id.toValue() : userId;
 
    const query = { domainId: idX};
    const userDocument = await this.userSchema.findOne( query );
 
    return !!userDocument === true;
  }
 
  public async save (user: User): Promise<User> {
    const query = { domainId: user.id.toString() };
 
    const userDocument = await this.userSchema.findOne( query );
 console.log("userDocument", userDocument);
    try {
      if (userDocument === null ) {
        const rawUser: any = UserMap.toPersistence(user);
 
        const userCreated = await this.userSchema.create(rawUser);
 
        return UserMap.toDomain(userCreated);
      } else {
        userDocument.firstName = user.firstName;
        userDocument.lastName = user.lastName;
        await userDocument.save();
 
        return user;
      }
    } catch (err) {
      throw err;
    }
  }

  public async findByEmail (email: string): Promise<User> {
    const query = { email: email.toString()};
    const userRecord = await this.userSchema.findOne(query as FilterQuery<IUserPersistence & Document>);
    if (userRecord != null) {
      return UserMap.toDomain(userRecord);
    }
 
    return null;
  }

  public async deleteUser (user: User): Promise<void> {
    console.log("user", user.email.value);
    const query = { email: user.email.value };
    await this.userSchema.deleteOne(query);
  }

}