import { Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { DebugService } from '@shyland-dev/utils';
import { TranslateModule } from '@ngx-translate/core';
import { GrowattApiService, PlantDetails, PlantEnergyOverview, Device } from '@shine-phone-api';

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

  readonly plant = signal<PlantDetails | null>(null);
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

    this.growattApi.getPlantDetails(plantId).subscribe({
      next: (response) => {
        this.debugService.log(this, 'plant details loaded', response);
        this.plant.set(response.data);
        this.loadEnergyOverview(plantId);
        this.loadDevices(plantId);
      },
      error: (err) => {
        this.debugService.log(this, 'error', err);
        this.error.set('plants.error_loading_detail');
        this.isLoading.set(false);
      },
    });
  }

  private loadEnergyOverview(plantId: string): void {
    this.growattApi.getPlantEnergyOverview(plantId).subscribe({
      next: (response) => {
        this.energyOverview.set(response.data);
      },
      error: (err) => {
        this.debugService.log(this, 'error loading overview', err);
      },
    });
  }

  private loadDevices(plantId: string): void {
    this.growattApi.getDeviceList(plantId).subscribe({
      next: (response) => {
        this.debugService.log(this, 'devices loaded', response);
        this.devices.set(response.data ?? []);
        this.isLoading.set(false);
      },
      error: (err) => {
        this.debugService.log(this, 'error loading devices', err);
        this.isLoading.set(false);
      },
    });
  }
}
