// ============================================================
// lib/dal/errors.ts
// Errores de dominio del DAL.
//
// El DAL lanza estos errores tipados cuando una operación viola
// una regla de negocio o de seguridad. La Server Action los
// captura y los traduce a un Result<T> con su código estable
// (ver skill resultado-actions). Así el cliente nunca recibe un
// stack ni detalles internos.
//
// NotFoundError  → el recurso no existe (o no es del jardín de la
//                  sesión, que para el cliente es lo mismo: no se
//                  revela su existencia).
// ForbiddenError → el recurso existe pero pertenece a otro jardín;
//                  se bloquea por aislamiento (CU-09).
// ============================================================

export class ValidationError extends Error {
  constructor(message = "Datos inválidos") {
    super(message);
    this.name = "ValidationError";
  }
}

export class NotFoundError extends Error {
  constructor(message = "Recurso no encontrado") {
    super(message);
    this.name = "NotFoundError";
  }
}

export class ForbiddenError extends Error {
  constructor(message = "No tienes permiso sobre este recurso") {
    super(message);
    this.name = "ForbiddenError";
  }
}
