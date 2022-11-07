import {modeloHabitacion} from '../Models/ModeloHabitacion.js'

export class ServicioHabitacion{

    //aqui programo metodos para cada una de las
    //consultas que quiero hacer en bd

    async buscarHabitaciones(){
        let habitaciones=await modeloHabitacion.find()//consulta Buscar >>> método .find de Mongo
        return habitaciones
    }

    async buscarHabitacionPorId(id){
        let habitacion=await modeloHabitacion.findById(id)//consulta Buscar por ID >>> método .findById de Mongo
        return habitacion
    }

    async agregarHabitacionEnBD(datos){
        let datosValidados = new modeloHabitacion(datos)//aqui se validan los datos con el modelo
        return await datosValidados.save()//consulta Agregar >>> método .save de Mongo
    }

    async editarHabitacion(id,datos){

        return await modeloHabitacion.findByIdAndUpdate(id,datos)//consulta Editar >>> método .findByIdAndUpdate de Mongo
    }

}