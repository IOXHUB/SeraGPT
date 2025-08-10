// =====================================================
// SERAGPT ANALYSIS & REPORTS TYPES
// =====================================================
// TypeScript types and interfaces for analysis and
// report functionality in the SeraGPT application
// =====================================================

// =====================================================
// CORE REPORT TYPES
// =====================================================

export interface Report {
  id: string;
  user_id: string;
  
  // Basic Information
  title: string;
  description?: string;
  report_type: ReportType;
  
  // Status and Lifecycle
  status: ReportStatus;
  progress: number; // 0-100
  
  // Content and Data
  summary: Record<string, any>;
  full_data: Record<string, any>;
  metadata: Record<string, any>;
  
  // File Management
  pdf_file_url?: string;
  pdf_file_name?: string;
  pdf_generated_at?: string;
  
  // Sharing and Collaboration
  is_public: boolean;
  share_token?: string;
  view_count: number;
  
  // Token Usage
  tokens_consumed: number;
  
  // Quality and Validation
  quality_score?: number; // 0-100
  validation_status: ValidationStatus;
  validation_notes?: string;
  
  // Timestamps
  created_at: string;
  updated_at: string;
  completed_at?: string;
}

export type ReportType = 'roi' | 'climate' | 'equipment' | 'market' | 'layout';

export type ReportStatus = 'draft' | 'processing' | 'completed' | 'failed' | 'archived';

export type ValidationStatus = 'pending' | 'validated' | 'flagged';

// =====================================================
// ROI ANALYSIS TYPES
// =====================================================

export interface ROIAnalysis {
  id: string;
  report_id: string;
  user_id: string;
  
  // Basic Investment Information
  project_name: string;
  greenhouse_size: number; // Square meters
  location: LocationData;
  
  // Investment Costs
  initial_investment: number;
  land_cost: number;
  construction_cost: number;
  equipment_cost: number;
  infrastructure_cost: number;
  other_costs: number;
  
  // Operating Costs (Annual)
  annual_operating_costs: number;
  labor_costs: number;
  energy_costs: number;
  material_costs: number;
  maintenance_costs: number;
  insurance_costs: number;
  
  // Revenue Projections
  annual_revenue: number;
  crop_type: string;
  expected_yield?: number;
  price_per_unit?: number;
  production_cycles_per_year: number;
  
  // Financial Calculations
  roi_percentage: number;
  payback_period_years: number;
  npv?: number;
  irr?: number;
  break_even_point?: number;
  
  // Risk Assessment
  risk_level: RiskLevel;
  risk_factors: string[];
  sensitivity_analysis: Record<string, any>;
  
  // Market Assumptions
  market_growth_rate: number;
  inflation_rate: number;
  discount_rate: number;
  
  // Projections
  yearly_projections: YearlyProjection[];
  
  // Analysis Parameters
  analysis_period_years: number;
  currency: Currency;
  
  // Quality Metrics
  data_confidence_level: number;
  assumptions: string[];
  
  // Timestamps
  created_at: string;
  updated_at: string;
}

export interface YearlyProjection {
  year: number;
  revenue: number;
  costs: number;
  profit: number;
  cumulative_profit: number;
  roi: number;
}

export type RiskLevel = 'low' | 'medium' | 'high';

// =====================================================
// CLIMATE ANALYSIS TYPES
// =====================================================

export interface ClimateAnalysis {
  id: string;
  report_id: string;
  user_id: string;
  
  // Location Information
  location: LocationData;
  analysis_region: string;
  
  // Plant and Greenhouse Information
  plant_type: string;
  greenhouse_type: GreenhouseType;
  greenhouse_size?: number;
  
  // Analysis Period
  analysis_start_date: string;
  analysis_end_date: string;
  analysis_period_months: number;
  
  // Climate Suitability Results
  overall_suitability_score: number; // 0-100
  climate_category: ClimateCategory;
  
