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
    <>
      <Header />
      {children}
    </>
  );
}
