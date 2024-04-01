import React, {useState, useEffect} from "react";
import axios from "axios";
import styles from "./Users.module.css";
import Search from "../SearchBar/SearchBar";

function Users() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchKey, setSearchKey] = useState("");
  const API_URL =
    "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json";
  const fetchUsers = async () => {
    try {
      const response = await axios.get(API_URL);
      setUsers(response.data);
      setFilteredUsers(response.data);
    } catch (error) {
      console.log("Error in getting users", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    filter();
  }, [users, searchKey]);

  const filter = () => {
    if (searchKey !== "") {
      const result = users.filter((obj) =>
        Object.keys(obj).some((key) => obj[key].includes(searchKey))
      );
      setFilteredUsers(result);
    } else {
      setFilteredUsers([]);
    }
  };

  const onSearch = (event) => {
    setSearchKey(event.target.value);
  };

  return (
    <div className={styles.container}>
      <Search onSearch={onSearch} />
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Users;
