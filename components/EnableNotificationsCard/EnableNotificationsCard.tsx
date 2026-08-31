'use client'
import { CSSProperties, useEffect, useState } from 'react'
import { enableNotifications } from '@/utils/notifications'
import { getCurrentUser } from '@/app/actions/user'
import Card from '../Card/Card'
import { websiteConfig } from '@/config/websiteConfig'

export default function EnableNotificationsCard () {
   const [enabledNotifications, setEnabledNotifications] = useState<boolean | null>(null);

   useEffect(() => {
      if (localStorage.getItem(websiteConfig.notificationsKey)) {
         setEnabledNotifications(true);
      } else {
         setEnabledNotifications(false);
      }
   }, [])

   const cardStyles: CSSProperties = {
      background: "white", color: "black",
      borderRadius: "15px", border: "1px solid #efefef",
      padding: "15px", boxShadow: "none"
   }

   if (enabledNotifications == null) return null;

   async function enablePushNotifications () {
      const user = await getCurrentUser();
      if (user == null) return;
      await enableNotifications(user.email);
      setEnabledNotifications(true);
   }

   if (!enabledNotifications) {
      return (
         <div className="box full dfb justify-center pd-2">
            <div className="box full mw-1200 pdx-2">
               <div className="box full pd-1">
                  <Card styles={cardStyles}>
                     <div className="box full dfb column pdx-1 pd-1">
                        <div className="text-xs bold-600 full">Enable Message Notifications?</div>
                        <div className="text-xxxxs full grey-5">Get notified on your phone once you receive a message from a customer</div>
                        <div className="box full mt-1">
                           <button className="xxxs pd-1 pdx-2" onClick={enablePushNotifications}>Enable</button>
                        </div>
                     </div>
                  </Card>
               </div>
            </div>
         </div>
      )
   } else {
      return null;
   }
}