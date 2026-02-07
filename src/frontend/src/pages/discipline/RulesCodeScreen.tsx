import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, CheckCircle } from 'lucide-react';

export default function RulesCodeScreen() {
    const rules = [
        'Respect teachers, staff, and fellow students at all times',
        'Arrive on time and attend all classes regularly',
        'Wear proper school uniform with pride',
        'Complete homework and assignments on time',
        'Maintain cleanliness in classrooms and school premises',
        'Use respectful language and behavior',
        'No bullying, harassment, or discrimination',
        'Follow safety guidelines during sports and activities',
        'Use mobile phones only during designated times',
        'Respect school property and resources'
    ];

    return (
        <div className="space-y-4">
            <Card className="bg-gradient-to-br from-chart-2/5 to-chart-2/10 border-chart-2/20">
                <CardHeader>
                    <div className="flex items-center gap-3">
                        <div className="rounded-lg bg-chart-2/20 p-2">
                            <Shield className="h-5 w-5 text-chart-2" />
                        </div>
                        <CardTitle>School Code of Conduct</CardTitle>
                    </div>
                </CardHeader>
                <CardContent>
                    <p className="text-sm text-muted-foreground">
                        Our code of conduct ensures a safe, respectful, and productive learning environment for all students.
                    </p>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle className="text-base">School Rules</CardTitle>
                </CardHeader>
                <CardContent>
                    <ul className="space-y-3">
                        {rules.map((rule, idx) => (
                            <li key={idx} className="flex items-start gap-3">
                                <CheckCircle className="h-5 w-5 text-chart-2 flex-shrink-0 mt-0.5" />
                                <span className="text-sm">{rule}</span>
                            </li>
                        ))}
                    </ul>
                </CardContent>
            </Card>
        </div>
    );
}
