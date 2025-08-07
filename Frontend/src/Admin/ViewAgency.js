import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Admin from "./Admin";
import { BUS_SERVICE_API_BASE_URL } from "../BaseURLs/BaseURLs";

function ViewAgency() {
  const navigate = useNavigate();

  useEffect(() => {
    if (!sessionStorage.getItem("userName")) {
      navigate("/");
    } else if (sessionStorage.getItem("userRole") === "CUSTOMER") {
      navigate("/");
    } else if (sessionStorage.getItem("userRole") === "AGENT") {
      navigate("/agency");
    } else if (sessionStorage.getItem("userRole") === "ADMIN") {
      navigate("/admin");
    }
  }, [navigate]);
  const [data, setData] = useState({ agencies: [], isFetching: false });
  const [searchText, setSearchText] = useState("");

  // Fetch agencies from API
  const fetchAgencies = async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("jwtToken")}`,
      },
    };
    try {
      setData({ agencies: [], isFetching: true });
      const response = await axios.get(
        BUS_SERVICE_API_BASE_URL+"/admin/getAllAgent",
        config
      );
      setData({ agencies: response.data, isFetching: false });
    } catch (error) {
      console.error("Error fetching agencies:", error);
      setData({ agencies: [], isFetching: false });
      //   toast.error("Failed to fetch agencies.");
    }
  };

  useEffect(() => {
    fetchAgencies();
  }, []);

  return (
    <Admin>
      <div>
        <ToastContainer />
        {/* View Agencies Section */}
        <div className="view-section">
          <div className="view-header">
            <h2>View Agency Details</h2>
            <input
              type="text"
              className="form-control search-bar"
              placeholder="Search by Name"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </div>
          {data.isFetching ? (
            <p>Loading agencies...</p>
          ) : (
            <table className="table table-striped table-hover">
              <thead className="table-dark">
                <tr>
                  <th>Name</th>
                  <th>Contact</th>
                  <th>Email</th>
                  <th>Address</th>
                </tr>
              </thead>
              <tbody>
                {data.agencies
                  .filter((agency) =>
                    searchText
                      ? agency.name
                          ?.toLowerCase()
                          .includes(searchText.toLowerCase())
                      : true
                  )

                  .map(({ id, name, contact, email, address }) => (
                    <tr key={id}>
                      <td>{name}</td>
                      <td>{contact}</td>
                      <td>{email}</td>
                      <td>{address}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
      <style jsx>{`
        .view-section {
          width: 80%;
          margin-left: 10%;
        }
        .view-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        }
        .search-bar {
          max-width: 300px;
        }
      `}</style>
    </Admin>
  );
}

export default ViewAgency;
