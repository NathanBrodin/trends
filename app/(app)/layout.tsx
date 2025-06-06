import { Noise } from "@/components/backgrounds/noise";
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
      <main className="grid-border-color mx-3 flex grow flex-col border-r border-l md:mx-8 lg:mx-12">
        {children}
      </main>
      <Noise />
      <div className="bg-cream-200/12 absolute top-0 left-0 z-[-1] h-full w-3 md:w-8 lg:w-12 dark:bg-[hsl(218,_13%,_5%,_0.2)]" />
      <div className="bg-cream-200/12 absolute top-0 right-0 z-[-1] h-full w-3 md:w-8 lg:w-12 dark:bg-[hsl(218,_13%,_5%,_0.2)]" />
      <Footer />
    </div>
  );
}
