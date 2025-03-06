import React, { Component } from "react";
import {
  FaCog,
  FaSignOutAlt,
  FaTachometerAlt,
  FaTicketAlt,
  FaUsers,
} from "react-icons/fa";
import Datetime from "react-datetime";
import "react-datetime/css/react-datetime.css";
import { NavLink } from "react-router-dom";
import { addTicketToDatabase } from "../repository/TicketRepository";
import { AuthContext } from "../context/AuthContext";
import { getRoleNameById } from "../repository/RoleRepository";
import { logoutService } from "../repository/AuthRepository";
class Dashboard extends Component {
  static contextType = AuthContext;
  constructor(props) {
    super(props);
    this.state = {
      startDate: "",
      endDate: "",
      category: "",
      priority: "",
      description: "",
      projectName: "",
      roleName: "",

    };
  }
  componentDidUpdate(prevProps, prevState) {
    const { role } = this.context;
    if (prevState.roleName !== this.state.roleName || prevProps.role !== role) {
      this.fetchRoleName(role);
    }
  }
  fetchRoleName = async (role) => {
    if (role) {
      const fetchedRoleName = await getRoleNameById(role);
      this.setState({ roleName: fetchedRoleName.roleName});
      console.log("roleName", fetchedRoleName);
    }
  };
  handleStartDateChange = (date) => {
    this.setState({ startDate: date });
  };

  handleEndDateChange = (date) => {
    this.setState({ endDate: date });
  };

  handleCategoryChange = (e) => {
    this.setState({ category: e.target.value });
  };

  handlePriorityChange = (e) => {
    this.setState({ priority: e.target.value });
  };

  handleDescriptionChange = (e) => {
    this.setState({ description: e.target.value });
  };

  handleProjectNameChange = (e) => {
    this.setState({ projectName: e.target.value });
  };
  handleSubmit = async (e) => {
    e.preventDefault();
    const { startDate, endDate, priority, category, description, projectName } =
      this.state;
    const ticketData = {
      startDate: startDate.format("YYYY-MM-DD"),
      endDate: endDate.format("YYYY-MM-DD"),
      priority,
      category,
      description,
      projectName,
    };
    await addTicketToDatabase(ticketData);
    this.setState({
      startDate: "",
      endDate: "",
      category: "",
      priority: "",
      description: "",
      status: "",
      projectName: "",
    });
  };

