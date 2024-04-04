export function GallerySection() {
  return (
    <section className="py-20" id="gallery">
      <div className="container mx-auto px-4">
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold">Campus Gallery</h2>
          <p className="text-gray-700">
            Take a virtual tour of our beautiful campus.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <img
            alt="Gallery 1"
            className="rounded-lg aspect-image"
            height={200}
            src="/placeholder.svg"
            width={300}
          />
          <img
            alt="Gallery 2"
            className="rounded-lg aspect-image"
            height={200}
            src="/placeholder.svg"
            width={300}
          />
          <img
            alt="Gallery 3"
            className="rounded-lg aspect-image"
            height={200}
            src="/placeholder.svg"
            width={300}
          />
          <img
            alt="Gallery 4"
            className="rounded-lg aspect-image"
            height={200}
            src="/placeholder.svg"
            width={300}
          />
        </div>
      </div>
    </section>
  );
}
