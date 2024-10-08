import {
  LineaTicket,
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

  return Number(iva.toFixed(2));
};

export const calculaPrecioUnitarioConIva = (
  precio: number,
  tipoIva: string
): number => {
  const importeIva = calcularImporteDeIva(precio, tipoIva);

  const precioConIva = precio + importeIva;

  const precioConIvaRedondeado = Number(precioConIva.toFixed(2));

  return precioConIvaRedondeado;
};

export const calcularResultadoLineaTicket = (
  productos: LineaTicket[]
): ResultadoLineaTicket[] => {
  const resultado: ResultadoLineaTicket[] = productos.reduce(
    (acumulador: ResultadoLineaTicket[], producto) => {
      const resultadoProducto: ResultadoLineaTicket = {
        nombre: producto.producto.nombre,
        cantidad: producto.cantidad,
        precioSinIva: producto.producto.precio,
        tipoIva: producto.producto.tipoIva,
        precioConIva: calculaPrecioUnitarioConIva(
          producto.producto.precio,
          producto.producto.tipoIva
        ),
      };
      acumulador.push(resultadoProducto);

      return acumulador;
    },
    []
  );
  return resultado;
};

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

export const calculoTotalIva = (
  resultadoLineaTicket: ResultadoLineaTicket[]
): number => {
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
    totalIva: calculoTotalIva(resultadoLineaTicket),
  };
  return resultadoTotalTicket;
};

export const calculoTotalPorTipoDeIva = (
  resultadoLineaTicket: ResultadoLineaTicket[]
): TotalPorTipoIva[] => {
  const resultado = resultadoLineaTicket.reduce(
    (acumulador: TotalPorTipoIva[], resultado) => {
      const iva = calcularImporteDeIva(
        resultado.precioSinIva,
        resultado.tipoIva
      );
      const cuantia = iva * resultado.cantidad;

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

  resultado.forEach((item) => {
    item.cuantia = Number(item.cuantia.toFixed(2));
  });
  return resultado;
};
