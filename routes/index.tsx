import { Head } from "$fresh/runtime.ts";
import { Handlers } from "$fresh/server.ts";
import HomeRedirect from "../islands/HomeRedirect.tsx";

export const handler: Handlers = {
  GET(req, ctx) {
    // Server-side redirect to login page
    const url = new URL(req.url);
    const redirectUrl = `${url.origin}/login`;
    return Response.redirect(redirectUrl, 302);
  },
};

export default function Home() {
  return (
    <>
      <Head>
        <title>MilestoneTracker - Track Your Achievements</title>
        <meta name="description" content="Track personal milestones, share achievements, and compare progress with others." />
      </Head>
      <div class="flex justify-center items-center h-screen">
        <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
        <HomeRedirect />
      </div>
    </>
  );
}
