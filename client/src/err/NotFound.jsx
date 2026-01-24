import { NavLink } from "react-router-dom";
const NotFound = () => {
  return (
    <div className='bg-black w-full  h-screen flex flex-col justify-center items-center text-white'>
      <p className='animate-pulse text-4xl duration-75 transition-all font-bold'>404</p>
      <p className='animate-pulse text-4xl duration-75 transition-all font-bold'>NotFound</p>
      <NavLink className={"text-sm text-neutral-100 underline underline-offset-2"} to="/login">
Go back
      </NavLink>
    </div>
  );
}

export default NotFound;
