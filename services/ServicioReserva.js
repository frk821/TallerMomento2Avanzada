import {modeloReserva} from '../Models/ModeloReserva.js'

export class ServicioReserva{

    //aqui programo metodos para cada una de las
    //consultas que quiero hacer en bd

    async buscarReservas(){
        let reservas = await modeloReserva.find()
        return reservas
    }

    async buscarReservaPorId(id){
        let reserva = await modeloReserva.findById(id)
        return reserva
    }

    async agregarReservaEnBD(datosReserva){
        let datosReservaValidados = new modeloReserva(datosReserva)
        return await datosReservaValidados.save()
    }

    async editarReserva(id,datosReserva){

        return await modeloReserva.findByIdAndUpdate(id,datosReserva)
    }

    async eliminarReserva(id,datosReserva){

        await modeloReserva.findByIdAndDelete(id,datosReserva)
    }

}