import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import { useCallback, useState } from 'react';
import { Upload, X, Image as ImageIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ImageUploadProps {
  value?: File | string | null;
  onChange?: (file: File | null) => void;
  label?: string;
  error?: string;
  maxSizeMB?: number;
  acceptedFormats?: string[];
}

export const ImageUpload = ({
  value,
  onChange,
  label = 'Subir imagen',
  error,
  maxSizeMB = 5,
  acceptedFormats = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'],
}: ImageUploadProps) => {
  const [preview, setPreview] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);

  const generatePreview = useCallback((file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  }, []);

  const validateFile = useCallback(
    (file: File): string | null => {
      if (!acceptedFormats.includes(file.type)) {
        return 'El archivo debe ser una imagen válida (JPG, PNG, GIF, WEBP)';
      }

      const maxSizeBytes = maxSizeMB * 1024 * 1024;
      if (file.size > maxSizeBytes) {
        return `La imagen no debe superar ${maxSizeMB}MB`;
      }

      return null;
    },
    [acceptedFormats, maxSizeMB]
  );

  const handleFileChange = useCallback(
    (file: File | null) => {
      if (!file) {
        setPreview(null);
        setValidationError(null);
        onChange?.(null);
        return;
      }

      const error = validateFile(file);
      if (error) {
        setValidationError(error);
        setPreview(null);
        onChange?.(null);
        return;
      }

      setValidationError(null);
      generatePreview(file);
      onChange?.(file);
    },
    [onChange, validateFile, generatePreview]
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    handleFileChange(file);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files?.[0] || null;
    handleFileChange(file);
  };

  const handleRemove = () => {
    handleFileChange(null);
  };

  const displayError = error || validationError;

  return (
    <Field data-invalid={!!displayError}>
      {label && <FieldLabel>{label}</FieldLabel>}

      <div className="w-full">
        {!preview && !value ? (
          <div
            className={`relative border-2 border-dashed rounded-lg p-6 transition-all cursor-pointer hover:border-kover-widget-primary hover:bg-gray-50 ${
              isDragging
                ? 'border-kover-widget-primary bg-blue-50'
                : displayError
                  ? 'border-red-500 bg-red-50'
                  : 'border-gray-300 bg-[#F8FAFC]'
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <input
              type="file"
              accept={acceptedFormats.join(',')}
              onChange={handleInputChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              aria-label="Subir imagen"
            />

            <div className="flex flex-col items-center justify-center gap-3 text-center">
              <div
                className={`p-3 rounded-full ${
                  displayError ? 'bg-red-100' : 'bg-gray-100'
                }`}
              >
                <Upload
                  className={`h-8 w-8 ${displayError ? 'text-red-500' : 'text-gray-400'}`}
                />
              </div>

              <div>
                <p className="text-sm font-medium text-gray-700">
                  Arrastra y suelta tu imagen aquí
                </p>
                <p className="text-xs text-gray-500 mt-1">o haz clic para seleccionar</p>
              </div>

              <p className="text-xs text-gray-400">
                Formatos: JPG, PNG, GIF, WEBP (Máx. {maxSizeMB}MB)
              </p>
            </div>
          </div>
        ) : (
          <div className="relative group">
            <div className="relative border-2 border-gray-200 rounded-lg overflow-hidden bg-white shadow-sm">
              <div className="flex items-center justify-center min-h-[16rem] max-h-[24rem] p-4 bg-gradient-to-br from-gray-50 to-white">
                <img
                  src={preview || (typeof value === 'string' ? value : '')}
                  alt="Preview"
                  className="max-w-full max-h-[22rem] w-auto h-auto object-contain rounded shadow-md"
                />
              </div>

              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6 gap-3">
                <Button
                  type="button"
                  onClick={handleRemove}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md flex items-center gap-2 shadow-lg"
                >
                  <X className="h-4 w-4" />
                  Eliminar
                </Button>

                <label className="bg-kover-widget-primary hover:bg-kover-widget-primary-hover text-white px-4 py-2 rounded-md cursor-pointer flex items-center gap-2 shadow-lg">
                  <ImageIcon className="h-4 w-4" />
                  Cambiar
                  <input
                    type="file"
                    accept={acceptedFormats.join(',')}
                    onChange={handleInputChange}
                    className="hidden"
                    aria-label="Cambiar imagen"
                  />
                </label>
              </div>
            </div>

            {value instanceof File && (
              <p className="text-xs text-gray-500 mt-2">
                {value.name} ({(value.size / 1024).toFixed(2)} KB)
              </p>
            )}
          </div>
        )}

        {displayError && <FieldError errors={[{ message: displayError }]} />}
      </div>
    </Field>
  );
};
