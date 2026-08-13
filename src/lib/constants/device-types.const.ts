import { DeviceType } from '../types';

// Mapeamento de tipos de dispositivos

export const DEVICE_TYPE_LABELS: Partial<Record<DeviceType, string>> = {
  [DeviceType.INVERTER]: 'Inverter',
  [DeviceType.ENERGY_STORAGE]: 'Energy Storage',
  [DeviceType.OTHER]: 'Other',
  [DeviceType.MAX]: 'MAX',
  [DeviceType.SPH]: 'SPH (MIX)',
  [DeviceType.SPA]: 'SPA',
  [DeviceType.MIN]: 'MIN (TLX)',
  [DeviceType.PCS]: 'PCS',
  [DeviceType.HPS]: 'HPS',
  [DeviceType.PBD]: 'PBD',
};

export const DEVICE_TYPE_DESCRIPTIONS: Partial<Record<DeviceType, string>> = {
  [DeviceType.MIN]: 'Inversor string - geração solar direta para a rede',
  [DeviceType.SPH]: 'Inversor híbrido - geração solar com armazenamento em bateria',
};
