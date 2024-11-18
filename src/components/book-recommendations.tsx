import { Star } from 'lucide-react'
import gatsbyImage from '../assets/images/greatgatsby.webp'
import mockingbirdImage from '../assets/images/ToKillaMockingbird.webp'
import nineteenEightyFourImage from '../assets/images/1984.webp'
import prideAndPrejudiceImage from '../assets/images/PrideandPrejudice.webp'

export default function BookRecommendations() {
  const books = [
    { id: 1, title: "The Great Gatsby", image: gatsbyImage },
    { id: 2, title: "To Kill a Mockingbird", image: mockingbirdImage },
    { id: 3, title: "1984", image: nineteenEightyFourImage },
    { id: 4, title: "Pride and Prejudice", image: prideAndPrejudiceImage },
  ]

  return (
    <section className="py-12 bg-gray-50 mb-12">
      <div className="container mx-auto px-[7%]">
        <h2 className="text-3xl font-bold text-center mb-8">Recommended Books</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {books.map((book) => (
            <div key={book.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <img
                src={book.image}
                alt={`Cover of ${book.title}`}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="font-semibold text-lg mb-2">{book.title}</h3>
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>        
      </div>
    </section>
  )
}