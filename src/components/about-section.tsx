import { BookOpen } from 'lucide-react'

export default function AboutSection() {
  return (
    <main className="min-h-screen py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <header className="text-center mb-12">
          <BookOpen className="w-16 h-16 mx-auto text-amber-600 mb-4" />
          <p className="text-xl text-gray-600">Your personal library companion!</p>
        </header>

        <section className="prose prose-amber max-w-none">
          <p className="lead">
            Welcome to Bookmark—your personal library companion!
          </p>

          <p>
            Bookmark is designed to help book enthusiasts track their reading journey and organize their literary adventures effortlessly. Whether you're an avid reader, a casual book lover, or someone looking to rekindle their passion for reading, Bookmark makes it simple and enjoyable to keep your collection organized.
          </p>

          <h2>What Can You Do with Bookmark?</h2>
          <ul>
            <li><strong>Track Your Progress:</strong> Log the books you've read, along with key details like authors, genres, and personal ratings.</li>
            <li><strong>Set Reading Goals:</strong> Challenge yourself to reach new milestones and keep your reading habit alive.</li>
            <li><strong>Stay Organized:</strong> Create a detailed archive of your past reads and categorize them for easy access.</li>
            <li><strong>Personalize Your Experience:</strong> Add notes, reviews, and thoughts about each book to reflect your unique reading journey.</li>
          </ul>

          <p>
            At Bookmark, we believe every book tells a story—but your reading story matters just as much. Let us help you capture it in one convenient place!
          </p>

          <p className="text-center font-semibold text-lg mt-8">
            Start your journey with Bookmark today and rediscover the joy of reading. 📚✨
          </p>
        </section>
      </div>
    </main>
  )
}