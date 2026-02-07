import { useQuery } from '@tanstack/react-query';
import { useActor } from '../useActor';
import type { StudyMaterial, Assignment, Exam, TeacherAnnouncement, ExamResult } from '../../backend';

export function useGetStudyMaterials() {
    const { actor, isFetching } = useActor();

    return useQuery<StudyMaterial[]>({
        queryKey: ['studyMaterials'],
        queryFn: async () => {
            if (!actor) return [];
            return actor.getStudyMaterials();
        },
        enabled: !!actor && !isFetching
    });
}

export function useGetAssignments() {
    const { actor, isFetching } = useActor();

    return useQuery<Assignment[]>({
        queryKey: ['assignments'],
        queryFn: async () => {
            if (!actor) return [];
            return actor.getAssignments();
        },
        enabled: !!actor && !isFetching
    });
}

export function useGetExams() {
    const { actor, isFetching } = useActor();

    return useQuery<Exam[]>({
        queryKey: ['exams'],
        queryFn: async () => {
            if (!actor) return [];
            return actor.getExams();
        },
        enabled: !!actor && !isFetching
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

export function useGetAnnouncements() {
    const { actor, isFetching } = useActor();

    return useQuery<TeacherAnnouncement[]>({
        queryKey: ['announcements'],
        queryFn: async () => {
            if (!actor) return [];
            return actor.getAnnouncements();
        },
        enabled: !!actor && !isFetching
    });
}
