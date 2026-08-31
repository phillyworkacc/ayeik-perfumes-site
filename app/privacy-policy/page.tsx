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
               <div className="text-b full bold-700 pd-1 mt-1">Privacy Policy</div>
               <div className="text-m full bold-600 pd-05">{websiteConfig.name}</div>
               <div className="text-s full bold-500">Last Updated: 14 January 2026</div>

               <div className="box full">
                  <Spacing />
                  <div className="text-s full pd-05 line-height-17">
                     This Privacy Policy explains how <b>{websiteConfig.name}</b> (“we,” “us,” or “our”) collects, uses, and protects your information when you visit our website or contact us through our services.
                  </div>
                  <div className="text-s full line-height-17">
                     We are committed to protecting your privacy and handling your data in accordance with the UK General Data Protection Regulation (UK GDPR) and the Data Protection Act 2018.
                  </div>
               </div>

               <div className="box full">
                  <Spacing size={2} />
                  <div className="text-sm full pd-1 bold-600">Who We Are</div>
                  <div className="text-s full line-height-17">{websiteConfig.name}</div>
                  <div className="text-s full line-height-17">{websiteConfig.address}</div>
                  <div className="text-s full line-height-17">{websiteConfig.email}</div>
                  <div className="text-s full line-height-17 mt-1">For the purposes of data protection law, we are the Data Controller of your personal data.</div>
               </div>
               
               <div className="box full">
                  <Spacing size={2} />
                  <div className="text-sm full bold-600">Personal Data We Collect</div>
                  <div className="text-s full pd-05 line-height-17">When you use our website or contact us, we may collect the following information:</div>
                  <ul>
                     <li className="text-xs full line-height-17 dfb align-center">
                        <Dot /> Name
                     </li>
                     <li className="text-xs full line-height-17 dfb align-center">
                        <Dot /> Phone number
                     </li>
                     <li className="text-xs full line-height-17 dfb align-center">
                        <Dot /> Email address
                     </li>
                     <li className="text-xs full line-height-17 dfb align-center">
                        <Dot /> Service address (if provided)
                     </li>
                     <li className="text-xs full line-height-17 dfb align-start">
                        <Dot /> <span className="text-xs whitespace-nowrap">Details of your enquiry or service request</span> 
                     </li>
                  </ul>
                  <div className="text-s full pd-05 line-height-17">
                     We do not collect sensitive personal information such as payment card numbers or government-issued identification through our website unless explicitly stated.
                  </div>
               </div>
               
               <div className="box full">
                  <Spacing size={2} />
                  <div className="text-sm full bold-600">How We Use Your Information</div>
                  <div className="text-s full pd-05 line-height-17">We use the information we collect to:</div>
                  <ul>
                     <li className="text-xs full line-height-17 dfb align-start"><Dot /> Respond to enquiries and provide quotes</li>
                     <li className="text-xs full line-height-17 dfb align-start"><Dot /> Arrange and deliver our services</li>
                     <li className="text-xs full line-height-17 dfb align-start"><Dot /> Contact you about appointments, changes, or updates</li>
                     <li className="text-xs full line-height-17 dfb align-start"><Dot /> Provide customer support</li>
                     <li className="text-xs full line-height-17 dfb align-start"><Dot /> Comply with legal and regulatory obligations</li>
                  </ul>
                  <div className="text-s full pd-05 line-height-17">We do <b>not</b> sell or rent your personal data to third parties.</div>
               </div>
               
               <div className="box full">
                  <Spacing size={2} />
                  <div className="text-sm full bold-600">Lawful Basis for Processing</div>
                  <div className="text-s full pd-05 line-height-17">Under UK GDPR, we process your personal data based on one or more of the following lawful bases:</div>
                  <ul>
                     <li className="text-xs full line-height-17">
                        <b>Consent</b> - where you have clearly agreed for us to contact you
                     </li>
                     <li className="text-xs full line-height-17">
                        <b>Contract</b> - where processing is necessary to provide requested services
                     </li>
                     <li className="text-xs full line-height-17">
                        <b>Legitimate interests</b> - to respond to enquiries and operate our business
                     </li>
                     <li className="text-xs full line-height-17">
                        <b>Legal obligation</b> - where required by law
                     </li>
                  </ul>
                  <div className="text-s full pd-05 line-height-17">We do <b>not</b> sell or rent your personal data to third parties.</div>
               </div>
               
               <div className="box full">
                  <Spacing size={2} />
                  <div className="text-sm full bold-600">SMS Text Messaging (UK PECR & GDPR Compliance)</div>
                  <div className="text-s full pd-05 line-height-17">
                     If you provide your mobile phone number, you may receive SMS text messages from {websiteConfig.name} relating to:
                  </div>
                  <ul>
                     <li className="text-xs full line-height-17 dfb align-start"><Dot /> Your enquiry or service requests</li>
                     <li className="text-xs full line-height-17 dfb align-start"><Dot /> Appointment confirmations or reminders</li>
                     <li className="text-xs full line-height-17 dfb align-start"><Dot /> Quote Requests</li>
                     <li className="text-xs full line-height-17 dfb align-start"><Dot /> Customer support and follow-up</li>
                  </ul>
                  <div className="text-s full pd-05 line-height-17">We will only send SMS messages where you have given clear consent or where permitted under UK electronic communications laws.</div>
                  <div className="text-s full line-height-17 mt-1">Message frequency may vary.</div>
                  <div className="text-s full line-height-17 mb-1">Standard network charges may apply.</div>
                  <div className="text-s full line-height-17">
                     You can opt out of receiving text messages at any time by replying <b>STOP</b> to any SMS we send, or by contacting us directly.
                  </div>
                  <div className="text-s full line-height-17 pd-1">
                     We use third-party providers (such as Twilio) to send text messages on our behalf. These providers act as data processors and are required to protect your information and use it only according to our instructions.
                  </div>
                  <div className="text-s full line-height-17">Your consent is recorded and stored for compliance purposes.</div>
               </div>
               
               <div className="box full">
                  <Spacing size={2} />
                  <div className="text-sm full bold-600">Sharing Your Information</div>
                  <div className="text-s full pd-05 line-height-17">We may share your personal data only where necessary, including:</div>
                  <ul>
                     <li className="text-xs full line-height-17 dfb align-start"><Dot /> With trusted service providers (e.g. website hosting, SMS or email providers)</li>
                     <li className="text-xs full line-height-17 dfb align-start"><Dot /> Where required by law or legal process</li>
                     <li className="text-xs full line-height-17 dfb align-start"><Dot /> To protect our legal rights or the safety of others</li>
                  </ul>
                  <div className="text-s full pd-05 line-height-17">All third parties are required to keep your information secure and confidential.</div>
               </div>
               
               <div className="box full">
                  <Spacing size={2} />
                  <div className="text-sm full bold-600">Cookies and Website Analytics</div>
                  <div className="text-s full pd-05 line-height-17">Our website may use cookies or similar technologies to:</div>
                  <ul>
                     <li className="text-xs full line-height-17 dfb align-start"><Dot /> Ensure the site functions correctly</li>
                     <li className="text-xs full line-height-17 dfb align-start"><Dot /> Improve performance and usability</li>
                     <li className="text-xs full line-height-17 dfb align-start"><Dot /> Understand how visitors use our site</li>
                  </ul>
                  <div className="text-s full pd-05 line-height-17">You can control or disable cookies through your browser settings.</div>
               </div>
               
               <div className="box full">
                  <Spacing size={2} />
                  <div className="text-sm full bold-600">Data Retention</div>
                  <div className="text-s full pd-05 line-height-17">
                     We keep your personal data only for as long as necessary to fulfil the purposes for which it was collected, including legal, accounting, or reporting requirements.
                  </div>
               </div>
               
               <div className="box full">
                  <Spacing size={2} />
                  <div className="text-sm full bold-600">Your Data Protection Rights</div>
                  <div className="text-s full pd-05 line-height-17">Under UK GDPR, you have the right to:</div>
                  <ul>
                     <li className="text-xs full line-height-17 dfb align-start"><Dot /> Access the personal data we hold about you</li>
                     <li className="text-xs full line-height-17 dfb align-start"><Dot /> Request correction of inaccurate data</li>
                     <li className="text-xs full line-height-17 dfb align-start"><Dot /> Request deletion of your data</li>
                     <li className="text-xs full line-height-17 dfb align-start"><Dot /> Object to or restrict processing</li>
                     <li className="text-xs full line-height-17 dfb align-start"><Dot /> Withdraw consent at any time</li>
                  </ul>
                  <div className="text-s full pd-05 line-height-17">To exercise these rights, please contact us using the details above.</div>
               </div>
               
               <div className="box full">
                  <Spacing size={2} />
                  <div className="text-sm full bold-600">Data Security</div>
                  <div className="text-s full pd-05 line-height-17">
                     We take appropriate technical and organisational measures to protect your personal data against loss, misuse, unauthorised access, or disclosure. However, no online transmission is completely secure.
                  </div>
               </div>
               
               <div className="box full">
                  <Spacing size={2} />
                  <div className="text-sm full bold-600">Children's Data</div>
                  <div className="text-s full pd-05 line-height-17">
                     Our services are not intended for children under 13, and we do not knowingly collect personal data from children.
                  </div>
               </div>
               
               <div className="box full">
                  <Spacing size={2} />
                  <div className="text-sm full bold-600">Changes to This Policy</div>
                  <div className="text-s full pd-05 line-height-17">
                     We may update this Privacy Policy from time to time. Any changes will be published on this page with an updated date.
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
