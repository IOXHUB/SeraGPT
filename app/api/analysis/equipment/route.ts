import { NextRequest, NextResponse } from 'next/server';

// =====================================================
// EQUIPMENT ANALYSIS API ENDPOINT
// =====================================================
// Provides engineer-approved equipment recommendations
// for greenhouse construction and operation
// =====================================================

interface EquipmentRequest {
  greenhouse: {
    size: number; // m²
    type: 'glass' | 'polycarbonate' | 'plastic' | 'high_tech';
    height: number; // meters
    structure_type: 'gutter_connected' | 'individual_houses' | 'tunnel';
    automation_level: 'basic' | 'intermediate' | 'advanced' | 'full_automation';
    expansion_planned: boolean;
    budget_range: 'economy' | 'standard' | 'premium' | 'luxury';
  };
  location: {
    city: string;
    region: string;
    wind_zone: 1 | 2 | 3 | 4 | 5; // structural requirement zones
    snow_load: number; // kg/m²
    seismic_zone: 1 | 2 | 3 | 4 | 5;
  };
  production: {
    crop_type: 'tomato' | 'cucumber' | 'pepper' | 'lettuce' | 'strawberry' | 'herb' | 'flowers' | 'mixed';
    production_system: 'soil' | 'hydroponic' | 'aeroponic' | 'substrate' | 'nft' | 'dwc';
    target_production: 'hobby' | 'commercial' | 'industrial' | 'export_oriented';
    year_round_production: boolean;
    organic_certification: boolean;
  };
  utilities: {
    electricity_capacity: number; // kW available
    water_source: 'municipal' | 'well' | 'surface_water' | 'mixed';
    natural_gas_available: boolean;
    internet_connectivity: boolean;
    road_access_quality: 'excellent' | 'good' | 'fair' | 'poor';
  };
  priorities: {
    energy_efficiency: 1 | 2 | 3 | 4 | 5; // 1=not important, 5=critical
    automation: 1 | 2 | 3 | 4 | 5;
    durability: 1 | 2 | 3 | 4 | 5;
    cost_optimization: 1 | 2 | 3 | 4 | 5;
    scalability: 1 | 2 | 3 | 4 | 5;
  };
}

interface EquipmentResponse {
  success: boolean;
  data: {
    equipment_summary: {
      total_cost: number;
      total_items: number;
      delivery_timeline_weeks: number;
      installation_timeline_weeks: number;
      warranty_coverage: string;
      energy_efficiency_rating: 'A+' | 'A' | 'B' | 'C' | 'D';
    };
    structural_systems: {
      category: 'Structure & Frame';
      items: Array<{
        item_name: string;
        specification: string;
        quantity: number;
        unit: string;
        unit_price: number;
        total_price: number;
        supplier: string;
        delivery_weeks: number;
        warranty_years: number;
        technical_notes: string;
        certifications: Array<string>;
        engineer_approval: boolean;
        priority: 'critical' | 'high' | 'medium' | 'low';
      }>;
      category_total: number;
    };
    covering_systems: {
      category: 'Covering & Insulation';
      items: Array<EquipmentItem>;
      category_total: number;
    };
    climate_control: {
      category: 'Heating, Cooling & Ventilation';
      items: Array<EquipmentItem>;
      category_total: number;
    };
    irrigation_systems: {
      category: 'Irrigation & Fertigation';
      items: Array<EquipmentItem>;
      category_total: number;
    };
    automation_control: {
      category: 'Automation & Control Systems';
      items: Array<EquipmentItem>;
      category_total: number;
    };
    electrical_systems: {
      category: 'Electrical & Lighting';
      items: Array<EquipmentItem>;
      category_total: number;
    };
    bench_trolley_systems: {
      category: 'Benches, Trolleys & Logistics';
      items: Array<EquipmentItem>;
      category_total: number;
    };
    optional_upgrades: {
      category: 'Optional Upgrades & Future Expansions';
      items: Array<EquipmentItem>;
      category_total: number;
    };
    cost_breakdown: {
      by_category: Array<{
        category: string;
        cost: number;
        percentage: number;
        items_count: number;
      }>;
      by_priority: Array<{
        priority: string;
        cost: number;
        percentage: number;
        description: string;
      }>;
      financing_options: Array<{
        option_name: string;
        description: string;
        down_payment_percentage: number;
        monthly_payment_estimate: number;
        total_cost_with_interest: number;
        term_months: number;
      }>;
    };
    energy_analysis: {
      annual_consumption_kwh: number;
      peak_demand_kw: number;
      heating_cost_estimate: number;
      cooling_cost_estimate: number;
      lighting_cost_estimate: number;
      automation_savings_percentage: number;
      roi_months: number;
    };
    maintenance_schedule: Array<{
      equipment_category: string;
      maintenance_type: 'daily' | 'weekly' | 'monthly' | 'quarterly' | 'annually';
      description: string;
      estimated_hours: number;
      recommended_service_provider: 'self' | 'supplier' | 'certified_technician';
      cost_estimate_per_year: number;
    }>;
    supplier_information: Array<{
      supplier_name: string;
      contact_info: string;
      specialization: Array<string>;
      certifications: Array<string>;
      warranty_terms: string;
      installation_service: boolean;
      financing_available: boolean;
      regional_presence: Array<string>;
      engineer_recommendation_score: number; // 1-10
    }>;
    installation_plan: {
      phases: Array<{
        phase_number: number;
        phase_name: string;
        duration_weeks: number;
        equipment_categories: Array<string>;
        critical_path: boolean;
        weather_dependent: boolean;
        manpower_required: number;
        special_requirements: Array<string>;
      }>;
      total_timeline: {
        preparation_weeks: number;
        construction_weeks: number;
        testing_commissioning_weeks: number;
        total_weeks: number;
      };
      critical_milestones: Array<{
        milestone: string;
        week: number;
        dependencies: Array<string>;
        completion_criteria: string;
      }>;
    };
    alternatives_comparison: Array<{
      alternative_name: string;
      cost_difference: number;
      pros: Array<string>;
      cons: Array<string>;
      suitability_score: number; // 1-100
      engineer_recommendation: string;
    }>;
    pdf_url: string;
    analysis_id: string;
    generated_at: string;
  };
  token_cost: number;
  processing_time_ms: number;
}

