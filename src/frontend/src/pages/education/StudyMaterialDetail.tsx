import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import type { StudyMaterial } from '../../backend';

interface StudyMaterialDetailProps {
    material: StudyMaterial;
    onBack: () => void;
}

export default function StudyMaterialDetail({ material, onBack }: StudyMaterialDetailProps) {
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
                            <CardTitle className="text-xl">{material.subject}</CardTitle>
                            <Badge variant="secondary" className="mt-2">
                                {material.className}
                            </Badge>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div>
                        <h3 className="font-medium text-sm mb-2">Description</h3>
                        <p className="text-sm text-muted-foreground">{material.description}</p>
                    </div>

                    {material.fileUrl && (
                        <div>
                            <h3 className="font-medium text-sm mb-2">Resource</h3>
                            <Button variant="outline" size="sm" asChild>
                                <a href={material.fileUrl} target="_blank" rel="noopener noreferrer" className="gap-2">
                                    <ExternalLink className="h-4 w-4" />
                                    Open Resource
                                </a>
                            </Button>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
