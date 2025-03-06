import React, { Component } from "react";
import { loginService } from "../../repository/AuthRepository";
import { FaGoogle, FaFacebook, FaGithub, FaLinkedin } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Alert } from "flowbite-react";
import {FaSpinner } from "react-icons/fa";
import { withNavigation } from "../../withNavigation";
class LogIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      error: "",
      success: "",
      showAlert: false,
      isLoading: false,
      socialLoading: {
        google: false,
        facebook: false,
        github: false,
        linkedin: false,
      },
    };
  }

  componentDidMount() {
    this.showTimer = setTimeout(() => {
      this.setState({ showAlert: true });
    }, 1000);

    this.hideTimer = setTimeout(() => {
      this.setState({ showAlert: false });
    }, 7000);
  }

  componentWillUnmount() {
    clearTimeout(this.showTimer);
    clearTimeout(this.hideTimer);
  }

  handleLogin = async (e) => {
    e.preventDefault();
    const { email, password } = this.state;
    this.setState({ error: "", success: "" });

    if (!email || !password) {
      this.setState({ error: "All fields are required." });
      return;
    }

    this.setState({ isLoading: true });

    try {
      await loginService(email, password);
      this.props.navigate("/home");
      window.location.reload();
    } catch (error) {
      this.setState({ error: error.message });
    } finally {
      this.setState({ isLoading: false });
    }
  };
  render() {
    const {
      email,
      password,
      error,
      success,
      showAlert,
      isLoading,
      socialLoading,
    } = this.state;

    return (
      <div className="relative min-h-screen">
        {showAlert && (
          <div
            className="fixed top-3 right-5 p-2 mb-6 bg-gray-300 text-gray-600 rounded-lg shadow-lg transition-transform transform translate-x-0"
            style={{
              transition: "transform 0.5s ease-out",
              zIndex: 50,
            }}
          >
            <Alert color="warning" withBorderAccent>
              <span className="flex flex-col">
                <span className="font-bold">
                  Please verify your email before logging in.
                </span>
                <span>Check your email inbox!</span>
              </span>
            </Alert>
          </div>
        )}

        <div className="min-h-screen flex">
          {/* Left Section*/}
          <div
            className="hidden lg:flex lg:w-1/2 items-center justify-center 
           bg-image"
          >
            <div className="text-center text-white">
              <h3 className="text-4xl mt-[30rem] ">Welcome Back!</h3>
              <h3 className="text-2xl ">Ticketing System</h3>
            </div>
          </div>

          {/* Right Section */}
          <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white">
            <div className="w-full max-w-md">
              <h2 className="text-3xl font-bold text-gray-900 mb-2 text-center">
                Create Account
              </h2>
              <div className="flex justify-center space-x-4 mb-6">
                {["google", "facebook", "github", "linkedin"].map((platform) => (
                  <button
                    key={platform}
                    className="p-2 rounded-lg border hover:bg-gray-50 transition-colors relative"
                    onClick={() => this.handleSocialLogin(platform)}
                    disabled={socialLoading[platform]}
                  >
                    {socialLoading[platform] ? (
                      <FaSpinner className="text-xl text-gray-600 animate-spin" />
                    ) : (
                      {
                        google: <FaGoogle className="text-xl text-gray-600" />,
                        facebook: <FaFacebook className="text-xl text-gray-600" />,
                        github: <FaGithub className="text-xl text-gray-600" />,
                        linkedin: <FaLinkedin className="text-xl text-gray-600" />,
                      }[platform]
                    )}
                  </button>
                ))}
              </div>

              <p className="text-center text-gray-600 mb-8">
                or use your email for registration
              </p>

              <form onSubmit={this.handleLogin} className="space-y-6">
                <div>
                  <input
                    type="email"
                    name="email"
                    value={email}
                    onChange={(e) => this.setState({ email: e.target.value })}
                    placeholder="Email"
                    className={`w-full px-4 py-3 rounded-lg bg-gray-100 border-2 focus:bg-white outline-none transition-colors duration-200
                    ${
                      error && !email
                        ? "border-red-500 focus:border-red-500 focus:ring-red-200"
                        : email
                        ? "border-green-500 focus:border-green-500 focus:ring-green-200"
                        : "border-transparent focus:border-gray-800 focus:ring-gray-800/20"
                    }`}
                  />
                  {error && !email && (
                    <p className="mt-1 text-sm text-red-500">Email is required</p>
                  )}
                </div>

                <div>
                  <input
                    type="password"
                    name="password"
                    value={password}
                    onChange={(e) => this.setState({ password: e.target.value })}
                    placeholder="Password"
                    className={`w-full px-4 py-3 rounded-lg bg-gray-100 border-2 focus:bg-white outline-none transition-colors duration-200
                    ${
                      error && !password
                        ? "border-red-500 focus:border-red-500 focus:ring-red-200"
                        : password
                        ? "border-green-500 focus:border-green-500 focus:ring-green-200"
                        : "border-transparent focus:border-gray-800 focus:ring-gray-800/20"
                    }`}
                  />
                  {error && !password && (
                    <p className="mt-1 text-sm text-red-500">Password is required</p>
                  )}
                </div>

                {error && error !== "All fields are required." && (
                  <p className="text-red-500 text-center">{error}</p>
                )}
                {success && (
                  <p className="text-green-500 text-center">{success}</p>
                )}

                <div>
                  <Link to="/forgotpassword" className="text-black hover:text-emerald-600">
                    Forgot password
                  </Link>
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-emerald-400 to-emerald-600 text-white py-3 rounded-lg 
                  hover:from-emerald-500 hover:to-emerald-700 transition-all duration-300 text-sm font-semibold uppercase
                  shadow-lg shadow-emerald-200 relative disabled:opacity-70"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <span className="flex items-center justify-center">
                      <FaSpinner className="animate-spin mr-2" />
                      Signing in...
                    </span>
                  ) : (
                    "SIGN IN"
                  )}
                </button>
              </form>

              <p className="text-center mt-8 text-gray-600">
                Don't have an account?{" "}
                <Link
                  to="/signup"
                  className="text-emerald-600 hover:text-emerald-800 font-semibold"
                >
                  Sign UP
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default  withNavigation(LogIn);