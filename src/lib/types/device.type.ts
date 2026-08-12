// Tipos relacionados a dispositivos (inversores)

export enum DeviceType {
  SPH = 5,
  MIN = 7,
}

export interface Device {
  device_sn: string;
  device_name: string;
  device_type: DeviceType;
  status: number;
  last_update_time: string;
}

export interface MinEnergy {
  pac: number;
  eac_today: number;
  eac_total: number;
  vpv1: number;
  vpv2: number;
  ipv1: number;
  ipv2: number;
  vac1: number;
  iac1: number;
  fac: number;
  temperature: number;
}

export interface MinDetail extends MinEnergy {
  device_sn: string;
  status: number;
  last_update_time: string;
  firmware_version: string;
  model: string;
  communication_version: string;
}

export interface MinEnergyHistory {
  time: string;
  pac: number;
  eac_today: number;
}

export interface SphEnergy {
  ppv: number;
  pac: number;
  pload: number;
  pbat: number;
  soc: number;
  eac_today: number;
  eac_total: number;
  echarge_today: number;
  edischarge_today: number;
  grid_import_today: number;
  grid_export_today: number;
}

export interface SphDetail extends SphEnergy {
  device_sn: string;
  status: number;
  last_update_time: string;
  firmware_version: string;
  model: string;
  communication_version: string;
}

export interface SphEnergyHistory {
  time: string;
  ppv: number;
  pac: number;
  soc: number;
  eac_today: number;
}

export interface DeviceParameter {
  parameter_id: string;
  value: unknown;
}
