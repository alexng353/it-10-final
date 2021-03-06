import { TextField, Box } from "@mui/material";
import { ButtonUnstyled } from "@mui/base";
import { styled } from "@mui/material/styles";
import { useState } from "react";
import { useRouter } from "next/router";

const SearchBar = styled(TextField)({
  "& .MuiInputBase-root": {
    color: "rgb(255 255 255)"
  },
  "& label.Mui-focused": {
    color: "rgb(34 197 94)"
  },
  "& label": {
    color: "rgb(34 197 94)"
  },

  "& .MuiInput-underline:after": {
    borderBottomColor: "rgb(34 197 94)"
  },

  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "rgb(34 197 94)"
    },
    "&:hover fieldset": {
      borderColor: "yellow"
    },
    "&.Mui-focused fieldset": {
      borderColor: "rgb(34 197 94)"
    }
  }
});

const SearchButton = styled(ButtonUnstyled)`
  font-family: IBM Plex Sans, sans-serif;
  font-weight: Bold;
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

export default function Search() {
  const [search, setSearch] = useState("");
  const router = useRouter();
  const query = router.query;
  function pusher() {
    // check if query.sort exists: if not, don't add &sort=
    // check if query.order exists: if not, don't add &order=
    if (search !== "") {
    router.push(
      `/?search=${search}&sort=${query.sort ? query.sort : "default"}&order=${query.order ? query.order : "asc"}`
    );
    }
    // router.push(`/?search=${search}&sort=${query.sort}&order=${query.order}`);
  }

  return (
    <div id="search" className="max-w-2xl">
      <Box sx={{ display: "flex", alignItems: "flex-center" }}>
        <SearchBar
          variant="outlined"
          placeholder="Search for a product"
          size="small"
          fullWidth
          
          onChange={(e) => {
            setSearch(e.target.value);
          }}

          onKeyPress={(e) => {
            if (e.key === "Enter") {
              pusher()
            }
          }}
        />
        &nbsp;
        <SearchButton
          variant="contained"
          color="primary"
          onClick={() => {
            pusher()
          }}
        >
          Search
        </SearchButton>
      </Box>
    </div>
  );
}
