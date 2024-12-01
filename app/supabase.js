'use server';
// url & key hentes fra .env.local, variabler
const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// anmodning
const headersList = {
  // ønsker data i JSON-format
  Accept: "application/json",
  // autentificere anmodning
  apikey: key,
  //Præference til serveren om, hvordan data skal returneres.
  Prefer: "return=representation",
  //Send som JSON data.
  "Content-Type": "application/json",
};


export async function getSubscriber(id) {
  //finder subscriber med den givende id
  const response = await fetch(`${url}?id=eq.${id}`, {
    method: "GET", headers: headersList
  });

  // Når konverteringen er færdig så vis formatet.
  const data = await response.json();
  // færdigparset svar fra serveren
  return data[0];
}

// Definere vores funktion, som skal exporteres andre steder i projektet
// vi skriver også async, så den kan håndtere asynkrone operationer
export async function getSubscribtions() {
  const response = await fetch(url, {
    // henter data
    method: "GET",
    // inkludere oplysninger, der konfigureres i headersList
    headers: headersList,
  });

  

  // Når konverteringen er færdig så vis formatet.
  const data = await response.json();
  // færdigparset svar fra serveren
  return data;
}

export async function postSubscribers(subData) {
  const response = await fetch(url, {
    method: "POST",
    headers: headersList,
    body: JSON.stringify(subData),
  });

  const data = await response.json();
  return data;
}

export async function patchSubscribers(id, updateUser) {
  const response = await fetch(`${url}?id=eq.${id}`, {
    method: "PATCH",
    headers: headersList,
    body: JSON.stringify(updateUser),
  });

  const data = await response.json();
  return data;
}

export async function deleteSubscriber(id) {
  const response = await fetch(`${url}?id=eq.${id}`, {
    method: "DELETE",
    headers: headersList,
  });

  const data = await response.json();
  return data;
}
