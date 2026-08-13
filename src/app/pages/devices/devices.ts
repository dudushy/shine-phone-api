import { Component, OnInit, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DebugService } from '@shyland-dev/utils';
import { TranslateModule } from '@ngx-translate/core';
import { GrowattApiService, GrowattApiError, API_ERROR_CODES, Device } from '@shine-phone-api';

@Component({
  selector: 'spa-devices',
  imports: [RouterLink, TranslateModule],
  templateUrl: './devices.html',
  styleUrl: './devices.scss',
})
export class Devices implements OnInit {
  private debugService = inject(DebugService);
  private growattApi = inject(GrowattApiService);

  readonly devices = signal<Device[]>([]);
  readonly isLoading = signal(true);
  readonly error = signal<string | null>(null);

  // Mapeamento de tipos de dispositivos
  readonly deviceTypeLabels: Record<number, string> = {
    1: 'Inverter',
    2: 'Energy Storage',
    3: 'Other',
    4: 'MAX',
    5: 'SPH (Hybrid)',
    6: 'SPA',
    7: 'MIN (String)',
    8: 'PCS',
    9: 'HPS',
    10: 'PBD',
  };

  // Mapeamento de status
  readonly statusLabels: Record<number, string> = {
    0: 'Desconectado',
    1: 'Online',
    2: 'Standby',
    3: 'Falha',
  };

  ngOnInit(): void {
    this.debugService.log(this);
    this.loadDevices();
  }

  getDeviceTypeLabel(type: number): string {
    return this.deviceTypeLabels[type] ?? 'Unknown';
  }

  getStatusLabel(status: number): string {
    return this.statusLabels[status] ?? 'Offline';
  }

  getStatusClass(device: Device): string {
    if (device.lost) return 'status--disconnected';
    switch (device.status) {
      case 1:
        return 'status--online';
      case 2:
        return 'status--standby';
      case 3:
        return 'status--fault';
      default:
        return 'status--disconnected';
    }
  }

  private loadDevices(): void {
    this.isLoading.set(true);
    this.error.set(null);

    // Primeiro buscar plantas para pegar o plant_id
    this.growattApi.getPlantList().subscribe({
      next: (response) => {
        const plants = response.data.plants ?? [];
        if (plants.length) {
          this.loadDevicesForPlant(plants[0].plant_id.toString());
        } else {
          this.isLoading.set(false);
        }
      },
      error: (err) => {
        this.debugService.log(this, 'error', err);
        if (err instanceof GrowattApiError) {
          this.error.set(API_ERROR_CODES[err.errorCode] ?? 'common.error');
        } else {
          this.error.set('devices.error_loading');
        }
        this.isLoading.set(false);
      },
    });
  }

  private loadDevicesForPlant(plantId: string): void {
    this.growattApi.getDeviceList(plantId).subscribe({
      next: (response) => {
        this.debugService.log(this, 'devices loaded', response);
        this.devices.set(response.data.devices ?? []);
        this.isLoading.set(false);
      },
      error: (err) => {
        this.debugService.log(this, 'error loading devices', err);
        if (err instanceof GrowattApiError) {
          this.error.set(API_ERROR_CODES[err.errorCode] ?? 'common.error');
        } else {
          this.error.set('devices.error_loading');
        }
        this.isLoading.set(false);
      },
    });
  }
}
