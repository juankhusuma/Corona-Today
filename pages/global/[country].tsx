import { useRouter } from 'next/router';
import { CountryData, parseNum } from './index'
import Head from 'next/head';
import Link from 'next/link';
interface CountryCode {
    Code: string;
    Name: string;
}
interface Props {
    data: CountryData[],
    code: CountryCode[]
}

export function round(num: number, SF: number): string {
    let rounded = "";
    SF = num.toString().length >= SF ? SF : num.toString.length - 1;
    while (num.toString()[SF + 1] === "0" && num.toString().length + 1 >= SF) {
        SF++
    }

    for (let i = 0; i < SF + 1; i++) {
        rounded += num.toString()[i]
    }
    return rounded
}

export default function CountryStat({data, code}: Props): JSX.Element {
    const router = useRouter();
    const {country} = router.query;
    let regional_stat: CountryData;
    let total_case = 0;
    let total_recovered = 0;
    let total_deaths = 0;
    let country_code;
    let extra_code = {
        "US": "us",
        "United Kingdom": "gb",
        "Cote d'Ivoire": "ci",
        "Turkey": "tr",
        "Spain": "es",
        "Ukraine": "ua",
        "Czechia": "cz",
        "Sweden": "se",
        "Switzerland": "ch",
        "Saudi Arabia": "sa",
        "Serbia": "rs",
        "United Arab Emirates": "ae",
        "Slovakia": "sk",
        "Tunisia": "tn",
        "Slovenia": "si",
        "Burma": "mm",
        "Venezuela": "ve",
        "North Macedonia": "mk",
        "Uzbekistan": "uz",
        "Korea, South": "kr",
        "Singapore": "sg",
        "Sri Lanka": "sk",
        "Uganda": "ug",
        "Zambia": "zm",
        "Uruguay": "uy",
        "Sudan": "sd",
        "Congo (Kinshasa)": "cd",
        "Zimbabwe": "zw",
        "Tajikistan": "tj",
        "Cabo Verde": "cv",
        "Syria": "sy",
        "Eswatini": "sz",
        "Thailand": "th",
        "Trinidad and Tobago": "tt",
        "Suriname": "sr",
        "Somalia": "so",
        "Togo": "tg",
        "South Sudan": "ss",
        "Sierra Leone": "sl",
        "San Marino": "sm",
        "Yemen": "ye",
        "Vietnam": "vn",
        "Sao Tome and Principe": "st",
        "Taiwan*": "tw",
        "Tanzania": "tz",
        "Seychelles": "sc",
        "Timor-Leste": "tl",
        "Laos": "la",
        "Solomon Islands": "sb",
        "Vanuatu": "vu",
        "Samoa": "ws",
        "South Africa": "za"
    }


    for (let i = 0; i < data.length; i++) {
            if (data[i].attributes.Country_Region === country) {
                regional_stat = data[i]
            }
        if (country_code === undefined) {
            if (code[i].Name === country || code[i].Code === country) {
                country_code = code[i].Code.toLowerCase();
            }
            else {
                country_code = extra_code[country.toString()];
            }
        }
        total_case += data[i].attributes.Confirmed;
        total_recovered += data[i].attributes.Recovered;
        total_deaths += data[i].attributes.Deaths;
    }

    return (
        <div className="flex flex-col items-center p-3 font-Pro pt-10">
            <Link href="/global"><a className="back-btn">&larr;</a></Link>
            <Head>
                <title>Corona Today | {country}</title>
            </Head>
            <img src={`https://flagcdn.com/${country_code}.svg`} className="w-28 mt-3 mb-10 shadow-2xl animate-bounce"/>
            
            <h1 className="title text-center text-gray-900 mb-5 pb-1 border-b border-gray-300">{country}</h1>
            <h2 className="subtitle mt-10 mb-5 md:mb-10">🌐 Global Leaderboard</h2>
            <div className=" grid grid-cols-1 md:grid-cols-2 text-gray-700">
                
                <div className="card text-center p-3 mt-4 w-48 h-24 md:w-72 md:h-28 m-2">
                    <div>🚑</div>
                    <h1 className="font-semibold text-gray-800 md:font-bold text-sm md:text-base">Jumlah Angka Positif Total</h1>
                    <hr/>
                    <h2 className="font-semibold text-xs md:text-base">
                        Peringkat
                        <span className="ml-2 text-blue-600">{data.sort((a: CountryData, b: CountryData) => (a.attributes.Confirmed > b.attributes.Confirmed) ? -1 : 1 ).indexOf(regional_stat) + 1}/{data.length}</span>
                    </h2>
                </div>
                <div className="card text-center p-3 mt-4 w-48 h-24 md:w-72 md:h-28 m-2">
                    <div>🚑</div>
                    <h1 className="font-semibold text-gray-800 md:font-bold text-sm md:text-base">Persentase Jumlah Angka Positif Total</h1>
                    <hr/>
                    <h2 className="font-semibold text-xs md:text-base">
                        <span className="mr-2 text-blue-600">{`${round(regional_stat.attributes.Confirmed / total_case * 100, 7)}%`}</span>
                        <span>Global Case</span>
                    </h2>
                </div>
                <div className="card text-center p-3 mt-4 w-48 h-24 md:w-72 md:h-28 m-2">
                    <div>😄</div>
                    <h1 className="font-semibold text-gray-800 md:font-bold text-sm md:text-base">Jumlah Angka Pasien Sembuh</h1>
                    <hr/>
                    <h2 className="font-semibold text-xs md:text-base">
                        Peringkat
                        <span className="ml-2 text-blue-600">{data.sort((a: CountryData, b: CountryData) => (a.attributes.Recovered > b.attributes.Recovered) ? -1 : 1 ).indexOf(regional_stat) + 1}/{data.length}</span>
                    </h2>
                </div>
                <div className="card text-center p-3 mt-4 w-48 h-24 md:w-72 md:h-28 m-2">
                    <div>😄</div>
                    <h1 className="font-semibold text-gray-800 md:font-bold text-sm md:text-base">Persentase Jumlah Angka Pasien Sembuh</h1>
                    <hr/>
                    <h2 className="font-semibold text-xs md:text-base">
                        <span className="mr-2 text-blue-600">{`${round(regional_stat.attributes.Recovered/ total_recovered * 100, 7)}%`}</span>
                        <span>Global Case</span>
                    </h2>
                </div>
                <div className="card text-center p-3 mt-4 w-48 h-24 md:w-72 md:h-28 m-2">
                    <div>😢</div>
                    <h1 className="font-semibold text-gray-800 md:font-bold text-sm md:text-base">Jumlah Angka Kematian</h1>
                    <hr/>
                    <h2 className="font-semibold text-xs md:text-base">
                        Peringkat
                        <span className="ml-2 text-blue-600">{data.sort((a: CountryData, b: CountryData) => (a.attributes.Deaths > b.attributes.Deaths) ? -1 : 1 ).indexOf(regional_stat) + 1}/{data.length}</span>
                    </h2>
                </div>
                <div className="card text-center p-3 mt-4 w-48 h-24 md:w-72 md:h-28 m-2">
                    <div>😢</div>
                    <h1 className="font-semibold text-gray-800 md:font-bold text-sm md:text-base">Persentase Jumlah Angka Kematian</h1>
                    <hr/>
                    <h2 className="font-semibold text-xs md:text-base">
                        <span className="mr-2 text-blue-600">{`${round(regional_stat.attributes.Deaths/ total_deaths * 100, 7)}%`}</span>
                        <span>Global Case</span>
                    </h2>
                </div>
                <div className="card text-center p-3 mt-4 w-48 h-24 md:w-72 md:h-28 m-2">
                    <div>🤒</div>
                    <h1 className="font-semibold text-gray-800 md:font-bold text-sm md:text-base">Jumlah Angka Pasien Aktif</h1>
                    <hr/>
                    <h2 className="font-semibold">
                        Peringkat
                        <span className="ml-2 text-blue-600">{data.sort((a: CountryData, b: CountryData) => (a.attributes.Active > b.attributes.Active) ? -1 : 1 ).indexOf(regional_stat) + 1}/{data.length}</span>
                    </h2>
                </div>
                <div className="card text-center p-3 mt-4 w-48 h-24 md:w-72 md:h-28 m-2">
                    <div>🤒</div>
                    <h1 className="font-semibold text-gray-800 md:font-bold text-sm md:text-base">Persentase Jumlah Angka Pasien Aktif</h1>
                    <hr/>
                    <h2 className="font-semibold text-xs md:text-base">
                        <span className="mr-2 text-blue-600">{`${round(regional_stat.attributes.Active/ (total_case - total_recovered - total_deaths) * 100, 7)}%`}</span>
                        <span>Global Case</span>
                    </h2>
                </div>
            </div>
            
            <h2 className="subtitle mt-5 md:mt-10 mb-5 md:mb-10 ">Local Stats</h2>

            <div>
                <div className="card text-center p-3 mt-4 w-48 h-24 md:w-72 md:h-28 m-2">
                    <p>🚑</p>
                    <h1 className="font-semibold text-gray-800 md:font-bold text-sm md:text-base">Angka Positif Total</h1>
                    <hr />
                    <p className="font-semibold text-xs md:text-base text-blue-700">{parseNum(regional_stat.attributes.Confirmed)}</p>
                </div>
            </div>
            <div className="mt-2 md:mt-5 grid grid-cols-1 md:grid-cols-3">
                <div className="card text-center p-3 mt-4 w-48 h-24 md:w-60 md:h-28 m-2">
                    <p>😄</p>
                    <h1 className="font-semibold text-gray-800 md:font-bold text-sm md:text-base">Pasien Sembuh</h1>
                    <hr />
                    <p className="font-semibold text-xs md:text-base text-blue-700">{parseNum(regional_stat.attributes.Recovered)}</p>
                </div>
                <div className="card text-center p-3 mt-4 w-48 h-24 md:w-60 md:h-28 m-2">
                    <p>😢</p>
                    <h1 className="font-semibold text-gray-800 md:font-bold text-sm md:text-base">Kematian</h1>
                    <hr />
                    <p className="font-semibold text-xs md:text-base text-blue-700">{parseNum(regional_stat.attributes.Deaths)}</p>
                </div>
                <div className="card text-center p-3 mt-4 w-48 h-24 md:w-60 md:h-28 m-2">
                    <p>🤒</p>
                    <h1 className="font-semibold text-gray-800 md:font-bold text-sm md:text-base">Aktif</h1>
                    <hr />
                    <p className="font-semibold text-xs md:text-base text-blue-700">{parseNum(regional_stat.attributes.Active)}</p>
                </div>
            </div>
        </div>
    );

}

export async function getServerSideProps({params}): Promise<{ props: { data: CountryData[]; code: CountryCode[]; }; }> {
    const req = await fetch("https://jdk-covid-proxy.herokuapp.com/global");
    const data: CountryData[] = await req.json();
    const world_pop_req = await fetch("https://world-population.p.rapidapi.com/worldpopulation", {
        "method": "GET",
        "headers": {
            "x-rapidapi-key": "ae3747bc6emsh9de287a24646ec9p11f42djsn3052d1d14d46",
            "x-rapidapi-host": "world-population.p.rapidapi.com"
        }
    });
    const country_codes = await fetch("https://pkgstore.datahub.io/core/country-list/data_json/data/8c458f2d15d9f2119654b29ede6e45b8/data_json.json");
    const country_code_data: CountryCode[] = await country_codes.json();


    return {
        props: {
            data: data,
            code: country_code_data,
        }
    }
}
