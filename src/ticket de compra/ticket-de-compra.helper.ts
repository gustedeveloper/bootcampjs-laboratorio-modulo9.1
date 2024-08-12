import {
  TipoIva,
  Producto,
  LineaTicket,
  productos,
  ResultadoLineaTicket,
} from "./model";

export const calculaPrecioUnitarioSinIva = (productos: LineaTicket[]): void => {
  let precioSinIva: number;
  productos.forEach((producto) => {
    switch (producto.producto.tipoIva) {
      case "general":
        precioSinIva = producto.producto.precio * 0.79;
        break;
      case "reducido":
        precioSinIva = producto.producto.precio * 0.9;
        break;
      case "superreducidoA":
        precioSinIva = producto.producto.precio * 0.95;
        break;
      case "superreducidoB":
        precioSinIva = producto.producto.precio * 0.96;
        break;
      case "superreducidoC":
        precioSinIva = producto.producto.precio;
        break;
    }

    return precioSinIva;
  });
};

export const calcularResultadoLineaTicket = (
  productos: LineaTicket[]
): ResultadoLineaTicket[] => {};
