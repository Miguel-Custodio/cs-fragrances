/**
 * Legal / policy pages (English). DRAFTS FOR REVIEW - NOT LEGAL ADVICE.
 * Anything written as [PLACEHOLDER: ...] is information the business owner must supply
 * (or confirm) before these pages are relied on. Have a qualified professional review them.
 */
import { COMPANY } from '@shared/company';
import { ingredientInfo } from '@/data/fragrance_details';

export interface PolicySection {
  heading: string;
  paragraphs?: string[];
  bullets?: string[];
}

export interface PolicyDoc {
  path: string;
  /** Short label for the footer. */
  label: string;
  title: string;
  description: string;
  intro: string;
  sections: PolicySection[];
}

export const POLICY_LAST_UPDATED = '[PLACEHOLDER: date of last update]';

const contactLine = `Email ${COMPANY.email} or message us on WhatsApp at ${COMPANY.whatsappDisplay}.`;

export const returnsPolicy: PolicyDoc = {
  path: '/returns-refunds',
  label: 'Returns & Refunds',
  title: 'Returns & Refunds',
  description: 'Returns and refunds policy for CS Fragrances perfumes and soaps.',
  intro:
    'Fragrances and soaps are personal care (hygiene) products. For health and safety reasons, we can only accept returns of unused, sealed products, or products that arrive damaged or defective.',
  sections: [
    {
      heading: 'What we accept back',
      bullets: [
        'Unopened items: the product is unused, sealed, and in its original, undamaged packaging (including any seal or wrapper).',
        'Damaged, defective, or incorrect items: the product arrived broken, leaking, defective, or is not what you ordered.',
      ],
    },
    {
      heading: 'What we cannot accept back',
      bullets: [
        'Opened, used, tested, or unsealed perfumes and soaps (because they are personal care products).',
        'Items returned without the original packaging, or damaged after delivery.',
        'Gift kits that have been opened. [PLACEHOLDER: confirm rule for kits and for items inside kits]',
      ],
    },
    {
      heading: 'How to request a return',
      paragraphs: [
        `Contact us within [PLACEHOLDER: number of days] days of delivery. ${contactLine} Include your order number and, for damaged, defective, or incorrect items, a clear photo of the product and the packaging.`,
        'Please do not send anything back before we confirm your return and give you instructions. [PLACEHOLDER: return address]',
      ],
    },
    {
      heading: 'Who pays for return shipping',
      paragraphs: [
        'If the item arrived damaged, defective, or incorrect, we will cover the return shipping. For a change-of-mind return of a sealed item, the customer pays the return shipping. [PLACEHOLDER: confirm]',
      ],
    },
    {
      heading: 'Refunds',
      paragraphs: [
        'Once we receive and inspect the returned item, we will refund the price of the item to your original payment method. Refunds are normally issued within [PLACEHOLDER: number of business days] business days; your bank or card issuer may take additional time to post it.',
        'Original shipping charges are [PLACEHOLDER: refundable / non-refundable], except where the return is due to our error or a damaged or defective item.',
        'Where we can, we may offer a replacement instead of a refund if you prefer.',
      ],
    },
    {
      heading: 'Your legal rights',
      paragraphs: [
        'Nothing in this policy limits any rights you have under applicable consumer protection laws.',
      ],
    },
  ],
};

export const cancellationPolicy: PolicyDoc = {
  path: '/cancellation-policy',
  label: 'Cancellation',
  title: 'Order Cancellation',
  description: 'How to cancel or change an order placed with CS Fragrances.',
  intro: 'You can cancel or change an order as long as it has not been shipped.',
  sections: [
    {
      heading: 'Cancelling an order',
      paragraphs: [
        `Contact us as soon as possible. ${contactLine} Include your order number. If your order has not yet been prepared for shipping, we will cancel it and refund you in full to your original payment method within [PLACEHOLDER: number of business days] business days.`,
        'Orders that have already been shipped cannot be cancelled. In that case our Returns & Refunds policy applies.',
      ],
    },
    {
      heading: 'Orders for local pickup',
      paragraphs: ['Pickup orders can be cancelled until [PLACEHOLDER: cut-off, e.g. time before pickup].'],
    },
    {
      heading: 'Custom, corporate, and bulk orders',
      paragraphs: ['[PLACEHOLDER: cancellation terms for custom, corporate, or bulk orders (deposit, production start, etc.)]'],
    },
    {
      heading: 'Cancellation by CS Fragrances',
      paragraphs: [
        'We may cancel an order if a product is out of stock, if there is a pricing or product-information error, if we cannot deliver to your address, or if we suspect fraud. If we cancel, you will receive a full refund.',
      ],
    },
  ],
};

