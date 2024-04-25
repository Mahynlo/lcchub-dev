import { Button } from "../button";
export function JobBoardSection() {
  return (
    <section className="bg-gray-100 py-20" id="news">
      <div className="container mx-auto px-4">
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold">Latest News</h2>
          <p className="text-gray-700">
            Stay up-to-date with the latest news and stories from our
            university.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div>
            <img
              alt="News 1"
              className="rounded-lg aspect-image"
              height={250}
              src="/placeholder.svg"
              width={400}
            />
            <h3 className="text-xl font-bold mb-2">New Research Lab Opens</h3>
            <p className="text-gray-700 mb-4">
              Our university has opened a new state-of-the-art research
              laboratory.
            </p>
            <Button variant="link">Read More</Button>
          </div>
          <div>
            <img
              alt="News 2"
              className="rounded-lg aspect-image"
              height={250}
              src="/placeholder.svg"
              width={400}
            />
            <h3 className="text-xl font-bold mb-2">
              Student Wins National Award
            </h3>
            <p className="text-gray-700 mb-4">
              One of our students has won a prestigious national award for their
              research.
            </p>
            <Button variant="link">Read More</Button>
          </div>
          <div>
            <img
              alt="News 3"
              className="rounded-lg aspect-image"
              height={250}
              src="/placeholder.svg"
              width={400}
            />
            <h3 className="text-xl font-bold mb-2">
              New Scholarship Program Launched
            </h3>
            <p className="text-gray-700 mb-4">
              Our university has launched a new scholarship program to support
              talented students.
            </p>
            <Button variant="link">Read More</Button>
          </div>
        </div>
      </div>
    </section>
  );
}
