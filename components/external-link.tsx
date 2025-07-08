import Link from "next/link"
import { ExternalLink as ExternalLinkIcon } from "lucide-react"

interface ExternalLinkProps {
  href: string;
  children: React.ReactNode;
}

export function ExternalLink({ href, children }: ExternalLinkProps) {
  return (
    <Link href={href} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline inline-flex items-center">
      {children}
      <ExternalLinkIcon className="inline-block ml-1 h-4 w-4" />
    </Link>
  );
}