export const shippingPolicy: PolicyDoc = {
  path: '/shipping-policy',
  label: 'Shipping',
  title: 'Shipping Policy',
  description: 'Shipping, delivery times, and local pickup information for CS Fragrances.',
  intro: `CS Fragrances ships from ${COMPANY.region}.`,
  sections: [
    {
      heading: 'Where we ship',
      bullets: [
        'British Columbia, including the Lower Mainland',
        'The rest of Canada',
        'The United States',
        'Local pickup (free) is available. [PLACEHOLDER: pickup address / area and pickup hours]',
      ],
    },
    {
      heading: 'Shipping costs',
      paragraphs: [
        'Shipping costs depend on your delivery option and the value of your order. The cost is shown in your cart before you pay. Free shipping applies to eligible orders over [PLACEHOLDER: amount and regions].',
      ],
    },
    {
      heading: 'Processing and delivery times',
      bullets: [
        'Orders are prepared within [PLACEHOLDER: number of business days] business days.',
        'Estimated delivery: BC [PLACEHOLDER], rest of Canada [PLACEHOLDER], United States [PLACEHOLDER].',
        'Delivery times are estimates and are not guaranteed. Delays can occur with the carrier, weather, or during peak seasons.',
        'Holiday orders: to arrive before Christmas, order by [PLACEHOLDER: Christmas order deadline per region].',
      ],
    },
    {
      heading: 'Carriers and tracking',
      paragraphs: ['We ship with [PLACEHOLDER: carrier(s)]. When your order ships we will send tracking information when available.'],
    },
    {
      heading: 'Duties, customs, and taxes (United States)',
      paragraphs: [
        'For orders shipped outside Canada, customs duties, import taxes, or brokerage fees may apply and are the responsibility of the customer, unless stated otherwise at checkout. [PLACEHOLDER: confirm]',
      ],
    },
    {
      heading: 'Fragrance shipping restrictions',
      paragraphs: [
        'Perfumes contain alcohol and may be treated as flammable liquids by carriers, so some shipping methods or destinations may be restricted. If we cannot ship your order to your address, we will contact you and refund you.',
      ],
    },
    {
      heading: 'Address accuracy, lost or damaged parcels',
      paragraphs: [
        'Please check your address carefully. We are not responsible for parcels delivered to an incorrect address provided by the customer. If your parcel is lost, delayed unusually, or arrives damaged, contact us within [PLACEHOLDER: number of days] days of the expected delivery date with your order number and photos if damaged. ' +
          contactLine,
      ],
    },
  ],
};

