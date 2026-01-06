interface FarmGalleryProps {
  images: string[]
  farmName: string
}

export function FarmGallery({ images, farmName }: FarmGalleryProps) {
  if (!images || images.length === 0) return null

  return (
    <section className="py-8">
      <h2 className="mb-4 text-xl font-bold text-foreground">写真ギャラリー</h2>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {images.map((image, index) => (
          <div key={index} className="aspect-[4/3] overflow-hidden rounded-lg">
            <img
              src={image || "/placeholder.svg"}
              alt={`${farmName}の写真 ${index + 1}`}
              className="h-full w-full object-cover transition-transform hover:scale-105"
            />
          </div>
        ))}
      </div>
    </section>
  )
}
