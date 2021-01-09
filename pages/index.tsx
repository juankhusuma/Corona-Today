import Head from 'next/head';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="font-Pro">
      <Head>
        <title>Corona Today | Home</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content="Informasi seputar virus COVID-19, memuat informasi seputar jumlah korban terinfeksi, jumlah kematian, dan jumlah pasien yang sembuh, baik di dalam maupun luar negeri" />
        <meta httpEquiv ="Content-Type" content="text/html;charset=UTF-8" />
        <meta name="keywords" content="Corona Virus covid-19 COVID 19 covid 19 COVID-19" />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <div className="flex flex-col justify-around items-center w-full h-full mt-8">
        {/* Header */}
        <header className="tracking-wide flex flex-col items-center justify-center w-full h-1/4">
          <img src="/corona.svg" alt="Corona Virus" className="w-7 md:w-10 animate-pulse"/>
          <h1 className="title text-gray-900 flex items-center border-b border-gray-300 pb-2 mt-2">
            Corona
            <span className="text-blue-700 ml-2 md:ml-4">Today</span>
          </h1>
          <h2 className="subtitle text-gray-800 text-center p-1 tracking-normal">Informasi seputar virus <span className="text-blue-600">COVID-19</span></h2>
        </header>
        {/* Header End */}

        {/* Main */}
        <main className="mt-10">

          <section className="grid grid-cols-1 md:grid-cols-2">
            <Link href="/global">
              <a>
                <div className="card p-5 hover:shadow-none transition-shadow m-2 max-w-md h-28">
                  <h1 className="text-sm sm:text-lg font-bold text-gray-700"><span className="mr-2">🌏</span> Jumlah Kasus Global <span className="text-bold text-lg">&rarr;</span></h1>
                  <hr/>
                  <p className="text-xs sm:text-base font-semibold text-gray-600 pt-1">Jumlah kasus positif, kematian, dan kesembuhan untuk seluruh dunia</p>
                </div>
              </a>
            </Link>
            <Link href="/national">
              <a>
                <div className="card p-5 hover:shadow-none transition-shadow m-2 max-w-md h-28">
                  <h1 className="text-sm sm:text-lg font-bold text-gray-700"><span className="mr-2">🇮🇩</span> Jumlah Kasus Nasional <span className="text-bold text-lg">&rarr;</span></h1>
                  <hr/>
                  <p className="text-xs sm:text-base font-semibold text-gray-600 ">Jumlah kasus positif, kematian, dan kesembuhan di Indonesia</p>
                </div>
              </a>
            </Link>
            <Link href="/symptoms">
              <a>
                <div className="card p-5 hover:shadow-none transition-shadow m-2 max-w-md h-28">
                  <h1 className="text-sm sm:text-lg font-bold text-gray-700"><span className="mr-2">😓</span> Gejala <span className="text-bold text-lg">&rarr;</span></h1>
                  <hr/>
                  <p className="text-xs sm:text-base font-semibold text-gray-600 ">Pelajari apa saja gejala-gejala COVID-19</p>
                </div>
              </a>
            </Link>
            <Link href="/prevention">
              <a>
                <div className="card p-5 hover:shadow-none transition-shadow m-2 max-w-md h-28">
                  <h1 className="text-sm sm:text-lg font-bold text-gray-700"><span className="mr-2">😷</span> Pencegahan <span className="text-bold text-lg">&rarr;</span></h1>
                  <hr/>
                  <p className="text-xs sm:text-base font-semibold text-gray-600">Pelajari bagaimana cara mencegah penularan COVID-19</p>
                </div>
              </a>
            </Link>
          </section>

        </main>
        {/* Main End */}
      </div>
    </div>
  )
}
