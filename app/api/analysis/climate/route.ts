import { NextRequest, NextResponse } from 'next/server';

// =====================================================
// CLIMATE ANALYSIS API ENDPOINT
// =====================================================
// Analyzes climate suitability and risks for greenhouse
// operations based on location and crop requirements
// =====================================================

interface ClimateRequest {
  location: {
    city: string;
    region: string;
    coordinates?: { lat: number; lng: number };
  };
  greenhouse: {
    size: number; // m²
    type: 'glass' | 'polycarbonate' | 'plastic' | 'high_tech';
    heating_capacity: 'none' | 'basic' | 'standard' | 'advanced';
    cooling_capacity: 'none' | 'natural' | 'evaporative' | 'mechanical';
    structural_strength: 'basic' | 'reinforced' | 'heavy_duty';
  };
  crop: {
    type: 'tomato' | 'cucumber' | 'pepper' | 'lettuce' | 'strawberry' | 'herb' | 'other';
    variety?: string;
    growth_stage: 'seedling' | 'vegetative' | 'flowering' | 'fruiting' | 'year_round';
    temperature_requirements: {
      min_temp: number; // °C
      optimal_min: number;
      optimal_max: number;
      max_temp: number;
    };
    humidity_requirements: {
      min_humidity: number; // %
      optimal_min: number;
      optimal_max: number;
      max_humidity: number;
    };
  };
  analysis_period: {
    start_month: number; // 1-12
    end_month: number; // 1-12
    years_of_data: number; // historical analysis depth
  };
}

interface ClimateResponse {
  success: boolean;
  data: {
    suitability_score: {
      overall_score: number; // 0-100
      temperature_score: number;
      humidity_score: number;
      wind_score: number;
      precipitation_score: number;
      sunlight_score: number;
      recommendation: 'highly_suitable' | 'suitable' | 'moderate' | 'challenging' | 'not_suitable';
    };
    climate_analysis: {
      temperature: {
        annual_average: number;
        seasonal_ranges: Array<{
          season: string;
          avg_temp: number;
          min_temp: number;
          max_temp: number;
          days_below_optimal: number;
          days_above_optimal: number;
        }>;
        extreme_events: {
          frost_days_per_year: number;
          heat_wave_days_per_year: number;
          temperature_fluctuation_risk: 'low' | 'medium' | 'high';
        };
      };
      humidity: {
        annual_average: number;
        seasonal_ranges: Array<{
          season: string;
          avg_humidity: number;
          min_humidity: number;
          max_humidity: number;
          optimal_days: number;
        }>;
        condensation_risk: 'low' | 'medium' | 'high';
        ventilation_requirements: 'minimal' | 'moderate' | 'intensive';
      };
      wind: {
        average_speed: number; // km/h
        prevailing_direction: string;
        seasonal_patterns: Array<{
          season: string;
          avg_speed: number;
          max_speed: number;
          storm_frequency: number;
        }>;
        structural_stress_risk: 'low' | 'medium' | 'high';
      };
      precipitation: {
        annual_total: number; // mm
        monthly_distribution: Array<{
          month: string;
          precipitation: number;
          rainy_days: number;
        }>;
        irrigation_supplement_needed: number; // mm/year
        drainage_requirements: 'basic' | 'enhanced' | 'intensive';
      };
      sunlight: {
        annual_hours: number;
        seasonal_distribution: Array<{
          season: string;
          avg_daily_hours: number;
          photosynthetic_photon_flux: number; // μmol/m²/s
        }>;
        supplemental_lighting_needed: boolean;
        optimal_orientation: string;
      };
    };
    risk_assessment: {
      high_risks: Array<{
        risk_type: string;
        probability: number; // %
        impact_severity: 'low' | 'medium' | 'high' | 'critical';
        description: string;
        mitigation_strategies: Array<string>;
        estimated_cost_impact: number; // TL/year
      }>;
      medium_risks: Array<{
        risk_type: string;
        probability: number;
        impact_severity: 'low' | 'medium' | 'high' | 'critical';
        description: string;
        mitigation_strategies: Array<string>;
        estimated_cost_impact: number;
      }>;
      low_risks: Array<{
        risk_type: string;
        probability: number;
        impact_severity: 'low' | 'medium' | 'high' | 'critical';
        description: string;
        mitigation_strategies: Array<string>;
        estimated_cost_impact: number;
      }>;
    };
    optimization_recommendations: Array<{
      category: 'heating' | 'cooling' | 'ventilation' | 'irrigation' | 'structure' | 'crop_timing';
      title: string;
      description: string;
      implementation_cost: number;
      annual_savings: number;
      payback_period_months: number;
      priority: 'high' | 'medium' | 'low';
      seasonal_relevance: Array<string>;
    }>;
    comparative_analysis: {
      similar_regions: Array<{
        region_name: string;
        similarity_score: number;
        key_differences: Array<string>;
        success_examples: Array<{
          crop: string;
          yield_improvement: string;
          key_factors: Array<string>;
        }>;
      }>;
      optimal_crop_alternatives: Array<{
        crop: string;
        suitability_score: number;
        expected_yield_advantage: string;
        market_demand: 'high' | 'medium' | 'low';
        reasons: Array<string>;
      }>;
    };
    monthly_calendar: Array<{
      month: string;
      month_number: number;
      climate_conditions: {
        avg_temp: number;
        avg_humidity: number;
        precipitation: number;
        sunlight_hours: number;
        wind_speed: number;
      };
      crop_activities: Array<string>;
      climate_challenges: Array<string>;
      recommended_actions: Array<string>;
      energy_cost_estimate: number;
    }>;
    pdf_url: string;
    analysis_id: string;
    generated_at: string;
  };
  token_cost: number;
  processing_time_ms: number;
}

