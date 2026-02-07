import { useQuery } from '@tanstack/react-query';
import { useActor } from '../useActor';
import type { AttendanceRecord } from '../../backend';

export function useGetAttendance(studentId: string) {
    const { actor, isFetching } = useActor();

    return useQuery<AttendanceRecord[]>({
        queryKey: ['attendance', studentId],
        queryFn: async () => {
            if (!actor || !studentId) return [];
            return actor.getAttendance(studentId);
        },
        enabled: !!actor && !isFetching && !!studentId
    });
}
