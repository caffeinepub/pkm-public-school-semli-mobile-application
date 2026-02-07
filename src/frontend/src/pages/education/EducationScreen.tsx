import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import StudyMaterialsList from './StudyMaterialsList';
import AssignmentsList from './AssignmentsList';
import ExamsList from './ExamsList';
import AnnouncementsList from './AnnouncementsList';

export default function EducationScreen() {
    const [activeTab, setActiveTab] = useState('materials');

    return (
        <div className="container mx-auto px-4 py-6 space-y-4">
            <div>
                <h1 className="text-2xl font-bold">Education</h1>
                <p className="text-sm text-muted-foreground">Access study materials, assignments, and more</p>
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="materials" className="text-xs">Materials</TabsTrigger>
                    <TabsTrigger value="assignments" className="text-xs">Homework</TabsTrigger>
                    <TabsTrigger value="exams" className="text-xs">Exams</TabsTrigger>
                    <TabsTrigger value="announcements" className="text-xs">Announcements</TabsTrigger>
                </TabsList>
                <TabsContent value="materials" className="mt-4">
                    <StudyMaterialsList />
                </TabsContent>
                <TabsContent value="assignments" className="mt-4">
                    <AssignmentsList />
                </TabsContent>
                <TabsContent value="exams" className="mt-4">
                    <ExamsList />
                </TabsContent>
                <TabsContent value="announcements" className="mt-4">
                    <AnnouncementsList />
                </TabsContent>
            </Tabs>
        </div>
    );
}
