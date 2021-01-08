import Head from "next/head";
import Link from "next/link"
interface CountryData {
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
interface WorldPopData {
    world_population: number;
    total_countries: number;
}
interface WorldPositive {
    name: string;
    value: number;
}
interface Infected {
    value: number;
}

const parseInt = (x: number): string => {
    var parts = x.toString().split(".");
    parts[0]=parts[0].replace(/\B(?=(\d{3})+(?!\d))/g,",");
    return parts.join(",");
}

export default function Global({ world_data, world_pop_data, infected }): JSX.Element {
    let i = 0;
    return (
        <div className="flex flex-col items-center w-full">
            <Head>
                <title>Covid-19 | Global Case</title>
            </Head>
            <div className="mt-10 w-2/3 h-96 overflow-y-scroll flex flex-col items-center justify-items-center">
                <table className=" w-full text-left table-auto">
                    <thead>
                        <tr>
                            <th className="p-3 border-gray-300 bg-gray-100 shadow-xl top-0 sticky">No.</th>
                            <th className="p-3 border-gray-300 bg-gray-100 shadow-xl top-0 sticky">Negara</th>
                            <th className="p-3 border-gray-300 bg-gray-100 shadow-xl top-0 sticky">Total</th>
                            <th className="p-3 border-gray-300 bg-gray-100 shadow-xl top-0 sticky">Sembuh</th>
                            <th className="p-3 border-gray-300 bg-gray-100 shadow-xl top-0 sticky">Meninggal</th>
                            <th className="p-3 border-gray-300 bg-gray-100 shadow-xl top-0 sticky">Aktif</th>                          
                        </tr>
                    </thead>
                    <tbody>
                        {
                            world_data.map((item: CountryData): JSX.Element => {
                                let value = item.attributes
                                i++
                                return (
                                    <tr>
                                        <td className="p-2 border border-gray-300 text-center">{i}</td>
                                        <td className="p-2 border border-gray-300"><Link href={`/global/${value.Country_Region}`}><a className="text-blue-600">{value.Country_Region}</a></Link></td>
                                        <td className="p-2 border border-gray-300">{value.Confirmed !== null ? parseInt(value.Confirmed) : "Tidak Diketahui"}</td>
                                        <td className="p-2 border border-gray-300">{value.Recovered !== null ? parseInt(value.Recovered) : "Tidak Diketahui"}</td>
                                        <td className="p-2 border border-gray-300">{value.Deaths !== null ? parseInt(value.Deaths) : "Tidak Diketahui"}</td>
                                        <td className="p-2 border border-gray-300">{value.Active !== null ? parseInt(value.Active) : "Tidak Diketahui"}</td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export async function getStaticProps({ params }): Promise<{ props: { world_data: CountryData[]; world_pop_data: WorldPopData; infected: {value: number}; }; }> {
    let world_case_req = await fetch("https://jdk-covid-proxy.herokuapp.com/global");
    let _world_positive = await fetch("https://jdk-covid-proxy.herokuapp.com/global-positif");
    let _world_positive_data: WorldPositive = await _world_positive.json();
    let world_case_data: CountryData[] = await world_case_req.json();
    let world_pop_req = await fetch("https://world-population.p.rapidapi.com/worldpopulation", {
        "method": "GET",
        "headers": {
            "x-rapidapi-key": "ae3747bc6emsh9de287a24646ec9p11f42djsn3052d1d14d46",
            "x-rapidapi-host": "world-population.p.rapidapi.com"
        }
    });

    function fround(n,r=2){return Math.round(Math.round(n*10**(r+1))/10)/10**r}

    let world_pop_data: WorldPopData = await world_pop_req.json();
    const infected = _world_positive_data.value / world_pop_data.total_countries;
    return (
        {
            props: {
                world_data: world_case_data,
                world_pop_data: world_pop_data,
                infected: {value: fround(infected * 100, 3)},
            }
        }
    );
}