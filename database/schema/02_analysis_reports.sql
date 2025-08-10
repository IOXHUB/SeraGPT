-- =====================================================
-- SERAGPT ANALYSIS & REPORTS TABLES SCHEMA
-- =====================================================
-- This file contains the database schema for analysis and
-- report management in the SeraGPT application.
-- 
-- Tables created:
-- 1. reports - Main reports table (parent for all analyses)
-- 2. roi_analyses - ROI calculation and investment analysis
-- 3. climate_analyses - Climate and weather analysis
-- 4. equipment_analyses - Equipment list and cost analysis
-- 5. market_analyses - Market price and trend analysis
-- 6. layout_plans - Greenhouse layout and planning
-- 7. analysis_shares - Report sharing and collaboration
-- =====================================================

-- =====================================================
-- 1. REPORTS TABLE (Main Reports)
-- =====================================================
-- Central table for all types of reports and analyses
CREATE TABLE IF NOT EXISTS public.reports (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    
    -- Report Basic Information
    title VARCHAR(255) NOT NULL,
    description TEXT,
    report_type VARCHAR(50) NOT NULL, -- 'roi', 'climate', 'equipment', 'market', 'layout'
    
    -- Report Status and Lifecycle
    status VARCHAR(50) DEFAULT 'draft', -- 'draft', 'processing', 'completed', 'failed', 'archived'
    progress INTEGER DEFAULT 0, -- 0-100 percentage
    
    -- Content and Data
    summary JSONB DEFAULT '{}', -- Quick summary data for dashboard
    full_data JSONB DEFAULT '{}', -- Complete analysis data
    metadata JSONB DEFAULT '{}', -- Additional metadata (inputs, parameters, etc.)
    
    -- File Management
    pdf_file_url VARCHAR(500),
    pdf_file_name VARCHAR(255),
    pdf_generated_at TIMESTAMPTZ,
    
    -- Sharing and Collaboration
    is_public BOOLEAN DEFAULT FALSE,
    share_token VARCHAR(100) UNIQUE,
    view_count INTEGER DEFAULT 0,
    
    -- Token Usage
    tokens_consumed INTEGER DEFAULT 1,
    
    -- Quality and Validation
    quality_score INTEGER, -- 0-100 score for analysis quality
    validation_status VARCHAR(50) DEFAULT 'pending', -- 'pending', 'validated', 'flagged'
    validation_notes TEXT,
    
    -- Audit and Timestamps
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    completed_at TIMESTAMPTZ,
    
    -- Constraints
    CONSTRAINT valid_report_type CHECK (report_type IN ('roi', 'climate', 'equipment', 'market', 'layout')),
    CONSTRAINT valid_status CHECK (status IN ('draft', 'processing', 'completed', 'failed', 'archived')),
    CONSTRAINT valid_progress CHECK (progress >= 0 AND progress <= 100),
    CONSTRAINT valid_quality_score CHECK (quality_score IS NULL OR (quality_score >= 0 AND quality_score <= 100))
);

-- Add indexes for reports
CREATE INDEX IF NOT EXISTS idx_reports_user_id ON reports(user_id);
CREATE INDEX IF NOT EXISTS idx_reports_type ON reports(report_type);
CREATE INDEX IF NOT EXISTS idx_reports_status ON reports(status);
CREATE INDEX IF NOT EXISTS idx_reports_created_at ON reports(created_at);
CREATE INDEX IF NOT EXISTS idx_reports_share_token ON reports(share_token);
CREATE INDEX IF NOT EXISTS idx_reports_public ON reports(is_public) WHERE is_public = TRUE;

