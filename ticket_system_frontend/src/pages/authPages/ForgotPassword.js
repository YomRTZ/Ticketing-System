import React, { Component } from "react";
import { forgotPassword } from "../../repository/AuthRepository";
import { withNavigation } from "../../withNavigation"; 

class ForgotPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      message: "",
      loading: false,
    };
  }

  handleChange = (e) => {
    this.setState({ email: e.target.value });
  };

  handleForgotPassword = async (e) => {
    e.preventDefault();
    const { email } = this.state;

    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      this.setState({ message: "Please enter a valid email address." });
      return;
    }

    this.setState({ loading: true, message: "" });

    try {
      await forgotPassword(email);
      this.setState({ message: "Password reset link has been sent to your email." });
      this.props.navigate("/");
    } catch (error) {
      this.setState({ message: `Error: ${error.message}` });
    } finally {
      this.setState({ loading: false });
    }
  };

  render() {
    const { email, message, loading } = this.state;

    return (
      <div className="max-w-md mx-auto mt-10 p-6 bg-white border border-gray-300 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-6 text-center">Forgot Password</h2>

        <form onSubmit={this.handleForgotPassword}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter your email"
              value={email}
              onChange={this.handleChange}
              required
            />
          </div>

          {message && (
            <div className={`mb-4 text-center ${message.includes("Error") ? "text-red-500" : "text-green-500"}`}>
              {message}
            </div>
          )}

          <button
            type="submit"
            className="w-full py-2 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 focus:outline-none"
            disabled={loading}
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>
      </div>
    );
  }
}
export default withNavigation(ForgotPassword);
