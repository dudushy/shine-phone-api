import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from '../../environments/environment';
import { API_ENDPOINTS } from '../../constants/api-endpoints.const';
import {
  ApiResponse,
  GrowattApiError,
  PaginatedResponse,
  EnergyHistoryParams,
  DeviceEnergyHistoryParams,
  ReadParameterParams,
  WriteParameterParams,
} from '../../types/api.type';
import { Plant, PlantDetails, PlantEnergyOverview, PlantEnergyHistory } from '../../types/plant.type';
import {
  Device,
  MinEnergy,
  MinDetail,
  MinEnergyHistory,
  SphEnergy,
  SphDetail,
  SphEnergyHistory,
  DeviceParameter,
} from '../../types/device.type';

@Injectable({ providedIn: 'root' })
export class GrowattApiService {
  private http = inject(HttpClient);
  private baseUrl = environment.apiBaseUrl;

  // Operador que valida error_code da resposta e lança erro se != 0
  private validateResponse<T>(source: Observable<ApiResponse<T>>): Observable<ApiResponse<T>> {
    return source.pipe(
      map((response) => {
        if (response.error_code !== 0) {
          throw new GrowattApiError(response.error_code, response.error_msg);
        }
        return response;
      }),
    );
  }

  // ─── Plantas ────────────────────────────────────────────────────────────────

  getPlantList(): Observable<ApiResponse<Plant[]>> {
    return this.validateResponse(this.http.get<ApiResponse<Plant[]>>(`${this.baseUrl}${API_ENDPOINTS.PLANT_LIST}`));
  }

  getPlantDetails(plantId: string): Observable<ApiResponse<PlantDetails>> {
    const params = new HttpParams().set('plant_id', plantId);
    return this.validateResponse(
      this.http.get<ApiResponse<PlantDetails>>(`${this.baseUrl}${API_ENDPOINTS.PLANT_DETAILS}`, { params }),
    );
  }

  getPlantEnergyOverview(plantId: string): Observable<ApiResponse<PlantEnergyOverview>> {
    const params = new HttpParams().set('plant_id', plantId);
    return this.validateResponse(
      this.http.get<ApiResponse<PlantEnergyOverview>>(`${this.baseUrl}${API_ENDPOINTS.PLANT_ENERGY_OVERVIEW}`, {
        params,
      }),
    );
  }

  getPlantEnergyHistory(
    plantId: string,
    historyParams: EnergyHistoryParams,
  ): Observable<PaginatedResponse<PlantEnergyHistory>> {
    let params = new HttpParams()
      .set('plant_id', plantId)
      .set('start_date', historyParams.start_date)
      .set('end_date', historyParams.end_date);

    if (historyParams.time_unit) params = params.set('time_unit', historyParams.time_unit);
    if (historyParams.page) params = params.set('page', historyParams.page.toString());
    if (historyParams.perpage) params = params.set('perpage', historyParams.perpage.toString());

    return this.http.get<PaginatedResponse<PlantEnergyHistory>>(
      `${this.baseUrl}${API_ENDPOINTS.PLANT_ENERGY_HISTORY}`,
      { params },
    );
  }

  // ─── Dispositivos ───────────────────────────────────────────────────────────

  getDeviceList(plantId: string): Observable<ApiResponse<Device[]>> {
    const params = new HttpParams().set('plant_id', plantId);
    return this.validateResponse(
      this.http.get<ApiResponse<Device[]>>(`${this.baseUrl}${API_ENDPOINTS.DEVICE_LIST}`, { params }),
    );
  }

  // ─── MIN (TLX) ──────────────────────────────────────────────────────────────

  getMinEnergy(deviceSn: string): Observable<ApiResponse<MinEnergy>> {
    const params = new HttpParams().set('device_sn', deviceSn);
    return this.validateResponse(
      this.http.get<ApiResponse<MinEnergy>>(`${this.baseUrl}${API_ENDPOINTS.MIN_ENERGY}`, { params }),
    );
  }

  getMinDetail(deviceSn: string): Observable<ApiResponse<MinDetail>> {
    const params = new HttpParams().set('device_sn', deviceSn);
    return this.validateResponse(
      this.http.get<ApiResponse<MinDetail>>(`${this.baseUrl}${API_ENDPOINTS.MIN_DETAIL}`, { params }),
    );
  }

