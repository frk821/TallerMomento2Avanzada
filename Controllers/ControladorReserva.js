import {ServicioReserva} from '../services/ServicioReserva.js'

export class ControladorReserva{

    constructor(){}

    async buscarReservas(request,response){

        let objetoServicioReserva = new ServicioReserva()

        try{

            response.status(200).json({
                "mensaje":"exito en la consulta",
                "datos":await objetoServicioReserva.buscarReservas()
            })

        }catch(error){

            response.status(400).json({
                "mensaje":"error en la consulta "+error,
                "datos":null,
            })

        }

        
        
    }

    async buscarReservaPorId(request,response){
        let idReserva = request.params.idReserva //recibo id de la peticion
        let objetoServicioReserva = new ServicioReserva()
        try{

            response.status(200).json({
                "mensaje":"exito en la consulta "+id,
                "datos":await objetoServicioReserva.buscarReservaPorId(idReserva),
            })

        }catch(error){

            response.status(400).json({
                "mensaje":"error en la consulta "+error,
                "datos":null,
            })

        }
    }

    async registrarReserva(request,response){

        let datosReserva = request.body // OBTENGO DATOS DEL BODY DE LA PETICIÓN
        let objetoServicioReserva = new ServicioReserva()
        
        try{
           
            if(datosHabitacion.numeroMaximoPersonas<8){

                await objetoServicioReserva.agregarReservaEnBD(datosReserva)

                response.status(200).json({
                    "mensaje":"exito registrando reserva",
                    "datos":null
                })

            }else{

                response.status(400).json({
                    "mensaje":"no caben tantas babys",
                    "datos":null
                })

            }

            
            
        }catch(error){

            response.status(400).json({
                "mensaje":"error en la consulta "+error,
                "datos":null,
            })

        }
    }

    async editarReserva(request,response){

        let id = request.params.idReserva
        let datosReserva = request.body

        let objetoServicioReserva = new ServicioReserva()
       

        try{

            await objetoServicioReserva.editarHabitacion(id,datosReserva)

            response.status(200).json({
                "mensaje":"exito editando"+id,
                "datos":null,
            })

        }catch(error){

            response.status(400).json({
                "mensaje":"error en la consulta "+error,
                "datos":null,
            })

        }
    }



    async eliminarReserva(request,response){

        let id = request.params.idReserva
        let datosReserva = request.body

        let objetoServicioReserva = new ServicioReserva()
       

        try{

            await objetoServicioReserva.eliminarReserva(id,datosReserva)

            response.status(200).json({
                "mensaje":"Se eliminó la reserva con id "+id,
                "datos":null,
            })

        }catch(error){

            response.status(400).json({
                "mensaje":"error en la consulta "+error,
                "datos":null,
            })

        }
    }


}