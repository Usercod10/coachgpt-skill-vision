
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

interface SkillData {
  attempts: number;
  success_rate: number;
}

interface StatisticsSectionProps {
  skillsData: Record<string, SkillData>;
}

const COLORS = ['#10b981', '#3b82f6', '#8b5cf6', '#f59e0b', '#ef4444'];

const StatisticsSection = ({ skillsData }: StatisticsSectionProps) => {
  // Filter skills with attempts > 0
  const activeSkills = Object.entries(skillsData)
    .filter(([_, data]) => data.attempts > 0)
    .map(([skill, data], index) => ({
      skill,
      attempts: data.attempts,
      success_rate: Math.round(data.success_rate * 100),
      color: COLORS[index % COLORS.length]
    }));

  const chartData = activeSkills.map(item => ({
    name: item.skill,
    attempts: item.attempts,
    success_rate: item.success_rate
  }));

  return (
    <Card className="bg-white/10 backdrop-blur-lg border-white/20 text-white">
      <CardHeader>
        <CardTitle className="text-xl">Skill Statistics</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Individual Skill Cards */}
        <div className="grid gap-4">
          {activeSkills.map((skill, index) => (
            <div key={skill.skill} className="bg-white/5 rounded-lg p-4">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-semibold text-lg">{skill.skill}</h3>
                <div className="text-right">
                  <div className="text-2xl font-bold text-emerald-400">
                    {skill.success_rate}%
                  </div>
                  <div className="text-sm text-slate-300">Success Rate</div>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-300">Total Attempts</span>
                <span className="text-xl font-semibold">{skill.attempts}</span>
              </div>
              <div className="w-full bg-white/10 rounded-full h-2 mt-3">
                <div
                  className="bg-emerald-400 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${skill.success_rate}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>

        {/* Bar Chart */}
        {activeSkills.length > 1 && (
          <div className="bg-white/5 rounded-lg p-4">
            <h3 className="font-semibold text-lg mb-4">Performance Comparison</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis 
                    dataKey="name" 
                    stroke="rgba(255,255,255,0.7)"
                    fontSize={12}
                  />
                  <YAxis stroke="rgba(255,255,255,0.7)" fontSize={12} />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'rgba(0,0,0,0.8)',
                      border: '1px solid rgba(255,255,255,0.2)',
                      borderRadius: '8px',
                      color: 'white'
                    }}
                  />
                  <Bar dataKey="attempts" fill="#10b981" name="Attempts" />
                  <Bar dataKey="success_rate" fill="#3b82f6" name="Success Rate %" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {/* Pie Chart for single skill focus */}
        {activeSkills.length === 1 && (
          <div className="bg-white/5 rounded-lg p-4">
            <h3 className="font-semibold text-lg mb-4">Success Distribution</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={[
                      { name: 'Successful', value: Math.round(activeSkills[0].attempts * activeSkills[0].success_rate / 100) },
                      { name: 'Unsuccessful', value: activeSkills[0].attempts - Math.round(activeSkills[0].attempts * activeSkills[0].success_rate / 100) }
                    ]}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value }) => `${name}: ${value}`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    <Cell fill="#10b981" />
                    <Cell fill="#ef4444" />
                  </Pie>
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'rgba(0,0,0,0.8)',
                      border: '1px solid rgba(255,255,255,0.2)',
                      borderRadius: '8px',
                      color: 'white'
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default StatisticsSection;
