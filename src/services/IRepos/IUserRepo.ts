import { Repo } from "../../core/infra/Repo";
import { User } from "../../domain/user";
import { UserEmail } from "../../domain/userEmail";
import { UserId } from "../../domain/userId";

export default interface IUserRepo extends Repo<User> {
	save(user: User): Promise<User>;
	exists (id: UserId|string): Promise<boolean>;
	findByEmail (email: string): Promise<User>;
	deleteUser (user: User): Promise<void>;
	getByEstado (estado: string): Promise<User[]>;
}
  