function Footer() {
  return (
    <footer className="border-t border-slate-100 bg-white">
      <div className="max-w-6xl mx-auto flex items-center justify-center h-16 px-5 gap-3">
        <span className="text-sm text-slate-400">© {new Date().getFullYear()} Herb Corp.</span>
      </div>
    </footer>
  );
}

export default Footer;
