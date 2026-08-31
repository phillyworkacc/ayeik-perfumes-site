"use client"
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, PackageSearch, Printer } from "lucide-react";
import { toast } from "sonner";
import { Order, OrderLineItem, Product } from "@/types";
import { CustomSelect } from "@/components/Select/Select";
import { ParcelProfileSize, RoyalMailParcelSizeProfile, royalMailParcelSizes } from "@/utils/parcelSizes";
import { titleCase } from "@/lib/str";
import { createRoyalMailOrder } from "@/app/actions/admin";
import { formatNumber } from "@/utils/num";
import { ShippoRate } from "@/shippoTypes";
import { getOrderLineInfo } from "@/app/actions/admin";
import Spacing from "@/components/Spacing/Spacing";
import AwaitButton from "@/components/AwaitButton/AwaitButton";
import Card from "@/components/Card/Card";
import sanitise from "@/utils/sanitise";
import Link from "next/link";
import { CustomImgIcon } from "@/components/Icons/Icon";

type OrderCardViewProps = {
   orders: Order[];
   currentOrderIndex: number;
   makeUpdate: (order: Order) => void;
}

const royalMailShippingService = [
   {
      name: "Royal Mail Tracked 24®",
      eta: "1-2 business days",
      serviceCode: "TOLP24"
   },
   {
      name: "Royal Mail Tracked 48®",
      eta: "2-3 business days",
      serviceCode: "TOLP48"
   },
]

