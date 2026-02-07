import { useState } from 'react';
import { useGetAnnouncements } from '../../hooks/queries/education';
import { LoadingSkeleton, EmptyState, ErrorState } from '../../components/QueryState';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, Megaphone } from 'lucide-react';
import AnnouncementDetail from './AnnouncementDetail';

export default function AnnouncementsList() {
    const { data: announcements, isLoading, error } = useGetAnnouncements();
    const [selectedAnnouncement, setSelectedAnnouncement] = useState<string | null>(null);

    if (isLoading) return <LoadingSkeleton />;
    if (error) return <ErrorState message="Failed to load announcements" />;

    // Sort by date (newest first)
    const sortedAnnouncements = announcements?.sort((a, b) => 
        new Date(b.date).getTime() - new Date(a.date).getTime()
    );

    if (selectedAnnouncement) {
        const announcement = announcements?.find(a => a.id === selectedAnnouncement);
        if (announcement) {
            return <AnnouncementDetail announcement={announcement} onBack={() => setSelectedAnnouncement(null)} />;
        }
    }

    return (
        <div className="space-y-3">
            {!sortedAnnouncements || sortedAnnouncements.length === 0 ? (
                <EmptyState message="No announcements available" />
            ) : (
                sortedAnnouncements.map(announcement => (
                    <Card 
                        key={announcement.id} 
                        className="cursor-pointer hover:shadow-card transition-shadow"
                        onClick={() => setSelectedAnnouncement(announcement.id)}
                    >
                        <CardHeader className="pb-3">
                            <div className="flex items-start gap-3">
                                <div className="rounded-lg bg-chart-4/10 p-2 mt-0.5">
                                    <Megaphone className="h-4 w-4 text-chart-4" />
                                </div>
                                <div>
                                    <CardTitle className="text-base">{announcement.title}</CardTitle>
                                    <span className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                                        <Calendar className="h-3 w-3" />
                                        {new Date(announcement.date).toLocaleDateString()}
                                    </span>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-muted-foreground line-clamp-2">
                                {announcement.content}
                            </p>
                        </CardContent>
                    </Card>
                ))
            )}
        </div>
    );
}
