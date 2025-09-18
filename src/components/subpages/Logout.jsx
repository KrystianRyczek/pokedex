import { redirect } from "react-router";


export const loader = async ({ request }) => {
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
    return redirect('/auth?mode=login');
}