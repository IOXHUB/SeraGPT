import { NextRequest, NextResponse } from 'next/server';

// =====================================================
// LAYOUT ANALYSIS API ENDPOINT
// =====================================================
// Generates technical layout plans and 2D/3D 
// visualizations for greenhouse construction
// =====================================================

interface LayoutRequest {
  site: {
    total_area: number; // m²
    usable_area: number; // m²
    dimensions: {
      length: number; // m
      width: number; // m
      slope_percentage: number;
      orientation: 'north_south' | 'east_west' | 'optimal';
    };
    access: {
      road_access_side: 'north' | 'south' | 'east' | 'west';
      road_width: number; // m
      utilities_access: Array<'electricity' | 'water' | 'natural_gas' | 'internet'>;
    };
    constraints: {
      setback_requirements: number; // m from property lines
      height_restrictions: number; // m maximum height
      environmental_constraints: Array<'wetlands' | 'slopes' | 'trees' | 'neighbors'>;
    };
  };
  greenhouse: {
    target_size: number; // m²
    type: 'glass' | 'polycarbonate' | 'plastic' | 'high_tech';
    structure: 'gutter_connected' | 'individual_houses' | 'tunnel' | 'multi_span';
    height: number; // m
    bay_width: number; // m (typical span width)
    automation_level: 'basic' | 'intermediate' | 'advanced' | 'full_automation';
    expansion_phases: number; // 1-4 phases
  };
  production: {
    crop_type: 'tomato' | 'cucumber' | 'pepper' | 'lettuce' | 'strawberry' | 'herb' | 'flowers' | 'mixed';
    growing_system: 'soil' | 'hydroponic' | 'vertical' | 'nft' | 'dwc' | 'substrate';
    plant_density: number; // plants per m²
    aisle_requirements: 'minimum' | 'standard' | 'wide' | 'equipment_access';
    harvesting_method: 'manual' | 'semi_automated' | 'fully_automated';
  };
  infrastructure: {
    office_space_required: boolean;
    storage_space: number; // m²
    processing_area: boolean;
    cold_storage: boolean;
    maintenance_workshop: boolean;
    visitor_facilities: boolean;
    parking_spaces: number;
  };
  utilities_requirements: {
    electrical_load: number; // kW
    water_consumption: number; // m³/day
    heating_capacity: number; // kW
    backup_power: boolean;
    drainage_requirements: 'basic' | 'enhanced' | 'industrial';
  };
}

