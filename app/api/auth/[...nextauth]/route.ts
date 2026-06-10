// Expone los endpoints de Auth.js (/api/auth/*).
import { handlers } from "@/lib/auth";

export const { GET, POST } = handlers;
