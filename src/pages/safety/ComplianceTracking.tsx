import { useState } from 'react';
import { Shield, TrendingUp, TrendingDown, AlertCircle, Award, User } from 'lucide-react';
import type { MentorScore, DAScorecard, FleetSafetyScore } from '../../types/safety';

export default function ComplianceTracking() {
  const [selectedTab, setSelectedTab] = useState<'mentor' | 'da-scorecard' | 'fleet-safety'>('mentor');

  const mentorScores: MentorScore[] = [
    {
      driverId: 'D042',
      driverName: 'Tom Jackson',
      date: '2025-12-10',
      score: 782,
      hardBraking: 12,
      hardAcceleration: 8,
      hardCornering: 5,
      speeding: 15,
      seatbeltOff: 2,
      phoneUse: 1,
      reverseSpeed: 3,
      followingDistance: 10,
      trend: 'declining',
    },
    {
      driverId: 'D023',
      driverName: 'Sarah Williams',
      date: '2025-12-10',
      score: 845,
      hardBraking: 5,
      hardAcceleration: 4,
      hardCornering: 2,
      speeding: 8,
      seatbeltOff: 0,
      phoneUse: 0,
      reverseSpeed: 1,
      followingDistance: 4,
      trend: 'improving',
    },
    {
      driverId: 'D015',
      driverName: 'Mike Thompson',
      date: '2025-12-10',
      score: 910,
      hardBraking: 2,
      hardAcceleration: 1,
      hardCornering: 1,
      speeding: 3,
      seatbeltOff: 0,
      phoneUse: 0,
      reverseSpeed: 0,
      followingDistance: 2,
      trend: 'stable',
    },
  ];

  const daScorecards: DAScorecard[] = [
    {
      driverId: 'D042',
      driverName: 'Tom Jackson',
      week: 'Week 49 (Dec 3-9)',
      deliveryCompletion: 98.5,
      onTimeDelivery: 96.2,
      customerFeedback: 4.8,
      photoOnDelivery: 99.1,
      dnr: 1.5,
      concessionRate: 0.8,
      seatbeltOffRate: 0.2,
      speedingEvents: 12,
      distractedDriving: 1,
      overallScore: 825,
      tier: 'Great',
    },
    {
      driverId: 'D023',
      driverName: 'Sarah Williams',
      week: 'Week 49 (Dec 3-9)',
      deliveryCompletion: 99.2,
      onTimeDelivery: 98.1,
      customerFeedback: 4.9,
      photoOnDelivery: 99.8,
      dnr: 0.8,
      concessionRate: 0.4,
      seatbeltOffRate: 0.0,
      speedingEvents: 5,
      distractedDriving: 0,
      overallScore: 890,
      tier: 'Fantastic',
    },
    {
      driverId: 'D015',
      driverName: 'Mike Thompson',
      week: 'Week 49 (Dec 3-9)',
      deliveryCompletion: 99.8,
      onTimeDelivery: 99.2,
      customerFeedback: 5.0,
      photoOnDelivery: 100,
      dnr: 0.2,
      concessionRate: 0.1,
      seatbeltOffRate: 0.0,
      speedingEvents: 2,
      distractedDriving: 0,
      overallScore: 950,
      tier: 'Fantastic',
    },
  ];

  const fleetSafetyScores: FleetSafetyScore[] = [
    {
      week: 'Week 49',
      overallScore: 850,
      mentorScore: 845,
      accidentRate: 0.5,
      complaintRate: 1.2,
      violationCount: 3,
      tier: 'Great',
      trend: 'stable',
    },
    {
      week: 'Week 48',
      overallScore: 865,
      mentorScore: 855,
      accidentRate: 0.3,
      complaintRate: 0.9,
      violationCount: 2,
      tier: 'Great',
      trend: 'improving',
    },
    {
      week: 'Week 47',
      overallScore: 832,
      mentorScore: 828,
      accidentRate: 0.7,
      complaintRate: 1.5,
      violationCount: 5,
      tier: 'Great',
      trend: 'declining',
    },
  ];

  const getMentorScoreColor = (score: number) => {
    if (score >= 850) return 'text-green-700';
    if (score >= 750) return 'text-blue-700';
    if (score >= 650) return 'text-yellow-700';
    return 'text-red-700';
  };

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'Fantastic': return 'bg-green-100 text-green-700 border-green-200';
      case 'Great': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'Fair': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'At Risk': return 'bg-red-100 text-red-700 border-red-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getTrendIcon = (trend: string) => {
    if (trend === 'improving') return <TrendingUp className="w-4 h-4 text-green-600" />;
    if (trend === 'declining') return <TrendingDown className="w-4 h-4 text-red-600" />;
    return <span className="w-4 h-4 text-gray-400">—</span>;
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Compliance Tracking</h1>
        <p className="text-sm text-gray-600 mt-1">Monitor Mentor scores, DA scorecards, and fleet safety</p>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="border-b border-gray-200">
          <nav className="flex -mb-px">
            <button
              onClick={() => setSelectedTab('mentor')}
              className={`px-6 py-3 text-sm font-medium border-b-2 ${
                selectedTab === 'mentor'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300'
              }`}
            >
              Mentor Scores
            </button>
            <button
              onClick={() => setSelectedTab('da-scorecard')}
              className={`px-6 py-3 text-sm font-medium border-b-2 ${
                selectedTab === 'da-scorecard'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300'
              }`}
            >
              DA Scorecards
            </button>
            <button
              onClick={() => setSelectedTab('fleet-safety')}
              className={`px-6 py-3 text-sm font-medium border-b-2 ${
                selectedTab === 'fleet-safety'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300'
              }`}
            >
              Fleet Safety Score
            </button>
          </nav>
        </div>

        {/* Mentor Scores Tab */}
        {selectedTab === 'mentor' && (
          <div className="p-6">
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Driver Mentor Scores</h3>
              <div className="grid grid-cols-1 gap-4">
                {mentorScores.map((driver) => (
                  <div key={driver.driverId} className="bg-gray-50 rounded-lg border border-gray-200 p-4">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <User className="w-5 h-5 text-gray-400" />
                        <div>
                          <h4 className="font-semibold text-gray-900">{driver.driverName}</h4>
                          <p className="text-sm text-gray-500">{driver.driverId}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        {getTrendIcon(driver.trend)}
                        <div className="text-right">
                          <div className={`text-2xl font-bold ${getMentorScoreColor(driver.score)}`}>
                            {driver.score}
                          </div>
                          <div className="text-xs text-gray-500">Mentor Score</div>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-4 md:grid-cols-8 gap-3">
                      <div className="text-center">
                        <div className="text-sm font-semibold text-gray-900">{driver.hardBraking}</div>
                        <div className="text-xs text-gray-500">Hard Brake</div>
                      </div>
                      <div className="text-center">
                        <div className="text-sm font-semibold text-gray-900">{driver.hardAcceleration}</div>
                        <div className="text-xs text-gray-500">Hard Accel</div>
                      </div>
                      <div className="text-center">
                        <div className="text-sm font-semibold text-gray-900">{driver.hardCornering}</div>
                        <div className="text-xs text-gray-500">Cornering</div>
                      </div>
                      <div className="text-center">
                        <div className="text-sm font-semibold text-gray-900">{driver.speeding}</div>
                        <div className="text-xs text-gray-500">Speeding</div>
                      </div>
                      <div className="text-center">
                        <div className="text-sm font-semibold text-gray-900">{driver.seatbeltOff}</div>
                        <div className="text-xs text-gray-500">Seatbelt</div>
                      </div>
                      <div className="text-center">
                        <div className="text-sm font-semibold text-gray-900">{driver.phoneUse}</div>
                        <div className="text-xs text-gray-500">Phone Use</div>
                      </div>
                      <div className="text-center">
                        <div className="text-sm font-semibold text-gray-900">{driver.reverseSpeed}</div>
                        <div className="text-xs text-gray-500">Reverse</div>
                      </div>
                      <div className="text-center">
                        <div className="text-sm font-semibold text-gray-900">{driver.followingDistance}</div>
                        <div className="text-xs text-gray-500">Following</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* DA Scorecard Tab */}
        {selectedTab === 'da-scorecard' && (
          <div className="p-6">
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Delivery Associate Scorecards</h3>
              <div className="grid grid-cols-1 gap-4">
                {daScorecards.map((scorecard) => (
                  <div key={scorecard.driverId} className="bg-gray-50 rounded-lg border border-gray-200 p-4">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <User className="w-5 h-5 text-gray-400" />
                        <div>
                          <h4 className="font-semibold text-gray-900">{scorecard.driverName}</h4>
                          <p className="text-sm text-gray-500">{scorecard.week}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getTierColor(scorecard.tier)}`}>
                          <Award className="w-4 h-4 inline mr-1" />
                          {scorecard.tier}
                        </span>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-gray-900">{scorecard.overallScore}</div>
                          <div className="text-xs text-gray-500">Overall Score</div>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                      <div>
                        <div className="text-xs text-gray-500 mb-1">Delivery Completion</div>
                        <div className="text-sm font-semibold text-gray-900">{scorecard.deliveryCompletion}%</div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-500 mb-1">On-Time Delivery</div>
                        <div className="text-sm font-semibold text-gray-900">{scorecard.onTimeDelivery}%</div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-500 mb-1">Customer Feedback</div>
                        <div className="text-sm font-semibold text-gray-900">{scorecard.customerFeedback}/5.0</div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-500 mb-1">Photo On Delivery</div>
                        <div className="text-sm font-semibold text-gray-900">{scorecard.photoOnDelivery}%</div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-500 mb-1">DNR Rate</div>
                        <div className="text-sm font-semibold text-gray-900">{scorecard.dnr}%</div>
                      </div>
                    </div>

                    <div className="mt-3 pt-3 border-t border-gray-200 grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div>
                        <div className="text-xs text-gray-500 mb-1">Concession Rate</div>
                        <div className="text-sm font-semibold text-gray-900">{scorecard.concessionRate}%</div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-500 mb-1">Seatbelt Off</div>
                        <div className="text-sm font-semibold text-gray-900">{scorecard.seatbeltOffRate}%</div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-500 mb-1">Speeding Events</div>
                        <div className="text-sm font-semibold text-gray-900">{scorecard.speedingEvents}</div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-500 mb-1">Distracted Driving</div>
                        <div className="text-sm font-semibold text-gray-900">{scorecard.distractedDriving}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Fleet Safety Score Tab */}
        {selectedTab === 'fleet-safety' && (
          <div className="p-6">
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Fleet Safety Score Trend</h3>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Shield className="w-8 h-8 text-blue-600" />
                    <div>
                      <div className="text-sm text-blue-600 font-medium">Current Fleet Safety Score</div>
                      <div className="text-3xl font-bold text-blue-700">{fleetSafetyScores[0].overallScore}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className={`px-4 py-2 rounded-full text-sm font-medium border-2 ${getTierColor(fleetSafetyScores[0].tier)}`}>
                      <Award className="w-4 h-4 inline mr-1" />
                      {fleetSafetyScores[0].tier}
                    </span>
                    <div className="flex items-center justify-end gap-2 mt-2">
                      {getTrendIcon(fleetSafetyScores[0].trend)}
                      <span className="text-sm text-gray-600">{fleetSafetyScores[0].trend}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                {fleetSafetyScores.map((week, index) => (
                  <div key={week.week} className={`rounded-lg border p-4 ${index === 0 ? 'bg-white border-blue-300' : 'bg-gray-50 border-gray-200'}`}>
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h4 className="font-semibold text-gray-900">{week.week}</h4>
                        {index === 0 && <span className="text-xs text-blue-600 font-medium">Current Week</span>}
                      </div>
                      <div className="flex items-center gap-3">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getTierColor(week.tier)}`}>
                          {week.tier}
                        </span>
                        <div className="text-right">
                          <div className="text-xl font-bold text-gray-900">{week.overallScore}</div>
                          {getTrendIcon(week.trend)}
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                      <div>
                        <div className="text-xs text-gray-500 mb-1">Mentor Score</div>
                        <div className="text-sm font-semibold text-gray-900">{week.mentorScore}</div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-500 mb-1">Accident Rate</div>
                        <div className="text-sm font-semibold text-gray-900">{week.accidentRate}%</div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-500 mb-1">Complaint Rate</div>
                        <div className="text-sm font-semibold text-gray-900">{week.complaintRate}%</div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-500 mb-1">Violations</div>
                        <div className="text-sm font-semibold text-gray-900">{week.violationCount}</div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-500 mb-1">Tier</div>
                        <div className="text-sm font-semibold text-gray-900">{week.tier}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <div className="flex items-start gap-2">
                  <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
                  <div>
                    <div className="text-sm font-semibold text-yellow-800">Amazon Compliance Requirements</div>
                    <ul className="text-sm text-yellow-700 mt-2 space-y-1">
                      <li>• Fleet Safety Score must remain above 800 to maintain "Great" tier status</li>
                      <li>• Mentor Score average should be above 825 for all active drivers</li>
                      <li>• Accident rate should stay below 1.0% per week</li>
                      <li>• Individual DA scorecards should maintain "Great" or "Fantastic" tier</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
