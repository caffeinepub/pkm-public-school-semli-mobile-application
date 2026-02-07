import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { EmptyState } from '../../components/QueryState';

interface Holiday {
    id: string;
    name: string;
    date: string;
}

export default function HolidayList() {
    // Placeholder data
    const holidays: Holiday[] = [
        { id: '1', name: 'Republic Day', date: '2026-01-26' },
        { id: '2', name: 'Holi', date: '2026-03-14' },
        { id: '3', name: 'Good Friday', date: '2026-04-03' },
        { id: '4', name: 'Independence Day', date: '2026-08-15' },
        { id: '5', name: 'Gandhi Jayanti', date: '2026-10-02' },
        { id: '6', name: 'Diwali', date: '2026-11-01' },
        { id: '7', name: 'Christmas', date: '2026-12-25' }
    ];

    // Sort by date
    const sortedHolidays = holidays.sort((a, b) => 
        new Date(a.date).getTime() - new Date(b.date).getTime()
    );

    return (
        <div className="space-y-3">
            {sortedHolidays.length === 0 ? (
                <EmptyState message="No holidays listed" />
            ) : (
                sortedHolidays.map(holiday => (
                    <Card key={holiday.id}>
                        <CardContent className="flex items-center justify-between py-4">
                            <div className="flex items-center gap-3">
                                <div className="rounded-lg bg-accent/10 p-2">
                                    <Calendar className="h-5 w-5 text-accent" />
                                </div>
                                <div>
                                    <h3 className="font-medium text-sm">{holiday.name}</h3>
                                    <p className="text-xs text-muted-foreground">
                                        {new Date(holiday.date).toLocaleDateString('en-US', { 
                                            weekday: 'long', 
                                            year: 'numeric', 
                                            month: 'long', 
                                            day: 'numeric' 
                                        })}
                                    </p>
                                </div>
                            </div>
                            <Badge variant="outline">Holiday</Badge>
                        </CardContent>
                    </Card>
                ))
            )}
        </div>
    );
}
