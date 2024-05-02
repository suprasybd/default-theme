import { Link } from "@tanstack/react-router";

const Login = () => {
  return (
    <div>
      <div className="container h-full md:min-h-[calc(100vh_-_400px)]  min-h-[calc(100vh_-_250px)] m-auto mb-4  md:mt-40 mt-28">
        <form action="">
          <div className="flex justify-center items-center">
            <div className="p-12 bg-gray-100  rounded-3xl w-[450px]">
              <span className="text-sm flex justify-center md:text-2xl font-normal">
                Login to{' '}
                <span className="font-bold capitalize ml-2">Suprasybd</span>
              </span>

              <div className="flex flex-col justify-center items-start mt-8">
                <label className="text-xs capitalize text-left md:text-base text-gray-500 ">enter email</label>
                <input
                  type="email"
                  placeholder="Enter Email"
                  className="mt-1.5 rounded bg-gray-200 w-full px-3 py-1.5 text-base text-gray-600 border"
                />

                <label className="text-xs mt-4 capitalize text-left md:text-base text-gray-500 "> password</label>
                <input
                  type="password"
                  placeholder="Enter Password"
                  id="id_password"
                  className="mt-1.5 rounded bg-gray-200 w-full px-3 py-1.5 text-base text-gray-600 border "
                />

                <button
                  id="id_password"
                  className="mt-6 capitalize rounded-lg  bg-gray-900 w-full px-3 py-1.5 text-base text-gray-50  font-semibold border "
                >
                  submit{' '}
                </button>
              </div>

              <div className="flex justify-center items-center flex-col mt-5">
                <div className="mt-7 flex items-center gap-x-2">
                  <span className="text-sm text-gray-600">
                    Do not have an account?
                  </span>

                  <Link
                    to="/signup"
                    className="font-medium text-gray-600 underline cursor-pointer"
                  >
                    Sign Up
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
