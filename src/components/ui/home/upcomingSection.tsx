import { Button } from "../button";
export function UpcomingEventsSection() {
  return (
    <section className="py-20" id="events">
      <div className="container mx-auto px-4">
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold">Upcoming Events</h2>
          <p className="text-gray-700">
            Check out our upcoming events and activities on campus.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <img
              alt="Event 1"
              className="rounded-lg aspect-image"
              height={250}
              src="/placeholder.svg"
              width={400}
            />
            <h3 className="text-xl font-bold mb-2">Annual Alumni Reunion</h3>
            <p className="text-gray-700 mb-4">
              Join us for our annual alumni reunion and reconnect with old
              friends.
            </p>
            <Button variant="link">Learn More</Button>
          </div>
          <div>
            <img
              alt="Event 2"
              className="rounded-lg aspect-image"
              height={250}
              src="/placeholder.svg"
              width={400}
            />
            <h3 className="text-xl font-bold mb-2">
              Sustainability Conference
            </h3>
            <p className="text-gray-700 mb-4">
              Explore the latest innovations in sustainable technology and
              practices.
            </p>
            <Button variant="link">Learn More</Button>
          </div>
          <div>
            <img
              alt="Event 3"
              className="rounded-lg aspect-image"
              height={250}
              src="/placeholder.svg"
              width={400}
            />
            <h3 className="text-xl font-bold mb-2">Arts and Music Festival</h3>
            <p className="text-gray-700 mb-4">
              Enjoy a day of music, art, and cultural performances on our
              campus.
            </p>
            <Button variant="link">Learn More</Button>
          </div>
        </div>
      </div>
    </section>
  );
}
