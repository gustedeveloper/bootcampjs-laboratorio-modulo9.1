import { calcularEntrada, calcularCambio } from "./cambio.helper";
import { Cambio } from "./model";

// Calculando una entrada

describe("calcularEntrada", () => {
  it("debería devolver un throw si los parámetros de entrada son undefined", () => {
    // Arrange
    const cantidad: any = undefined;
    const billeteModeda: any = undefined;

    // Act
    const result = () => calcularEntrada(cantidad, billeteModeda);

    // Assert
    expect(result).toThrowError("Los parámetros introducidos no son correctos");
  });

  it("debería devolver un throw si los parámetros de entrada son null", () => {
    // Arrange
    const cantidad: any = null;
    const billeteModeda: any = null;

    // Act
    const result = () => calcularEntrada(cantidad, billeteModeda);

    // Assert
    expect(result).toThrowError("Los parámetros introducidos no son correctos");
  });

  it("debería decirme que tengo que devolver 0 billetes de 50 y que me queda 2.5€ por devolver", () => {
    // Arrange
    const cantidad = 2.5;
    const billeteModeda = 50;

    // Act
    const result = calcularEntrada(cantidad, billeteModeda);

    // Assert
    const expected = { cuantos: 0, restoCantidad: 2.5 };
    expect(result).toEqual(expected);
  });

  it("2.25 a devolver, 2 moneda ==> { cuantos: 1, restoCantidad: 0.5 }", () => {
    // Arrange
    const cantidad = 2.25;
    const billeteModeda = 2;

    // Act
    const result = calcularEntrada(cantidad, billeteModeda);

    // Assert
    const expected = { cuantos: 1, restoCantidad: 0.25 };
    expect(result).toEqual(expected);
  });

  it("7.25 a devolver, 5 billete ==> { cuantos: 1, restoCantidad: 2.25 }", () => {
    // Arrange
    const cantidad = 7.25;
    const billeteModeda = 5;

    // Act
    const result = calcularEntrada(cantidad, billeteModeda);

    // Assert
    const expected = { cuantos: 1, restoCantidad: 2.25 };
    expect(result).toEqual(expected);
  });

  it("10 a devolver, 10 billete ==> { cuantos: 1, restoCantidad: 0}", () => {
    // Arrange
    const cantidad = 10;
    const billeteModeda = 10;

    // Act
    const result = calcularEntrada(cantidad, billeteModeda);

    // Assert
    const expected = { cuantos: 1, restoCantidad: 0 };
    expect(result).toEqual(expected);
  });

  it("14.75 a devolver, 20 billete ==> { cuantos: 0, restoCantidad: 14.75}", () => {
    // Arrange
    const cantidad = 14.75;
    const billeteModeda = 20;

    // Act
    const result = calcularEntrada(cantidad, billeteModeda);

    // Assert
    const expected = { cuantos: 0, restoCantidad: 14.75 };
    expect(result).toEqual(expected);
  });

  it("23.25 a devolver, 20 billete ==> { cuantos: 1, restoCantidad: 3.24}", () => {
    // Arrange
    const cantidad = 23.25;
    const billeteModeda = 20;

    // Act
    const result = calcularEntrada(cantidad, billeteModeda);

    // Assert
    const expected = { cuantos: 1, restoCantidad: 3.25 };
    expect(result).toEqual(expected);
  });
});

// Calculando el cambio completo

describe("calcularCambio", () => {
  it("debería devolver un throw si los parámetros de entrada son undefined", () => {
    // Arrange
    const compra: any = undefined;
    const pago: any = undefined;

    // Act
    const result = () => calcularCambio(compra, pago);

    // Assert
    expect(result).toThrowError("Los parámetros introducidos no son correctos");
  });

  it("debería devolver un throw si los parámetros de entrada son null", () => {
    // Arrange
    const compra: any = null;
    const pago: any = null;

    // Act
    const result = () => calcularCambio(compra, pago);

    // Assert
    expect(result).toThrowError("Los parámetros introducidos no son correctos");
  });

  it("compra 2.5€, pago 50€ ==> cambio [{billeteMoneda: 20, cuantos: 2}, {billeteMoneda: 5, cuantos: 1}, {billeteMoneda: 1, cuantos: 2}, {billeteMoneda: 0.50, cuantos: 1}] ", () => {
    // Arrange
    const compra = 2.5;
    const pago = 50;

    // Act
    const result = calcularCambio(compra, pago);

    // Assert
    const expected: Cambio[] = [
      { billeteMoneda: 20, cuantos: 2 },
      { billeteMoneda: 5, cuantos: 1 },
      { billeteMoneda: 2, cuantos: 1 },
      { billeteMoneda: 0.5, cuantos: 1 },
    ];
    expect(result).toEqual(expected);
  });

  it("compra 4.82€, pago 5.32€ ==> cambio [{billeteMoneda: 0.5, cuantos: 1}]", () => {
    // Arrange
    const compra = 4.82;
    const pago = 5.32;

    // Act
    const result = calcularCambio(compra, pago);

    // Assert
    const expected: Cambio[] = [{ billeteMoneda: 0.5, cuantos: 1 }];
    expect(result).toEqual(expected);
  });

  it("compra 2€, pago 6€ ==> cambio [{billeteMoneda: 2, cuantos: 2}]", () => {
    // Arrange
    const compra = 2;
    const pago = 6;

    // Act
    const result = calcularCambio(compra, pago);

    // Assert
    const expected: Cambio[] = [{ billeteMoneda: 2, cuantos: 2 }];
    expect(result).toEqual(expected);
  });
  it("compra 32.43€, pago 40€ ==> cambio [{billeteMoneda: 2, cuantos: 2}]", () => {
    // Arrange
    const compra = 32.43;
    const pago = 40;

    // Act
    const result = calcularCambio(compra, pago);

    // Assert
    const expected: Cambio[] = [
      { billeteMoneda: 5, cuantos: 1 },
      { billeteMoneda: 2, cuantos: 1 },
      { billeteMoneda: 0.5, cuantos: 1 },
      { billeteMoneda: 0.05, cuantos: 1 },
      { billeteMoneda: 0.02, cuantos: 1 },
    ];
    expect(result).toEqual(expected);
  });
});
