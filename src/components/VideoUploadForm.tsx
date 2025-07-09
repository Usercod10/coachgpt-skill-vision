
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Upload, Video, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from 'sonner';
import { useAnalysis } from '@/contexts/AnalysisContext';

interface VideoUploadFormProps {
  onBack: () => void;
}

const skills = [
  { id: 'dribbling', label: 'Dribbling' },
  { id: 'passing', label: 'Passing' },
  { id: 'shooting', label: 'Shooting' },
  { id: 'turning', label: 'Turning' },
  { id: 'positioning', label: 'Positioning' }
];

const VideoUploadForm = ({ onBack }: VideoUploadFormProps) => {
  const [formData, setFormData] = useState({
    jerseyNumber: '',
    jerseyColor: '',
    selectedSkills: [] as string[],
    audience: '',
    file: null as File | null
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { setAnalysisData } = useAnalysis();

  const handleSkillChange = (skillId: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      selectedSkills: checked 
        ? [...prev.selectedSkills, skillId]
        : prev.selectedSkills.filter(id => id !== skillId)
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData(prev => ({ ...prev, file }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.jerseyNumber || !formData.file || formData.selectedSkills.length === 0) {
      toast.error('Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Generate mock job ID
      const jobId = `job_${Date.now()}`;
      
      setAnalysisData({
        jobId,
        status: 'processing'
      });

      toast.success('Video uploaded successfully! Processing analysis...');
      navigate(`/analysis/${jobId}`);
    } catch (error) {
      toast.error('Failed to upload video. Please try again.');
      console.error('Upload error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-green-900 to-emerald-900 px-6 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center mb-8">
          <Button
            variant="ghost"
            onClick={onBack}
            className="text-white hover:bg-white/10 mr-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center">
              <Video className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-white">Upload Video for Analysis</h1>
          </div>
        </div>

        {/* Upload Form */}
        <Card className="bg-white/10 backdrop-blur-lg border-white/20">
          <CardHeader>
            <CardTitle className="text-white text-xl">Video Analysis Setup</CardTitle>
            <CardDescription className="text-slate-300">
              Provide video details and select skills to analyze
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* File Upload */}
              <div className="space-y-2">
                <Label htmlFor="video" className="text-white font-medium">
                  Video File *
                </Label>
                <div className="border-2 border-dashed border-white/30 rounded-lg p-6 text-center hover:border-emerald-400 transition-colors">
                  <input
                    type="file"
                    id="video"
                    accept=".mp4,.avi,.mov,.wmv"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  <label htmlFor="video" className="cursor-pointer">
                    <Upload className="w-12 h-12 text-emerald-400 mx-auto mb-4" />
                    <p className="text-white mb-2">
                      {formData.file ? formData.file.name : 'Click to upload video'}
                    </p>
                    <p className="text-slate-400 text-sm">
                      Supports MP4, AVI, MOV, WMV files
                    </p>
                  </label>
                </div>
              </div>

              {/* Player Details */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="jersey" className="text-white font-medium">
                    Jersey Number *
                  </Label>
                  <Input
                    id="jersey"
                    type="number"
                    value={formData.jerseyNumber}
                    onChange={(e) => setFormData(prev => ({ ...prev, jerseyNumber: e.target.value }))}
                    className="bg-white/10 border-white/20 text-white placeholder:text-slate-400"
                    placeholder="Enter jersey number"
                    min="1"
                    max="99"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="color" className="text-white font-medium">
                    Jersey Color (Optional)
                  </Label>
                  <Input
                    id="color"
                    value={formData.jerseyColor}
                    onChange={(e) => setFormData(prev => ({ ...prev, jerseyColor: e.target.value }))}
                    className="bg-white/10 border-white/20 text-white placeholder:text-slate-400"
                    placeholder="e.g., Red, Blue, White"
                  />
                </div>
              </div>

              {/* Skills Selection */}
              <div className="space-y-3">
                <Label className="text-white font-medium">
                  Skills to Analyze *
                </Label>
                <div className="grid md:grid-cols-3 gap-3">
                  {skills.map((skill) => (
                    <div key={skill.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={skill.id}
                        checked={formData.selectedSkills.includes(skill.id)}
                        onCheckedChange={(checked) => handleSkillChange(skill.id, checked as boolean)}
                        className="border-white/30 data-[state=checked]:bg-emerald-500"
                      />
                      <Label htmlFor={skill.id} className="text-white cursor-pointer">
                        {skill.label}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Audience Selection */}
              <div className="space-y-2">
                <Label className="text-white font-medium">
                  Target Audience (Optional)
                </Label>
                <Select value={formData.audience} onValueChange={(value) => setFormData(prev => ({ ...prev, audience: value }))}>
                  <SelectTrigger className="bg-white/10 border-white/20 text-white">
                    <SelectValue placeholder="Select target audience" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="coach">Coach</SelectItem>
                    <SelectItem value="player">Player</SelectItem>
                    <SelectItem value="analyst">Analyst</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-emerald-500 hover:bg-emerald-600 text-white py-6 text-lg font-semibold rounded-xl"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Processing Video...
                  </>
                ) : (
                  <>
                    <Upload className="w-5 h-5 mr-2" />
                    Start Analysis
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default VideoUploadForm;
