import { useEffect, useState } from 'react';
import { getUsers } from '../services/api';
import './UsersTable.css';

export default function UsersTable() {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState('');

  useEffect(() => {
    getUsers(page).then(res => {
      setUsers(res.data.data);
      setTotalPages(res.data.totalPages);
    });
  }, [page]);

  const filteredUsers = users.filter(u => {
    const fullName = `${u.first_name} ${u.last_name}`.toLowerCase();
    const email = u.email.toLowerCase();

    return (
      fullName.includes(search.toLowerCase()) ||
      email.includes(search.toLowerCase())
    );
  });

  return (
    <div className="users-container">
      <div className="users-header">
        <h1>User Management</h1>
        <p>Import and Display Problem</p>
      </div>
      <div className="users-controls">
        <input
          type="text"
          placeholder="Search by name or email"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>
      <div className="table-wrapper">
        <table className="users-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Company</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((u, i) => (
              <tr key={i}>
                <td data-label="Name">
                  <strong>{u.first_name} {u.last_name}</strong>
                </td>
                <td data-label="Email">{u.email}</td>
                <td data-label="Company">{u.company_name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="users-pagination">
        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
        >
          Prev
        </button>

        <span>Page {page} of {totalPages}</span>

        <button
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}
