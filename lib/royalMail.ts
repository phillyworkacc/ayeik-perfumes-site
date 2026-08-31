const ROYAL_MAIL_BASE_URL = "https://api.parcel.royalmail.com/api/v1";

export async function royalMailFetch(path: string, options: RequestInit = {}) {
   const response = await fetch(`${ROYAL_MAIL_BASE_URL}${path}`, {
      ...options,
      headers: {
         Authorization: process.env.ROYAL_MAIL_API_KEY!,
         "Content-Type": "application/json",
         ...options.headers,
      },
      cache: "no-store",
   });

   if (!response.ok) {
      const error = await response.text();
      throw new Error(`Royal Mail API error ${response.status}: ${error}`);
   }

   return response;
}