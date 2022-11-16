
import { ServicioHabitacion } from '../services/ServicioHabitacion.js'
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
        let objetoServicioHabitacion = new ServicioHabitacion()        
        

        //Variables de la Reserva
        let fechaEntrada = new Date(datosReserva.fechaEntrada)
        let fechaSalida = new Date(datosReserva.fechaSalida)
        let reservasRegistradas = []
        let diasAlojamiento
        if (Date.parse(fechaEntrada) < Date.parse(fechaSalida)) {
            diasAlojamiento = (Math.abs(fechaSalida.getTime()-fechaEntrada.getTime()))/(1000 * 3600 * 24)
        } else {
            diasAlojamiento = 0
        }
        

        try {
            let datosHabitacion = await objetoServicioHabitacion.buscarHabitacionPorId(datosReserva.idHabitacion)
            reservasRegistradas = await objetoServicioReserva.buscarReservas()
            let ultimaReserva = reservasRegistradas.some(function(reserva) {
                return reserva.idHabitacion == datosReserva.idHabitacion                
              });
            
            if (!ultimaReserva) {
                if (diasAlojamiento != 0) {
                
                    datosReserva.costoReserva = diasAlojamiento * datosHabitacion.valorNoche //aquí se añade la propiedad de costoReserva
                    if (datosReserva.numeroAdultos != 0) {
                        let totalPersonas = datosReserva.numeroNinos + datosReserva.numeroAdultos
                        if (totalPersonas <= datosHabitacion.numeroMaximoPersonas) {
    
                            await objetoServicioReserva.agregarReservaEnBD(datosReserva)
    
                            response.status(200).json({
                            "mensaje":"exito registrando la Reserva",
                            "datos":null
                            })
    
                        } else {
                            response.status(400).json({
                                "mensaje":"Excede el cupo máximo de personas en la Habitación",
                                "datos":null
                            })
                        }
                    } else {
                        response.status(400).json({
                            "mensaje":"Debes incluir por lo menos un Adulto",
                            "datos":null,
                        })
                    }
                } else {
                    response.status(400).json({
                        "mensaje":"hay un error en las fechas de Reservación",
                        "datos":null,
                    })
                }
            } else {
                response.status(400).json({
                    "mensaje":"Esta Habitacion ya se encuentra Reservada",
                    "datos":null,
                })
            }
        } catch (error) {
            response.status(400).json({
                "mensaje":"Error!!! La Habitación no existe "+error,
                "datos":null,
            })
        }
    }
        
        

    async editarReserva(request,response){

        let idReserva = request.params.idReserva
        let datosReserva = request.body

        let objetoServicioReserva = new ServicioReserva()

        let objetoServicioHabitacion = new ServicioHabitacion()        
        

        //Variables de la Reserva
        let fechaEntrada = new Date(datosReserva.fechaEntrada)
        let fechaSalida = new Date(datosReserva.fechaSalida)
        let reservasRegistradas = []
        let diasAlojamiento
        if (Date.parse(fechaEntrada) < Date.parse(fechaSalida)) {
            diasAlojamiento = (Math.abs(fechaSalida.getTime()-fechaEntrada.getTime()))/(1000 * 3600 * 24)
        } else {
            diasAlojamiento = 0
        }
        

        try {
            let datosHabitacion = await objetoServicioHabitacion.buscarHabitacionPorId(datosReserva.idHabitacion)
            reservasRegistradas = await objetoServicioReserva.buscarReservas()
            
            if (diasAlojamiento != 0) {
                
                datosReserva.costoReserva = diasAlojamiento * datosHabitacion.valorNoche //aquí se añade la propiedad de costoReserva
                if (datosReserva.numeroAdultos != 0) {
                    let totalPersonas = datosReserva.numeroNinos + datosReserva.numeroAdultos
                    if (totalPersonas <= datosHabitacion.numeroMaximoPersonas) {

                        await objetoServicioReserva.editarReserva(idReserva,datosReserva)

                        response.status(200).json({
                            "mensaje":"Éxito Editando la Reserva con ID "+idReserva,
                            "datos":datosReserva
                        })

                    } else {
                        response.status(400).json({
                            "mensaje":"Excede el cupo máximo de personas en la Habitación",
                            "datos":null
                        })
                    }
                } else {
                    response.status(400).json({
                        "mensaje":"Debes incluir por lo menos un Adulto",
                        "datos":null,
                    })
                }
            } else {
                response.status(400).json({
                    "mensaje":"hay un error en las fechas de Reservación",
                    "datos":null,
                })
            }

        } catch (error) {
            response.status(400).json({
                "mensaje":"Error!!! no fue posible editar la Reserva "+error,
                "datos":null,
            })
        }

    }



    async eliminarReserva(request,response){

        let idReserva = request.params.idReserva

        let objetoServicioReserva = new ServicioReserva()
       

        try{

            await objetoServicioReserva.eliminarReserva(idReserva)

            response.status(200).json({
                "mensaje":"Se eliminó la reserva con id "+idReserva,
                "datos":null,
            })

        }catch(error){

            response.status(400).json({
                "mensaje":"No Existe la Reserva que quieres eliminar "+error,
                "datos":null,
            })

        }
    }


}