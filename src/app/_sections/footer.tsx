export default function Footer() {
  return (
    <div className="bg-linear-to-r from-card to-background mx-auto text-center px-4 mt-16 py-8 border-t border-border">
      <p className="text-secondary-foreground text-sm">
        Built by xRomory • No signup required • © {new Date().getFullYear()} Spense. All rights reserved.
      </p>
    </div>
  );
}
