'use client';

import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/app/_components/ui/card";
import {Input} from "@/app/_components/ui/input";
import {Button} from "@/app/_components/ui/button";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {z} from "zod";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/app/_components/ui/form";
import {toast} from "sonner";
import {useServerActionMutation} from "@/app/lib/zsa.query";
import {Loader2} from "lucide-react";
import Link from "next/link";
import {signInSchema} from "@/app/(auth)/schema";
import {signInAction} from "@/app/(auth)/actions";
import {useRouter} from "next/navigation";


export default function SignUp() {
    const router = useRouter();
    const form = useForm<z.infer<typeof signInSchema>>({
        resolver: zodResolver(signInSchema),
        defaultValues: {
            username: "devglrd",
            password: "password"
        }
    })

    const {isPending, mutate} = useServerActionMutation(signInAction, {
        onError: error => {
            toast.error(error.message)
        },
        onSuccess: () => {
            toast.success('Login success!');
            router.push('/todos');
        }
    })


    async function onSubmit(values: z.infer<typeof signInSchema>) {
        mutate(values)
    }


    return (
        <Card>
            <CardHeader>
                <CardTitle>Welcome Back ! </CardTitle>
                <CardDescription>Sign in to your account to continue</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
                <Form {...form}>
                    <form className="flex flex-col gap-2" onSubmit={form.handleSubmit(onSubmit)}>
                        <FormField
                            control={form.control}
                            name="username"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>
                                        Username
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            type="string"
                                            placeholder="Username" {...field} />

                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>
                                        Password
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            type="password"
                                            {...field} />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />


                        <Button type="submit" className="self-start"
                                disabled={isPending || !form.formState.isValid}>
                            {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin"/>}
                            Submit
                        </Button>

                        <div className="mt-4 text-center text-sm">
                            {"Don't"} have an account?{" "}
                            <Link href="/sign-up" className="underline">
                                Sign up
                            </Link>
                        </div>
                    </form>
                </Form>
            </CardContent>
        </Card>
    )
}