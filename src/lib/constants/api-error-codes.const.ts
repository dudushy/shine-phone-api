// Códigos de erro conhecidos da API Growatt

export const API_ERROR_CODES: Record<number, string> = {
  0: 'api_errors.success',
  10001: 'api_errors.invalid_token',
  10002: 'api_errors.token_expired',
  10003: 'api_errors.invalid_parameter',
  10004: 'api_errors.device_not_found',
  10005: 'api_errors.plant_not_found',
  10006: 'api_errors.permission_denied',
  10007: 'api_errors.internal_error',
  10008: 'api_errors.service_unavailable',
  10009: 'api_errors.request_timeout',
  10010: 'api_errors.invalid_request',
  10011: 'api_errors.data_not_found',
  10012: 'api_errors.frequently_access',
} as const;
