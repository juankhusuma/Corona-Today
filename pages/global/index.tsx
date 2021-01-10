import Head from "next/head";
import Link from "next/link"
import { useState, useEffect } from 'react';
import NProgress from 'nprogress';
export interface CountryData {
    attributes: {
        OBJECTID: number;
        Country_Region: string;
        Last_Update: number;
        Lat: number;
        Long_: number;
        Confirmed: number | null;
        Deaths: number | null;
        Recovered: number | null;
        Active: number | null;
    }
}
export interface WorldPopData {
    ok: boolean;
    body: {
        world_population
        total_countries
    }

}
interface WorldPositive {
    name: string;
    value: string;
}
// This function just add , to an Interger
// 1000000 -> 1,000,000
export const parseNum = (x: number): string => {
    var parts = x.toString().split(".");
    parts[0]=parts[0].replace(/\B(?=(\d{3})+(?!\d))/g,",");
    return parts.join(",");
}
interface Props {
    world_data: CountryData[],
    world_pop_data: WorldPopData;
    world_confirmed: {
        name: string;
        value: string;
    }
    world_recovered: {
        name: string;
        value: string
    }
    world_deaths: {
        name: string;
        value: string;
    }
}

export default function National({ world_data, world_pop_data, world_confirmed, world_recovered, world_deaths }: Props): JSX.Element {
    const [worldData, setWorldData] = useState(world_data);
    const LastUpdate = new Date(worldData[0].attributes.Last_Update)
    //This function sorts the table
    const sort = (sortBy) => {
        NProgress.start()
        console.log("Sorting...")

        switch (sortBy) {
            case "OBJECTID":
                setWorldData(
                    [...worldData].sort((a: CountryData, b: CountryData) => {
                        return (a.attributes.OBJECTID > b.attributes.OBJECTID) ? 1 : -1;
                    })
                );
                break;
            case "Confirmed":
                setWorldData(
                    [...worldData].sort((a: CountryData, b: CountryData) => {
                        return (a.attributes.Confirmed > b.attributes.Confirmed) ? -1 : 1;
                    })
                );
                break;
            case "Deaths":
                setWorldData(
                    [...worldData].sort((a: CountryData, b: CountryData) => {
                        return (a.attributes.Deaths > b.attributes.Deaths) ? -1 : 1;
                    })
                );
                break;
            case "Recovered":
                setWorldData(
                    [...worldData].sort((a: CountryData, b: CountryData) => {
                        return (a.attributes.Recovered > b.attributes.Recovered) ? -1 : 1;
                    })
                );
                break;
            case "Active":
                setWorldData(
                    [...worldData].sort((a: CountryData, b: CountryData) => {
                        return (a.attributes.Active > b.attributes.Active) ? -1 : 1;
                    })
                );
                break;
        }
        NProgress.done()
    }

    useEffect(()=>sort("OBJECTID"), [])

    const Month = ["Januari", "Febuari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"]

    //The Table's index
    let i = 0;
    return (
        <div className="flex flex-col items-center w-full p-3 md:p-10 font-Pro">
            <Head>
                <title>Corona Today | Global Case</title>
                <link rel="icon" href="/favicon.ico" />
                <meta name="description" content="Informasi seputar penyebaran virus COVID-19 di Seluruh Dunia" />
                <meta httpEquiv ="Content-Type" content="text/html;charset=UTF-8" />
                <meta name="keywords" content="Corona Virus covid-19 COVID 19 covid 19 COVID-19" />
                <meta name="robots" content="index, follow" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            </Head>
            <img src="/corona.svg" className="w-7 md:w-10 animate-pulse"/>
            <h1 className="title pb-1 border-b text-blue-600 mb-2 border-gray-300">Global Case</h1>
            <h2 className="subtitle w-3/4 md:w-1/2 lg:w-1/3 text-center text-gray-700 mb-5">Jumlah kasus positif, kematian, dan kesembuhan untuk seluruh dunia</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-3">
                <div className="card w-60 p-3 m-2">
                    <h1 className="font-bold text-center mb-2 pb-1 border-b border-gray-200">👪 Populasi Dunia</h1>
                    <p className="font-semibold text-gray-700 text-center">{parseNum(world_pop_data.body.world_population)}</p>
                </div>
                <div className="card w-60 p-3 m-2">
                    <h1 className="font-bold text-center mb-2 pb-1 border-b border-gray-200">😷  Data </h1>
                    <p className="font-semibold text-gray-700 flex justify-between">Terinfeksi <span>{world_confirmed.value}</span></p>
                    <hr/>
                    <p className="font-semibold text-gray-700 flex justify-between">Sembuh     <span>{world_recovered.value}</span></p>
                    <hr />
                    <p className="font-semibold text-gray-700 flex justify-between">Meninggal  <span>{world_deaths.value}</span></p>
                    <hr/>
                </div>
                <div className="card w-60 p-3 m-2">
                    <h1 className="font-bold text-center mb-2 pb-1 border-b border-gray-200">🕔 Data terakhir kali diperbaharui pada:</h1>
                    <p className="font-semibold text-gray-700 text-center">{`${LastUpdate.getDate()}`} {`${Month[LastUpdate.getMonth()]}`} {`${LastUpdate.getFullYear()}`}</p>
                    <p className="font-semibold text-gray-700 text-center">{`${LastUpdate.getHours()}`} : {`${LastUpdate.getMinutes()}`} : {`${LastUpdate.getSeconds()}`} ICT</p>
                </div>
            </div>
            
            <h3 className="font-semibold mt-10 text-center">
                Urutkan data berdasarkan:
                <select className="ml-2 font-bold text-pink-600 pt-1 pb-1 pl-2 pr-2 text-center shadow-md rounded-full" onChange={(e) => { sort(e.target.value) }}>
                    <option className="text-gray-800 font-bold" value="OBJECTID">Nama Negara</option>                    
                    <option className="text-gray-800 font-bold" value="Confirmed">Angka Positif Total</option>
                    <option className="text-gray-800 font-bold" value="Deaths">Angka Kematian</option>
                    <option className="text-gray-800 font-bold" value="Recovered">Angka Pasien Sembuh</option>
                    <option className="text-gray-800 font-bold" value="Active">Angka Pasien Aktif</option>
                </select>                
            </h3>

            {/* Data Table End */}
            <div className="mt-3 w-full md:w-3/4 h-96 overflow-y-auto overflow-x-auto flex flex-col items-center justify-items-center font-Pro">
                <Link href="/"><a className="back-btn">&larr;</a></Link>
                <table className=" w-full text-left table-auto table-row md:table">
                    <thead>
                        <tr>
                            <th className="p-1 md:p-2 text-sm md:text-lg border-gray-300 text-gray-900 text-center bg-gray-100 shadow-xl top-0 sticky">No.</th>
                            <th className="p-1 md:p-2 text-sm md:text-lg border-gray-300 text-gray-900 text-center bg-gray-100 shadow-xl top-0 sticky"><span className="block lg:inline">🌏</span>  Negara</th>
                            <th className="p-1 md:p-2 text-sm md:text-lg border-gray-300 text-gray-900 text-center bg-gray-100 shadow-xl top-0 sticky"><span className="block lg:inline">🏥</span> Total</th>
                            <th className="p-1 md:p-2 text-sm md:text-lg border-gray-300 text-gray-900 text-center bg-gray-100 shadow-xl top-0 sticky"><span className="block lg:inline">😄</span> Sembuh</th>
                            <th className="p-1 md:p-2 text-sm md:text-lg border-gray-300 text-gray-900 text-center bg-gray-100 shadow-xl top-0 sticky"><span className="block lg:inline">😢</span> Meninggal</th>
                            <th className="p-1 md:p-2 text-sm md:text-lg border-gray-300 text-gray-900 text-center bg-gray-100 shadow-xl top-0 sticky"><span className="block lg:inline">🤒</span> Aktif</th>                          
                        </tr>
                    </thead>
                    <tbody>
                        {
                            worldData.map((item: CountryData): JSX.Element => {
                                let value = item.attributes
                                i++
                                return (
                                    <tr key={value.Country_Region}>
                                        <td className="p-2 border text-gray-800 font-semibold border-gray-300 text-center">{i}</td>
                                        <td className="p-2 border font-bold border-gray-300"><Link href={`/global/${value.Country_Region.replace(/\*/g,'')}`}><a className="text-blue-600 hover:underline" target="_blank">{value.Country_Region.replace(/\*/g,'')}</a></Link></td>
                                        <td className="p-2 border confirmed border-blue-500">{value.Confirmed !== null ? parseNum(value.Confirmed) : "Tidak Diketahui"}</td>
                                        <td className="p-2 border recovered border-green-500">{value.Recovered !== null ? parseNum(value.Recovered) : "Tidak Diketahui"}</td>
                                        <td className="p-2 border deaths text-gray-800 border-red-500">{value.Deaths !== null ? parseNum(value.Deaths) : "Tidak Diketahui"}</td>
                                        <td className="p-2 border active text-gray-800 border-purple-800">{value.Active !== null ? parseNum(value.Active) : "Tidak Diketahui"}</td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
            {/* Data Table End */}
        </div>
    )
}



//Make API calls to obtain data
export async function getStaticProps({ params }): Promise<{ props: { world_data: CountryData[]; world_pop_data: WorldPopData; world_confirmed: WorldPositive; world_recovered: any; world_deaths: any; }; revalidate: number; }> {
    let world_case_req = await fetch("https://jdk-covid-proxy.herokuapp.com/global");
    let _world_positive = await fetch("https://jdk-covid-proxy.herokuapp.com/global-positif");
    let _world_positive_data: WorldPositive = await _world_positive.json();
    let _world_recovered = await fetch("https://jdk-covid-proxy.herokuapp.com/global-sembuh");
    let _world_recovered_data = await _world_recovered.json()
    let _world_deaths = await fetch("https://jdk-covid-proxy.herokuapp.com/global-meninggal");
    let _world_deaths_data = await _world_deaths.json()
    let world_case_data: CountryData[] = await world_case_req.json();
    let world_pop_req = await fetch("https://world-population.p.rapidapi.com/worldpopulation", {
        "method": "GET",
        "headers": {
            "x-rapidapi-key": "ae3747bc6emsh9de287a24646ec9p11f42djsn3052d1d14d46",
            "x-rapidapi-host": "world-population.p.rapidapi.com"
        }
    });

    let world_pop_data: WorldPopData = await world_pop_req.json();
    return {
        props: {
            world_data: world_case_data,
            world_pop_data: world_pop_data,
            world_confirmed: _world_positive_data,
            world_recovered: _world_recovered_data,
            world_deaths: _world_deaths_data,
        },
        revalidate: 60,
    }
}