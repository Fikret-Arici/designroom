import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { Home, Search, Eye, Wand2 } from 'lucide-react';

interface AIAgentProps {
  type: 'search' | 'analysis' | 'placement';
  isActive: boolean;
  isCompleted: boolean;
}

const agentConfig = {
  search: {
    icon: Search,
    title: 'Ürün Arama Agent',
    description: 'Metinsel açıklamalardan uygun ürünleri buluyor',
    color: 'bg-ai-accent',
    tooltip: {
      title: 'Ürün Arama Agent',
      description: 'Bu AI ajanı, metinsel açıklamalarınızı analiz ederek en uygun dekoratif ürünleri bulur. Oda tarzınız, renk paletiniz ve bütçenizi göz önünde bulundurarak size en iyi önerileri sunar.',
      features: [
        'Metinsel açıklamaları analiz eder',
        'Oda tarzına uygun ürünler bulur',
        'Renk uyumunu göz önünde bulundurur',
        'Bütçe dostu seçenekler sunar',
        'Trend dekorasyon ürünlerini önerir'
      ]
    }
  },
  analysis: {
    icon: Eye,
    title: 'Görsel Analiz Agent',
    description: 'Oda tarzını ve renk uyumunu analiz ediyor',
    color: 'bg-ai-secondary',
    tooltip: {
      title: 'Görsel Analiz Agent',
      description: 'Bu AI ajanı, oda fotoğrafınızı detaylı bir şekilde analiz eder. Oda tarzını, renk paletini, ışık koşullarını ve mevcut dekorasyonu değerlendirerek en uygun yerleştirme stratejilerini belirler.',
      features: [
        'Oda tarzını ve temasını tespit eder',
        'Dominant renkleri analiz eder',
        'Işık koşullarını değerlendirir',
        'Mevcut dekorasyonu inceler',
        'Yerleştirme alanlarını belirler'
      ]
    }
  },
  placement: {
    icon: Wand2,
    title: 'Yerleştirme Agent',
    description: 'Ürünü odaya doğal şekilde yerleştiriyor',
    color: 'bg-ai',
    tooltip: {
      title: 'Yerleştirme Agent',
      description: 'Bu AI ajanı, seçilen ürünü odanıza mükemmel bir şekilde yerleştirir. Görsel analiz sonuçlarını kullanarak ürünün en uygun konumunu, boyutunu ve açısını belirler.',
      features: [
        'Optimal yerleştirme pozisyonunu hesaplar',
        'Ürün boyutunu oda ölçeğine uyarlar',
        'Gölge ve ışık efektlerini ekler',
        'Doğal görünüm sağlar',
        'Gerçekçi sonuçlar üretir'
      ]
    }
  }
};

export const AIAgent = ({ type, isActive, isCompleted }: AIAgentProps) => {
  const config = agentConfig[type];
  const Icon = config.icon;

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Card className={`p-4 transition-all duration-500 cursor-pointer hover:scale-105 bg-white/80 backdrop-blur border border-border/50 shadow-lg rounded-2xl ${
          isActive 
            ? 'border-ai shadow-lg shadow-ai/20' 
            : isCompleted 
              ? 'border-ai-secondary bg-ai-secondary/10' 
              : 'border-border/50 hover:border-ai/30'
        }`}>
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-full ${config.color} ${
              isActive ? 'animate-pulse' : ''
            }`}>
              <Icon className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-foreground group-hover:text-foreground">{config.title}</h3>
              <p className="text-sm text-muted-foreground group-hover:text-muted-foreground">{config.description}</p>
            </div>
            <div className="flex items-center gap-2">
              {isActive && (
                <Badge variant="secondary" className="animate-pulse bg-ai/10 text-ai border-ai/20">
                  İşliyor...
                </Badge>
              )}
              {isCompleted && (
                <Badge className="bg-ai-secondary text-white">
                  Tamamlandı
                </Badge>
              )}
              <Home className={`w-4 h-4 ${isActive ? 'text-ai' : 'text-muted-foreground'}`} />
            </div>
          </div>
        </Card>
      </TooltipTrigger>
      <TooltipContent side="top" className="max-w-sm p-4 bg-white/95 backdrop-blur border border-border/50 rounded-2xl">
        <div className="space-y-3">
          <div>
            <h4 className="font-semibold text-foreground mb-1">{config.tooltip.title}</h4>
            <p className="text-sm text-muted-foreground">{config.tooltip.description}</p>
          </div>
          <div>
            <h5 className="font-medium text-foreground mb-2">Özellikler:</h5>
            <ul className="space-y-1">
              {config.tooltip.features.map((feature, index) => (
                <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                  <span className="text-ai text-xs mt-1">•</span>
                  {feature}
                </li>
              ))}
            </ul>
          </div>
          <div className="pt-2 border-t border-border/50">
            <p className="text-xs text-muted-foreground">
              💡 Bu ajan hakkında daha fazla bilgi için deneme yapın.
            </p>
          </div>
        </div>
      </TooltipContent>
    </Tooltip>
  );
};