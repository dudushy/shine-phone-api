import { Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { DebugService } from '@shyland-dev/utils';
import { TranslateModule } from '@ngx-translate/core';
import { GrowattApiService, GrowattApiError, API_ERROR_CODES, MinDetail, SphDetail } from '@shine-phone-api';

@Component({
  selector: 'spa-device-detail',
  imports: [RouterLink, TranslateModule],
  templateUrl: './device-detail.html',
  styleUrl: './device-detail.scss',
})
export class DeviceDetail implements OnInit {
  private debugService = inject(DebugService);
  private growattApi = inject(GrowattApiService);
  private route = inject(ActivatedRoute);

  readonly deviceData = signal<MinDetail | SphDetail | null>(null);
  readonly deviceType = signal<number>(0);
  readonly isLoading = signal(true);
  readonly error = signal<string | null>(null);
  readonly deviceSn = signal<string>('');

  ngOnInit(): void {
    this.debugService.log(this);
    const sn = this.route.snapshot.paramMap.get('sn');

    if (sn) {
      this.deviceSn.set(sn);
      this.findDeviceType(sn);
    }
  }

  private findDeviceType(sn: string): void {
    this.isLoading.set(true);

    // Buscar plantas e depois devices para descobrir o tipo
    this.growattApi.getPlantList().subscribe({
      next: (response) => {
        const plants = response.data.plants ?? [];
        if (plants.length) {
          this.growattApi.getDeviceList(plants[0].plant_id.toString()).subscribe({
            next: (devResponse) => {
              const devices = devResponse.data.devices ?? [];
              const device = devices.find((d) => d.device_sn === sn);
              if (device) {
                this.deviceType.set(device.type);
                this.loadDeviceData(sn, device.type);
              } else {
                this.error.set('devices.error_loading_detail');
                this.isLoading.set(false);
              }
            },
            error: (err) => {
              this.handleError(err);
            },
          });
        }
      },
      error: (err) => {
        this.handleError(err);
      },
    });
  }

  private loadDeviceData(sn: string, type: number): void {
    if (type === 7) {
      // MIN (TLX)
      this.growattApi.getMinDetail(sn).subscribe({
        next: (response) => {
          this.debugService.log(this, 'min detail loaded', response);
          this.deviceData.set(response.data);
          this.isLoading.set(false);
        },
        error: (err) => this.handleError(err),
      });
    } else if (type === 5) {
      // SPH (MIX)
      this.growattApi.getSphDetail(sn).subscribe({
        next: (response) => {
          this.debugService.log(this, 'sph detail loaded', response);
          this.deviceData.set(response.data);
          this.isLoading.set(false);
        },
        error: (err) => this.handleError(err),
      });
    } else {
      // Tipo não suportado ainda
      this.error.set('devices.error_loading_detail');
      this.isLoading.set(false);
    }
  }

  private handleError(err: unknown): void {
    this.debugService.log(this, 'error', err);
    if (err instanceof GrowattApiError) {
      this.error.set(API_ERROR_CODES[err.errorCode] ?? 'common.error');
    } else {
      this.error.set('devices.error_loading_detail');
    }
    this.isLoading.set(false);
  }
}
