import { useNavigate } from "react-router";
import { ROUTES } from "../../constants/routes";

const PageNotFound = () => {
  const navigate = useNavigate();

  return (
    <main className="flex min-h-screen items-center justify-center bg-white px-6">
      <section className="w-full max-w-2xl text-center">

        <h1 className="text-[120px] font-bold leading-none tracking-tight text-gray-900 sm:text-[160px]">
          404
        </h1>

        <h2 className="mt-4 text-2xl font-semibold text-gray-900 sm:text-3xl">
          Page Not Found
        </h2>

        <p className="mx-auto mt-4 max-w-md text-sm leading-6 text-gray-500 sm:text-base">
          The page you are looking for doesn't exist
          or has been moved.
        </p>

        <button
          type="button"
          onClick={() => navigate(ROUTES.DASHBOARD)}
          className="mt-8 inline-flex items-center justify-center rounded-lg bg-[#5b4df6] px-6 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-[#4c3ee8] active:scale-[0.98]"
        >
          Go Back to Home
        </button>

      </section>
    </main>
  );
};

export default PageNotFound;