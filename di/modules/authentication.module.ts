import {ContainerModule, interfaces} from "inversify";
import {DI_SYMBOLS} from "@/di/types";
import {IAuthenticationService} from "@/core/ports/authentication.interface";
import {AuthenticationService} from "@/core/adapters/auth.gateway";

const initializeModule = (bind: interfaces.Bind) => {
    bind<IAuthenticationService>(DI_SYMBOLS.IAuthenticationService).to(AuthenticationService);

}
export const AuthenticationModule = new ContainerModule(initializeModule);