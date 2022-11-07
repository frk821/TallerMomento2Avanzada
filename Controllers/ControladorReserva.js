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
                "mensaje":"exito en la consulta "+idReserva,
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
           
            await objetoServicioReserva.agregarReservaEnBD(datosReserva)

            response.status(200).json({
                "mensaje":"exito registrando reserva",
                "datos":null
            })

                

            

               /* response.status(400).json({
                    "mensaje":"no caben tantas babys",
                    "datos":null
                }) */

            

            
            
        }catch(error){

            response.status(400).json({
                "mensaje":"error en la consulta "+error,
                "datos":null,
            })

        }
    }

    async editarReserva(request,response){

        let idReserva = request.params.idReserva
        let datosReserva = request.body

        let objetoServicioReserva = new ServicioReserva()
       

        try{

            await objetoServicioReserva.editarHabitacion(idReserva,datosReserva)

            response.status(200).json({
                "mensaje":"exito editando "+idReserva,
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

        let idReserva = request.params.idReserva
        //let idHabitacion 
        //let datosReserva = request.body

        let objetoServicioReserva = new ServicioReserva()
       

        try{

            await objetoServicioReserva.eliminarReserva(idReserva)

            response.status(200).json({
                "mensaje":"Se eliminó la reserva con id "+idReserva,
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