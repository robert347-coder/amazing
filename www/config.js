/* =========================================================================
   AMAZING JESÚS · config.js
   -------------------------------------------------------------------------
   Datos que pueden cambiar con el tiempo o de una parroquia a otra.
   Si cambia el Papa, el obispo o quieres usar la app en otra parroquia,
   SOLO tienes que tocar este archivo. El resto de la app lo lee de aquí.
   ========================================================================= */

const CONFIG = {
  nombreApp: "Amazing Jesús",
  subtitulo: "Mi Primera Comunión",

  // Iglesia universal
  papa: "León XIV",                 // elegido el 8 de mayo de 2025

  // Iglesia local (España)
  diocesis: "Orihuela-Alicante",
  obispo: "José Ignacio Munilla",
  provinciaEclesiastica: "Valencia",
  arzobispo: "Enrique Benavent",
  parroquia: "Parroquia del Salvador",
  ciudad: "Alicante",
  parroco: "",                      // escribe aquí el nombre de tu párroco, p. ej. "D. Juan Pérez"

  // Reglas del juego
  preguntasPorPartida: 10,
  aciertoMinimo: 80,                // % necesario
  intentosParaDominar: 3,           // últimos N intentos que deben superar el 80%
  preguntasExamenPorBloque: 3,      // examen final: 3 preguntas de cada bloque obligatorio
  puntosPorAcierto: 10,
  puntosPorRacha: 5,                // extra cada 3 aciertos seguidos
  rosarioObligatorio: true,         // true = el Rosario cuenta para el nivel final (decidido por el catequista)
  viaCrucisObligatorio: true        // true = el Vía Crucis cuenta para el nivel final
};
