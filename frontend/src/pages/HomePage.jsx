function HomePage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-50 to-white px-6 pt-24">
      {/* Hero Section */}
      <div className="text-center max-w-2xl">
        <h1 className="text-4xl md:text-6xl font-bold text-indigo-700 mb-6">
          Welcome to Your Library 📚
        </h1>
        <p className="text-gray-600 text-lg md:text-xl mb-8">
          Discover, explore, and borrow your favorite books all in one place.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <a
            href="/catalog"
            className="px-6 py-3 rounded-2xl bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition"
          >
            Browse Catalog
          </a>
          <a
            href="/signup"
            className="px-6 py-3 rounded-2xl border border-indigo-600 text-indigo-600 font-medium hover:bg-indigo-50 transition"
          >
            Get Started
          </a>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
