import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Calendar } from 'lucide-react';

interface EventUpdate {
    id: string;
    title: string;
    date: string;
    description: string;
}

interface EventUpdateDetailProps {
    event: EventUpdate;
    onBack: () => void;
}

export default function EventUpdateDetail({ event, onBack }: EventUpdateDetailProps) {
    return (
        <div className="space-y-4">
            <Button variant="ghost" size="sm" onClick={onBack} className="gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to list
            </Button>

            <Card>
                <CardHeader>
                    <CardTitle className="text-xl">{event.title}</CardTitle>
                    <span className="text-sm text-muted-foreground flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {new Date(event.date).toLocaleDateString()}
                    </span>
                </CardHeader>
                <CardContent>
                    <p className="text-sm text-muted-foreground whitespace-pre-wrap">{event.description}</p>
                </CardContent>
            </Card>
        </div>
    );
}
