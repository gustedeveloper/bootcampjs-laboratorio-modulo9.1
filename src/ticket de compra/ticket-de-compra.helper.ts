import { LineaTicket, productos, ResultadoLineaTicket } from "./model";

export const calculaPrecioUnitarioSinIva = (
  precio: number,
  tipoIva: string
): number => {
  let precioSinIva: number;
  switch (tipoIva) {
    case "general":
      precioSinIva = precio * 0.79;
      break;
    case "reducido":
      precioSinIva = precio * 0.9;
      break;
    case "superreducidoA":
      precioSinIva = precio * 0.95;
      break;
    case "superreducidoB":
      precioSinIva = precio * 0.96;
      break;
    case "superreducidoC":
      precioSinIva = precio;
      break;
    default:
      throw new Error("Tipo de IVA no válido");
  }

  return precioSinIva;
};

export const calcularResultadoLineaTicket = (
  productos: LineaTicket[]
): ResultadoLineaTicket[] => {
  let resultado: ResultadoLineaTicket[] = productos.reduce(
    (acumulador: ResultadoLineaTicket[], producto) => {
      const resultadoProducto: ResultadoLineaTicket = {
        nombre: producto.producto.nombre,
        cantidad: producto.cantidad,
        precioSinIva: calculaPrecioUnitarioSinIva(
          producto.producto.precio,
          producto.producto.tipoIva
        ),
        tipoIva: producto.producto.tipoIva,
        precioConIva: producto.producto.precio,
      };
      acumulador.push(resultadoProducto);

      return acumulador;
    },
    []
  );
  return resultado;
};

const resultadoLineaTicket = calcularResultadoLineaTicket(productos);

// Cálculo de totales

export const calculoTotalSinIva = (
  resultadoLineaTicket: ResultadoLineaTicket[]
): number => {
  const totalSinIva = resultadoLineaTicket.reduce(
    (total, resultado) => total + resultado.precioSinIva,
    0
  );
  const totalSinIvaRedondeado = Number(totalSinIva.toFixed(2));
  return totalSinIvaRedondeado;
};

console.log(calculoTotalSinIva(resultadoLineaTicket));
