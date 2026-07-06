import HeaderPublic from "@/components/header-public";
import BookingForm from "@/components/BookingForm";
import ProfessionalsStatus from "../../components/ProfessionalStatus";
import Footer from "../../components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen w-full ">
      <HeaderPublic />
      <main className="container mx-auto px-4 pt-20 pb-12 space-y-10">
        <BookingForm />
        <ProfessionalsStatus />
      </main>
      <Footer />
    </div>
  );
}
