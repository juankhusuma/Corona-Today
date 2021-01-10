import { useRouter } from "next/router";
import { useState } from 'react';
import { NationalData, ProvinceData, NationalPopData } from './index';
import { round } from "../global/[country]";
import { parseNum } from '../global/index';
import Link from "next/link";
import Head from 'next/head';

interface Props {
    national_pop: NationalPopData;
    province_data: ProvinceData[];
    national_data: NationalData[];
}

export default function National({national_pop, province_data, national_data}: Props): JSX.Element {
    const Router = useRouter();
    const { province } = Router.query;
    const [showEasterEgg, setShowEasterEgg] = useState(false);
    const [easterEggCounter, setEasterEggCounter] = useState(0);

    let curr_province_data: ProvinceData;
    for (let i = 0; i < province_data.length; i++) {
        if (province_data[i].attributes.Provinsi === province) {
            curr_province_data = province_data[i]
        }
    }
    const total_case_rank = province_data.sort((a: ProvinceData, b: ProvinceData) => (a.attributes.Kasus_Posi > b.attributes.Kasus_Posi) ? -1 : 1).indexOf(curr_province_data) + 1;
    const recovered_case_rank = province_data.sort((a: ProvinceData, b: ProvinceData) => (a.attributes.Kasus_Semb > b.attributes.Kasus_Semb) ? -1 : 1).indexOf(curr_province_data) + 1;
    const deaths_case_rank = province_data.sort((a: ProvinceData, b: ProvinceData) => (a.attributes.Kasus_Meni > b.attributes.Kasus_Meni) ? -1 : 1).indexOf(curr_province_data) + 1;
    const active_case_rank = province_data.sort((a: ProvinceData, b: ProvinceData) => (a.attributes.Kasus_Posi - a.attributes.Kasus_Semb - a.attributes.Kasus_Meni > b.attributes.Kasus_Posi - b.attributes.Kasus_Semb - b.attributes.Kasus_Meni) ? -1 : 1).indexOf(curr_province_data) + 1;

    const toggleEasterEgg = () => {
        if (easterEggCounter >= 7) {
            setShowEasterEgg(true);
            alert("Yahahaha hayyuk kudasai");
        } else if (easterEggCounter >= 14) {
            alert("Yahahaha hayyuk kudasai")
        }
        else {
            setEasterEggCounter(easterEggCounter + 1);
        }
    }

    return (
        <div className="flex flex-col items-center p-3 font-Pro pt-10">
            <Link href="/national"><a className="back-btn">&larr;</a></Link>
            <Head>
                <title>Corona Today | {province}</title>
            </Head>
            
            {!showEasterEgg && <h1 className="title text-center text-blue-600 mb-5 pb-1 border-b border-gray-300">{province}</h1>}
            {showEasterEgg && <h1 className="title text-center text-pink-500 mb-5 pb-1 border-b border-gray-300"><p>{"\{\\_/}"}</p><p>{"( •_•)"}</p><p>{"/v  v"}</p></h1>}
            
            <h2 className="subtitle mt-10 mb-5 md:mb-10">National Leaderboard</h2>
            <div className=" grid grid-cols-1 md:grid-cols-2 text-gray-700">
                
                <div className="card text-center p-3 mt-4 w-48 h-24 md:w-72 md:h-28 m-2">
                    <div>🚑</div>
                    <h1 className="font-semibold text-gray-800 md:font-bold text-sm md:text-base">Jumlah Angka Positif Total</h1>
                    <hr/>
                    <h2 className="font-semibold text-xs md:text-base">
                        Peringkat
                        <span className="ml-2 text-blue-600">{total_case_rank}/{province_data.length}</span>
                    </h2>
                </div>
                <div className="card text-center p-3 mt-4 w-48 h-24 md:w-72 md:h-28 m-2">
                    <div>🚑</div>
                    <h1 className="font-semibold text-gray-800 md:font-bold text-sm md:text-base">Persentase Jumlah Angka Positif Total</h1>
                    <hr/>
                    <h2 className="font-semibold text-xs md:text-base">
                        <span className="mr-2 text-blue-600">{`${round(curr_province_data.attributes.Kasus_Posi / parseInt(national_data[0].positif.replace(/,/g,'')) * 100, 7)}%`}</span>
                        <span>National Case</span>
                    </h2>
                </div>
                <div className="card text-center p-3 mt-4 w-48 h-24 md:w-72 md:h-28 m-2">
                    <div>😄</div>
                    <h1 className="font-semibold text-gray-800 md:font-bold text-sm md:text-base">Jumlah Angka Pasien Sembuh</h1>
                    <hr/>
                    <h2 className="font-semibold text-xs md:text-base">
                        Peringkat
                        <span className="ml-2 text-blue-600">{recovered_case_rank}/{province_data.length}</span>
                    </h2>
                </div>
                <div className="card text-center p-3 mt-4 w-48 h-24 md:w-72 md:h-28 m-2">
                    <div>😄</div>
                    <h1 className="font-semibold text-gray-800 md:font-bold text-sm md:text-base">Persentase Jumlah Angka Pasien Sembuh</h1>
                    <hr/>
                    <h2 className="font-semibold text-xs md:text-base">
                        <span className="mr-2 text-blue-600">{`${round(curr_province_data.attributes.Kasus_Semb/ parseInt(national_data[0].sembuh.replace(/,/g,'')) * 100, 7)}%`}</span>
                        <span>National Case</span>
                    </h2>
                </div>
                <div className="card text-center p-3 mt-4 w-48 h-24 md:w-72 md:h-28 m-2">
                    <div>😢</div>
                    <h1 className="font-semibold text-gray-800 md:font-bold text-sm md:text-base">Jumlah Angka Kematian</h1>
                    <hr/>
                    <h2 className="font-semibold text-xs md:text-base">
                        Peringkat
                        <span className="ml-2 text-blue-600">{deaths_case_rank}/{province_data.length}</span>
                    </h2>
                </div>
                <div className="card text-center p-3 mt-4 w-48 h-24 md:w-72 md:h-28 m-2">
                    <div>😢</div>
                    <h1 className="font-semibold text-gray-800 md:font-bold text-sm md:text-base">Persentase Jumlah Angka Kematian</h1>
                    <hr/>
                    <h2 className="font-semibold text-xs md:text-base">
                        <span className="mr-2 text-blue-600">{`${round(curr_province_data.attributes.Kasus_Meni/ parseInt(national_data[0].meninggal.replace(/,/g,'')) * 100, 7)}%`}</span>
                        <span>National Case</span>
                    </h2>
                </div>
                <div className="card text-center p-3 mt-4 w-48 h-24 md:w-72 md:h-28 m-2">
                    <div>🤒</div>
                    <h1 className="font-semibold text-gray-800 md:font-bold text-sm md:text-base">Jumlah Angka Pasien Aktif</h1>
                    <hr/>
                    <h2 className="font-semibold">
                        Peringkat
                        <span className="ml-2 text-blue-600">{active_case_rank}/{province_data.length}</span>
                    </h2>
                </div>
                <div className="card text-center p-3 mt-4 w-48 h-24 md:w-72 md:h-28 m-2">
                    <div>🤒</div>
                    <h1 className="font-semibold text-gray-800 md:font-bold text-sm md:text-base">Persentase Jumlah Angka Pasien Aktif</h1>
                    <hr/>
                    <h2 className="font-semibold text-xs md:text-base">
                        <span className="mr-2 text-blue-600">{`${round((curr_province_data.attributes.Kasus_Posi - curr_province_data.attributes.Kasus_Semb - curr_province_data.attributes.Kasus_Meni)/ parseInt(national_data[0].dirawat.replace(/,/g,'')) * 100, 7)}%`}</span>
                        <span>National Case</span>
                    </h2>
                </div>
            </div>
            
            <h2 className="subtitle mt-5 md:mt-10 mb-5 md:mb-10 ">Local Stats</h2>

            <div>
                <div className="card text-center p-3 mt-4 w-48 h-24 md:w-72 md:h-28 m-2">
                    <p>🚑</p>
                    <h1 className="font-semibold text-gray-800 md:font-bold text-sm md:text-base">Angka Positif Total</h1>
                    <hr />
                    <p className="font-semibold text-xs md:text-base text-blue-700">{parseNum(curr_province_data.attributes.Kasus_Posi)}</p>
                </div>
            </div>
            <div className="mt-2 md:mt-5 grid grid-cols-1 md:grid-cols-3">
                <div className="card text-center p-3 mt-4 w-48 h-24 md:w-60 md:h-28 m-2">
                    <p>😄</p>
                    <h1 className="font-semibold text-gray-800 md:font-bold text-sm md:text-base">Pasien Sembuh</h1>
                    <hr />
                    <p className="font-semibold text-xs md:text-base text-blue-700">{parseNum(curr_province_data.attributes.Kasus_Semb)}</p>
                </div>
                <div className="card text-center p-3 mt-4 w-48 h-24 md:w-60 md:h-28 m-2">
                    <p>😢</p>
                    <h1 className="font-semibold text-gray-800 md:font-bold text-sm md:text-base">Kematian</h1>
                    <hr />
                    <p className="font-semibold text-xs md:text-base text-blue-700">{parseNum(curr_province_data.attributes.Kasus_Meni)}</p>
                </div>
                <div className="card text-center p-3 mt-4 w-48 h-24 md:w-60 md:h-28 m-2">
                    <p>🤒</p>
                    <h1 className="font-semibold text-gray-800 md:font-bold text-sm md:text-base">Aktif</h1>
                    <hr />
                    <p className="font-semibold text-xs md:text-base text-blue-700">{parseNum(curr_province_data.attributes.Kasus_Posi - curr_province_data.attributes.Kasus_Semb - curr_province_data.attributes.Kasus_Meni)}</p>
                </div>
            </div>
            {province === "Riau" && <button className="w-3 h-3 bg-red-500 opacity-0" onClick={() => { toggleEasterEgg(); console.log(`Mumtaz${easterEggCounter}`, showEasterEgg)}}>++</button>}
        </div>
    );
}

