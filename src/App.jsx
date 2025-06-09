import React, { useState, useEffect } from 'react';
import './App.css';

// Мок данных API для офлайн-режима
const mockApi = {
  fetchData: () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          {
            id: 1,
            name: "Иван Иванов",
            email: "ivan@example.com",
            address: { city: "Москва" },
            phone: "+7 (495) 123-4567",
            company: { name: "Рога и копыта" }
          },
          {
            id: 2,
            name: "Мария Петрова",
            email: "maria@example.com",
            address: { city: "Санкт-Петербург" },
            phone: "+7 (812) 765-4321",
            company: { name: "ООО Технологии" }
          }
        ]);
      }, 1500);
    });
  }
};

function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const result = await mockApi.fetchData();
        setData(result);
      } catch (err) {
        setError("Ошибка загрузки данных");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  return (
    <div className="container">
      <h1 className="my-4">Данные пользователей</h1>
      
      {loading && (
        <div className="text-center my-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Загрузка...</span>
          </div>
          <p className="mt-2">Загрузка данных...</p>
        </div>
      )}
      
      {error && <div className="alert alert-danger">{error}</div>}
      
      {!loading && !error && (
        <div className="table-responsive">
          <table className="table table-striped table-hover table-bordered">
            <thead className="table-dark">
              <tr>
                <th>ID</th>
                <th>Имя</th>
                <th>Email</th>
                <th>Город</th>
                <th>Телефон</th>
                <th>Компания</th>
              </tr>
            </thead>
            <tbody>
              {data.map(item => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.name}</td>
                  <td>{item.email}</td>
                  <td>{item.address.city}</td>
                  <td>{item.phone}</td>
                  <td>{item.company.name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default App;