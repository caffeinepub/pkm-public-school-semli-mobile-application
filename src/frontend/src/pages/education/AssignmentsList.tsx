import { useState } from 'react';
import { useGetAssignments } from '../../hooks/queries/education';
import { LoadingSkeleton, EmptyState, ErrorState } from '../../components/QueryState';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Calendar, FileText } from 'lucide-react';
import AssignmentDetail from './AssignmentDetail';

export default function AssignmentsList() {
    const { data: assignments, isLoading, error } = useGetAssignments();
    const [selectedClass, setSelectedClass] = useState<string>('all');
    const [selectedAssignment, setSelectedAssignment] = useState<string | null>(null);

    if (isLoading) return <LoadingSkeleton />;
    if (error) return <ErrorState message="Failed to load assignments" />;

    const classes = ['all', ...Array.from(new Set(assignments?.map(a => a.className) || []))];
    const filteredAssignments = selectedClass === 'all' 
        ? assignments 
        : assignments?.filter(a => a.className === selectedClass);

    // Sort by due date (newest first)
    const sortedAssignments = filteredAssignments?.sort((a, b) => 
        new Date(b.dueDate).getTime() - new Date(a.dueDate).getTime()
    );

    if (selectedAssignment) {
        const assignment = assignments?.find(a => a.id === selectedAssignment);
        if (assignment) {
            return <AssignmentDetail assignment={assignment} onBack={() => setSelectedAssignment(null)} />;
        }
    }

    return (
        <div className="space-y-4">
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

            {!sortedAssignments || sortedAssignments.length === 0 ? (
                <EmptyState message="No assignments available" />
            ) : (
                <div className="space-y-3">
                    {sortedAssignments.map(assignment => (
                        <Card 
                            key={assignment.id} 
                            className="cursor-pointer hover:shadow-card transition-shadow"
                            onClick={() => setSelectedAssignment(assignment.id)}
                        >
                            <CardHeader className="pb-3">
                                <div className="flex items-start justify-between gap-2">
                                    <div className="flex items-start gap-3">
                                        <div className="rounded-lg bg-chart-2/10 p-2 mt-0.5">
                                            <FileText className="h-4 w-4 text-chart-2" />
                                        </div>
                                        <div>
                                            <CardTitle className="text-base">{assignment.title}</CardTitle>
                                            <div className="flex items-center gap-2 mt-1">
                                                <Badge variant="secondary" className="text-xs">
                                                    {assignment.className}
                                                </Badge>
                                                <span className="text-xs text-muted-foreground flex items-center gap-1">
                                                    <Calendar className="h-3 w-3" />
                                                    Due: {new Date(assignment.dueDate).toLocaleDateString()}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-muted-foreground line-clamp-2">
                                    {assignment.description}
                                </p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
}
