// Tipos relacionados a plantas (usinas solares)

export interface Plant {
  plant_id: string;
  plant_name: string;
  status: number;
  total_energy: number;
  current_power: number;
  country: string;
  city: string;
  create_date: string;
}

export interface PlantDetails extends Plant {
  latitude: string;
  longitude: string;
  peak_power: number;
  installed_capacity: number;
  timezone: string;
  image_url: string;
  formula_money: string;
  formula_money_str: string;
  formula_co2: number;
  formula_tree: number;
  formula_coal: number;
}

export interface PlantEnergyOverview {
  today_energy: number;
  month_energy: number;
  year_energy: number;
  total_energy: number;
  current_power: number;
  today_income: number;
  total_income: number;
}

export interface PlantEnergyHistory {
  date: string;
  energy: number;
  power?: number;
}
