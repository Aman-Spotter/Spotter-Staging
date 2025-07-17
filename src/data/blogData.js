// Image paths for blog content (using local images from public/blogs folder)
export const blogImages = {
  bl1img1: '/blogs/Market_Momentum_Slows.png',
  bl2img1: '/blogs/Class_8_Net_Orders.png',
  bl2img2: '/blogs/blog-2-graph.png',
  bl3img1: '/blogs/picture_1.png',
  bl3img2: '/blogs/picture_2.png',
  bl3img3: '/blogs/picture_3.png',
  bl3img4: '/blogs/picture_4.png',
  bl3img5: '/blogs/picture_5.png',
  bl3img6: '/blogs/picture_6.png',
  bl3img7: '/blogs/picture_7.png',
  bl3img8: '/blogs/picture_8.png',
  bl4img1: '/blogs/bg4img1.png',
  bl4img2: '/blogs/bg4img2.png',
  bl4img3: '/blogs/bg4img3.png',
  bl4img4: '/blogs/bg4img4.png',
  bl4img5: '/blogs/bg4img5.png',
};

const blogData = [
  {
    id: 1,
    title: 'North America Truck Sales Slump 13% in Q1 as Market Momentum Slows',
    excerpt:
      'The North American heavy-duty truck market just posted its worst Q1 since the pandemic. Sales dropped 13% year-over-year-and the pain isn’t isolated. From interest rates to tariffs, pressure is mounting on every side of the supply chain.',
    content: `
<p>The North American heavy-duty truck market just posted its worst Q1 since the pandemic. Sales dropped 13% year-over-year-and the pain isn’t isolated. From interest rates to tariffs, pressure is mounting on every side of the supply chain.</p>
<p>While global sales dipped across several key markets, the North American region is drawing particular attention due to its outsized role in global freight and its deeper exposure to economic headwinds.</p>
<p><em>“Tariff uncertainty and softening freight activity have pressured order intake and deliveries, especially in the U.S. market,”</em> Volvo Group noted in its Q1 2025 earnings release.</p>
<p>The decline reflects a cooling freight environment and increased caution among carriers and fleet operators - many of whom are postponing equipment purchases amid economic uncertainty, fluctuating diesel prices, and tighter credit conditions.</p>

<h3>Q1 by the Numbers: A Deeper Look at North America</h3>
<p>According to Q1 2025 data, 62,275 heavy-duty trucks were sold in North America - a significant drop from 71,329 units during the same period in 2024. This 13% decline represents more than 9,000 fewer trucks hitting the road in just the first quarter alone.<br>
In response, the 2025 forecast for North American heavy-duty truck sales has been revised downward to 275,000 units, a 25,000-unit reduction compared to earlier estimates. This signals broader concern across OEMs and market analysts that softening demand may persist well into the second half of the year.</p>

<h3>What's Fueling the Slowdown?</h3>
<p>The North American trucking industry is navigating a complex set of challenges that are converging all at once:</p>
<ol>
  <li><strong>Freight Recession & Spot Market Collapse</strong><br>Rates are dipping below operating costs. Small carriers can’t justify new investments.</li>
  <li><strong>Tariff & Trade Policy Whiplash</strong><br>Uncertainty around global trade is freezing capital spending.</li>
  <li><strong>Financing Pressure from High Rates</strong><br>With APRs above 8–9%, even well-run fleets are staying sidelined.</li>
  <li><strong>Regulatory Overhang</strong><br>Pending GHG standards are adding another layer of hesitation.</li>
</ol>

<h3>North America in a Global Context</h3>
<p>North America’s slowdown isn’t occurring in isolation. Global truck sales are seeing a general cooling trend, particularly in mature markets:</p>
<p style="text-align:center; margin: 20px 0;">
  <img src="${blogImages.bl1img1}" alt="Market Momentum Slows Chart" style="max-width: 100%; height: auto; border-radius: 8px;" />
</p>
<table border="1" cellpadding="6" style="border-collapse:collapse; width:100%; margin: 20px 0;">
<thead>
<tr>
<th>Region</th>
<th>Q1 2025 Sales</th>
<th>Q1 2024 Sales</th>
<th>YoY Change</th>
<th>Full Year 2025 Forecast</th>
<th>Change vs. Previous Forecast</th>
</tr>
</thead>
<tbody>
<tr><td>North America</td><td>62,275</td><td>71,329</td><td>-13%</td><td>275,000</td><td>-25,000</td></tr>
<tr><td>Europe 30 (incl. UK)</td><td>70,142</td><td>82,530</td><td>-15%</td><td>290,000</td><td>Unchanged</td></tr>
<tr><td>China</td><td>213,408</td><td>222,454</td><td>-4%</td><td>710,000</td><td>Unchanged</td></tr>
<tr><td>India</td><td>105,851</td><td>103,695</td><td>+2%</td><td>380,000</td><td>+10,000</td></tr>
</tbody>
</table>

<p>While India continues to see moderate growth driven by infrastructure expansion, North America and Europe are clearly in retrenchment mode.</p>

<h3>Industry Implications</h3>
<p>The Q1 numbers are more than just a reflection of economic sentiment - they signal a shift in how fleets are approaching growth, replacement cycles, and long-term planning.</p>
<ul>
<li>OEMs like Volvo, Freightliner, and PACCAR may begin adjusting production levels to prevent inventory surpluses.</li>
<li>Aftermarket services and telematics platforms could see increased demand as fleets try to extend the life of existing vehicles.</li>
<li>Technology vendors in areas like dispatch automation, fuel efficiency, and driver safety could play a key role in helping fleets do more with less in 2025.</li>
</ul>

<h3>Looking Ahead</h3>
<p>Despite the current slowdown, industry analysts expect a potential rebound in late 2025 or early 2026 - assuming interest rates begin to ease and regulatory clarity improves. The push toward electrification, automated dispatching, and predictive analytics is likely to accelerate once market confidence returns.<br>
For now, however, the data paints a picture of strategic pause across the North American heavy-duty truck sector.</p>
`,
    publishDate: '2025-01-15',
    readTime: '8 min read',
    tags: ['Truck Sales', 'Market Trends', 'North America', 'Q1 2025'],
    image: blogImages.bl1img1, // Market momentum chart
  },
  {
    id: 2,
    title:
      'Class 8 Truck Orders Hit Post-Pandemic Low as Industry Faces Tariff Pressure and Market Uncertainty',
    excerpt:
      'Class 8 truck orders just hit their lowest point since the early pandemic. With only 7,400–7,600 new trucks ordered in April, the industry is flashing warning lights-from tariffs to financing fatigue, uncertainty is steering the market into neutral.',

    content: `
<p>Class 8 truck orders just hit their lowest point since the early pandemic. With only 7,400–7,600 new trucks ordered in April, the industry is flashing warning lights-from tariffs to financing fatigue, uncertainty is steering the market into neutral.</p>

<h3>Class 8 Orders Plunge</h3>
<p>According to preliminary figures from both FTR Transportation Intelligence and ACT Research, net orders for North American Class 8 trucks in April 2025 came in at just:</p>
<ul>
<li>FTR: 7,400 units (54% month-over-month and year-over-year)</li>
<li>ACT: 7,600 units, also reflecting sharp double-digit declines</li>
</ul>
<p>These numbers are well below the 7-year April average of 18,963 units, and down 30% year-to-date compared to 2024.</p>
<p>“New and pending U.S. tariffs and retaliatory tariffs will significantly increase costs for Class 8 trucks, tractors, and related components,” said FTR Senior Analyst Dan Moyer.</p>

<p style="text-align:center; margin: 20px 0;">
  <img src="${blogImages.bl2img1}" alt="Class 8 Truck Orders Chart" style="max-width: 100%; height: auto; border-radius: 8px;" />
</p>

<p>In the chart above, April’s order volumes (shown in bright green) underscore how steep the drop-off has been compared to 2024 (blue line). It’s a continuation of a downward trend that began in January and has yet to show signs of bottoming out.</p>

<h3>Long-Term Order Trends: A Steady Decline</h3>
<p>The second chart provides a broader perspective, showing Class 8 net orders from 2020 to April 2025. It’s easy to spot the highs of post-COVID recovery in 2021 and 2022 - and the steady decline since late 2023. April’s 7,600 units represent a 52% year-over-year drop, highlighting the industry's current volatility.</p>

<p style="text-align:center; margin: 20px 0;">
  <img src="${blogImages.bl2img2}" alt="Long-term Order Trends Chart" style="max-width: 100%; height: auto; border-radius: 8px;" />
</p>

<p>Even seasonally adjusted (SA) orders are tracking below 9,000 units, suggesting that fleet confidence is waning. And the issue isn’t just declining orders - both ACT and FTR also report a recent spike in order cancellations, pointing to more than just caution… it's full-on hesitation.</p>

<h3>5 Reasons Fleets Are Hitting Pause</h3>
<p>Several overlapping forces are driving this downturn in new truck demand:</p>
<ol>
<li><strong>Tariff Tensions</strong><br>Uncertainty around U.S. trade policies and potential retaliatory tariffs is spooking buyers. Many manufacturers expect part costs to rise sharply, which inflates final truck pricing and cuts into margins.</li>
<li><strong>Used Truck Surplus</strong><br>Used truck prices dropped sharply after peaking during COVID. With decent-condition models now more affordable, fleets are opting to delay purchases of new $180K–$200K trucks.</li>
<li><strong>Backlogs & Delivery Delays</strong><br>Order backlogs from 2022–2023 are still being worked through, meaning some carriers are still receiving trucks ordered 12–18 months ago, reducing urgency for new equipment.</li>
<li><strong>Freight Market Weakness</strong><br>Spot rates remain soft, and freight volumes have dipped across several sectors. Without strong market incentives, small and mid-sized carriers are hitting pause on capital spending.</li>
<li><strong>Financing Fatigue</strong><br>High interest rates are adding another layer of cost. For many operators, the monthly payment on a new truck just doesn’t pencil out - especially if rates are upwards of 8–9%.</li>
</ol>

<h3>What’s Next?</h3>
<p>Short term? It’s unlikely we’ll see a major recovery before Q3 unless interest rates drop or trade policy stabilizes. Here's what analysts are watching:</p>
<ul>
<li>Used truck prices are expected to stay flat or soften, especially as more inventory enters the market.</li>
<li>New truck prices may rise slightly due to parts inflation and regulatory compliance costs - though demand is keeping pricing pressure in check.</li>
<li>EPA 2027 regulations are on the horizon, and that could trigger a pre-buy boom if market confidence improves.</li>
</ul>
<p>“With repair costs up, a weak resale market, and a murky tariff outlook, most carriers are playing it safe for now,” said one ACT analyst.</p>

<h3>Key Takeaways</h3>
<ul>
<li>April 2025 Class 8 orders dropped to ~7,600 units - lowest since May 2020</li>
<li>Down 54% YoY and MoM, with a 30% decline year-to-date</li>
<li>Order cancellations are rising, reflecting low fleet confidence</li>
<li>Used trucks remain attractive vs. new equipment</li>
<li>Tariffs, financing rates, and regulatory uncertainty continue to cloud forecasts</li>
</ul>

<p>Fleet strategy in 2025 isn’t about expansion-it’s about positioning. The smart players aren’t sitting idle; they’re watching interest rates, holding cash, and prepping for a smarter Q3.<br>Want to lead that shift? Stay tuned-because the next freight upswing will reward those ready to move.</p>
`,
    publishDate: '2025-05-10',
    readTime: '7 min read',
    tags: ['Class 8 Trucks', 'Orders', 'Tariffs', 'Market Trends'],
    image: blogImages.bl2img1, // Class 8 truck orders chart
  },
  {
    id: 3,
    title: 'Tariffs, Trailers & Tender Rejections: What’s Moving Freight in May.',
    excerpt:
      'A 90-day tariff truce between the U.S. and China is shaking up global logistics. Importers are rushing to capitalize, ocean volumes and container rates are spiking, and the ripple is about to hit U.S. trucking and trailers. Here’s what’s moving freight in May.',

    content: `
<h3>International Shipping Surge</h3>
<p>A 90-day tariff truce between the U.S. and China, effective May 12, 2025, is already shaking up global logistics. Importers are rushing to capitalize on the policy window, sparking a sharp spike in ocean volumes and container rates.<br>This isn’t business as usual-it’s a signal that peak season may come earlier and hotter than expected.</p>

<h4>Ocean Shipping Rebounds on Tariff Pause</h4>
<p><strong>Rate Jumps:</strong></p>
<ul>
<li>20-ft containers (Shanghai to Long Beach): $2,300 (up 27.8% from  April)</li>
<li>40-ft containers: $2,900 (up 31.8% )</li>
</ul>
<p>Shippers are racing to move goods ahead of potential policy reversals.  Carriers are tightening space and raising rates in response.</p>
<p style="text-align:center; margin: 20px 0;">
  <img src="${blogImages.bl3img1}" alt="Ocean Shipping Chart" style="max-width: 100%; height: auto; border-radius: 8px;" />
</p>

<h4>Diversifying Gateways</h4>
<p>While China still leads as the largest source of inbound TEUs to the U.S., volumes have dropped significantly YoY. Meanwhile, other countries are gaining ground:</p>
<ul>
<li>Thailand: +55.35% YoY</li>
<li>Vietnam: +27.59% YoY</li>
<li>Germany: +22.84% YoY</li>
</ul>
<p>These shifts signal broader diversification in sourcing beyond China-a trend accelerated by trade friction and supply chain resilience planning.</p>
<p style="text-align:center; margin: 0px 0; display: flex; flex-direction: row; gap: 10px; width: 50%">
  <img src="${blogImages.bl3img2}" alt="Gateway Diversification Chart" style="max-width: 100%; height: auto; border-radius: 8px;" />
  <img src="${blogImages.bl3img3}" alt="Gateway Diversification Chart 2" style="max-width: 100%; height: auto; border-radius: 8px; margin-top: 10px;" />
</p>

<h3>Trucking Ripple Effect</h3>
<p>Ocean transit times average ~30 days, meaning the trucking sector will start to feel the effects by early July-right in time for the 4th of July freight peak. Brokers and carriers should expect rate pressure and tighter capacity just as summer promotions hit full swing.</p>

<h3>Class 8 Truck Orders Hit a Wall</h3>
<p>While ocean freight surges, new truck orders continue their dramatic fall. April was particularly harsh:</p>
<ul>
<li>New truck orders: 7,400 units (down 54% YoY)</li>
<li>Sales: 18,078 units (down 8.7% YoY)</li>
<li>Freightliner: Maintains 36.2% market share, outperforming competitors</li>
</ul>
<p>OEMs are pumping the brakes as demand cools.</p>
<p style="text-align:center; margin: 0px 0; display: flex; flex-direction: row; gap: 10px; width: 50%">
  <img src="${blogImages.bl3img4}" alt="Truck Orders Chart" style="max-width: 100%; height: auto; border-radius: 8px;" />
  <img src="${blogImages.bl3img5}" alt="Truck Sales Chart" style="max-width: 100%; height: auto; border-radius: 8px; margin-top: 10px;" />
</p>

<h4>Used Market Snapshot</h4>
<p>On the flip side, the used truck market is showing mixed signals:</p>
<ul>
<li>Retail sales: +8.6% MoM</li>
<li>Auction sales: -57%</li>
</ul>
<p>While some fleets are still buying, many are holding off or opting for the secondary market instead of investing in new equipment.</p>

<h4>Trailer Orders Defy the Trend</h4>
<p>March saw strong performance in the trailer sector, bucking the downward trend in tractors:</p>
<ul>
<li>~21,200 units ordered</li>
<li>+21% MoM | +63% YoY</li>
</ul>
<p>This indicates fleets are expanding trailer capacity, either for drop-and-hook operations or to handle seasonal freight surges without committing to new drivers or power units.</p>

<h3>Freight Rate Outlook: Capacity Tightens Ahead of Peak</h3>
<p>As produce season takes hold, freight rates are climbing steadily. The National Truckload Index (NTI) is holding at $2.23/mi and trending upward.</p>
<p style="text-align:center; margin: 20px 0;">
  <img src="${blogImages.bl3img7}" alt="Freight Rate Chart" style="max-width: 100%; height: auto; border-radius: 8px;" />
</p>

<h4>Rejections Signal Spot Market Pressure</h4>
<p>The Van Outbound Tender Rejection Index (VOTRI) is also rising, now at 5.44-well above this time in 2022 and 2023. This means contracted carriers are rejecting more freight, pushing volume into the spot market.</p>
<p style="text-align:center; margin: 20px 0;">
  <img src="${blogImages.bl3img6}" alt="VOTRI Chart" style="max-width: 100%; height: auto; border-radius: 8px;" />
</p>
<p>Higher rejections = tighter capacity = potential for sustained rate spikes through the summer.</p>

<h4>Southern Produce Is Powering Regional Markets</h4>
<p>Southern U.S. regions are heating up with seasonal produce freight. Melons, in particular, are showing strong activity:</p>
<ul>
<li>100+ active loads</li>
<li>~$300,000 in gross revenue</li>
</ul>
<p>This is driving a localized boom in reefer and dry van markets across Texas, Georgia, and Florida. Regional carriers are taking advantage of short-haul, high-yield lanes.</p>

<h4>Bonus Insight: Mode Share and Market Activity</h4>
<p>New visual data reveals further insight into freight movement by mode and region. This snapshot gives a clear breakdown of truckload, intermodal, and LTL market share trends. For brokers and shippers, this type of breakdown is essential in identifying which freight paths are growing more competitive.</p>
<p style="text-align:center; margin: 20px 0;">
  <img src="${blogImages.bl3img8}" alt="Mode Share Chart" style="max-width: 100%; height: auto; border-radius: 8px;" />
</p>
<p>This data supports the broader trend: truckload activity is trending upward, while intermodal has flattened out, signaling a continued preference for flexible OTR options during periods of high demand.</p>

<p>May is proving to be a turning point month: international freight is heating up, domestic equipment sales are cooling, and summer peak season is on the horizon.</p>

<h4>What to Watch:</h4>
<ul>
<li>Continued rise in ocean TEUs arriving in late June</li>
<li>Spot rate pressure increasing across major van lanes</li>
<li>Trailer demand holding steady despite OEM slowdowns</li>
<li>Southern produce volumes boosting localized freight markets</li>
</ul>

<p>May is more than a warm-up-it’s a signal flare. Ocean rates are up, trailers are moving, and tender rejections are climbing. Carriers who act early will ride the July wave. The rest? They’ll be playing catch-up.<br>Plan now. Scale smart. And stay ahead of the freight curve.</p>
`,
    publishDate: '2025-05-20',
    readTime: '8 min read',
    tags: ['Freight', 'Tariffs', 'Trailers', 'Tender Rejections', 'May 2025'],
    image: blogImages.bl3img1,
  },
  {
    id: 4,
    title: 'Why Open Deck Might Be the Future Under Trump',
    excerpt:
      'Dry vans are getting crushed, but flatbeds are heating up. With a policy shift toward domestic manufacturing and infrastructure, open deck freight is poised for growth. Here’s why flatbed could lead the next freight recovery.',

    content: `
<h3>Dry Vans Are Struggling, But Flatbeds Are Heating Up</h3>
<p>Dry vans are getting crushed. Rates are flat, demand is weak, and the short and long-term outlooks look uncertain. But one segment is standing tall-open deck freight.</p>

<p>With former President Trump poised to make a return, market watchers are seeing a policy shift back toward domestic manufacturing, infrastructure spending, and energy expansion-industries that ship heavy materials like steel, lumber, and machinery. And those don’t move in vans. They move on flatbeds.</p>

<h4>Data Backs the Flatbed Boom</h4>
<h5>Long-Term Market Momentum</h5>
<p>The global flatbed truck market is on pace to hit $9.45 billion by 2033, growing at a 5% CAGR from 2025. It’s not hype - it’s sustained growth tied to industrialization and infrastructure.</p>
<p style="text-align:center; margin: 20px 0;">
  <img src="${blogImages.bl4img1}" alt="Flatbed Market Chart" style="max-width: 100%; height: auto; border-radius: 8px;" />
</p>

<h5>Q1 Performance: Best in Years</h5>
<p>Spot rates for flatbeds climbed from $2.44 in February to $2.57 in April, a +1.6% YoY increase. That makes Q1 2025 the strongest flatbed rate environment since 2017.<br>Load-to-truck ratio data from DAT shows a 90.7% increase in April 2025 compared to April 2024. This isn’t just seasonal-it’s real freight movement.</p>
<p style="text-align:center; margin: 20px 0;">
  <img src="${blogImages.bl4img2}" alt="Flatbed Performance Chart" style="max-width: 100%; height: auto; border-radius: 8px;" />
</p>
<ul>
<li>Shippers are:</li>
<li>Stockpiling in response to tariff uncertainty</li>
<li>Ramping up construction projects</li>
<li>Reactivating dormant domestic production lines</li>
</ul>

<h4>Manufacturing, Infrastructure, and Construction Are Driving It</h4>
<p>The 2025 Construction Starts Forecast projects 8.5% total growth:</p>
<ul>
<li>Nonresidential: +6.9%</li>
<li>Residential: +12%</li>
</ul>
<p>Meanwhile, the Census Bureau reports that March 2025 construction spending reached $2.2 trillion, up 2.8% from last year.<br>Deloitte’s 2025 Construction Outlook sees lower interest rates and federal funding (IIJA) fueling growth in:</p>
<ul>
<li>Public infrastructure</li>
<li>Housing</li>
<li>Manufacturing</li>
</ul>
<p>All signs point toward continued demand for flatbeds.</p>

<h4>Flatbed Isn't Immune to Market Headwinds</h4>
<p>Challenges? Absolutely. Flatbed isn’t immune - but it’s not freefalling like dry van or reefer.</p>

<h5>The Pressure Points</h5>
<ul>
<li>Trailer prices are up and availability is tight</li>
<li>Skilled dispatchers are scarce - some fleets have just 1–2 who know flatbed</li>
<li>West Coast port slowdowns are rerouting more freight inland</li>
</ul>

<h4>Manufacturing Is Still Contracting</h4>
<p>The April 2025 Manufacturing PMI sits at 48.7%, signaling contraction for the second straight month - and not a single manufacturing sector reported growth.</p>
<p style="text-align:center; margin: 20px 0;">
  <img src="${blogImages.bl4img3}" alt="Manufacturing PMI Chart" style="max-width: 100%; height: auto; border-radius: 8px;" />
</p>

<h4>Export Orders Hit Recession-Era Lows</h4>
<p>The New Export Orders Index has fallen to 43.1, the lowest since April 2009, signaling reduced international demand.</p>
<p style="text-align:center; margin: 20px 0;">
  <img src="${blogImages.bl4img4}" alt="Export Orders Chart" style="max-width: 100%; height: auto; border-radius: 8px;" />
</p>

<h4>Imports Are Contracting Too</h4>
<p>April’s Import Index dropped to 47.1, reinforcing the slowdown in global goods movement.</p>
<p style="text-align:center; margin: 20px 0;">
  <img src="${blogImages.bl4img5}" alt="Import Index Chart" style="max-width: 100%; height: auto; border-radius: 8px;" />
</p>

<h4>The Road Ahead: Flatbed Freight First to Rebound?</h4>
<p>While challenges exist, flatbed is in a much better position than dry van or reefer. It’s closely tied to infrastructure, energy, and domestic production-all priorities under a Trump policy agenda.</p>

<p>As tariffs rise, re-shoring continues, and construction accelerates, open-deck freight could not only survive but lead the recovery.</p>

<p>Flatbed is hot-and it may just stay that way.</p>
`,
    publishDate: '2025-06-01',
    readTime: '7 min read',
    tags: ['Flatbed', 'Open Deck', 'Freight', 'Trump', 'Market Trends'],
    image: blogImages.bl4img1, // Flatbed market chart
  },
];

export default blogData;
