
import { Target, TrendingUp, Lightbulb } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface ImprovementData {
  focus_areas: string[];
  performance_gaps: string[];
  recommendations: string[];
}

interface ImprovementSectionProps {
  data: ImprovementData;
}

const ImprovementSection = ({ data }: ImprovementSectionProps) => {
  return (
    <Card className="bg-white/10 backdrop-blur-lg border-white/20 text-white">
      <CardHeader>
        <CardTitle className="text-xl flex items-center">
          <TrendingUp className="w-5 h-5 mr-2 text-emerald-400" />
          Improvement Insights
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Focus Areas */}
        <div className="bg-white/5 rounded-lg p-4">
          <div className="flex items-center mb-3">
            <Target className="w-5 h-5 mr-2 text-red-400" />
            <h3 className="font-semibold">Focus Areas</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {data.focus_areas.map((area, index) => (
              <Badge 
                key={index} 
                variant="secondary" 
                className="bg-red-500/20 text-red-300 border-red-400/30"
              >
                {area}
              </Badge>
            ))}
          </div>
        </div>

        {/* Performance Gaps */}
        <div className="bg-white/5 rounded-lg p-4">
          <div className="flex items-center mb-3">
            <TrendingUp className="w-5 h-5 mr-2 text-yellow-400" />
            <h3 className="font-semibold">Performance Gaps</h3>
          </div>
          <ul className="space-y-2">
            {data.performance_gaps.map((gap, index) => (
              <li key={index} className="flex items-start">
                <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                <span className="text-slate-300">{gap}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Recommendations */}
        <div className="bg-white/5 rounded-lg p-4">
          <div className="flex items-center mb-3">
            <Lightbulb className="w-5 h-5 mr-2 text-emerald-400" />
            <h3 className="font-semibold">Recommendations</h3>
          </div>
          <ul className="space-y-3">
            {data.recommendations.map((rec, index) => (
              <li key={index} className="flex items-start">
                <div className="w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center text-white text-sm font-bold mr-3 flex-shrink-0 mt-0.5">
                  {index + 1}
                </div>
                <span className="text-slate-300">{rec}</span>
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default ImprovementSection;
