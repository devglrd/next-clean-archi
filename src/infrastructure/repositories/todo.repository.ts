import {ITodosRepository} from "@/src/application/repositories/todo.interface";
import {injectable} from "inversify";
import {Todo, TodoInsert} from "@/src/entities/models/todo";
import {db} from "@/drizzle";
import {eq} from "drizzle-orm";
import {todos} from "@/drizzle/schema";

@injectable()
export class TodosRepository implements ITodosRepository {
    async getTodo(id: number): Promise<Todo | undefined> {
        const query = db.query.todos.findFirst({
            where: eq(todos.id, id),
        })
        const todo = await query.execute()
        return todo;
    }

    async updateTodo(id: number, input: Partial<TodoInsert>): Promise<Todo> {

        const query = db.update(todos).set(input).where(eq(todos.id, id)).returning();

        const [updated] = await query.execute();

        return updated;

    }

    async createTodo(todo: TodoInsert): Promise<Todo> {

        const query = db.insert(todos).values(todo).returning();

        const [created] = await query.execute();

        if (created) {
            return created;
        } else {
            throw new Error("Cannot create todo.");
        }

    }

    getTodosForUser(userId: string): Promise<Todo[]> {
        const query = db.query.todos.findMany({
            where: eq(todos.userId, userId),
        });

        return query.execute();
    }
}