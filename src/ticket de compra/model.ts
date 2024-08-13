// Producto

export type TipoIva =
  | "general" // 0.79
  | "reducido" // 0.9
  | "superreducidoA" // 0.95
  | "superreducidoB" // 0.96
  | "superreducidoC" // -
  | "sinIva"; // -

export interface Producto {
  nombre: string;
  precio: number;
  tipoIva: TipoIva;
}

// Línea de ticket

export interface LineaTicket {
  producto: Producto;
  cantidad: number;
}

// Ejemplo de entrada

export const productos: LineaTicket[] = [
  {
    producto: {
      nombre: "Legumbres",
      precio: 2,
      tipoIva: "general",
    },
    cantidad: 2,
  },
  {
    producto: {
      nombre: "Perfume",
      precio: 20,
      tipoIva: "general",
    },
    cantidad: 3,
  },
  {
    producto: {
      nombre: "Leche",
      precio: 1,
      tipoIva: "superreducidoC",
    },
    cantidad: 6,
  },
  {
    producto: {
      nombre: "Lasaña",
      precio: 5,
      tipoIva: "superreducidoA",
    },
    cantidad: 1,
  },
  {
    producto: {
      nombre: "Pan integral",
      precio: 1.5,
      tipoIva: "superreducidoC",
    },
    cantidad: 4,
  },
  {
    producto: {
      nombre: "Aceite de oliva virgen extra",
      precio: 4,
      tipoIva: "superreducidoA",
    },
    cantidad: 2,
  },
  {
    producto: {
      nombre: "Libro de cocina",
      precio: 15,
      tipoIva: "superreducidoB",
    },
    cantidad: 1,
  },
  {
    producto: {
      nombre: "Manzanas",
      precio: 3,
      tipoIva: "superreducidoC",
    },
    cantidad: 5,
  },
  {
    producto: {
      nombre: "Zapatos de cuero",
      precio: 50,
      tipoIva: "general",
    },
    cantidad: 1,
  },
  {
    producto: {
      nombre: "Queso manchego",
      precio: 6,
      tipoIva: "superreducidoC",
    },
    cantidad: 2,
  },
  {
    producto: {
      nombre: "Hortalizas",
      precio: 2.5,
      tipoIva: "superreducidoC",
    },
    cantidad: 4,
  },
];

// Resultado línea de ticket: Por cada producto queremos el nombre, la cantidad, el precio sin IVA, el tipo de IVA y el precio con IVA.

export interface ResultadoLineaTicket {
  nombre: string;
  cantidad: number;
  precioSinIva: number;
  tipoIva: TipoIva;
  precioConIva: number;
}

// Totales

export interface ResultadoTotalTicket {
  totalSinIva: number;
  totalConIva: number;
  totalIva: number;
}

export interface TotalPorTipoIva {
  tipoIva: TipoIva;
  cuantia: number;
}

export interface TicketFinal {
  lineas: ResultadoLineaTicket[];
  total: ResultadoTotalTicket;
  desgloseIva: TotalPorTipoIva[];
}
