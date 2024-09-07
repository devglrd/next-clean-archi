import {getInjection} from "@/di/container";
import {AuthenticationError} from "@/core/entities/errors/auth";
import {hash, verify} from "@node-rs/argon2";
import {Cookie} from "@/core/entities/models/cookie";
import {Session} from "@/core/entities/models/session";
import {User} from "@/core/entities/models/user";

export async function signInUseCase(input: {
    username: string;
    password: string;
}) {
    const authenticationService = getInjection("IAuthenticationService");
    const usersRepository = getInjection("IUsersRepository");

    const existingUser = await usersRepository.getUserByUsername(input.username);

    if (!existingUser) {
        throw new AuthenticationError("User not found");
    }

    const validPassword = await verify(existingUser.password_hash, input.password, {
        memoryCost: 19456,
        timeCost: 2,
        outputLen: 32,
        parallelism: 1,
    })

    if (!validPassword) {
        throw new AuthenticationError("Incorrect username or password");
    }

    return authenticationService.createSession(existingUser);


}


export async function signOutCase(
    sessionId: string
): Promise<{ blankCookie: Cookie }> {
    const authenticationService = getInjection("IAuthenticationService");

    return authenticationService.invalidateSession(sessionId)
}

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