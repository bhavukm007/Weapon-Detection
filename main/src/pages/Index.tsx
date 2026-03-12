import { useState } from "react";
import { Upload, Shield, AlertTriangle, CheckCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface DetectionResult {
  weaponsDetected: boolean;
  confidence: number;
  detectedItems: string[];
  details: string;
}

const Index = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<DetectionResult | null>(null);
  const { toast } = useToast();

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "Please upload an image smaller than 10MB",
          variant: "destructive",
        });
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string);
        setResult(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const analyzeImage = async () => {
    if (!selectedImage) return;

    setIsAnalyzing(true);
    setResult(null);

    try {
      const { data, error } = await supabase.functions.invoke('detect-weapon', {
        body: { imageData: selectedImage }
      });

      if (error) {
        console.error('Edge function error:', error);
        throw error;
      }

      setResult(data as DetectionResult);
      
      toast({
        title: "Analysis Complete",
        description: data.weaponsDetected 
          ? "Potential weapons detected" 
          : "No weapons detected",
        variant: data.weaponsDetected ? "destructive" : "default",
      });
    } catch (error) {
      console.error('Error analyzing image:', error);
      toast({
        title: "Analysis Failed",
        description: "Failed to analyze image. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-3">
            <Shield className="h-8 w-8 text-primary" />
            <h1 className="text-2xl font-bold text-foreground">WeaponGuard AI</h1>
          </div>
          <p className="mt-2 text-muted-foreground">
            Advanced AI-powered weapon detection system
          </p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <div className="mx-auto max-w-4xl">
          {/* Upload Section */}
          <Card className="p-8 mb-8">
            <div className="text-center mb-6">
              <h2 className="text-3xl font-bold mb-2 text-foreground">
                Upload Image for Analysis
              </h2>
              <p className="text-muted-foreground">
                Our AI will scan for weapons, firearms, knives, and dangerous objects
              </p>
            </div>

            <div className="space-y-6">
              {!selectedImage ? (
                <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-border rounded-lg cursor-pointer bg-secondary/50 hover:bg-secondary transition-colors">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <Upload className="w-12 h-12 mb-4 text-muted-foreground" />
                    <p className="mb-2 text-sm text-muted-foreground">
                      <span className="font-semibold">Click to upload</span> or drag and drop
                    </p>
                    <p className="text-xs text-muted-foreground">
                      PNG, JPG, JPEG (MAX. 10MB)
                    </p>
                  </div>
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageUpload}
                  />
                </label>
              ) : (
                <div className="space-y-4">
                  <div className="relative rounded-lg overflow-hidden border border-border">
                    <img
                      src={selectedImage}
                      alt="Uploaded"
                      className="w-full h-auto max-h-96 object-contain bg-secondary"
                    />
                  </div>
                  
                  <div className="flex gap-3">
                    <Button
                      onClick={analyzeImage}
                      disabled={isAnalyzing}
                      className="flex-1"
                      size="lg"
                    >
                      {isAnalyzing ? (
                        <>
                          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                          Analyzing...
                        </>
                      ) : (
                        <>
                          <Shield className="mr-2 h-5 w-5" />
                          Analyze Image
                        </>
                      )}
                    </Button>
                    
                    <Button
                      variant="outline"
                      onClick={() => {
                        setSelectedImage(null);
                        setResult(null);
                      }}
                      size="lg"
                    >
                      Clear
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </Card>

          {/* Results Section */}
          {result && (
            <Card className="p-8 animate-in fade-in slide-in-from-bottom-4">
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  {result.weaponsDetected ? (
                    <div className="rounded-full bg-alert/10 p-3">
                      <AlertTriangle className="h-8 w-8 text-alert" />
                    </div>
                  ) : (
                    <div className="rounded-full bg-success/10 p-3">
                      <CheckCircle className="h-8 w-8 text-success" />
                    </div>
                  )}
                  
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold mb-2 text-foreground">
                      {result.weaponsDetected ? "Weapons Detected" : "No Weapons Detected"}
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      Confidence: {result.confidence}%
                    </p>
                    
                    {result.detectedItems.length > 0 && (
                      <div className="mb-4">
                        <h4 className="font-semibold mb-2 text-foreground">Detected Items:</h4>
                        <ul className="list-disc list-inside space-y-1">
                          {result.detectedItems.map((item, index) => (
                            <li key={index} className="text-muted-foreground">{item}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                    
                    <div className="p-4 rounded-lg bg-secondary/50 border border-border">
                      <h4 className="font-semibold mb-2 text-foreground">Analysis Details:</h4>
                      <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                        {result.details}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          )}

          {/* Info Cards */}
          <div className="grid md:grid-cols-3 gap-6 mt-12">
            <Card className="p-6 bg-card/50">
              <Shield className="h-8 w-8 text-primary mb-3" />
              <h3 className="font-semibold mb-2 text-foreground">AI-Powered</h3>
              <p className="text-sm text-muted-foreground">
                Advanced machine learning for accurate detection
              </p>
            </Card>
            
            <Card className="p-6 bg-card/50">
              <Upload className="h-8 w-8 text-primary mb-3" />
              <h3 className="font-semibold mb-2 text-foreground">Fast Analysis</h3>
              <p className="text-sm text-muted-foreground">
                Get results in seconds with real-time processing
              </p>
            </Card>
            
            <Card className="p-6 bg-card/50">
              <CheckCircle className="h-8 w-8 text-primary mb-3" />
              <h3 className="font-semibold mb-2 text-foreground">High Accuracy</h3>
              <p className="text-sm text-muted-foreground">
                Confidence scores help you make informed decisions
              </p>
            </Card>
          </div>
        </div>
      </main>

      <footer className="mt-20 border-t border-border py-8">
        <div className="container mx-auto px-4 text-center text-muted-foreground text-sm">
          <p>WeaponGuard AI - Advanced Security Detection System</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
