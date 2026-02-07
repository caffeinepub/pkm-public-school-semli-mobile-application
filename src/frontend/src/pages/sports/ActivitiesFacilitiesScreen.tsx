import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Trophy, Dumbbell, Users } from 'lucide-react';

export default function ActivitiesFacilitiesScreen() {
    const activities = [
        {
            name: 'Cricket',
            description: 'Full-size cricket ground with practice nets',
            icon: Trophy
        },
        {
            name: 'Football',
            description: 'Professional football field with modern equipment',
            icon: Trophy
        },
        {
            name: 'Basketball',
            description: 'Indoor and outdoor basketball courts',
            icon: Trophy
        },
        {
            name: 'Volleyball',
            description: 'Multiple volleyball courts for practice and matches',
            icon: Trophy
        },
        {
            name: 'Athletics',
            description: '400m track and field facilities',
            icon: Dumbbell
        },
        {
            name: 'Badminton',
            description: 'Indoor badminton courts with quality equipment',
            icon: Trophy
        },
        {
            name: 'Table Tennis',
            description: 'Dedicated table tennis room with multiple tables',
            icon: Trophy
        },
        {
            name: 'Yoga & Fitness',
            description: 'Modern gym and yoga studio for physical wellness',
            icon: Dumbbell
        }
    ];

    return (
        <div className="space-y-4">
            <Card className="bg-gradient-to-br from-chart-3/5 to-chart-3/10 border-chart-3/20">
                <CardHeader>
                    <div className="flex items-center gap-3">
                        <div className="rounded-lg bg-chart-3/20 p-2">
                            <Users className="h-5 w-5 text-chart-3" />
                        </div>
                        <CardTitle>Sports Activities & Facilities</CardTitle>
                    </div>
                </CardHeader>
                <CardContent>
                    <p className="text-sm text-muted-foreground">
                        Our school offers world-class sports facilities to promote physical fitness and teamwork.
                    </p>
                </CardContent>
            </Card>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {activities.map((activity, idx) => {
                    const Icon = activity.icon;
                    return (
                        <Card key={idx}>
                            <CardHeader className="pb-3">
                                <div className="flex items-start gap-3">
                                    <div className="rounded-lg bg-chart-3/10 p-2 mt-0.5">
                                        <Icon className="h-4 w-4 text-chart-3" />
                                    </div>
                                    <div>
                                        <CardTitle className="text-base">{activity.name}</CardTitle>
                                        <p className="text-xs text-muted-foreground mt-1">
                                            {activity.description}
                                        </p>
                                    </div>
                                </div>
                            </CardHeader>
                        </Card>
                    );
                })}
            </div>
        </div>
    );
}
