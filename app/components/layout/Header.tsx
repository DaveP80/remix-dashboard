import { Link } from "@remix-run/react"
import { ModeToggle } from "../mode-toggle"

export function Header(): React.ReactNode {
    
const headers: any[] = [
    {
        href: "/",
        name: "home"
    },
    {
        href: "/dashboard",
        name: "dashboard"
    },
    {
        href: "/auth",
        name: "user portal"
    },
    {
        href: "/test",
        name: "test"
    }
]
return <div className="flex-grow p-4 bg-green-200 text-gray-900 dark:bg-gray-800 dark:text-gray-100">
    <ul className="">
        {
            headers.map((item, idx) => {
                return (
                    <li className="li" key={item.name}>
                        <Link to={item.href}>{item.name}</Link>
                    </li>
                )
            })
        }
        <ModeToggle/>
    </ul>




</div>
}