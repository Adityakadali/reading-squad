const Login = () => {
  const handleLogin = () => {
    window.location = "http://localhost:4000/auth/discord";
  };
  return (
    <>
      <button className="bg-black text-white px-3 py-2" onClick={handleLogin}>
        Login with discord
      </button>
    </>
  );
};

export default Login;
