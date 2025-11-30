"use client";
import { tables } from "@/lib/tourney-manager";
import { useTable } from "spacetimedb/react";

export default function Home() {


  const [rows] = useTable(tables.tournament, {
    onInsert: (row) => console.log('Inserted:', row),
    onDelete: (row) => console.log('Deleted:', row),
    onUpdate: (oldRow, newRow) => console.log('Updated:', oldRow, newRow),
  });

  if (rows.length == 0) {
    return;
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <p>hello</p>

        

        <p>{rows[0].name}</p>

      </main>
    </div>
  );
}
