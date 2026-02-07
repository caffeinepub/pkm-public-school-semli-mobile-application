import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, BookOpen } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

export default function GuidelinesPoliciesScreen() {
    const policies = [
        {
            title: 'Academic Integrity',
            content: 'Students must maintain honesty in all academic work. Plagiarism, cheating, and unauthorized collaboration are strictly prohibited.'
        },
        {
            title: 'Attendance Policy',
            content: 'Regular attendance is mandatory. Students must maintain at least 75% attendance to be eligible for examinations.'
        },
        {
            title: 'Uniform Policy',
            content: 'Students must wear the prescribed school uniform daily. Proper grooming and hygiene standards must be maintained.'
        },
        {
            title: 'Safety Guidelines',
            content: 'Follow all safety protocols during laboratory work, sports activities, and field trips. Report any safety concerns immediately.'
        },
        {
            title: 'Technology Use',
            content: 'Mobile phones and electronic devices may only be used during designated times. Misuse will result in confiscation.'
        },
        {
            title: 'Anti-Bullying Policy',
            content: 'The school has zero tolerance for bullying, harassment, or discrimination of any kind. All incidents will be investigated thoroughly.'
        }
    ];

    return (
        <div className="space-y-4">
            <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
                <CardHeader>
                    <div className="flex items-center gap-3">
                        <div className="rounded-lg bg-primary/20 p-2">
                            <BookOpen className="h-5 w-5 text-primary" />
                        </div>
                        <CardTitle>School Guidelines & Policies</CardTitle>
                    </div>
                </CardHeader>
                <CardContent>
                    <p className="text-sm text-muted-foreground">
                        Important policies and guidelines that govern our school community.
                    </p>
                </CardContent>
            </Card>

            <div className="space-y-3">
                {policies.map((policy, idx) => (
                    <Card key={idx}>
                        <CardHeader className="pb-3">
                            <div className="flex items-start gap-3">
                                <div className="rounded-lg bg-muted p-2 mt-0.5">
                                    <FileText className="h-4 w-4 text-muted-foreground" />
                                </div>
                                <CardTitle className="text-base">{policy.title}</CardTitle>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-muted-foreground">{policy.content}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
