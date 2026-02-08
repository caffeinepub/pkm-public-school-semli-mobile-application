import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { galleryImages, GalleryImage } from './galleryImages';
import ImagePreviewDialog from './ImagePreviewDialog';

export default function ImagesScreen() {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [previewOpen, setPreviewOpen] = useState(false);

  const handleImageClick = (image: GalleryImage) => {
    setSelectedImage(image);
    setPreviewOpen(true);
  };

  const handleClosePreview = (open: boolean) => {
    setPreviewOpen(open);
    if (!open) {
      setTimeout(() => setSelectedImage(null), 200);
    }
  };

  return (
    <div className="container mx-auto px-4 py-6 space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-foreground">Gallery</h1>
        <p className="text-muted-foreground">
          Explore memorable moments from our school events and activities
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {galleryImages.map((image) => (
          <Card
            key={image.id}
            className="group overflow-hidden cursor-pointer transition-all hover:shadow-lg hover:scale-[1.02]"
            onClick={() => handleImageClick(image)}
          >
            <div className="relative aspect-[4/3] overflow-hidden bg-muted">
              <img
                src={image.src}
                alt={image.alt}
                className="absolute inset-0 w-full h-full object-cover transition-transform group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
            </div>
          </Card>
        ))}
      </div>

      <ImagePreviewDialog
        image={selectedImage}
        open={previewOpen}
        onOpenChange={handleClosePreview}
      />
    </div>
  );
}
