import { useState } from 'react';
import { ImageUpload } from './ImageUpload';
import { Button } from '@/components/ui/button';
import { uploadPetImage } from '../services/pet.service';
import { AlertCircle, CheckCircle2, Upload } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import type { FlowStep } from '@/features/estimate/type/types';

interface UploadFileFlowProps {
  insuranceId: string;
  onSuccess: (step: FlowStep) => void;
  onBack: (step: FlowStep) => void;
  petName?: string;
}

export const UploadFileFlow = ({
  insuranceId,
  onSuccess,
  onBack,
  petName = 'tu mascota',
}: UploadFileFlowProps) => {
  const [image, setImage] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    if (!image) {
      setError('Por favor, selecciona una imagen antes de enviar.');
      return;
    }

    setError(null);
    setUploadSuccess(false);
    setIsUploading(true);

    try {
      const response = await uploadPetImage(image, insuranceId);
      if (response.success) {
        setUploadSuccess(true);
        setError(null);
      }
    } catch (err) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : 'Ocurrió un error al subir la imagen. Por favor, intenta de nuevo.';

      setError(errorMessage);
      setUploadSuccess(false);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="space-y-4 mt-4">
        <p className="text-gray-600 text-center">
          Por favor, carga una foto tomada de frente de {petName}.
        </p>
      </div>

      <ImageUpload
        value={image}
        onChange={(file) => {
          setImage(file);
          setError(null);
          setUploadSuccess(false);
        }}
        label="Sube la foto de tu mascota"
        maxSizeMB={5}
      />

      {error && (
        <Alert variant="destructive" className="animate-in fade-in-50 duration-300">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error al subir la imagen</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {uploadSuccess && (
        <Alert className="bg-green-50 text-green-900 border-green-200 animate-in fade-in-50 duration-300">
          <CheckCircle2 className="h-4 w-4 text-green-600" />
          <AlertTitle>¡Imagen subida exitosamente!</AlertTitle>
          <AlertDescription>
            La foto de {petName} ha sido cargada correctamente.
          </AlertDescription>
        </Alert>
      )}

      <div className="mt-10 flex flex-col md:flex-row items-center justify-between gap-4 w-full">
        <Button
          variant="secondary"
          className="h-11 px-10 cursor-pointer w-full md:w-44"
          onClick={() => onBack('emit')}
        >
          ATRÁS
        </Button>
        {!isUploading && uploadSuccess && (
          <Button
            className=" w-full md:w-44 h-11 px-10 bg-kover-widget-primary hover:bg-kover-widget-primary-hover text-base font-semibold cursor-pointer"
            onClick={() => onSuccess('additional-data')}
          >
            CONTINUAR
          </Button>
        )}
        {!uploadSuccess && (
          <Button
            type="button"
            onClick={handleSubmit}
            disabled={!image || isUploading}
            className="h-12 px-8 text-lg cursor-pointer rounded-md transition-all bg-kover-widget-primary hover:bg-kover-widget-primary-hover disabled:bg-gray-300 disabled:cursor-not-allowed text-white"
          >
            {isUploading && (
              <>
                <Upload className="h-5 w-5 mr-2 animate-bounce" />
                Subiendo...
              </>
            )}
            {!isUploading && (
              <>
                <Upload className="h-5 w-5 mr-2" />
                Enviar Foto
              </>
            )}
          </Button>
        )}
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-sm text-blue-900">
          <strong>Consejos para una buena foto:</strong>
        </p>
        <ul className="text-sm text-blue-800 mt-2 space-y-1 list-disc list-inside">
          <li>Asegúrate de que la foto esté bien iluminada</li>
          <li>La mascota debe estar de frente a la cámara</li>
          <li>Evita fotos borrosas o muy oscuras</li>
          <li>Formato JPG, PNG, GIF o WEBP (máximo 5MB)</li>
        </ul>
      </div>
    </div>
  );
};
