import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dumbbell, Clock } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export default function FitnessTrainingScreen() {
    const schedules = [
        {
            day: 'Monday',
            activities: [
                { time: '6:00 AM - 7:00 AM', activity: 'Morning Yoga', level: 'All Levels' },
                { time: '4:00 PM - 5:00 PM', activity: 'Strength Training', level: 'Intermediate' }
            ]
        },
        {
            day: 'Tuesday',
            activities: [
                { time: '6:00 AM - 7:00 AM', activity: 'Cardio & Running', level: 'All Levels' },
                { time: '4:00 PM - 5:00 PM', activity: 'Sports Practice', level: 'All Levels' }
            ]
        },
        {
            day: 'Wednesday',
            activities: [
                { time: '6:00 AM - 7:00 AM', activity: 'Flexibility Training', level: 'All Levels' },
                { time: '4:00 PM - 5:00 PM', activity: 'Team Sports', level: 'All Levels' }
            ]
        },
        {
            day: 'Thursday',
            activities: [
                { time: '6:00 AM - 7:00 AM', activity: 'Core Workout', level: 'Intermediate' },
                { time: '4:00 PM - 5:00 PM', activity: 'Skills Training', level: 'Advanced' }
            ]
        },
        {
            day: 'Friday',
            activities: [
                { time: '6:00 AM - 7:00 AM', activity: 'Full Body Workout', level: 'All Levels' },
                { time: '4:00 PM - 5:00 PM', activity: 'Sports Tournament Prep', level: 'All Levels' }
            ]
        }
    ];

    return (
        <div className="space-y-4">
            <Card className="bg-gradient-to-br from-chart-3/5 to-chart-3/10 border-chart-3/20">
                <CardHeader>
                    <div className="flex items-center gap-3">
                        <div className="rounded-lg bg-chart-3/20 p-2">
                            <Dumbbell className="h-5 w-5 text-chart-3" />
                        </div>
                        <CardTitle>Fitness & Training Schedule</CardTitle>
                    </div>
                </CardHeader>
                <CardContent>
                    <p className="text-sm text-muted-foreground">
                        Regular fitness training sessions to build strength, endurance, and overall wellness.
                    </p>
                </CardContent>
            </Card>

            <div className="space-y-3">
                {schedules.map((schedule, idx) => (
                    <Card key={idx}>
                        <CardHeader className="pb-3">
                            <CardTitle className="text-base">{schedule.day}</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            {schedule.activities.map((activity, actIdx) => (
                                <div key={actIdx} className="flex items-start justify-between gap-2">
                                    <div className="flex-1">
                                        <div className="font-medium text-sm">{activity.activity}</div>
                                        <div className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                                            <Clock className="h-3 w-3" />
                                            {activity.time}
                                        </div>
                                    </div>
                                    <Badge variant="outline" className="text-xs">
                                        {activity.level}
                                    </Badge>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
