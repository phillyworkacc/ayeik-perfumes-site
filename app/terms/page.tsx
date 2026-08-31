'use client'
import { websiteConfig } from '@/config/websiteConfig'
import { Dot, Mail, Phone } from "lucide-react"
import CustomSection from "@/components/CustomSection/CustomSection"
import Spacing from "@/components/Spacing/Spacing"
import Link from "next/link"
import StoreWrapper from "@/components/StoreWrapper/StoreWrapper"

export default function PrivacyPolicyPage () {
   return (
      <StoreWrapper>
         <CustomSection
            bgColor="#fbfbfb" textColor="black"
            customSectionConfig={{ title: "", type: "version-1", align: "left" }}
         >  
            <div className="box full mw-1200">
               <div className="text-b full bold-700 pd-1 mt-1">Terms and Conditions</div>
               <div className="text-m full bold-600 pd-05">{websiteConfig.name}</div>
               <div className="text-s full bold-500">Last Updated: 14 January 2026</div>

               <div className="box full">
                  <Spacing />
                  <div className="text-s full pd-05 line-height-17">
                     These Terms and Conditions (“Terms”) govern your use of the website operated by <b>{websiteConfig.name}</b> (“we”, “us”, or “our”) and the services we provide.
                  </div>
                  <div className="text-s full line-height-17">
                     By using our website or engaging our services, you agree to these Terms.
                  </div>
               </div>

               <div className="box full">
                  <Spacing size={2} />
                  <div className="text-sm full pd-1 bold-600">About Us</div>
                  <div className="text-s full line-height-17">{websiteConfig.name}</div>
                  <div className="text-s full line-height-17">{websiteConfig.address}</div>
                  <div className="text-s full line-height-17">{websiteConfig.email}</div>
               </div>
               
               <div className="box full">
                  <Spacing size={2} />
                  <div className="text-sm full bold-600">Use of Our Website</div>
                  <div className="text-s full pd-05 line-height-17">You may use our website for lawful purposes only. You must not:</div>
                  <ul>
                     <li className="text-xs full line-height-17 dfb align-start">
                        <Dot /> Use the website in any way that breaches applicable UK laws or regulations
                     </li>
                     <li className="text-xs full line-height-17 dfb align-start">
                        <Dot /> Attempt to gain unauthorised access to the website or its systems
                     </li>
                     <li className="text-xs full line-height-17 dfb align-start">
                        <Dot /> Copy, reproduce, or distribute website content without permission
                     </li>
                  </ul>
                  <div className="text-s full pd-05 line-height-17">
                     We may suspend or withdraw access to our website at any time without notice.
                  </div>
               </div>
               
               <div className="box full">
                  <Spacing size={2} />
                  <div className="text-sm full bold-600">Services and Quotations</div>
                  <ul>
                     <li className="text-xs full line-height-17 dfb align-start"><Dot /> Any information provided on our website is for general guidance only</li>
                     <li className="text-xs full line-height-17 dfb align-start"><Dot /> Quotes or estimates are provided based on the information available at the time</li>
                     <li className="text-xs full line-height-17 dfb align-start"><Dot /> Final pricing may change if the scope of work changes or unforeseen issues arise</li>
                     <li className="text-xs full line-height-17 dfb align-start"><Dot /> All services are subject to availability</li>
                  </ul>
                  <div className="text-s full pd-05 line-height-17">Unless otherwise agreed in writing, quotes are valid for [e.g. 30 days].</div>
               </div>
               
               <div className="box full">
                  <Spacing size={2} />
                  <div className="text-sm full bold-600">Appointments and Cancellations</div>
                  <ul>
                     <li className="text-xs full line-height-17 dfb align-start"><Dot /> Appointment times are estimates and may be affected by factors outside our control</li>
                     <li className="text-xs full line-height-17 dfb align-start"><Dot /> If you need to cancel or reschedule, please provide reasonable notice</li>
                     <li className="text-xs full line-height-17 dfb align-start"><Dot /> We reserve the right to charge for missed appointments or late cancellations where applicable</li>
                  </ul>
               </div>
               
               <div className="box full">
                  <Spacing size={2} />
                  <div className="text-sm full bold-600">Payment Terms</div>
                  <ul>
                     <li className="text-xs full line-height-17 dfb align-start"><Dot /> Payment terms will be agreed before work begins</li>
                     <li className="text-xs full line-height-17 dfb align-start"><Dot /> Payment is due upon completion of services unless otherwise agreed in writing</li>
                     <li className="text-xs full line-height-17 dfb align-start"><Dot /> Late payments may result in additional charges or suspension of future services</li>
                  </ul>
               </div>
               
               <div className="box full">
                  <Spacing size={2} />
                  <div className="text-sm full bold-600">Customer Responsibilities</div>
                  <div className="text-s full pd-05 line-height-17">You agree to:</div>
                  <ul>
                     <li className="text-xs full line-height-17 dfb align-start"><Dot /> Provide accurate information about the property and work required</li>
                     <li className="text-xs full line-height-17 dfb align-start"><Dot /> Ensure safe and reasonable access to the property</li>
                     <li className="text-xs full line-height-17 dfb align-start"><Dot /> Inform us of any known hazards, restrictions, or special requirements</li>
                  </ul>
                  <div className="text-s full pd-05 line-height-17">We are not responsible for delays or issues caused by incomplete or inaccurate information.</div>
               </div>
               
               <div className="box full">
                  <Spacing size={2} />
                  <div className="text-sm full bold-600">Intellectual Property</div>
                  <div className="text-s full pd-05 line-height-17">
                     All content on this website, including text, logos, images, and designs, is owned by or licensed to {websiteConfig.name} and may not be used without prior written consent.
                  </div>
               </div>
               
               <div className="box full">
                  <Spacing size={2} />
                  <div className="text-sm full bold-600">Limitation of Liability</div>
                  <div className="text-s full pd-05 line-height-17">To the fullest extent permitted by UK law:</div>
                  <ul>
                     <li className="text-xs full line-height-17 dfb align-start"><Dot /> We are not liable for any indirect, incidental, or consequential losses</li>
                     <li className="text-xs full line-height-17 dfb align-start"><Dot /> We are not responsible for losses caused by events beyond our reasonable control</li>
                     <li className="text-xs full line-height-17 dfb align-start"><Dot /> Nothing in these Terms limits liability for death or personal injury caused by negligence, fraud, or any other liability that cannot be excluded under UK law</li>
                  </ul>
               </div>
               
               <div className="box full">
                  <Spacing size={2} />
                  <div className="text-sm full bold-600">Warranties and Guarantees</div>
                  <div className="text-s full pd-05 line-height-17">
                     Any guarantees or warranties provided will be clearly communicated in writing and apply only to the specific services agreed.
                  </div>
                  <div className="text-s full pd-05 line-height-17">
                     Statutory consumer rights under UK law are not affected.
                  </div>
               </div>
               
               <div className="box full">
                  <Spacing size={2} />
                  <div className="text-sm full bold-600">Third-Party Links</div>
                  <div className="text-s full pd-05 line-height-17">
                     Our website may contain links to third-party websites. We are not responsible for the content, policies, or practices of those websites.
                  </div>
               </div>
               
               <div className="box full">
                  <Spacing size={2} />
                  <div className="text-sm full bold-600">Privacy and Data Protection</div>
                  <div className="text-s full pd-05 line-height-17">
                     Your use of our website and services is also governed by our Privacy Policy, which explains how we collect and use personal data in accordance with UK GDPR.
                  </div>
               </div>
               
               <div className="box full">
                  <Spacing size={2} />
                  <div className="text-sm full bold-600">Changes to These Terms</div>
                  <div className="text-s full pd-05 line-height-17">
                     We may update these Terms from time to time. Any changes will take effect once published on this page.
                  </div>
               </div>
               
               <div className="box full">
                  <Spacing size={2} />
                  <div className="text-sm full bold-600">Governing Law</div>
                  <div className="text-s full pd-05 line-height-17">
                     These Terms are governed by and construed in accordance with the laws of <b>England and Wales</b>. Any disputes will be subject to the exclusive jurisdiction of the courts of England and Wales.
                  </div>
               </div>
               
               <div className="box full">
                  <Spacing size={2} />
                  <div className="text-sm full bold-600">Contact Us</div>
                  <div className="text-s full pd-05 line-height-17 mb-05">
                     If you have any questions about this Privacy Policy or how we handle your data, please contact:
                  </div>
                  <div className="text-s full pd-05 line-height-11 bold-500">{websiteConfig.name}</div>
                  <div className="text-s full pd-05 line-height-11 bold-500 visible-link dfb align-center gap-5">
                     <Mail size={15} /> <Link href={`mailto:${websiteConfig.email}`}>{websiteConfig.email}</Link>
                  </div>
               </div>

            </div>
         </CustomSection>
      </StoreWrapper>
   )
}
