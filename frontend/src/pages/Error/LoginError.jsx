import { useNavigate } from "react-router-dom";

const LoginError = () => {
    const navigate = useNavigate();
    return (
        <div className="w-3/4 mx-auto py-20">
            <h1 className="mt-16 text-3xl">
                User must be authenticated to access the KTP Database
            </h1>
            <button
                className="my-16 p-2 text-xl border-2 border-solid hover:border-black rounded-3xl"
                type="button"
                onClick={() => navigate("/")}
            >
                Back to Home
            </button>
        </div>
    );
};

export default LoginError;
