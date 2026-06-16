// ============================================================
// components/public/FormularioContacto.tsx
// CU-04 · Formulario de contacto del jardín. CLIENT COMPONENT.
//
// Campos: nombre(*), email(*), teléfono y asunto (opcionales),
// mensaje(*). Llama a la Server Action enviarMensaje(slug, formData):
//   · ok          → confirmación verde y limpia el formulario.
//   · VALIDATION  → marca en rojo los obligatorios vacíos y muestra el
//                   mensaje del servidor (conserva lo escrito).
//   · INTERNAL    → error general (conserva lo escrito).
//
// El acento usa var(--jardin-primario), inyectada por el layout.
// ============================================================
"use client";

import { useState } from "react";
import { Send, Loader2, CheckCircle2 } from "lucide-react";

import { enviarMensaje } from "@/lib/actions/contacto.actions";

interface Valores {
  nombre: string;
  email: string;
  telefono: string;
  asunto: string;
  mensaje: string;
}

const VACIO: Valores = {
  nombre: "",
  email: "",
  telefono: "",
  asunto: "",
  mensaje: "",
};

type Estado = "idle" | "enviando" | "ok" | "error";

export default function FormularioContacto({ slug }: { slug: string }) {
  const [valores, setValores] = useState<Valores>(VACIO);
  const [estado, setEstado] = useState<Estado>("idle");
  const [errorGeneral, setErrorGeneral] = useState<string | null>(null);
  // Campos obligatorios marcados en rojo.
  const [invalidos, setInvalidos] = useState<Set<keyof Valores>>(new Set());

  function actualizar(campo: keyof Valores, valor: string) {
    setValores((v) => ({ ...v, [campo]: valor }));
    // Limpia la marca de error del campo al escribir.
    if (invalidos.has(campo)) {
      setInvalidos((prev) => {
        const next = new Set(prev);
        next.delete(campo);
        return next;
      });
    }
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrorGeneral(null);

    // Validación previa: obligatorios no vacíos.
    const faltantes = new Set<keyof Valores>();
    (["nombre", "email", "mensaje"] as const).forEach((c) => {
      if (!valores[c].trim()) faltantes.add(c);
    });
    if (faltantes.size > 0) {
      setInvalidos(faltantes);
      setEstado("error");
      setErrorGeneral("Completa los campos obligatorios.");
      return;
    }

    setEstado("enviando");

    const formData = new FormData();
    formData.set("nombre", valores.nombre);
    formData.set("email", valores.email);
    formData.set("telefono", valores.telefono);
    formData.set("asunto", valores.asunto);
    formData.set("mensaje", valores.mensaje);

    const res = await enviarMensaje(slug, formData);

    if (res.ok) {
      setEstado("ok");
      setValores(VACIO);
      setInvalidos(new Set());
      return;
    }

    setEstado("error");
    setErrorGeneral(res.error);
    // VALIDATION: resalta los obligatorios vacíos (p. ej. correo mal formado).
    if (res.code === "VALIDATION") {
      const faltan = new Set<keyof Valores>();
      (["nombre", "email", "mensaje"] as const).forEach((c) => {
        if (!valores[c].trim()) faltan.add(c);
      });
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valores.email)) faltan.add("email");
      setInvalidos(faltan);
    }
  }

  // Confirmación verde tras enviar (CU-04, paso 5).
  if (estado === "ok") {
    return (
      <div className="flex flex-col items-center rounded-2xl border border-olivo/40 bg-olivo/10 px-6 py-12 text-center">
        <CheckCircle2 size={48} className="text-olivo" />
        <h3 className="font-titulo mt-4 text-xl font-bold text-marron">
          ¡Mensaje enviado correctamente!
        </h3>
        <p className="mt-2 text-sm text-marron-suave">
          Gracias por escribirnos. Te responderemos lo antes posible.
        </p>
        <button
          type="button"
          onClick={() => setEstado("idle")}
          className="mt-6 inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold text-white shadow transition hover:brightness-95"
          style={{ backgroundColor: "var(--jardin-primario)" }}
        >
          Enviar otro mensaje
        </button>
      </div>
    );
  }

  const claseInput = (campo: keyof Valores) =>
    `w-full rounded-xl border bg-white px-4 py-2.5 text-marron outline-none transition focus:ring-2 ${
      invalidos.has(campo)
        ? "border-error focus:ring-error/30"
        : "border-arena focus:border-[color:var(--jardin-primario)] focus:ring-[color:var(--jardin-primario)]/20"
    }`;

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-4">
      {errorGeneral && (
        <p className="rounded-xl bg-error/10 px-4 py-3 text-sm font-medium text-error">
          {errorGeneral}
        </p>
      )}

      <div>
        <label htmlFor="nombre" className="mb-1 block text-sm font-medium text-marron">
          Nombre <span className="text-error">*</span>
        </label>
        <input
          id="nombre"
          type="text"
          value={valores.nombre}
          onChange={(e) => actualizar("nombre", e.target.value)}
          className={claseInput("nombre")}
          autoComplete="name"
        />
      </div>

      <div>
        <label htmlFor="email" className="mb-1 block text-sm font-medium text-marron">
          Correo <span className="text-error">*</span>
        </label>
        <input
          id="email"
          type="email"
          value={valores.email}
          onChange={(e) => actualizar("email", e.target.value)}
          className={claseInput("email")}
          autoComplete="email"
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="telefono" className="mb-1 block text-sm font-medium text-marron">
            Teléfono
          </label>
          <input
            id="telefono"
            type="tel"
            value={valores.telefono}
            onChange={(e) => actualizar("telefono", e.target.value)}
            className={claseInput("telefono")}
            autoComplete="tel"
          />
        </div>
        <div>
          <label htmlFor="asunto" className="mb-1 block text-sm font-medium text-marron">
            Asunto
          </label>
          <input
            id="asunto"
            type="text"
            value={valores.asunto}
            onChange={(e) => actualizar("asunto", e.target.value)}
            className={claseInput("asunto")}
          />
        </div>
      </div>

      <div>
        <label htmlFor="mensaje" className="mb-1 block text-sm font-medium text-marron">
          Mensaje <span className="text-error">*</span>
        </label>
        <textarea
          id="mensaje"
          rows={5}
          value={valores.mensaje}
          onChange={(e) => actualizar("mensaje", e.target.value)}
          className={`${claseInput("mensaje")} resize-y`}
        />
      </div>

      <button
        type="submit"
        disabled={estado === "enviando"}
        className="inline-flex w-full items-center justify-center gap-2 rounded-xl px-5 py-3 font-semibold text-white shadow transition hover:brightness-95 disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
        style={{ backgroundColor: "var(--jardin-primario)" }}
      >
        {estado === "enviando" ? (
          <>
            <Loader2 size={18} className="animate-spin" /> Enviando…
          </>
        ) : (
          <>
            <Send size={18} /> Enviar mensaje
          </>
        )}
      </button>
    </form>
  );
}
