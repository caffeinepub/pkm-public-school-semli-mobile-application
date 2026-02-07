import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Calendar } from 'lucide-react';
import type { Exam } from '../../backend';

interface ExamDetailProps {
    exam: Exam;
    onBack: () => void;
}

export default function ExamDetail({ exam, onBack }: ExamDetailProps) {
    return (
        <div className="space-y-4">
            <Button variant="ghost" size="sm" onClick={onBack} className="gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to list
            </Button>

            <Card>
                <CardHeader>
                    <div className="flex items-start justify-between gap-2">
                        <div>
                            <CardTitle className="text-xl">{exam.subject}</CardTitle>
                            <div className="flex items-center gap-2 mt-2">
                                <Badge variant="secondary">{exam.className}</Badge>
                                <span className="text-sm text-muted-foreground flex items-center gap-1">
                                    <Calendar className="h-4 w-4" />
                                    {new Date(exam.date).toLocaleDateString()}
                                </span>
                            </div>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div>
                        <h3 className="font-medium text-sm mb-2">Description</h3>
                        <p className="text-sm text-muted-foreground whitespace-pre-wrap">{exam.description}</p>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
