export interface Persona {
    IdPersonaOK: { type: String },
    Nombres: { type: String },
    Apellidos: { type: String },
    CorreoEle: { type: String },
    Celular: { type: String },
    Encuestas: [{
        IdEncuestaOK: { type: String },
        Enlace: { type: String },
        Contestada: { type: String },
        IdRespuestaOK: { type: String },
        Fecha:{ type: String }
    }],
}
