
import { Loader2, Video, BarChart3 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const LoadingScreen = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-green-900 to-emerald-900 flex items-center justify-center px-6">
      <Card className="bg-white/10 backdrop-blur-lg border-white/20 text-white max-w-md w-full">
        <CardContent className="p-8 text-center">
          <div className="mb-6">
            <Loader2 className="w-16 h-16 animate-spin text-emerald-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">Analyzing Video</h2>
            <p className="text-slate-300">Processing your football analysis...</p>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
              <div className="flex items-center">
                <Video className="w-5 h-5 text-emerald-400 mr-3" />
                <span>Video Processing</span>
              </div>
              <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
              <div className="flex items-center">
                <BarChart3 className="w-5 h-5 text-blue-400 mr-3" />
                <span>Skill Analysis</span>
              </div>
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
              <div className="flex items-center">
                <Loader2 className="w-5 h-5 text-purple-400 mr-3" />
                <span>Generating Report</span>
              </div>
              <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
            </div>
          </div>
          
          <p className="text-sm text-slate-400 mt-6">
            This usually takes 2-5 minutes depending on video length
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoadingScreen;
