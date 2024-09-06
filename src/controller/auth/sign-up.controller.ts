
import {z} from "zod";
import {signUpCase} from "@/src/application/use-cases/auth/sign-up.case";
import {InputParseError} from "@/src/entities/errors/common";
import {signUpSchema} from "@/app/(auth)/schema";


export async function signUpController(
    input: Partial<z.infer<typeof signUpSchema>>
): Promise<ReturnType<typeof signUpCase>> {

    const {data, error: inputParseError} = await signUpSchema.safeParse(input);

    if (inputParseError) {
        throw new InputParseError('invalid data', {cause: inputParseError});
    }

    return await signUpCase(data);

}