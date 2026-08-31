
export type ShippoParcelMeasurements = {
   length: string;
   width: string;
   height: string;
   distance_unit: string;
   weight: string;
   mass_unit: string;
}
export type ParcelProfileSize = "xSmall" | "small" | "shoeBox" | "medium" | "large"

export const parcelProfiles: Record<ParcelProfileSize, ShippoParcelMeasurements> = {
   xSmall: {
      length: "15",
      width: "10",
      height: "5",
      distance_unit: "cm",
      weight: "0.25",
      mass_unit: "kg",
   },

   small: {
      length: "20",
      width: "15",
      height: "10",
      distance_unit: "cm",
      weight: "0.5",
      mass_unit: "kg",
   },

   shoeBox: {
      length: "35",
      width: "22",
      height: "13",
      distance_unit: "cm",
      weight: "1",
      mass_unit: "kg",
   },

   medium: {
      length: "45",
      width: "35",
      height: "20",
      distance_unit: "cm",
      weight: "2",
      mass_unit: "kg",
   },

   large: {
      length: "60",
      width: "45",
      height: "35",
      distance_unit: "cm",
      weight: "5",
      mass_unit: "kg",
   }
};

export function getParcelSize (parcelProfileSize: ParcelProfileSize) {
   return parcelProfiles[parcelProfileSize];
}


export type RoyalMailParcelSize = {
   name: string;
   value: string;
   maxWeightGrams: number;
   maxLengthCm: number;
   maxWidthCm: number;
   maxDepthCm: number;
}
export type RoyalMailParcelSizeProfile = "smallParcel" | "mediumParcel";

export const royalMailParcelSizes: Record<RoyalMailParcelSizeProfile, RoyalMailParcelSize> = {
   smallParcel: {
      name: "Small Parcel",
      value: "small-parcel",
      maxWeightGrams: 2000,
      maxLengthCm: 45,
      maxWidthCm: 35,
      maxDepthCm: 16,
   },
   mediumParcel: {
      name: "Medium Parcel",
      value: "medium-parcel",
      maxWeightGrams: 20000,
      maxLengthCm: 61,
      maxWidthCm: 46,
      maxDepthCm: 46,
   },
};

export function getRoyalMailParcelSize (parcelProfileSize: RoyalMailParcelSizeProfile) {
   return royalMailParcelSizes[parcelProfileSize];
}