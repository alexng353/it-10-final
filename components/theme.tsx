import React from "react";

export default function Theme(props: any){
    return (
        <main className="mb-20 mt-20 sm:mr-10 sm:ml-10">
            <div className="flex justify-center">
                <div className="md:w-3/5 text-justify">
                    {props.children}
                </div>
            </div>
        </main>
    );
}