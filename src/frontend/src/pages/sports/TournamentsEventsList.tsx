import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, MapPin, Trophy } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { EmptyState } from '../../components/QueryState';
import TournamentEventDetail from './TournamentEventDetail';

interface TournamentEvent {
    id: string;
    title: string;
    date: string;
    location?: string;
    description: string;
}

export default function TournamentsEventsList() {
    const [selectedEvent, setSelectedEvent] = useState<string | null>(null);

    // Placeholder data
    const events: TournamentEvent[] = [
        {
            id: '1',
            title: 'Inter-School Cricket Championship',
            date: '2026-03-15',
            location: 'PKM Sports Ground',
            description: 'Annual inter-school cricket tournament featuring teams from 12 schools across the district.'
        },
        {
            id: '2',
            title: 'District Football League',
            date: '2026-04-10',
            location: 'District Stadium',
            description: 'Participate in the district-level football league with matches scheduled every weekend.'
        },
        {
            id: '3',
            title: 'Annual Sports Day',
            date: '2026-02-28',
            location: 'School Campus',
            description: 'Celebrate our annual sports day with athletics, races, and various sporting events for all grades.'
        }
    ];

    if (selectedEvent) {
        const event = events.find(e => e.id === selectedEvent);
        if (event) {
            return <TournamentEventDetail event={event} onBack={() => setSelectedEvent(null)} />;
        }
    }

    return (
        <div className="space-y-3">
            {events.length === 0 ? (
                <EmptyState message="No upcoming tournaments or events" />
            ) : (
                events.map(event => (
                    <Card 
                        key={event.id} 
                        className="cursor-pointer hover:shadow-card transition-shadow"
                        onClick={() => setSelectedEvent(event.id)}
                    >
                        <CardHeader className="pb-3">
                            <div className="flex items-start gap-3">
                                <div className="rounded-lg bg-chart-3/10 p-2 mt-0.5">
                                    <Trophy className="h-4 w-4 text-chart-3" />
                                </div>
                                <div className="flex-1">
                                    <CardTitle className="text-base">{event.title}</CardTitle>
                                    <div className="flex flex-wrap items-center gap-2 mt-1">
                                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                                            <Calendar className="h-3 w-3" />
                                            {new Date(event.date).toLocaleDateString()}
                                        </span>
                                        {event.location && (
                                            <span className="text-xs text-muted-foreground flex items-center gap-1">
                                                <MapPin className="h-3 w-3" />
                                                {event.location}
                                            </span>
                                        )}
                                    </div>
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
