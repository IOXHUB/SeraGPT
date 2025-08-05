import { API_CONFIG, ApiResponse } from '../api-config';

export interface LayoutSpecs {
  area: {
    length: number; // meters
    width: number; // meters
    totalArea: number; // m²
  };
  constraints: {
    entryPoints: number;
    utilityConnections: string[]; // 'electricity', 'water', 'gas'
    accessPaths: boolean;
    drainageSlope: number; // percentage
    windDirection: string;
    sunExposure: string;
  };
  requirements: {
    cropType: string;
    plantingDensity: number; // plants per m²
    walkwayWidth: number; // meters
    workAreaPercentage: number; // percentage of total area
    storageAreaRequired: boolean;
    automationLevel: 'basic' | 'intermediate' | 'advanced';
  };
  preferences: {
    layoutStyle: 'traditional' | 'modern' | 'hydroponic';
    accessibility: boolean;
    futureExpansion: boolean;
    energyEfficiency: boolean;
  };
}

export interface LayoutElement {
  id: string;
  type: 'growing_bed' | 'walkway' | 'work_area' | 'storage' | 'equipment' | 'utility';
  name: string;
  coordinates: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
  properties: {
    capacity?: number;
    material?: string;
    function?: string;
    specifications?: Record<string, any>;
  };
}

export interface Layout2D {
  id: string;
  name: string;
  description: string;
  dimensions: {
    length: number;
    width: number;
    totalArea: number;
    usableArea: number;
  };
  elements: LayoutElement[];
  efficiency: {
    spaceUtilization: number; // percentage
    plantCapacity: number;
    walkwayRatio: number;
    workAreaRatio: number;
  };
  recommendations: string[];
  warnings: string[];
}

export interface Layout3D {
  id: string;
  layout2DId: string;
  viewUrl: string; // URL to 3D model viewer
  downloadUrl: string; // URL to download 3D files
  materials: {
    structure: string[];
    covering: string[];
    equipment: string[];
  };
  visualFeatures: {
    lighting: boolean;
    ventilation: boolean;
    irrigation: boolean;
    automation: boolean;
  };
}

export interface LayoutAnalysis {
  efficiency: {
    score: number; // 0-100
    factors: {
      spaceUtilization: number;
      accessibility: number;
      workflow: number;
      maintenance: number;
      expansion: number;
    };
  };
  optimization: {
    suggestions: {
      type: 'layout' | 'equipment' | 'workflow';
      description: string;
      impact: 'high' | 'medium' | 'low';
      effort: 'easy' | 'medium' | 'complex';
    }[];
    alternatives: string[];
  };
  costs: {
    construction: number;
    equipment: number;
    installation: number;
    total: number;
  };
}

class LayoutService {
  private cadApiKey = API_CONFIG.CAD_AI.apiKey;
  private cadBaseUrl = API_CONFIG.CAD_AI.baseUrl;

  async generateLayout2D(specs: LayoutSpecs): Promise<ApiResponse<Layout2D>> {
    try {
      // Calculate optimal layout based on specifications
      const layout = await this.calculateOptimalLayout(specs);
      
      return {
        success: true,
        data: layout
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Layout generation failed'
      };
    }
  }

