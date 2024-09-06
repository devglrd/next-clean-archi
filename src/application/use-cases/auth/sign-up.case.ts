import {getInjection} from "@/di/container";
import {AuthenticationError} from "@/src/entities/errors/auth";
import {Cookie} from "@/src/entities/models/cookie";
import {Session} from "@/src/entities/models/session";
import {User} from "@/src/entities/models/user";
import {hash} from "@node-rs/argon2";

export async function signUpCase(input: {
    username: string;
    password: string;
}): Promise<{
    session: Session;
    cookie: Cookie;
    user: Pick<User, "id" | "username">;
}> {
    const usersRepository = getInjection("IUsersRepository");
    const authenticationService = getInjection("IAuthenticationService");

    const existingUser = await usersRepository.getUserByUsername(input.username);

    if (existingUser) {
        throw new AuthenticationError("User already exists");
    }

    const passwordHash = await hash(input.password, {
        memoryCost: 19456,
        timeCost: 2,
        outputLen: 32,
        parallelism: 1,
    });

    const userId = await authenticationService.generateUserId();

    const newUser = await usersRepository.createUser({
        id: userId,
        username: input.username,
        password_hash: passwordHash,
    });

    const {cookie, session} = await authenticationService.createSession(newUser);

    return {
        cookie,
        session,
        user: {
            id: newUser.id,
            username: newUser.username,
        },
    }


}