export interface Respuesta {
    IdRespuestaOK   : string,
    IdPersonaOK     : string,
    IdEncuestaOK    : string,
    IdUsuarioOK     : string,
    Hotel           : string,
    Contestada      : boolean,
    Enlace          : string,
    Puntuacion      : string,
    Seccion?         : [{
        IdSeccionOK     : string,
        Nombre          : string,
        Tipo            : string,
        Respuestas: [{
            IdPreguntaOK    : string,
            Respuesta       : string,
            Valor           : number
        }]
    }]
}
