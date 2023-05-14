import { SeccionRespuestas } from "./seccion-respuestas"

export interface Seccion {
    IdSeccionOK         : string,
    Nombre          : string,
    Tipo            : string,
    Respuestas      : SeccionRespuestas[]
}
