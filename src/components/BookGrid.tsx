import { useEffect, useState } from 'react'
import axios from 'axios'
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { X } from 'lucide-react'
import { toast, Bounce } from "react-toastify"

interface Book {
  id: string
  image: string
  title: string
  author: string
  categoryId: string
  mainCategory: { category_name: string }
}

interface BookResponse {
  totalBooks: number
  totalPages: number
  [key: string]: any
}

interface Category {
  id: string
  category_name: string
}

export default function Component() {
  const [books, setBooks] = useState<Book[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [bookToDelete, setBookToDelete] = useState<string | null>(null)
  const [newBook, setNewBook] = useState({ title: '', author: '', categoryId: '', image: null as File | null })

  const fetchBooks = async () => {
    try {
      setLoading(true)
      const response = await axios.get<BookResponse>('http://localhost:3000/book', {
        params: {
          page,
          perPage: 16,
          filter: 'none',
          sortOrder: 'asc',
          categoryId: 'none'
        }
      })
      setBooks(Object.values(response.data).filter((item): item is Book => 
        typeof item === 'object' && item !== null && 'id' in item
      ).map(item => ({
        ...item,
        mainCategory: { category_name: item.mainCategory.category_name }
      })))
      setTotalPages(response.data.totalPages)
    } catch (err) {
      setError('Failed to fetch books')
    } finally {
      setLoading(false)
    }
  }

  const fetchCategories = async () => {
    try {
      const response = await axios.get<Category[]>('http://localhost:3000/book-category/all')
      setCategories(response.data)
    } catch (err) {
      console.error('Failed to fetch categories:', err)
      toast.error('Failed to load categories')
    }
  }

  useEffect(() => {
    fetchBooks()
    fetchCategories()
  }, [page])

  const handleAddBook = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const formData = new FormData()
      formData.append('title', newBook.title)
      formData.append('author', newBook.author)
      formData.append('categoryId', newBook.categoryId)
      if (newBook.image) {
        formData.append('images', newBook.image)
      }      
      
      await axios.post('http://localhost:3000/book', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
      setIsAddDialogOpen(false)
      toast.success(
        "Book saved!",
        {
          position: "top-right",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          transition: Bounce,
        }
      )
      setNewBook({ title: '', author: '', categoryId: '', image: null })
      fetchBooks()
    } catch (err) {
      toast.error(
        "Error while saving book!",
        {
          position: "top-right",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          transition: Bounce,
        }
      )
      console.error('Failed to add book:', err)
    }
  }

  const handleDeleteBook = async () => {
    if (bookToDelete) {
      try {
        await axios.delete(`http://localhost:3000/book/${bookToDelete}`)
        setIsDeleteDialogOpen(false)
        toast.success(
          "Book deleted!",
          {
            position: "top-right",
            autoClose: 4000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            transition: Bounce,
          }
        )
        setBookToDelete(null)
        fetchBooks()
      } catch (err) {
        console.error('Failed to delete book:', err)
      }
    }
  }

  if (loading) return <div className="text-center">Loading...</div>
  if (error) return <div className="text-center text-red-500">{error}</div>

  return (
    <div className="container mx-auto py-8 mb-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">My Books</h1>
        <Button onClick={() => setIsAddDialogOpen(true)}>Add Book</Button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {books.map((book) => (
          <Card key={book.id} className="overflow-hidden relative">
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-2 right-2 z-10"
              onClick={() => {
                setBookToDelete(book.id)
                setIsDeleteDialogOpen(true)
              }}
            >
              <X className="h-4 w-4" />
            </Button>
            <div className="flex">
              <div className="aspect-w-3 aspect-h-4 relative w-1/3">
                <img
                  src={`http://localhost:3000/Image/${book.image}`}
                  alt={book.title}
                  className="absolute inset-0 w-full h-full object-cover transition-all duration-300 hover:scale-105"
                />
              </div>
              <CardContent className="p-4 w-2/3 ">
                <h3 className="font-semibold text-lg mb-1 line-clamp-1">{book.title}</h3>
                <p className="text-sm text-gray-600 mb-1">{book.author}</p>
                <p className="text-xs text-gray-500">Category: {book.mainCategory.category_name}</p>
              </CardContent>
            </div>
          </Card>
        ))}
      </div>      
      <div className="mt-6 flex justify-center gap-2">
        <Button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}>Previous</Button>
        <Button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages}>Next</Button>
      </div>

      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="bg-white">
          <DialogHeader>
            <DialogTitle>Add New Book</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleAddBook}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="title" className="text-right">Title</Label>
                <Input
                  id="title"
                  value={newBook.title}
                  onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="author" className="text-right">Author</Label>
                <Input
                  id="author"
                  value={newBook.author}
                  onChange={(e) => setNewBook({ ...newBook, author: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="category" className="text-right">Category</Label>
                <Select
                  value={newBook.categoryId}
                  onValueChange={(value) => setNewBook({ ...newBook, categoryId: value })}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent className='bg-white'>
                    {categories.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.category_name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="image" className="text-right">Image</Label>
                <Input
                  id="image"
                  type="file"
                  onChange={(e) => setNewBook({ ...newBook, image: e.target.files ? e.target.files[0] : null })}
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="secondary" onClick={() => setIsAddDialogOpen(false)}>Cancel</Button>
              <Button type="submit">Save</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent className="bg-white">
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure you want to delete this book?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the book from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setIsDeleteDialogOpen(false)}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteBook}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}