interface EquipmentItem {
  item_name: string;
  specification: string;
  quantity: number;
  unit: string;
  unit_price: number;
  total_price: number;
  supplier: string;
  delivery_weeks: number;
  warranty_years: number;
  technical_notes: string;
  certifications: Array<string>;
  engineer_approval: boolean;
  priority: 'critical' | 'high' | 'medium' | 'low';
}

export async function POST(request: NextRequest) {
  const startTime = Date.now();
  
  try {
    // Parse request body
    const body: EquipmentRequest = await request.json();
    
    // Input validation
    const validation = validateEquipmentRequest(body);
    if (!validation.valid) {
      return NextResponse.json({
        success: false,
        error: validation.error,
        token_cost: 0,
        processing_time_ms: Date.now() - startTime
      }, { status: 400 });
    }

    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 2500 + Math.random() * 3500));

    // Generate mock equipment analysis
    const analysis = generateEquipmentAnalysis(body);
    
    const processingTime = Date.now() - startTime;
    
    return NextResponse.json({
      success: true,
      data: analysis,
      token_cost: 3, // Equipment analysis costs 3 tokens (most complex)
      processing_time_ms: processingTime
    });

  } catch (error) {
    console.error('Equipment Analysis API Error:', error);
    
    return NextResponse.json({
      success: false,
      error: 'Ekipman analizi gerçekleştirilemedi. Lütfen daha sonra tekrar deneyin.',
      token_cost: 0,
      processing_time_ms: Date.now() - startTime
    }, { status: 500 });
  }
}

function validateEquipmentRequest(body: EquipmentRequest) {
  if (!body.greenhouse?.size || body.greenhouse.size < 100 || body.greenhouse.size > 50000) {
    return { valid: false, error: 'Sera boyutu 100-50.000 m² arasında olmalıdır' };
  }
  
  if (!body.greenhouse?.type || !body.greenhouse?.automation_level) {
    return { valid: false, error: 'Sera tipi ve otomasyon seviyesi gereklidir' };
  }
  
  if (!body.location?.city || !body.location?.region) {
    return { valid: false, error: 'Lokasyon bilgileri eksik' };
  }
  
  if (!body.production?.crop_type || !body.production?.production_system) {
    return { valid: false, error: 'Üretim bilgileri eksik' };
  }
  
  return { valid: true };
}

