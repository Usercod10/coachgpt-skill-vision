
import { useState } from 'react';
import { Upload, Video, BarChart3, Target, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import VideoUploadForm from '@/components/VideoUploadForm';
import FeatureCard from '@/components/FeatureCard';

const Index = () => {
  const [showUploadForm, setShowUploadForm] = useState(false);

  const features = [
    {
      icon: Video,
      title: 'Video Analysis',
      description: 'Upload match footage and get detailed player performance analysis'
    },
    {
      icon: BarChart3,
      title: 'Skill Breakdown',
      description: 'Track dribbling, passing, shooting, turning, and positioning statistics'
    },
    {
      icon: Target,
      title: 'Performance Insights',
      description: 'Receive actionable recommendations for player improvement'
    },
    {
      icon: Users,
      title: 'Multi-Audience Reports',
      description: 'Tailored analysis for coaches, players, and analysts'
    }
  ];

  if (showUploadForm) {
    return <VideoUploadForm onBack={() => setShowUploadForm(false)} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-green-900 to-emerald-900">
      {/* Header */}
      <header className="relative z-10 px-6 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-emerald-500 rounded-lg flex items-center justify-center">
                <Video className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-white">CoachGPT</h1>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="relative z-10 px-6 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-white mb-6 leading-tight">
              AI-Powered Football
              <span className="block text-emerald-400">Video Analysis</span>
            </h2>
            <p className="text-xl text-slate-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              Upload your match footage and get detailed player performance analysis with skill-wise statistics, 
              improvement suggestions, and comprehensive reports tailored for coaches, players, and analysts.
            </p>
            <Button 
              onClick={() => setShowUploadForm(true)}
              size="lg"
              className="bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-6 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              <Upload className="w-5 h-5 mr-2" />
              Start Analysis
            </Button>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {features.map((feature, index) => (
              <FeatureCard key={index} {...feature} />
            ))}
          </div>

          {/* Demo Section */}
          <Card className="bg-white/10 backdrop-blur-lg border-white/20 text-white">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl mb-2">How It Works</CardTitle>
              <CardDescription className="text-slate-300">
                Simple 3-step process to get your player analysis
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Upload className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">1. Upload Video</h3>
                  <p className="text-slate-300">Upload your match footage and specify player details</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Target className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">2. Select Skills</h3>
                  <p className="text-slate-300">Choose which skills to analyze and track</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <BarChart3 className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">3. Get Insights</h3>
                  <p className="text-slate-300">Receive detailed analysis and improvement recommendations</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%2523ffffff%22%20fill-opacity%3D%220.05%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
    </div>
  );
};

export default Index;
