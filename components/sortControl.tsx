import React from "react";
import { useState } from "react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, Box } from "@mui/material";

export default function SortControl() {
    const router = useRouter();
    const query = router.query;
    
    return (
        <div>
            {/* add box with inline label */}
            <Box display="flex" flexDirection="row" justifyContent="left" alignItems="center">
                <p className="text-white">Sort: &nbsp;</p>
                <FormControl className="text-white">
                    {/* <FormLabel className="text-white">Sort</FormLabel> */}
                    <RadioGroup
                    row
                    name="row-radio-buttons-group"
                    onChange={(e) => {
                        router.push(`/search?q=${query.q}&sort=${e.target.value}`);
                    }}
                    defaultValue={query.sort ? query.sort : "default"}
                    >
                    <FormControlLabel value="price" control={<Radio className="text-white"/>} label="Price" />
                    <FormControlLabel value="name" control={<Radio className="text-white"/>} label="Name" />
                    <FormControlLabel value="value" control={<Radio className="text-white"/>} label="Value"/>
                    <FormControlLabel value="default" control={<Radio className="text-white"/>} label="Default" />
                    </RadioGroup>
                </FormControl>
            </Box>
        </div>
    );
}
