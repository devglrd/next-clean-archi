import {Container} from "inversify";
import {AuthenticationModule} from "@/di/modules/authentication.module";
import {UsersModule} from "@/di/modules/users.module";
import {TodosModule} from "@/di/modules/todos.module";
import {DI_RETURN_TYPES, DI_SYMBOLS} from "@/di/types";

const ApplicationContainer = new Container({
    defaultScope: 'Singleton',
});

export const initializeContainer = () => {
    ApplicationContainer.load(TodosModule)
    ApplicationContainer.load(UsersModule)
    ApplicationContainer.load(AuthenticationModule)
}

export const destroyContainer = () => {
    ApplicationContainer.unload(TodosModule)
    ApplicationContainer.unload(UsersModule)
    ApplicationContainer.unload(AuthenticationModule)
}

if (process.env.NODE_ENV !== "test") {
    initializeContainer();
}

export function getInjection<K extends keyof typeof DI_SYMBOLS>(
    symbol: K
): DI_RETURN_TYPES[K] {
    return ApplicationContainer.get(DI_SYMBOLS[symbol]);
}

export {ApplicationContainer};