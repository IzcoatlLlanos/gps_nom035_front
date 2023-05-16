export interface Respuesta {
    IdRespuestaOK   : string,
    IdPersonaOK     : string,
    IdEncuestaOK    : string,
    IdUsuarioOK     : string,
    Hotel           : string,
    Contestada      : boolean,
    Enlace          : string,
    Puntuacion      : number,
    Seccion?         : [{
        IdSeccionOK     : string,
        Nombre          : string,
        Tipo            : string,
        Resultado       : number,
        Respuestas: [{
            IdPreguntaOK    : string,
            Respuesta       : string,
            Valor           : number
        }]
    }]
}