  handleClose = () => {
    this.setState({
      startDate: "",
      endDate: "",
      category: "",
      priority: "",
      description: "",
      status: "",
      projectName: "",
    });
  };
  handleLogOut = () => {
    console.log("logout click");
    logoutService();
  };
  render() {
    const {
      startDate,
      endDate,
      priority,
      category,
      description,
      projectName,
      roleName,
    } = this.state;

    if (!roleName) {
      return <div>Loading...</div>;
    }

    return (
      <div className="flex h-screen bg-gray-100">
        {/* Sidebar */}
        <div className="w-64 bg-white p-5 shadow-lg flex flex-col justify-between">
          <div>
            <h2 className="text-lg font-bold mb-6">Kabi Project Management</h2>
            <nav className="space-y-4">
              <NavLink
                to="/home"
                className="flex items-center text-purple-600 font-semibold"
                activeClassName="text-purple-800" 
              >
                <FaTachometerAlt className="mr-3" /> Dashboard
              </NavLink>

              {roleName === "Admin" ? (
                <NavLink
                  to="/tickets"
                  className="flex items-center text-purple-600 font-semibold"
                  activeClassName="text-purple-800"
                >
                  <FaTicketAlt className="mr-3" /> Tickets
                </NavLink>
              ) : (
                <NavLink
                  to="/users"
                  className="flex items-center text-purple-600 font-semibold"
                  activeClassName="text-purple-800"
                >
                  <FaUsers className="mr-3" /> UsersPage
                </NavLink>
              )}

              <NavLink
                to="/settings"
                className="flex items-center text-purple-600 font-semibold"
                activeClassName="text-purple-800"
              >
                <FaCog className="mr-3" /> Settings
              </NavLink>
            </nav>
          </div>
          <button className="flex items-center bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"  onClick={this.handleLogOut}>
            <FaSignOutAlt className="mr-3" /> Logout
          </button>
        </div>
        <div className="flex-1 p-6">
          {/* Top bar */}
          <div className="flex justify-between items-center mb-6">
            <div className="relative w-1/3">
              <h1 className="text-2xl font-bold">Kabi Mobile App Project</h1>
            </div>
            <div className="flex items-center space-x-4">
              <img
                src="/images/profileImage.jpg"
                alt="Language"
                className="w-12 h-12 rounded-full"
              />
            </div>
          </div>
          {/* Ticket Section */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <form onSubmit={this.handleSubmit}>
              <div className="flex justify-between mb-4">
                <h2 className="text-xl font-bold">Create Ticket Component</h2>
                <button
                  type="button"
                  className="bg-purple-600 text-white px-4 py-2 rounded-md"
                  onClick={this.handleSubmit}
                >
                  Create A Task
                </button>
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <label className="font-semibold">Project Name</label>
                    <select
                      className="p-2 border rounded"
                      value={projectName}
                      onChange={this.handleProjectNameChange}
                    >
                      <option value="">Select Project Name</option>
                      <option value="Bug">Kabi Mobile App</option>
                      <option value="Feature">Broker System</option>
                      <option value="Improvement">
                        Stock_Inventory Management
                      </option>
                    </select>
                  </div>
                  {/* Category Dropdown */}
                  <div className="flex justify-between items-center">
                    <label className="font-semibold">Category</label>
                    <select
                      className="p-2 border rounded"
                      value={category}
                      onChange={this.handleCategoryChange}
                    >
                      <option value="">Select Category</option>
                      <option value="Bug">Bug</option>
                      <option value="Feature">Feature</option>
                      <option value="Improvement">Improvement</option>
                    </select>
                  </div>

                  {/* Priority Dropdown */}
                  <div className="flex justify-between items-center">
                    <label className="font-semibold">Priority</label>
                    <select
                      className="p-2 border rounded"
                      value={priority}
                      onChange={this.handlePriorityChange}
                    >
                      <option value="">Select Priority</option>
                      <option value="Low">Low</option>
                      <option value="Medium">Medium</option>
                      <option value="High">High</option>
                      <option value="Urgent">Urgent</option>
                    </select>
                  </div>
                  {/* Start DateTime Picker */}
                  <div className="flex justify-between items-center">
                    <label className="font-semibold">Start Date</label>
                    <Datetime
                      value={startDate}
                      onChange={this.handleStartDateChange}
                      dateFormat="YYYY-MM-DD"
                      placeholder="Select Start Date"
                      className="p-2 border rounded"
                    />
                  </div>

                  {/* End DateTime Picker */}
                  <div className="flex justify-between items-center">
                    <label className="font-semibold">End Date</label>
                    <Datetime
                      value={endDate}
                      onChange={this.handleEndDateChange}
                      dateFormat="YYYY-MM-DD"
                      placeholder="Select End Date"
                      className="p-2 border rounded"
                    />
                  </div>
                </div>
                <div>
                  <label className="font-semibold">Task Description</label>
                  <textarea
                    id="description"
                    className="w-full mt-2 p-2 border rounded-md h-24"
                    placeholder="Enter task details..."
                    value={description}
                    onChange={this.handleDescriptionChange}
                  />
                </div>
              </div>
              <div className="flex justify-end mt-6 space-x-4">
                <button
                  type="button"
                  className="bg-orange-500 text-white px-6 py-2 rounded-md"
                  onClick={this.handleClose}
                >
                  Close
                </button>
                <button
                  className="bg-purple-800 text-white px-6 py-2 rounded-md"
                  type="submit"
                >
                  Add Task
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Dashboard;
