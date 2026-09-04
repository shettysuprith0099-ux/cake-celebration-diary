import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Happy Birthday Puju — a little surprise" },
      {
        name: "description",
        content:
          "A hand-made birthday surprise for Puju, turning 21 — blow the candles, open the diary.",
      },
      { property: "og:title", content: "Happy Birthday Puju — a little surprise" },
      {
        property: "og:description",
        content:
          "A hand-made birthday surprise for Puju, turning 21 — blow the candles, open the diary.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

type Step = "cake" | "celebrate" | "diaryClosed" | "diaryOpen";

const POP_EMOJIS = ["❤️", "👑", "🫶🏻", "🎂", "🥹", "✨", "🎈", "💖", "🎉", "😭", "❤️", "🧁"];

function AmbientBlobs() {
  return (
    <>
      <div className="pointer-events-none absolute -top-24 -left-24 size-96 rounded-full bg-rose/30 blur-3xl" />
      <div className="pointer-events-none absolute top-1/3 -right-32 size-[28rem] rounded-full bg-pistachio/30 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 left-1/4 size-80 rounded-full bg-butter/25 blur-3xl" />
    </>
  );
}

function Index() {
  const [step, setStep] = useState<Step>("cake");

  return (
    <div className="relative min-h-screen overflow-hidden bg-cream font-display text-cocoa antialiased">
      <AmbientBlobs />
      {step === "cake" && <CakeScene onBlown={() => setStep("celebrate")} />}
      {step === "celebrate" && <CelebrateScene onNext={() => setStep("diaryClosed")} />}
      {step === "diaryClosed" && <DiaryClosedScene onOpen={() => setStep("diaryOpen")} />}
      {step === "diaryOpen" && <DiaryOpenScene />}
    </div>
  );
}

/* ---------------- STEP 1 : THE CAKE ---------------- */

function CakeScene({ onBlown }: { onBlown: () => void }) {
  const [blowing, setBlowing] = useState(false);

  const blow = () => {
    if (blowing) return;
    setBlowing(true);
    window.setTimeout(onBlown, 1500);
  };

  return (
    <main className="relative z-10 mx-auto flex min-h-screen max-w-6xl items-center px-6 py-12 md:px-10">
      <section className="glass w-full rounded-[32px] p-8 ring-1 ring-black/5 md:p-12">
        <div className="mb-8 flex items-center justify-between">
          <span className="text-xs font-medium uppercase tracking-[0.2em] text-cocoa-soft">
            Step 01 — Candlelight
          </span>
          <span className="text-xs font-medium tracking-wide text-cocoa-soft/70">
            for Puju, turning 21
          </span>
        </div>
        <div className="grid items-center gap-10 md:grid-cols-2">
          <div className="animate-soft-rise">
            <h1 className="font-serif text-4xl leading-tight text-balance md:text-5xl">
              Blow out the candles,{" "}
              <em className="text-rosedeep not-italic">my queen</em>
            </h1>
            <p className="mt-4 max-w-[44ch] text-pretty text-cocoa-soft">
              A little cake, lit by candlelight. Close your eyes, make a wish… then
              press the button and blowwww it all out.
            </p>
            <div className="mt-8 flex items-center gap-3">
              <button
                onClick={blow}
                className="rounded-full bg-rosedeep px-6 py-3 text-sm font-semibold text-cream ring-1 ring-rosedeep/30 transition-transform hover:-translate-y-0.5 active:translate-y-0"
              >
                {blowing ? "Blowinggg… 🌬️" : "Blow the candles 🌬️"}
              </button>
              <span className="text-sm text-cocoa-soft">one big breath</span>
            </div>
          </div>

          {/* Cake */}
          <div className="relative mx-auto h-72 w-64">
            <div className="absolute inset-x-0 bottom-6 h-24 rounded-[36px] bg-rose shadow-inner" />
            <div className="absolute inset-x-6 bottom-24 h-20 rounded-[30px] bg-blush ring-1 ring-black/5" />
            <div className="absolute inset-x-10 bottom-40 h-16 rounded-2xl bg-pistachio/80" />
            {/* candles + flames */}
            <div className="absolute inset-x-0 bottom-40 flex justify-center gap-8">
              {[0, 1, 2].map((i) => (
                <div key={i} className="relative">
                  {!blowing ? (
                    <span
                      className="animate-flicker block size-3 origin-bottom rounded-full bg-butter shadow-[0_0_12px_4px_rgba(232,201,75,0.7)]"
                      style={{ animationDelay: `${i * 0.2}s` }}
                    />
                  ) : (
                    <span
                      className="animate-smoke block size-3 rounded-full bg-cocoa-soft/40 blur-[1px]"
                      style={{ animationDelay: `${i * 0.25}s` }}
                    />
                  )}
                  <span className="mx-auto -mt-0.5 block h-8 w-1 rounded-sm bg-cocoa-soft/60" />
                </div>
              ))}
            </div>
            <span className="animate-sway absolute -left-2 top-10 text-3xl">🎀</span>
            <span
              className="animate-sway absolute -right-3 top-16 text-3xl"
              style={{ animationDelay: "0.8s" }}
            >
              🧁
            </span>
          </div>
        </div>
      </section>
    </main>
  );
}

/* ---------------- STEP 2 : CELEBRATION ---------------- */

function CelebrateScene({ onNext }: { onNext: () => void }) {
  const pops = useMemo(
    () =>
      POP_EMOJIS.map((emoji, i) => ({
        emoji,
        left: `${6 + (i * 89) / POP_EMOJIS.length}%`,
        top: `${12 + ((i * 37) % 60)}%`,
        delay: `${(i * 0.13).toFixed(2)}s`,
        size: ["text-2xl", "text-3xl", "text-4xl"][i % 3],
        rot: `${(i % 5) * 14 - 28}deg`,
      })),
    []
  );

  const bursts = useMemo(
    () =>
      Array.from({ length: 14 }, (_, i) => ({
        emoji: ["❤️", "💖", "✨", "🎉"][i % 4],
        left: `${8 + ((i * 61) % 84)}%`,
        delay: `${(i * 0.35).toFixed(2)}s`,
      })),
    []
  );

  return (
    <main className="relative z-10 mx-auto flex min-h-screen max-w-5xl items-center px-6 py-12">
      <section className="glass relative w-full overflow-hidden rounded-[32px] p-8 text-center ring-1 ring-black/5 md:p-16">
        {bursts.map((b, i) => (
          <span
            key={i}
            className="animate-float-up pointer-events-none absolute bottom-10 text-2xl"
            style={{ left: b.left, animationDelay: b.delay }}
          >
            {b.emoji}
          </span>
        ))}

        {pops.map((p, i) => (
          <span
            key={i}
            className={`animate-heart-pop pointer-events-none absolute ${p.size}`}
            style={
              {
                left: p.left,
                top: p.top,
                animationDelay: p.delay,
                "--rot": p.rot,
              } as React.CSSProperties
            }
          >
            {p.emoji}
          </span>
        ))}

        <p className="animate-soft-rise font-hand text-3xl text-rosedeep">
          it's happeninggg…
        </p>
        <h2
          className="animate-heart-pop mx-auto mt-4 max-w-[24ch] font-serif text-4xl leading-tight text-balance md:text-7xl"
          style={{ animationDelay: "0.2s" }}
        >
          HAPPYYYY BIRTHDAYYYY{" "}
          <span className="text-rosedeep">PUJUUUUUU</span>
        </h2>
        <p
          className="animate-soft-rise mx-auto mt-5 max-w-md text-pretty text-cocoa-soft"
          style={{ animationDelay: "0.6s" }}
        >
          All the hearts, all the cake, all the confetti — every single one of them is
          for you today. 👑
        </p>
        <div
          className="animate-soft-rise mt-10 flex justify-center"
          style={{ animationDelay: "0.9s" }}
        >
          <button
            onClick={onNext}
            className="rounded-full bg-cocoa px-7 py-3 text-sm font-semibold text-cream ring-1 ring-cocoa/30 transition-transform hover:-translate-y-0.5"
          >
            Next →
          </button>
        </div>
      </section>
    </main>
  );
}

/* ---------------- STEP 3 : THE DIARY ---------------- */

function DiaryClosedScene({ onOpen }: { onOpen: () => void }) {
  return (
    <main className="relative z-10 mx-auto flex min-h-screen max-w-3xl items-center px-6 py-12">
      <section className="glass w-full rounded-[32px] p-8 text-center ring-1 ring-black/5 md:p-14">
        <div className="mb-8 flex items-center justify-between text-left">
          <span className="text-xs font-medium uppercase tracking-[0.2em] text-cocoa-soft">
            Step 03 — The keepsake
          </span>
          <span className="font-hand text-2xl text-rosedeep">tap to open the diary</span>
        </div>

        <button
          onClick={onOpen}
          aria-label="Open the diary"
          className="group animate-soft-rise relative mx-auto block w-full max-w-md"
        >
          <div className="rounded-[28px] bg-rosedeep p-10 shadow-[0_24px_60px_-20px_rgba(198,91,118,0.55)] ring-1 ring-black/10 transition-transform duration-300 group-hover:-translate-y-1.5 group-hover:rotate-[-1deg]">
            <div className="rounded-2xl border border-cream/40 px-6 py-14">
              <p className="font-hand text-5xl text-cream">for my Puju 💌</p>
              <p className="mt-4 text-xs uppercase tracking-[0.35em] text-cream/70">
                a diary, just for you
              </p>
            </div>
          </div>
          <span className="animate-pulse-heart mt-6 inline-block text-4xl">❤️</span>
        </button>

        <p className="mt-6 text-sm text-cocoa-soft">
          There's a whole letter waiting inside. Brace yourself.
        </p>
      </section>
    </main>
  );
}

function DiaryOpenScene() {
  return (
    <main className="relative z-10 mx-auto min-h-screen max-w-7xl px-4 py-10 md:px-10">
      <div className="mb-6 flex items-center justify-between">
        <span className="text-xs font-medium uppercase tracking-[0.2em] text-cocoa-soft">
          The diary — open
        </span>
        <span className="font-hand text-2xl text-rosedeep">read it slowly 🥹</span>
      </div>

      {/* Open spread */}
      <div className="glass rounded-[32px] p-3 ring-1 ring-black/5 md:p-8">
        <div className="grid items-stretch gap-4 md:grid-cols-[1fr_auto_1fr] md:gap-0">
          {/* left page */}
          <div className="animate-page-in rounded-[24px] rounded-r-lg bg-cream/80 p-6 font-hand text-[22px] leading-[1.6] text-cocoa shadow-inner md:rounded-l-[24px] md:rounded-r-md md:p-10 md:text-[26px]">
            <p>
              <span className="text-rosedeep">Happiesttttt birthdayyyyy my queennnn</span>{" "}
              ❤️😭🫶🏻 You're finally turninggg 21 and wowwww, I honestly can't believe
              it. You've grown into such a strong, independent, beautiful and wonderful
              woman, and I'm genuinely so proud of you. I know this year has been a test
              for both of us, and I also know the coming years are going to bring their
              own tests and challenges for us, but I truly believe we're going to win
              every single one of them together. No matter how hard things get, I want
              us to keep choosing each other, keep understanding each other and keep
              fighting for what we have. I want to see you achieve everything you dream
              about, and I want to be there watching you do it.
            </p>
            <p className="mt-5">
              And honestly, look at you nowww 😭❤️ No one probably thought your cake
              business would become this big when you started it. Even I didn't imagine
              it would grow this much, but look at where you are now. The reviews I've
              seen on your Instagram stories genuinely make me sooo happy. Seeing people
              appreciate your cakes, your work and everything you put your heart into
              makes me feel so proud of you. Your hands seriously have magicgg 🥹❤️ You
              put so much love and effort into everything you make, and I know this is
              only the beginning. No matter what anyone tells you, I know you're going
              to succeed in life. I know you're going to win. I trust you, I believe in
              you, and sometimes I wish you could see yourself the way I see you because
              you're capable of so much more than you even realize.
            </p>
          </div>

          {/* spine */}
          <div className="hidden flex-col items-center justify-center gap-2 px-2 md:flex">
            <span className="w-px flex-1 bg-cocoa/10" />
            <span className="text-lg text-rosedeep">❦</span>
            <span className="w-px flex-1 bg-cocoa/10" />
          </div>

          {/* right page */}
          <div
            className="animate-page-in rounded-[24px] rounded-l-lg bg-cream/80 p-6 font-hand text-[22px] leading-[1.6] text-cocoa shadow-inner md:rounded-r-[24px] md:rounded-l-md md:p-10 md:text-[26px]"
            style={{ animationDelay: "0.15s" }}
          >
            <p>
              And yeaaa, I'm also really sorry for all the mistakes I made this year. I
              know I wasn't perfect and I know there were times when I hurt you,
              disappointed you or made things harder than they needed to be. I'm
              genuinely sorry for all of it. I'm still learning, still growing and
              still trying to become a better person for myself and for you. Thank you
              for staying, for understanding me, for putting up with me and for being
              there even when things weren't perfect. I'm really grateful that I have
              you in my life.
            </p>
            <p className="mt-5">
              I just want this new year of your life to bring you everything you deserve
              — happiness, success, peace, love, and so many more reasons to smile. I
              want to see your business grow bigger and bigger, I want to see you
              achieve your dreams, and I want to see that beautiful smile on your face
              for years and years. And whatever happens in the future, I hope we keep
              growing together, supporting each other and making memories that we'll
              look back at one day and smile about.
            </p>
            <p className="mt-5 text-rosedeep">
              I loveeeee youuuuu my queennnn ❤️👑 And once again, happiesttttt
              birthdayyyyy to my favourite personnnn 🫶🏻😭❤️ I hope 21 is the most
              beautiful year of your life yetttt. You deserve the absolute bestttt. ❤️
            </p>
          </div>
        </div>
      </div>

      {/* ending heart sign */}
      <div className="animate-page-in mt-10 text-center" style={{ animationDelay: "0.5s" }}>
        <div className="animate-pulse-heart mx-auto grid size-24 place-items-center rounded-full bg-rosedeep text-6xl text-cream shadow-[0_18px_50px_-12px_rgba(198,91,118,0.6)] ring-4 ring-blush">
          ❤️
        </div>
        <p className="mt-4 font-serif text-2xl text-cocoa">— with all my heart, always</p>
        <p className="mt-1 text-xs uppercase tracking-[0.3em] text-cocoa-soft/70">
          a hand-made digital keepsake · for Puju's 21st
        </p>
      </div>
    </main>
  );
}
