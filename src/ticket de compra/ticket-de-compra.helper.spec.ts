import {
  calcularImporteDeIva,
  calculaPrecioUnitarioSinIva,
} from "./ticket-de-compra.helper";

describe("calcularImporteDeIva", () => {
  // GENERAL
  it("precio 40, iva general, devolver 8.4", () => {
    // Arrange
    const precio = 40;
    const tipoIva = "general";

    // Act
    const resultado = calcularImporteDeIva(precio, tipoIva);

    // Assert
    const expected = 8.4;
    expect(resultado).toBe(expected);
  });

  it("precio 32.54, iva general, devolver 6.83", () => {
    // Arrange
    const precio = 32.54;
    const tipoIva = "general";

    // Act
    const resultado = calcularImporteDeIva(precio, tipoIva);

    // Assert
    const expected = 6.83;
    expect(resultado).toBe(expected);
  });

  // REDUCIDO

  it("precio 40, iva reducido, devolver 4", () => {
    // Arrange
    const precio = 40;
    const tipoIva = "reducido";

    // Act
    const resultado = calcularImporteDeIva(precio, tipoIva);

    // Assert
    const expected = 4;
    expect(resultado).toBe(expected);
  });

  it("precio 32.54, iva reducido, devolver 3.25", () => {
    // Arrange
    const precio = 32.54;
    const tipoIva = "reducido";

    // Act
    const resultado = calcularImporteDeIva(precio, tipoIva);

    // Assert
    const expected = 3.25;
    expect(resultado).toBe(expected);
  });

  // SUPER REDUCIDO A

  it("precio 40, iva superreducidoA, devolver 2", () => {
    // Arrange
    const precio = 40;
    const tipoIva = "superreducidoA";

    // Act
    const resultado = calcularImporteDeIva(precio, tipoIva);

    // Assert
    const expected = 2;
    expect(resultado).toBe(expected);
  });

  it("precio 32.54, iva superreducidoA, devolver 1.62", () => {
    // Arrange
    const precio = 31.54;
    const tipoIva = "superreducidoA";

    // Act
    const resultado = calcularImporteDeIva(precio, tipoIva);

    // Assert
    const expected = 1.58;
    expect(resultado).toEqual(expected);
  });

  // SUPER REDUCIDO B

  it("precio 40, iva superreducidoB, devolver 1.6", () => {
    // Arrange
    const precio = 40;
    const tipoIva = "superreducidoB";

    // Act
    const resultado = calcularImporteDeIva(precio, tipoIva);

    // Assert
    const expected = 1.6;
    expect(resultado).toBe(expected);
  });

  it("precio 32.54, iva superreducidoB, devolver 1.27", () => {
    // Arrange
    const precio = 31.54;
    const tipoIva = "superreducidoB";

    // Act
    const resultado = calcularImporteDeIva(precio, tipoIva);

    // Assert
    const expected = 1.26;
    expect(resultado).toEqual(expected);
  });

  // SUPER REDUCIDO C

  it("precio 40, iva superreducidoC, devolver 0", () => {
    // Arrange
    const precio = 40;
    const tipoIva = "superreducidoC";

    // Act
    const resultado = calcularImporteDeIva(precio, tipoIva);

    // Assert
    const expected = 0;
    expect(resultado).toBe(expected);
  });

  it("precio 32.54, iva superreducidoC, devolver 0", () => {
    // Arrange
    const precio = 31.54;
    const tipoIva = "superreducidoC";

    // Act
    const resultado = calcularImporteDeIva(precio, tipoIva);

    // Assert
    const expected = 0;
    expect(resultado).toEqual(expected);
  });

  // TIPO DE IVA NO VÁDIDO

  it("precio 32.54, iva superreducidoD, devolver error", () => {
    // Arrange
    const precio = 31.54;
    const tipoIva = "superreducidoD";

    // Act
    const resultado = () => calcularImporteDeIva(precio, tipoIva);

    // Assert
    expect(resultado).toThrowError("Tipo de IVA no válido");
  });
});

//

describe("calculaPrecioUnitarioSinIva", () => {
  it("debería calcular correctamente el precio sin IVA para tipo de IVA general", () => {
    // Arrange
    const precio = 32.54;
    const tipoIva = "general";

    // Act
    const resultado = calculaPrecioUnitarioSinIva(precio, tipoIva);

    // Assert
    const expected = 25.71;
    expect(resultado).toBe(expected);
  });

  it("debería calcular correctamente el precio sin IVA para tipo de IVA reducido", () => {
    // Arrange
    const precio = 32.54;
    const tipoIva = "reducido";

    // Act
    const resultado = calculaPrecioUnitarioSinIva(precio, tipoIva);

    // Assert
    const expected = 29.29;
    expect(resultado).toBe(expected);
  });

  it("debería calcular correctamente el precio sin IVA para tipo de IVA superreducidoA", () => {
    // Arrange
    const precio = 32.54;
    const tipoIva = "superreducidoA";

    // Act
    const resultado = calculaPrecioUnitarioSinIva(precio, tipoIva);

    // Assert
    const expected = 30.91;
    expect(resultado).toBe(expected);
  });

  it("debería calcular correctamente el precio sin IVA para tipo de IVA superreducidoB", () => {
    // Arrange
    const precio = 32.54;
    const tipoIva = "superreducidoB";

    // Act
    const resultado = calculaPrecioUnitarioSinIva(precio, tipoIva);

    // Assert
    const expected = 31.24;
    expect(resultado).toBe(expected);
  });

  it("debería calcular correctamente el precio sin IVA para tipo de IVA superreducidoC (IVA 0%)", () => {
    // Arrange
    const precio = 32.54;
    const tipoIva = "superreducidoC";

    // Act
    const resultado = calculaPrecioUnitarioSinIva(precio, tipoIva);

    // Assert
    const expected = 32.54;
    expect(resultado).toBe(expected);
  });
});