export async function getStaticProps({ params }): Promise<{ props: { national_pop: NationalPopData; province_data: ProvinceData[]; national_data: NationalData[]; }; }> {

    let national_pop_req = await fetch("https://world-population.p.rapidapi.com/population?country_name=Indonesia", {
        "method": "GET",
        "headers": {
            "x-rapidapi-key": "ae3747bc6emsh9de287a24646ec9p11f42djsn3052d1d14d46",
            "x-rapidapi-host": "world-population.p.rapidapi.com"
        }
    })
    let national_pop_data: NationalPopData = await national_pop_req.json();
    
    let province_data_req = await fetch("http://jdk-covid-proxy.herokuapp.com/provinsi");
    let province_data: ProvinceData[] = await province_data_req.json();
    
    let national_data_req = await fetch("http://jdk-covid-proxy.herokuapp.com/nasional");
    let national_data: NationalData[] = await national_data_req.json();

    return (
        {
            props: {
                national_pop: national_pop_data,
                province_data: province_data,
                national_data: national_data,
            }
        }
    );
}

export async function getStaticPaths() {
    const req = await fetch("http://jdk-covid-proxy.herokuapp.com/provinsi");
    const data = await req.json();
    const paths = data.map((item: ProvinceData) => { return { params: { province: item.attributes.Provinsi } } });

    return {
        paths,
        fallback: false,
    }
}