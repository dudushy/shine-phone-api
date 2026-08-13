import { Component, OnInit, inject, signal } from '@angular/core';
import { DebugService } from '@shyland-dev/utils';
import { TranslateModule } from '@ngx-translate/core';
import { GrowattApiService, PlantEnergyOverview, Plant, GrowattApiError, API_ERROR_CODES } from '@shine-phone-api';

@Component({
  selector: 'spa-dashboard',
  imports: [TranslateModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard implements OnInit {
  private debugService = inject(DebugService);
  private growattApi = inject(GrowattApiService);

  readonly plants = signal<Plant[]>([]);
  readonly energyOverview = signal<PlantEnergyOverview | null>(null);
  readonly isLoading = signal(true);
  readonly error = signal<string | null>(null);

  ngOnInit(): void {
    this.debugService.log(this);
    this.loadData();
  }

  private loadData(): void {
    this.isLoading.set(true);
    this.error.set(null);

    this.growattApi.getPlantList().subscribe({
      next: (response) => {
        this.debugService.log(this, 'plants loaded', response);
        this.plants.set(response.data?.plants ?? []);

        // Carregar overview da primeira planta
        if (response.data?.plants?.length) {
          this.loadEnergyOverview(response.data.plants[0].plant_id.toString());
        } else {
          this.isLoading.set(false);
        }
      },
      error: (err) => {
        this.debugService.log(this, 'error loading plants', err);
        if (err instanceof GrowattApiError) {
          this.error.set(API_ERROR_CODES[err.errorCode] ?? 'common.error');
        } else {
          this.error.set('dashboard.error_loading');
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
        this.isLoading.set(false);
      },
      error: (err) => {
        this.debugService.log(this, 'error loading energy overview', err);
        if (err instanceof GrowattApiError) {
          this.error.set(API_ERROR_CODES[err.errorCode] ?? 'common.error');
        } else {
          this.error.set('dashboard.error_loading');
        }
        this.isLoading.set(false);
      },
    });
  }
}
