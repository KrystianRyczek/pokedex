import { Link, useRouteError } from "react-router"

export default function ErrorElement(){
    const error = useRouteError()
    console.log(error)
    return (
        <div className="w-screen h-screen flex">
            <div className="w-170 h-20 mt-40 mx-auto text-white text-center">
                <h2 className="text-3xl mb-1" >Wystąpił błąd!</h2>
                <p className="text-xs mb-5">Coś poszło nie tak, spróbuj ponownie...</p>
                <button>
                    <Link to='/' className="py-2 px-3 mx-auto text-xl text-center rounded-md bg-gray-800 hover:bg-gray-300 hover:text-gray-800">
                        Powrót do strony głównej
                    </Link>
                </button>
            </div>
        </div>
    )
}