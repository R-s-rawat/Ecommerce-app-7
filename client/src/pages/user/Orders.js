// import React from "react";
import { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import UserMenu from "../../components/Menu/UserMenu";
import axios from "axios";
import { useAuth } from "../../context/auth";

const Orders = () => {
  const API =
    process.env.NODE_ENV === "production"
      ? process.env.REACT_APP_API
      : "http://localhost:8080";

  const [orders, setOrders] = useState([]);

  const [auth, setAuth] = useAuth();

  const getOrders = async () => {
    try {
      const { data } = await axios.get(`${API}/api/v1/auth/orders`);
      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth?.token) {
      getOrders();
    }
  }, [auth?.token]);

  return (
    <Layout title={"Your orders"}>
      <div className="container-fluid p-3 m-3">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <h1 className="text-center">All orders</h1>
            {/* <p>{JSON.stringify(orders, null, 4)}</p> */}
            <div className="border shadow">
              {orders?.map((order, index) => (
                <div key={order._id} className="border shadow mb-4 me-4 m-2">
                  <table className="table">
                    <thead>
                      <tr>
                        <td scope="col">#</td>
                        <td scope="col">Status</td>
                        <td scope="col">Buyer</td>
                        <td scope="col">Orders</td>
                        <td scope="col">Payment</td>
                        <td scope="col">Quantity</td>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{index + 1}</td>
                        <td>{order?.status}</td>
                        <td>{order?.buyer?.name}</td>
                        <td>
                          {order?.products?.map((p) => p.name).join(", ")}
                        </td>
                        <td>
                          {order?.payment?.success ? "Success" : "Failed"}
                        </td>
                        <td>{order?.products?.length}</td>
                      </tr>
                    </tbody>
                  </table>

                  {/* 🟡 Products of this order below its table */}
                  <div className="container">
                    {order.products?.map((p) => (
                      <div className="row mb-2 p-3 card flex-row" key={p._id}>
                        <div className="col-md-4">
                          <img
                            src={`${API}/api/v1/product/product-photo/${p._id}`}
                            className="card-img-top"
                            alt={p.name}
                            width="100px"
                            height="100px"
                          />
                        </div>
                        <div className="col-md-8">
                          <p>{p.name}</p>
                          <p>{p.description?.substring(0, 30)}</p>
                          <p>Price: ₹{p.price}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Orders;
