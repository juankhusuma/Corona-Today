import Link from "next/link";
import Head from "next/head";
import Image from "next/image";

export default function Symptoms(): JSX.Element {
    return (
        <div className="flex flex-col items-center justify-center pt-10 font-Pro">
            <Head>
                <title>Corona Today | Gejala</title>
                <link rel="icon" href="/favicon.ico" />
                <meta name="description" content="Gejala-gejala COVID-19" />
                <meta httpEquiv ="Content-Type" content="text/html;charset=UTF-8" />
                <meta name="keywords" content="Corona Virus covid-19 COVID 19 covid 19 COVID-19" />
                <meta name="robots" content="index, follow" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            </Head>
            <Link href="/"><a className="back-btn">&larr;</a></Link>
            <img src="/corona.svg" className="w-7 md:w-10 animate-pulse"/>
            <h1 className="title mt-5 mb-3 text-blue-600 pb-2 text-center border-b border-gray-300">Gejala</h1>
            <h2 className="subtitle text-gray-800 text-center mb-10 md:mb-16">Berikut adalah gejala-gejala dari virus COVID-19</h2>
            <div className="flex flex-col justify-center items-center">
                <h1 className="subtitle text-gray-700 text-center border-b border-gray-300">Gejala Berbahaya</h1>
                <h2 className="font-semibold text-gray-600 text-center">Gejala yang harus segera ditangani dan dapat berakibat fatal.</h2>
                <div className="mt-5 grid grid-cols-1 md:grid-cols-3">
                    <div className="card p-3 w-60 text-center flex flex-col items-center justify-center m-2">
                        <Image width={100} height={100} src="/symptoms/infected.svg"></Image>
                        <hr/>
                        <h1 className="text-lg font-bold text-blue-800 mt-1">Kesulitan Bernapas atau Sesak Napas</h1>
                    </div>
                    <div className="card p-3 w-60 text-center flex flex-col items-center justify-center m-2">
                        <Image width={100} height={100} src="/symptoms/chest-pain-or-pressure.svg"></Image>
                        <hr/>
                        <h1 className="text-lg font-bold text-blue-800 mt-1">Rasa Sakit Pada Dada atau Dada Terasa Tertekan</h1>
                    </div>
                    <div className="card p-3 w-60 text-center flex flex-col items-center justify-center m-2">
                        <Image width={100} height={100} src="/symptoms/loss-of-sense-of-taste.svg"></Image>
                        <hr/>
                        <h1 className="text-lg font-bold text-blue-800 mt-1">Kesulitan Berbicara atau Bergerak</h1>
                    </div>
                </div>
            </div>
            <div className="flex flex-col justify-center items-center mt-10">
                <h1 className="subtitle text-gray-700 text-center border-b border-gray-300">Gejala Umum</h1>
                <h2 className="font-semibold text-gray-600 text-center">Gejala yang paling umum dan paling sering ditemukan pada penderita COVID-19.</h2>
                <div className="mt-5 grid grid-cols-1 md:grid-cols-3">
                    <div className="card p-3 w-60 text-center flex flex-col items-center justify-center m-2">
                        <Image width={100} height={100} src="/symptoms/fever.svg"></Image>
                        <hr/>
                        <h1 className="text-lg font-bold text-blue-800 mt-1">Demam</h1>
                    </div>
                    <div className="card p-3 w-60 text-center flex flex-col items-center justify-center m-2">
                        <Image width={100} height={100} src="/symptoms/dry-cough.svg"></Image>
                        <hr/>
                        <h1 className="text-lg font-bold text-blue-800 mt-1">Batuk Kering</h1>
                    </div>
                    <div className="card p-3 w-60 text-center flex flex-col items-center justify-center m-2">
                        <Image width={100} height={100} src="/symptoms/exhaustion.svg"></Image>
                        <hr/>
                        <h1 className="text-lg font-bold text-blue-800 mt-1">Kelelahan</h1>
                    </div>
                </div>
            </div>
            <div className="flex flex-col justify-center items-center mt-10">
                <h1 className="subtitle text-gray-700 text-center border-b border-gray-300">Gejala Lainya</h1>
                <h2 className="font-semibold text-gray-600 text-center">Gejala lainya yang hanya muncul pada sebagian penderita COVID-19.</h2>
                <div className="mt-5 grid grid-cols-1 md:grid-cols-3">
                    <div className="card p-3 w-60 text-center flex flex-col items-center justify-center m-2">
                        <Image width={100} height={100} src="/symptoms/sore-throat.svg"></Image>
                        <hr/>
                        <h1 className="text-lg font-bold text-blue-800 mt-1">Sakit Tenggorokan</h1>
                    </div>
                    <div className="card p-3 w-60 text-center flex flex-col items-center justify-center m-2">
                        <Image width={100} height={100} src="/symptoms/diarrhea.svg"></Image>
                        <hr/>
                        <h1 className="text-lg font-bold text-blue-800 mt-1">Diare</h1>
                    </div>
                    <div className="card p-3 w-60 text-center flex flex-col items-center justify-center m-2">
                        <Image width={100} height={100} src="/symptoms/conjunctivitis.svg"></Image>
                        <hr/>
                        <h1 className="text-lg font-bold text-blue-800 mt-1">Konjungtivitis</h1>
                    </div>
                    <div className="card p-3 w-60 text-center flex flex-col items-center justify-center m-2">
                        <Image width={100} height={100} src="/symptoms/decreased-concentration.svg"></Image>
                        <hr/>
                        <h1 className="text-lg font-bold text-blue-800 mt-1">Sakit dan Nyeri pada Kepala dan Tubuh</h1>
                    </div>
                    <div className="card p-3 w-60 text-center flex flex-col items-center justify-center m-2">
                        <Image width={100} height={100} src="/symptoms/loss-of-sense-of-taste (1).svg"></Image>
                        <hr/>
                        <h1 className="text-lg font-bold text-blue-800 mt-1">Hilangnya Penciuman dan Pengecapan</h1>
                    </div>
                    <div className="card p-3 w-60 text-center flex flex-col items-center justify-center m-2">
                        <Image width={100} height={100} src="/symptoms/rash.svg"></Image>
                        <hr/>
                        <h1 className="text-lg font-bold text-blue-800 mt-1">Ruam dan Perubahan Warna pada Kulit</h1>
                    </div>
                </div>
            </div>
        </div>
    )
}