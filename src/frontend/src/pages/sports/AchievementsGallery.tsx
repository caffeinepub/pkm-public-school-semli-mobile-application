import { Card, CardContent } from '@/components/ui/card';
import { Award } from 'lucide-react';

export default function AchievementsGallery() {
    const achievements = [
        {
            title: 'District Cricket Champions 2025',
            image: '/assets/generated/pkm-achievements-placeholders.dim_800x600.png'
        },
        {
            title: 'State Football Tournament - Runners Up',
            image: '/assets/generated/pkm-achievements-placeholders.dim_800x600.png'
        },
        {
            title: 'Inter-School Athletics Meet - Gold Medal',
            image: '/assets/generated/pkm-achievements-placeholders.dim_800x600.png'
        },
        {
            title: 'Basketball Championship Winners',
            image: '/assets/generated/pkm-achievements-placeholders.dim_800x600.png'
        }
    ];

    return (
        <div className="space-y-4">
            <Card className="bg-gradient-to-br from-accent/5 to-accent/10 border-accent/20">
                <CardContent className="flex items-center gap-3 py-4">
                    <div className="rounded-lg bg-accent/20 p-2">
                        <Award className="h-5 w-5 text-accent" />
                    </div>
                    <div>
                        <h3 className="font-semibold">Achievements & Awards</h3>
                        <p className="text-xs text-muted-foreground">Celebrating our sporting excellence</p>
                    </div>
                </CardContent>
            </Card>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {achievements.map((achievement, idx) => (
                    <Card key={idx} className="overflow-hidden">
                        <div className="aspect-video bg-muted relative">
                            <img 
                                src={achievement.image} 
                                alt={achievement.title}
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <CardContent className="p-4">
                            <h3 className="font-medium text-sm">{achievement.title}</h3>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
