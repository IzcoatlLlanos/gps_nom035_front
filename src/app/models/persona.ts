export interface Persona {
    IdPersonaOK: string,
    Nombres: string,
    Apellidos: string,
    Hotel: string,
    CorreoEle: string,
    Celular: string,
    Encuestas?: [{
        IdRespuestaOK: string,
        Enlace: string,
        IdEncuestaOK: string,
        Contestada: string,
        Fecha: Date
    }],
}
