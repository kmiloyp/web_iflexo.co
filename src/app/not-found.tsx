import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { WhatsAppButton } from "@/components/WhatsAppButton";

export default function NotFound() {
  return (
    <section className="flex min-h-[70vh] items-center py-20">
      <Container className="max-w-2xl text-center">
        <p className="font-display text-7xl font-extrabold text-gradient sm:text-8xl">
          404
        </p>
        <h1 className="mt-4 font-display text-3xl font-bold tracking-tight sm:text-4xl">
          Esta página no existe
        </h1>
        <p className="mt-4 text-lg text-ink-soft">
          Puede que el enlace esté roto o que la página se haya movido. Volvamos
          a un lugar seguro.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button href="/" size="lg">
            Volver al inicio
          </Button>
          <Button href="/flexografia/" size="lg" variant="outline">
            Ir al blog
          </Button>
        </div>
        <div className="mt-6">
          <WhatsAppButton size="sm" variant="ghost">
            ¿Buscas algo? Escríbenos
          </WhatsAppButton>
        </div>
      </Container>
    </section>
  );
}
