export interface Encuesta {
    IdEncuestaOK    :   string,
    IdEncuestaBK    :   string,
    Tipo            :   string,
    Vigencia        :   string,
    Fecha           :   string,
    Descripcion     :   string,
    Seccion: [{
        _id: false,
        IdSeccionOK :   string,
        IdSeccionBK :   string,
        Nombre      :   string,
        Tipo        :   string,
        Preguntas: [{
            _id: false,
            IdPregunta  :   string,
            Categoria   :   string,
            Dominio     :   string,
            Pregunta    :   string,
        }], 
    }],
}