export const termsOfUse: PolicyDoc = {
  path: '/terms-of-use',
  label: 'Terms of Use',
  title: 'Terms of Use',
  description: 'Terms of use for the CS Fragrances website and online store.',
  intro:
    'These terms govern your use of csfragrances.ca and purchases made through it. By using the site or placing an order, you agree to them.',
  sections: [
    {
      heading: 'About us',
      paragraphs: [
        `${COMPANY.legalName} (“CS Fragrances”, “we”, “us”) is based in ${COMPANY.region}. Legal business name and address: [PLACEHOLDER: registered legal name and mailing address]. Contact: ${COMPANY.email}, WhatsApp ${COMPANY.whatsappDisplay}.`,
      ],
    },
    {
      heading: 'Products and information',
      paragraphs: [
        'We try to describe and photograph our products accurately, but colours, packaging, and scent descriptions may vary slightly. Fragrance perception differs from person to person. Please read our Fragrance Safety & Allergy notice and ingredient list before use.',
      ],
    },
    {
      heading: 'Prices, payment, and taxes',
      bullets: [
        'All prices are in Canadian dollars (CAD).',
        'Payments are processed securely by Square on its hosted payment page. We do not see or store your full card details.',
        'Applicable taxes, if any, are shown at checkout. [PLACEHOLDER: confirm GST/PST registration and wording]',
        'Shipping is calculated as shown in your cart.',
      ],
    },
    {
      heading: 'Orders',
      paragraphs: [
        'Placing an order is an offer to buy. We may refuse or cancel an order (for example, due to stock or pricing errors, or suspected fraud), in which case you will be refunded in full. Orders may also be placed by WhatsApp; those are confirmed with you directly.',
      ],
    },
    {
      heading: 'Returns, cancellations, and shipping',
      paragraphs: ['These are described in our Returns & Refunds, Cancellation, and Shipping policies, which form part of these terms.'],
    },
    {
      heading: 'Use of the site',
      bullets: [
        'You agree to use the site lawfully and not to interfere with its operation or security.',
        'You must be of the age of majority in your province or territory, or have a parent or guardian’s permission, to place an order.',
      ],
    },
    {
      heading: 'Intellectual property',
      paragraphs: [
        'The CS Fragrances name, logo, product names, photos, and text are owned by CS Fragrances or used with permission. You may not copy or use them commercially without our written permission. Other brand names mentioned on this site belong to their respective owners.',
      ],
    },
    {
      heading: 'Safety and responsibility',
      paragraphs: [
        'You are responsible for using products as directed and for checking ingredients against your own sensitivities. To the extent permitted by law, CS Fragrances is not liable for indirect or consequential losses arising from use of the site or products, and our total liability for any order is limited to the amount you paid for it. Nothing in these terms excludes liability that cannot be excluded by law or limits your statutory consumer rights.',
      ],
    },
    {
      heading: 'Changes and governing law',
      paragraphs: [
        'We may update these terms; the version on this page applies when you place an order. These terms are governed by the laws of British Columbia and the federal laws of Canada applicable there. [PLACEHOLDER: dispute resolution wording to be reviewed by a legal professional]',
      ],
    },
  ],
};

export const privacyPolicy: PolicyDoc = {
  path: '/privacy-policy',
  label: 'Privacy Policy',
  title: 'Privacy Policy',
  description: 'How CS Fragrances collects, uses, and protects your personal information.',
  intro:
    'CS Fragrances respects your privacy. This policy explains what personal information we collect, why, and your choices. We aim to comply with Canada’s Personal Information Protection and Electronic Documents Act (PIPEDA) and British Columbia’s Personal Information Protection Act (PIPA).',
  sections: [
    {
      heading: 'Information we collect',
      bullets: [
        'Order information: name, email, phone number, shipping/billing address, and the items you order.',
        'Payment information: entered on Square’s secure payment page. We do not receive or store your full card number.',
        'Messages you send us by email, WhatsApp, or Instagram (including your name, phone number, and message content).',
        'Your shopping cart: stored in your own browser (local storage) so it is remembered between visits. It is not sent to us until you check out.',
        'Technical data: our hosting provider may log basic information such as IP address and browser type for security and operation. [PLACEHOLDER: add any analytics or advertising tools if introduced later]',
      ],
    },
    {
      heading: 'Why we collect it',
      bullets: [
        'To process and deliver your order, provide customer service, and handle returns or refunds.',
        'To communicate with you about your order or questions.',
        'To meet legal, tax, and accounting obligations.',
        'To prevent fraud and keep the site secure.',
        'To send news or offers only if you have agreed to receive them. You can withdraw consent at any time. [PLACEHOLDER: confirm if a newsletter exists]',
      ],
    },
    {
      heading: 'Consent',
      paragraphs: [
        'By placing an order or contacting us you consent to the collection, use, and disclosure of your information as described here. You may withdraw consent (subject to legal or contractual restrictions) by contacting us; this may limit our ability to serve you.',
      ],
    },
    {
      heading: 'Who we share it with',
      bullets: [
        'Square (payment processing and order records).',
        'Shipping carriers: [PLACEHOLDER: carriers] (to deliver your order).',
        'Website hosting and email/messaging providers that help us run the business.',
        'Authorities, when required by law.',
        'We do not sell your personal information.',
      ],
    },
    {
      heading: 'Storage outside Canada',
      paragraphs: [
        'Some of our service providers (for example, payment processing, hosting, or messaging) may store or process information in other countries, including the United States, where it may be accessible to courts or authorities under local laws.',
      ],
    },
    {
      heading: 'Retention and security',
      paragraphs: [
        'We keep personal information only as long as needed for the purposes above or as required by law (for example, [PLACEHOLDER: retention period for order and tax records]). We use reasonable safeguards, but no system is completely secure.',
      ],
    },
    {
      heading: 'Your rights',
      paragraphs: [
        'You may ask to access the personal information we hold about you, ask us to correct it, or ask questions or make a complaint about our practices. Contact our privacy contact: [PLACEHOLDER: name/title of person responsible for privacy], ' +
          `${COMPANY.email}.`,
        'If you are not satisfied with our response, you may contact the Office of the Privacy Commissioner of Canada or the Office of the Information and Privacy Commissioner for British Columbia.',
      ],
    },
    {
      heading: 'Children',
      paragraphs: ['Our site is not directed to children, and we do not knowingly collect their personal information.'],
    },
    {
      heading: 'Changes',
      paragraphs: ['We may update this policy. The date at the top shows when it was last changed.'],
    },
  ],
};

