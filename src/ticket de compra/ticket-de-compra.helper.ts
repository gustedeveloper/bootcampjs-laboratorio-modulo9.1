import {
  LineaTicket,
  productos,
  ResultadoLineaTicket,
  ResultadoTotalTicket,
  TotalPorTipoIva,
} from "./model";

export const calcularImporteDeIva = (
  precio: number,
  tipoIva: string
): number => {
  let iva: number;
  switch (tipoIva) {
    case "general":
      iva = precio * 0.21;
      break;
    case "reducido":
      iva = precio * 0.1;
      break;
    case "superreducidoA":
      iva = precio * 0.05;
      break;
    case "superreducidoB":
      iva = precio * 0.04;
      break;
    case "superreducidoC":
      iva = 0;
      break;
    default:
      throw new Error("Tipo de IVA no válido");
  }

  return iva;
};

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
  const resultado: ResultadoLineaTicket[] = productos.reduce(
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

export const calculoTotalIva = (): number => {
  const totalConIva = calculoTotalConIva(resultadoLineaTicket);
  const totalSinIva = calculoTotalSinIva(resultadoLineaTicket);
  const totalIva = totalConIva - totalSinIva;
  const totalIvaRedondeado = Number(totalIva.toFixed(2));
  return totalIvaRedondeado;
};

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

export const calculoTotalPorTipoDeIva = (
  resultadoLineaTicket: ResultadoLineaTicket[]
): TotalPorTipoIva[] => {
  const resultado = resultadoLineaTicket.reduce(
    (acumulador: TotalPorTipoIva[], resultado) => {
      const iva = calcularImporteDeIva(
        resultado.precioConIva,
        resultado.tipoIva
      );
      const cuantia = Number((iva * resultado.cantidad).toFixed(2));

      const tipoDeIvaEncontrado = acumulador.find(
        (item) => item.tipoIva === resultado.tipoIva
      );

      if (tipoDeIvaEncontrado) {
        tipoDeIvaEncontrado.cuantia += cuantia;
      } else {
        acumulador.push({
          tipoIva: resultado.tipoIva,
          cuantia: cuantia,
        });
      }

      return acumulador;
    },
    []
  );
  return resultado;
};

console.log(calculoTotalPorTipoDeIva(resultadoLineaTicket));
