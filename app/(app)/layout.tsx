import { Footer } from "./_components/footer";
import { Header } from "./_components/header";
import { auth } from "@clerk/nextjs/server";

export default async function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { userId, redirectToSignIn } = await auth();

  if (!userId) return redirectToSignIn();

  return (
    <div className="relative flex min-h-screen w-screen flex-none flex-col justify-between">
      <Header />
      <main className="grid-border-color mx-3 grow border-r border-l md:mx-8 lg:mx-12">
        {children}
      </main>
      <Footer />
    </div>
  );
}
