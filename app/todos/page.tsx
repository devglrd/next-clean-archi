"use client";
import {Card, CardContent, CardHeader, CardTitle} from "@/app/_components/ui/card";
import {Separator} from "@/app/_components/ui/separator";
import {useServerActionMutation, useServerActionQuery} from "@/app/lib/zsa.query";
import {addTodos, getTodos, toggleTodo} from "@/app/todos/actions";
import {Loader2} from "lucide-react";
import {Checkbox} from "@/app/_components/ui/checkbox";
import {cn} from "@/app/_components/utils";
import {toast} from "sonner";
import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormField, FormItem, FormMessage} from "@/app/_components/ui/form";
import {Button} from "@/app/_components/ui/button";
import {addTodosSchema} from "@/app/todos/schema";
import {Input} from "@/app/_components/ui/input";



export default function Todos() {


    const {isPending, data, refetch} = useServerActionQuery(getTodos, {
        queryKey: ['getTodos'],
        input: undefined,
    })

    const {mutate, isPending: isPendingToggleTodo} = useServerActionMutation(toggleTodo, {
        onError: error => {
            console.error(error)
            toast.success(error.message);
        },
        onSuccess: () => {
            toast.success('Todo toggled successfully');
            refetch();
        }
    })

    const {mutate: addTodo, isPending: isPendingAddTodo} = useServerActionMutation(addTodos, {
        onError: error => {
            console.error(error)
            toast.success(error.message);
        },
        onSuccess: () => {
            toast.success('Todo added successfully');
            refetch();
        }
    })



    function handleToggle(id: number) {
        mutate({id})
    }

    const form = useForm<z.infer<typeof addTodosSchema>>({
        resolver: zodResolver(addTodosSchema),
        defaultValues: {
            todo: ""
        }
    })

    function onSubmit(values: z.infer<typeof addTodosSchema>) {
        addTodo(values)
        form.reset()
    }


    return (
        <Card className="w-full max-w-lg">
            <CardHeader className="flex flex-row items-center">
                <CardTitle className="flex-1">TODOs</CardTitle>
            </CardHeader>
            <Separator/>
            <CardContent className="flex flex-col p-6 gap-4">
                <Form {...form}>
                    <form className="flex flex-col gap-2" onSubmit={form.handleSubmit(onSubmit)}>
                        <FormField
                            control={form.control}
                            name="todo"
                            render={({field}) => (
                                <FormItem>
                                    <FormControl>
                                        <Input
                                            type={'text'}
                                            placeholder="" {...field} />

                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                        <Button type="submit" className="self-start"
                                disabled={isPendingAddTodo || !form.formState.isValid}>
                            {isPendingAddTodo && <Loader2 className="mr-2 h-4 w-4 animate-spin"/>}
                            Submit
                        </Button>
                    </form>
                </Form>
                {isPending && <Loader2 className="w-6 h-6 animate-spin"/>}
                {!isPending && data && (
                    <div>
                        {data.map(todo => (
                            <li
                                key={todo.id}
                                className="flex items-center gap-2 w-full hover:bg-muted/50 active:bg-muted rounded-sm p-1"
                            >
                                <Checkbox
                                    disabled={isPendingToggleTodo}
                                    checked={todo.completed}
                                    onCheckedChange={() => handleToggle(todo.id)}
                                    id={`checkbox-${todo.id}`}
                                />
                                <label
                                    htmlFor={`checkbox-${todo.id}`}
                                    className={cn("flex-1 cursor-pointer", {
                                        "text-muted-foreground line-through": todo.completed,
                                    })}
                                >
                                    {todo.todo}
                                </label>
                            </li>
                        ))}
                    </div>
                )}
            </CardContent>
        </Card>
    )
}