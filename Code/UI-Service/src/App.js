import { useEffect, useState } from 'react';
import './App.css';

// Lấy từ biến môi trường build-time hoặc fallback về "/api"
const API_URL = process.env.REACT_APP_API_URL || "http://nguyenbavu.example.com:31080/api";

function App() {
  const [metrics, setMetrics] = useState('');
  const [deployments, setDeployments] = useState([]);

  useEffect(() => {
    console.log('🔗 API_URL:', API_URL);

    // Fetch metrics (text/plain)
    fetch(`${API_URL}/metrics`)
      .then(res => {
        if (!res.ok) throw new Error(`Metrics fetch failed: ${res.status}`);
        return res.text();
      })
      .then(setMetrics)
      .catch(err => {
        console.error(err);
        setMetrics('❌ Failed to load metrics');
      });

    // Fetch deployments (application/json)
    fetch(`${API_URL}/deployments`)
      .then(res => {
        if (!res.ok) throw new Error(`Deployments fetch failed: ${res.status}`);
        return res.json();
      })
      .then(setDeployments)
      .catch(err => {
        console.error(err);
        setDeployments([]);
      });
  }, []);

  return (
    <div className="dashboard">
      <header className="header">
        <h1>🚀 Deployment Dashboard</h1>
      </header>

      <section className="metrics-card">
        <h2>📊 System Metrics</h2>
        <p>{metrics || 'Loading metrics...'}</p>
      </section>

      <section className="deployments-container">
        <h3>📦 Recent Deployments</h3>
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Application</th>
                <th>Environment</th>
                <th>Status</th>
                <th>Duration</th>
              </tr>
            </thead>
            <tbody>
              {deployments.length > 0 ? (
                deployments.map((d, i) => (
                  <tr key={i}>
                    <td>{d.application}</td>
                    <td>{d.environment}</td>
                    <td className={`status ${d.status.toLowerCase()}`}>
                      {d.status}
                    </td>
                    <td>{d.duration}s</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4">No deployments found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

export default App;
