
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Download, Loader2, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import { useAnalysis } from '@/contexts/AnalysisContext';
import LoadingScreen from '@/components/LoadingScreen';
import StatisticsSection from '@/components/StatisticsSection';
import ImprovementSection from '@/components/ImprovementSection';
import VideoSummarySection from '@/components/VideoSummarySection';

const AnalysisReport = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const { analysisData, setAnalysisData } = useAnalysis();
  const [isLoading, setIsLoading] = useState(true);

  // Mock report data for demonstration
  const mockReportData = {
    statistics: {
      skill_breakdown: {
        "Dribbling": { attempts: 14, success_rate: 0.78 },
        "Passing": { attempts: 0, success_rate: 0.0 },
        "Shooting": { attempts: 7, success_rate: 0.65 },
        "Turning": { attempts: 0, success_rate: 0.0 },
        "Positioning": { attempts: 10, success_rate: 0.80 }
      },
      total_events: 31,
      time_played_minutes: 27.5
    },
    improvement_statistic: {
      focus_areas: ["Passing under pressure", "Positioning on counter-attacks"],
      performance_gaps: ["Inconsistent finishing", "Slow defensive recovery"],
      recommendations: [
        "Practice quick one-touch passes under pressure",
        "Improve off-ball awareness and positioning",
        "Work on first-touch control in tight spaces",
        "Develop faster transition from attack to defense"
      ]
    },
    video_summary: {
      strengths: [
        "Excellent ball control and close dribbling",
        "Strong positioning in attacking third",
        "Good decision-making in 1v1 situations"
      ],
      weaknesses: [
        "Slow recovery after losing possession",
        "Limited passing range under pressure",
        "Inconsistent shooting accuracy"
      ],
      suggestions: [
        "Practice defensive transitions and recovery runs",
        "Work on quick passing combinations",
        "Focus on shooting technique and composure"
      ],
      summary: "Promising player with strong technical skills and room for tactical growth."
    }
  };

  useEffect(() => {
    const fetchReport = async () => {
      if (!jobId) {
        navigate('/');
        return;
      }

      try {
        setIsLoading(true);
        
        // Simulate API loading time
        await new Promise(resolve => setTimeout(resolve, 3000));
        
        setAnalysisData({
          jobId,
          status: 'completed',
          reportData: mockReportData
        });
        
        setIsLoading(false);
      } catch (error) {
        console.error('Failed to fetch report:', error);
        toast.error('Failed to load analysis report');
        setIsLoading(false);
      }
    };

    fetchReport();
  }, [jobId, navigate, setAnalysisData]);

  const handleDownload = (format: 'json' | 'pdf') => {
    if (format === 'json') {
      const dataStr = JSON.stringify(analysisData.reportData, null, 2);
      const dataBlob = new Blob([dataStr], { type: 'application/json' });
      const url = URL.createObjectURL(dataBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `analysis-report-${jobId}.json`;
      link.click();
      URL.revokeObjectURL(url);
      toast.success('JSON report downloaded successfully');
    } else {
      toast.info('PDF download functionality would be implemented here');
    }
  };

  if (isLoading || analysisData.status !== 'completed') {
    return <LoadingScreen />;
  }

  const reportData = analysisData.reportData;
  const skillsWithData = Object.entries(reportData.statistics.skill_breakdown)
    .filter(([_, data]: [string, any]) => data.attempts > 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-green-900 to-emerald-900 px-6 py-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div className="flex items-center">
            <Button
              variant="ghost"
              onClick={() => navigate('/')}
              className="text-white hover:bg-white/10 mr-4"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              New Analysis
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-white">Analysis Report</h1>
              <p className="text-slate-300">Job ID: {jobId}</p>
            </div>
          </div>
          
          <div className="flex gap-2">
            <Button
              onClick={() => window.location.reload()}
              variant="outline"
              className="border-white/20 text-white hover:bg-white/10"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh
            </Button>
            <Button
              onClick={() => handleDownload('json')}
              className="bg-blue-500 hover:bg-blue-600 text-white"
            >
              <Download className="w-4 h-4 mr-2" />
              Download JSON
            </Button>
            <Button
              onClick={() => handleDownload('pdf')}
              className="bg-red-500 hover:bg-red-600 text-white"
            >
              <Download className="w-4 h-4 mr-2" />
              Download PDF
            </Button>
          </div>
        </div>

        {/* Report Overview */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-white/10 backdrop-blur-lg border-white/20 text-white">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Total Events</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-emerald-400">
                {reportData.statistics.total_events}
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-white/10 backdrop-blur-lg border-white/20 text-white">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Time Played</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-400">
                {reportData.statistics.time_played_minutes} min
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-white/10 backdrop-blur-lg border-white/20 text-white">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Skills Analyzed</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-purple-400">
                {skillsWithData.length}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <StatisticsSection skillsData={reportData.statistics.skill_breakdown} />
            <ImprovementSection data={reportData.improvement_statistic} />
          </div>
          
          <div className="space-y-6">
            <VideoSummarySection data={reportData.video_summary} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalysisReport;