export async function POST(request: NextRequest) {
  const startTime = Date.now();
  
  try {
    // Parse request body
    const body: ClimateRequest = await request.json();
    
    // Input validation
    const validation = validateClimateRequest(body);
    if (!validation.valid) {
      return NextResponse.json({
        success: false,
        error: validation.error,
        token_cost: 0,
        processing_time_ms: Date.now() - startTime
      }, { status: 400 });
    }

    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 1500 + Math.random() * 2500));

    // Generate mock climate analysis
    const analysis = generateClimateAnalysis(body);
    
    const processingTime = Date.now() - startTime;
    
    return NextResponse.json({
      success: true,
      data: analysis,
      token_cost: 2, // Climate analysis costs 2 tokens
      processing_time_ms: processingTime
    });

  } catch (error) {
    console.error('Climate Analysis API Error:', error);
    
    return NextResponse.json({
      success: false,
      error: 'İklim analizi gerçekleştirilemedi. Lütfen daha sonra tekrar deneyin.',
      token_cost: 0,
      processing_time_ms: Date.now() - startTime
    }, { status: 500 });
  }
}

function validateClimateRequest(body: ClimateRequest) {
  if (!body.location?.city || !body.location?.region) {
    return { valid: false, error: 'Lokasyon bilgileri eksik' };
  }
  
  if (!body.greenhouse?.size || body.greenhouse.size < 100 || body.greenhouse.size > 50000) {
    return { valid: false, error: 'Sera boyutu 100-50.000 m² arasında olmalıdır' };
  }
  
  if (!body.crop?.type) {
    return { valid: false, error: 'Ürün tipi gereklidir' };
  }
  
  if (!body.crop?.temperature_requirements || !body.crop?.humidity_requirements) {
    return { valid: false, error: 'Ürün iklim gereksinimleri eksik' };
  }
  
  return { valid: true };
}

