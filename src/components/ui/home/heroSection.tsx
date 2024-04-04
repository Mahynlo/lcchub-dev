export function HeroSection() {
  return (
    <section className="bg-gray-100 py-20">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
        <div className="md:w-1/2 space-y-4">
          {/* <SchoolIcon className="h-16 w-16" /> */}
          <h1 className="text-4xl font-bold">
            Welcome to University of Excellence
          </h1>
          <p className="text-gray-700">
            Discover our world-class academic programs, vibrant campus life, and
            innovative research initiatives.
          </p>
          <div className="flex space-x-4">
            {/* <Button variant="primary">Explore Programs</Button> */}
            {/* <Button variant="secondary">Learn More</Button> */}
          </div>
        </div>
        <div className="md:w-1/2">
          <img
            alt="University campus"
            className="rounded-lg aspect-video"
            height={400}
            src="/placeholder.svg"
            width={600}
          />
        </div>
      </div>
    </section>
  );
}
