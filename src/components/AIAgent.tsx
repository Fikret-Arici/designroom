import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Brain, Search, Eye, Wand2 } from 'lucide-react';

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
    color: 'bg-ai-accent'
  },
  analysis: {
    icon: Eye,
    title: 'Görsel Analiz Agent',
    description: 'Oda tarzını ve renk uyumunu analiz ediyor',
    color: 'bg-ai-secondary'
  },
  placement: {
    icon: Wand2,
    title: 'Yerleştirme Agent',
    description: 'Ürünü odaya doğal şekilde yerleştiriyor',
    color: 'bg-ai'
  }
};

export const AIAgent = ({ type, isActive, isCompleted }: AIAgentProps) => {
  const config = agentConfig[type];
  const Icon = config.icon;

  return (
    <Card className={`p-4 transition-all duration-500 ${
      isActive 
        ? 'border-ai animate-ai-glow' 
        : isCompleted 
          ? 'border-green-500 bg-green-500/10' 
          : 'border-muted'
    }`}>
      <div className="flex items-center gap-3">
        <div className={`p-2 rounded-full ${config.color} ${
          isActive ? 'animate-float' : ''
        }`}>
          <Icon className="w-5 h-5 text-primary-foreground" />
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-foreground">{config.title}</h3>
          <p className="text-sm text-muted-foreground">{config.description}</p>
        </div>
        <div className="flex items-center gap-2">
          {isActive && (
            <Badge variant="secondary" className="animate-pulse">
              İşliyor...
            </Badge>
          )}
          {isCompleted && (
            <Badge className="bg-green-500 text-white">
              Tamamlandı
            </Badge>
          )}
          <Brain className={`w-4 h-4 ${isActive ? 'text-ai animate-pulse' : 'text-muted-foreground'}`} />
        </div>
      </div>
    </Card>
  );
};