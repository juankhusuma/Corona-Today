import Link from "next/link";
import Head from "next/head";
import Image from 'next/image';

export default function Prevention() {
    return (
        <div className="flex flex-col items-center justify-center pt-10 font-Pro">
            <Head>
                <title>Corona Today | Pencegahan</title>
            </Head>
            <Link href="/"><a className="back-btn">&larr;</a></Link>
            <img src="/corona.svg" className="w-7 md:w-10 animate-pulse"/>
            <h1 className="title mt-5 mb-3 text-blue-600 pb-2 border-b border-gray-300 text-center">Pencegahan</h1>
            <h2 className="subtitle text-gray-800 text-center md:w-1/2 mb-5 md:mb-10 p-1">Hal-hal yang dapat anda lakukan untuk mencegah penyebaran virus COVID-19</h2>

            <div className="grid grid-cols-1 md:grid-cols-3">
                <div className="card p-3 w-60 text-center flex flex-col items-center justify-center m-2">
                    <Image width={100} height={100} src="/preventions/Hand Wash.svg"></Image>
                    <h1 className="font-semibold md:text-lg text-gray-700 mt-1 mb-1">Sering-seringlah mencuci tangan anda</h1>
                    <hr />
                    <p className="text-gray-600 text-xs md:text-base">Cucilah tangan anda secara menyeluruh, dengan sabun dan air, atau dengan <i>Hand Sanitizer</i> berbasis alkohol.</p>
                </div>
                <div className="card p-3 w-60 text-center flex flex-col items-center justify-center m-2">
                    <Image width={100} height={100} src="/preventions/Social Distance 6ft.svg"></Image>
                    <h1 className="font-semibold md:text-lg text-gray-700 mt-1 mb-1">Jaga Jarak</h1>
                    <hr />
                    <p className="text-gray-600 text-xs md:text-base">Jaga jarak &plusmn;2m dengan orang lain, dan hindari kontak fisik, terutama jika orang tersebut sedang batuk-batuk atau bersin.</p>
                </div>
                <div className="card p-3 w-60 text-center flex flex-col items-center justify-center m-2">
                    <Image width={100} height={100} src="/preventions/Male Patient.svg"></Image>
                    <h1 className="font-semibold md:text-lg text-gray-700 mt-1 mb-1">Kenakan Masker</h1>
                    <hr />
                    <p className="text-gray-600 text-xs md:text-base">Selalu kenakan masker apabila bepergian keluar rumah, terutama ke tempat-tempat dimana kontak fisik tidak dapat dihindari.</p>
                </div>
                <div className="card p-3 w-60 text-center flex flex-col items-center justify-center m-2">
                    <Image width={100} height={100} src="/preventions/Hand Infected.svg"></Image>
                    <h1 className="font-semibold md:text-lg text-gray-700 mt-1 mb-1">Jangan Sentuh Muka Anda</h1>
                    <hr />
                    <p className="text-gray-600 text-xs md:text-base">Muka anda adalah bagian yang paling rentan menjadi tempat masuknya virus COVID-19, terutama mata, hidung, dan mulut anda, sehingga usahakan agar tidak terlalu sering menyentuh muka anda.</p>
                </div>
                <div className="card p-3 w-60 text-center flex flex-col items-center justify-center m-2">
                    <Image width={100} height={100} src="/preventions/Stay at Home.svg"></Image>
                    <h1 className="font-semibold md:text-lg text-gray-700 mt-1 mb-1">Tetap di Rumah</h1>
                    <hr />
                    <p className="text-gray-600 text-xs md:text-base">Apabila tidak ada keperluan penting usahakan agar anda tetap berada di rumah saja, terutama jika anda sedang tidak enak badan.</p>
                </div>
                <div className="card p-3 w-60 text-center flex flex-col items-center justify-center m-2">
                    <Image width={100} height={100} src="/preventions/Self Quarantine.svg"></Image>
                    <h1 className="font-semibold md:text-lg text-gray-700 mt-1 mb-1">Karantina Diri Apabila Mengalami Gejala</h1>
                    <hr />
                    <p className="text-gray-600 text-xs md:text-base">Apabila anda mengalami gejala-gejala virus COVID-19, isolasikan diri anda sesegara mungkin untuk memutus rantai penyebaran.</p>
                </div>
            </div>
        </div>
    );
}