-- =====================================================
-- 2. ROI ANALYSES TABLE
-- =====================================================
-- Detailed ROI calculation and investment analysis data
CREATE TABLE IF NOT EXISTS public.roi_analyses (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    report_id UUID REFERENCES public.reports(id) ON DELETE CASCADE NOT NULL,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    
    -- Basic Investment Information
    project_name VARCHAR(255) NOT NULL,
    greenhouse_size DECIMAL(10,2) NOT NULL, -- Square meters
    location JSONB DEFAULT '{}', -- {city, district, coordinates}
    
    -- Investment Costs
    initial_investment DECIMAL(15,2) NOT NULL,
    land_cost DECIMAL(15,2) DEFAULT 0,
    construction_cost DECIMAL(15,2) DEFAULT 0,
    equipment_cost DECIMAL(15,2) DEFAULT 0,
    infrastructure_cost DECIMAL(15,2) DEFAULT 0,
    other_costs DECIMAL(15,2) DEFAULT 0,
    
    -- Operating Costs (Annual)
    annual_operating_costs DECIMAL(15,2) NOT NULL,
    labor_costs DECIMAL(15,2) DEFAULT 0,
    energy_costs DECIMAL(15,2) DEFAULT 0,
    material_costs DECIMAL(15,2) DEFAULT 0,
    maintenance_costs DECIMAL(15,2) DEFAULT 0,
    insurance_costs DECIMAL(15,2) DEFAULT 0,
    
    -- Revenue Projections
    annual_revenue DECIMAL(15,2) NOT NULL,
    crop_type VARCHAR(100) NOT NULL,
    expected_yield DECIMAL(10,2), -- kg/m² or similar
    price_per_unit DECIMAL(10,2), -- TL/kg
    production_cycles_per_year INTEGER DEFAULT 1,
    
    -- Financial Calculations
    roi_percentage DECIMAL(8,4) NOT NULL, -- Calculated ROI %
    payback_period_years DECIMAL(8,4) NOT NULL, -- Years to payback
    npv DECIMAL(15,2), -- Net Present Value
    irr DECIMAL(8,4), -- Internal Rate of Return
    break_even_point DECIMAL(8,4), -- Years to break even
    
    -- Risk Assessment
    risk_level VARCHAR(50) DEFAULT 'medium', -- 'low', 'medium', 'high'
    risk_factors JSONB DEFAULT '[]', -- Array of risk descriptions
    sensitivity_analysis JSONB DEFAULT '{}', -- Sensitivity data
    
    -- Market Assumptions
    market_growth_rate DECIMAL(8,4) DEFAULT 0, -- Annual market growth %
    inflation_rate DECIMAL(8,4) DEFAULT 8.5, -- Annual inflation %
    discount_rate DECIMAL(8,4) DEFAULT 12, -- Discount rate for NPV
    
    -- Detailed Projections (5-10 years)
    yearly_projections JSONB DEFAULT '[]', -- Array of yearly financial projections
    
    -- Analysis Parameters
    analysis_period_years INTEGER DEFAULT 10,
    currency VARCHAR(10) DEFAULT 'TRY',
    
    -- Quality Metrics
    data_confidence_level DECIMAL(5,2) DEFAULT 70, -- Confidence in data %
    assumptions JSONB DEFAULT '[]', -- Array of key assumptions
    
    -- Audit fields
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    
    -- Constraints
    CONSTRAINT positive_investment CHECK (initial_investment > 0),
    CONSTRAINT positive_greenhouse_size CHECK (greenhouse_size > 0),
    CONSTRAINT valid_risk_level CHECK (risk_level IN ('low', 'medium', 'high')),
    CONSTRAINT valid_analysis_period CHECK (analysis_period_years > 0 AND analysis_period_years <= 50)
);

-- Add indexes for ROI analyses
CREATE INDEX IF NOT EXISTS idx_roi_analyses_report_id ON roi_analyses(report_id);
CREATE INDEX IF NOT EXISTS idx_roi_analyses_user_id ON roi_analyses(user_id);
CREATE INDEX IF NOT EXISTS idx_roi_analyses_crop_type ON roi_analyses(crop_type);
CREATE INDEX IF NOT EXISTS idx_roi_analyses_location_city ON roi_analyses USING GIN ((location->>'city'));
CREATE INDEX IF NOT EXISTS idx_roi_analyses_roi ON roi_analyses(roi_percentage);

