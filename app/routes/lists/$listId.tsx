import type { ActionArgs, LoaderArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form, useCatch, useLoaderData } from "@remix-run/react";
import invariant from "tiny-invariant";

import { deleteGiftList, getGiftList } from "~/models/giftLists.server";
import { requireUserId } from "~/session.server";

export async function loader({ request, params }: LoaderArgs) {
  const userId = await requireUserId(request);
  invariant(params.listId, "gift list not found");

  const giftList = await getGiftList({ userId, id: params.listId });
  if (!giftList) {
    throw new Response("Not Found", { status: 404 });
  }
  return json({ giftList });
}

export async function action({ request, params }: ActionArgs) {
  const userId = await requireUserId(request);
  invariant(params.listId, "gift list not found");

  await deleteGiftList({ userId, id: params.listId });

  return redirect("/lists");
}

export default function GiftListDetailsPage() {
  const data = useLoaderData<typeof loader>();

  return (
    <div>
      <h3 className="text-2xl font-bold">{data.giftList.name}</h3>
      <hr className="my-4" />
      <Form method="post">
        <button
          type="submit"
          className="rounded bg-blue-500  py-2 px-4 text-white hover:bg-blue-600 focus:bg-blue-400"
        >
          Delete
        </button>
      </Form>
      <div>
        {data.giftList.gifts.map(({ gift }) => (
          <a href={gift.link} key={gift.id}>
            <div>
              <h1>{gift.title}</h1>
              <img src={gift.imageUrl} />
              <p>{gift.notes}</p>
              {gift.createdAt}
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}

export function ErrorBoundary({ error }: { error: Error }) {
  console.error(error);

  return <div>An unexpected error occurred: {error.message}</div>;
}

export function CatchBoundary() {
  const caught = useCatch();

  if (caught.status === 404) {
    return <div>Note not found</div>;
  }

  throw new Error(`Unexpected caught response with status: ${caught.status}`);
}
