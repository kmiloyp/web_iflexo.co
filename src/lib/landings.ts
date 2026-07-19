import type { Testimonial } from "@/components/landing/Testimonials";

// Testimonios representativos (anónimos con cargo · tipo de empresa · ciudad)
// mientras llegan los reales. Reemplazar por los verificados de Google/YouTube.
export const testimonials: Testimonial[] = [
  {
    quote:
      "Pasé de detener la máquina unas 10 veces por tiraje a menos de la mitad. La plancha se ve igual en el estante; se comporta distinto en la máquina.",
    name: "Jefe de producción",
    company: "Impresor de etiquetas",
    city: "Bogotá",
  },
  {
    quote:
      "Cuando comparamos el impreso con la prueba de color, el cliente aprobó sin discusión. Quedó igual a la prueba, es increíble.",
    name: "Gerente de planta",
    company: "Converter flexográfico",
    city: "Medellín",
  },
  {
    quote:
      "Los operarios ya piden la plancha amarilla. Con las otras sufren.",
    name: "Supervisor de impresión",
    company: "Empaque flexible",
    city: "Bogotá",
  },
];