  // Temperature Analysis
  temperature_data: TemperatureData;
  temperature_suitability: number;
  frost_risk_level: ClimateRiskLevel;
  heat_stress_risk: ClimateRiskLevel;
  
  // Humidity Analysis
  humidity_data: HumidityData;
  humidity_suitability: number;
  humidity_risk_level: HumidityRiskLevel;
  
  // Precipitation Analysis
  precipitation_data: PrecipitationData;
  water_availability_score: number;
  drought_risk_level: ClimateRiskLevel;
  
  // Wind Analysis
  wind_data: WindData;
  wind_risk_level: ClimateRiskLevel;
  
  // Seasonal Analysis
  optimal_seasons: SeasonalData[];
  challenging_periods: ChallengingPeriod[];
  
  // Risk Assessment
  overall_risk_score: number;
  primary_risks: string[];
  mitigation_strategies: string[];
  
  // Historical Data
  historical_events: HistoricalEvent[];
  extreme_weather_frequency: number;
  
  // Future Projections
  climate_change_impact: Record<string, any>;
  adaptation_requirements: string[];
  
  // Economic Impact
  climate_cost_factor: number;
  expected_yield_impact: number;
  
  // Data Quality
  data_sources: DataSource[];
  data_quality_score: number;
  last_weather_update?: string;
  
  // Analysis Parameters
  weather_stations_used: WeatherStation[];
  historical_data_years: number;
  
  // Timestamps
  created_at: string;
  updated_at: string;
}

export interface TemperatureData {
  avg: number;
  min: number;
  max: number;
  seasonal_variation: Record<string, number>;
}

export interface HumidityData {
  avg: number;
  min: number;
  max: number;
  seasonal_variation: Record<string, number>;
}

export interface PrecipitationData {
  annual: number;
  monthly_distribution: Record<string, number>;
  intensity: string;
}

export interface WindData {
  avg_speed: number;
  max_speed: number;
  direction: string;
  seasonal_patterns: Record<string, any>;
}

export interface SeasonalData {
  season: string;
  months: string;
  suitability: number;
  temperature: number;
  humidity: number;
}

export interface ChallengingPeriod {
  period: string;
  challenge_type: string;
  impact_level: string;
  description: string;
}

export interface HistoricalEvent {
  event: string;
  date: string;
  impact: string;
}

export interface DataSource {
  name: string;
  type: string;
  reliability: number;
  last_updated: string;
}

export interface WeatherStation {
  id: string;
  name: string;
  distance_km: number;
  elevation: number;
}

export type ClimateCategory = 'excellent' | 'good' | 'fair' | 'poor' | 'unsuitable';
export type ClimateRiskLevel = 'none' | 'low' | 'medium' | 'high' | 'extreme';
export type HumidityRiskLevel = 'optimal' | 'acceptable' | 'challenging' | 'problematic';

// =====================================================
// EQUIPMENT ANALYSIS TYPES
// =====================================================

export interface EquipmentAnalysis {
  id: string;
  report_id: string;
  user_id: string;
  
  // Project Information
  project_name: string;
  greenhouse_type: GreenhouseType;
  greenhouse_size: number;
  location: LocationData;
  
  // Crop and Production Information
  crop_types: string[];
  production_system: ProductionSystem;
  automation_level: AutomationLevel;
  
  // Equipment and Costs
  equipment_list: EquipmentItem[];
  total_equipment_cost: number;
  heating_cooling_cost: number;
  irrigation_cost: number;
  automation_cost: number;
  structural_cost: number;
  electrical_cost: number;
  monitoring_cost: number;
  other_equipment_cost: number;
  
  // Installation and Setup
  installation_cost: number;
  commissioning_cost: number;
  training_cost: number;
  
  // Operational Costs
  annual_maintenance_cost: number;
  annual_energy_cost: number;
  replacement_schedule: Record<string, any>;
  
  // Technical Specifications
  power_requirements: PowerRequirements;
  water_requirements: WaterRequirements;
  space_requirements: SpaceRequirements;
  
