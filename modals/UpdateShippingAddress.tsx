'use client'
import { useModal } from '@/components/Modal/ModalContext';
import { useState } from 'react';
import { toast } from 'sonner';
import AwaitButton from '@/components/AwaitButton/AwaitButton';
import useUser from '@/hooks/useUser';

export default function UpdateShippingAddress () {
   const { user, updateUser } = useUser();
   const { close } = useModal();
   const [shippingInfo, setShippingInfo] = useState({
      addressLine1: user?.addressLine1 || '',
      addressLine2: user?.addressLine2 || '',
      city: user?.addressCity || '',
      postcode: user?.addressPostcode || ''
   });

   async function handleUpdateUserAddress (callback: Function) {
      if ([shippingInfo.addressLine1, shippingInfo.city, shippingInfo.postcode].includes("")) {
         toast.error("Please fill all the required fields");
         callback();
         return;
      }
      await updateUser({
         ...user!,
         addressLine1: shippingInfo.addressLine1,
         addressLine2: shippingInfo.addressLine2,
         addressCity: shippingInfo.city,
         addressPostcode: shippingInfo.postcode,
      }, true, () => { close(); });
      callback();
   }

   return (
      <div className='box full pd-1 dfb column gap-15'>
         <div className="text-m full bold-600">Update Shipping Address</div>
         <div className="text-xxs grey-5 full line-height-13">Please enter your full address to ensure accurate shipping</div>
         <div className="box full dfb column gap-5">
            <input 
               type="text" className="xxs pd-13 pdx-15 full mw-500"
               placeholder="Address Line 1" value={shippingInfo.addressLine1}
               onChange={e => setShippingInfo(p => ({ ...p, addressLine1: e.target.value }))}
            />
            <input 
               type="text" className="xxs pd-13 pdx-15 full mw-500"
               placeholder="Address Line 2 (optional)" value={shippingInfo.addressLine2}
               onChange={e => setShippingInfo(p => ({ ...p, addressLine2: e.target.value }))}
            />
            <input 
               type="text" className="xxs pd-13 pdx-15 full mw-500"
               placeholder="City" value={shippingInfo.city}
               onChange={e => setShippingInfo(p => ({ ...p, city: e.target.value }))}
            />
            <input 
               type="text" className="xxs pd-13 pdx-15 full mw-500"
               placeholder="Postcode" value={shippingInfo.postcode} 
               onChange={e => setShippingInfo(p => ({ ...p, postcode: e.target.value }))}
            />
         </div>
         <div className="box full dfb align-center gap-10">
            <AwaitButton className="xs pd-14 full" onClick={handleUpdateUserAddress}>Update</AwaitButton>
            <button className="xs pd-14 full outline-black" onClick={close}>Cancel</button>
         </div>
      </div>
   )
}
