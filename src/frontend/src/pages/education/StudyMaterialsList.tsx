import { useState } from 'react';
import { useGetStudyMaterials } from '../../hooks/queries/education';
import { LoadingSkeleton, EmptyState, ErrorState } from '../../components/QueryState';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import StudyMaterialDetail from './StudyMaterialDetail';

export default function StudyMaterialsList() {
    const { data: materials, isLoading, error } = useGetStudyMaterials();
    const [selectedClass, setSelectedClass] = useState<string>('all');
    const [selectedMaterial, setSelectedMaterial] = useState<string | null>(null);

    if (isLoading) return <LoadingSkeleton />;
    if (error) return <ErrorState message="Failed to load study materials" />;

    const classes = ['all', ...Array.from(new Set(materials?.map(m => m.className) || []))];
    const filteredMaterials = selectedClass === 'all' 
        ? materials 
        : materials?.filter(m => m.className === selectedClass);

    if (selectedMaterial) {
        const material = materials?.find(m => m.id === selectedMaterial);
        if (material) {
            return <StudyMaterialDetail material={material} onBack={() => setSelectedMaterial(null)} />;
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

            {!filteredMaterials || filteredMaterials.length === 0 ? (
                <EmptyState message="No study materials available" />
            ) : (
                <div className="space-y-3">
                    {filteredMaterials.map(material => (
                        <Card 
                            key={material.id} 
                            className="cursor-pointer hover:shadow-card transition-shadow"
                            onClick={() => setSelectedMaterial(material.id)}
                        >
                            <CardHeader className="pb-3">
                                <div className="flex items-start justify-between gap-2">
                                    <div className="flex items-start gap-3">
                                        <div className="rounded-lg bg-primary/10 p-2 mt-0.5">
                                            <FileText className="h-4 w-4 text-primary" />
                                        </div>
                                        <div>
                                            <CardTitle className="text-base">{material.subject}</CardTitle>
                                            <Badge variant="secondary" className="mt-1 text-xs">
                                                {material.className}
                                            </Badge>
                                        </div>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-muted-foreground line-clamp-2">
                                    {material.description}
                                </p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
}
