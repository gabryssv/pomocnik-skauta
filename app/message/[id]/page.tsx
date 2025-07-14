import Navbar from "@/components/navbar"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { ExternalLink } from "@/components/external-link"

interface Message {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  authorEmail: string;
  authorImage?: string;
}

function renderContentWithLinks(content: string) {
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  const parts = content.split(urlRegex);

  return parts.map((part, index) => {
    if (part.match(urlRegex)) {
      return <ExternalLink key={index} href={part}>{part}</ExternalLink>;
    } else {
      return part;
    }
  });
}

async function getMessage(id: string) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/messages`);
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    const messages = await res.json();
    return messages.find((msg: any) => msg.id === parseInt(id));
  } catch (error) {
    console.error("Failed to fetch message:", error);
    return null;
  }
}

export default async function MessagePage({ params }: MessagePageProps) {
  const message = await getMessage(params.id);

  if (!message) {
    return (
      <div className="min-h-screen bg-black pb-12 select-none relative overflow-hidden">
        <Navbar />
        <div className="flex h-screen items-center justify-center text-center" data-aos="fade-in">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl font-bold text-white" data-aos="fade-up">
              Wiadomość nie znaleziona
            </h1>
            <p className="text-xl text-neutral-400 max-w-2xl mx-auto mb-4" data-aos="fade-up" data-aos-delay="100">
              Sprawdź poprawność adresu URL.
            </p>
            <a href="/" className="bg-white text-black hover:bg-neutral-200 rounded-full text-sm font-medium px-4 py-1.5 inline-block" data-aos="fade-up" data-aos-delay="200">Strona główna</a>
          </div>
        </div>
      </div>
    );
  }

  const formattedDate = new Date(message.createdAt).toLocaleDateString('pl-PL', { year: 'numeric', month: 'long', day: 'numeric' });
  const authorName = message.authorEmail.split('@')[0]; // Simple derivation of name from email

  return (
    <div className="min-h-screen bg-black select-none relative overflow-hidden flex flex-col">
      <Navbar />
      <div className="flex flex-grow flex-col items-start justify-center pt-20 pb-12 lg:pt-[8rem]" data-aos="fade-in">
        <div className="container px-4 lg:max-w-6xl lg:mx-auto">
          <div className="flex items-center justify-left gap-4 mb-4">
            <h1 className="text-4xl font-bold text-white" data-aos="fade-up">
              {message.title}
            </h1>
          </div>
          <div className="flex items-center justify-left gap-2 mb-4 text-neutral-400" data-aos="fade-up" data-aos-delay="50">
            <Avatar className="h-8 w-8">
              <AvatarImage src={message.authorImage || "/placeholder-user.jpg"} alt="Avatar" />
              <AvatarFallback>{authorName.charAt(0).toUpperCase()}</AvatarFallback>
            </Avatar>
            <p className="text-lg">
              {authorName} ({message.authorEmail})
            </p>
            <span className="mx-2">•</span>
            <p className="text-lg">
              {formattedDate}
            </p>
          </div>
          <p className="text-xl text-neutral-400 whitespace-pre-wrap" data-aos="fade-up" data-aos-delay="100">
            {renderContentWithLinks(message.content)}
          </p>
        </div>
      </div>
    </div>
  );
}