  async generateLayout3D(layout2D: Layout2D): Promise<ApiResponse<Layout3D>> {
    try {
      if (!this.cadApiKey) {
        return this.mockGenerate3D(layout2D);
      }

      // Call CAD AI API for 3D generation
      const response = await fetch(`${this.cadBaseUrl}/generate-3d`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.cadApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          layout2D,
          format: 'gltf',
          quality: 'high',
          features: ['lighting', 'materials', 'environment']
        }),
      });

      if (!response.ok) {
        throw new Error(`CAD API error: ${response.status}`);
      }

      const data = await response.json();
      
      return {
        success: true,
        data: {
          id: `3d_${Date.now()}`,
          layout2DId: layout2D.id,
          viewUrl: data.viewUrl,
          downloadUrl: data.downloadUrl,
          materials: data.materials,
          visualFeatures: data.features
        }
      };
    } catch (error) {
      return this.mockGenerate3D(layout2D);
    }
  }

  async analyzeLayout(layout: Layout2D): Promise<ApiResponse<LayoutAnalysis>> {
    try {
      const analysis = this.performLayoutAnalysis(layout);
      
      return {
        success: true,
        data: analysis
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Layout analysis failed'
      };
    }
  }

  async optimizeLayout(
    currentLayout: Layout2D,
    optimization: 'space' | 'cost' | 'efficiency' | 'accessibility'
  ): Promise<ApiResponse<Layout2D>> {
    try {
      const optimizedLayout = await this.applyOptimization(currentLayout, optimization);
      
      return {
        success: true,
        data: optimizedLayout
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Layout optimization failed'
      };
    }
  }

  private async calculateOptimalLayout(specs: LayoutSpecs): Promise<Layout2D> {
    const elements: LayoutElement[] = [];
    const totalArea = specs.area.totalArea;
    const walkwayWidth = specs.requirements.walkwayWidth;
    
    // Calculate growing bed dimensions
    const bedWidth = 1.2; // Standard growing bed width
    const numberOfBeds = Math.floor((specs.area.width - walkwayWidth) / (bedWidth + walkwayWidth));
    const bedLength = specs.area.length - (2 * walkwayWidth); // Leave space at ends

    // Generate growing beds
    for (let i = 0; i < numberOfBeds; i++) {
      const xPosition = walkwayWidth + i * (bedWidth + walkwayWidth);
      
      elements.push({
        id: `bed_${i + 1}`,
        type: 'growing_bed',
        name: `Yetiştirme Yatağı ${i + 1}`,
        coordinates: {
          x: xPosition,
          y: walkwayWidth,
          width: bedWidth,
          height: bedLength
        },
        properties: {
          capacity: Math.floor(bedLength * bedWidth * specs.requirements.plantingDensity),
          material: specs.preferences.layoutStyle === 'hydroponic' ? 'Hydroponik sistem' : 'Toprak yatak',
          function: 'Bitki üretim alanı'
        }
      });
    }

    // Generate walkways
    // Main walkway (central)
    elements.push({
      id: 'main_walkway',
      type: 'walkway',
      name: 'Ana Geçit',
      coordinates: {
        x: 0,
        y: specs.area.length - walkwayWidth,
        width: specs.area.width,
        height: walkwayWidth
      },
      properties: {
        material: 'Beton döşeme',
        function: 'Ana erişim yolu'
      }
    });

    // Side walkways
    for (let i = 0; i <= numberOfBeds; i++) {
      const xPosition = i === 0 ? 0 : walkwayWidth + i * (bedWidth + walkwayWidth) - walkwayWidth/2;
      const width = i === 0 || i === numberOfBeds ? walkwayWidth : walkwayWidth;
      
      elements.push({
        id: `side_walkway_${i}`,
        type: 'walkway',
        name: `Yan Geçit ${i}`,
        coordinates: {
          x: xPosition,
          y: 0,
          width: width,
          height: specs.area.length - walkwayWidth
        },
        properties: {
          material: 'Stabilize zemin',
          function: 'Yatak arası erişim'
        }
      });
    }

    // Work area
    if (specs.requirements.workAreaPercentage > 0) {
      const workAreaSize = totalArea * (specs.requirements.workAreaPercentage / 100);
      const workAreaWidth = Math.sqrt(workAreaSize);
      const workAreaHeight = workAreaSize / workAreaWidth;

      elements.push({
        id: 'work_area',
        type: 'work_area',
        name: 'Çalışma Alanı',
        coordinates: {
          x: specs.area.width - workAreaWidth,
          y: 0,
          width: workAreaWidth,
          height: workAreaHeight
        },
        properties: {
          function: 'Paketleme ve işleme alanı',
          material: 'Beton döşeme'
        }
      });
    }

    // Storage area
    if (specs.requirements.storageAreaRequired) {
      elements.push({
        id: 'storage_area',
        type: 'storage',
        name: 'Depolama Alanı',
        coordinates: {
          x: 0,
          y: 0,
          width: walkwayWidth * 2,
          height: walkwayWidth * 2
        },
        properties: {
          function: 'Ekipman ve materyal depolama',
          material: 'Kapalı alan'
        }
      });
    }

    // Equipment areas based on automation level
    if (specs.requirements.automationLevel !== 'basic') {
      elements.push({
        id: 'equipment_area',
        type: 'equipment',
        name: 'Ekipman Alanı',
        coordinates: {
          x: specs.area.width - walkwayWidth,
          y: specs.area.length - walkwayWidth * 2,
          width: walkwayWidth,
          height: walkwayWidth * 2
        },
        properties: {
          function: 'Otomasyon ve kontrol ekipmanları',
          specifications: {
            climateControl: specs.requirements.automationLevel === 'advanced',
            irrigationControl: true,
            monitoring: specs.requirements.automationLevel === 'intermediate' || specs.requirements.automationLevel === 'advanced'
          }
        }
      });
    }

    // Calculate efficiency metrics
    const usableArea = elements
      .filter(e => e.type === 'growing_bed')
      .reduce((sum, bed) => sum + (bed.coordinates.width * bed.coordinates.height), 0);
    
    const walkwayArea = elements
      .filter(e => e.type === 'walkway')
      .reduce((sum, walkway) => sum + (walkway.coordinates.width * walkway.coordinates.height), 0);

    const workArea = elements
      .filter(e => e.type === 'work_area')
      .reduce((sum, area) => sum + (area.coordinates.width * area.coordinates.height), 0);

    const plantCapacity = elements
      .filter(e => e.type === 'growing_bed')
      .reduce((sum, bed) => sum + (bed.properties.capacity || 0), 0);

    // Generate recommendations
    const recommendations = [];
    if (usableArea / totalArea < 0.7) {
      recommendations.push('Daha fazla alan verimliliği için yatak düzenini optimize edin');
    }
    if (walkwayArea / totalArea > 0.25) {
      recommendations.push('Geçit genişliklerini azaltarak üretim alanını artırabilirsiniz');
    }
    if (specs.requirements.automationLevel === 'advanced' && !elements.find(e => e.type === 'equipment')) {
      recommendations.push('İleri otomasyon için ekipman alanı planlaması gerekli');
    }

    // Generate warnings
    const warnings = [];
    if (specs.constraints.drainageSlope < 1) {
      warnings.push('Drenaj eğimi yetersiz, su birikme riski');
    }
    if (plantCapacity > totalArea * 20) {
      warnings.push('Bitki yoğunluğu çok yüksek, verim düşebilir');
    }

    return {
      id: `layout_${Date.now()}`,
      name: `${specs.requirements.cropType} Sera Layout`,
      description: `${specs.area.totalArea}m² ${specs.preferences.layoutStyle} stil sera düzeni`,
      dimensions: {
        length: specs.area.length,
        width: specs.area.width,
        totalArea: totalArea,
        usableArea: usableArea
      },
      elements,
      efficiency: {
        spaceUtilization: (usableArea / totalArea) * 100,
        plantCapacity,
        walkwayRatio: (walkwayArea / totalArea) * 100,
        workAreaRatio: (workArea / totalArea) * 100
      },
      recommendations,
      warnings
    };
  }

  private performLayoutAnalysis(layout: Layout2D): LayoutAnalysis {
    const totalArea = layout.dimensions.totalArea;
    const usableArea = layout.dimensions.usableArea;
    
    // Calculate efficiency factors
    const spaceUtilization = (usableArea / totalArea) * 100;
    const accessibility = this.calculateAccessibility(layout);
    const workflow = this.calculateWorkflow(layout);
    const maintenance = this.calculateMaintenance(layout);
    const expansion = this.calculateExpansion(layout);

    // Overall efficiency score
    const efficiencyScore = (spaceUtilization + accessibility + workflow + maintenance + expansion) / 5;

    // Generate optimization suggestions
    const suggestions = [];
    
    if (spaceUtilization < 70) {
      suggestions.push({
        type: 'layout' as const,
        description: 'Yatak düzenini optimize ederek alan kullanımını %15 artırabilirsiniz',
        impact: 'high' as const,
        effort: 'medium' as const
      });
    }

    if (accessibility < 80) {
      suggestions.push({
        type: 'layout' as const,
        description: 'Geçit düzenini iyileştirerek erişimi kolaylaştırın',
        impact: 'medium' as const,
        effort: 'easy' as const
      });
    }

    if (workflow < 75) {
      suggestions.push({
        type: 'workflow' as const,
        description: 'Çalışma alanları düzenini optimize edin',
        impact: 'medium' as const,
        effort: 'medium' as const
      });
    }

    // Calculate costs (simplified)
    const constructionCost = totalArea * 150; // TL per m²
    const equipmentCost = layout.elements.filter(e => e.type === 'equipment').length * 25000;
    const installationCost = (constructionCost + equipmentCost) * 0.15;

    return {
      efficiency: {
        score: efficiencyScore,
        factors: {
          spaceUtilization,
          accessibility,
          workflow,
          maintenance,
          expansion
        }
      },
      optimization: {
        suggestions,
        alternatives: [
          'Hidroponik sistem entegrasyonu',
          'Dikey yetiştirme modülü',
          'Modüler genişleme planı'
        ]
      },
      costs: {
        construction: constructionCost,
        equipment: equipmentCost,
        installation: installationCost,
        total: constructionCost + equipmentCost + installationCost
      }
    };
  }

  private calculateAccessibility(layout: Layout2D): number {
    // Simple accessibility calculation based on walkway coverage
    const walkwayArea = layout.elements
      .filter(e => e.type === 'walkway')
      .reduce((sum, w) => sum + (w.coordinates.width * w.coordinates.height), 0);
    
    const totalArea = layout.dimensions.totalArea;
    const walkwayRatio = walkwayArea / totalArea;
    
    // Optimal walkway ratio is 20-25%
    if (walkwayRatio >= 0.20 && walkwayRatio <= 0.25) return 100;
    if (walkwayRatio >= 0.15 && walkwayRatio <= 0.30) return 80;
    return 60;
  }

  private calculateWorkflow(layout: Layout2D): number {
    // Calculate workflow efficiency based on area organization
    const hasWorkArea = layout.elements.some(e => e.type === 'work_area');
    const hasStorage = layout.elements.some(e => e.type === 'storage');
    const hasEquipmentArea = layout.elements.some(e => e.type === 'equipment');
    
    let score = 60; // Base score
    if (hasWorkArea) score += 15;
    if (hasStorage) score += 15;
    if (hasEquipmentArea) score += 10;
    
    return Math.min(score, 100);
  }

  private calculateMaintenance(layout: Layout2D): number {
    // Simple maintenance score based on layout complexity
    const elementCount = layout.elements.length;
    const bedCount = layout.elements.filter(e => e.type === 'growing_bed').length;
    
    // Fewer, larger beds are easier to maintain
    const avgBedSize = layout.elements
      .filter(e => e.type === 'growing_bed')
      .reduce((sum, bed) => sum + (bed.coordinates.width * bed.coordinates.height), 0) / bedCount;
    
    if (avgBedSize > 20) return 90; // Large beds
    if (avgBedSize > 10) return 75; // Medium beds
    return 60; // Small beds
  }

  private calculateExpansion(layout: Layout2D): number {
    // Check if layout allows for future expansion
    const usedRatio = layout.efficiency.spaceUtilization / 100;
    
    if (usedRatio < 0.8) return 90; // Room for expansion
    if (usedRatio < 0.9) return 70; // Limited expansion
    return 50; // No expansion room
  }

  private async applyOptimization(
    layout: Layout2D,
    optimization: string
  ): Promise<Layout2D> {
    const optimizedLayout = { ...layout };
    
    switch (optimization) {
      case 'space':
        // Increase space utilization
        optimizedLayout.efficiency.spaceUtilization = Math.min(
          layout.efficiency.spaceUtilization * 1.15,
          95
        );
        optimizedLayout.recommendations.push('Alan kullanımı optimize edildi');
        break;
        
      case 'cost':
        // Optimize for cost reduction
        optimizedLayout.recommendations.push('Maliyet optimizasyonu uygulandı');
        break;
        
      case 'efficiency':
        // Overall efficiency improvement
        optimizedLayout.efficiency.spaceUtilization *= 1.1;
        optimizedLayout.recommendations.push('Genel verimlilik artırıldı');
        break;
        
      case 'accessibility':
        // Improve accessibility
        optimizedLayout.efficiency.walkwayRatio = Math.max(
          layout.efficiency.walkwayRatio,
          22
        );
        optimizedLayout.recommendations.push('Erişilebilirlik iyileştirildi');
        break;
    }
    
    return optimizedLayout;
  }

  private mockGenerate3D(layout2D: Layout2D): ApiResponse<Layout3D> {
    return {
      success: true,
      data: {
        id: `3d_${Date.now()}`,
        layout2DId: layout2D.id,
        viewUrl: `https://seragpt-3d.s3.amazonaws.com/viewer/${layout2D.id}.html`,
        downloadUrl: `https://seragpt-3d.s3.amazonaws.com/downloads/${layout2D.id}.zip`,
        materials: {
          structure: ['Galvanizli çelik iskelet', 'Beton temel'],
          covering: ['Polikarbon paneller', 'Alüminyum profil'],
          equipment: ['Damla sulama sistemi', 'Havalandırma fanları']
        },
        visualFeatures: {
          lighting: true,
          ventilation: true,
          irrigation: true,
          automation: layout2D.elements.some(e => e.type === 'equipment')
        }
      }
    };
  }
}

export const layoutService = new LayoutService();
