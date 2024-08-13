import "./style.css";

import {
  LineaTicket,
  productos,
  TicketFinal,
  calcularResultadoLineaTicket,
  crearResultadoTotalTicket,
  calculoTotalPorTipoDeIva,
} from "./ticket de compra/index";

const crearTicketFinal = (productos: LineaTicket[]): TicketFinal => {
  const lineas = calcularResultadoLineaTicket(productos);
  const total = crearResultadoTotalTicket(lineas);
  const desgloseIva = calculoTotalPorTipoDeIva(lineas);

  const ticketFinal: TicketFinal = {
    lineas: lineas,
    total: total,
    desgloseIva: desgloseIva,
  };

  return ticketFinal;
};

console.log(crearTicketFinal(productos));
