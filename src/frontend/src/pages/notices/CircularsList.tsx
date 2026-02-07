import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, FileText } from 'lucide-react';
import { EmptyState } from '../../components/QueryState';
import CircularDetail from './CircularDetail';

interface Circular {
    id: string;
    title: string;
    date: string;
    message: string;
}

export default function CircularsList() {
    const [selectedCircular, setSelectedCircular] = useState<string | null>(null);

    // Placeholder data
    const circulars: Circular[] = [
        {
            id: '1',
            title: 'Parent-Teacher Meeting Notice',
            date: '2026-02-15',
            message: 'Dear Parents, We are pleased to invite you to our upcoming Parent-Teacher Meeting scheduled for February 20, 2026. This is an excellent opportunity to discuss your child\'s academic progress and overall development.'
        },
        {
            id: '2',
            title: 'Exam Schedule Announcement',
            date: '2026-02-10',
            message: 'The final examination schedule for the current academic year has been finalized. Exams will commence from March 1, 2026. Detailed timetables will be distributed to all students.'
        },
        {
            id: '3',
            title: 'School Reopening After Winter Break',
            date: '2026-01-05',
            message: 'School will reopen on January 10, 2026 after the winter break. All students are expected to attend classes regularly. Please ensure students are in proper uniform.'
        }
    ];

    if (selectedCircular) {
        const circular = circulars.find(c => c.id === selectedCircular);
        if (circular) {
            return <CircularDetail circular={circular} onBack={() => setSelectedCircular(null)} />;
        }
    }

    return (
        <div className="space-y-3">
            {circulars.length === 0 ? (
                <EmptyState message="No circulars available" />
            ) : (
                circulars.map(circular => (
                    <Card 
                        key={circular.id} 
                        className="cursor-pointer hover:shadow-card transition-shadow"
                        onClick={() => setSelectedCircular(circular.id)}
                    >
                        <CardHeader className="pb-3">
                            <div className="flex items-start gap-3">
                                <div className="rounded-lg bg-chart-4/10 p-2 mt-0.5">
                                    <FileText className="h-4 w-4 text-chart-4" />
                                </div>
                                <div>
                                    <CardTitle className="text-base">{circular.title}</CardTitle>
                                    <span className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                                        <Calendar className="h-3 w-3" />
                                        {new Date(circular.date).toLocaleDateString()}
                                    </span>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-muted-foreground line-clamp-2">
                                {circular.message}
                            </p>
                        </CardContent>
                    </Card>
                ))
            )}
        </div>
    );
}