-- =====================================================
-- 3. CLIMATE ANALYSES TABLE
-- =====================================================
-- Climate and weather analysis data
CREATE TABLE IF NOT EXISTS public.climate_analyses (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    report_id UUID REFERENCES public.reports(id) ON DELETE CASCADE NOT NULL,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    
    -- Location Information
    location JSONB NOT NULL, -- {city, district, coordinates, elevation}
    analysis_region VARCHAR(100) NOT NULL,
    
    -- Plant and Greenhouse Information
    plant_type VARCHAR(100) NOT NULL,
    greenhouse_type VARCHAR(50) NOT NULL, -- 'plastic', 'polycarbonate', 'glass'
    greenhouse_size DECIMAL(10,2),
    
    -- Analysis Period
    analysis_start_date DATE NOT NULL,
    analysis_end_date DATE NOT NULL,
    analysis_period_months INTEGER NOT NULL,
    
    -- Climate Suitability Results
    overall_suitability_score INTEGER NOT NULL, -- 0-100
    climate_category VARCHAR(50) NOT NULL, -- 'excellent', 'good', 'fair', 'poor', 'unsuitable'
    
    -- Temperature Analysis
    temperature_data JSONB NOT NULL, -- {avg, min, max, seasonal_variation}
    temperature_suitability INTEGER NOT NULL, -- 0-100
    frost_risk_level VARCHAR(50) NOT NULL, -- 'none', 'low', 'medium', 'high', 'extreme'
    heat_stress_risk VARCHAR(50) NOT NULL, -- 'none', 'low', 'medium', 'high', 'extreme'
    
    -- Humidity Analysis
    humidity_data JSONB NOT NULL, -- {avg, min, max, seasonal_variation}
    humidity_suitability INTEGER NOT NULL, -- 0-100
    humidity_risk_level VARCHAR(50) NOT NULL, -- 'optimal', 'acceptable', 'challenging', 'problematic'
    
    -- Precipitation Analysis
    precipitation_data JSONB NOT NULL, -- {annual, monthly_distribution, intensity}
    water_availability_score INTEGER NOT NULL, -- 0-100
    drought_risk_level VARCHAR(50) NOT NULL, -- 'none', 'low', 'medium', 'high', 'extreme'
    
    -- Wind Analysis
    wind_data JSONB NOT NULL, -- {avg_speed, max_speed, direction, seasonal_patterns}
    wind_risk_level VARCHAR(50) NOT NULL, -- 'none', 'low', 'medium', 'high', 'extreme'
    
    -- Seasonal Analysis
    optimal_seasons JSONB NOT NULL, -- Array of seasons with suitability scores
    challenging_periods JSONB DEFAULT '[]', -- Array of difficult periods
    
    -- Risk Assessment
    overall_risk_score INTEGER NOT NULL, -- 0-100 (higher = more risky)
    primary_risks JSONB DEFAULT '[]', -- Array of main risk factors
    mitigation_strategies JSONB DEFAULT '[]', -- Array of recommended strategies
    
    -- Historical Climate Events
    historical_events JSONB DEFAULT '[]', -- Array of significant weather events
    extreme_weather_frequency INTEGER DEFAULT 0, -- Events per year
    
    -- Future Climate Projections (optional)
    climate_change_impact JSONB DEFAULT '{}', -- Future trends and projections
    adaptation_requirements JSONB DEFAULT '[]', -- Required adaptations
    
    -- Economic Impact
    climate_cost_factor DECIMAL(8,4) DEFAULT 1.0, -- Cost multiplier due to climate
    expected_yield_impact DECIMAL(8,4) DEFAULT 0, -- % impact on yield due to climate
    
    -- Data Sources and Quality
    data_sources JSONB DEFAULT '[]', -- Array of data source information
    data_quality_score INTEGER DEFAULT 70, -- 0-100 confidence in data
    last_weather_update TIMESTAMPTZ,
    
    -- Analysis Parameters
    weather_stations_used JSONB DEFAULT '[]', -- Weather stations referenced
    historical_data_years INTEGER DEFAULT 10, -- Years of historical data used
    
    -- Audit fields
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    
    -- Constraints
    CONSTRAINT valid_suitability_score CHECK (overall_suitability_score >= 0 AND overall_suitability_score <= 100),
    CONSTRAINT valid_climate_category CHECK (climate_category IN ('excellent', 'good', 'fair', 'poor', 'unsuitable')),
    CONSTRAINT valid_risk_levels CHECK (
        frost_risk_level IN ('none', 'low', 'medium', 'high', 'extreme') AND
        heat_stress_risk IN ('none', 'low', 'medium', 'high', 'extreme') AND
        drought_risk_level IN ('none', 'low', 'medium', 'high', 'extreme') AND
        wind_risk_level IN ('none', 'low', 'medium', 'high', 'extreme')
    ),
    CONSTRAINT valid_analysis_period CHECK (analysis_period_months > 0 AND analysis_period_months <= 60)
);

-- Add indexes for climate analyses
CREATE INDEX IF NOT EXISTS idx_climate_analyses_report_id ON climate_analyses(report_id);
CREATE INDEX IF NOT EXISTS idx_climate_analyses_user_id ON climate_analyses(user_id);
CREATE INDEX IF NOT EXISTS idx_climate_analyses_plant_type ON climate_analyses(plant_type);
CREATE INDEX IF NOT EXISTS idx_climate_analyses_location_city ON climate_analyses USING GIN ((location->>'city'));
CREATE INDEX IF NOT EXISTS idx_climate_analyses_suitability ON climate_analyses(overall_suitability_score);

