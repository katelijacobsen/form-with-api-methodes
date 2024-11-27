import { postSubscribers } from "../app/supabase";
import { revalidatePath } from "next/cache";

async function Newsletter() {
  //asynkronsk funktion
  async function postData(formData) {
    //køres på server
    "use server";
    const subData = {
      name: formData.get("name"),
      email: formData.get("email"),
    };
    await postSubscribers(subData);

    // Når bruger udfylder, gemmes det i funktionen & genopfrisker siden.
    revalidatePath("/");
  }
  return (
    <form
      action={postData}
      className="flex flex-col items-center gap-4 bg-gradient-to-tr from-gray-900 to-gray-800 py-6 px-4 border border-gray-700 rounded-md"
    >
      <fieldset className="flex flex-col gap-12 ">
        <label htmlFor="name" className="flex flex-col font-bold text-xl">
          Name
          <input
            className="p-2 rounded-sm font-thin text-base text-gray-800"
            required
            placeholder="Enter your name"
            id="name"
            name="name"
            type="text"
          />
        </label>
        <label htmlFor="email" className="flex flex-col font-bold text-xl">
          E-mail
          <input
            className="p-2 rounded-sm font-thin text-base text-gray-800"
            required
            placeholder="Enter your email"
            id="email"
            name="email"
            type="email"
          />
        </label>
      </fieldset>
      <button
        className="rounded-md bg-gradient-to-tr from-indigo-900 to-indigo-700 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-indigo-700 focus:shadow-none active:bg-indigo-700 hover:bg-indigo-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
        type="submit"
      >
        Subscribe
      </button>
    </form>
  );
}

export default Newsletter;
