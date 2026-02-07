import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, Sparkles } from 'lucide-react';
import { EmptyState } from '../../components/QueryState';
import EventUpdateDetail from './EventUpdateDetail';

interface EventUpdate {
    id: string;
    title: string;
    date: string;
    description: string;
}

export default function EventUpdatesList() {
    const [selectedEvent, setSelectedEvent] = useState<string | null>(null);

    // Placeholder data
    const events: EventUpdate[] = [
        {
            id: '1',
            title: 'Annual Day Celebration',
            date: '2026-03-25',
            description: 'Join us for our grand Annual Day celebration featuring cultural performances, awards ceremony, and special guest appearances. All parents and students are invited.'
        },
        {
            id: '2',
            title: 'Science Exhibition',
            date: '2026-02-20',
            description: 'Students will showcase their innovative science projects and experiments. The exhibition will be open to parents and visitors from 9 AM to 4 PM.'
        },
        {
            id: '3',
            title: 'Career Guidance Workshop',
            date: '2026-02-18',
            description: 'A special workshop for senior students featuring industry experts discussing various career paths and opportunities in different fields.'
        }
    ];

    if (selectedEvent) {
        const event = events.find(e => e.id === selectedEvent);
        if (event) {
            return <EventUpdateDetail event={event} onBack={() => setSelectedEvent(null)} />;
        }
    }

    return (
        <div className="space-y-3">
            {events.length === 0 ? (
                <EmptyState message="No event updates available" />
            ) : (
                events.map(event => (
                    <Card 
                        key={event.id} 
                        className="cursor-pointer hover:shadow-card transition-shadow"
                        onClick={() => setSelectedEvent(event.id)}
                    >
                        <CardHeader className="pb-3">
                            <div className="flex items-start gap-3">
                                <div className="rounded-lg bg-accent/10 p-2 mt-0.5">
                                    <Sparkles className="h-4 w-4 text-accent" />
                                </div>
                                <div>
                                    <CardTitle className="text-base">{event.title}</CardTitle>
                                    <span className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                                        <Calendar className="h-3 w-3" />
                                        {new Date(event.date).toLocaleDateString()}
                                    </span>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-muted-foreground line-clamp-2">
                                {event.description}
                            </p>
                        </CardContent>
                    </Card>
                ))
            )}
        </div>
    );
}
