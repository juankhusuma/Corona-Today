import { useRouter } from 'next/router';

export default function CountryStat() {
    const router = useRouter();
    const {country} = router.query;

    return (
        <h1>{country}</h1>
    );

}
