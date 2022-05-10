import React from "react";
import { useRouter } from "next/router";
import { FormControl, RadioGroup, FormControlLabel, Radio, Box, Divider } from "@mui/material";


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
                        router.push(`/?search=${query.search}&sort=${e.target.value}&order=${query.order}`);
                    }}
                    defaultValue={query.sort ? query.sort : "default"}
                    >
                        <FormControlLabel value="price" control={<Radio className="text-white"/>} label="Price" />
                        <FormControlLabel value="name" control={<Radio className="text-white"/>} label="Name" />
                        {/* <DisabledFormControlLabel value="value" control={<RadioButton disabled className="text-white"/>} label="Value"/> */}
                        <FormControlLabel value="default" control={<Radio className="text-white"/>} label="Default" />
                        {/* <FormControlLabel value="price-desc" control={<Radio className="text-white"/>} label="Price - Descending" /> */}
                    </RadioGroup>
                    <RadioGroup
                    row
                    name="row-radio-buttons-group-order"
                    onChange={(e) => {
                        router.push(`/?search=${query.search}&sort=${query.sort}&order=${e.target.value}`);
                    }
                    }
                    defaultValue={query.order ? query.order : "asc"}
                    >
                        <FormControlLabel value="asc" control={<Radio className="text-white"/>} label="Ascending" />
                        <FormControlLabel value="desc" control={<Radio className="text-white"/>} label="Descending" />
                    </RadioGroup>

                </FormControl>
            </Box>
        </div>
    );
}
