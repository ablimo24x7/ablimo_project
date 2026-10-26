/**
 * Seed script: Creates sample "Insights" blog posts (templateType: "blog")
 * so the control-room archive article template has content to render.
 *
 * Usage: npx tsx scripts/seed-blog-posts.ts [--dry-run]
 */
import "dotenv/config";
import { connectDB } from "../src/lib/db";
import { Article } from "../src/lib/models/Article";

const SAMPLE_BLOG_POSTS = [
  {
    slug: "orchestrating-ground-logistics-fii",
    title: "Orchestrating Ground Logistics for the Future Investment Initiative (FII).",
    excerpt:
      "When global investors, state leaders, and Fortune 500 CEOs converge in Riyadh for the Future Investment Initiative, standard transportation models collapse under the weight of such concentrated VIP volume.",
    category: "event-logistics",
    categoryLabel: "Event Logistics",
    status: "published",
    templateType: "blog",
    serviceSlug: "event-transportation",
    countrySlug: "saudi-arabia",
    citySlug: "riyadh",
    authorName: "AB Logistics Desk",
    date: "2026-10-20",
    readTime: 8,
    featured: true,
    archiveTag: "Control Room Archive: Riyadh",
    tags: ["Riyadh", "EventLogistics", "ControlRoom", "FII"],
    bodyContent: `
      <p>In October 2026, AB was tasked with a critical mandate: engineer, deploy, and manage a flawless ground transportation network for over 2,500 VIP delegates operating on highly fluid, unpredictable schedules over a 72-hour period.</p>

      <h2 id="challenge">The Challenge: Volume Meets Strict Protocol</h2>
      <p>Executing event logistics in the Kingdom requires a profound understanding of local security protocols, especially when navigating the King Abdulaziz International Conference Center (KAICC) and the Diplomatic Quarter. The challenges were threefold:</p>
      <ul>
        <li><strong>Dynamic Routing:</strong> Avoiding localized traffic congestion triggered by rolling security cordons.</li>
        <li><strong>Tarmac-to-Venue Friction:</strong> Seamlessly integrating private aviation arrivals (FBOs) at King Khalid International Airport directly into the event ecosystem.</li>
        <li><strong>Asset Allocation:</strong> Maintaining a massive standby fleet of premium vehicles (S-Class, V-Class, and VIP Coaches) to accommodate impromptu meeting changes.</li>
      </ul>

      <blockquote>
        "You cannot manage a Tier-1 global summit with spreadsheets and walkie-talkies. It requires a dedicated Transport Control Room viewing the entire city as a dynamic chess board." <br><span style="font-size:0.875rem;font-weight:700;color:#ffffff;">— Director of Event Operations, AB</span>
      </blockquote>

      <h2 id="solution">The Solution: The AB Transport Control Room</h2>
      <p>To conquer the complexity of the FII, AB bypassed traditional dispatch methods and activated a centralized <strong>Transport Control Room</strong>. This operational nerve center utilized proprietary Intelligent Transport Systems (ITS) to ingest live GPS telemetry from every deployed vehicle in the fleet.</p>
      <p>Rather than waiting for bottlenecks to occur at the KAICC loading zones, our dispatchers actively monitored traffic density and rerouted VIP convoys in real-time. By communicating directly with Saudi event security and on-site parking management, AB ground coordinators maintained a continuous, fluid motion of vehicles.</p>

      <h2 id="agility">Executing As-Directed Agility</h2>
      <p>A defining characteristic of the FII is the "meeting after the meeting." Delegates frequently require immediate transportation from the main venue to private dinners at KAFD or impromptu hotel summits.</p>
      <p>To support this, AB deployed an extensive <em>As-Directed</em> fleet. Hundreds of vetted chauffeurs remained on active standby within dedicated staging zones, allowing for sub-5-minute extraction times for high-profile targets, ensuring the momentum of corporate deal-making was never hindered by transport delays.</p>

      <h3 id="conclusion">Conclusion</h3>
      <p>The successful orchestration of the Future Investment Initiative logistics underscores a fundamental truth in B2B mobility: moving thousands of VIPs is not a driving task; it is a complex data and communications operation. By combining a strictly governed black fleet with rigorous Duty of Care and centralized technological dispatch, AB delivered absolute precision at scale.</p>
    `,
    keyTakeawaysContent: `
      <ul>
        <li>Over 2,500 VIP delegates moved across a fluid 72-hour schedule in Riyadh.</li>
        <li>A centralized Transport Control Room ingested live GPS telemetry from every vehicle.</li>
        <li>As-Directed staging zones delivered sub-5-minute extraction times for high-profile targets.</li>
        <li>Coordination with Saudi event security kept convoys moving through rolling cordons.</li>
      </ul>
    `,
    finalThoughtsContent: `
      <p>Mega-events are won or lost in the logistics layer. The FII deployment proves that when a Transport Control Room treats the city as a live board — not a static schedule — even the most protocol-heavy summits move with the precision executives expect.</p>
    `,
    faqs: [
      {
        q: "What is a Transport Control Room?",
        a: "A Transport Control Room is a centralized dispatch and telemetry hub that monitors every vehicle in a deployed fleet in real time. At the FII, AB's control room ingested live GPS data, traffic intelligence, and security-cordon updates to reroute VIP convoys proactively rather than reactively.",
      },
      {
        q: "How does AB handle last-minute schedule changes for VIP delegates?",
        a: "Through As-Directed staging. Hundreds of vetted chauffeurs remain on standby in dedicated zones near the venue, allowing sub-5-minute extraction times when a delegate's meeting ends early or a new meeting is added.",
      },
      {
        q: "Can AB coordinate with event security and venue management?",
        a: "Yes. Ground coordinators maintain direct communication channels with event security, on-site parking management, and airport FBO teams, ensuring convoys move through security cordons and loading zones without delay.",
      },
    ],
    articleMedia: {
      heroCoverMedia: {
        url: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      },
    },
    seo_metadata: {
      metaTitle: "Case Study: Orchestrating Ground Logistics for FII | AB Insights",
      metaDescription:
        "An in-depth look at how AB deployed its centralized Transport Control Room to manage over 2,500 VIP delegate movements for the Future Investment Initiative.",
      ogImage: "",
    },
    locale: "en",
  },
  {
    slug: "roi-outsourcing-executive-fleets",
    title: "The ROI of Outsourcing Executive Fleets in Saudi Arabia.",
    excerpt:
      "Why massive enterprises are abandoning owned fleets to eliminate depreciation and scale transport instantly.",
    category: "corporate-fleet",
    categoryLabel: "Corporate & Fleet",
    status: "published",
    templateType: "blog",
    serviceSlug: "corporate-transportation",
    countrySlug: "saudi-arabia",
    citySlug: "",
    authorName: "AB Corporate Desk",
    date: "2026-10-06",
    readTime: 6,
    featured: false,
    tags: ["CorporateFleet", "Riyadh", "ROI", "Outsourcing"],
    bodyContent: `
      <p>For decades, large enterprises treated executive transport as a balance-sheet asset: buy the cars, hire the drivers, maintain the fleet. That model is quietly collapsing under Vision 2030's cost discipline and the sheer velocity of modern business travel.</p>

      <h2>The Hidden Cost of an Owned Fleet</h2>
      <p>An owned executive fleet carries costs that rarely appear on a single line item. Depreciation erodes 15–25% of vehicle value annually. Driver salaries, insurance, registrations, detailing, and workshop downtime compound quietly. And perhaps most expensive of all: idle capacity. A fleet sized for peak demand sits unused for most of the year.</p>

      <h2>What Outsourcing Changes</h2>
      <p>Managed fleet providers like AB convert fixed capital expenditure into variable operating expenditure. Enterprises pay only for kilometres driven and hours engaged, while the provider absorbs depreciation, maintenance, and capacity planning.</p>
      <ul>
        <li><strong>Zero depreciation exposure:</strong> The provider owns the asset risk.</li>
        <li><strong>Elastic capacity:</strong> Scale from 5 to 500 vehicles for events without procurement cycles.</li>
        <li><strong>Consolidated governance:</strong> One invoice, one SLA, one point of accountability.</li>
        <li><strong>Protocol readiness:</strong> Chauffeurs trained for executive and diplomatic handling come standard.</li>
      </ul>

      <h2>The Measurable Delta</h2>
      <p>Across our enterprise deployments in Riyadh and Jeddah, organisations that transitioned from owned fleets to managed mobility reported a 30–40% reduction in total ground-transport cost within the first year — driven mostly by eliminated idle capacity and removed administrative overhead.</p>

      <h3>When Owning Still Makes Sense</h3>
      <p>For ultra-high-utilisation use cases — say, a dedicated executive shuttle running 14 hours a day — ownership can remain competitive. The decision hinges on utilisation rate: below roughly 60%, outsourcing almost always wins.</p>
    `,
    keyTakeawaysContent: `
      <ul>
        <li>Owned fleets hide depreciation, idle capacity, and administrative costs.</li>
        <li>Managed fleets convert capex to opex with elastic scaling.</li>
        <li>Enterprise deployments show 30–40% total-cost reduction in year one.</li>
        <li>Utilisation rate is the single metric that decides buy-vs-outsource.</li>
      </ul>
    `,
    finalThoughtsContent: `
      <p>Executive mobility is becoming a service, not an asset class. The CFOs who recognise this first will reallocate capital away from depreciating metal and toward the core business — without their executives noticing anything except smoother arrivals.</p>
    `,
    faqs: [
      {
        q: "How quickly can AB scale a corporate fleet?",
        a: "Dedicated fleet allocations can typically be deployed within 5–10 business days for standard executive sedans and SUVs. Event-driven surges are handled from existing standby capacity with shorter lead times.",
      },
      {
        q: "Do managed fleets include chauffeur vetting?",
        a: "Yes. All chauffeurs pass multi-stage background screening, defensive driving certification, and protocol training before assignment to corporate accounts.",
      },
      {
        q: "Is reporting available for expense management?",
        a: "Corporate accounts receive consolidated monthly invoicing with per-journey usage reports, plus optional dashboard access for fleet managers.",
      },
    ],
    articleMedia: {
      heroCoverMedia: {
        url: "https://images.unsplash.com/photo-1497215842964-222b430dc094?w=1200&h=600&fit=crop",
      },
    },
    seo_metadata: {
      metaTitle: "The ROI of Outsourcing Executive Fleets in Saudi Arabia | AB",
      metaDescription:
        "Why enterprises are abandoning owned executive fleets. Depreciation, idle capacity, and the 30–40% cost delta of managed mobility in the Kingdom.",
      ogImage: "",
    },
    locale: "en",
  },
  {
    slug: "live-telemetry-inside-its",
    title: "Live Telemetry: Inside the AB Transport System (ITS).",
    excerpt:
      "How providing direct API access to corporate security teams allows for real-time monitoring of executives.",
    category: "duty-of-care",
    categoryLabel: "Duty of Care",
    status: "published",
    templateType: "blog",
    serviceSlug: "corporate-transportation",
    countrySlug: "saudi-arabia",
    citySlug: "",
    authorName: "AB Technology Desk",
    date: "2026-09-22",
    readTime: 7,
    featured: false,
    tags: ["Telemetry", "ITS", "DutyOfCare", "API"],
    bodyContent: `
      <p>Duty of Care is no longer a binder in a compliance office. For organisations moving executives through dense urban environments, it is a live data problem — and it demands live data infrastructure.</p>

      <h2>What Our ITS Ingests</h2>
      <p>The AB Intelligent Transport System aggregates signals from every vehicle in the deployed fleet: GPS position, route deviation alerts, speed telemetry, journey state, and chauffeur status. This data flows through a single pipeline that powers both our internal control room and — where contracted — the client's own security dashboard.</p>

      <h2>Direct API Access for Security Teams</h2>
      <p>Enterprise clients can consume journey telemetry directly through our API. A corporate security operations centre can subscribe to journey lifecycle events — assigned, en route, on site, completed — and render them alongside their existing duty-of-care tooling.</p>
      <ul>
        <li><strong>Webhook events:</strong> Journey state changes pushed in real time.</li>
        <li><strong>REST polling:</strong> On-demand position and status queries within permission scopes.</li>
        <li><strong>Geo-fence alerts:</strong> Notifications when a vehicle exits a sanctioned corridor.</li>
        <li><strong>Role-scoped access:</strong> Only authorised personnel see executive-linked journeys.</li>
      </ul>

      <h2>Privacy by Design</h2>
      <p>Telemetry access is scoped per contract. Position data is only exposed for journeys belonging to the client's account, and historical traces are retained under configurable windows aligned with the client's data-governance policy.</p>

      <h3>The Outcome</h3>
      <p>When a security team can see that an executive's vehicle has stopped unexpectedly — and that a control-room dispatcher has already acknowledged the alert — Duty of Care stops being a promise and becomes an observable operational fact.</p>
    `,
    keyTakeawaysContent: `
      <ul>
        <li>ITS aggregates GPS, route, speed, and journey-state telemetry fleet-wide.</li>
        <li>Enterprise security teams can consume journey events via webhooks and REST.</li>
        <li>Geo-fence and unexpected-stop alerts feed directly into duty-of-care workflows.</li>
        <li>Access is role-scoped and contract-bound to protect executive privacy.</li>
      </ul>
    `,
    finalThoughtsContent: `
      <p>The future of executive protection is transparent infrastructure. Organisations that can observe their mobility layer in real time respond faster, prove compliance easier, and travel with a confidence that spreadsheets never delivered.</p>
    `,
    faqs: [
      {
        q: "What data does the AB ITS expose to clients?",
        a: "Journey lifecycle events, vehicle position within contract scope, and geo-fence alerts. Historical data retention windows are configurable per client governance policy.",
      },
      {
        q: "How is executive privacy protected?",
        a: "Telemetry access is scoped to journeys belonging to the client's account only, with role-based authorisation for any personnel consuming the data.",
      },
      {
        q: "Can the ITS integrate with existing security platforms?",
        a: "Yes. Webhook and REST interfaces are designed to feed corporate security operations centres and duty-of-care tooling without proprietary lock-in.",
      },
    ],
    articleMedia: {
      heroCoverMedia: {
        url: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=600&fit=crop",
      },
    },
    seo_metadata: {
      metaTitle: "Live Telemetry Inside the AB Transport System (ITS) | AB",
      metaDescription:
        "How AB's Intelligent Transport System gives corporate security teams real-time telemetry and API access for executive duty of care.",
      ogImage: "",
    },
    locale: "en",
  },
];

async function main() {
  const dryRun = process.argv.includes("--dry-run");

  console.log("Connecting to database...");
  await connectDB();

  const existing = await Article.find({
    slug: { $in: SAMPLE_BLOG_POSTS.map((a) => a.slug) },
  }).lean();
  const existingSlugs = new Set(existing.map((a) => a.slug));

  const toInsert = SAMPLE_BLOG_POSTS.filter((a) => !existingSlugs.has(a.slug));
  const skipped = SAMPLE_BLOG_POSTS.length - toInsert.length;

  console.log(
    `Found ${SAMPLE_BLOG_POSTS.length} blog posts to seed. ${skipped} already exist. ${toInsert.length} to insert.${dryRun ? " (DRY RUN)" : ""}`
  );

  if (toInsert.length === 0) {
    console.log("Nothing to insert.");
    process.exit(0);
  }

  if (dryRun) {
    toInsert.forEach((a) => console.log(`  [DRY] ${a.slug}`));
  } else {
    const result = await Article.insertMany(toInsert);
    console.log(`Inserted ${result.length} blog posts:`);
    result.forEach((a) => console.log(`  [OK] ${a.slug}`));
  }

  console.log("\nDone.");
  process.exit(0);
}

main().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
