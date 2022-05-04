import { useRouter } from 'next/router';
import React from 'react';
import { Button } from '@mui/material';
import Head from 'next/head';



function Search() {
    const [search, setSearch] = React.useState('');
    const router = useRouter();
    const query = router.query;

    return (
        <>
            <Head>
                <title>hello tummy {query.q ? "| " + query.q : "sadge"}</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className='text-white'>
                {query.q}
            </div>
        </>
    );
}

export default function checker() {
    const router = useRouter();
    const query = router.query;
    if (query.q) {
        return <Search />;
    } else {
        return <div>No query</div>;
    }
}