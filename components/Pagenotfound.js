import Link from 'next/link';

const Pagenotfound = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen ">
            <div className="text-center">
                <h1 className="text-3xl font-semibold">404 - Not Found</h1>
                <p className="mt-2">Sorry, the page you are looking for does not exist.</p>
                <Link href={"/"} className='mt-4 font-bold text-blue-500 hover:underline'>
                    Go back to the homepage
                </Link>
            </div>
        </div>
    );
};

export default Pagenotfound;