-- =====================================================
-- 4. EQUIPMENT ANALYSES TABLE
-- =====================================================
-- Equipment list and cost analysis
CREATE TABLE IF NOT EXISTS public.equipment_analyses (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    report_id UUID REFERENCES public.reports(id) ON DELETE CASCADE NOT NULL,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    
    -- Project Information
    project_name VARCHAR(255) NOT NULL,
    greenhouse_type VARCHAR(50) NOT NULL,
    greenhouse_size DECIMAL(10,2) NOT NULL, -- Square meters
    location JSONB DEFAULT '{}',
    
    -- Crop and Production Information
    crop_types JSONB NOT NULL, -- Array of crop types
    production_system VARCHAR(100) NOT NULL, -- 'soil', 'hydroponic', 'aeroponic', etc.
    automation_level VARCHAR(50) NOT NULL, -- 'manual', 'semi-automated', 'fully-automated'
    
    -- Equipment Categories and Lists
    equipment_list JSONB NOT NULL, -- Detailed equipment list with specifications
    
    -- Cost Breakdown
    total_equipment_cost DECIMAL(15,2) NOT NULL,
    heating_cooling_cost DECIMAL(15,2) DEFAULT 0,
    irrigation_cost DECIMAL(15,2) DEFAULT 0,
    automation_cost DECIMAL(15,2) DEFAULT 0,
    structural_cost DECIMAL(15,2) DEFAULT 0,
    electrical_cost DECIMAL(15,2) DEFAULT 0,
    monitoring_cost DECIMAL(15,2) DEFAULT 0,
    other_equipment_cost DECIMAL(15,2) DEFAULT 0,
    
    -- Installation and Setup
    installation_cost DECIMAL(15,2) DEFAULT 0,
    commissioning_cost DECIMAL(15,2) DEFAULT 0,
    training_cost DECIMAL(15,2) DEFAULT 0,
    
    -- Operational Costs (Annual)
    annual_maintenance_cost DECIMAL(15,2) DEFAULT 0,
    annual_energy_cost DECIMAL(15,2) DEFAULT 0,
    replacement_schedule JSONB DEFAULT '{}', -- Equipment replacement timeline
    
    -- Technical Specifications
    power_requirements JSONB DEFAULT '{}', -- Electrical power needs
    water_requirements JSONB DEFAULT '{}', -- Water consumption and pressure
    space_requirements JSONB DEFAULT '{}', -- Space allocation for equipment
    
    -- Efficiency and Performance
    energy_efficiency_rating VARCHAR(50), -- A+, A, B, C ratings
    automation_coverage DECIMAL(5,2) DEFAULT 0, -- % of processes automated
    expected_lifespan_years INTEGER DEFAULT 10,
    
    -- Vendor and Supplier Information
    suppliers JSONB DEFAULT '[]', -- Array of supplier information
    warranty_information JSONB DEFAULT '{}', -- Warranty details
    
    -- Alternative Configurations
    alternative_configs JSONB DEFAULT '[]', -- Alternative equipment setups
    cost_optimization JSONB DEFAULT '{}', -- Cost optimization suggestions
    
    -- Quality and Standards
    quality_standards JSONB DEFAULT '[]', -- Standards compliance (CE, ISO, etc.)
    safety_features JSONB DEFAULT '[]', -- Safety equipment and features
    
    -- Environmental Impact
    carbon_footprint DECIMAL(10,4) DEFAULT 0, -- CO2 equivalent
    sustainability_score INTEGER DEFAULT 50, -- 0-100 sustainability rating
    
    -- Regional Adaptations
    climate_adaptations JSONB DEFAULT '[]', -- Climate-specific equipment
    local_regulations JSONB DEFAULT '[]', -- Local regulatory requirements
    
    -- Financial Analysis
    equipment_roi DECIMAL(8,4), -- ROI specific to equipment choices
    payback_period_months INTEGER, -- Equipment payback period
    financing_options JSONB DEFAULT '[]', -- Available financing options
    
    -- Currency and Pricing
    currency VARCHAR(10) DEFAULT 'TRY',
    price_validity_date DATE, -- Until when prices are valid
    inflation_adjustment DECIMAL(8,4) DEFAULT 0, -- Annual price increase expectation
    
    -- Audit fields
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    
    -- Constraints
    CONSTRAINT positive_greenhouse_size CHECK (greenhouse_size > 0),
    CONSTRAINT positive_total_cost CHECK (total_equipment_cost >= 0),
    CONSTRAINT valid_automation_level CHECK (automation_level IN ('manual', 'semi-automated', 'fully-automated')),
    CONSTRAINT valid_automation_coverage CHECK (automation_coverage >= 0 AND automation_coverage <= 100)
);

-- Add indexes for equipment analyses
CREATE INDEX IF NOT EXISTS idx_equipment_analyses_report_id ON equipment_analyses(report_id);
CREATE INDEX IF NOT EXISTS idx_equipment_analyses_user_id ON equipment_analyses(user_id);
CREATE INDEX IF NOT EXISTS idx_equipment_analyses_greenhouse_type ON equipment_analyses(greenhouse_type);
CREATE INDEX IF NOT EXISTS idx_equipment_analyses_production_system ON equipment_analyses(production_system);
CREATE INDEX IF NOT EXISTS idx_equipment_analyses_cost ON equipment_analyses(total_equipment_cost);

