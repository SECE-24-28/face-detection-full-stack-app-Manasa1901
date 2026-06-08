export default function SignupPage() {
  return (
    <div className="flex flex-col gap-4 max-w-md mx-auto mt-20">
      <h1 className="text-3xl font-bold">
        Signup
      </h1>

      <input
        placeholder="Email"
        className="border p-2"
      />

      <input
        type="password"
        placeholder="Password"
        className="border p-2"
      />

      <button className="bg-black text-white p-2">
        Signup
      </button>
    </div>
  );
}