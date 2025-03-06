import React, { Component } from "react";
import { registerUser, getRoles } from "../../repository/AuthRepository";
import { FaGoogle, FaFacebook, FaGithub, FaLinkedin } from 'react-icons/fa';
import { FaSpinner } from "react-icons/fa";
import { withNavigation } from "../../withNavigation";
class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      roles: [],
      selectedRole: "",
      formValues: {
        email: "",
        password: "",
        confirmPassword: "",
      },
      message: "",
      error: "",
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
    this.fetchRoles();
  }

  fetchRoles = async () => {
    try {
      const rolesData = await getRoles();
      this.setState({ roles: rolesData });
      console.log("roledata:", rolesData[0]);
    } catch (error) {
      console.error(error.message);
      this.setState({ error: "Failed to load roles. Please try again later." });
    }
  };

  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState((prevState) => ({
      formValues: {
        ...prevState.formValues,
        [name]: value,
      },
    }));
  };

  handleSignup = async (e) => {
    e.preventDefault();
    const { email, password, confirmPassword } = this.state.formValues;
    const { selectedRole } = this.state;

    this.setState({ message: "", error: "" });

    if (!selectedRole) {
      this.setState({ error: "Please select a role." });
      return;
    }
    if (!email || !password || !confirmPassword) {
      this.setState({ error: "All fields are required." });
      return;
    }
    if (password !== confirmPassword) {
      this.setState({ error: "Passwords do not match." });
      return;
    }

    this.setState({ isLoading: true });

    try {
      const response = await registerUser(email, password, selectedRole);
      this.setState({ message: response.message || "Account created successfully!" });
      this.props.navigate("/");
    } catch (err) {
      this.setState({ error: err.message || "An error occurred during signup." });
    } finally {
      this.setState({ isLoading: false });
    }
  };
  render() {
    const { roles, selectedRole, formValues, message, error, isLoading, socialLoading } = this.state;

    return (
      <div className="min-h-screen flex">
        {/* Left Section*/}
        <div className="hidden lg:flex lg:w-1/2 items-center justify-center bg-image">
          <div className="text-center text-white">
            <h3 className="text-2xl mt-[27rem]">Welcome to Ticketing System!</h3>
          </div>
        </div>

        {/* Right Section */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white">
          <div className="w-full max-w-md">
            <h2 className="text-3xl font-bold text-gray-900 mb-2 text-center">Create Account</h2>

            {/* Social Login Buttons */}
            <div className="flex justify-center space-x-4 mb-6">
              {['google', 'facebook', 'github', 'linkedin'].map((platform) => (
                <button
                  key={platform}
                  className="p-2 rounded-lg border hover:bg-gray-50 transition-colors relative"
                  onClick={() => this.handleSocialLogin(platform)}
                  disabled={socialLoading[platform]}
                >
                  {socialLoading[platform] ? (
                    <FaSpinner className="text-xl text-gray-600 animate-spin" />
                  ) : (
                    React.createElement(FaGoogle, { className: "text-xl text-gray-600" })
                  )}
                </button>
              ))}
            </div>

            <p className="text-center text-gray-600 mb-8">or use your email for registration</p>

            {error && <p className="text-red-500 text-center mb-4">{error}</p>}
            {message && <p className="text-green-500 text-center mb-4">{message}</p>}

            <form onSubmit={this.handleSignup} className="space-y-4">
              <input
                type="email"
                id="email"
                name="email"
                value={formValues.email}
                onChange={this.handleInputChange}
                placeholder="Email"
                className="w-full px-4 py-3 rounded-lg bg-gray-100 border-transparent focus:border-gray-800 
                focus:bg-white focus:ring-2 focus:ring-gray-800/20 outline-none transition-colors duration-200"
                required
              />

              <input
                type="password"
                id="password"
                name="password"
                value={formValues.password}
                onChange={this.handleInputChange}
                placeholder="Password"
                className="w-full px-4 py-3 rounded-lg bg-gray-100 border-transparent focus:border-gray-800 
                focus:bg-white focus:ring-2 focus:ring-gray-800/20 outline-none transition-colors duration-200"
                required
              />

              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formValues.confirmPassword}
                onChange={this.handleInputChange}
                placeholder="Confirm Password"
                className="w-full px-4 py-3 rounded-lg bg-gray-100 border-transparent focus:border-gray-800 
                focus:bg-white focus:ring-2 focus:ring-gray-800/20 outline-none transition-colors duration-200"
                required
              />

              <select
                value={selectedRole}
                onChange={(e) => this.setState({ selectedRole: e.target.value })}
                className="w-full px-4 py-3 rounded-lg bg-gray-100 border-transparent focus:border-gray-800 
                focus:bg-white focus:ring-2 focus:ring-gray-800/20 outline-none transition-colors duration-200"
              >
                <option value="" disabled>Select Role</option>
                {roles.map((role) => (
                  <option key={role._id} value={role._id}>
                    {role.name}
                  </option>
                ))}
              </select>

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
                    Creating Account...
                  </span>
                ) : (
                  'Sign Up'
                )}
              </button>
            </form>

            <p className="text-center mt-8 text-gray-600">
              Already have an account?{" "}
              <button
                onClick={() => this.props.navigate('/')}
                className="text-emerald-600 hover:text-emerald-800 font-semibold"
                disabled={isLoading}
              >
                Sign in
              </button>
            </p>
          </div>
        </div>
      </div>
    );
  }
}
export default withNavigation(SignUp);