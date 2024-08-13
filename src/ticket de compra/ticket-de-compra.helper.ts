import {
  LineaTicket,
  productos,
  ResultadoLineaTicket,
  ResultadoTotalTicket,
} from "./model";

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

console.log(resultadoLineaTicket);

// Cálculo de totales

export const calculoTotalSinIva = (
  resultadoLineaTicket: ResultadoLineaTicket[]
): number => {
  const totalSinIva = resultadoLineaTicket.reduce(
    (total, resultado) => total + resultado.precioSinIva * resultado.cantidad,
    0
  );
  const totalSinIvaRedondeado = Number(totalSinIva.toFixed(2));
  return totalSinIvaRedondeado;
};

console.log(calculoTotalSinIva(resultadoLineaTicket));

export const calculoTotalConIva = (
  resultadoLineaTicket: ResultadoLineaTicket[]
): number => {
  const totalConIva = resultadoLineaTicket.reduce(
    (total, resultado) => total + resultado.precioConIva * resultado.cantidad,
    0
  );
  const totalConIvaRedondeado = Number(totalConIva.toFixed(2));
  return totalConIvaRedondeado;
};

console.log(calculoTotalConIva(resultadoLineaTicket));

export const calculoTotalIva = (): number => {
  const totalConIva = calculoTotalConIva(resultadoLineaTicket);
  const totalSinIva = calculoTotalSinIva(resultadoLineaTicket);
  const totalIva = totalConIva - totalSinIva;
  const totalIvaRedondeado = Number(totalIva.toFixed(2));
  return totalIvaRedondeado;
};

console.log(calculoTotalIva());

export const crearResultadoTotalTicket = (
  resultadoLineaTicket: ResultadoLineaTicket[]
): ResultadoTotalTicket => {
  const resultadoTotalTicket: ResultadoTotalTicket = {
    totalSinIva: calculoTotalSinIva(resultadoLineaTicket),
    totalConIva: calculoTotalConIva(resultadoLineaTicket),
    totalIva: calculoTotalIva(),
  };
  return resultadoTotalTicket;
};

console.log(crearResultadoTotalTicket(resultadoLineaTicket));