  // Efficiency and Performance
  energy_efficiency_rating?: string;
  automation_coverage: number;
  expected_lifespan_years: number;
  
  // Vendor Information
  suppliers: SupplierInfo[];
  warranty_information: Record<string, any>;
  
  // Alternative Configurations
  alternative_configs: AlternativeConfig[];
  cost_optimization: Record<string, any>;
  
  // Quality and Standards
  quality_standards: string[];
  safety_features: string[];
  
  // Environmental Impact
  carbon_footprint: number;
  sustainability_score: number;
  
  // Regional Adaptations
  climate_adaptations: string[];
  local_regulations: string[];
  
  // Financial Analysis
  equipment_roi?: number;
  payback_period_months?: number;
  financing_options: FinancingOption[];
  
  // Pricing
  currency: Currency;
  price_validity_date?: string;
  inflation_adjustment: number;
  
  // Timestamps
  created_at: string;
  updated_at: string;
}

export interface EquipmentItem {
  id: string;
  category: EquipmentCategory;
  name: string;
  brand?: string;
  model?: string;
  quantity: number;
  unit_price: number;
  total_price: number;
  specifications: Record<string, any>;
  supplier?: string;
  warranty_years?: number;
  energy_consumption?: number;
  maintenance_requirements?: string;
}

export interface PowerRequirements {
  total_power_kw: number;
  voltage: string;
  phases: number;
  backup_power_needed: boolean;
}

export interface WaterRequirements {
  daily_consumption_liters: number;
  pressure_bar: number;
  quality_requirements: string[];
}

export interface SpaceRequirements {
  equipment_area_m2: number;
  service_area_m2: number;
  storage_area_m2: number;
}

export interface SupplierInfo {
  name: string;
  location: string;
  contact_info: Record<string, any>;
  rating: number;
  specialties: string[];
}

export interface AlternativeConfig {
  name: string;
  description: string;
  cost_difference: number;
  pros: string[];
  cons: string[];
}

export interface FinancingOption {
  type: string;
  provider: string;
  terms: string;
  interest_rate?: number;
  down_payment_percentage?: number;
}

export type ProductionSystem = 'soil' | 'hydroponic' | 'aeroponic' | 'aquaponic' | 'vertical';
export type AutomationLevel = 'manual' | 'semi-automated' | 'fully-automated';
export type EquipmentCategory = 
  | 'heating' | 'cooling' | 'ventilation' | 'irrigation' | 'lighting'
  | 'automation' | 'monitoring' | 'structural' | 'electrical' | 'other';

// =====================================================
// MARKET ANALYSIS TYPES
// =====================================================

export interface MarketAnalysis {
  id: string;
  report_id: string;
  user_id: string;
  
  // Product Information
  primary_product: string;
  product_category: ProductCategory;
  product_variants: string[];
  
  // Market Scope
  target_markets: TargetMarket[];
  geographic_focus: string[];
  
  // Current Market Analysis
  current_market_price: number;
  price_unit: string;
  price_date: string;
  
  // Price History and Trends
  historical_prices: PriceData[];
  price_trend: PriceTrend;
  seasonal_price_pattern: Record<string, number>;
  price_volatility_score: number;
  
  // Market Demand Analysis
  demand_level: MarketLevel;
  demand_trend: MarketTrend;
  market_size_tons?: number;
  market_growth_rate?: number;
  
  // Supply Analysis
  supply_level: SupplyLevel;
  competition_level: MarketLevel;
  major_suppliers: string[];
  market_concentration?: string;
  
  // Quality and Standards
  quality_requirements: Record<string, any>;
  organic_premium: number;
  certification_benefits: string[];
  
  // Distribution Channels
  distribution_channels: DistributionChannel[];
  channel_margins: Record<string, number>;
  logistics_costs: Record<string, any>;
  
  // Seasonal Analysis
  peak_seasons: SeasonalMarketData[];
  off_seasons: SeasonalMarketData[];
  import_competition: Record<string, any>;
  
