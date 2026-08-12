import { Component, OnInit, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DebugService } from '@shyland-dev/utils';
import { TranslateModule } from '@ngx-translate/core';
import { GrowattApiService, Plant, Device, DEVICE_TYPE_LABELS } from '@shine-phone-api';
import { DeviceType } from '@shine-phone-api';

@Component({
  selector: 'spa-devices',
  imports: [RouterLink, TranslateModule],
  templateUrl: './devices.html',
  styleUrl: './devices.scss',
})
export class Devices implements OnInit {
  private debugService = inject(DebugService);
  private growattApi = inject(GrowattApiService);

  readonly plants = signal<Plant[]>([]);
  readonly devices = signal<Device[]>([]);
  readonly isLoading = signal(true);
  readonly error = signal<string | null>(null);

  ngOnInit(): void {
    this.debugService.log(this);
    this.loadPlants();
  }

  getDeviceTypeLabel(type: DeviceType): string {
    return DEVICE_TYPE_LABELS[type] ?? 'Unknown';
  }

  private loadPlants(): void {
    this.isLoading.set(true);

    this.growattApi.getPlantList().subscribe({
      next: (response) => {
        this.plants.set(response.data ?? []);

        if (response.data?.length) {
          this.loadDevicesForPlant(response.data[0].plant_id);
        } else {
          this.isLoading.set(false);
        }
      },
      error: (err) => {
        this.debugService.log(this, 'error', err);
        this.error.set('devices.error_loading');
        this.isLoading.set(false);
      },
    });
  }

  private loadDevicesForPlant(plantId: string): void {
    this.growattApi.getDeviceList(plantId).subscribe({
      next: (response) => {
        this.debugService.log(this, 'devices loaded', response);
        this.devices.set(response.data ?? []);
        this.isLoading.set(false);
      },
      error: (err) => {
        this.debugService.log(this, 'error loading devices', err);
        this.error.set('devices.error_loading');
        this.isLoading.set(false);
      },
    });
  }
}