-- =====================================================
-- 5. MARKET ANALYSES TABLE
-- =====================================================
-- Market price and trend analysis
CREATE TABLE IF NOT EXISTS public.market_analyses (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    report_id UUID REFERENCES public.reports(id) ON DELETE CASCADE NOT NULL,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    
    -- Product Information
    primary_product VARCHAR(100) NOT NULL,
    product_category VARCHAR(50) NOT NULL, -- 'vegetables', 'fruits', 'herbs', 'flowers'
    product_variants JSONB DEFAULT '[]', -- Array of product variants/grades
    
    -- Market Scope
    target_markets JSONB NOT NULL, -- Array of target markets (local, regional, national, export)
    geographic_focus JSONB NOT NULL, -- Array of specific regions/cities
    
    -- Current Market Analysis
    current_market_price DECIMAL(10,4) NOT NULL, -- TL per unit
    price_unit VARCHAR(20) NOT NULL, -- 'kg', 'piece', 'bunch', etc.
    price_date DATE NOT NULL,
    
    -- Price History and Trends
    historical_prices JSONB DEFAULT '[]', -- Array of historical price data
    price_trend VARCHAR(50) NOT NULL, -- 'increasing', 'decreasing', 'stable', 'volatile'
    seasonal_price_pattern JSONB DEFAULT '{}', -- Monthly price patterns
    price_volatility_score INTEGER NOT NULL, -- 0-100 (higher = more volatile)
    
    -- Market Demand Analysis
    demand_level VARCHAR(50) NOT NULL, -- 'very_high', 'high', 'medium', 'low', 'very_low'
    demand_trend VARCHAR(50) NOT NULL, -- 'growing', 'stable', 'declining'
    market_size_tons DECIMAL(15,2), -- Total market size in tons
    market_growth_rate DECIMAL(8,4), -- Annual growth rate %
    
    -- Supply Analysis
    supply_level VARCHAR(50) NOT NULL, -- 'oversupply', 'balanced', 'undersupply'
    competition_level VARCHAR(50) NOT NULL, -- 'very_high', 'high', 'medium', 'low'
    major_suppliers JSONB DEFAULT '[]', -- Array of major suppliers/competitors
    market_concentration VARCHAR(50), -- 'fragmented', 'moderate', 'concentrated'
    
    -- Quality and Standards
    quality_requirements JSONB DEFAULT '{}', -- Quality standards and certifications
    organic_premium DECIMAL(8,4) DEFAULT 0, -- % premium for organic products
    certification_benefits JSONB DEFAULT '[]', -- Benefits of various certifications
    
    -- Distribution Channels
    distribution_channels JSONB NOT NULL, -- Array of sales channels
    channel_margins JSONB DEFAULT '{}', -- Margin data for each channel
    logistics_costs JSONB DEFAULT '{}', -- Transportation and storage costs
    
    -- Seasonal Analysis
    peak_seasons JSONB NOT NULL, -- Array of peak demand periods
    off_seasons JSONB NOT NULL, -- Array of low demand periods
    import_competition JSONB DEFAULT '{}', -- Import competition by season
    
    -- Price Predictions
    short_term_forecast JSONB DEFAULT '{}', -- 3-6 month price forecast
    medium_term_forecast JSONB DEFAULT '{}', -- 1-2 year forecast
    long_term_outlook JSONB DEFAULT '{}', -- 3-5 year outlook
    forecast_confidence DECIMAL(5,2) DEFAULT 60, -- Confidence in predictions %
    
    -- Economic Factors
    economic_indicators JSONB DEFAULT '{}', -- Relevant economic data
    currency_impact DECIMAL(8,4) DEFAULT 0, -- Impact of currency fluctuations
    inflation_adjustment DECIMAL(8,4) DEFAULT 0, -- Inflation considerations
    
    -- Market Opportunities
    market_gaps JSONB DEFAULT '[]', -- Identified market opportunities
    niche_markets JSONB DEFAULT '[]', -- Specialty market opportunities
    value_addition_opportunities JSONB DEFAULT '[]', -- Processing/value-add options
    
    -- Risk Assessment
    market_risks JSONB DEFAULT '[]', -- Array of market risks
    price_risks JSONB DEFAULT '[]', -- Price-related risks
    mitigation_strategies JSONB DEFAULT '[]', -- Risk mitigation approaches
    
    -- Regulatory Environment
    regulations JSONB DEFAULT '[]', -- Relevant regulations and policies
    trade_barriers JSONB DEFAULT '[]', -- Import/export barriers
    government_support JSONB DEFAULT '[]', -- Support programs and incentives
    
    -- Competitive Analysis
    competitive_advantages JSONB DEFAULT '[]', -- Potential competitive advantages
    barriers_to_entry JSONB DEFAULT '[]', -- Market entry barriers
    market_positioning JSONB DEFAULT '{}', -- Recommended market positioning
    
    -- Data Sources and Quality
    data_sources JSONB DEFAULT '[]', -- Array of data sources
    data_freshness DATE, -- When data was last updated
    data_reliability_score INTEGER DEFAULT 70, -- 0-100 reliability score
    
    -- Financial Impact
    revenue_potential DECIMAL(15,2), -- Estimated annual revenue potential
    profit_margin_estimate DECIMAL(8,4), -- Estimated profit margin %
    break_even_volume DECIMAL(15,2), -- Break-even production volume
    
    -- Currency and Units
    currency VARCHAR(10) DEFAULT 'TRY',
    weight_unit VARCHAR(10) DEFAULT 'kg',
    
    -- Audit fields
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    
    -- Constraints
    CONSTRAINT positive_market_price CHECK (current_market_price > 0),
    CONSTRAINT valid_price_volatility CHECK (price_volatility_score >= 0 AND price_volatility_score <= 100),
    CONSTRAINT valid_trends CHECK (
        price_trend IN ('increasing', 'decreasing', 'stable', 'volatile') AND
        demand_trend IN ('growing', 'stable', 'declining')
    ),
    CONSTRAINT valid_levels CHECK (
        demand_level IN ('very_high', 'high', 'medium', 'low', 'very_low') AND
        supply_level IN ('oversupply', 'balanced', 'undersupply') AND
        competition_level IN ('very_high', 'high', 'medium', 'low')
    )
);

