import { useState } from 'react';
import { useGetExams, useGetExamResults } from '../../hooks/queries/education';
import { useGetCallerUserProfile } from '../../hooks/queries/auth';
import { LoadingSkeleton, EmptyState, ErrorState } from '../../components/QueryState';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar, FileText, Award } from 'lucide-react';
import ExamDetail from './ExamDetail';

export default function ExamsList() {
    const { data: exams, isLoading: examsLoading, error: examsError } = useGetExams();
    const { data: userProfile } = useGetCallerUserProfile();
    const studentId = userProfile?.associatedStudentId;
    const { data: results, isLoading: resultsLoading } = useGetExamResults(studentId || '');
    
    const [selectedClass, setSelectedClass] = useState<string>('all');
    const [selectedExam, setSelectedExam] = useState<string | null>(null);

    if (examsLoading) return <LoadingSkeleton />;
    if (examsError) return <ErrorState message="Failed to load exams" />;

    const classes = ['all', ...Array.from(new Set(exams?.map(e => e.className) || []))];
    const filteredExams = selectedClass === 'all' 
        ? exams 
        : exams?.filter(e => e.className === selectedClass);

    if (selectedExam) {
        const exam = exams?.find(e => e.id === selectedExam);
        if (exam) {
            return <ExamDetail exam={exam} onBack={() => setSelectedExam(null)} />;
        }
    }

    return (
        <Tabs defaultValue="schedules" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="schedules">Schedules</TabsTrigger>
                <TabsTrigger value="results">Results</TabsTrigger>
            </TabsList>
            
            <TabsContent value="schedules" className="mt-4 space-y-4">
                <div className="flex items-center gap-2">
                    <Select value={selectedClass} onValueChange={setSelectedClass}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Select class" />
                        </SelectTrigger>
                        <SelectContent>
                            {classes.map(cls => (
                                <SelectItem key={cls} value={cls}>
                                    {cls === 'all' ? 'All Classes' : cls}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                {!filteredExams || filteredExams.length === 0 ? (
                    <EmptyState message="No exams scheduled" />
                ) : (
                    <div className="space-y-3">
                        {filteredExams.map(exam => (
                            <Card 
                                key={exam.id} 
                                className="cursor-pointer hover:shadow-card transition-shadow"
                                onClick={() => setSelectedExam(exam.id)}
                            >
                                <CardHeader className="pb-3">
                                    <div className="flex items-start gap-3">
                                        <div className="rounded-lg bg-chart-3/10 p-2 mt-0.5">
                                            <FileText className="h-4 w-4 text-chart-3" />
                                        </div>
                                        <div>
                                            <CardTitle className="text-base">{exam.subject}</CardTitle>
                                            <div className="flex items-center gap-2 mt-1">
                                                <Badge variant="secondary" className="text-xs">
                                                    {exam.className}
                                                </Badge>
                                                <span className="text-xs text-muted-foreground flex items-center gap-1">
                                                    <Calendar className="h-3 w-3" />
                                                    {new Date(exam.date).toLocaleDateString()}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-sm text-muted-foreground line-clamp-2">
                                        {exam.description}
                                    </p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )}
            </TabsContent>

            <TabsContent value="results" className="mt-4">
                {!studentId ? (
                    <EmptyState message="Login to view your exam results" />
                ) : resultsLoading ? (
                    <LoadingSkeleton />
                ) : !results || results.length === 0 ? (
                    <EmptyState message="No exam results available" />
                ) : (
                    <div className="space-y-3">
                        {results.map((result, idx) => (
                            <Card key={idx}>
                                <CardHeader className="pb-3">
                                    <div className="flex items-start gap-3">
                                        <div className="rounded-lg bg-accent/10 p-2 mt-0.5">
                                            <Award className="h-4 w-4 text-accent" />
                                        </div>
                                        <div className="flex-1">
                                            <CardTitle className="text-base">{result.subject}</CardTitle>
                                            <span className="text-xs text-muted-foreground">
                                                {new Date(result.date).toLocaleDateString()}
                                            </span>
                                        </div>
                                        <div className="text-right">
                                            <div className="text-2xl font-bold text-primary">
                                                {Number(result.score)}
                                            </div>
                                            <div className="text-xs text-muted-foreground">
                                                out of {Number(result.total)}
                                            </div>
                                        </div>
                                    </div>
                                </CardHeader>
                            </Card>
                        ))}
                    </div>
                )}
            </TabsContent>
        </Tabs>
    );
}
