import Navbar from "@/components/navbar"

export default function WBudowie() {
  return (
    <div className="min-h-screen bg-black pb-12 select-none relative overflow-hidden">
      <Navbar />
      <div className="flex h-screen items-center justify-center text-center" data-aos="fade-in">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center gap-4 mb-4">
            <h1 className="text-4xl font-bold text-white" data-aos="fade-up">
              Strona w budowie
            </h1>
          </div>
          <p className="text-xl text-neutral-400 max-w-2xl mx-auto mb-4" data-aos="fade-up" data-aos-delay="100">
            Pracujemy nad tą częścią serwisu. Zapraszamy wkrótce!
          </p>
          <a href="/" className="bg-white text-black hover:bg-neutral-200 rounded-full text-sm font-medium px-4 py-1.5 inline-block" data-aos="fade-up" data-aos-delay="200">Strona główna</a>
        </div>
      </div>
    </div>
  )
}