  // Price Predictions
  short_term_forecast: MarketForecast;
  medium_term_forecast: MarketForecast;
  long_term_outlook: MarketForecast;
  forecast_confidence: number;
  
  // Economic Factors
  economic_indicators: Record<string, any>;
  currency_impact: number;
  inflation_adjustment: number;
  
  // Market Opportunities
  market_gaps: MarketOpportunity[];
  niche_markets: MarketOpportunity[];
  value_addition_opportunities: string[];
  
  // Risk Assessment
  market_risks: string[];
  price_risks: string[];
  mitigation_strategies: string[];
  
  // Regulatory Environment
  regulations: string[];
  trade_barriers: string[];
  government_support: string[];
  
  // Competitive Analysis
  competitive_advantages: string[];
  barriers_to_entry: string[];
  market_positioning: Record<string, any>;
  
  // Data Quality
  data_sources: DataSource[];
  data_freshness?: string;
  data_reliability_score: number;
  
  // Financial Impact
  revenue_potential?: number;
  profit_margin_estimate?: number;
  break_even_volume?: number;
  
  // Currency and Units
  currency: Currency;
  weight_unit: string;
  
  // Timestamps
  created_at: string;
  updated_at: string;
}

export interface PriceData {
  date: string;
  price: number;
  volume?: number;
  source: string;
}

export interface DistributionChannel {
  name: string;
  type: ChannelType;
  market_share?: number;
  margin_percentage?: number;
  requirements: string[];
}

export interface SeasonalMarketData {
  period: string;
  months: string[];
  demand_level: number;
  price_premium: number;
  notes?: string;
}

export interface MarketForecast {
  period: string;
  price_range: {
    min: number;
    max: number;
    expected: number;
  };
  key_factors: string[];
  confidence: number;
}

export interface MarketOpportunity {
  name: string;
  description: string;
  market_size?: number;
  growth_potential: number;
  entry_difficulty: string;
}

export type ProductCategory = 'vegetables' | 'fruits' | 'herbs' | 'flowers' | 'specialty';
export type TargetMarket = 'local' | 'regional' | 'national' | 'export';
export type PriceTrend = 'increasing' | 'decreasing' | 'stable' | 'volatile';
export type MarketTrend = 'growing' | 'stable' | 'declining';
export type MarketLevel = 'very_high' | 'high' | 'medium' | 'low' | 'very_low';
export type SupplyLevel = 'oversupply' | 'balanced' | 'undersupply';
export type ChannelType = 'retail' | 'wholesale' | 'direct' | 'export' | 'processing';

// =====================================================
// LAYOUT PLAN TYPES
// =====================================================

export interface LayoutPlan {
  id: string;
  report_id: string;
  user_id: string;
  
  // Project Information
  project_name: string;
  greenhouse_type: GreenhouseType;
  location: LocationData;
  
  // Dimensions and Structure
  total_area: number;
  usable_area: number;
  length: number;
  width: number;
  height: number;
  
  // Layout Configuration
  layout_type: LayoutType;
  growing_system: GrowingSystem;
  planting_arrangement: PlantingArrangement;
  
  // Capacity and Density
  plant_capacity: number;
  planting_density: number;
  aisle_width: number;
  bed_width?: number;
  
  // Zones and Sections
  growing_zones: GrowingZone[];
  climate_zones: ClimateZone[];
  service_areas: ServiceArea[];
  
  // Infrastructure Layout
  irrigation_layout: Record<string, any>;
  electrical_layout: Record<string, any>;
  ventilation_layout: Record<string, any>;
  heating_layout: Record<string, any>;
  
  // Equipment Placement
  equipment_positions: EquipmentPosition[];
  sensor_positions: SensorPosition[];
  control_panel_location: Record<string, any>;
  
  // Efficiency Metrics
  space_utilization: number;
  workflow_efficiency: number;
  accessibility_score: number;
  
  // Production Optimization
  crop_rotation_plan: CropRotationPlan[];
  succession_planting: Record<string, any>;
  companion_planting: CompanionPlanting[];
  
