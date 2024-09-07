import {injectable} from "inversify";
import type {User} from "@/core/entities/models/user";
import {db} from "@/drizzle";
import {users} from "@/drizzle/schema";
import {eq} from "drizzle-orm";
import {DatabaseOperationError} from "@/core/entities/errors/common";
import {IUsersRepository} from "@/core/ports/user.interface";

@injectable()
export class UsersRepository implements IUsersRepository {

    async getUser(id: string): Promise<User | undefined> {
        const query = db.query.users.findFirst({
            where: eq(users.id, id),
        });

        const user = await query.execute();

        return user;

    }

    async createUser(input: User): Promise<User> {
        const query = db.insert(users).values(input).returning();
        const [created] = await query.execute();
        if (created) {
            return created;
        } else {
            throw new DatabaseOperationError("Cannot create user.");
        }
    }

    async getUserByUsername(username: string): Promise<User | undefined> {
        const query = db.query.users.findFirst({
            where: eq(users.username, username),
        });

        const user = await query.execute();

        return user;
    }
}