export default function OrderCardView ({ orders, currentOrderIndex, makeUpdate }: OrderCardViewProps) {
   const [allOrders, setAllOrders] = useState<Order[]>(orders);
   const [viewingIndex, setViewingIndex] = useState<number>(currentOrderIndex);

   // get shipping rates state
   const [parcelProfileSize, setParcelProfileSize] = useState<RoyalMailParcelSizeProfile>("smallParcel");
   const parcelProfileSizesOptions = (Object.keys(royalMailParcelSizes) as any).map((key: RoyalMailParcelSizeProfile) => {
      const { maxWidthCm: width, maxDepthCm: height, maxLengthCm: length, name } = royalMailParcelSizes[key];
      return {
         option: <div className="box dfb column">
            <div className="text-xxxs bold-600 full">{titleCase(name)}</div>
            <div className="text-xxxxs grey-5 full">
               W: {width}cm, L: {length}cm, H: {height}cm
            </div>
         </div>,
         optionName: key
      }
   })
   const [weight, setWeight] = useState("0");
   const [serviceCode, setServiceCode] = useState((allOrders[viewingIndex].shippingCharged!/100 > 4) ? 0 : 1);
   // IMPORTANT: Commented code is for shippo shipping
   // const [rates, setRates] = useState<ShippoRate[]>([]);
   // const [rateChosen, setRateChosen] = useState(0);
   
   async function handleCreateRoyalMailOrder (callback: Function) {
      if (!weight) {
         toast.error("Please enter the weight of the parcel");
         callback();
         return;
      }
      if (!(parseFloat(weight) > 0)) {
         toast.error("Please enter a higher weight for the parcel");
         callback();
         return;
      }
      const order = allOrders[viewingIndex];
      const result = await createRoyalMailOrder(order, royalMailShippingService[serviceCode].serviceCode, parseFloat(weight));
      if (result) {
         toast.success("RoyalMail Order Created");
         setAllOrders(prev => prev.map((order, index) => {
            return (viewingIndex === index) ? { ...order, royalMailOrderId: result } : order
         }))
      } else {
         toast.error("Failed to create RoyalMail Order");
      }
      callback();
   }

   // async function handleGetShippingRates (callback: Function) {
   //    const shippingRates = await getShippoShippingRates(allOrders[viewingIndex].orderId, sanitise(getParcelSize(parcelProfileSize)));
   //    console.log(shippingRates);
   //    console.log(shippingRates.data);
   //    if (shippingRates.success) {
   //       if (shippingRates.data?.rates?.length! < 1) {
   //          toast.error("Couldn't find any rates, Please try again later.")
   //       } else {
   //          setRates(shippingRates.data?.rates!);
   //          setAllOrders(prev => ([
   //             ...prev.map(order => {
   //                if (order.orderId !== allOrders[viewingIndex].orderId) return order;
   //                return { ...allOrders[viewingIndex], shippoShipmentId: shippingRates.data?.shipmentId! };
   //             })
   //          ]))
   //       }
   //    } else {
   //       toast.error("Failed to get shipping rates. Please try again later.");
   //    }
   //    callback();
   // }

   // async function handleBuyShippingRate (callback: Function) {
   //    const bought = await buyShippoShippingRates(allOrders[viewingIndex].orderId, rates[rateChosen].object_id);
   //    if (bought.success) {
   //       toast.success("Created Shipping Label");
   //       setAllOrders(prev => ([
   //          ...prev.map(order => {
   //             if (order.orderId !== allOrders[viewingIndex].orderId) return order;
   //             return { ...allOrders[viewingIndex], ...bought.data, shippoShipmentId: allOrders[viewingIndex].shippoShipmentId };
   //          })
   //       ]))
   //       makeUpdate({ ...allOrders[viewingIndex], ...bought.data, shippoShipmentId: allOrders[viewingIndex].shippoShipmentId })
   //    } else {
   //       toast.error(bought.error);
   //    }
   //    callback();
   // }

   function gotoPreviousOrder () {
      if (viewingIndex === 0) return;
      setViewingIndex(i => i-1);
   }
   
   function gotoNextOrder () {
      if (viewingIndex === (allOrders.length-1)) return;
      setViewingIndex(i => i+1);
   }

   const shippingCardStyles: React.CSSProperties = {
      width: "100%", maxWidth: "550px", padding: "25px",
      borderRadius: "20px", boxShadow: "none"
   }
   
   // function convertRatesToOptions () {
   //    return rates.map(rate => ({
   //       option: <div className="box dfb align-center gap-10">
   //          <div className="box fit h-full">
   //             <img src={rate.provider_image_75!} width={45} />
   //          </div>
   //          <div className="box full dfb column">
   //             <div className="text-xxs bold-600 full">{rate.provider}</div>
   //             <div className="text-xxxs bold-500 full">{rate.servicelevel.name}</div>
   //             {rate.estimated_days && (
   //                <div className="text-xxxs gey-5 full">
   //                   Around{" "}
   //                   {rate.estimated_days} days
   //                </div>
   //             )}
   //             <div className="text-xxxs gey-5 full">
   //                {formatNumber(parseInt(rate.amount), { prefix: "£", showDecimals: true, decimalPlaces: 2, useCommas: true })}
   //             </div>
   //          </div>
   //       </div>,
   //       optionName: rate.object_id
   //    }))
   // }

   // function handlePrintShippingLabel () {
   //    if (!allOrders[viewingIndex].shippingLabelUrl) {
   //       toast.error("Shipping Label Not Found");
   //       return;
   //    }
   //    window.open(allOrders[viewingIndex].shippingLabelUrl!, "_blank");
   // }

   return (
      <div className="box full dfb column gap-10">
         <div className="box full dfb align-center gap-10 pd-1">
            <button 
               className="xs grey no-shadow pd-1 pdx-1" 
               onClick={gotoPreviousOrder}
               disabled={(viewingIndex === 0)}
            ><ChevronLeft size={16} /></button>
            <button 
               className="xs grey no-shadow pd-1 pdx-1" 
               onClick={gotoNextOrder}
               disabled={(viewingIndex === (allOrders.length-1))}
            ><ChevronRight size={16} /></button>
         </div>
         <div className="text-xl bold-700 full">Order #{allOrders[viewingIndex].id}</div>

         <div className="box full dfb column">
            <div className="text-xs bold-700 full pd-05">Customer Email</div>
            <div className="text-xs full">{allOrders[viewingIndex].email}</div>
         </div>

         <div className="box full dfb column">
            <div className="text-xs bold-700 full pd-05">Address</div>
            <div className="text-xs full">{allOrders[viewingIndex].addressLine1}</div>
            {allOrders[viewingIndex].addressLine2 && (<div className="text-s full">{allOrders[viewingIndex].addressLine2}</div>)}
            <div className="text-xs full">{allOrders[viewingIndex].addressCity}</div>
            <div className="text-xs full">{allOrders[viewingIndex].addressPostcode}</div>
         </div>

         <Spacing />
         <div className="text-ml bold-700 full">Order Items</div>
         <OrderProducts orderId={allOrders[viewingIndex].orderId!} />

         <Spacing size={2} />
         <div className="text-ml bold-700 full">Royal Mail Shipping</div>
         {(!allOrders[viewingIndex].royalMailOrderId) ? (<>
            <div className="box full dfb wrap gap-10">
               <Card styles={shippingCardStyles}>
                  <div className="box full pd-05"><RoyalMailIcon width={75} /></div>
                  <div className="text-s bold-700 full">Shipping Type</div>
                  <div className="text-xxs">
                     Customer Shipping Paid: {" "}
                     <b>
                        {formatNumber(allOrders[viewingIndex].shippingCharged!/100, { prefix: "£", showDecimals: true, decimalPlaces: 2, useCommas: true })}
                     </b>
                  </div>

                  <div className="box full pd-15 dfb column gap-5">
                     <div className="text-xs bold-600">Parcel Size</div>
                     <CustomSelect
                        options={parcelProfileSizesOptions}
                        onSelect={(option) => setParcelProfileSize(option)}
                        defaultOptionIndex={0} style={{ width: "100%" }}
                     />
                  </div>

                  <div className="box full pd-15 dfb column gap-5">
                     <div className="text-xs bold-600">Total Weight (kg)</div>
                     <input 
                        type="number" className="xxs pd-13 pdx-15 radius-15 full"
                        placeholder="Weight" value={weight} onChange={e => setWeight(e.target.value)}
                     />
                  </div>

                  <div className="box full pd-15 dfb column gap-5">
                     <div className="text-xs bold-600">Shipping Service</div>
                     <CustomSelect
                        options={royalMailShippingService.map(shippingService => ({
                           option: (<div className="box full dfb align-start gap-10 pd-05">
                              <RoyalMailIcon width={25} />
                              <div className="box full dfb column">
                                 <div className="text-xxs bold-600 full">{shippingService.name}</div>
                                 <div className="text-xxxs grey-5 bold-500 full">{shippingService.eta}</div>
                              </div>
                           </div>),
                           optionName: shippingService.serviceCode
                        }))}
                        onSelect={(_, index) => setServiceCode(index!)}
                        defaultOptionIndex={0}
                        style={{ width: "100%" }}
                     />
                  </div>

                  <div className="box full pd-1">
                     <AwaitButton className="xxxs pd-12 pdx-2" onClick={handleCreateRoyalMailOrder}>Create RoyalMail Order</AwaitButton>
                  </div>
               </Card>
            </div>
         </>) : (<>
            <Card styles={shippingCardStyles}>
               <div className="box full pd-05"><RoyalMailIcon width={75} /></div>
               <div className="text-s bold-700 full">Complete Shipping with Royal Mail</div>
               
               <div className="box full dfb wrap gap-10 pd-1">
                  <Link href="https://auth.parcel.royalmail.com/" target="_blank" rel="noopener noreferrer">
                     <button className="xxxs pd-12 pdx-2">Open Click & Drop to Pay & Print</button>
                  </Link>
                  {/* <Link className="box fit" href={allOrders[viewingIndex].trackingUrl!} target="_blank">
                     <button className="xxxs pd-12 pdx-2"><PackageSearch size={17} /> Track Parcel</button>
                  </Link> */}
               </div>
            </Card>
         </>)}

         <Spacing size={6} />
      </div>
   )
}

