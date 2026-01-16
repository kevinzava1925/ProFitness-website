import Navigation from "../components/Navigation";
import Footer from "../components/Footer";

const APP_STORE_URL = "https://apps.apple.com/us/app/technogym-training-coach/id976506047";
const PLAY_STORE_URL = "https://play.google.com/store/apps/details?id=com.technogym.tgapp";

function AppleIcon() {
  return (
    <svg
      className="w-5 h-5"
      viewBox="0 0 24 24"
      aria-hidden="true"
      fill="currentColor"
    >
      <path d="M16.365 1.43c0 1.14-.477 2.245-1.246 3.083-.85.923-2.224 1.64-3.43 1.56-.153-1.096.39-2.237 1.153-3.06.8-.888 2.184-1.56 3.523-1.583z" />
      <path d="M20.248 17.23c-.54 1.246-.802 1.805-1.496 2.89-.967 1.52-2.33 3.41-4.02 3.43-1.502.02-1.89-.98-3.93-.97-2.04.01-2.468.99-3.97.98-1.69-.02-2.98-1.7-3.95-3.22-2.72-4.18-3.01-9.07-1.33-11.68 1.2-1.88 3.1-2.98 4.88-2.98 1.82 0 2.96 1 4.46 1 1.46 0 2.35-1 4.42-1 1.58 0 3.26.86 4.45 2.35-3.92 2.15-3.28 7.73.49 10.2z" />
    </svg>
  );
}

function AndroidIcon() {
  return (
    <svg
      className="w-5 h-5"
      viewBox="0 0 24 24"
      aria-hidden="true"
      fill="currentColor"
    >
      <path d="M17.523 9.384l1.826-3.163a.5.5 0 10-.866-.5l-1.85 3.206a8.617 8.617 0 00-9.266 0L5.517 5.72a.5.5 0 10-.866.5l1.825 3.163A7.51 7.51 0 003 15.5V19a2 2 0 002 2h1v-4h12v4h1a2 2 0 002-2v-3.5a7.51 7.51 0 00-3.477-6.116z" />
      <circle cx="8" cy="13" r="1" />
      <circle cx="16" cy="13" r="1" />
    </svg>
  );
}

export default function TechnogymAppPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      <main className="pt-16 sm:pt-20">
        <section className="py-12 sm:py-16 lg:py-20 bg-black text-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase mb-4 sm:mb-6">
              Your Workout, Upgraded — with the Technogym App
            </h1>
            <p className="text-base sm:text-lg text-gray-200 leading-relaxed">
              Everything you need, right in your pocket. Book classes, track your workouts, and stay
              plugged into the gym anytime, anywhere with the Technogym App.
            </p>
            <div
              id="download"
              className="mt-8 sm:mt-10 flex flex-col sm:flex-row gap-4"
            >
              <a
                href={APP_STORE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-white text-black px-6 sm:px-8 py-3 sm:py-4 font-bold text-sm sm:text-base uppercase hover:bg-profitness-brown hover:text-white transition-all duration-300 rounded-lg shadow-lg"
              >
                <AppleIcon />
                App Store
              </a>
              <a
                href={PLAY_STORE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 border border-white text-white px-6 sm:px-8 py-3 sm:py-4 font-bold text-sm sm:text-base uppercase hover:bg-profitness-brown hover:border-profitness-brown transition-all duration-300 rounded-lg"
              >
                <AndroidIcon />
                Google Play
              </a>
            </div>
          </div>
        </section>

        <section className="py-12 sm:py-16 lg:py-20">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="section-heading mb-4 sm:mb-6">
              <span className="gradient-underline">HOW TO BOOK</span>
            </h2>
            <p className="text-gray-700 text-base sm:text-lg mb-6 sm:mb-8">
              Getting into your next class is easy:
            </p>
            <ol className="space-y-3 sm:space-y-4 text-gray-700 text-sm sm:text-base leading-relaxed list-decimal list-inside">
              <li>Open the Technogym App</li>
              <li>
                Tap the Facility icon at the bottom
                <span className="text-gray-500"> (Can&apos;t see it? Scan any Technogym machine and it&apos;ll pop up)</span>
              </li>
              <li>Head to Classes</li>
              <li>Scroll through the schedule and find your spot</li>
              <li>Tap Book — done!</li>
            </ol>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
