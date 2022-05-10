import React from 'react';
import { useRouter } from 'next/router';
import { Typography } from '@mui/material';
import { GitHub, Twitter } from '@mui/icons-material';
import { Button } from '@mui/material';
import { ButtonUnstyled } from '@mui/base';
import {styled} from '@mui/material/styles';
// style the button to be green
const ButtonGreen = styled(ButtonUnstyled)`
    font-family: IBM Plex Sans, sans-serif;
    font-size: 0.875rem;
    background-color: rgb(34 197 94);
    padding: 8px 24px;
    border-radius: 4px;
    border: 1px solid rgb(34 197 94);
    color: white;
    transition: all 150ms ease;
    cursor: pointer;
    &:hover {
        background-color: rgb(34 197 94);
        border: 1px solid yellow;
        color: white;
    }
`;

//please write me an about page for my website
export default function About() {
    const router = useRouter();
    return (
        <>
        <main className="mb-20 mt-20 sm:mr-10 sm:ml-10">
            <div className="flex justify-center">
                <div className="md:w-3/5 text-justify text-white">
                    <Typography variant="h6" color="inherit" className="mr-auto">
                        About
                    </Typography>
                    <p>
                        <span className='text-green-400'>hello </span><span className='text-green-400'>tummy</span> is a grocery search engine for the future of shopping.
                    </p>
                    <p>
                        It is a web application that allows users to search for grocery items and find the best deals on them.
                    </p>
                    <p>
                        Unfortunately, it is slow because it is using a webscraper to get the data.
                    </p>
                    <p>
                        If you have any suggestions for improvements, please email me at <a href='mailto:alex@ayo.icu'>
                            <span className='text-green-400'>
                                alex@ayo.icu
                            </span>
                        </a>
                    </p>

                    {/* generate 2 lines of whitespace */}
                    {Array(2).fill('').map((_, i) => <br key={i} />)}
                    <GitHub
                        className='text-white hover:text-green-400'
                        fontSize='large'
                        onClick={() => {
                            window.open('https://github.com/alexng353/it-10-final');
                        }
                        }
                    />
                    {/* on hover of twitter logo, show text "twitter link disabled" */}
                    {/* <Twitter className='text-white hover:text-green-400' fontSize='large' /> */}
                    <Twitter
                        className='text-white hover:text-green-400 hoverControl'
                        fontSize='large'
                    />
                    <span className='text-white hover:text-green-400 hider'>twitter link disabled</span>
                    <ButtonGreen variant="outlined" color="primary" onClick={
                        () => {
                            window.location.href="/";
                        }
                    }>
                        Go Home 
                    </ButtonGreen>
                </div>
            </div>
        </main>
        </>

    );
}
