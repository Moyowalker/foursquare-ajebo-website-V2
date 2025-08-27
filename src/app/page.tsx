export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-spiritual-light to-white">
      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="heading-1 text-spiritual-dark mb-6">
            Welcome to Foursquare Ajebo
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
            A peaceful retreat center providing spiritual sanctuary and modern
            facilities for conventions, retreats, and community gatherings in
            the heart of Nigeria.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="btn btn-primary px-8 py-3 text-lg">
              Book Your Stay
            </button>
            <button className="btn btn-outline px-8 py-3 text-lg">
              Explore Facilities
            </button>
          </div>
        </div>

        {/* Quick Info Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="card p-6 text-center">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🏨</span>
            </div>
            <h3 className="heading-4 mb-2">Accommodation</h3>
            <p className="text-muted">
              Comfortable rooms and dormitories for individuals and groups
            </p>
          </div>
          
          <div className="card p-6 text-center">
            <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🏛️</span>
            </div>
            <h3 className="heading-4 mb-2">Event Halls</h3>
            <p className="text-muted">
              Spacious halls for conventions, conferences, and gatherings
            </p>
          </div>
          
          <div className="card p-6 text-center">
            <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🌿</span>
            </div>
            <h3 className="heading-4 mb-2">Peaceful Environment</h3>
            <p className="text-muted">
              Serene surroundings perfect for spiritual reflection and rest
            </p>
          </div>
        </div>

        {/* Development Status */}
        <div className="card p-8 bg-gradient-to-r from-primary/5 to-secondary/5">
          <h2 className="heading-3 text-center mb-4">🚧 Website Under Development</h2>
          <p className="text-center text-muted-foreground mb-6">
            We're building an amazing experience for you. This is Phase 1 of our development process.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
            <div className="flex items-center space-x-2">
              <span className="w-3 h-3 bg-green-500 rounded-full"></span>
              <span>✅ Project Setup</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="w-3 h-3 bg-yellow-500 rounded-full"></span>
              <span>🟡 Design System</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="w-3 h-3 bg-gray-300 rounded-full"></span>
              <span>⚪ Core Pages</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="w-3 h-3 bg-gray-300 rounded-full"></span>
              <span>⚪ Features</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
