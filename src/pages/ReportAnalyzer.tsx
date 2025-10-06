import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Upload, Camera, FileText, AlertCircle, CheckCircle, Activity } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import GlassNavbar from "@/components/GlassNavbar";
import ClickSpark from "@/components/ClickSpark";

const ReportAnalyzer = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [analysis, setAnalysis] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 20 * 1024 * 1024) {
        toast.error("File size must be less than 20MB");
        return;
      }
      
      const reader = new FileReader();
      reader.onload = (event) => {
        setSelectedImage(event.target?.result as string);
        setAnalysis(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCameraCapture = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      const video = document.createElement('video');
      video.srcObject = stream;
      video.play();

      await new Promise(resolve => {
        video.onloadedmetadata = resolve;
      });

      const canvas = document.createElement('canvas');
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext('2d');
      ctx?.drawImage(video, 0, 0);
      
      stream.getTracks().forEach(track => track.stop());
      
      const imageData = canvas.toDataURL('image/jpeg', 0.8);
      setSelectedImage(imageData);
      setAnalysis(null);
    } catch (error) {
      console.error('Camera error:', error);
      toast.error("Unable to access camera");
    }
  };

  const analyzeReport = async () => {
    if (!selectedImage) {
      toast.error("Please select or capture an image first");
      return;
    }

    setIsAnalyzing(true);
    setAnalysis(null);

    try {
      const { data, error } = await supabase.functions.invoke('analyze-report', {
        body: { imageData: selectedImage }
      });

      if (error) {
        console.error('Analysis error:', error);
        throw error;
      }

      if (data?.error) {
        throw new Error(data.error);
      }

      setAnalysis(data.analysis);
      toast.success("Report analyzed successfully!");
    } catch (error: any) {
      console.error('Error analyzing report:', error);
      toast.error(error.message || "Failed to analyze report");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const parseAnalysis = (text: string) => {
    const sections = {
      summary: '',
      parameters: '',
      issues: '',
      risks: '',
      recommendations: ''
    };

    const summaryMatch = text.match(/\*\*Summary\*\*:?(.*?)(?=\*\*|$)/s);
    const parametersMatch = text.match(/\*\*Key Health Parameters\*\*:?(.*?)(?=\*\*|$)/s);
    const issuesMatch = text.match(/\*\*Detected Issues\*\*:?(.*?)(?=\*\*|$)/s);
    const risksMatch = text.match(/\*\*Health Risks\*\*:?(.*?)(?=\*\*|$)/s);
    const recommendationsMatch = text.match(/\*\*Recommendations\*\*:?(.*?)(?=\*\*|$)/s);

    if (summaryMatch) sections.summary = summaryMatch[1].trim();
    if (parametersMatch) sections.parameters = parametersMatch[1].trim();
    if (issuesMatch) sections.issues = issuesMatch[1].trim();
    if (risksMatch) sections.risks = risksMatch[1].trim();
    if (recommendationsMatch) sections.recommendations = recommendationsMatch[1].trim();

    return sections;
  };

  const sections = analysis ? parseAnalysis(analysis) : null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <GlassNavbar />
      
      <div className="container mx-auto px-4 pt-24 pb-12">
        <ClickSpark>
          <Button
            variant="ghost"
            onClick={() => navigate('/dashboard')}
            className="mb-6 hover:bg-primary/10"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>
        </ClickSpark>

        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-3 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Medical Report Analyzer
            </h1>
            <p className="text-muted-foreground text-lg">
              Upload or capture your medical report for instant AI-powered analysis
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <Card className="glass-panel p-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <FileText className="w-5 h-5 text-primary" />
                Upload Report
              </h2>
              
              <div className="space-y-4">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileSelect}
                  className="hidden"
                />
                
                <ClickSpark>
                  <Button
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full"
                    variant="outline"
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    Choose File
                  </Button>
                </ClickSpark>

                <ClickSpark>
                  <Button
                    onClick={handleCameraCapture}
                    className="w-full"
                    variant="outline"
                  >
                    <Camera className="w-4 h-4 mr-2" />
                    Capture Photo
                  </Button>
                </ClickSpark>

                {selectedImage && (
                  <div className="mt-4">
                    <img
                      src={selectedImage}
                      alt="Selected report"
                      className="w-full rounded-lg border border-primary/20"
                    />
                    <ClickSpark>
                      <Button
                        onClick={analyzeReport}
                        disabled={isAnalyzing}
                        className="w-full mt-4"
                      >
                        {isAnalyzing ? (
                          <>
                            <Activity className="w-4 h-4 mr-2 animate-spin" />
                            Analyzing...
                          </>
                        ) : (
                          <>
                            <Activity className="w-4 h-4 mr-2" />
                            Analyze Report
                          </>
                        )}
                      </Button>
                    </ClickSpark>
                  </div>
                )}
              </div>
            </Card>

            <Card className="glass-panel p-6">
              <h2 className="text-xl font-semibold mb-4">Guidelines</h2>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <span>Ensure the report is clearly visible and well-lit</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <span>Supported formats: JPG, PNG, WEBP (max 20MB)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <span>Works with blood tests, MRI, ultrasound, and lab reports</span>
                </li>
                <li className="flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                  <span>AI analysis is for informational purposes only</span>
                </li>
                <li className="flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                  <span>Always consult a healthcare professional for medical advice</span>
                </li>
              </ul>
            </Card>
          </div>

          {sections && (
            <Card className="glass-panel p-8">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Activity className="w-6 h-6 text-primary" />
                Analysis Results
              </h2>

              <div className="space-y-6">
                {sections.summary && (
                  <div>
                    <h3 className="text-lg font-semibold mb-2 text-primary">Summary</h3>
                    <p className="text-muted-foreground whitespace-pre-line">{sections.summary}</p>
                  </div>
                )}

                {sections.parameters && (
                  <div>
                    <h3 className="text-lg font-semibold mb-2 text-primary">Key Health Parameters</h3>
                    <div className="text-muted-foreground whitespace-pre-line">{sections.parameters}</div>
                  </div>
                )}

                {sections.issues && (
                  <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4">
                    <h3 className="text-lg font-semibold mb-2 text-yellow-600 dark:text-yellow-500 flex items-center gap-2">
                      <AlertCircle className="w-5 h-5" />
                      Detected Issues
                    </h3>
                    <div className="text-muted-foreground whitespace-pre-line">{sections.issues}</div>
                  </div>
                )}

                {sections.risks && (
                  <div>
                    <h3 className="text-lg font-semibold mb-2 text-primary">Health Risks</h3>
                    <div className="text-muted-foreground whitespace-pre-line">{sections.risks}</div>
                  </div>
                )}

                {sections.recommendations && (
                  <div className="bg-primary/10 border border-primary/20 rounded-lg p-4">
                    <h3 className="text-lg font-semibold mb-2 text-primary flex items-center gap-2">
                      <CheckCircle className="w-5 h-5" />
                      Recommendations
                    </h3>
                    <div className="text-muted-foreground whitespace-pre-line">{sections.recommendations}</div>
                  </div>
                )}
              </div>

              <div className="mt-6 p-4 bg-muted/50 rounded-lg border border-primary/20">
                <p className="text-sm text-muted-foreground flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0 text-yellow-500" />
                  <span>
                    This AI-powered analysis is for informational purposes only and should not replace professional medical advice. 
                    Always consult with qualified healthcare professionals for diagnosis and treatment.
                  </span>
                </p>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReportAnalyzer;
