"use server";

import {createServerAction} from "zsa";
import {signUpController} from "@/src/controller/auth/sign-up.controller";
import {signInSchema, signUpSchema} from "@/app/(auth)/schema";
import {signInController} from "@/src/controller/auth/sign-in.controller";
import {Cookie} from "@/src/entities/models/cookie";
import {InputParseError} from "@/src/entities/errors/common";
import {cookies} from "next/headers";
import {AuthenticationError} from "@/src/entities/errors/auth";

export const signUpAction = createServerAction()
    .input(signUpSchema)
    .handler(async ({input}) => {
        let sessionCookie: Cookie;
        try {
            const {cookie} = await signUpController(input);
            sessionCookie = cookie;
        } catch (err) {
            if (err instanceof InputParseError) {
                return {
                    error:
                        "Invalid data. Make sure the Password and Confirm Password match.",
                };
            }
            return {
                error:
                    "An error happened. The developers have been notified. Please try again later. Message: " +
                    (err as Error).message,
            };
        }

        cookies().set(
            sessionCookie.name,
            sessionCookie.value,
            sessionCookie.attributes,
        );

        return true;
    })

export const signInAction = createServerAction()
    .input(signInSchema)
    .handler(async ({input}) => {
        let sessionCookie: Cookie;

        try {
            sessionCookie = await signInController(input);
        } catch (err) {
            if (
                err instanceof InputParseError ||
                err instanceof AuthenticationError
            ) {
                return {
                    error: "Incorrect username or password",
                };
            }
            return {
                error:
                    "An error happened. The developers have been notified. Please try again later.",
            };
        }

        cookies().set(
            sessionCookie.name,
            sessionCookie.value,
            sessionCookie.attributes,
        );

        return true;
    })