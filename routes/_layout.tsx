import { PageProps } from "$fresh/server.ts";
import { Navbar } from "../components/Navbar.tsx";

export default function Layout({ Component }: PageProps) {
  return (
    <html>
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>MilestoneTracker</title>
      </head>
      <body class="min-h-screen bg-gray-50">
        <Navbar />
        <main class="container mx-auto px-4 py-6">
          <Component />
        </main>
      </body>
    </html>
  );
}
