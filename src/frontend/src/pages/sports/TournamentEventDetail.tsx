import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Calendar, MapPin } from 'lucide-react';

interface TournamentEvent {
    id: string;
    title: string;
    date: string;
    location?: string;
    description: string;
}

interface TournamentEventDetailProps {
    event: TournamentEvent;
    onBack: () => void;
}

export default function TournamentEventDetail({ event, onBack }: TournamentEventDetailProps) {
    return (
        <div className="space-y-4">
            <Button variant="ghost" size="sm" onClick={onBack} className="gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to list
            </Button>

            <Card>
                <CardHeader>
                    <CardTitle className="text-xl">{event.title}</CardTitle>
                    <div className="flex flex-wrap items-center gap-3 mt-2">
                        <span className="text-sm text-muted-foreground flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            {new Date(event.date).toLocaleDateString()}
                        </span>
                        {event.location && (
                            <span className="text-sm text-muted-foreground flex items-center gap-1">
                                <MapPin className="h-4 w-4" />
                                {event.location}
                            </span>
                        )}
                    </div>
                </CardHeader>
                <CardContent>
                    <p className="text-sm text-muted-foreground whitespace-pre-wrap">{event.description}</p>
                </CardContent>
            </Card>
        </div>
    );
}