-- Add indexes for market analyses
CREATE INDEX IF NOT EXISTS idx_market_analyses_report_id ON market_analyses(report_id);
CREATE INDEX IF NOT EXISTS idx_market_analyses_user_id ON market_analyses(user_id);
CREATE INDEX IF NOT EXISTS idx_market_analyses_product ON market_analyses(primary_product);
CREATE INDEX IF NOT EXISTS idx_market_analyses_category ON market_analyses(product_category);
CREATE INDEX IF NOT EXISTS idx_market_analyses_price_date ON market_analyses(price_date);

-- =====================================================
-- 6. LAYOUT PLANS TABLE
-- =====================================================
-- Greenhouse layout and planning data
CREATE TABLE IF NOT EXISTS public.layout_plans (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    report_id UUID REFERENCES public.reports(id) ON DELETE CASCADE NOT NULL,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    
    -- Project Information
    project_name VARCHAR(255) NOT NULL,
    greenhouse_type VARCHAR(50) NOT NULL,
    location JSONB DEFAULT '{}',
    
    -- Dimensions and Structure
    total_area DECIMAL(10,2) NOT NULL, -- Total area in square meters
    usable_area DECIMAL(10,2) NOT NULL, -- Usable growing area
    length DECIMAL(8,2) NOT NULL, -- Greenhouse length in meters
    width DECIMAL(8,2) NOT NULL, -- Greenhouse width in meters
    height DECIMAL(8,2) NOT NULL, -- Greenhouse height in meters
    
    -- Layout Configuration
    layout_type VARCHAR(50) NOT NULL, -- 'traditional', 'hydroponic', 'vertical', 'mixed'
    growing_system VARCHAR(50) NOT NULL, -- 'soil', 'nft', 'dwc', 'media_bed', 'aeroponic'
    planting_arrangement VARCHAR(50) NOT NULL, -- 'rows', 'beds', 'containers', 'towers'
    
    -- Capacity and Density
    plant_capacity INTEGER NOT NULL, -- Total number of plants
    planting_density DECIMAL(8,4) NOT NULL, -- Plants per square meter
    aisle_width DECIMAL(5,2) NOT NULL, -- Width of aisles in meters
    bed_width DECIMAL(5,2), -- Width of growing beds
    
    -- Zones and Sections
    growing_zones JSONB NOT NULL, -- Array of different growing zones
    climate_zones JSONB DEFAULT '[]', -- Different climate control zones
    service_areas JSONB DEFAULT '[]', -- Storage, work areas, etc.
    
    -- Infrastructure Layout
    irrigation_layout JSONB DEFAULT '{}', -- Irrigation system layout
    electrical_layout JSONB DEFAULT '{}', -- Electrical system layout
    ventilation_layout JSONB DEFAULT '{}', -- Ventilation system layout
    heating_layout JSONB DEFAULT '{}', -- Heating system layout
    
    -- Equipment Placement
    equipment_positions JSONB DEFAULT '[]', -- Positions of major equipment
    sensor_positions JSONB DEFAULT '[]', -- Environmental sensor locations
    control_panel_location JSONB DEFAULT '{}', -- Control systems placement
    
    -- Efficiency Metrics
    space_utilization DECIMAL(5,2) NOT NULL, -- % of space used for growing
    workflow_efficiency DECIMAL(5,2) DEFAULT 80, -- Workflow efficiency score 0-100
    accessibility_score DECIMAL(5,2) DEFAULT 80, -- Accessibility score 0-100
    
    -- Production Optimization
    crop_rotation_plan JSONB DEFAULT '[]', -- Crop rotation schedule
    succession_planting JSONB DEFAULT '{}', -- Succession planting strategy
    companion_planting JSONB DEFAULT '[]', -- Companion planting arrangements
    
    -- Environmental Considerations
    natural_light_distribution JSONB DEFAULT '{}', -- Light distribution analysis
    airflow_patterns JSONB DEFAULT '{}', -- Air circulation patterns
    temperature_zones JSONB DEFAULT '[]', -- Temperature distribution zones
    
    -- Expansion and Flexibility
    expansion_potential JSONB DEFAULT '{}', -- Future expansion options
    modular_design BOOLEAN DEFAULT FALSE, -- Whether layout is modular
    adaptability_score DECIMAL(5,2) DEFAULT 70, -- Adaptability score 0-100
    
    -- Cost Implications
    construction_complexity VARCHAR(50) DEFAULT 'medium', -- 'simple', 'medium', 'complex'
    estimated_construction_cost DECIMAL(15,2), -- Estimated construction cost
    maintenance_complexity VARCHAR(50) DEFAULT 'medium', -- Maintenance difficulty
    
    -- Performance Projections
    expected_yield_per_m2 DECIMAL(8,4), -- Expected yield per square meter
    production_efficiency DECIMAL(5,2) DEFAULT 85, -- Production efficiency %
    energy_efficiency_score DECIMAL(5,2) DEFAULT 75, -- Energy efficiency score
    
    -- Design Files and Visuals
    layout_image_url VARCHAR(500), -- URL to layout image/diagram
    technical_drawings JSONB DEFAULT '[]', -- Array of technical drawing URLs
    3d_model_url VARCHAR(500), -- URL to 3D model if available
    
    -- Standards and Compliance
    building_codes_compliance JSONB DEFAULT '[]', -- Building codes compliance
    safety_standards JSONB DEFAULT '[]', -- Safety standards met
    accessibility_standards JSONB DEFAULT '[]', -- Accessibility compliance
    
    -- Alternative Designs
    alternative_layouts JSONB DEFAULT '[]', -- Alternative layout options
    design_variations JSONB DEFAULT '[]', -- Design variation scenarios
    
    -- Environmental Impact
    sustainability_features JSONB DEFAULT '[]', -- Sustainable design features
    resource_efficiency JSONB DEFAULT '{}', -- Water, energy efficiency measures
    waste_management JSONB DEFAULT '{}', -- Waste management considerations
    
    -- Quality and Validation
    design_quality_score INTEGER DEFAULT 80, -- 0-100 design quality score
    structural_integrity BOOLEAN DEFAULT TRUE, -- Structural integrity validated
    peer_review_status VARCHAR(50) DEFAULT 'pending', -- 'pending', 'approved', 'needs_revision'
    
    -- Units and Measurements
    measurement_units VARCHAR(20) DEFAULT 'metric', -- 'metric', 'imperial'
    currency VARCHAR(10) DEFAULT 'TRY',
    
    -- Audit fields
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    
    -- Constraints
    CONSTRAINT positive_dimensions CHECK (
        total_area > 0 AND usable_area > 0 AND 
        length > 0 AND width > 0 AND height > 0
    ),
    CONSTRAINT valid_utilization CHECK (space_utilization >= 0 AND space_utilization <= 100),
    CONSTRAINT valid_efficiency_scores CHECK (
        workflow_efficiency >= 0 AND workflow_efficiency <= 100 AND
        accessibility_score >= 0 AND accessibility_score <= 100 AND
        adaptability_score >= 0 AND adaptability_score <= 100
    ),
    CONSTRAINT valid_complexity CHECK (
        construction_complexity IN ('simple', 'medium', 'complex') AND
        maintenance_complexity IN ('simple', 'medium', 'complex')
    ),
    CONSTRAINT usable_area_check CHECK (usable_area <= total_area)
);

