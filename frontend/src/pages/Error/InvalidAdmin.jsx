import { useNavigate } from "react-router-dom";

const InvalidAdmin = () => {
    const navigate = useNavigate();
    return (
        <div className="w-3/4 mx-auto py-20">
            <h1 className="mt-16 text-2xl text-left">
                {
                    "Only members of Kappa Theta Pi's Lambda Chapter (Boston University) with admin privileges. If you believe there has been a mistake, contact the head of the app committee."
                }
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

export default InvalidAdmin;