function generateEquipmentAnalysis(request: EquipmentRequest): EquipmentResponse['data'] {
  const { greenhouse, location, production, utilities, priorities } = request;
  
  // Calculate base costs and specifications
  const baseCostPerM2 = getBaseCostPerM2(greenhouse.type, greenhouse.automation_level, greenhouse.budget_range);
  const totalEstimatedCost = greenhouse.size * baseCostPerM2;
  
  // Generate equipment systems
  const structuralSystems = generateStructuralSystems(greenhouse, location, totalEstimatedCost);
  const coveringSystems = generateCoveringSystems(greenhouse, totalEstimatedCost);
  const climateControl = generateClimateControl(greenhouse, location, totalEstimatedCost);
  const irrigationSystems = generateIrrigationSystems(greenhouse, production, totalEstimatedCost);
  const automationControl = generateAutomationControl(greenhouse, utilities, totalEstimatedCost);
  const electricalSystems = generateElectricalSystems(greenhouse, utilities, totalEstimatedCost);
  const benchTrolleySystems = generateBenchTrolleySystems(greenhouse, production, totalEstimatedCost);
  const optionalUpgrades = generateOptionalUpgrades(greenhouse, priorities, totalEstimatedCost);
  
  const totalCost = structuralSystems.category_total + coveringSystems.category_total + 
                   climateControl.category_total + irrigationSystems.category_total +
                   automationControl.category_total + electricalSystems.category_total +
                   benchTrolleySystems.category_total;
  
  return {
    equipment_summary: {
      total_cost: Math.round(totalCost),
      total_items: calculateTotalItems([structuralSystems, coveringSystems, climateControl, irrigationSystems, automationControl, electricalSystems, benchTrolleySystems]),
      delivery_timeline_weeks: calculateDeliveryTimeline(greenhouse.size, greenhouse.automation_level),
      installation_timeline_weeks: calculateInstallationTimeline(greenhouse.size, greenhouse.type),
      warranty_coverage: '2-10 yıl (ekipmana göre değişir)',
      energy_efficiency_rating: getEnergyRating(greenhouse.automation_level, priorities.energy_efficiency)
    },
    structural_systems: structuralSystems,
    covering_systems: coveringSystems,
    climate_control: climateControl,
    irrigation_systems: irrigationSystems,
    automation_control: automationControl,
    electrical_systems: electricalSystems,
    bench_trolley_systems: benchTrolleySystems,
    optional_upgrades: optionalUpgrades,
    cost_breakdown: generateCostBreakdown(totalCost, [structuralSystems, coveringSystems, climateControl, irrigationSystems, automationControl, electricalSystems, benchTrolleySystems]),
    energy_analysis: generateEnergyAnalysis(greenhouse, totalCost),
    maintenance_schedule: generateMaintenanceSchedule(greenhouse),
    supplier_information: generateSupplierInformation(location.region),
    installation_plan: generateInstallationPlan(greenhouse),
    alternatives_comparison: generateAlternativesComparison(greenhouse, totalCost),
    pdf_url: `/api/analysis/equipment/download?id=equipment_${Date.now()}`,
    analysis_id: `equipment_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    generated_at: new Date().toISOString()
  };
}

function getBaseCostPerM2(type: string, automation: string, budget: string): number {
  const baseCosts = {
    plastic: 180,
    polycarbonate: 300,
    glass: 450,
    high_tech: 700
  };
  
  const automationMultipliers = {
    basic: 1.0,
    intermediate: 1.4,
    advanced: 1.8,
    full_automation: 2.2
  };
  
  const budgetMultipliers = {
    economy: 0.8,
    standard: 1.0,
    premium: 1.3,
    luxury: 1.6
  };
  
  return (baseCosts[type as keyof typeof baseCosts] || 300) * 
         (automationMultipliers[automation as keyof typeof automationMultipliers] || 1.0) *
         (budgetMultipliers[budget as keyof typeof budgetMultipliers] || 1.0);
}

function generateStructuralSystems(greenhouse: any, location: any, totalCost: number) {
  const structuralCost = totalCost * 0.35;
  
  const items: EquipmentItem[] = [
    {
      item_name: 'Galvanizli Çelik Konstrüksi',
      specification: `${greenhouse.type === 'high_tech' ? 'S355' : 'S235'} çelik, hot-dip galvaniz`,
      quantity: Math.round(greenhouse.size * 0.08),
      unit: 'ton',
      unit_price: 25000,
      total_price: Math.round(structuralCost * 0.6),
      supplier: 'Sera Yapı A.Ş.',
      delivery_weeks: 8,
      warranty_years: 10,
      technical_notes: `Rüzgar yükü ${location.wind_zone} bölgesi için hesaplanmış`,
      certifications: ['CE Marking', 'TSE', 'ISO 9001'],
      engineer_approval: true,
      priority: 'critical'
    },
    {
      item_name: 'Beton Temeller',
      specification: 'C25/30 beton, B420C donatı',
      quantity: Math.round(greenhouse.size * 0.15),
      unit: 'm³',
      unit_price: 800,
      total_price: Math.round(structuralCost * 0.25),
      supplier: 'Yapı Beton Ltd.',
      delivery_weeks: 3,
      warranty_years: 25,
      technical_notes: 'Deprem bölgesi ${location.seismic_zone} için tasarlanmış',
      certifications: ['TS EN 206', 'TS 500'],
      engineer_approval: true,
      priority: 'critical'
    },
    {
      item_name: 'Alüminyum Profil Sistemleri',
      specification: '6063-T5 alüminyum, termal break',
      quantity: Math.round(greenhouse.size * 0.5),
      unit: 'm',
      unit_price: 150,
      total_price: Math.round(structuralCost * 0.15),
      supplier: 'Sistem Alüminyum',
      delivery_weeks: 6,
      warranty_years: 15,
      technical_notes: 'Korozyon direnci yüksek, düşük bakım',
      certifications: ['CE Marking', 'EN 755'],
      engineer_approval: true,
      priority: 'high'
    }
  ];
  
  return {
    category: 'Structure & Frame' as const,
    items,
    category_total: structuralCost
  };
}

function generateCoveringSystems(greenhouse: any, totalCost: number) {
  const coveringCost = totalCost * 0.25;
  
  const items: EquipmentItem[] = [
    {
      item_name: greenhouse.type === 'glass' ? 'Temperli Cam Paneller' : 'Polikarbonat Paneller',
      specification: greenhouse.type === 'glass' ? '4mm temperli cam, düşük demir' : '10mm çift cidarlı polikarbonat',
      quantity: Math.round(greenhouse.size * 1.3), // roof and walls
      unit: 'm²',
      unit_price: greenhouse.type === 'glass' ? 85 : 45,
      total_price: Math.round(coveringCost * 0.7),
      supplier: greenhouse.type === 'glass' ? 'Şişecam' : 'Politech Plastik',
      delivery_weeks: 4,
      warranty_years: greenhouse.type === 'glass' ? 10 : 8,
      technical_notes: `90% ışık geçirgenliği, ${greenhouse.type === 'glass' ? 'UV koruma' : 'çift cidarlı izolasyon'}`,
      certifications: ['CE Marking', 'EN 12150'],
      engineer_approval: true,
      priority: 'critical'
    },
    {
      item_name: 'Izolasyon Malzemeleri',
      specification: 'Elastomerik köpük, alüminyum folyo kaplı',
      quantity: Math.round(greenhouse.size * 0.2),
      unit: 'm²',
      unit_price: 25,
      total_price: Math.round(coveringCost * 0.2),
      supplier: 'Termo İzolasyon',
      delivery_weeks: 2,
      warranty_years: 5,
      technical_notes: 'Kondensasyon önleyici, enerji tasarrufu',
      certifications: ['CE Marking', 'EN 14303'],
      engineer_approval: true,
      priority: 'medium'
    },
    {
      item_name: 'Sızdırmazlık Sistemi',
      specification: 'EPDM conta, silikon mastik',
      quantity: Math.round(greenhouse.size * 0.8),
      unit: 'm',
      unit_price: 15,
      total_price: Math.round(coveringCost * 0.1),
      supplier: 'Seal Tech',
      delivery_weeks: 1,
      warranty_years: 10,
      technical_notes: 'Hava ve su sızdırmazlığı, UV dayanımı',
      certifications: ['EN 12365-1'],
      engineer_approval: true,
      priority: 'high'
    }
  ];
  
  return {
    category: 'Covering & Insulation' as const,
    items,
    category_total: coveringCost
  };
}

function generateClimateControl(greenhouse: any, location: any, totalCost: number) {
  const climateCost = totalCost * 0.2;
  
  const items: EquipmentItem[] = [
    {
      item_name: 'Doğalgaz Isıtma Sistemi',
      specification: '500 kW kazan, kondensing tipi',
      quantity: Math.ceil(greenhouse.size / 2000),
      unit: 'adet',
      unit_price: 180000,
      total_price: Math.round(climateCost * 0.4),
      supplier: 'Bosch Termoteknik',
      delivery_weeks: 6,
      warranty_years: 3,
      technical_notes: 'Yüksek verim, düşük emisyon, otomatik kontrol',
      certifications: ['CE Marking', 'EN 677'],
      engineer_approval: true,
      priority: 'critical'
    },
    {
      item_name: 'Evaporative Cooling Sistemi',
      specification: 'CELdek media, axial fanlar',
      quantity: Math.ceil(greenhouse.size / 1000),
      unit: 'set',
      unit_price: 45000,
      total_price: Math.round(climateCost * 0.3),
      supplier: 'Munters',
      delivery_weeks: 8,
      warranty_years: 2,
      technical_notes: '15°C sıcaklık düşürme kapasitesi',
      certifications: ['CE Marking'],
      engineer_approval: true,
      priority: 'high'
    },
    {
      item_name: 'Havalandırma Sistemleri',
      specification: 'Otomatik çatı ve yan havalandırma',
      quantity: Math.round(greenhouse.size * 0.25),
      unit: 'm²',
      unit_price: 120,
      total_price: Math.round(climateCost * 0.3),
      supplier: 'Ridder Growing Solutions',
      delivery_weeks: 5,
      warranty_years: 5,
      technical_notes: 'Rüzgar ve sıcaklık sensörlü otomatik kontrol',
      certifications: ['CE Marking', 'EN 13241-1'],
      engineer_approval: true,
      priority: 'high'
    }
  ];
  
  return {
    category: 'Heating, Cooling & Ventilation' as const,
    items,
    category_total: climateCost
  };
}

function generateIrrigationSystems(greenhouse: any, production: any, totalCost: number) {
  const irrigationCost = totalCost * 0.12;
  
  const items: EquipmentItem[] = [
    {
      item_name: 'Damla Sulama Sistemi',
      specification: 'Basınç kompanse edilmiş emitterler',
      quantity: Math.round(greenhouse.size * 1.5),
      unit: 'm',
      unit_price: 8,
      total_price: Math.round(irrigationCost * 0.4),
      supplier: 'Netafim',
      delivery_weeks: 3,
      warranty_years: 3,
      technical_notes: 'Uniform su dağıtımı, düşük basınç çalışma',
      certifications: ['ISO 9261'],
      engineer_approval: true,
      priority: 'critical'
    },
    {
      item_name: 'Gübreleme Sistemi',
      specification: 'Venturi enjektör, karışım tankı',
      quantity: 1,
      unit: 'set',
      unit_price: Math.round(irrigationCost * 0.35),
      total_price: Math.round(irrigationCost * 0.35),
      supplier: 'Dosatron',
      delivery_weeks: 4,
      warranty_years: 5,
      technical_notes: 'Otomatik pH ve EC kontrolü',
      certifications: ['CE Marking'],
      engineer_approval: true,
      priority: 'high'
    },
    {
      item_name: 'Su Filtrasyonu',
      specification: 'Kum-karbon-UV filtre sistemi',
      quantity: 1,
      unit: 'set',
      unit_price: Math.round(irrigationCost * 0.25),
      total_price: Math.round(irrigationCost * 0.25),
      supplier: 'Aqua Filtre',
      delivery_weeks: 2,
      warranty_years: 2,
      technical_notes: 'Mikroorganizma ve sediment temizleme',
      certifications: ['NSF', 'CE Marking'],
      engineer_approval: true,
      priority: 'medium'
    }
  ];
  
  return {
    category: 'Irrigation & Fertigation' as const,
    items,
    category_total: irrigationCost
  };
}

function generateAutomationControl(greenhouse: any, utilities: any, totalCost: number) {
  const automationCost = totalCost * (greenhouse.automation_level === 'basic' ? 0.05 : 
                                     greenhouse.automation_level === 'intermediate' ? 0.08 :
                                     greenhouse.automation_level === 'advanced' ? 0.12 : 0.15);
  
  const items: EquipmentItem[] = [
    {
      item_name: 'İklim Kontrol Bilgisayarı',
      specification: greenhouse.automation_level === 'full_automation' ? 'Priva Connext' : 'Basis kontrol ünitesi',
      quantity: 1,
      unit: 'adet',
      unit_price: Math.round(automationCost * 0.4),
      total_price: Math.round(automationCost * 0.4),
      supplier: 'Priva',
      delivery_weeks: 6,
      warranty_years: 3,
      technical_notes: 'Merkezi kontrol, uzaktan erişim, veri loglama',
      certifications: ['CE Marking', 'FCC'],
      engineer_approval: true,
      priority: 'critical'
    },
    {
      item_name: 'Sensör Sistemi',
      specification: 'Sıcaklık, nem, CO2, ışık sensörleri',
      quantity: Math.ceil(greenhouse.size / 500),
      unit: 'set',
      unit_price: 15000,
      total_price: Math.round(automationCost * 0.3),
      supplier: 'Vaisala',
      delivery_weeks: 4,
      warranty_years: 2,
      technical_notes: 'Yüksek hassasiyetli ölçüm, kablosuz iletişim',
      certifications: ['CE Marking', 'NIST'],
      engineer_approval: true,
      priority: 'high'
    },
    {
      item_name: 'Motorlu Valf ve Aktüatörler',
      specification: 'Servo motorlu, pozisyon geri bildirimi',
      quantity: Math.round(greenhouse.size / 200),
      unit: 'adet',
      unit_price: 2500,
      total_price: Math.round(automationCost * 0.3),
      supplier: 'Belimo',
      delivery_weeks: 3,
      warranty_years: 5,
      technical_notes: 'Hassas pozisyon kontrolü, düşük enerji tüketimi',
      certifications: ['CE Marking', 'IP65'],
      engineer_approval: true,
      priority: 'high'
    }
  ];
  
  return {
    category: 'Automation & Control Systems' as const,
    items,
    category_total: automationCost
  };
}

function generateElectricalSystems(greenhouse: any, utilities: any, totalCost: number) {
  const electricalCost = totalCost * 0.08;
  
  const items: EquipmentItem[] = [
    {
      item_name: 'Ana Elektrik Panosu',
      specification: 'IP65 sınıfı, otomatik sigorta sistemli',
      quantity: 1,
      unit: 'adet',
      unit_price: Math.round(electricalCost * 0.3),
      total_price: Math.round(electricalCost * 0.3),
      supplier: 'Schneider Electric',
      delivery_weeks: 4,
      warranty_years: 5,
      technical_notes: 'Akıllı güç yönetimi, arıza koruması',
      certifications: ['CE Marking', 'IEC 61439'],
      engineer_approval: true,
      priority: 'critical'
    },
    {
      item_name: 'LED Aydınlatma Sistemi',
      specification: 'Full spectrum LED, 200W/m²',
      quantity: greenhouse.size,
      unit: 'm²',
      unit_price: 45,
      total_price: Math.round(electricalCost * 0.5),
      supplier: 'Philips GreenPower',
      delivery_weeks: 8,
      warranty_years: 5,
      technical_notes: 'Enerji tasarruflu, uzun ömürlü, dimmerli',
      certifications: ['CE Marking', 'LM-80'],
      engineer_approval: true,
      priority: 'medium'
    },
    {
      item_name: 'Elektrik Dağıtım Kanalları',
      specification: 'Galvanizli çelik, kablo yönetimi',
      quantity: Math.round(greenhouse.size * 0.8),
      unit: 'm',
      unit_price: 25,
      total_price: Math.round(electricalCost * 0.2),
      supplier: 'Legrand',
      delivery_weeks: 2,
      warranty_years: 10,
      technical_notes: 'Kolay montaj, genişletilebilir',
      certifications: ['CE Marking', 'IEC 61537'],
      engineer_approval: true,
      priority: 'medium'
    }
  ];
  
  return {
    category: 'Electrical & Lighting' as const,
    items,
    category_total: electricalCost
  };
}

function generateBenchTrolleySystems(greenhouse: any, production: any, totalCost: number) {
  const benchCost = totalCost * 0.06;
  
  const items: EquipmentItem[] = [
    {
      item_name: 'Alüminyum Yetiştirme Masaları',
      specification: 'Ajustable ayak, drenaj sistemi',
      quantity: Math.round(greenhouse.size * 0.7),
      unit: 'm²',
      unit_price: 85,
      total_price: Math.round(benchCost * 0.6),
      supplier: 'HortiMaX',
      delivery_weeks: 6,
      warranty_years: 8,
      technical_notes: 'Ergonomik yükseklik, kolay temizlik',
      certifications: ['CE Marking'],
      engineer_approval: true,
      priority: 'high'
    },
    {
      item_name: 'Seyyar Trolley Sistemi',
      specification: 'Elektrikli tahrikli, ray sistemi',
      quantity: Math.ceil(greenhouse.size / 1000),
      unit: 'adet',
      unit_price: 35000,
      total_price: Math.round(benchCost * 0.4),
      supplier: 'Van der Hoeven',
      delivery_weeks: 12,
      warranty_years: 3,
      technical_notes: 'Tam otomatik sıraya yerleştirme',
      certifications: ['CE Marking', 'EN 619'],
      engineer_approval: true,
      priority: 'medium'
    }
  ];
  
  return {
    category: 'Benches, Trolleys & Logistics' as const,
    items,
    category_total: benchCost
  };
}

function generateOptionalUpgrades(greenhouse: any, priorities: any, totalCost: number) {
  const upgradeCost = totalCost * 0.15;
  
  const items: EquipmentItem[] = [
    {
      item_name: 'CO2 Dozaj Sistemi',
      specification: 'Doğalgaz yakıtlı CO2 üretici',
      quantity: 1,
      unit: 'adet',
      unit_price: 85000,
      total_price: Math.round(upgradeCost * 0.4),
      supplier: 'Hotbox International',
      delivery_weeks: 10,
      warranty_years: 3,
      technical_notes: '%20-30 verim artışı sağlar',
      certifications: ['CE Marking'],
      engineer_approval: true,
      priority: 'medium'
    },
    {
      item_name: 'Enerji Perdesi',
      specification: 'Çift katmanlı, otomatik açma-kapama',
      quantity: greenhouse.size,
      unit: 'm²',
      unit_price: 35,
      total_price: Math.round(upgradeCost * 0.3),
      supplier: 'Ludvig Svensson',
      delivery_weeks: 8,
      warranty_years: 8,
      technical_notes: '%30-50 enerji tasarrufu',
      certifications: ['CE Marking'],
      engineer_approval: true,
      priority: 'high'
    },
    {
      item_name: 'Güneş Enerjisi Sistemi',
      specification: '100kW fotovoltaik sistem',
      quantity: 1,
      unit: 'set',
      unit_price: Math.round(upgradeCost * 0.3),
      total_price: Math.round(upgradeCost * 0.3),
      supplier: 'Solar Energy Turkey',
      delivery_weeks: 12,
      warranty_years: 25,
      technical_notes: 'Elektrik maliyetlerini %60-80 azaltır',
      certifications: ['CE Marking', 'IEC 61215'],
      engineer_approval: true,
      priority: 'low'
    }
  ];
  
  return {
    category: 'Optional Upgrades & Future Expansions' as const,
    items,
    category_total: upgradeCost
  };
}

// Helper functions continue...
function calculateTotalItems(systems: any[]): number {
  return systems.reduce((total, system) => total + system.items.length, 0);
}

function calculateDeliveryTimeline(size: number, automation: string): number {
  const baseWeeks = 8;
  const sizeMultiplier = Math.log10(size / 1000) * 2;
  const automationWeeks = automation === 'full_automation' ? 4 : 
                         automation === 'advanced' ? 2 : 0;
  return Math.round(baseWeeks + sizeMultiplier + automationWeeks);
}

function calculateInstallationTimeline(size: number, type: string): number {
  const baseWeeks = 6;
  const sizeMultiplier = Math.log10(size / 1000) * 3;
  const typeMultiplier = type === 'high_tech' ? 4 : type === 'glass' ? 2 : 0;
  return Math.round(baseWeeks + sizeMultiplier + typeMultiplier);
}

function getEnergyRating(automation: string, energyPriority: number): 'A+' | 'A' | 'B' | 'C' | 'D' {
  const score = (automation === 'full_automation' ? 5 : 
                automation === 'advanced' ? 4 :
                automation === 'intermediate' ? 3 : 2) + energyPriority;
  
  if (score >= 9) return 'A+';
  if (score >= 7) return 'A';
  if (score >= 5) return 'B';
  if (score >= 3) return 'C';
  return 'D';
}

function generateCostBreakdown(totalCost: number, systems: any[]) {
  const byCategory = systems.map(system => ({
    category: system.category,
    cost: system.category_total,
    percentage: Math.round((system.category_total / totalCost) * 100),
    items_count: system.items.length
  }));
  
  return {
    by_category: byCategory,
    by_priority: [
      { priority: 'Kritik Ekipmanlar', cost: totalCost * 0.6, percentage: 60, description: 'Yapısal ve temel sistemler' },
      { priority: 'Önemli Ekipmanlar', cost: totalCost * 0.3, percentage: 30, description: 'İklim ve otomasyon' },
      { priority: 'Destekleyici Ekipmanlar', cost: totalCost * 0.1, percentage: 10, description: 'Opsiyonel ve konfor' }
    ],
    financing_options: [
      {
        option_name: 'Leasing (48 Ay)',
        description: 'Operasyonel kiralama, bakım dahil',
        down_payment_percentage: 15,
        monthly_payment_estimate: Math.round(totalCost * 0.021),
        total_cost_with_interest: Math.round(totalCost * 1.25),
        term_months: 48
      },
      {
        option_name: 'Banka Kredisi (60 Ay)',
        description: 'Yatırım kredisi, %1.5 faiz',
        down_payment_percentage: 30,
        monthly_payment_estimate: Math.round(totalCost * 0.7 * 0.019),
        total_cost_with_interest: Math.round(totalCost * 1.15),
        term_months: 60
      }
    ]
  };
}

function generateEnergyAnalysis(greenhouse: any, totalCost: number) {
  const annualConsumption = greenhouse.size * (greenhouse.automation_level === 'full_automation' ? 150 : 200);
  const peakDemand = greenhouse.size * 0.3;
  
  return {
    annual_consumption_kwh: annualConsumption,
    peak_demand_kw: peakDemand,
    heating_cost_estimate: Math.round(greenhouse.size * 25),
    cooling_cost_estimate: Math.round(greenhouse.size * 15),
    lighting_cost_estimate: Math.round(greenhouse.size * 30),
    automation_savings_percentage: greenhouse.automation_level === 'full_automation' ? 25 : 
                                  greenhouse.automation_level === 'advanced' ? 15 : 5,
    roi_months: Math.round(48 - (greenhouse.automation_level === 'full_automation' ? 12 : 0))
  };
}

function generateMaintenanceSchedule(greenhouse: any) {
  return [
    {
      equipment_category: 'İklim Kontrolü',
      maintenance_type: 'monthly' as const,
      description: 'Filtre temizliği, kontrol kalibrasyonu',
      estimated_hours: 8,
      recommended_service_provider: 'certified_technician' as const,
      cost_estimate_per_year: greenhouse.size * 3
    },
    {
      equipment_category: 'Sulama Sistemi',
      maintenance_type: 'weekly' as const,
      description: 'Emitter kontrol, pH-EC ayarı',
      estimated_hours: 2,
      recommended_service_provider: 'self' as const,
      cost_estimate_per_year: greenhouse.size * 1.5
    },
    {
      equipment_category: 'Elektrik Sistemleri',
      maintenance_type: 'quarterly' as const,
      description: 'Güvenlik kontrolü, pano temizliği',
      estimated_hours: 6,
      recommended_service_provider: 'certified_technician' as const,
      cost_estimate_per_year: greenhouse.size * 2
    }
  ];
}

function generateSupplierInformation(region: string) {
  return [
    {
      supplier_name: 'Sera Yapı A.Ş.',
      contact_info: 'info@serayapi.com.tr | 0232 XXX XXXX',
      specialization: ['Yapısal sistemler', 'Çelik konstrüksiyon'],
      certifications: ['ISO 9001', 'CE Marking', 'TSE'],
      warranty_terms: '10 yıl yapısal garanti',
      installation_service: true,
      financing_available: true,
      regional_presence: ['Ege', 'Akdeniz', 'Marmara'],
      engineer_recommendation_score: 9
    },
    {
      supplier_name: 'Priva Türkiye',
      contact_info: 'turkiye@priva.com | 0212 XXX XXXX',
      specialization: ['Otomasyon', 'İklim kontrolü'],
      certifications: ['ISO 14001', 'CE Marking'],
      warranty_terms: '3 yıl tam garanti',
      installation_service: true,
      financing_available: false,
      regional_presence: ['Tüm Türkiye'],
      engineer_recommendation_score: 10
    }
  ];
}

function generateInstallationPlan(greenhouse: any) {
  return {
    phases: [
      {
        phase_number: 1,
        phase_name: 'Temel ve Altyapı',
        duration_weeks: 4,
        equipment_categories: ['Temel', 'Elektrik altyapısı'],
        critical_path: true,
        weather_dependent: true,
        manpower_required: 8,
        special_requirements: ['Kepçe', 'Beton mikseri']
      },
      {
        phase_number: 2,
        phase_name: 'Yapısal Montaj',
        duration_weeks: 6,
        equipment_categories: ['Çelik yapı', 'Alüminyum profiller'],
        critical_path: true,
        weather_dependent: true,
        manpower_required: 12,
        special_requirements: ['Vinç', 'Kaynak makinesi']
      },
      {
        phase_number: 3,
        phase_name: 'Örtü ve İzolasyon',
        duration_weeks: 3,
        equipment_categories: ['Cam/Polikarbonat', 'İzolasyon'],
        critical_path: true,
        weather_dependent: true,
        manpower_required: 6,
        special_requirements: ['Cam taşıma ekipmanı']
      },
      {
        phase_number: 4,
        phase_name: 'Mekanik Sistemler',
        duration_weeks: 4,
        equipment_categories: ['İklim kontrol', 'Sulama sistemi'],
        critical_path: false,
        weather_dependent: false,
        manpower_required: 8,
        special_requirements: ['Sertifikalı teknisyen']
      }
    ],
    total_timeline: {
      preparation_weeks: 2,
      construction_weeks: 17,
      testing_commissioning_weeks: 2,
      total_weeks: 21
    },
    critical_milestones: [
      {
        milestone: 'Temel tamamlanması',
        week: 4,
        dependencies: ['Hava koşulları', 'Beton kürü'],
        completion_criteria: 'Mukavemet testi geçilmeli'
      },
      {
        milestone: 'Yapı montajı',
        week: 10,
        dependencies: ['Temel', 'Malzeme teslimatı'],
        completion_criteria: 'Statik kontrol onayı'
      },
      {
        milestone: 'Sistem devreye alma',
        week: 19,
        dependencies: ['Tüm montajlar', 'Elektrik bağlantısı'],
        completion_criteria: 'Performans testleri'
      }
    ]
  };
}

function generateAlternativesComparison(greenhouse: any, baseCost: number) {
  return [
    {
      alternative_name: 'Ekonomik Paket',
      cost_difference: -baseCost * 0.25,
      pros: ['Düşük maliyet', 'Hızlı kurulum', 'Basit bakım'],
      cons: ['Az otomasyon', 'Yüksek işçilik', 'Sınırlı genişleme'],
      suitability_score: 70,
      engineer_recommendation: 'Küçük işletmeler için uygun'
    },
    {
      alternative_name: 'Premium Paket',
      cost_difference: baseCost * 0.4,
      pros: ['Tam otomasyon', 'Yüksek verim', 'Düşük işletme maliyeti'],
      cons: ['Yüksek maliyet', 'Karmaşık sistem', 'Uzman gerekli'],
      suitability_score: 95,
      engineer_recommendation: 'Büyük ticari işletmeler için ideal'
    }
  ];
}
