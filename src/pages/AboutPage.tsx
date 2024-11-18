import PageTitle from "@/components/PageTitle.tsx";
import Header from "../components/Header.tsx";
import AboutSection from "@/components/about-section.tsx";


export default function AboutPage() {
  return (
    <>
      <Header />
      <PageTitle name={'About'}/>
      <AboutSection/>      
    </>
  );
}