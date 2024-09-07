import {z} from "zod";
import {signInSchema, signUpSchema} from "@/app/(auth)/schema";
import {InputParseError} from "@/core/entities/errors/common";
import {getInjection} from "@/di/container";
import {signInUseCase, signOutCase, signUpCase} from "@/core/usecases/auth.usecase";

export async function signInController(
    input: z.infer<typeof signInSchema>
) {
    const {data, error: inputParseError} = await signInSchema.safeParse(input);

    if (inputParseError) {
        throw new InputParseError('invalid data', {cause: inputParseError});
    }

    const {cookie} = await signInUseCase(data);

    return cookie;

}

export async function signOutController(
    sessionId: string | undefined,
) {
    if (!sessionId) {
        throw new InputParseError("Must provide a session ID");
    }
    const authenticationService = getInjection("IAuthenticationService");
    const { session } = await authenticationService.validateSession(sessionId);

    const { blankCookie } = await signOutCase(session.id);
    return blankCookie;

}

export async function signUpController(
    input: Partial<z.infer<typeof signUpSchema>>
): Promise<ReturnType<typeof signUpCase>> {

    const {data, error: inputParseError} = await signUpSchema.safeParse(input);

    if (inputParseError) {
        throw new InputParseError('invalid data', {cause: inputParseError});
    }

    return await signUpCase(data);

}