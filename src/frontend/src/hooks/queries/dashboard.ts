import { useQuery } from '@tanstack/react-query';
import { useActor } from '../useActor';
import type { StudentProfile, ExamResult, Notification } from '../../backend';

export function useGetStudentProfile(studentId: string) {
    const { actor, isFetching } = useActor();

    return useQuery<StudentProfile>({
        queryKey: ['studentProfile', studentId],
        queryFn: async () => {
            if (!actor || !studentId) throw new Error('Actor or studentId not available');
            return actor.getStudentProfile(studentId);
        },
        enabled: !!actor && !isFetching && !!studentId,
        retry: false
    });
}

export function useGetExamResults(studentId: string) {
    const { actor, isFetching } = useActor();

    return useQuery<ExamResult[]>({
        queryKey: ['examResults', studentId],
        queryFn: async () => {
            if (!actor || !studentId) return [];
            return actor.getExamResults(studentId);
        },
        enabled: !!actor && !isFetching && !!studentId
    });
}

export function useGetNotifications(userId: string) {
    const { actor, isFetching } = useActor();

    return useQuery<Notification[]>({
        queryKey: ['notifications', userId],
        queryFn: async () => {
            if (!actor || !userId) return [];
            return actor.getNotifications(userId);
        },
        enabled: !!actor && !isFetching && !!userId
    });
}
