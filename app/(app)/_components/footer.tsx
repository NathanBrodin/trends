import { Noise } from "@/components/backgrounds/noise";
import { Diamond } from "@/components/ui/diamond";
import { Link } from "@/components/ui/link";

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground relative">
      <Noise variant="lighter" />
      <div className="relative mx-3 flex border-x border-white/10 px-4 py-2 sm:px-6 md:mx-8 lg:mx-12">
        <Diamond top left />
        <Diamond top right />
        <div className="flex w-full justify-between">
          <p className="text-xs leading-5">Nathan Brodin © 2025</p>
          <p className="flex gap-1 text-xs leading-5">
            <Link href="https://github.com/NathanBrodin/trends">GitHub</Link>
            {" · "}
            <Link className="hidden sm:flex" href="https://zed.dev/">
              Thanks Zed for the UI
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
