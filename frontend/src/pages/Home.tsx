import ProfileForm from "../components/form/ProfileForm";

interface HomeProps {
  onSuccess: (matches: any[]) => void;
}

const Home = ({ onSuccess }: HomeProps) => {
  return (
    <main className="min-h-screen bg-slate-100 py-10 px-4">
      <div className="mx-auto max-w-5xl">
        <h1 className="mb-2 text-4xl font-bold text-center text-slate-800">
          ScholarAI
        </h1>

        <p className="mb-10 text-center text-slate-600">
          Find Scholarships You Actually Qualify For
        </p>

        <ProfileForm onSuccess={onSuccess} />
      </div>
    </main>
  );
};

export default Home;