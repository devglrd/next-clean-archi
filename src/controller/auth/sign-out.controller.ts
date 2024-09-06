import {InputParseError} from "@/src/entities/errors/common";
import {signOutCase} from "@/src/application/use-cases/auth/sign-out.case";
import {getInjection} from "@/di/container";


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