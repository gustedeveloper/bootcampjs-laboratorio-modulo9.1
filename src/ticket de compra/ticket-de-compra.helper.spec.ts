import { calcularImporteDeIva } from "./ticket-de-compra.helper";

describe("calcularImporteDeIva", () => {
  it("precio 40, iva general, devolver 8.4"),
    () => {
      // Arrange
      const precio = 40;
      const tipoIva = "general";

      // Act
      const resultado = calcularImporteDeIva(precio, tipoIva);

      // Assert
      const expected = 8.4;
      expect(resultado).toBe(expected);
    };
  it("precio 32.54, iva general, devolver 6.83"),
    () => {
      // Arrange
      const precio = 32.54;
      const tipoIva = "general";

      // Act
      const resultado = calcularImporteDeIva(precio, tipoIva);

      // Assert
      const expected = 6.83;
      expect(resultado).toBe(expected);
    };
});
