import Head from "next/head";
import Link from "next/link"
import { useState, useEffect } from 'react';
import NProgress from 'nprogress';

export interface WorldPopData {
    ok: boolean;
    body: {
        world_population
        total_countries
    }

}
// This function just add , to an Interger
// 1000000 -> 1,000,000
export const parseNum = (x: number): string => {
    var parts = x.toString().split(".");
    parts[0]=parts[0].replace(/\B(?=(\d{3})+(?!\d))/g,",");
    return parts.join(",");
}

export interface NationalData {
    name: "Indonesia";
    positif: string;
    sembuh: string;
    meninggal: string;
    dirawat: string;
}
export interface ProvinceData {
    attributes: {
        FID: number;
        Kode_Provi: number;
        Provinsi: string;
        Kasus_Posi: number;
        Kasus_Semb: number;
        Kasus_Meni: number;
    }
}
export interface NationalPopData {
    ok: boolean;
    body: {
        country_name: string;
        population: number;
        ranking: number;
        world_share: number;
    }
}
interface Props {
    world_pop_data: WorldPopData;
    national_pop: NationalPopData;
    province_data: ProvinceData[];
    national_data: NationalData[];
}


export default function Global({ world_pop_data, national_pop, province_data, national_data }: Props): JSX.Element {
    const [provinceData, setProvinceData] = useState(province_data);
    //This function sorts the table
    const sort = (sortBy) => {
        NProgress.start()
        console.log("Sorting...")
        
        switch (sortBy) {
            case "OBJECTID":
                setProvinceData(
                    [...provinceData].sort((a: ProvinceData, b: ProvinceData) => {
                        return (a.attributes.Provinsi > b.attributes.Provinsi) ? 1 : -1;
                    })
                );
                break;
            case "Confirmed":
                setProvinceData(
                    [...provinceData].sort((a: ProvinceData, b: ProvinceData) => {
                        return (a.attributes.Kasus_Posi > b.attributes.Kasus_Posi) ? -1 : 1;
                    })
                );
                break;
            case "Deaths":
                setProvinceData(
                    [...provinceData].sort((a: ProvinceData, b: ProvinceData) => {
                        return (a.attributes.Kasus_Meni > b.attributes.Kasus_Meni) ? -1 : 1;
                    })
                );
                break;
            case "Recovered":
                setProvinceData(
                    [...provinceData].sort((a: ProvinceData, b: ProvinceData) => {
                        return (a.attributes.Kasus_Semb > b.attributes.Kasus_Semb) ? -1 : 1;
                    })
                );
                break;
            case "Active":
                setProvinceData(
                    [...provinceData].sort((a: ProvinceData, b: ProvinceData) => {
                        return ((a.attributes.Kasus_Posi - a.attributes.Kasus_Meni - a.attributes.Kasus_Semb) > (b.attributes.Kasus_Posi - b.attributes.Kasus_Meni - b.attributes.Kasus_Semb)) ? -1 : 1;
                    })
                );
                break;
        }
        NProgress.done()
    }

    useEffect(()=>sort("OBJECTID"), [])

    //The Table's index
    let i = 0;
    return (
        <div className="flex flex-col items-center w-full p-3 md:p-10 font-Pro">
            <Head>
                <title>Corona Today | National Case</title>
                <link rel="icon" href="/favicon.ico" />
                <meta name="description" content="Informasi seputar penyebaran virus COVID-19 di Indonesia" />
                <meta httpEquiv ="Content-Type" content="text/html;charset=UTF-8" />
                <meta name="keywords" content="Corona Virus covid-19 COVID 19 covid 19 COVID-19" />
                <meta name="robots" content="index, follow" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            </Head>
            <img src="/corona.svg" className="w-7 md:w-10 animate-pulse"/>
            <h1 className="title pb-1 border-b text-blue-600 mb-2 border-gray-300">National Case</h1>
            <h2 className="subtitle w-3/4 md:w-1/2 lg:w-1/3 text-center text-gray-700 mb-5">Jumlah kasus positif, kematian, dan kesembuhan di Indonesia</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-3">
                <div className="card w-60 p-3 m-2">
                    <h1 className="font-bold text-center mb-2 pb-1 border-b border-gray-200">👪 Populasi Dunia</h1>
                    <p className="font-semibold text-gray-700 text-center">{parseNum(world_pop_data.body.world_population)}</p>
                </div>
                <div className="card w-60 p-3 m-2">
                    <h1 className="font-bold text-center mb-2 pb-1 border-b border-gray-200">😷  Data </h1>
                    <p className="font-semibold text-gray-700 flex justify-between">Terinfeksi <span>{national_data[0].positif}</span></p>
                    <hr/>
                    <p className="font-semibold text-gray-700 flex justify-between">Sembuh     <span>{national_data[0].sembuh}</span></p>
                    <hr />
                    <p className="font-semibold text-gray-700 flex justify-between">Meninggal  <span>{national_data[0].meninggal}</span></p>
                    <hr/>
                </div>
                <div className="card w-60 p-3 m-2">
                    <h1 className="font-bold text-center mb-2 pb-1 border-b border-gray-200">👨‍👨‍👦‍👦  Populasi Indonesia</h1>
                    <p className="font-semibold text-gray-700 text-center">{parseNum(national_pop.body.population)}</p>
                </div>
            </div>
            
            <h3 className="font-semibold mt-10 text-center">
                Urutkan data berdasarkan:
                <select className="ml-2 font-bold text-pink-600 pt-1 pb-1 pl-2 pr-2 text-center shadow-md rounded-full" onChange={(e) => { sort(e.target.value) }}>
                    <option className="text-gray-800 font-bold" value="OBJECTID">Nama Provinsi</option>                    
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
                            <th className="p-1 md:p-2 text-sm md:text-lg border-gray-300 text-gray-900 text-center bg-gray-100 shadow-xl top-0 sticky"><span className="block lg:inline">🌏</span> Provinsi</th>
                            <th className="p-1 md:p-2 text-sm md:text-lg border-gray-300 text-gray-900 text-center bg-gray-100 shadow-xl top-0 sticky"><span className="block lg:inline">🏥</span> Total</th>
                            <th className="p-1 md:p-2 text-sm md:text-lg border-gray-300 text-gray-900 text-center bg-gray-100 shadow-xl top-0 sticky"><span className="block lg:inline">😄</span> Sembuh</th>
                            <th className="p-1 md:p-2 text-sm md:text-lg border-gray-300 text-gray-900 text-center bg-gray-100 shadow-xl top-0 sticky"><span className="block lg:inline">😢</span> Meninggal</th>
                            <th className="p-1 md:p-2 text-sm md:text-lg border-gray-300 text-gray-900 text-center bg-gray-100 shadow-xl top-0 sticky"><span className="block lg:inline">🤒</span> Aktif</th>                          
                        </tr>
                    </thead>
                    <tbody>
                        {
                            provinceData.map((item: ProvinceData): JSX.Element => {
                                let value = item.attributes
                                i++
                                return (
                                    <tr key={value.FID}>
                                        <td className="p-2 border text-gray-800 font-semibold border-gray-300 text-center">{i}</td>
                                        <td className="p-2 border font-bold border-gray-300"><Link href={`/national/${value.Provinsi}`}><a className="text-blue-600 hover:underline" target="_blank">{value.Provinsi}</a></Link></td>
                                        <td className="p-2 border confirmed border-blue-500">{value.Kasus_Posi !== null ? parseNum(value.Kasus_Posi) : "Tidak Diketahui"}</td>
                                        <td className="p-2 border recovered border-green-500">{value.Kasus_Semb !== null ? parseNum(value.Kasus_Semb) : "Tidak Diketahui"}</td>
                                        <td className="p-2 border deaths text-gray-800 border-red-500">{value.Kasus_Meni !== null ? parseNum(value.Kasus_Meni) : "Tidak Diketahui"}</td>
                                        <td className="p-2 border active text-gray-800 border-purple-800">{value.Kasus_Posi - value.Kasus_Meni - value.Kasus_Semb !== null ? parseNum(value.Kasus_Posi - value.Kasus_Meni - value.Kasus_Semb) : "Tidak Diketahui"}</td>
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
export async function getStaticProps({ params }): Promise<{ props: { world_pop_data: WorldPopData; national_pop: NationalPopData; province_data: ProvinceData[]; national_data: NationalData[]; }; revalidate: number; }> {


    let world_pop_req = await fetch("https://world-population.p.rapidapi.com/worldpopulation", {
        "method": "GET",
        "headers": {
            "x-rapidapi-key": "ae3747bc6emsh9de287a24646ec9p11f42djsn3052d1d14d46",
            "x-rapidapi-host": "world-population.p.rapidapi.com"
        }
    });
    let world_pop_data: WorldPopData = await world_pop_req.json();

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
                world_pop_data: world_pop_data,
                national_pop: national_pop_data,
                province_data: province_data,
                national_data: national_data,
            },
            revalidate: 60,
        }
    );
}