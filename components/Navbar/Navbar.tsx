import { DarkMode } from "../navbar/Darkmode";
import DropdownListMenu from "../navbar/DropdownListMenu";
import Logo from "../navbar/Logo";
import Search from "../navbar/Search";

function Navbar() {
    return (
        <div
            className="container flex flex-col justify-between
        py-8 sm:flex-row sm:items-center gap-4"
        >
            <Logo />
            <Search />
            <div className="flex gap-4">
                <DarkMode />
                <DropdownListMenu />
            </div>
        </div>
    );
}
export default Navbar;
