"use client"

import { useSession, signOut } from "next-auth/react"
import Navbar from "@/components/navbar"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"

interface Message {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  authorEmail: string;
  authorImage?: string;
}

export default function Panel() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [messageTitle, setMessageTitle] = useState("")
  const [messageContent, setMessageContent] = useState("")
  const [publishedMessageId, setPublishedMessageId] = useState<number | null>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [messageToDeleteId, setMessageToDeleteId] = useState<number | null>(null);
  const [editingMessageId, setEditingMessageId] = useState<number | null>(null);
  const [editingMessageTitle, setEditingMessageTitle] = useState("");
  const [editingMessageContent, setEditingMessageContent] = useState("");

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/dev/login")
    } else if (status === "authenticated") {
      fetchMessages();
    }
  }, [status, router])

  const fetchMessages = async () => {
    try {
      const response = await fetch('/api/messages');
      if (response.ok) {
        const data = await response.json();
        setMessages(data);
      } else {
        console.error('Błąd podczas pobierania wiadomości.');
      }
    } catch (error) {
      console.error('Błąd sieci:', error);
    }
  };

  const handleDeleteMessage = (id: number) => {
    setMessageToDeleteId(id);
    setIsDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (messageToDeleteId === null) return;

    try {
      const response = await fetch(`/api/messages?id=${messageToDeleteId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        fetchMessages(); // Odśwież listę wiadomości po usunięciu
      } else {
        alert('Błąd podczas usuwania wiadomości.');
      }
    } catch (error) {
      console.error('Błąd sieci:', error);
      alert('Wystąpił błąd sieci.');
    } finally {
      setIsDeleteDialogOpen(false);
      setMessageToDeleteId(null);
    }
  };

  const handleEditMessage = (message: Message) => {
    setEditingMessageId(message.id);
    setEditingMessageTitle(message.title);
    setEditingMessageContent(message.content);
    setIsDialogOpen(true);
  };

  const handleSubmitMessage = async () => {
    const method = editingMessageId ? 'PUT' : 'POST';
    const url = editingMessageId ? `/api/messages?id=${editingMessageId}` : '/api/messages';
    const body = {
      title: editingMessageId ? editingMessageTitle : messageTitle,
      content: editingMessageId ? editingMessageContent : messageContent,
      authorEmail: session?.user?.email,
      authorImage: session?.user?.image,
    };

    try {
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      if (response.ok) {
        const data = await response.json();
        setPublishedMessageId(data.id);
        fetchMessages(); // Refresh messages after publishing/editing
      } else {
        alert(`Błąd podczas ${editingMessageId ? 'edycji' : 'publikowania'} wiadomości.`);
      }
    } catch (error) {
      console.error('Błąd sieci:', error);
      alert('Wystąpił błąd sieci.');
    }
  };

  const handleDialogClose = (open: boolean) => {
    setIsDialogOpen(open);
    if (!open) {
      setMessageTitle("");
      setMessageContent("");
      setPublishedMessageId(null);
      setEditingMessageId(null);
      setEditingMessageTitle("");
      setEditingMessageContent("");
    }
  }

  if (status === "loading" || status === "unauthenticated") {
    return (
      <div className="min-h-screen bg-black pb-12 select-none relative overflow-hidden">
        <Navbar />
        <div className="flex h-screen items-center justify-center text-center">
          <p className="text-white">Ładowanie...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black select-none relative overflow-hidden">
      <Navbar />
      <div className="flex h-screen items-center justify-center text-center" data-aos="fade-in">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center gap-4 mb-4">
            <h1 className="text-4xl font-bold text-white" data-aos="fade-up">
              Witaj, {session?.user?.name}
            </h1>
          </div>
          <p className="text-xl text-neutral-400 max-w-2xl mx-auto mb-4" data-aos="fade-up" data-aos-delay="100">
            Jesteś w panelu deweloperskim.
          </p>
          <Tabs defaultValue="create-message" className="w-full max-w-4xl mx-auto">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="create-message">Utwórz wiadomość</TabsTrigger>
              <TabsTrigger value="message-history">Historia wiadomości</TabsTrigger>
            </TabsList>
            <TabsContent value="create-message">
              <div className="mt-8">
                <button 
                  onClick={() => signOut({ callbackUrl: '/dev/login' })} 
                  className="bg-white text-black hover:bg-neutral-200 rounded-full text-sm font-medium px-4 py-1.5 inline-block mr-4" 
                  data-aos="fade-up" 
                  data-aos-delay="200"
                >
                  Wyloguj się
                </button>
                <button 
                  onClick={() => {
                    setIsDialogOpen(true);
                    setMessageTitle("");
                    setMessageContent("");
                    setEditingMessageId(null);
                  }} 
                  className="bg-white text-black hover:bg-neutral-200 rounded-full text-sm font-medium px-4 py-1.5 inline-block" 
                  data-aos="fade-up" 
                  data-aos-delay="200"
                >
                  Utwórz wiadomość
                </button>
              </div>
            </TabsContent>
            <TabsContent value="message-history">
              <div className="mt-8">
                <h2 className="text-2xl font-bold text-white mb-4">Historia wiadomości</h2>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[200px]">Nazwa wiadomości</TableHead>
                      <TableHead>Data wiadomości</TableHead>
                      <TableHead>Email twórcy</TableHead>
                      <TableHead className="text-right">Akcje</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {messages.map((message) => (
                      <TableRow key={message.id}>
                        <TableCell className="font-medium text-left">{message.title}</TableCell>
                        <TableCell className="text-left">{new Date(message.createdAt).toLocaleDateString('pl-PL', { year: 'numeric', month: 'long', day: 'numeric' })}</TableCell>
                        <TableCell className="text-left">{message.authorEmail}</TableCell>
                        <TableCell className="flex gap-2 justify-end">
                          <Link href={`/message/${message.id}`}>
                            <Button className="bg-white text-black hover:bg-neutral-200 rounded-full text-sm font-medium px-4 py-1.5 h-auto">Zobacz</Button>
                          </Link>
                          <Button onClick={() => handleEditMessage(message)} className="bg-blue-600 text-white hover:bg-blue-700 rounded-full text-sm font-medium px-4 py-1.5 h-auto">Edytuj</Button>
                          <Button onClick={() => handleDeleteMessage(message.id)} className="bg-red-600 text-white hover:bg-red-700 rounded-full text-sm font-medium px-4 py-1.5 h-auto">Usuń</Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={handleDialogClose}>
        <DialogContent className="sm:max-w-[425px] bg-neutral-950 border-neutral-800 text-white">
          {publishedMessageId ? (
            <>
              <DialogHeader>
                <DialogTitle className="text-white">Wiadomość {editingMessageId ? 'zaktualizowana' : 'opublikowana'}!</DialogTitle>
                <DialogDescription className="text-neutral-400">
                  Twoja wiadomość została pomyślnie {editingMessageId ? 'zaktualizowana' : 'opublikowana'}.
                </DialogDescription>
              </DialogHeader>
              <div className="py-4">
                <p>Link do wiadomości:</p>
                <Link href={`/message/${publishedMessageId}`} className="text-blue-500 hover:underline">
                  {`/message/${publishedMessageId}`}
                </Link>
              </div>
              <DialogFooter>
                <Button onClick={() => handleDialogClose(false)} className="bg-white text-black hover:bg-neutral-200 rounded-full text-sm font-medium px-4 py-1.5 h-auto">Zamknij</Button>
              </DialogFooter>
            </>
          ) : (
            <>
              <DialogHeader>
                <DialogTitle className="text-white">{editingMessageId ? 'Edytuj wiadomość' : 'Utwórz nową wiadomość'}</DialogTitle>
                <DialogDescription className="text-neutral-400">
                  {editingMessageId ? 'Zaktualizuj tytuł i treść wiadomości.' : 'Wprowadź tytuł i treść wiadomości, którą chcesz opublikować.'}
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <Input
                  id="title"
                  placeholder="Tytuł wiadomości"
                  value={editingMessageId ? editingMessageTitle : messageTitle}
                  onChange={(e) => {
                    if (editingMessageId) {
                      setEditingMessageTitle(e.target.value);
                    } else {
                      setMessageTitle(e.target.value);
                    }
                  }}
                  className="col-span-3"
                />
                <Textarea
                  id="content"
                  placeholder="Treść wiadomości"
                  value={editingMessageId ? editingMessageContent : messageContent}
                  onChange={(e) => {
                    if (editingMessageId) {
                      setEditingMessageContent(e.target.value);
                    } else {
                      setMessageContent(e.target.value);
                    };
                  }}
                  className="col-span-3 min-h-[100px]"
                />
              </div>
              <DialogFooter>
                <Button type="submit" onClick={handleSubmitMessage} className="bg-white text-black hover:bg-neutral-200 rounded-full text-sm font-medium px-4 py-1.5 h-auto">{editingMessageId ? 'Zapisz zmiany' : 'Publikuj'}</Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>

      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent className="bg-neutral-950 border-neutral-800 text-white">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-white">Czy na pewno?</AlertDialogTitle>
            <AlertDialogDescription className="text-neutral-400">
              Ta akcja jest nieodwracalna. Spowoduje to trwałe usunięcie wiadomości.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-neutral-800 text-white hover:bg-neutral-700 rounded-full text-sm font-medium px-4 py-1.5 h-auto">Anuluj</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmDelete} className="bg-red-600 text-white hover:bg-red-700 rounded-full text-sm font-medium px-4 py-1.5 h-auto">Usuń</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
