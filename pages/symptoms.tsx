import Link from "next/link";
import Head from "next/head";

export default function Symptoms(): JSX.Element {
    return (
        <div className="flex flex-col items-center justify-center pt-10 font-Pro">
            <Head>
                <title>Corona Today | Gejala</title>
            </Head>
            <Link href="/"><a className="back-btn">&larr;</a></Link>
            <img src="/corona.svg" className="w-7 md:w-10 animate-pulse"/>
            <h1 className="title mt-5 mb-5 text-gray-900 pb-2 border-b border-gray-300">Gejala COVID-19</h1>
            <p>Coming Soon!</p>
        </div>
    )
}