  // Environmental Considerations
  natural_light_distribution: Record<string, any>;
  airflow_patterns: Record<string, any>;
  temperature_zones: TemperatureZone[];
  
  // Expansion and Flexibility
  expansion_potential: Record<string, any>;
  modular_design: boolean;
  adaptability_score: number;
  
  // Cost Implications
  construction_complexity: ComplexityLevel;
  estimated_construction_cost?: number;
  maintenance_complexity: ComplexityLevel;
  
  // Performance Projections
  expected_yield_per_m2?: number;
  production_efficiency: number;
  energy_efficiency_score: number;
  
  // Design Files
  layout_image_url?: string;
  technical_drawings: string[];
  model_3d_url?: string;
  
  // Standards and Compliance
  building_codes_compliance: string[];
  safety_standards: string[];
  accessibility_standards: string[];
  
  // Alternative Designs
  alternative_layouts: AlternativeLayout[];
  design_variations: DesignVariation[];
  
  // Environmental Impact
  sustainability_features: string[];
  resource_efficiency: Record<string, any>;
  waste_management: Record<string, any>;
  
  // Quality and Validation
  design_quality_score: number;
  structural_integrity: boolean;
  peer_review_status: PeerReviewStatus;
  
  // Units and Measurements
  measurement_units: MeasurementUnits;
  currency: Currency;
  
  // Timestamps
  created_at: string;
  updated_at: string;
}

export interface GrowingZone {
  id: string;
  name: string;
  area_m2: number;
  crop_type?: string;
  planting_density: number;
  microclimate_requirements?: Record<string, any>;
}

export interface ClimateZone {
  id: string;
  name: string;
  area_m2: number;
  target_temperature?: number;
  target_humidity?: number;
  control_systems: string[];
}

export interface ServiceArea {
  id: string;
  type: ServiceAreaType;
  area_m2: number;
  equipment: string[];
  access_requirements: string[];
}

export interface EquipmentPosition {
  equipment_id: string;
  equipment_name: string;
  x_coordinate: number;
  y_coordinate: number;
  area_required_m2?: number;
}

export interface SensorPosition {
  sensor_type: string;
  x_coordinate: number;
  y_coordinate: number;
  coverage_area_m2?: number;
  monitoring_parameters: string[];
}

export interface CropRotationPlan {
  zone_id: string;
  rotation_sequence: CropRotationStep[];
  cycle_duration_weeks: number;
}

export interface CropRotationStep {
  step: number;
  crop_type: string;
  duration_weeks: number;
  notes?: string;
}

export interface CompanionPlanting {
  primary_crop: string;
  companion_crop: string;
  benefit: string;
  arrangement: string;
}

export interface TemperatureZone {
  zone_id: string;
  min_temperature: number;
  max_temperature: number;
  heating_requirements?: string[];
  cooling_requirements?: string[];
}

export interface AlternativeLayout {
  id: string;
  name: string;
  description: string;
  cost_difference: number;
  efficiency_difference: number;
  pros: string[];
  cons: string[];
}

export interface DesignVariation {
  id: string;
  parameter: string;
  options: VariationOption[];
  recommendation: string;
}

export interface VariationOption {
  value: string;
  impact_description: string;
  cost_impact: number;
  efficiency_impact: number;
}

export type LayoutType = 'traditional' | 'hydroponic' | 'vertical' | 'mixed' | 'modular';
export type GrowingSystem = 'soil' | 'nft' | 'dwc' | 'media_bed' | 'aeroponic' | 'ebb_flow';
export type PlantingArrangement = 'rows' | 'beds' | 'containers' | 'towers' | 'hanging';
export type ServiceAreaType = 'storage' | 'workspace' | 'packaging' | 'office' | 'maintenance';
export type ComplexityLevel = 'simple' | 'medium' | 'complex';
export type PeerReviewStatus = 'pending' | 'approved' | 'needs_revision';
export type MeasurementUnits = 'metric' | 'imperial';

