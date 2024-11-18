import Header from "../components/Header.tsx";
import PageTitle from "../components/PageTitle.tsx";
import Footer from "../components/Footer.tsx";
import HomeButtons from "@/components/button-grid.tsx";
import BookRecommendations from "@/components/book-recommendations.tsx";



export default function HomePage() {
  return (
    <>
      <Header />
      <PageTitle name={"Home"}/>            
      <HomeButtons />
      <BookRecommendations />
      <Footer />
    </>
  );
}