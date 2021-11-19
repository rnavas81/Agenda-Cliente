/**
 * Variables de idioma
 */
export const language = {
    // COMUNES
    cualquiera: "Cualquiera",
    salir: "Salir",
    nombre: "Nombre",
    telefono: "Teléfono",
    volver: "Volver",
    cambios_guardados: "Cambios guardados",
    matricula: "Matricula",
    // CAMPOS ESPECIFICOS
    buscador: "Buscador",
    aviso: "Aviso",
    avisos: "Avisos",
    aviso_historico: "Aviso de histórico",
    libro: "Libro",
    libro_historico:"Viaje de histórico",
    libros: "Libros",
    destino: "Destino",
    fecha_salida: "Fecha salida",
    fecha_destino: "Fecha destino",
    lugar_salida: "Lugar salida",
    lugar_destino: "Lugar destino",
    cliente: "Cliente",
    clientes: "Clientes",
    conductor: "Conductor",
    conductores: "Conductores",
    vehiculo: "Vehículo",
    vehiculos: "Vehículos",
    usuario: "Usuario",
    usuarios: "Usuarios",
    vehiculos_lista: "Lista de vehículos",
    vehiculos_confirmar: "Selecciona los vehículos para confirmar",
    facturar_a: "Facturar a",
    factura_numero: "Número de factura",
    factura_nombre: "Nombre de la factura",
    viajes_para: "Para viajes",
    importe: 'Importe',
    cobrado: 'Cobrado',
    fecha_cobro: 'Fecha de cobro',
    action(action = null, entity = null) {
        switch (action) {
            case "add": action = "Agregar"; break;
            case "edit": action = "Modificar"; break;
            case "remove": action = "Eliminar"; break;

            default: action = "Tratar"; break;
        }
        switch (entity) {
            case "profile": entity = " perfil"; break;
            case "cliente": entity = "un cliente"; break;
            case "clientes": entity = "clientes"; break;
            case "vehiculo": entity = "un vehiculo"; break;
            case "vehiculos": entity = "vehículos"; break;
            case "conductor": entity = "un conductor"; break;
            case "conductores": entity = "conductores"; break;

            default: entity = "los datos"; break;
        }
        var string = `${action} ${entity}`;
        return string;
    },
    new(entity = null) {
        var string;
        switch (entity) {
            case 'cliente': string = "cliente"; break;
            case 'vehiculo': string = "vehículo"; break;
            case 'conductor': string = "conductor"; break;
            case 'usuario': string = "usuario"; break;

            default: string = "elemento"; break;
        }
        return `Nuevo ${string} creado`;
    },
    //// ERRORES /////
    error_get(type = null) {
        var string = 'Error al recuperar';
        switch (type) {
            case "profile": string += " los datos de perfil"; break;
            case "cliente": string += " el cliente"; break;
            case "clientes": string += " los clientes"; break;
            case "coche": string += "el vehiculo"; break;
            case "coches": string += "los vehiculos"; break;
            case "conductor": string += "el conductor"; break;
            case "conductores": string += "los conductores"; break;

            default: string += " los datos"; break;
        }
        return string;
    },
    error_action(action = null, entity = null) {
        switch (action) {
            case "add": action = "al agregar"; break;
            case "edit": action = "al modificar"; break;
            case "remove": action = "al eliminar"; break;
            default: action = "al tratar"; break;
        }
        switch (entity) {
            case "profile": entity = " perfil"; break;
            case "cliente": entity = "un cliente"; break;
            case "clientes": entity = "clientes"; break;
            case "coche": entity = "un vehiculo"; break;
            case "coches": entity = "vehiculos"; break;
            case "conductor": entity = "un conductor"; break;
            case "conductores": entity = "conductores"; break;
            default: entity = "los datos"; break;
        }
        var string = `Error ${action} ${entity}`;
        return string;
    },
    importar: "Importar",
    importarForm: {
        fichero: "Fichero de importación",
        tipo: "Tipo de entradas",
        dondeGuardar: "Donde guardar",
        historico: "Historico",
        actual: "Actual",
    }
}