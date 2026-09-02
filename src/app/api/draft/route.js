import { draftMode } from "next/headers";
import { redirect } from "next/navigation";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get("secret");
  const slug = searchParams.get("slug");

  // Check the secret to protect the draft mode
  if (secret !== process.env.STORYBLOK_WEBHOOK_SECRET) {
    return new Response("Invalid token", { status: 401 });
  }

  // Enable Draft Mode
  const draft = await draftMode();
  draft.enable();

  // Redirect to the requested page (or home if empty)
  redirect(`/${slug || ""}`);
}