// =====================================================
// ANALYSIS SHARES TYPES
// =====================================================

export interface AnalysisShare {
  id: string;
  report_id: string;
  shared_by: string;
  
  // Sharing Information
  share_token: string;
  share_type: ShareType;
  
  // Access Control
  shared_with_email?: string;
  shared_with_user_id?: string;
  password_protected: boolean;
  share_password_hash?: string;
  
  // Permissions
  can_view: boolean;
  can_download: boolean;
  can_comment: boolean;
  can_share: boolean;
  
  // Expiration and Limits
  expires_at?: string;
  max_views?: number;
  current_views: number;
  
  // Tracking
  first_accessed_at?: string;
  last_accessed_at?: string;
  access_count: number;
  
  // Metadata
  share_message?: string;
  share_title?: string;
  
  // Status
  is_active: boolean;
  
  // Timestamps
  created_at: string;
  updated_at: string;
}

export type ShareType = 'public' | 'private' | 'limited';

// =====================================================
// COMMON TYPES
// =====================================================

export interface LocationData {
  city?: string;
  district?: string;
  region?: string;
  country?: string;
  coordinates?: {
    lat: number;
    lon: number;
  };
  elevation?: number;
  climate_zone?: string;
}

export type GreenhouseType = 'plastic' | 'polycarbonate' | 'glass' | 'hybrid';
export type Currency = 'TRY' | 'USD' | 'EUR';

// =====================================================
// API REQUEST/RESPONSE TYPES
// =====================================================

export interface CreateReportRequest {
  title: string;
  description?: string;
  report_type: ReportType;
  metadata?: Record<string, any>;
}

export interface UpdateReportRequest {
  title?: string;
  description?: string;
  status?: ReportStatus;
  progress?: number;
  summary?: Record<string, any>;
  full_data?: Record<string, any>;
  is_public?: boolean;
}

export interface CreateROIAnalysisRequest {
  report_id: string;
  project_name: string;
  greenhouse_size: number;
  location: LocationData;
  initial_investment: number;
  annual_operating_costs: number;
  annual_revenue: number;
  crop_type: string;
  // ... other required fields
}

export interface AnalysisResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  validation_errors?: Record<string, string[]>;
}

export interface ReportsListResponse {
  reports: Report[];
  total_count: number;
  page: number;
  page_size: number;
  has_more: boolean;
}

export interface ReportFilters {
  report_type?: ReportType;
  status?: ReportStatus;
  created_after?: string;
  created_before?: string;
  search_query?: string;
  user_id?: string;
}

export interface ReportSortOptions {
  field: 'created_at' | 'updated_at' | 'title' | 'status' | 'progress';
  order: 'asc' | 'desc';
}

// =====================================================
// DASHBOARD AND SUMMARY TYPES
// =====================================================

export interface UserReportsSummary {
  user_id: string;
  total_reports: number;
  completed_reports: number;
  processing_reports: number;
  roi_reports: number;
  climate_reports: number;
  equipment_reports: number;
  market_reports: number;
  layout_reports: number;
  total_tokens_used: number;
  last_report_date?: string;
}

export interface RecentReport {
  id: string;
  title: string;
  report_type: ReportType;
  status: ReportStatus;
  created_at: string;
  completed_at?: string;
  user_name?: string;
  view_count: number;
  is_public: boolean;
}

export interface AnalyticsSummary {
  total_reports: number;
  completed_this_month: number;
  active_users: number;
  popular_report_types: {
    type: ReportType;
    count: number;
  }[];
  average_completion_time_hours: number;
  success_rate_percentage: number;
}

// =====================================================
// VALIDATION AND UTILITY TYPES
// =====================================================

export interface ValidationRule {
  field: string;
  rule: string;
  message: string;
  value?: any;
}

export interface AnalysisValidationRules {
  [reportType: string]: ValidationRule[];
}

export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

export type RequireFields<T, K extends keyof T> = T & Required<Pick<T, K>>;
