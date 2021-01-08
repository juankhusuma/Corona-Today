export default function CountryStat({country}) {
    return (
        <h1>{country}</h1>
    );

}

export async function getStaticPaths({ params }) {
    console.log(params);
    return ({
        props: {
            country: params
        }
    });
}