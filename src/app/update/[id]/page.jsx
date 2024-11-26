// import { getSubscribtions } from "@/lib/supabase";

import {
  getSubscribtions,
  getSubscriber,
  patchSubscribers,
  deleteSubscriber,
} from "@/lib/supabase"; //fetches
import { revalidatePath } from "next/cache"; // update & refresh
import { redirect } from "next/navigation"; //redirecter tilbage til page
import Link from "next/link"; //don't forget this little devil.

export default async function Subscriber({ params }) {
  const { id } = await params;

  const subscriber = await getSubscriber(id);

  async function handlePatch(formData) {
    //køres på server
    "use server";
    const subData = {
      name: formData.get("name"),
      email: formData.get("email"),
    };
    await patchSubscribers(id, subData);

    // Når bruger udfylder, gemmes det i funktionen & genopfrisker siden.
    revalidatePath("/");
    redirect("/");
  }

  async function handleDelete() {
    "use server";

    await deleteSubscriber(id);

    revalidatePath("/");
    redirect("/");
  }

  return (
    <main>
      <form
        action={handlePatch}
        className="flex flex-col items-center gap-4 bg-gradient-to-tr from-gray-900 to-gray-800 py-6 px-4 border border-gray-700 rounded-md"
      >
        <fieldset className="flex flex-col gap-12 ">
          <label htmlFor="name" className="flex flex-col font-bold text-xl">
            Name
            <input
              className="p-2 rounded-sm font-thin text-base text-black"
              required
              placeholder="Enter your name"
              id="name"
              name="name"
              type="text"
              defaultValue={subscriber.name}
            />
          </label>
          <label htmlFor="email" className="flex flex-col font-bold text-xl ">
            E-mail
            <input
              className="p-2 rounded-sm font-thin text-base text-black"
              required
              placeholder="Enter your email"
              id="email"
              name="email"
              type="email"
              defaultValue={subscriber.email}
            />
          </label>
        </fieldset>
        <div className="flex gap-3">
          <button
            className="rounded-md bg-gradient-to-tr from-green-900 to-green-700 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-indigo-700 focus:shadow-none active:bg-indigo-700 hover:bg-indigo-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            type="submit"
            formAction={handlePatch}
          >
            Save
          </button>
          <button
            className="rounded-md bg-gradient-to-tr from-red-900 to-red-700 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-indigo-700 focus:shadow-none active:bg-indigo-700 hover:bg-indigo-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            type="submit"
            formAction={handleDelete}
          >
            Delete
          </button>
        </div>
      </form>
    </main>
  );
}
