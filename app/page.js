import Link from "next/link";
import { getSubscribtions } from "./supabase";
import Newsletter from "../components/Newsletter";


export default async function Home() {
  const subscribers = await getSubscribtions();
  console.log(subscribers);
  
  return (
    <main className="bg-gradient-to-tr from-gray-900 to-black gap-6 flex flex-col justify-center items-center min-h-screen p-4">
    <h1 className="text-4xl sm:text-5xl md:text-6xl text-white font-bold mb-6 text-center">
      Subscribe to our Newsletter!
    </h1>
    <Newsletter/>
    <ul className="bg-indigo-600 p-5 rounded-md w-full sm:w-3/4 md:w-2/3 lg:w-1/2 grid grid-cols-3 gap-4">
      {subscribers.map((subscriber) => {
        return (
          <li
            key={subscriber.id}
            className="flex flex-col bg-gradient-to-tr from-gray-100 to-gray-300 text-gray-700 py-6 px-6 rounded-lg mb-4 shadow-lg hover:shadow-2xl transition-shadow duration-300"
          >
            <p className="font-bold text-xl text-gray-800">{subscriber.name}</p>
            <p className="text-gray-700">{subscriber.email}</p>
            <Link
              href={`./update/${subscriber.id}`}
              className="mt-4 inline-block text-center text-sm text-white py-2 px-4 rounded-md bg-gradient-to-tr from-indigo-900 to-indigo-700 hover:bg-indigo-600 transition-colors duration-200"
            >
              Change Profile
            </Link>
          </li>
        );
      })}
    </ul>
  </main>
  );
};

