'use client'

import { useState, useEffect } from 'react'
import axios from 'axios'
import { PlusCircle, Pencil, Trash2 } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select } from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

interface Book {
  id: number
  image: string
  title: string
  author: string
  status: string
  initialDate: string
  completionDate: string
}

export default function BookManagementGrid() {
  const [books, setBooks] = useState<Book[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [editingBook, setEditingBook] = useState<Book | null>(null)

  useEffect(() => {
    fetchBooks()
  }, [])

  const fetchBooks = async () => {
    setIsLoading(true)
    try {
      const response = await axios.get<Book[]>('/api/books') // Replace with your actual API endpoint
      setBooks(response.data)
      setError(null)
    } catch (err) {
      setError('Failed to fetch books. Please try again later.')
      console.error('Error fetching books:', err)
    } finally {
      setIsLoading(false)
    }
  }

  const handleAddBook = async (newBook: Omit<Book, 'id'>) => {
    try {
      const response = await axios.post<Book>('/api/books', newBook) // Replace with your actual API endpoint
      setBooks([...books, response.data])
    } catch (err) {
      setError('Failed to add book. Please try again.')
      console.error('Error adding book:', err)
    }
  }

  const handleEditBook = async (updatedBook: Book) => {
    try {
      await axios.put(`/api/books/${updatedBook.id}`, updatedBook) // Replace with your actual API endpoint
      setBooks(books.map(book => book.id === updatedBook.id ? updatedBook : book))
      setEditingBook(null)
    } catch (err) {
      setError('Failed to update book. Please try again.')
      console.error('Error updating book:', err)
    }
  }

  const handleDeleteBook = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this book?')) {
      try {
        await axios.delete(`/api/books/${id}`) // Replace with your actual API endpoint
        setBooks(books.filter(book => book.id !== id))
      } catch (err) {
        setError('Failed to delete book. Please try again.')
        console.error('Error deleting book:', err)
      }
    }
  }

  const BookForm = ({ book, onSubmit }: { book?: Book, onSubmit: (book: Omit<Book, 'id'>) => void }) => (
    <form onSubmit={(e) => {
      e.preventDefault()
      const formData = new FormData(e.currentTarget)
      onSubmit({
        image: formData.get('image') as string,
        title: formData.get('title') as string,
        author: formData.get('author') as string,
        status: formData.get('status') as string,
        initialDate: formData.get('initialDate') as string,
        completionDate: formData.get('completionDate') as string,
      })
    }} className="space-y-4">
      <Input name="image" placeholder="Image URL" defaultValue={book?.image} required />
      <Input name="title" placeholder="Book Title" defaultValue={book?.title} required />
      <Input name="author" placeholder="Author" defaultValue={book?.author} required />
      <Select name="status">
        <option value="Not Started">Not Started</option>
        <option value="In Progress">In Progress</option>
        <option value="Completed">Completed</option>
      </Select>
      <Input name="initialDate" type="date" defaultValue={book?.initialDate} required />
      <Input name="completionDate" type="date" defaultValue={book?.completionDate} />
      <Button type="submit">{book ? 'Update' : 'Add'} Book</Button>
    </form>
  )

  if (isLoading) return <div>Loading...</div>
  if (error) return <div className="text-red-500">{error}</div>

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Book Management</h1>
      <Dialog>
        <DialogTrigger asChild>
          <Button className="mb-4"><PlusCircle className="mr-2 h-4 w-4" /> Add New Book</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Book</DialogTitle>
          </DialogHeader>
          <BookForm onSubmit={handleAddBook} />
        </DialogContent>
      </Dialog>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Image</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Author</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Initial Date</TableHead>
            <TableHead>Completion Date</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {books.map((book) => (
            <TableRow key={book.id}>
              <TableCell>
                <img src={book.image} alt={book.title} className="w-16 h-24 object-cover" />
              </TableCell>
              <TableCell>{book.title}</TableCell>
              <TableCell>{book.author}</TableCell>
              <TableCell>{book.status}</TableCell>
              <TableCell>{book.initialDate}</TableCell>
              <TableCell>{book.completionDate}</TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="icon"><Pencil className="h-4 w-4" /></Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Edit Book</DialogTitle>
                      </DialogHeader>
                      <BookForm book={book} onSubmit={(updatedBook) => handleEditBook({ ...updatedBook, id: book.id })} />
                    </DialogContent>
                  </Dialog>
                  <Button variant="outline" size="icon" onClick={() => handleDeleteBook(book.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}