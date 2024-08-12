import { Cambio, arrayBilletesMonedas } from "./model";

// Calculando una entrada

export interface Resultado {
  cuantos: number;
  restoCantidad: number;
}

export const calcularEntrada = (
  cantidad: number,
  billeteMoneda: number
): Resultado => {
  if (!cantidad && !billeteMoneda) {
    throw new Error("Los parámetros introducidos no son correctos");
  }
  const cuantos = Math.floor(cantidad / billeteMoneda);
  const restoCantidad = cantidad % billeteMoneda;

  const resultado: Resultado = {
    cuantos: cuantos,
    restoCantidad: restoCantidad,
  };

  return resultado;
};

// Calculando el cambio completo

export const calcularCambio = (compra: number, pago: number): Cambio[] => {
  if (!compra || !pago) {
    throw new Error("Los parámetros introducidos no son correctos");
  }

  let cambioRestante = pago - compra;

  let resultado: Cambio[] = arrayBilletesMonedas.reduce(
    (acumulador: Cambio[], billeteMoneda: number) => {
      if (cambioRestante === 0) {
        return acumulador;
      }

      const { cuantos, restoCantidad } = calcularEntrada(
        cambioRestante,
        billeteMoneda
      );

      cambioRestante = restoCantidad;

      return cuantos > 0
        ? [...acumulador, { billeteMoneda: billeteMoneda, cuantos }]
        : acumulador;
    },
    []
  );

  return resultado;
};
