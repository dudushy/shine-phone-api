import { DeviceType } from '../types';

// Mapeamento de tipos de dispositivos

export const DEVICE_TYPE_LABELS: Record<DeviceType, string> = {
  [DeviceType.MIN]: 'MIN (TLX)',
  [DeviceType.SPH]: 'SPH (MIX)',
};

export const DEVICE_TYPE_DESCRIPTIONS: Record<DeviceType, string> = {
  [DeviceType.MIN]: 'Inversor string - geração solar direta para a rede',
  [DeviceType.SPH]: 'Inversor híbrido - geração solar com armazenamento em bateria',
};
