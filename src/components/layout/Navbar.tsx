import { Button } from "@/components/ui/button";

export default function Navbar() {
  return (
    <nav className="fixed top-0 z-50 w-full border-b border-white/10 bg-black/40 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        {/* Logo */}
        <div>
          <h1 className="text-xl font-bold text-white">Conviction</h1>
          <p className="-mt-1 text-xs text-zinc-400">
            AI Narrative Intelligence
          </p>
        </div>

        {/* Navigation */}
        <div className="hidden gap-8 text-sm text-zinc-300 md:flex">
          <a href="#" className="hover:text-purple-400">
            Features
          </a>

          <a href="#" className="hover:text-purple-400">
            Docs
          </a>

          <a href="#" className="hover:text-purple-400">
            About
          </a>
        </div>

        <Button className="bg-purple-600 hover:bg-purple-500">
          Connect Wallet
        </Button>
      </div>
    </nav>
  );
}