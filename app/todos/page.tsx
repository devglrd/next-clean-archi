"use client";
import {Card, CardContent, CardHeader, CardTitle} from "@/app/_components/ui/card";
import {Separator} from "@/app/_components/ui/separator";
import {useServerActionMutation, useServerActionQuery} from "@/app/lib/zsa.query";
import {getTodos, toggleTodo} from "@/app/todos/actions";
import {Loader2} from "lucide-react";
import {Checkbox} from "@/app/_components/ui/checkbox";
import {cn} from "@/app/_components/utils";
import {toast} from "sonner";

export default function Todos() {


    const {isPending, data, refetch} = useServerActionQuery(getTodos, {
        queryKey: ['getTodos'],
        input: undefined,
    })

    const {mutate} = useServerActionMutation(toggleTodo, {
        onError: error => {
            console.error(error)
            toast.success(error.message);
        },
        onSuccess: () => {
            toast.success('Todo toggled successfully');
            refetch();
        }
    })

    function handleToggle(id: number) {
        mutate({id})
    }

    return (
        <Card className="w-full max-w-lg">
            <CardHeader className="flex flex-row items-center">
                <CardTitle className="flex-1">TODOs</CardTitle>
            </CardHeader>
            <Separator/>
            <CardContent className="flex flex-col p-6 gap-4">
                {isPending && <Loader2 className="w-6 h-6"/>}
                {!isPending && data && (
                    <div>
                        {data.map(todo => (
                            <li
                                key={todo.id}
                                className="flex items-center gap-2 w-full hover:bg-muted/50 active:bg-muted rounded-sm p-1"
                            >
                                <Checkbox
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