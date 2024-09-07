import {ContainerModule, interfaces} from "inversify";
import {DI_SYMBOLS} from "@/di/types";
import {AuthenticationService} from "@/core/adapters/auth.gateway";
import {IAuthenticationService} from "@/core/ports/auth.interface";

const initializeModule = (bind: interfaces.Bind) => {
    bind<IAuthenticationService>(DI_SYMBOLS.IAuthenticationService).to(AuthenticationService);

}
export const AuthenticationModule = new ContainerModule(initializeModule);