import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Calendar } from 'lucide-react';

interface Circular {
    id: string;
    title: string;
    date: string;
    message: string;
}

interface CircularDetailProps {
    circular: Circular;
    onBack: () => void;
}

export default function CircularDetail({ circular, onBack }: CircularDetailProps) {
    return (
        <div className="space-y-4">
            <Button variant="ghost" size="sm" onClick={onBack} className="gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to list
            </Button>

            <Card>
                <CardHeader>
                    <CardTitle className="text-xl">{circular.title}</CardTitle>
                    <span className="text-sm text-muted-foreground flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {new Date(circular.date).toLocaleDateString()}
                    </span>
                </CardHeader>
                <CardContent>
                    <p className="text-sm text-muted-foreground whitespace-pre-wrap">{circular.message}</p>
                </CardContent>
            </Card>
        </div>
    );
}
