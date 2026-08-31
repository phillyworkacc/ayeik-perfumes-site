export type ShippoRate = {
   object_id: string;
   provider: string;
   provider_image_75: string;
   amount: string;
   currency: string;
   estimated_days?: number;
   duration_terms?: string;
   servicelevel: {
      name: string;
      token: string;
   };
};

export type ShippoShipment = {
   object_id: string;
   status: string;
   rates: ShippoRate[];
};

export type ShippoTransaction = {
   object_id: string;
   status:
      | "WAITING"
      | "QUEUED"
      | "SUCCESS"
      | "ERROR";
   test: boolean;
   tracking_number?: string;
   tracking_url_provider?: string;
   label_url?: string;
   messages?: {
      source?: string;
      code?: string;
      text?: string;
   }[];
   rate?: {
      amount: string;
      currency: string;
      provider: string;
      servicelevel_name: string;
   };
};