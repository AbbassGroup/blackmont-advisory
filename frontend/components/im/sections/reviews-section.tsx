'use client';

import { SectionHeading } from '../section-chrome';

const REVIEWS = [
  {
    name: 'Huss Khosravi',
    text: 'The Blackmont Advisory team are highly professional and knowledgeable. They genuinely care about their clients, providing clear, honest advice and going the extra mile to help people achieve their property and business goals. Their expertise, integrity and dedication make them a trusted advisor in the industry. Highly recommended!',
  },
  {
    name: 'Nik Tribhuvan',
    text: 'Sadeq and his team are incredible. They are quite knowledgeable and diligent. Their service is incredible. All my communication was promptly responded to. All my questions and queries were satisfactorily addressed. Made the entire process smooth and assuring.',
  },
  {
    name: 'Kiran Dhawan',
    text: 'I wanted to express my gratitude to Asif for his exceptional assistance. He worked diligently to provide me with all the necessary information, answering my questions thoroughly and professionally. His dedication and expertise were truly impressive. Thank you, Asif!',
  },
  {
    name: 'Dan Laki',
    text: 'My experience with Blackmont Advisory was exceptional. As someone new to the process of purchasing a business, Sadeq made everything smooth and seamless. He was informative, responsive, and took the time to answer all of my questions in detail.',
  },
  {
    name: 'Agust Ryan',
    text: 'I had a great experience with the Blackmont Advisory team. They were outstanding, professional, friendly, and welcoming from the start. They were always willing to help, offering clear advice and support whenever I needed it. Highly recommend them!',
  },
  {
    name: 'Adisha Fernando',
    text: 'Blackmont Advisory was instrumental in helping us find the perfect buyer. Their market knowledge and negotiation skills are on another level. Highly recommended!',
  },
];

function Stars() {
  return (
    <span className="text-accent" aria-label="5 out of 5 stars">
      {'★★★★★'}
    </span>
  );
}

export function ReviewsSection({
  title,
  editable,
  onChange,
}: {
  title: string;
  editable?: boolean;
  onChange?: (patch: { title: string }) => void;
}) {
  return (
    <>
      <SectionHeading
        title={title}
        editable={editable}
        onChange={(v) => onChange?.({ title: v })}
        placeholder="Reviews"
      />

      {/* Accreditations */}
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="flex flex-col justify-center rounded-2xl bg-secondary p-6 text-parchment shadow-xs">
          <p className="text-lg font-semibold">Blackmont Advisory</p>
          <p className="mt-1 flex items-center gap-2 text-sm">
            <span className="font-semibold">5.0</span>
            <Stars />
          </p>
          <p className="mt-2 text-sm text-parchment/70">
            Business Broker in South Melbourne, Victoria
          </p>
        </div>
        <div className="flex items-center justify-center border border-border bg-card p-6 shadow-xs">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/aibb.png"
            alt="AIBB"
            loading="lazy"
            decoding="async"
            className="max-h-16 w-auto object-contain"
          />
        </div>
        <div className="flex items-center justify-center border border-border bg-card p-6 shadow-xs">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/reiv.png"
            alt="REIV"
            loading="lazy"
            decoding="async"
            className="max-h-16 w-auto object-contain"
          />
        </div>
      </div>

      {/* Reviews */}
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {REVIEWS.map((r) => (
          <div
            key={r.name}
            className="flex flex-col border border-border bg-card p-5 shadow-xs"
          >
            <p className="flex-1 text-sm italic leading-relaxed text-muted-foreground">{r.text}</p>
            <div className="mt-4 text-center text-sm">
              <Stars />
            </div>
            <p className="mt-1 text-center text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              {r.name}
            </p>
          </div>
        ))}
      </div>
    </>
  );
}
