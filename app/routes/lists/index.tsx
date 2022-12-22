import { Link } from "@remix-run/react";

export default function GiftListIndexPage() {
  return (
    <p>
      No gift list selected. Select a gift list on the left, or{" "}
      <Link to="new" className="text-blue-500 underline">
        create a new gift list.
      </Link>
    </p>
  );
}
