/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Optional: prefill admin auth form in local `.env` (not committed). */
  readonly VITE_AUTH_PREFILL_EMAIL?: string;
  readonly VITE_AUTH_PREFILL_PASSWORD?: string;
}