-- Add indexes for layout plans
CREATE INDEX IF NOT EXISTS idx_layout_plans_report_id ON layout_plans(report_id);
CREATE INDEX IF NOT EXISTS idx_layout_plans_user_id ON layout_plans(user_id);
CREATE INDEX IF NOT EXISTS idx_layout_plans_greenhouse_type ON layout_plans(greenhouse_type);
CREATE INDEX IF NOT EXISTS idx_layout_plans_layout_type ON layout_plans(layout_type);
CREATE INDEX IF NOT EXISTS idx_layout_plans_total_area ON layout_plans(total_area);

-- =====================================================
-- 7. ANALYSIS SHARES TABLE
-- =====================================================
-- Report sharing and collaboration
CREATE TABLE IF NOT EXISTS public.analysis_shares (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    report_id UUID REFERENCES public.reports(id) ON DELETE CASCADE NOT NULL,
    shared_by UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    
    -- Sharing Information
    share_token VARCHAR(100) UNIQUE NOT NULL,
    share_type VARCHAR(50) NOT NULL, -- 'public', 'private', 'limited'
    
    -- Access Control
    shared_with_email VARCHAR(255), -- If shared with specific email
    shared_with_user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE, -- If shared with specific user
    password_protected BOOLEAN DEFAULT FALSE,
    share_password_hash VARCHAR(255), -- Hashed password if protected
    
    -- Permissions
    can_view BOOLEAN DEFAULT TRUE,
    can_download BOOLEAN DEFAULT FALSE,
    can_comment BOOLEAN DEFAULT FALSE,
    can_share BOOLEAN DEFAULT FALSE,
    
    -- Expiration and Limits
    expires_at TIMESTAMPTZ,
    max_views INTEGER, -- Maximum number of views allowed
    current_views INTEGER DEFAULT 0,
    
    -- Tracking
    first_accessed_at TIMESTAMPTZ,
    last_accessed_at TIMESTAMPTZ,
    access_count INTEGER DEFAULT 0,
    
    -- Metadata
    share_message TEXT, -- Optional message with the share
    share_title VARCHAR(255), -- Optional custom title
    
    -- Status
    is_active BOOLEAN DEFAULT TRUE,
    
    -- Audit fields
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    
    -- Constraints
    CONSTRAINT valid_share_type CHECK (share_type IN ('public', 'private', 'limited')),
    CONSTRAINT positive_limits CHECK (
        (max_views IS NULL OR max_views > 0) AND
        current_views >= 0 AND access_count >= 0
    )
);

-- Add indexes for analysis shares
CREATE INDEX IF NOT EXISTS idx_analysis_shares_report_id ON analysis_shares(report_id);
CREATE INDEX IF NOT EXISTS idx_analysis_shares_shared_by ON analysis_shares(shared_by);
CREATE INDEX IF NOT EXISTS idx_analysis_shares_token ON analysis_shares(share_token);
CREATE INDEX IF NOT EXISTS idx_analysis_shares_email ON analysis_shares(shared_with_email);
CREATE INDEX IF NOT EXISTS idx_analysis_shares_active ON analysis_shares(is_active) WHERE is_active = TRUE;

