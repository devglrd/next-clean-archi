import {ContainerModule, interfaces} from "inversify";
import {IAuthenticationService} from "@/src/application/services/authentication.interface";
import {AuthenticationService} from "@/src/infrastructure/services/auth.service";
import {DI_SYMBOLS} from "@/di/types";

const initializeModule = (bind: interfaces.Bind) => {
    bind<IAuthenticationService>(DI_SYMBOLS.IAuthenticationService).to(AuthenticationService);

}
export const AuthenticationModule = new ContainerModule(initializeModule);