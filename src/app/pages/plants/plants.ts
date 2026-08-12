import { Component, OnInit, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DebugService } from '@shyland-dev/utils';
import { TranslateModule } from '@ngx-translate/core';
import { GrowattApiService, Plant } from '@shine-phone-api';

@Component({
  selector: 'spa-plants',
  imports: [RouterLink, TranslateModule],
  templateUrl: './plants.html',
  styleUrl: './plants.scss',
})
export class Plants implements OnInit {
  private debugService = inject(DebugService);
  private growattApi = inject(GrowattApiService);

  readonly plants = signal<Plant[]>([]);
  readonly isLoading = signal(true);
  readonly error = signal<string | null>(null);

  ngOnInit(): void {
    this.debugService.log(this);
    this.loadPlants();
  }

  private loadPlants(): void {
    this.isLoading.set(true);

    this.growattApi.getPlantList().subscribe({
      next: (response) => {
        this.debugService.log(this, 'plants loaded', response);
        this.plants.set(response.data ?? []);
        this.isLoading.set(false);
      },
      error: (err) => {
        this.debugService.log(this, 'error', err);
        this.error.set('plants.error_loading');
        this.isLoading.set(false);
      },
    });
  }
}
