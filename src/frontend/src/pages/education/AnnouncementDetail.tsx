import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Calendar } from 'lucide-react';
import type { TeacherAnnouncement } from '../../backend';

interface AnnouncementDetailProps {
    announcement: TeacherAnnouncement;
    onBack: () => void;
}

export default function AnnouncementDetail({ announcement, onBack }: AnnouncementDetailProps) {
    return (
        <div className="space-y-4">
            <Button variant="ghost" size="sm" onClick={onBack} className="gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to list
            </Button>

            <Card>
                <CardHeader>
                    <CardTitle className="text-xl">{announcement.title}</CardTitle>
                    <span className="text-sm text-muted-foreground flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {new Date(announcement.date).toLocaleDateString()}
                    </span>
                </CardHeader>
                <CardContent>
                    <p className="text-sm text-muted-foreground whitespace-pre-wrap">{announcement.content}</p>
                </CardContent>
            </Card>
        </div>
    );
}
