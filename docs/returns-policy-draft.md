# Returns & refunds: research and DRAFT policy (for Miguel's approval)

Status: DRAFT. The live policy in `client/src/data/policies.ts` is unchanged. This is research, not legal advice;
have a lawyer or Consumer Protection BC confirm before publishing. Researched 2026-11-19.

## What the law says (statutory rights) vs. store policy

**BC (applies to BC consumers and, for a BC supplier, in practice to distance sales we make)**
- No BC law requires a store to accept change-of-mind returns. Stores set their own policy. [CPBC tips]
- BUT the Business Practices and Consumer Protection Act (BPCPA) requires, before purchase and in the contract copy, that a
  distance-sales supplier disclose: legal name, description of goods, delivery method and location, supply date,
  itemized price, taxes and shipping, customs duties/brokerage fees that cannot be known in advance, payment terms, and
  "return, exchange, cancellation and refund policies, or a statement that your business does not have these policies". [CPBC business]
- The consumer may cancel a distance sales contract (full refund, no deductions, within 15 days) if: the disclosures/contract
  copy were not given correctly (BPCPA s.18.4 and s.49, 7 or 30 days depending on the case), or the goods were not delivered
  within 30 days of the supply date (or within 30 days of the order if no supply date was stated). On such a cancellation the
  supplier must give return instructions within 15 days, and the consumer should not pay return shipping. [BPCPA s.48-51; CPBC consumer]
- Practical consequence: the site must show a supply/shipping time before checkout and the returns policy at checkout.
- Defective or wrong goods: the BC Sale of Goods Act implies terms (goods match the description and are of merchantable
  quality). This right cannot be waived by a store policy. [Clicklaw]

**Canada (federal)**
- Businesses are not obliged to accept returns unless the item is defective; policies may exclude personal goods and sale items. [ISED]
- Health Canada: returned/opened/used cosmetics should not be resold (hygiene, labelling). This supports refusing opened
  perfume and soap. [Health Canada, cosmetics regulatory information]

**United States (customers shipped to the US)**
- No federal law requires accepting change-of-mind returns; the FTC requires that any return/refund promise be honored as stated. [FTC / state sources]
- FTC Mail, Internet or Telephone Order Merchandise Rule (16 CFR 435): ship within the time stated, or 30 days if none stated;
  if late, offer the buyer the choice to accept the delay or cancel with a prompt refund. [eCFR]
- Some US states require the return policy to be posted before checkout (e.g. NY, CT, CA); posting ours clearly covers that.
- Customs duties/import taxes on US parcels must be disclosed (BPCPA requires it too); already in the Shipping page.

## Official sources
- Consumer Protection BC, selling online (business rules): https://www.consumerprotectionbc.ca/selling-online-contract-rules-for-businesses/
- Consumer Protection BC, problem with an online purchase (consumer rights): https://www.consumerprotectionbc.ca/consumer-help/problem-with-an-online-purchase/
- Consumer Protection BC, 6 tips (no BC law on returns): https://www.consumerprotectionbc.ca/2025/01/6-tips-to-be-a-smarter-online-shopper/
- BPCPA full text (ss.18.3, 18.4, 48-51): https://www.bclaws.gov.bc.ca/civix/document/id/complete/statreg/04002_04
- Government of Canada, Office of Consumer Affairs, refund and exchange: https://ised-isde.canada.ca/site/office-consumer-affairs/en/business-practices-and-consumer-concerns/refund-and-exchange
- Health Canada, cosmetics regulatory information: https://www.canada.ca/en/health-canada/services/consumer-product-safety/cosmetics/regulatory-information.html
- BC Sale of Goods Act explained (Clicklaw): https://wiki.clicklaw.bc.ca/index.php/Sale_of_Goods_Law
- FTC rule, 16 CFR Part 435 (eCFR): https://www.ecfr.gov/current/title-16/chapter-I/subchapter-D/part-435

## Recommended policy (needs Miguel's approval; nothing here is live)

The existing text already matches the legal frame (unopened items and damaged/defective/wrong items). Gaps to fill:

1. **Voluntary change-of-mind window: recommend 14 days from delivery**, unopened/sealed/unused, original packaging.
   This is a store choice, NOT a legal minimum (a common retail norm, long enough for gifts, short enough to limit risk).
   Alternatives: 7 days (tighter), 30 days (more generous, and stronger as a trust signal).
2. **Damaged, defective or wrong item: report within 14 days of delivery with a photo; we pay return shipping and
   offer replacement or full refund** (including original shipping). Statutory rights are not limited by this window.
3. **Opened/used/tested perfume and soap: no return** (hygiene; Health Canada guidance), except if defective.
4. **Change-of-mind return shipping paid by the customer; refund of the item price only** (original shipping not refunded).
5. **Refund timing: within 10 business days after we receive and inspect the return, to the original payment method.**
   (BC statutory cancellations require refund within 15 days of the notice or the goods' return; 10 business days stays inside that.)
6. **Late delivery:** state a supply time at checkout; if we cannot ship in time (or in 30 days), offer to wait or cancel with a full
   refund (BC and FTC rule).
7. **US orders:** same policy; customer is responsible for duties and for return shipping on change-of-mind returns.
8. **Kits:** unopened kit returnable as a whole; opened kits not returnable (apply rule 3).
9. **Local pickup:** same policy; inspect at pickup.
10. Keep the line: "Nothing in this policy limits your rights under applicable consumer protection laws."

Still needed before launch: a stated shipping/supply time (Shipping page has placeholders) and the carrier.
