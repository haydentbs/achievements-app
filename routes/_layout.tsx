import { PageProps } from "$fresh/server.ts";
import { Head } from "$fresh/runtime.ts";
import { AuthProvider } from "../islands/AuthContext.tsx";
import { Navbar } from "../islands/Navbar.tsx";

export default function Layout({ Component }: PageProps) {
  return (
    <>
      <Head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>MilestoneTracker</title>
        <link rel="stylesheet" href="/styles.css" />
      </Head>
      <AuthProvider>
        <div class="min-h-screen bg-gray-50">
          <Navbar />
          <main class="container mx-auto px-4 py-6">
            <Component />
          </main>
        </div>
      </AuthProvider>
    </>
  );
}
