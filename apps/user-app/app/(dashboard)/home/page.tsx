import { getServerSession } from "next-auth";
import { authOptions } from "../../../lib/auth";
import { redirect } from "next/navigation";

const DashboardPage = async () => {
    const session = await getServerSession(authOptions);

    if (!session) {
        return redirect('/sign-in'); // protect route
    }

    return (
        <div className="p-6 ml-64 mt-10">
            <h1 className="text-2xl font-semibold">Welcome, {session.user?.username}</h1>
            <p className="mt-2">Here's your dashboard with some dummy data...</p>
            <ul className="mt-4 list-disc pl-5">
                <li>Transactions: ₹12,345</li>
                <li>Status: Premium User</li>
                <li>Account: Active</li>
            </ul>
        </div>
    );
};

export default DashboardPage;
