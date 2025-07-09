
import { CheckCircle, XCircle, MessageSquare, Star } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface VideoSummaryData {
  strengths: string[];
  weaknesses: string[];
  suggestions: string[];
  summary: string;
}

interface VideoSummarySectionProps {
  data: VideoSummaryData;
}

const VideoSummarySection = ({ data }: VideoSummarySectionProps) => {
  return (
    <div className="space-y-6">
      {/* Overall Summary */}
      <Card className="bg-gradient-to-r from-emerald-500/20 to-blue-500/20 backdrop-blur-lg border-emerald-400/30 text-white">
        <CardHeader>
          <CardTitle className="text-xl flex items-center">
            <Star className="w-5 h-5 mr-2 text-yellow-400" />
            Overall Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-lg font-medium leading-relaxed">
            "{data.summary}"
          </p>
        </CardContent>
      </Card>

      {/* Strengths */}
      <Card className="bg-white/10 backdrop-blur-lg border-white/20 text-white">
        <CardHeader>
          <CardTitle className="text-xl flex items-center">
            <CheckCircle className="w-5 h-5 mr-2 text-emerald-400" />
            Strengths
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3">
            {data.strengths.map((strength, index) => (
              <li key={index} className="flex items-start">
                <CheckCircle className="w-5 h-5 text-emerald-400 mr-3 flex-shrink-0 mt-0.5" />
                <span className="text-slate-300">{strength}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Weaknesses */}
      <Card className="bg-white/10 backdrop-blur-lg border-white/20 text-white">
        <CardHeader>
          <CardTitle className="text-xl flex items-center">
            <XCircle className="w-5 h-5 mr-2 text-red-400" />
            Areas for Improvement
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3">
            {data.weaknesses.map((weakness, index) => (
              <li key={index} className="flex items-start">
                <XCircle className="w-5 h-5 text-red-400 mr-3 flex-shrink-0 mt-0.5" />
                <span className="text-slate-300">{weakness}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Suggestions */}
      <Card className="bg-white/10 backdrop-blur-lg border-white/20 text-white">
        <CardHeader>
          <CardTitle className="text-xl flex items-center">
            <MessageSquare className="w-5 h-5 mr-2 text-blue-400" />
            Training Suggestions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3">
            {data.suggestions.map((suggestion, index) => (
              <li key={index} className="flex items-start">
                <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold mr-3 flex-shrink-0 mt-0.5">
                  {index + 1}
                </div>
                <span className="text-slate-300">{suggestion}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default VideoSummarySection;
