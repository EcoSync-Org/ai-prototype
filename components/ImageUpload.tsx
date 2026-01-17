'use client';

// Image upload component for meter and solar panel analysis
import { useState } from 'react';
import Card, { CardHeader, CardTitle, CardContent } from './ui/Card';
import Badge from './ui/Badge';
import AIThinkingIndicator from './ui/AIThinkingIndicator';

interface ImageUploadProps {
  type: 'meter' | 'solar';
  onAnalysisComplete?: (result: any) => void;
}

export default function ImageUpload({ type, onAnalysisComplete }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setError('Please upload an image file');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError('Image size must be less than 5MB');
      return;
    }

    setUploading(true);
    setError(null);

    // Create preview
    const reader = new FileReader();
    reader.onload = (e) => {
      setPreview(e.target?.result as string);
    };
    reader.readAsDataURL(file);

    // Convert to base64 and analyze
    const base64 = await fileToBase64(file);
    await analyzeImage(base64);
    setUploading(false);
  };

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const analyzeImage = async (base64Image: string) => {
    setAnalyzing(true);
    setError(null);

    try {
      const response = await fetch('/api/analyze-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ image: base64Image, type }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Analysis failed');
      }

      const data = await response.json();
      setResult(data.result);
      onAnalysisComplete?.(data.result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to analyze image');
    } finally {
      setAnalyzing(false);
    }
  };

  const title = type === 'meter' ? 'Meter Reading Analysis' : 'Solar Panel Inspection';
  const description = type === 'meter' 
    ? 'Upload a photo of your energy meter for AI analysis'
    : 'Upload a photo of your solar panels for condition assessment';

  return (
    <Card className="border-2 border-purple-200">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center">
              <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <CardTitle>{title}</CardTitle>
              <p className="text-sm text-gray-600">{description}</p>
            </div>
          </div>
          <Badge variant="info">AI Vision</Badge>
        </div>
      </CardHeader>

      <CardContent>
        {/* Upload Area */}
        <div className="mb-6">
          <label className="block">
            <div className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all ${
              uploading || analyzing 
                ? 'border-blue-400 bg-blue-50' 
                : 'border-gray-300 hover:border-blue-400 hover:bg-gray-50'
            }`}>
              {preview ? (
                <div className="space-y-4">
                  <img src={preview} alt="Preview" className="max-h-64 mx-auto rounded-lg" />
                  <p className="text-sm text-gray-600">Click to upload a different image</p>
                </div>
              ) : (
                <>
                  <svg className="w-16 h-16 mx-auto mb-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                  <p className="text-lg font-semibold text-gray-900 mb-2">
                    {uploading ? 'Uploading...' : 'Click to upload image'}
                  </p>
                  <p className="text-sm text-gray-600">PNG, JPG, WEBP up to 5MB</p>
                </>
              )}
            </div>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
              disabled={uploading || analyzing}
            />
          </label>
        </div>

        {/* Analyzing State */}
        {analyzing && (
          <div className="bg-blue-50 rounded-xl p-6 border border-blue-200 mb-6">
            <div className="flex items-center justify-center gap-4">
              <AIThinkingIndicator size="lg" label="DeepSeek AI analyzing image..." />
            </div>
          </div>
        )}

        {/* Error Display */}
        {error && (
          <div className="bg-red-50 rounded-xl p-4 border border-red-200 mb-6">
            <div className="flex items-start gap-3">
              <svg className="w-5 h-5 text-red-600 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              <div>
                <p className="text-sm font-semibold text-red-900">Analysis Error</p>
                <p className="text-sm text-red-700 mt-1">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Results Display */}
        {result && type === 'meter' && (
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border-2 border-green-200">
            <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Meter Reading Detected
            </h4>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="bg-white rounded-lg p-4">
                <div className="text-xs text-gray-600 mb-1">Reading</div>
                <div className="text-3xl font-bold text-gray-900">{result.reading}</div>
                <div className="text-sm text-gray-600">{result.unit}</div>
              </div>
              <div className="bg-white rounded-lg p-4">
                <div className="text-xs text-gray-600 mb-1">AI Confidence</div>
                <div className="text-3xl font-bold text-green-600">{result.confidence}%</div>
                <div className="text-sm text-gray-600">Accuracy</div>
              </div>
            </div>
            <div className="bg-white rounded-lg p-4">
              <div className="text-xs font-semibold text-gray-700 mb-2">AI Analysis:</div>
              <p className="text-sm text-gray-700">{result.analysis}</p>
            </div>
          </div>
        )}

        {result && type === 'solar' && (
          <div className={`rounded-xl p-6 border-2 ${
            result.condition === 'excellent' || result.condition === 'good'
              ? 'bg-gradient-to-br from-green-50 to-emerald-50 border-green-200'
              : 'bg-gradient-to-br from-amber-50 to-orange-50 border-amber-200'
          }`}>
            <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Solar Panel Inspection Complete
            </h4>
            
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="bg-white rounded-lg p-4">
                <div className="text-xs text-gray-600 mb-1">Condition</div>
                <div className="text-2xl font-bold text-gray-900 capitalize">{result.condition}</div>
              </div>
              <div className="bg-white rounded-lg p-4">
                <div className="text-xs text-gray-600 mb-1">Estimated Efficiency</div>
                <div className="text-2xl font-bold text-green-600">{result.estimatedEfficiency}%</div>
              </div>
            </div>

            {result.issues && result.issues.length > 0 && (
              <div className="bg-white rounded-lg p-4 mb-4">
                <div className="text-xs font-semibold text-gray-700 mb-2">Issues Detected:</div>
                <ul className="space-y-1">
                  {result.issues.map((issue: string, idx: number) => (
                    <li key={idx} className="text-sm text-gray-700 flex items-start gap-2">
                      <span className="text-amber-600">⚠️</span>
                      {issue}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {result.recommendations && result.recommendations.length > 0 && (
              <div className="bg-white rounded-lg p-4">
                <div className="text-xs font-semibold text-gray-700 mb-2">AI Recommendations:</div>
                <ul className="space-y-1">
                  {result.recommendations.map((rec: string, idx: number) => (
                    <li key={idx} className="text-sm text-gray-700 flex items-start gap-2">
                      <span className="text-green-600">✓</span>
                      {rec}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

