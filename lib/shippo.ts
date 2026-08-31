const SHIPPO_API_URL = "https://api.goshippo.com";

export async function shippoFetch<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
   const response = await fetch(`${SHIPPO_API_URL}${endpoint}`, {
         ...options,
         headers: {
            "Authorization": `ShippoToken ${process.env.SHIPPO_API_KEY!}`,
            "Content-Type": "application/json",
            "SHIPPO-API-VERSION": "2018-02-08",
            ...options.headers,
         },
      }
   );

   const result = await response.json();
   if (!response.ok) {
      console.error("Shippo error:", result);
      throw new Error(result?.detail ?? "Shippo request failed");
   }

   return result;
}