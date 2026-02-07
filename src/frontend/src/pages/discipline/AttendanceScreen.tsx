import { useInternetIdentity } from '../../hooks/useInternetIdentity';
import { useGetCallerUserProfile } from '../../hooks/queries/auth';
import { useGetAttendance } from '../../hooks/queries/discipline';
import { LoadingSkeleton, EmptyState, ErrorState } from '../../components/QueryState';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, CheckCircle, XCircle, LogIn } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export default function AttendanceScreen() {
    const { identity, login, loginStatus } = useInternetIdentity();
    const isAuthenticated = !!identity;
    const { data: userProfile, isLoading: profileLoading } = useGetCallerUserProfile();
    const studentId = userProfile?.associatedStudentId;
    const { data: attendance, isLoading: attendanceLoading, error } = useGetAttendance(studentId || '');

    if (!isAuthenticated) {
        return (
            <Card>
                <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                    <div className="rounded-full bg-muted p-4 mb-4">
                        <LogIn className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <h3 className="font-semibold mb-2">Login Required</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                        Please login to view your attendance records
                    </p>
                    <Button onClick={login} disabled={loginStatus === 'logging-in'}>
                        {loginStatus === 'logging-in' ? 'Logging in...' : 'Login'}
                    </Button>
                </CardContent>
            </Card>
        );
    }

    if (profileLoading || attendanceLoading) return <LoadingSkeleton />;
    if (error) return <ErrorState message="Failed to load attendance records" />;

    if (!studentId) {
        return <EmptyState message="No student profile associated with your account" />;
    }

    // Sort by date (newest first)
    const sortedAttendance = attendance?.sort((a, b) => 
        new Date(b.date).getTime() - new Date(a.date).getTime()
    );

    const presentCount = attendance?.filter(a => a.present).length || 0;
    const totalCount = attendance?.length || 0;
    const attendancePercentage = totalCount > 0 ? Math.round((presentCount / totalCount) * 100) : 0;

    return (
        <div className="space-y-4">
            <Card className="bg-gradient-to-br from-chart-2/5 to-chart-2/10 border-chart-2/20">
                <CardHeader>
                    <CardTitle className="text-base">Attendance Summary</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center justify-between">
                        <div>
                            <div className="text-3xl font-bold text-chart-2">{attendancePercentage}%</div>
                            <p className="text-sm text-muted-foreground">Overall Attendance</p>
                        </div>
                        <div className="text-right">
                            <div className="text-lg font-semibold">{presentCount} / {totalCount}</div>
                            <p className="text-xs text-muted-foreground">Days Present</p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {!sortedAttendance || sortedAttendance.length === 0 ? (
                <EmptyState message="No attendance records available" />
            ) : (
                <div className="space-y-2">
                    {sortedAttendance.map((record, idx) => (
                        <Card key={idx}>
                            <CardContent className="flex items-center justify-between py-3">
                                <div className="flex items-center gap-3">
                                    {record.present ? (
                                        <CheckCircle className="h-5 w-5 text-chart-2" />
                                    ) : (
                                        <XCircle className="h-5 w-5 text-destructive" />
                                    )}
                                    <div>
                                        <div className="font-medium text-sm">
                                            {new Date(record.date).toLocaleDateString('en-US', { 
                                                weekday: 'long', 
                                                year: 'numeric', 
                                                month: 'long', 
                                                day: 'numeric' 
                                            })}
                                        </div>
                                    </div>
                                </div>
                                <Badge variant={record.present ? 'default' : 'destructive'}>
                                    {record.present ? 'Present' : 'Absent'}
                                </Badge>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
}
