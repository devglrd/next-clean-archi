import {z} from "zod";
import {signInUseCase} from "@/src/application/use-cases/auth/sign-in.case";
import {signInSchema} from "@/app/(auth)/schema";
import {InputParseError} from "@/src/entities/errors/common";


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