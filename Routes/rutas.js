//ESTE ARCHIVO ESTABLECE LAS RUTAS O ENDPOINTS DE CADA SERVICIO OFRECIDO POR MI API
import express from 'express'

import { ControladorHabitacion } from '../Controllers/ControladorHabitacion.js'
let controladorHabitacion = new ControladorHabitacion() //usando el controlador de Habitación

import { ControladorReserva } from "../Controllers/ControladorReserva.js"
let controladorReserva = new ControladorReserva() //usando el controlador de Reservas

export let rutasPersonalizadas=express.Router()

rutasPersonalizadas.get('/hotelLucho/habitaciones',controladorHabitacion.buscarHabitaciones)
rutasPersonalizadas.get('/hotelLucho/habitacion/:idHabitacion',controladorHabitacion.buscarHabitacionPorId)
rutasPersonalizadas.post('/hotelLucho/habitacion',controladorHabitacion.registrarHabitacion)
rutasPersonalizadas.put('/hotelLucho/habitacion/:idHabitacion',controladorHabitacion.editarHabitacion)


rutasPersonalizadas.get('/hotelLucho/reservas',controladorReserva.buscarReservas)
rutasPersonalizadas.get('/hotelLucho/reserva/:idReserva',controladorReserva.buscarReservaPorId)
rutasPersonalizadas.post('/hotelLucho/reserva',controladorReserva.registrarReserva)
rutasPersonalizadas.put('/hotelLucho/reserva/:idReserva',controladorReserva.editarReserva)
rutasPersonalizadas.delete('/hotelLucho/reserva/:idReserva',controladorReserva.eliminarReserva)