function generateClimateAnalysis(request: ClimateRequest): ClimateResponse['data'] {
  const { location, crop, greenhouse } = request;
  
  // Get regional climate data
  const regionalClimate = getRegionalClimateData(location.region);
  const cropRequirements = getCropRequirements(crop.type);
  
  // Calculate suitability scores
  const suitabilityScore = calculateSuitabilityScore(regionalClimate, cropRequirements, greenhouse);
  
  return {
    suitability_score: suitabilityScore,
    climate_analysis: generateClimateAnalysisData(regionalClimate, location),
    risk_assessment: generateRiskAssessment(regionalClimate, crop, greenhouse, location),
    optimization_recommendations: generateOptimizationRecommendations(regionalClimate, crop, greenhouse, suitabilityScore),
    comparative_analysis: generateComparativeAnalysis(location, crop),
    monthly_calendar: generateMonthlyCalendar(regionalClimate, crop),
    pdf_url: `/api/analysis/climate/download?id=climate_${Date.now()}`,
    analysis_id: `climate_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    generated_at: new Date().toISOString()
  };
}

function getRegionalClimateData(region: string) {
  const climateData = {
    'Akdeniz': {
      avgTemp: 18.5, minTemp: 4, maxTemp: 35, 
      avgHumidity: 65, precipitation: 650, windSpeed: 12, sunlightHours: 2800
    },
    'Ege': {
      avgTemp: 16.8, minTemp: 2, maxTemp: 38, 
      avgHumidity: 62, precipitation: 720, windSpeed: 15, sunlightHours: 2650
    },
    'Marmara': {
      avgTemp: 14.2, minTemp: -2, maxTemp: 32, 
      avgHumidity: 72, precipitation: 850, windSpeed: 18, sunlightHours: 2200
    },
    'İç Anadolu': {
      avgTemp: 12.1, minTemp: -8, maxTemp: 35, 
      avgHumidity: 58, precipitation: 420, windSpeed: 14, sunlightHours: 2400
    },
    'Karadeniz': {
      avgTemp: 13.8, minTemp: 0, maxTemp: 28, 
      avgHumidity: 78, precipitation: 1200, windSpeed: 16, sunlightHours: 1800
    },
    'Doğu Anadolu': {
      avgTemp: 9.2, minTemp: -15, maxTemp: 30, 
      avgHumidity: 55, precipitation: 520, windSpeed: 22, sunlightHours: 2100
    },
    'Güneydoğu Anadolu': {
      avgTemp: 17.8, minTemp: -2, maxTemp: 42, 
      avgHumidity: 52, precipitation: 380, windSpeed: 16, sunlightHours: 2900
    }
  };
  
  return climateData[region as keyof typeof climateData] || climateData['İç Anadolu'];
}

function getCropRequirements(cropType: string) {
  const requirements = {
    tomato: { optimalTempMin: 18, optimalTempMax: 24, optimalHumidity: 70, minSunlight: 6 },
    cucumber: { optimalTempMin: 20, optimalTempMax: 26, optimalHumidity: 75, minSunlight: 5 },
    pepper: { optimalTempMin: 22, optimalTempMax: 28, optimalHumidity: 65, minSunlight: 7 },
    lettuce: { optimalTempMin: 15, optimalTempMax: 20, optimalHumidity: 80, minSunlight: 4 },
    strawberry: { optimalTempMin: 16, optimalTempMax: 22, optimalHumidity: 65, minSunlight: 6 },
    herb: { optimalTempMin: 18, optimalTempMax: 25, optimalHumidity: 60, minSunlight: 5 },
    other: { optimalTempMin: 18, optimalTempMax: 25, optimalHumidity: 70, minSunlight: 6 }
  };
  
  return requirements[cropType as keyof typeof requirements] || requirements.other;
}

function calculateSuitabilityScore(climate: any, cropReq: any, greenhouse: any) {
  // Temperature suitability
  const tempScore = calculateTemperatureScore(climate.avgTemp, cropReq.optimalTempMin, cropReq.optimalTempMax);
  
  // Humidity suitability  
  const humidityScore = Math.max(0, 100 - Math.abs(climate.avgHumidity - cropReq.optimalHumidity) * 2);
  
  // Wind score (lower is better for greenhouse)
  const windScore = Math.max(0, 100 - (climate.windSpeed - 10) * 3);
  
  // Precipitation score (moderate is best)
  const precipScore = climate.precipitation > 400 && climate.precipitation < 1000 ? 90 : 
                     climate.precipitation < 400 ? 70 : 60;
  
  // Sunlight score
  const sunlightScore = Math.min(100, (climate.sunlightHours / 2500) * 100);
  
  const overallScore = Math.round((tempScore * 0.3 + humidityScore * 0.25 + windScore * 0.2 + 
                                 precipScore * 0.15 + sunlightScore * 0.1));
  
  const recommendation = overallScore >= 85 ? 'highly_suitable' :
                        overallScore >= 70 ? 'suitable' :
                        overallScore >= 55 ? 'moderate' :
                        overallScore >= 40 ? 'challenging' : 'not_suitable';
  
  return {
    overall_score: overallScore,
    temperature_score: Math.round(tempScore),
    humidity_score: Math.round(humidityScore),
    wind_score: Math.round(windScore),
    precipitation_score: Math.round(precipScore),
    sunlight_score: Math.round(sunlightScore),
    recommendation: recommendation as any
  };
}

function calculateTemperatureScore(avgTemp: number, optimalMin: number, optimalMax: number): number {
  if (avgTemp >= optimalMin && avgTemp <= optimalMax) {
    return 100;
  } else if (avgTemp < optimalMin) {
    return Math.max(0, 100 - (optimalMin - avgTemp) * 8);
  } else {
    return Math.max(0, 100 - (avgTemp - optimalMax) * 6);
  }
}

function generateClimateAnalysisData(climate: any, location: any) {
  const seasons = [
    { season: 'Kış', temp: climate.avgTemp - 8, humidity: climate.avgHumidity + 10 },
    { season: 'İlkbahar', temp: climate.avgTemp, humidity: climate.avgHumidity },
    { season: 'Yaz', temp: climate.avgTemp + 12, humidity: climate.avgHumidity - 15 },
    { season: 'Sonbahar', temp: climate.avgTemp + 2, humidity: climate.avgHumidity + 5 }
  ];
  
  return {
    temperature: {
      annual_average: climate.avgTemp,
      seasonal_ranges: seasons.map(s => ({
        season: s.season,
        avg_temp: s.temp,
        min_temp: s.temp - 5,
        max_temp: s.temp + 8,
        days_below_optimal: Math.floor(Math.random() * 30 + 10),
        days_above_optimal: Math.floor(Math.random() * 20 + 5)
      })),
      extreme_events: {
        frost_days_per_year: climate.minTemp < 0 ? Math.floor(Math.random() * 20 + 5) : 0,
        heat_wave_days_per_year: climate.maxTemp > 35 ? Math.floor(Math.random() * 15 + 5) : 0,
        temperature_fluctuation_risk: climate.maxTemp - climate.minTemp > 35 ? 'high' : 'medium'
      }
    },
    humidity: {
      annual_average: climate.avgHumidity,
      seasonal_ranges: seasons.map(s => ({
        season: s.season,
        avg_humidity: s.humidity,
        min_humidity: s.humidity - 10,
        max_humidity: s.humidity + 15,
        optimal_days: Math.floor(Math.random() * 40 + 50)
      })),
      condensation_risk: climate.avgHumidity > 75 ? 'high' : climate.avgHumidity > 65 ? 'medium' : 'low',
      ventilation_requirements: climate.avgHumidity > 75 ? 'intensive' : 'moderate'
    },
    wind: {
      average_speed: climate.windSpeed,
      prevailing_direction: 'Kuzey-Batı',
      seasonal_patterns: seasons.map(s => ({
        season: s.season,
        avg_speed: climate.windSpeed + (Math.random() * 6 - 3),
        max_speed: climate.windSpeed + 15 + Math.random() * 10,
        storm_frequency: Math.floor(Math.random() * 3)
      })),
      structural_stress_risk: climate.windSpeed > 20 ? 'high' : climate.windSpeed > 15 ? 'medium' : 'low'
    },
    precipitation: {
      annual_total: climate.precipitation,
      monthly_distribution: Array.from({length: 12}, (_, i) => ({
        month: ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran', 
               'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'][i],
        precipitation: Math.round(climate.precipitation / 12 * (0.5 + Math.random())),
        rainy_days: Math.floor(Math.random() * 10 + 5)
      })),
      irrigation_supplement_needed: Math.max(0, 800 - climate.precipitation),
      drainage_requirements: climate.precipitation > 1000 ? 'intensive' : 
                           climate.precipitation > 600 ? 'enhanced' : 'basic'
    },
    sunlight: {
      annual_hours: climate.sunlightHours,
      seasonal_distribution: seasons.map(s => ({
        season: s.season,
        avg_daily_hours: climate.sunlightHours / 365 + (Math.random() * 2 - 1),
        photosynthetic_photon_flux: 400 + Math.random() * 200
      })),
      supplemental_lighting_needed: climate.sunlightHours < 2000,
      optimal_orientation: 'Güney'
    }
  };
}

function generateRiskAssessment(climate: any, crop: any, greenhouse: any, location: any) {
  const risks = {
    high_risks: [],
    medium_risks: [],
    low_risks: []
  };
  
  // Temperature risks
  if (climate.maxTemp > 35) {
    risks.high_risks.push({
      risk_type: 'Aşırı Sıcaklık',
      probability: 75,
      impact_severity: 'high' as const,
      description: 'Yaz aylarında aşırı sıcaklık ürün stresine ve verim kaybına neden olabilir.',
      mitigation_strategies: [
        'Gelişmiş soğutma sistemi kurulumu',
        'Gölgelendirme sistemleri',
        'Evaporative cooling',
        'Havalandırma kapasitesi artırma'
      ],
      estimated_cost_impact: greenhouse.size * 15
    });
  }
  
  if (climate.minTemp < 5) {
    risks.high_risks.push({
      risk_type: 'Don Riski',
      probability: 60,
      impact_severity: 'critical' as const,
      description: 'Kış aylarında don riski ürün kaybına ve sera hasarına neden olabilir.',
      mitigation_strategies: [
        'Güçlü ısıtma sistemi kurulumu',
        'Termal ekran sistemleri',
        'Zemin ısıtması',
        'Acil durum jeneratörü'
      ],
      estimated_cost_impact: greenhouse.size * 25
    });
  }
  
  if (climate.windSpeed > 18) {
    risks.medium_risks.push({
      risk_type: 'Rüzgar Hasarı',
      probability: 45,
      impact_severity: 'medium' as const,
      description: 'Güçlü rüzgarlar sera yapısına zarar verebilir.',
      mitigation_strategies: [
        'Rüzgar kırıcı ağaçlar/bariyerler',
        'Sera yapısını güçlendirme',
        'Düzenli yapısal bakım'
      ],
      estimated_cost_impact: greenhouse.size * 8
    });
  }
  
  if (climate.avgHumidity > 75) {
    risks.medium_risks.push({
      risk_type: 'Yüksek Nem',
      probability: 70,
      impact_severity: 'medium' as const,
      description: 'Yüksek nem fungal hastalıklara ve ürün kalitesi düşüklüğüne yol açabilir.',
      mitigation_strategies: [
        'Gelişmiş havalandırma sistemi',
        'Nem kontrolü cihazları',
        'Preventif ilaçlama programı'
      ],
      estimated_cost_impact: greenhouse.size * 12
    });
  }
  
  // Add some low risks
  risks.low_risks.push({
    risk_type: 'Hail Damage',
    probability: 15,
    impact_severity: 'low' as const,
    description: 'Dolu sera örtü malzemesine zarar verebilir.',
    mitigation_strategies: [
      'Dolu ağları kurulumu',
      'Sigorta kapsamını genişletme'
    ],
    estimated_cost_impact: greenhouse.size * 3
  });
  
  return risks;
}

function generateOptimizationRecommendations(climate: any, crop: any, greenhouse: any, suitability: any) {
  const recommendations = [];
  
  if (climate.maxTemp > 30) {
    recommendations.push({
      category: 'cooling' as const,
      title: 'Evaporative Cooling Sistemi',
      description: 'Yaz aylarında sera içi sıcaklığını 5-8°C düşürerek optimal iklim koşulları sağlar.',
      implementation_cost: greenhouse.size * 35,
      annual_savings: greenhouse.size * 12,
      payback_period_months: 36,
      priority: 'high' as const,
      seasonal_relevance: ['Haziran', 'Temmuz', 'Ağustos', 'Eylül']
    });
  }
  
  if (climate.minTemp < 10) {
    recommendations.push({
      category: 'heating' as const,
      title: 'Termal Ekran Sistemi',
      description: 'Gece ısı kaybını %30-40 azaltarak ısıtma maliyetlerini düşürür.',
      implementation_cost: greenhouse.size * 25,
      annual_savings: greenhouse.size * 18,
      payback_period_months: 18,
      priority: 'high' as const,
      seasonal_relevance: ['Aralık', 'Ocak', 'Şubat', 'Mart']
    });
  }
  
  if (climate.avgHumidity > 70) {
    recommendations.push({
      category: 'ventilation' as const,
      title: 'Otomatik Havalandırma Sistemi',
      description: 'Nem kontrolü ve hastalık riskini azaltma için akıllı havalandırma.',
      implementation_cost: greenhouse.size * 20,
      annual_savings: greenhouse.size * 8,
      payback_period_months: 30,
      priority: 'medium' as const,
      seasonal_relevance: ['Nisan', 'Mayıs', 'Haziran', 'Ekim', 'Kasım']
    });
  }
  
  return recommendations;
}

function generateComparativeAnalysis(location: any, crop: any) {
  return {
    similar_regions: [
      {
        region_name: 'Antalya Kumluca',
        similarity_score: 85,
        key_differences: ['Daha az rüzgar', 'Daha yüksek nem'],
        success_examples: [
          {
            crop: 'Domates',
            yield_improvement: '%25 daha yüksek verim',
            key_factors: ['Uzatılmış sezon', 'İyi iklim kontrolü', 'Kaliteli sulama']
          }
        ]
      },
      {
        region_name: 'Mersin Silifke',
        similarity_score: 78,
        key_differences: ['Daha sıcak yaz', 'Az yağış'],
        success_examples: [
          {
            crop: 'Biber',
            yield_improvement: '%30 daha yüksek kalite',
            key_factors: ['Güneş ışığı optimizasyonu', 'Su yönetimi', 'Hastalık kontrolü']
          }
        ]
      }
    ],
    optimal_crop_alternatives: [
      {
        crop: 'Çilek',
        suitability_score: 92,
        expected_yield_advantage: '%40 daha yüksek gelir',
        market_demand: 'high' as const,
        reasons: ['Yüksek pazar değeri', 'İklim uygunluğu', 'Uzun hasat sezonu']
      },
      {
        crop: 'Aromatic Herbs',
        suitability_score: 88,
        expected_yield_advantage: '%60 daha yüksek kar marjı',
        market_demand: 'medium' as const,
        reasons: ['Premium fiyat', 'Düşük su ihtiyacı', 'Yıl boyu üretim']
      }
    ]
  };
}

function generateMonthlyCalendar(climate: any, crop: any) {
  const months = [
    'Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran',
    'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'
  ];
  
  return months.map((month, index) => ({
    month,
    month_number: index + 1,
    climate_conditions: {
      avg_temp: climate.avgTemp + Math.sin((index - 6) * Math.PI / 6) * 10,
      avg_humidity: climate.avgHumidity + Math.random() * 10 - 5,
      precipitation: climate.precipitation / 12 * (0.5 + Math.random()),
      sunlight_hours: climate.sunlightHours / 365 * 30 * (0.8 + Math.sin((index - 6) * Math.PI / 6) * 0.4),
      wind_speed: climate.windSpeed + Math.random() * 4 - 2
    },
    crop_activities: getCropActivities(index, crop.type),
    climate_challenges: getClimateChallenge(index, climate),
    recommended_actions: getRecommendedActions(index, climate, crop),
    energy_cost_estimate: Math.round(Math.abs(Math.sin((index - 6) * Math.PI / 6)) * 1000 + 500)
  }));
}

function getCropActivities(monthIndex: number, cropType: string): string[] {
  const activities = {
    0: ['Tohum ekimi', 'Fide bakımı', 'Isıtma sistemi kontrolü'],
    1: ['Fide dikim', 'Sulama ayarları', 'Nem kontrolü'],
    2: ['Büyüme takibi', 'İlk budama', 'Gübre uygulaması'],
    3: ['Çiçeklenme desteği', 'Arı kolonisi', 'Havalandırma ayarları'],
    4: ['İlk hasat', 'Kalite kontrolü', 'Pazarlama başlangıcı'],
    5: ['Ana hasat', 'Soğutma sistemi devreye alma', 'Yoğun üretim'],
    6: ['Yoğun hasat', 'Sıcaklık kontrolü', 'Su yönetimi'],
    7: ['Hasat devam', 'Bitki bakımı', 'Hastalık kontrolü'],
    8: ['Son hasat', 'Temizlik', 'Toprak hazırlığı'],
    9: ['Yeni sezon hazırlığı', 'Sistem bakımı', 'Tohum siparişi'],
    10: ['Fide hazırlığı', 'Isıtma sistemi testi', 'Yapısal kontroller'],
    11: ['Kış hazırlığı', 'Sistem bakımı', 'Planlama']
  };
  
  return activities[monthIndex as keyof typeof activities] || ['Rutin bakım'];
}

function getClimateChallenge(monthIndex: number, climate: any): string[] {
  const challenges = {
    0: ['Düşük sıcaklık', 'Yüksek enerji maliyeti'],
    1: ['Don riski', 'Nem kontrolü'],
    2: ['Değişken hava', 'Hastalık riski'],
    3: ['Rüzgar artışı', 'Polen transfer'],
    4: ['Sıcaklık dalgalanması', 'Su ihtiyacı artışı'],
    5: ['Yüksek sıcaklık', 'Soğutma maliyeti'],
    6: ['Aşırı sıcaklık', 'Su stresi'],
    7: ['Yüksek nem', 'Hastalık riski'],
    8: ['Sıcaklık düşüşü', 'Nem artışı'],
    9: ['Değişken iklim', 'Hasat zamanlaması'],
    10: ['Soğuma başlangıcı', 'Enerji artışı'],
    11: ['Düşük sıcaklık', 'Kısa gün']
  };
  
  return challenges[monthIndex as keyof typeof challenges] || ['Rutin kontroller'];
}

function getRecommendedActions(monthIndex: number, climate: any, crop: any): string[] {
  const actions = {
    0: ['Isıtma optimize et', 'Nem seviyesi kontrol et', 'Enerji tasarruf moduna geç'],
    1: ['Don koruma sistemini aktive et', 'Havalandırma ayarla', 'Bitki sağlığını izle'],
    2: ['Güneş ışığından faydalanmayı artır', 'Büyüme izle', 'Sulama programı ayarla'],
    3: ['Havalandırma kapasitesi artır', 'Çiçeklenme desteği ver', 'Tozlaşma kontrol et'],
    4: ['Soğutma sistemi hazırla', 'Hasat planı yap', 'Su ihtiyacını artır'],
    5: ['Tam soğutma devreye sok', 'Gölgelendirme sistemi kur', 'Yoğun sulama uygula'],
    6: ['Maksimum soğutma', 'Stres göstergelerini izle', 'Su kalitesi kontrol et'],
    7: ['Nem kontrolünü artır', 'Hastalık önleme uygula', 'Hasat optimizasyonu'],
    8: ['Havalandırma ayarla', 'Bitki temizliği yap', 'Yeni sezon için hazırlan'],
    9: ['Isıtma sistemi teste et', 'Yapısal kontrol yap', 'Tohum siparişi ver'],
    10: ['Isıtma sistemi devreye sok', 'Nem kontrolü ayarla', 'Kış hazırlığı yap'],
    11: ['Enerji tasarruf optimize et', 'Işık destek sistemi kur', 'Bakım planla']
  };
  
  return actions[monthIndex as keyof typeof actions] || ['Rutin bakım'];
}