  getMinEnergyHistory(
    deviceSn: string,
    historyParams?: DeviceEnergyHistoryParams,
  ): Observable<PaginatedResponse<MinEnergyHistory>> {
    let params = new HttpParams().set('device_sn', deviceSn);

    if (historyParams?.start_date) params = params.set('start_date', historyParams.start_date);
    if (historyParams?.end_date) params = params.set('end_date', historyParams.end_date);
    if (historyParams?.timezone) params = params.set('timezone', historyParams.timezone);
    if (historyParams?.page) params = params.set('page', historyParams.page.toString());
    if (historyParams?.limit) params = params.set('limit', historyParams.limit.toString());

    return this.http.get<PaginatedResponse<MinEnergyHistory>>(`${this.baseUrl}${API_ENDPOINTS.MIN_ENERGY_HISTORY}`, {
      params,
    });
  }

  getMinSettings(deviceSn: string): Observable<ApiResponse<Record<string, unknown>>> {
    const params = new HttpParams().set('device_sn', deviceSn);
    return this.http.get<ApiResponse<Record<string, unknown>>>(`${this.baseUrl}${API_ENDPOINTS.MIN_SETTINGS}`, {
      params,
    });
  }

  minReadParameter(deviceSn: string, readParams: ReadParameterParams): Observable<ApiResponse<DeviceParameter>> {
    let params = new HttpParams().set('device_sn', deviceSn).set('parameter_id', readParams.parameter_id);

    if (readParams.start_address != null) params = params.set('start_address', readParams.start_address.toString());
    if (readParams.end_address != null) params = params.set('end_address', readParams.end_address.toString());

    return this.http.get<ApiResponse<DeviceParameter>>(`${this.baseUrl}${API_ENDPOINTS.MIN_READ_PARAMETER}`, {
      params,
    });
  }

  minWriteParameter(deviceSn: string, writeParams: WriteParameterParams): Observable<ApiResponse<unknown>> {
    const body = {
      device_sn: deviceSn,
      parameter_id: writeParams.parameter_id,
      parameter_values: writeParams.parameter_values,
    };
    return this.http.post<ApiResponse<unknown>>(`${this.baseUrl}${API_ENDPOINTS.MIN_WRITE_PARAMETER}`, body);
  }

  // ─── SPH (MIX) ──────────────────────────────────────────────────────────────

  getSphEnergy(deviceSn: string): Observable<ApiResponse<SphEnergy>> {
    const params = new HttpParams().set('device_sn', deviceSn);
    return this.validateResponse(
      this.http.get<ApiResponse<SphEnergy>>(`${this.baseUrl}${API_ENDPOINTS.SPH_ENERGY}`, { params }),
    );
  }

  getSphDetail(deviceSn: string): Observable<ApiResponse<SphDetail>> {
    const params = new HttpParams().set('device_sn', deviceSn);
    return this.validateResponse(
      this.http.get<ApiResponse<SphDetail>>(`${this.baseUrl}${API_ENDPOINTS.SPH_DETAIL}`, { params }),
    );
  }

  getSphEnergyHistory(
    deviceSn: string,
    historyParams?: DeviceEnergyHistoryParams,
  ): Observable<PaginatedResponse<SphEnergyHistory>> {
    let params = new HttpParams().set('device_sn', deviceSn);

    if (historyParams?.start_date) params = params.set('start_date', historyParams.start_date);
    if (historyParams?.end_date) params = params.set('end_date', historyParams.end_date);
    if (historyParams?.timezone) params = params.set('timezone', historyParams.timezone);
    if (historyParams?.page) params = params.set('page', historyParams.page.toString());
    if (historyParams?.limit) params = params.set('limit', historyParams.limit.toString());

    return this.http.get<PaginatedResponse<SphEnergyHistory>>(`${this.baseUrl}${API_ENDPOINTS.SPH_ENERGY_HISTORY}`, {
      params,
    });
  }

  sphReadParameter(
    deviceSn: string,
    readParams?: Partial<ReadParameterParams>,
  ): Observable<ApiResponse<DeviceParameter>> {
    let params = new HttpParams().set('device_sn', deviceSn);

    if (readParams?.parameter_id) params = params.set('parameter_id', readParams.parameter_id);
    if (readParams?.start_address != null) params = params.set('start_address', readParams.start_address.toString());
    if (readParams?.end_address != null) params = params.set('end_address', readParams.end_address.toString());

    return this.http.get<ApiResponse<DeviceParameter>>(`${this.baseUrl}${API_ENDPOINTS.SPH_READ_PARAMETER}`, {
      params,
    });
  }

  sphWriteParameter(deviceSn: string, writeParams: WriteParameterParams): Observable<ApiResponse<unknown>> {
    const body = {
      device_sn: deviceSn,
      parameter_id: writeParams.parameter_id,
      parameter_values: writeParams.parameter_values,
    };
    return this.http.post<ApiResponse<unknown>>(`${this.baseUrl}${API_ENDPOINTS.SPH_WRITE_PARAMETER}`, body);
  }
}