export function OrderProducts ({ orderId }: { orderId: string }) {
   const [orderProducts, setOrderProducts] = useState<OrderLineItem[]>([]);
   const [loadingItems, setLoadingItems] = useState(false);

   async function getOrderLines () {
      const orderProductsInformation = await getOrderLineInfo(orderId);
      if (orderProductsInformation === false) {
         toast.error("Failed to load order items");
      } else {
         setOrderProducts(orderProductsInformation)
         setLoadingItems(false);
      }
   }

   useEffect(() => {
      setLoadingItems(true);
      getOrderLines();
   }, [orderId]);

   const orderProductCardStyles: React.CSSProperties = {
      padding: "15px", borderRadius: "18px",
      boxShadow: "none", width: "100%", maxWidth: "350px"
   }

   return (
      <div className="box full dfb wrap gap-10">
         {loadingItems ? (<>
            <div className="text-xs bold-600 full">Loading Order Items...</div>
         </>) : (<>
            {orderProducts.map(orderProduct => (
               <Card key={orderProduct.product.productId} styles={orderProductCardStyles}>
                  <div className="box full dfb align-center gap-10">
                     <div className="box fit h-full">
                        <CustomImgIcon url={`/products/${orderProduct.product.images.split(",")[0]}`} size={45} />
                     </div>
                     <div className="box full dfb column">
                        <div className="text-xxs bold-600 full">{orderProduct.product.name}</div>
                        <div className="text-xxxs bold-500 full">Quantity: {orderProduct.quantity}</div>
                        <div className="text-xxxs bold-500 full">
                           {formatNumber(orderProduct.price/100, { prefix: "£", showDecimals: true, decimalPlaces: 2, useCommas: true })}
                        </div>
                     </div>
                  </div>
               </Card>
            ))}
         </>)}
      </div>
   )
}

function RoyalMailIcon ({ width }: { width: any }) {
   return (
      <img
         src="https://business.parcel.royalmail.com/Content/images/royalmail-logo.png"
         width={width}
      />
   )
}