-- =====================================================
-- TRIGGERS FOR UPDATED_AT
-- =====================================================

-- Create triggers to automatically update updated_at timestamps
CREATE TRIGGER update_reports_updated_at 
    BEFORE UPDATE ON reports 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_roi_analyses_updated_at 
    BEFORE UPDATE ON roi_analyses 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_climate_analyses_updated_at 
    BEFORE UPDATE ON climate_analyses 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_equipment_analyses_updated_at 
    BEFORE UPDATE ON equipment_analyses 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_market_analyses_updated_at 
    BEFORE UPDATE ON market_analyses 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_layout_plans_updated_at 
    BEFORE UPDATE ON layout_plans 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_analysis_shares_updated_at 
    BEFORE UPDATE ON analysis_shares 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- ROW LEVEL SECURITY POLICIES
-- =====================================================

-- Enable RLS on all tables
ALTER TABLE public.reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.roi_analyses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.climate_analyses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.equipment_analyses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.market_analyses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.layout_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.analysis_shares ENABLE ROW LEVEL SECURITY;

-- Reports Policies
CREATE POLICY "Users can view own reports" ON public.reports
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create own reports" ON public.reports
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own reports" ON public.reports
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own reports" ON public.reports
    FOR DELETE USING (auth.uid() = user_id);

-- Public reports can be viewed by anyone
CREATE POLICY "Public reports can be viewed by all" ON public.reports
    FOR SELECT USING (is_public = TRUE);

-- Analysis tables policies (similar pattern for all)
CREATE POLICY "Users can view own roi analyses" ON public.roi_analyses
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create own roi analyses" ON public.roi_analyses
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own roi analyses" ON public.roi_analyses
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own roi analyses" ON public.roi_analyses
    FOR DELETE USING (auth.uid() = user_id);

-- Repeat similar policies for other analysis tables
-- (Climate, Equipment, Market, Layout) - similar pattern

-- Analysis Shares Policies
CREATE POLICY "Users can view own shares" ON public.analysis_shares
    FOR SELECT USING (auth.uid() = shared_by);

CREATE POLICY "Users can create shares" ON public.analysis_shares
    FOR INSERT WITH CHECK (auth.uid() = shared_by);

CREATE POLICY "Users can update own shares" ON public.analysis_shares
    FOR UPDATE USING (auth.uid() = shared_by);

-- =====================================================
-- VIEWS FOR REPORTING
-- =====================================================

-- User Reports Summary View
CREATE OR REPLACE VIEW public.user_reports_summary AS
SELECT 
    r.user_id,
    COUNT(*) as total_reports,
    COUNT(CASE WHEN r.status = 'completed' THEN 1 END) as completed_reports,
    COUNT(CASE WHEN r.status = 'processing' THEN 1 END) as processing_reports,
    COUNT(CASE WHEN r.report_type = 'roi' THEN 1 END) as roi_reports,
    COUNT(CASE WHEN r.report_type = 'climate' THEN 1 END) as climate_reports,
    COUNT(CASE WHEN r.report_type = 'equipment' THEN 1 END) as equipment_reports,
    COUNT(CASE WHEN r.report_type = 'market' THEN 1 END) as market_reports,
    COUNT(CASE WHEN r.report_type = 'layout' THEN 1 END) as layout_reports,
    SUM(r.tokens_consumed) as total_tokens_used,
    MAX(r.created_at) as last_report_date
FROM public.reports r
GROUP BY r.user_id;

-- Recent Reports View
CREATE OR REPLACE VIEW public.recent_reports AS
SELECT 
    r.id,
    r.title,
    r.report_type,
    r.status,
    r.created_at,
    r.completed_at,
    up.full_name as user_name,
    r.view_count,
    r.is_public
FROM public.reports r
LEFT JOIN public.user_profiles up ON r.user_id = up.id
WHERE r.created_at > NOW() - INTERVAL '30 days'
ORDER BY r.created_at DESC;

-- =====================================================
-- COMMENTS AND DOCUMENTATION
-- =====================================================

COMMENT ON TABLE public.reports IS 'Main reports table containing all analysis reports';
COMMENT ON TABLE public.roi_analyses IS 'ROI and investment analysis data';
COMMENT ON TABLE public.climate_analyses IS 'Climate and weather analysis data';
COMMENT ON TABLE public.equipment_analyses IS 'Equipment lists and cost analysis';
COMMENT ON TABLE public.market_analyses IS 'Market price and trend analysis';
COMMENT ON TABLE public.layout_plans IS 'Greenhouse layout and planning data';
COMMENT ON TABLE public.analysis_shares IS 'Report sharing and access control';

COMMENT ON COLUMN public.reports.summary IS 'Quick summary data for dashboard display';
COMMENT ON COLUMN public.reports.full_data IS 'Complete analysis results and data';
COMMENT ON COLUMN public.reports.metadata IS 'Analysis parameters and input data';
