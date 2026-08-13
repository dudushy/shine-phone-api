import { Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { DebugService } from '@shyland-dev/utils';
import { TranslateModule } from '@ngx-translate/core';
import {
  GrowattApiService,
  Plant,
  PlantEnergyOverview,
  Device,
  GrowattApiError,
  API_ERROR_CODES,
} from '@shine-phone-api';

@Component({
  selector: 'spa-plant-detail',
  imports: [RouterLink, TranslateModule],
  templateUrl: './plant-detail.html',
  styleUrl: './plant-detail.scss',
})
export class PlantDetail implements OnInit {
  private debugService = inject(DebugService);
  private growattApi = inject(GrowattApiService);
  private route = inject(ActivatedRoute);

  readonly plant = signal<Plant | null>(null);
  readonly energyOverview = signal<PlantEnergyOverview | null>(null);
  readonly devices = signal<Device[]>([]);
  readonly isLoading = signal(true);
  readonly error = signal<string | null>(null);

  ngOnInit(): void {
    this.debugService.log(this);
    const plantId = this.route.snapshot.paramMap.get('id');

    if (plantId) {
      this.loadPlantData(plantId);
    }
  }

  private loadPlantData(plantId: string): void {
    this.isLoading.set(true);

    // Buscar planta da lista (a API não tem endpoint separado de detalhes)
    this.growattApi.getPlantList().subscribe({
      next: (response) => {
        this.debugService.log(this, 'plant list loaded', response);
        const plant = response.data?.plants?.find((p) => p.plant_id.toString() === plantId);
        if (plant) {
          this.plant.set(plant);
          this.loadEnergyOverview(plantId);
          this.loadDevices(plantId);
        } else {
          this.error.set('plants.error_not_found');
          this.isLoading.set(false);
        }
      },
      error: (err) => {
        this.debugService.log(this, 'error', err);
        if (err instanceof GrowattApiError) {
          this.error.set(API_ERROR_CODES[err.errorCode] ?? 'common.error');
        } else {
          this.error.set('plants.error_loading_detail');
        }
        this.isLoading.set(false);
      },
    });
  }

  private loadEnergyOverview(plantId: string): void {
    this.growattApi.getPlantEnergyOverview(plantId).subscribe({
      next: (response) => {
        this.debugService.log(this, 'energy overview loaded', response);
        this.energyOverview.set(response.data);
      },
      error: (err) => {
        this.debugService.log(this, 'error loading overview', err);
        if (err instanceof GrowattApiError) {
          this.error.set(API_ERROR_CODES[err.errorCode] ?? 'common.error');
        }
      },
    });
  }

  private loadDevices(plantId: string): void {
    this.growattApi.getDeviceList(plantId).subscribe({
      next: (response) => {
        this.debugService.log(this, 'devices loaded', response);
        this.devices.set(response.data?.devices ?? []);
        this.isLoading.set(false);
      },
      error: (err) => {
        this.debugService.log(this, 'error loading devices', err);
        if (err instanceof GrowattApiError) {
          this.error.set(API_ERROR_CODES[err.errorCode] ?? 'common.error');
        }
        this.isLoading.set(false);
      },
    });
  }
}
