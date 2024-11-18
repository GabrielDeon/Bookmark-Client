import Header from "../components/Header.tsx";
import Footer from "../components/Footer.tsx";
import BookGrid from "@/components/BookGrid.tsx";
import PageTitle from "@/components/PageTitle.tsx";

export default function BooksPage() {
  return (
    <>
      <Header />
      <PageTitle name="My Books"/>
      <BookGrid />
      <Footer />
    </>
  );
}