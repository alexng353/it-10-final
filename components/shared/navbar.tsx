import { AppBar, Toolbar, Typography } from "@mui/material";
import Link from "next/link";
import Search from "../searchbar";
import Menu from "./menuList";
import { useRouter } from "next/router";
// rewrite navbar as function
function Navbar() {
	const router = useRouter();
	return (
		<header>
			<AppBar position='fixed' className="bg-gray-800">
				<div className='flex justify-center'>
					<div className='w-3/5 text-justify'>
						<Toolbar>
							<Typography variant='h6' color='inherit' className='mr-auto'>
								{/* convert to link with same styling */}
								<Link href='/'>
									<a className='underline hover:no-underline'>
										hello <span className='text-green-400'>tummy</span>
									</a>
								</Link>
							</Typography>

							{/* render search bar if page isn't / */}
							{router.query.search && <Search />}
							&nbsp;&nbsp;&nbsp;
							<div className='underline text-white hover:no-underline'>
								<Link href='/about'>About</Link>
							</div>
						</Toolbar>
					</div>
				</div>
			</AppBar>
		</header>
	);
}


export default Navbar;
