// ============================================================
// lib/validations/contacto.ts
// Validación del formulario de contacto público (CU-04) con zod.
//
// Obligatorios: nombre, correo (formato válido) y mensaje.
// Opcionales: teléfono y asunto (se guardan como null si van
// vacíos). No se aceptan mensajes vacíos ni correos mal formados.
// ============================================================
import { z } from "zod";

// Campo de texto opcional: "" o ausente → null en la BD.
const opcional = (max: number, etiqueta: string) =>
  z
    .string()
    .trim()
    .max(max, `${etiqueta} admite máximo ${max} caracteres`)
    .optional()
    .transform((v) => (v && v.length > 0 ? v : null));

export const contactoSchema = z.object({
  nombre: z
    .string()
    .trim()
    .min(1, "El nombre es obligatorio")
    .max(120, "El nombre admite máximo 120 caracteres"),
  email: z
    .string()
    .trim()
    .min(1, "El correo es obligatorio")
    .email("Ingresa un correo válido")
    .max(120, "El correo admite máximo 120 caracteres"),
  telefono: opcional(30, "El teléfono"),
  asunto: opcional(120, "El asunto"),
  mensaje: z.string().trim().min(1, "El mensaje es obligatorio"),
});

export type ContactoInput = z.infer<typeof contactoSchema>;
