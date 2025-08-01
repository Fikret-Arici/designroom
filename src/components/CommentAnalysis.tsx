import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { MessageSquare, TrendingUp, AlertTriangle, Truck, ThumbsUp, Target, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import ApiService from '@/services/apiService';

interface CommentAnalysisProps {
    productUrl: string;
    productName: string;
}

interface Analysis {
    quality: string;
    problems: string;
    shipping: string;
    positives: string;
    recommendation: string;
}

interface CommentAnalysisResult {
    analysis: Analysis;
    comments: string[];
    totalComments: number;
    productUrl: string;
}

export const CommentAnalysis = ({ productUrl, productName }: CommentAnalysisProps) => {
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [analysisResult, setAnalysisResult] = useState<CommentAnalysisResult | null>(null);
    const [isExpanded, setIsExpanded] = useState(false);
    const { toast } = useToast();
    const apiService = ApiService.getInstance();

    console.log('CommentAnalysis render edildi:', { productUrl, productName });

    const handleAnalyzeComments = async () => {
        if (!productUrl) {
            toast({
                title: "Hata",
                description: "Ürün URL'si bulunamadı",
                variant: "destructive",
            });
            return;
        }

        setIsAnalyzing(true);
        setIsExpanded(true);

        try {
            console.log('Yorum analizi başlatılıyor:', productUrl);

            const response = await fetch('http://localhost:5000/api/analyze-comments', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    productUrl: productUrl
                }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();
            setAnalysisResult(result);

            toast({
                title: "Analiz Tamamlandı",
                description: `${result.totalComments} yorum analiz edildi`,
            });

        } catch (error: any) {
            console.error('Yorum analizi hatası:', error);

            let errorMessage = "Yorum analizi sırasında bir hata oluştu.";

            if (error.message.includes('Failed to fetch')) {
                errorMessage = "Backend sunucusuna bağlanılamıyor. Sunucunun çalıştığından emin olun.";
            } else if (error.message.includes('timeout')) {
                errorMessage = "İstek zaman aşımına uğradı. Lütfen tekrar deneyin.";
            }

            toast({
                title: "Analiz Hatası",
                description: errorMessage,
                variant: "destructive",
            });

            setAnalysisResult(null);
        } finally {
            setIsAnalyzing(false);
        }
    };

    return (
        <Card className="mt-4 border-blue-500 bg-gradient-to-r from-blue-50 to-indigo-50 shadow-lg">
            <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                        <MessageSquare className="w-5 h-5 text-blue-700" />
                        <h3 className="font-bold text-lg text-gray-800">Müşteri Yorumları Analizi</h3>
                        <Badge variant="outline" className="text-xs bg-blue-200 text-blue-800 border-blue-300">AI Destekli</Badge>
                    </div>                    {!analysisResult && (
                        <Button
                            onClick={handleAnalyzeComments}
                            disabled={isAnalyzing}
                            size="sm"
                            className="bg-blue-600 hover:bg-blue-700"
                        >
                            {isAnalyzing ? (
                                <>
                                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                    Analiz Ediliyor...
                                </>
                            ) : (
                                <>
                                    <MessageSquare className="w-4 h-4 mr-2" />
                                    Yorumları Analiz Et
                                </>
                            )}
                        </Button>
                    )}
                </div>

                <p className="text-sm text-gray-700 mb-4 font-medium">
                    {productName} ürününün müşteri yorumlarını AI ile analiz ederek kalite, teslimat ve genel memnuniyet hakkında bilgi alın.
                </p>                {isAnalyzing && (
                    <Card className="p-4 border-blue-300 bg-gradient-to-r from-blue-100 to-indigo-100 animate-pulse shadow-md">
                        <div className="flex items-center gap-3">
                            <Loader2 className="w-6 h-6 animate-spin text-blue-700" />
                            <div className="flex-1">
                                <div className="h-3 bg-blue-300 rounded-full overflow-hidden">
                                    <div className="h-full bg-blue-600 animate-pulse"></div>
                                </div>
                            </div>
                        </div>
                        <p className="text-center text-sm text-gray-700 mt-3 font-medium">
                            Yorumlar toplanıyor ve AI ile analiz ediliyor...
                        </p>
                    </Card>
                )}

                {analysisResult && (
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <Badge variant="default" className="bg-green-700 text-white font-semibold">
                                {analysisResult.totalComments} Yorum Analiz Edildi
                            </Badge>
                            <Button
                                onClick={handleAnalyzeComments}
                                size="sm"
                                variant="outline"
                                disabled={isAnalyzing}
                                className="border-blue-300 text-blue-700 hover:bg-blue-50"
                            >
                                Yeniden Analiz Et
                            </Button>
                        </div>

                        <Accordion type="single" collapsible className="w-full">
                            <AccordionItem value="quality" className="border-blue-300 bg-white shadow-sm">
                                <AccordionTrigger className="hover:no-underline hover:bg-blue-50">
                                    <div className="flex items-center gap-2">
                                        <TrendingUp className="w-5 h-5 text-green-600" />
                                        <span className="font-semibold text-gray-800">Ürün Kalitesi ve Dayanıklılık</span>
                                    </div>
                                </AccordionTrigger>
                                <AccordionContent>
                                    <p className="text-sm text-gray-700 leading-relaxed p-3 bg-green-50 rounded-lg">
                                        {analysisResult.analysis.quality}
                                    </p>
                                </AccordionContent>
                            </AccordionItem>

                            <AccordionItem value="problems" className="border-blue-300 bg-white shadow-sm">
                                <AccordionTrigger className="hover:no-underline hover:bg-red-50">
                                    <div className="flex items-center gap-2">
                                        <AlertTriangle className="w-5 h-5 text-red-600" />
                                        <span className="font-semibold text-gray-800">Sorunlar ve Şikayetler</span>
                                    </div>
                                </AccordionTrigger>
                                <AccordionContent>
                                    <p className="text-sm text-gray-700 leading-relaxed p-3 bg-red-50 rounded-lg">
                                        {analysisResult.analysis.problems}
                                    </p>
                                </AccordionContent>
                            </AccordionItem>

                            <AccordionItem value="shipping" className="border-blue-300 bg-white shadow-sm">
                                <AccordionTrigger className="hover:no-underline hover:bg-blue-50">
                                    <div className="flex items-center gap-2">
                                        <Truck className="w-5 h-5 text-blue-600" />
                                        <span className="font-semibold text-gray-800">Kargo ve Teslimat</span>
                                    </div>
                                </AccordionTrigger>
                                <AccordionContent>
                                    <p className="text-sm text-gray-700 leading-relaxed p-3 bg-blue-50 rounded-lg">
                                        {analysisResult.analysis.shipping}
                                    </p>
                                </AccordionContent>
                            </AccordionItem>

                            <AccordionItem value="positives" className="border-blue-300 bg-white shadow-sm">
                                <AccordionTrigger className="hover:no-underline hover:bg-green-50">
                                    <div className="flex items-center gap-2">
                                        <ThumbsUp className="w-5 h-5 text-green-600" />
                                        <span className="font-semibold text-gray-800">Beğenilen Yönler</span>
                                    </div>
                                </AccordionTrigger>
                                <AccordionContent>
                                    <p className="text-sm text-gray-700 leading-relaxed p-3 bg-green-50 rounded-lg">
                                        {analysisResult.analysis.positives}
                                    </p>
                                </AccordionContent>
                            </AccordionItem>

                            <AccordionItem value="recommendation" className="border-blue-300 bg-white shadow-sm">
                                <AccordionTrigger className="hover:no-underline hover:bg-purple-50">
                                    <div className="flex items-center gap-2">
                                        <Target className="w-5 h-5 text-purple-600" />
                                        <span className="font-semibold text-gray-800">Genel Değerlendirme ve Tavsiyeler</span>
                                    </div>
                                </AccordionTrigger>
                                <AccordionContent>
                                    <div className="bg-gradient-to-r from-purple-50 to-indigo-50 p-4 rounded-lg border border-purple-200 shadow-sm">
                                        <p className="text-sm text-gray-700 leading-relaxed font-medium">
                                            {analysisResult.analysis.recommendation}
                                        </p>
                                    </div>
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>

                        {analysisResult.comments.length > 0 && (
                            <Accordion type="single" collapsible className="w-full">
                                <AccordionItem value="raw-comments" className="border-blue-200">
                                    <AccordionTrigger className="hover:no-underline">
                                        <div className="flex items-center gap-2">
                                            <MessageSquare className="w-4 h-4 text-gray-600" />
                                            <span>Ham Yorumlar ({analysisResult.comments.length})</span>
                                        </div>
                                    </AccordionTrigger>
                                    <AccordionContent>
                                        <div className="max-h-60 overflow-y-auto space-y-2">
                                            {analysisResult.comments.map((comment, index) => (
                                                <div key={index} className="p-3 bg-gradient-to-r from-gray-50 to-slate-50 rounded-lg text-sm border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200 hover:border-gray-300">
                                                    <span className="text-gray-700 leading-relaxed">{comment}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </AccordionContent>
                                </AccordionItem>
                            </Accordion>
                        )}
                    </div>
                )}
            </div>
        </Card>
    );
};