export const safetyNotice: PolicyDoc = {
  path: '/fragrance-safety',
  label: 'Fragrance Safety & Allergies',
  title: 'Fragrance Safety & Allergy Notice',
  description: 'Safe use of CS Fragrances perfumes and soaps, and information about common fragrance allergens.',
  intro:
    'Fragrance ingredients can cause reactions in sensitive people. Please read this notice before using our products.',
  sections: [
    {
      heading: 'Safe use of perfumes',
      bullets: [
        'For external use only. Do not swallow.',
        'Do a patch test first: apply a small amount to the inside of your forearm and wait 24 hours to check for any reaction.',
        'Avoid contact with eyes, mouth, and other mucous membranes. If contact occurs, rinse thoroughly with water.',
        'Do not apply to broken, irritated, or sunburned skin.',
        'Stop use immediately if irritation, redness, rash, or discomfort occurs, and consult a healthcare professional.',
        'Perfumes are flammable. Keep away from heat, sparks, open flames, and do not spray near a flame or while smoking.',
        'Keep out of reach of children. If swallowed, contact a poison control centre or a doctor immediately; in an emergency, call 911.',
        'Store in a cool, dry place, out of direct sunlight and away from heat.',
      ],
    },
    {
      heading: 'Soap',
      bullets: [
        'For external use only. Avoid contact with eyes; if contact occurs, rinse with water.',
        'Our goat milk soap contains goat milk. Do not use it if you are allergic to milk or any ingredient.',
        'Stop use and consult a healthcare professional if irritation occurs.',
        'Keep out of reach of young children.',
      ],
    },
    {
      heading: 'Common fragrance allergens',
      paragraphs: [
        'Our fragrances may contain the following common fragrance allergens. See our Ingredients page for more information.',
      ],
      bullets: ingredientInfo.commonAllergens,
    },
    {
      heading: 'Important',
      paragraphs: [
        ingredientInfo.disclaimer,
        'If you are pregnant or nursing, have a skin condition, or have known allergies or sensitivities, consult a healthcare professional before use. This notice is general information and not medical advice.',
        `Questions about ingredients? ${contactLine}`,
      ],
    },
  ],
};

export const POLICIES: PolicyDoc[] = [
  returnsPolicy,
  cancellationPolicy,
  shippingPolicy,
  termsOfUse,
  privacyPolicy,
  safetyNotice,
];

export const POLICY_LINKS = POLICIES.map((p) => ({ href: p.path, label: p.label }));
