import useAuth from "@/hooks/useAuth";

const Home = () => {
  const { user, handleLogout } = useAuth();

  return (
    <div>
      Home {user?.username}
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Home;
