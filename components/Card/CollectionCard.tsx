'use client'
import "./Card.css"
import Link from "next/link";
import { Collection } from "@/types"

type CollectionCardProps = {
   collection: Collection;
}

export default function CollectionCard ({ collection }: CollectionCardProps) {
   return (
      <Link href={`/collection/${collection.collectionId}`} className="collection-card">
         <div className="text-m bold-600 full">{collection.name}</div>
      </Link>
   )
}