interface LayoutResponse {
  success: boolean;
  data: {
    layout_summary: {
      total_footprint: number; // m²
      greenhouse_area: number; // m²
      support_buildings_area: number; // m²
      circulation_area: number; // m²
      green_space_area: number; // m²
      site_utilization_percentage: number;
      construction_phases: number;
    };
    technical_drawings: {
      site_plan: {
        drawing_url: string;
        scale: string;
        dimensions: { width: number; height: number };
        features: Array<{
          feature_type: string;
          coordinates: { x: number; y: number };
          dimensions: { length: number; width: number };
          specifications: string;
        }>;
      };
      floor_plan: {
        drawing_url: string;
        scale: string;
        interior_layout: Array<{
          zone_name: string;
          area: number; // m²
          coordinates: { x: number; y: number };
          dimensions: { length: number; width: number };
          function: string;
          equipment: Array<string>;
        }>;
      };
      elevation_views: Array<{
        view_name: 'north' | 'south' | 'east' | 'west';
        drawing_url: string;
        height_measurements: Array<{
          point: string;
          height: number;
        }>;
        structural_elements: Array<string>;
      }>;
      cross_sections: Array<{
        section_name: string;
        drawing_url: string;
        cutting_plane: string;
        structural_details: Array<string>;
      }>;
      3d_visualization: {
        model_url: string;
        rendered_views: Array<{
          view_angle: string;
          image_url: string;
          description: string;
        }>;
      };
    };
    structural_design: {
      foundation_system: {
        type: 'strip_footings' | 'pad_footings' | 'slab_on_grade' | 'deep_foundations';
        specifications: string;
        concrete_volume: number; // m³
        reinforcement_tonnage: number; // tons
        excavation_volume: number; // m³
      };
      frame_structure: {
        material: 'steel' | 'aluminum' | 'concrete' | 'composite';
        column_spacing: number; // m
        beam_specifications: string;
        connection_details: Array<string>;
        total_steel_tonnage: number; // tons
      };
      covering_system: {
        material: 'glass' | 'polycarbonate' | 'plastic';
        specifications: string;
        total_area: number; // m²
        wind_load_rating: string;
        snow_load_rating: string;
      };
    };
    mechanical_systems: {
      hvac_layout: {
        heating_zones: Array<{
          zone_name: string;
          area: number; // m²
          heat_load: number; // kW
          equipment_location: { x: number; y: number };
          distribution_method: string;
        }>;
        cooling_zones: Array<{
          zone_name: string;
          area: number; // m²
          cooling_load: number; // kW
          equipment_location: { x: number; y: number };
          ventilation_requirements: string;
        }>;
        ductwork_layout: Array<{
          duct_id: string;
          start_point: { x: number; y: number };
          end_point: { x: number; y: number };
          duct_size: string;
          airflow_rate: number; // m³/h
        }>;
      };
      irrigation_layout: {
        main_lines: Array<{
          line_id: string;
          start_point: { x: number; y: number };
          end_point: { x: number; y: number };
          pipe_diameter: number; // mm
          flow_rate: number; // L/min
        }>;
        distribution_zones: Array<{
          zone_name: string;
          area: number; // m²
          emitter_count: number;
          water_requirement: number; // L/day
        }>;
        control_systems: Array<{
          controller_type: string;
          location: { x: number; y: number };
          zones_controlled: Array<string>;
        }>;
      };
      electrical_layout: {
        main_panel_location: { x: number; y: number };
        sub_panels: Array<{
          panel_id: string;
          location: { x: number; y: number };
          capacity: number; // A
          circuits: Array<string>;
        }>;
        lighting_circuits: Array<{
          circuit_id: string;
          fixture_count: number;
          total_load: number; // kW
          switching_zones: Array<string>;
        }>;
        power_circuits: Array<{
          circuit_id: string;
          equipment_served: Array<string>;
          load: number; // kW
        }>;
      };
    };
    space_allocation: {
      production_areas: Array<{
        area_name: string;
        size: number; // m²
        plant_capacity: number;
        growing_system: string;
        access_requirements: string;
        climate_zone: string;
      }>;
      support_areas: Array<{
        area_name: string;
        size: number; // m²
        function: string;
        equipment: Array<string>;
        access_level: 'public' | 'staff' | 'restricted';
      }>;
      circulation_paths: Array<{
        path_name: string;
        width: number; // m
        length: number; // m
        surface_type: string;
        load_capacity: string;
      }>;
    };
    construction_phases: Array<{
      phase_number: number;
      phase_name: string;
      description: string;
      area_covered: number; // m²
      duration_weeks: number;
      cost_estimate: number;
      dependencies: Array<string>;
      deliverables: Array<{
        item: string;
        completion_criteria: string;
      }>;
    }>;
    compliance_requirements: {
      building_codes: Array<{
        code_name: string;
        applicable_sections: Array<string>;
        compliance_notes: string;
      }>;
      permits_required: Array<{
        permit_type: string;
        issuing_authority: string;
        estimated_approval_time: string;
        requirements: Array<string>;
      }>;
      inspections_schedule: Array<{
        inspection_type: string;
        phase: string;
        inspector: string;
        checklist_items: Array<string>;
      }>;
    };
    optimization_recommendations: Array<{
      category: 'efficiency' | 'cost' | 'functionality' | 'sustainability';
      recommendation: string;
      impact: string;
      implementation_cost: number;
      payback_period: string;
      priority: 'high' | 'medium' | 'low';
    }>;
    cost_breakdown: {
      by_system: Array<{
        system_name: string;
        cost: number;
        percentage: number;
      }>;
      by_phase: Array<{
        phase: string;
        cost: number;
        percentage: number;
      }>;
      contingency: number;
      total_construction_cost: number;
    };
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
    const body: LayoutRequest = await request.json();
    
    // Input validation
    const validation = validateLayoutRequest(body);
    if (!validation.valid) {
      return NextResponse.json({
        success: false,
        error: validation.error,
        token_cost: 0,
        processing_time_ms: Date.now() - startTime
      }, { status: 400 });
    }

    // Simulate processing delay (longest for technical drawings)
    await new Promise(resolve => setTimeout(resolve, 4000 + Math.random() * 5000));

    // Generate mock layout analysis
    const analysis = generateLayoutAnalysis(body);
    
    const processingTime = Date.now() - startTime;
    
    return NextResponse.json({
      success: true,
      data: analysis,
      token_cost: 3, // Layout analysis costs 3 tokens (most complex with drawings)
      processing_time_ms: processingTime
    });

  } catch (error) {
    console.error('Layout Analysis API Error:', error);
    
    return NextResponse.json({
      success: false,
      error: 'Teknik plan analizi gerçekleştirilemedi. Lütfen daha sonra tekrar deneyin.',
      token_cost: 0,
      processing_time_ms: Date.now() - startTime
    }, { status: 500 });
  }
}

