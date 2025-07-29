import { useState, useCallback } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Upload, X, Camera } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import ApiService from '@/services/apiService';

interface ImageUploaderProps {
  onImageUpload: (file: File, preview: string) => void;
  title: string;
  description: string;
  acceptedTypes?: string;
  uploadToBackend?: boolean;
}

export const ImageUploader = ({ 
  onImageUpload, 
  title, 
  description, 
  acceptedTypes = "image/*",
  uploadToBackend = false
}: ImageUploaderProps) => {
  const [preview, setPreview] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();
  const apiService = ApiService.getInstance();

  const handleFile = useCallback(async (file: File) => {
    if (!file.type.startsWith('image/')) {
      toast({
        title: "Hata",
        description: "Lütfen geçerli bir görsel dosyası seçin.",
        variant: "destructive",
      });
      return;
    }

    setIsUploading(true);

    try {
      if (uploadToBackend) {
        // Backend'e yükle
        const response = await apiService.uploadRoomImage(file);
        setPreview(response.base64);
        onImageUpload(file, response.base64);
        toast({
          title: "Başarılı",
          description: response.message,
        });
      } else {
        // Sadece local preview
        const reader = new FileReader();
        reader.onload = () => {
          const result = reader.result as string;
          setPreview(result);
          onImageUpload(file, result);
          toast({
            title: "Başarılı",
            description: "Görsel başarıyla yüklendi!",
          });
        };
        reader.readAsDataURL(file);
      }
    } catch (error) {
      console.error('Dosya yükleme hatası:', error);
      toast({
        title: "Hata",
        description: "Görsel yüklenirken bir hata oluştu.",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  }, [onImageUpload, toast, uploadToBackend, apiService]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFile(files[0]);
    }
  }, [handleFile]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      handleFile(files[0]);
    }
  };

  const clearImage = () => {
    setPreview(null);
  };

  return (
    <Card className="p-6">
      <div className="text-center mb-4">
        <h3 className="text-lg font-semibold text-foreground">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      
      {preview ? (
        <div className="relative">
          <img 
            src={preview} 
            alt="Preview" 
            className="w-full h-64 object-cover rounded-lg border-2 border-border"
          />
          <Button
            variant="destructive"
            size="sm"
            className="absolute top-2 right-2"
            onClick={clearImage}
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      ) : (
        <div
          className={`border-2 border-dashed rounded-lg p-8 text-center transition-all duration-300 ${
            isDragging 
              ? 'border-ai bg-ai/10' 
              : 'border-border hover:border-ai/50'
          }`}
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          onDragEnter={() => setIsDragging(true)}
          onDragLeave={() => setIsDragging(false)}
        >
          <Camera className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground mb-4">
            Dosyayı buraya sürükleyin veya seçin
          </p>
          <Button variant="outline" className="relative" disabled={isUploading}>
            {isUploading ? (
              <div className="animate-spin w-4 h-4 border-2 border-current border-t-transparent rounded-full mr-2" />
            ) : (
              <Upload className="w-4 h-4 mr-2" />
            )}
            {isUploading ? 'Yükleniyor...' : 'Dosya Seç'}
            <input
              type="file"
              accept={acceptedTypes}
              onChange={handleFileChange}
              className="absolute inset-0 opacity-0 cursor-pointer"
              disabled={isUploading}
            />
          </Button>
        </div>
      )}
    </Card>
  );
};