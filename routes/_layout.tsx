import { PageProps } from "$fresh/server.ts";
import { Navbar } from "../components/Navbar.tsx";

export default function Layout({ Component }: PageProps) {
  return (
    <div class="min-h-screen bg-gray-50">
      <Navbar />
      <main class="container mx-auto px-4 py-6">
        <Component />
      </main>
    </div>
  );
}