function validateLayoutRequest(body: LayoutRequest) {
  if (!body.site?.total_area || body.site.total_area < 500) {
    return { valid: false, error: 'Minimum 500 m² arazi gereklidir' };
  }
  
  if (!body.greenhouse?.target_size || body.greenhouse.target_size < 100) {
    return { valid: false, error: 'Minimum 100 m² sera boyutu gereklidir' };
  }
  
  if (body.greenhouse.target_size > body.site.usable_area * 0.8) {
    return { valid: false, error: 'Sera boyutu kullanılabilir alan için çok büyük' };
  }
  
  if (!body.site?.dimensions?.length || !body.site?.dimensions?.width) {
    return { valid: false, error: 'Arazi boyutları gereklidir' };
  }
  
  return { valid: true };
}

function generateLayoutAnalysis(request: LayoutRequest): LayoutResponse['data'] {
  const { site, greenhouse, production, infrastructure, utilities_requirements } = request;
  
  // Calculate basic layout parameters
  const totalFootprint = calculateTotalFootprint(site, greenhouse, infrastructure);
  const siteUtilization = (totalFootprint / site.total_area) * 100;
  
  return {
    layout_summary: {
      total_footprint: Math.round(totalFootprint),
      greenhouse_area: greenhouse.target_size,
      support_buildings_area: calculateSupportBuildingsArea(infrastructure),
      circulation_area: Math.round(totalFootprint * 0.15),
      green_space_area: Math.round(site.total_area - totalFootprint),
      site_utilization_percentage: Math.round(siteUtilization * 100) / 100,
      construction_phases: greenhouse.expansion_phases
    },
    technical_drawings: generateTechnicalDrawings(site, greenhouse),
    structural_design: generateStructuralDesign(greenhouse, site),
    mechanical_systems: generateMechanicalSystems(greenhouse, utilities_requirements),
    space_allocation: generateSpaceAllocation(greenhouse, production, infrastructure),
    construction_phases: generateConstructionPhases(greenhouse, infrastructure),
    compliance_requirements: generateComplianceRequirements(greenhouse, site),
    optimization_recommendations: generateOptimizationRecommendations(site, greenhouse, production),
    cost_breakdown: generateCostBreakdown(greenhouse, infrastructure),
    pdf_url: `/api/analysis/layout/download?id=layout_${Date.now()}`,
    analysis_id: `layout_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    generated_at: new Date().toISOString()
  };
}

function calculateTotalFootprint(site: any, greenhouse: any, infrastructure: any): number {
  let footprint = greenhouse.target_size;
  
  // Add support buildings
  if (infrastructure.office_space_required) footprint += 150;
  if (infrastructure.storage_space) footprint += infrastructure.storage_space;
  if (infrastructure.processing_area) footprint += 200;
  if (infrastructure.cold_storage) footprint += 100;
  if (infrastructure.maintenance_workshop) footprint += 150;
  if (infrastructure.visitor_facilities) footprint += 80;
  
  // Add circulation and access areas
  footprint += footprint * 0.2; // 20% for circulation
  
  return footprint;
}

function calculateSupportBuildingsArea(infrastructure: any): number {
  let area = 0;
  
  if (infrastructure.office_space_required) area += 150;
  if (infrastructure.storage_space) area += infrastructure.storage_space;
  if (infrastructure.processing_area) area += 200;
  if (infrastructure.cold_storage) area += 100;
  if (infrastructure.maintenance_workshop) area += 150;
  if (infrastructure.visitor_facilities) area += 80;
  
  return Math.round(area);
}

function generateTechnicalDrawings(site: any, greenhouse: any) {
  const analysisId = Date.now();
  
  return {
    site_plan: {
      drawing_url: `/api/drawings/site-plan/${analysisId}.pdf`,
      scale: '1:500',
      dimensions: { width: site.dimensions.length, height: site.dimensions.width },
      features: [
        {
          feature_type: 'Greenhouse Structure',
          coordinates: { x: 50, y: 50 },
          dimensions: { 
            length: Math.sqrt(greenhouse.target_size) * 1.5, 
            width: Math.sqrt(greenhouse.target_size) / 1.5 
          },
          specifications: `${greenhouse.type} ${greenhouse.structure}, ${greenhouse.height}m height`
        },
        {
          feature_type: 'Main Access Road',
          coordinates: { x: 0, y: site.dimensions.width / 2 },
          dimensions: { length: site.dimensions.length, width: 8 },
          specifications: 'Asphalt surface, 8m width, load capacity 20 tons'
        },
        {
          feature_type: 'Utility Connection Point',
          coordinates: { x: 10, y: 10 },
          dimensions: { length: 5, width: 5 },
          specifications: 'Electrical, water, and gas connections'
        },
        {
          feature_type: 'Parking Area',
          coordinates: { x: 20, y: 20 },
          dimensions: { length: 30, width: 15 },
          specifications: `${infrastructure.parking_spaces} spaces, gravel surface`
        }
      ]
    },
    floor_plan: {
      drawing_url: `/api/drawings/floor-plan/${analysisId}.pdf`,
      scale: '1:200',
      interior_layout: generateInteriorLayout(greenhouse, production)
    },
    elevation_views: [
      {
        view_name: 'north' as const,
        drawing_url: `/api/drawings/elevation-north/${analysisId}.pdf`,
        height_measurements: [
          { point: 'Ground Level', height: 0 },
          { point: 'Gutter Height', height: greenhouse.height - 2 },
          { point: 'Ridge Height', height: greenhouse.height }
        ],
        structural_elements: ['Steel frame', 'Covering panels', 'Ventilation openings']
      },
      {
        view_name: 'south' as const,
        drawing_url: `/api/drawings/elevation-south/${analysisId}.pdf`,
        height_measurements: [
          { point: 'Ground Level', height: 0 },
          { point: 'Gutter Height', height: greenhouse.height - 2 },
          { point: 'Ridge Height', height: greenhouse.height }
        ],
        structural_elements: ['Steel frame', 'Covering panels', 'Entry doors']
      }
    ],
    cross_sections: [
      {
        section_name: 'Longitudinal Section A-A',
        drawing_url: `/api/drawings/section-aa/${analysisId}.pdf`,
        cutting_plane: 'Through main axis',
        structural_details: ['Foundation details', 'Frame connections', 'Roof structure']
      },
      {
        section_name: 'Cross Section B-B',
        drawing_url: `/api/drawings/section-bb/${analysisId}.pdf`,
        cutting_plane: 'Through span width',
        structural_details: ['Gutter details', 'Ventilation systems', 'Internal layout']
      }
    ],
    3d_visualization: {
      model_url: `/api/3d-models/greenhouse/${analysisId}.obj`,
      rendered_views: [
        {
          view_angle: 'Aerial View',
          image_url: `/api/renders/aerial/${analysisId}.jpg`,
          description: 'Complete site overview with surrounding landscape'
        },
        {
          view_angle: 'Perspective View',
          image_url: `/api/renders/perspective/${analysisId}.jpg`,
          description: 'Main entrance and facade details'
        },
        {
          view_angle: 'Interior View',
          image_url: `/api/renders/interior/${analysisId}.jpg`,
          description: 'Production area layout and equipment placement'
        }
      ]
    }
  };
}

function generateInteriorLayout(greenhouse: any, production: any) {
  const totalArea = greenhouse.target_size;
  const productionArea = totalArea * 0.85; // 85% for production
  const aisleArea = totalArea * 0.15; // 15% for aisles
  
  return [
    {
      zone_name: 'Production Zone A',
      area: Math.round(productionArea / 2),
      coordinates: { x: 10, y: 10 },
      dimensions: { 
        length: Math.sqrt(productionArea / 2) * 1.5, 
        width: Math.sqrt(productionArea / 2) / 1.5 
      },
      function: `${production.crop_type} cultivation area`,
      equipment: ['Growing benches', 'Irrigation lines', 'Support structures']
    },
    {
      zone_name: 'Production Zone B',
      area: Math.round(productionArea / 2),
      coordinates: { x: 10 + Math.sqrt(productionArea / 2) * 1.5 + 2, y: 10 },
      dimensions: { 
        length: Math.sqrt(productionArea / 2) * 1.5, 
        width: Math.sqrt(productionArea / 2) / 1.5 
      },
      function: `${production.crop_type} cultivation area`,
      equipment: ['Growing benches', 'Irrigation lines', 'Support structures']
    },
    {
      zone_name: 'Main Aisle',
      area: Math.round(aisleArea * 0.6),
      coordinates: { x: 5, y: 5 },
      dimensions: { length: Math.sqrt(totalArea) * 1.2, width: 3 },
      function: 'Primary circulation and equipment access',
      equipment: ['Service trolleys', 'Harvesting equipment']
    },
    {
      zone_name: 'Service Area',
      area: Math.round(aisleArea * 0.4),
      coordinates: { x: 5, y: Math.sqrt(totalArea) * 0.8 },
      dimensions: { length: 10, width: 8 },
      function: 'Climate control equipment and utilities',
      equipment: ['HVAC units', 'Electrical panels', 'Irrigation controls']
    }
  ];
}

function generateStructuralDesign(greenhouse: any, site: any) {
  const area = greenhouse.target_size;
  const foundationType = greenhouse.type === 'high_tech' ? 'strip_footings' : 'pad_footings';
  
  return {
    foundation_system: {
      type: foundationType as 'strip_footings' | 'pad_footings' | 'slab_on_grade' | 'deep_foundations',
      specifications: `Reinforced concrete ${foundationType}, C25/30 concrete, minimum depth 80cm`,
      concrete_volume: Math.round(area * 0.08), // 8cm average thickness
      reinforcement_tonnage: Math.round(area * 0.004), // 4kg/m²
      excavation_volume: Math.round(area * 0.12) // including working space
    },
    frame_structure: {
      material: greenhouse.type === 'high_tech' ? 'steel' : 'aluminum' as 'steel' | 'aluminum' | 'concrete' | 'composite',
      column_spacing: greenhouse.bay_width,
      beam_specifications: `${greenhouse.type === 'high_tech' ? 'HEB200' : 'Aluminum I-beam 150x100'}`,
      connection_details: ['Bolted connections', 'Welded joints at critical points', 'Expansion joints'],
      total_steel_tonnage: Math.round(area * (greenhouse.type === 'high_tech' ? 0.045 : 0.025))
    },
    covering_system: {
      material: greenhouse.type as 'glass' | 'polycarbonate' | 'plastic',
      specifications: getCoveringSpecifications(greenhouse.type),
      total_area: Math.round(area * 1.4), // including roof slope
      wind_load_rating: `Zone ${site.wind_zone || 2} compliance`,
      snow_load_rating: `${site.snow_load || 150} kg/m² design load`
    }
  };
}

function getCoveringSpecifications(type: string): string {
  switch (type) {
    case 'glass':
      return '4mm tempered glass, low iron, anti-reflective coating';
    case 'polycarbonate':
      return '10mm twin-wall polycarbonate, UV protection, 10-year warranty';
    case 'plastic':
      return '200 micron PE film, anti-drip, UV stabilized, 4-year lifespan';
    case 'high_tech':
      return '4mm tempered glass with selective coating, maximum light transmission';
    default:
      return '10mm twin-wall polycarbonate, standard specification';
  }
}

function generateMechanicalSystems(greenhouse: any, utilities: any) {
  const area = greenhouse.target_size;
  
  return {
    hvac_layout: {
      heating_zones: generateHeatingZones(area, utilities.heating_capacity),
      cooling_zones: generateCoolingZones(area),
      ductwork_layout: generateDuctworkLayout(area)
    },
    irrigation_layout: {
      main_lines: generateMainLines(area),
      distribution_zones: generateDistributionZones(area, utilities.water_consumption),
      control_systems: generateControlSystems(area)
    },
    electrical_layout: {
      main_panel_location: { x: 5, y: 5 },
      sub_panels: generateSubPanels(area, utilities.electrical_load),
      lighting_circuits: generateLightingCircuits(area),
      power_circuits: generatePowerCircuits(area, utilities.electrical_load)
    }
  };
}

function generateHeatingZones(area: number, heatingCapacity: number) {
  const zones = Math.ceil(area / 1000); // 1 zone per 1000 m²
  
  return Array.from({length: zones}, (_, i) => ({
    zone_name: `Heating Zone ${i + 1}`,
    area: Math.round(area / zones),
    heat_load: Math.round(heatingCapacity / zones),
    equipment_location: { x: 10 + (i * 20), y: 5 },
    distribution_method: 'Hot water pipes with finned radiators'
  }));
}

function generateCoolingZones(area: number) {
  const zones = Math.ceil(area / 1500); // 1 zone per 1500 m²
  
  return Array.from({length: zones}, (_, i) => ({
    zone_name: `Cooling Zone ${i + 1}`,
    area: Math.round(area / zones),
    cooling_load: Math.round((area / zones) * 0.15), // 150W/m²
    equipment_location: { x: 15 + (i * 25), y: 10 },
    ventilation_requirements: 'Natural ventilation with ridge and side vents'
  }));
}

function generateDuctworkLayout(area: number) {
  const ducts = Math.ceil(area / 500); // 1 main duct per 500 m²
  
  return Array.from({length: ducts}, (_, i) => ({
    duct_id: `MD-${i + 1}`,
    start_point: { x: 5, y: 5 + (i * 10) },
    end_point: { x: Math.sqrt(area), y: 5 + (i * 10) },
    duct_size: '400x200mm',
    airflow_rate: Math.round(area * 2) // 2 m³/h per m²
  }));
}

function generateMainLines(area: number) {
  return [
    {
      line_id: 'ML-01',
      start_point: { x: 0, y: Math.sqrt(area) / 2 },
      end_point: { x: Math.sqrt(area), y: Math.sqrt(area) / 2 },
      pipe_diameter: 100, // mm
      flow_rate: Math.round(area * 0.5) // 0.5 L/min per m²
    },
    {
      line_id: 'ML-02',
      start_point: { x: Math.sqrt(area) / 2, y: 0 },
      end_point: { x: Math.sqrt(area) / 2, y: Math.sqrt(area) },
      pipe_diameter: 80,
      flow_rate: Math.round(area * 0.3)
    }
  ];
}

function generateDistributionZones(area: number, waterConsumption: number) {
  const zones = Math.ceil(area / 800); // 1 zone per 800 m²
  
  return Array.from({length: zones}, (_, i) => ({
    zone_name: `Irrigation Zone ${i + 1}`,
    area: Math.round(area / zones),
    emitter_count: Math.round((area / zones) * 2), // 2 emitters per m²
    water_requirement: Math.round(waterConsumption / zones)
  }));
}

function generateControlSystems(area: number) {
  const controllers = Math.ceil(area / 2000); // 1 controller per 2000 m²
  
  return Array.from({length: controllers}, (_, i) => ({
    controller_type: 'Multi-zone irrigation controller',
    location: { x: 5 + (i * 30), y: 5 },
    zones_controlled: [`Zone ${i * 4 + 1}`, `Zone ${i * 4 + 2}`, `Zone ${i * 4 + 3}`, `Zone ${i * 4 + 4}`]
  }));
}

function generateSubPanels(area: number, electricalLoad: number) {
  const panels = Math.ceil(area / 1200); // 1 sub-panel per 1200 m²
  
  return Array.from({length: panels}, (_, i) => ({
    panel_id: `SP-${i + 1}`,
    location: { x: 8 + (i * 25), y: 8 },
    capacity: Math.round(electricalLoad / panels), // A
    circuits: [`Lighting ${i + 1}`, `HVAC ${i + 1}`, `Irrigation ${i + 1}`, `General Power ${i + 1}`]
  }));
}

function generateLightingCircuits(area: number) {
  const circuits = Math.ceil(area / 600); // 1 circuit per 600 m²
  
  return Array.from({length: circuits}, (_, i) => ({
    circuit_id: `LC-${i + 1}`,
    fixture_count: Math.round((area / circuits) / 20), // 1 fixture per 20 m²
    total_load: Math.round((area / circuits) * 0.025), // 25W/m²
    switching_zones: [`Zone ${i + 1}A`, `Zone ${i + 1}B`]
  }));
}

function generatePowerCircuits(area: number, electricalLoad: number) {
  return [
    {
      circuit_id: 'PC-HVAC',
      equipment_served: ['Heating system', 'Cooling system', 'Ventilation fans'],
      load: Math.round(electricalLoad * 0.6) // 60% for HVAC
    },
    {
      circuit_id: 'PC-IRRIGATION',
      equipment_served: ['Irrigation pumps', 'Fertigation system', 'Control valves'],
      load: Math.round(electricalLoad * 0.15) // 15% for irrigation
    },
    {
      circuit_id: 'PC-AUTOMATION',
      equipment_served: ['Control systems', 'Sensors', 'Communication equipment'],
      load: Math.round(electricalLoad * 0.1) // 10% for automation
    },
    {
      circuit_id: 'PC-GENERAL',
      equipment_served: ['General outlets', 'Workshop equipment', 'Office equipment'],
      load: Math.round(electricalLoad * 0.15) // 15% for general use
    }
  ];
}

function generateSpaceAllocation(greenhouse: any, production: any, infrastructure: any) {
  const totalArea = greenhouse.target_size;
  
  return {
    production_areas: [
      {
        area_name: 'Main Production Area',
        size: Math.round(totalArea * 0.85),
        plant_capacity: Math.round(totalArea * 0.85 * production.plant_density),
        growing_system: production.growing_system,
        access_requirements: 'Wide aisles for equipment access',
        climate_zone: 'Controlled environment'
      }
    ],
    support_areas: generateSupportAreas(infrastructure),
    circulation_paths: [
      {
        path_name: 'Main Aisle',
        width: 3,
        length: Math.round(Math.sqrt(totalArea) * 1.2),
        surface_type: 'Concrete with anti-slip texture',
        load_capacity: '2000 kg concentrated load'
      },
      {
        path_name: 'Service Aisles',
        width: 1.5,
        length: Math.round(Math.sqrt(totalArea) * 2),
        surface_type: 'Gravel with geotextile base',
        load_capacity: '500 kg distributed load'
      }
    ]
  };
}

function generateSupportAreas(infrastructure: any) {
  const areas = [];
  
  if (infrastructure.office_space_required) {
    areas.push({
      area_name: 'Office Space',
      size: 150,
      function: 'Administration and planning',
      equipment: ['Desks', 'Computers', 'Meeting table', 'Storage cabinets'],
      access_level: 'staff' as const
    });
  }
  
  if (infrastructure.storage_space > 0) {
    areas.push({
      area_name: 'Storage Warehouse',
      size: infrastructure.storage_space,
      function: 'Equipment and supply storage',
      equipment: ['Shelving systems', 'Loading dock', 'Inventory system'],
      access_level: 'staff' as const
    });
  }
  
  if (infrastructure.processing_area) {
    areas.push({
      area_name: 'Processing Area',
      size: 200,
      function: 'Post-harvest processing and packaging',
      equipment: ['Washing stations', 'Grading tables', 'Packaging machines'],
      access_level: 'restricted' as const
    });
  }
  
  if (infrastructure.maintenance_workshop) {
    areas.push({
      area_name: 'Maintenance Workshop',
      size: 150,
      function: 'Equipment repair and maintenance',
      equipment: ['Work benches', 'Tool storage', 'Spare parts inventory'],
      access_level: 'staff' as const
    });
  }
  
  return areas;
}

function generateConstructionPhases(greenhouse: any, infrastructure: any) {
  const totalCost = greenhouse.target_size * 400; // Estimate 400 TL/m²
  
  return [
    {
      phase_number: 1,
      phase_name: 'Site Preparation & Foundation',
      description: 'Site clearing, excavation, and foundation construction',
      area_covered: greenhouse.target_size,
      duration_weeks: 6,
      cost_estimate: Math.round(totalCost * 0.25),
      dependencies: ['Permits approved', 'Utilities marked'],
      deliverables: [
        { item: 'Foundation completion', completion_criteria: 'Concrete strength test passed' },
        { item: 'Site drainage', completion_criteria: 'Drainage system tested' }
      ]
    },
    {
      phase_number: 2,
      phase_name: 'Structural Framework',
      description: 'Steel/aluminum frame erection and structural assembly',
      area_covered: greenhouse.target_size,
      duration_weeks: 8,
      cost_estimate: Math.round(totalCost * 0.35),
      dependencies: ['Foundation cured', 'Materials delivered'],
      deliverables: [
        { item: 'Frame completion', completion_criteria: 'Structural inspection passed' },
        { item: 'Frame plumb and level', completion_criteria: 'Survey verification' }
      ]
    },
    {
      phase_number: 3,
      phase_name: 'Covering & Enclosure',
      description: 'Installation of covering materials and weatherproofing',
      area_covered: greenhouse.target_size,
      duration_weeks: 4,
      cost_estimate: Math.round(totalCost * 0.20),
      dependencies: ['Frame completed', 'Weather conditions suitable'],
      deliverables: [
        { item: 'Covering installation', completion_criteria: 'Water tightness test' },
        { item: 'Ventilation systems', completion_criteria: 'Airflow test completed' }
      ]
    },
    {
      phase_number: 4,
      phase_name: 'Systems Installation',
      description: 'HVAC, electrical, irrigation, and automation systems',
      area_covered: greenhouse.target_size,
      duration_weeks: 6,
      cost_estimate: Math.round(totalCost * 0.20),
      dependencies: ['Enclosure completed', 'Utility connections ready'],
      deliverables: [
        { item: 'All systems commissioned', completion_criteria: 'Performance tests passed' },
        { item: 'Automation calibrated', completion_criteria: 'System integration verified' }
      ]
    }
  ];
}

function generateComplianceRequirements(greenhouse: any, site: any) {
  return {
    building_codes: [
      {
        code_name: 'Turkish Building Code (TBC)',
        applicable_sections: ['Structural design', 'Fire safety', 'Accessibility'],
        compliance_notes: 'Agricultural building classifications apply'
      },
      {
        code_name: 'Agricultural Structure Standards',
        applicable_sections: ['Ventilation requirements', 'Drainage standards'],
        compliance_notes: 'Specific to greenhouse operations'
      }
    ],
    permits_required: [
      {
        permit_type: 'Building Permit',
        issuing_authority: 'Local Municipality',
        estimated_approval_time: '4-6 weeks',
        requirements: ['Structural plans', 'Site survey', 'Environmental impact']
      },
      {
        permit_type: 'Electrical Connection',
        issuing_authority: 'TEDAŞ',
        estimated_approval_time: '2-3 weeks',
        requirements: ['Electrical load calculations', 'Safety compliance']
      },
      {
        permit_type: 'Water Connection',
        issuing_authority: 'Water Utility',
        estimated_approval_time: '1-2 weeks',
        requirements: ['Water usage estimates', 'Backflow prevention']
      }
    ],
    inspections_schedule: [
      {
        inspection_type: 'Foundation Inspection',
        phase: 'Phase 1',
        inspector: 'Structural Engineer',
        checklist_items: ['Excavation depth', 'Reinforcement placement', 'Concrete quality']
      },
      {
        inspection_type: 'Structural Frame Inspection',
        phase: 'Phase 2',
        inspector: 'Building Inspector',
        checklist_items: ['Connection details', 'Plumb and level', 'Material compliance']
      },
      {
        inspection_type: 'Final Inspection',
        phase: 'Phase 4',
        inspector: 'Building Official',
        checklist_items: ['Systems operation', 'Safety compliance', 'Code conformance']
      }
    ]
  };
}

function generateOptimizationRecommendations(site: any, greenhouse: any, production: any) {
  return [
    {
      category: 'efficiency' as const,
      recommendation: 'Orient greenhouse north-south for optimal light distribution',
      impact: '8-12% increase in light utilization and crop yield',
      implementation_cost: 0, // Design phase decision
      payback_period: 'Immediate',
      priority: 'high' as const
    },
    {
      category: 'cost' as const,
      recommendation: 'Use modular construction approach for future expansion',
      impact: '15-20% cost savings on future expansions',
      implementation_cost: 25000,
      payback_period: '2-3 years if expansion planned',
      priority: 'medium' as const
    },
    {
      category: 'functionality' as const,
      recommendation: 'Install wider aisles for automated equipment compatibility',
      impact: 'Future automation compatibility, 20% labor efficiency',
      implementation_cost: 35000,
      payback_period: '3-4 years',
      priority: 'medium' as const
    },
    {
      category: 'sustainability' as const,
      recommendation: 'Include rainwater harvesting system in design',
      impact: '30-40% reduction in water costs, environmental benefits',
      implementation_cost: 45000,
      payback_period: '5-7 years',
      priority: 'low' as const
    }
  ];
}

function generateCostBreakdown(greenhouse: any, infrastructure: any) {
  const baseCost = greenhouse.target_size * 400;
  const supportCost = calculateSupportBuildingsArea(infrastructure) * 800;
  const totalCost = baseCost + supportCost;
  
  return {
    by_system: [
      { system_name: 'Foundation & Site Work', cost: Math.round(totalCost * 0.25), percentage: 25 },
      { system_name: 'Structural Framework', cost: Math.round(totalCost * 0.35), percentage: 35 },
      { system_name: 'Covering System', cost: Math.round(totalCost * 0.20), percentage: 20 },
      { system_name: 'Mechanical Systems', cost: Math.round(totalCost * 0.15), percentage: 15 },
      { system_name: 'Electrical & Automation', cost: Math.round(totalCost * 0.05), percentage: 5 }
    ],
    by_phase: [
      { phase: 'Phase 1 - Foundation', cost: Math.round(totalCost * 0.25), percentage: 25 },
      { phase: 'Phase 2 - Structure', cost: Math.round(totalCost * 0.35), percentage: 35 },
      { phase: 'Phase 3 - Enclosure', cost: Math.round(totalCost * 0.20), percentage: 20 },
      { phase: 'Phase 4 - Systems', cost: Math.round(totalCost * 0.20), percentage: 20 }
    ],
    contingency: Math.round(totalCost * 0.10),
    total_construction_cost: Math.round(totalCost * 1.10) // Including 10% contingency
  };
}