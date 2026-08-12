import { Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { DebugService } from '@shyland-dev/utils';
import { TranslateModule } from '@ngx-translate/core';
import { GrowattApiService, MinDetail, SphDetail } from '@shine-phone-api';

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

  readonly minDetail = signal<MinDetail | null>(null);
  readonly sphDetail = signal<SphDetail | null>(null);
  readonly isLoading = signal(true);
  readonly error = signal<string | null>(null);
  readonly deviceSn = signal<string>('');

  ngOnInit(): void {
    this.debugService.log(this);
    const sn = this.route.snapshot.paramMap.get('sn');

    if (sn) {
      this.deviceSn.set(sn);
      this.loadDeviceDetail(sn);
    }
  }

  private loadDeviceDetail(sn: string): void {
    this.isLoading.set(true);

    // Tentar como MIN primeiro, depois como SPH
    this.growattApi.getMinDetail(sn).subscribe({
      next: (response) => {
        this.debugService.log(this, 'min detail loaded', response);
        this.minDetail.set(response.data);
        this.isLoading.set(false);
      },
      error: () => {
        // Se falhar como MIN, tentar como SPH
        this.loadSphDetail(sn);
      },
    });
  }

  private loadSphDetail(sn: string): void {
    this.growattApi.getSphDetail(sn).subscribe({
      next: (response) => {
        this.debugService.log(this, 'sph detail loaded', response);
        this.sphDetail.set(response.data);
        this.isLoading.set(false);
      },
      error: (err) => {
        this.debugService.log(this, 'error loading device detail', err);
        this.error.set('devices.error_loading_detail');
        this.isLoading.set(false);
      },
    });
  }
}
