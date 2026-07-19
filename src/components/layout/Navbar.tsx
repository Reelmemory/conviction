import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="fixed top-0 z-50 w-full border-b border-zinc-800 bg-black/60 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link href="/">
          <h1 className="text-xl font-bold text-white">Conviction<span className="text-amber-400">_</span></h1>
          <p className="-mt-1 font-mono text-xs text-zinc-500">narrative intelligence</p>
        </Link>
        <div className="hidden gap-8 font-mono text-xs uppercase tracking-wider text-zinc-400 md:flex">
          <Link href="/dashboard" className="hover:text-amber-400">Dashboard</Link>
          <a href="https://github.com/Reelmemory/conviction" target="_blank" rel="noopener noreferrer" className="hover:text-amber-400">GitHub</a>
        </div>
        <Link href="/dashboard" className="rounded-sm bg-amber-500 px-4 py-2 text-sm font-medium text-black transition-colors hover:bg-amber-400">Launch app</Link>
      </div>
    </nav>
  );
}