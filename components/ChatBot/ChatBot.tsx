'use client'
import "./ChatBot.css"
import { MessagesSquare } from "lucide-react"
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useModal } from "../Modal/ModalContext";
import { Logo } from "../Icons/Icon";
import { websiteConfig } from "@/config/websiteConfig";
import ChatBotForm from "@/forms/ChatBotForm";

export default function ChatBot () {
   const [displayCtaMessage, setDisplayCtaMessage] = useState(true);
   const { showModal } = useModal();

   useEffect(() => {
      const ctaTimeout = setTimeout(() => setDisplayCtaMessage(false), websiteConfig.chatBot.ctaMessageTimeout);
      return () => clearTimeout(ctaTimeout);
   }, [])

   const openChatBotBtn = () => {
      showModal({
         content: <div className="box full">
            <Logo size={30} />
            <div className="text-sm bold-600 pd-1">{websiteConfig.chatBot.ctaMessage}</div>
            <div className="box full dfb column gap-10 pd-1">
               <Logo size={15} />
               <div className="box full bg-grey-2 pd-1 pdx-1" style={{ borderRadius: "0 10px 10px 10px" }}>
                  {websiteConfig.chatBot.inbox}
               </div>
            </div>
            <ChatBotForm />
         </div>
      })
   }

   return (
      <div className="chat-bot" style={{ justifyContent: websiteConfig.chatBot.position == "left" ? "start" : "end" }}>
         <div className="chat-bot-container" onClick={openChatBotBtn}>
            <MessagesSquare size={30} />
            <AnimatePresence>
               {displayCtaMessage && (
                  <motion.div 
                     className="chat-bot-cta-message"
                     initial={{ x: websiteConfig.chatBot.position == "left" ? -300 : 300 }}
                     animate={{ x: 0 }}
                     exit={{ x: websiteConfig.chatBot.position == "left" ? -300 : 300 }}
                     transition={{ duration: 0.3, ease: "easeIn" }}
                  >
                     <div className="text-xs">
                        {websiteConfig.chatBot.ctaMessage}
                     </div>
                  </motion.div>
               )}
            </AnimatePresence>
         </div>
      </div>
   )
}
