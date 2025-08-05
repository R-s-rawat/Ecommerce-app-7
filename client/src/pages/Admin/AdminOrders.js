// import React from "react";
import { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Menu/AdminMenu";
import axios from "axios";
import toast from "react-hot-toast";
import moment from "moment";
import { useAuth } from "../../context/auth";
import { Select } from "antd";
const { Option } = Select;

const AdminOrders = () => {
      const API =
    process.env.NODE_ENV === "production"
      ? process.env.REACT_APP_API
      : "http://localhost:8080";

  const [status, setStatus] = useState([
    "Not processed",
    "Processing",
    "Shipped",
    "Delivered",
    "Cancelled",
  ]);

  const [changedStatus, setChangedStatus] = useState("");

    const [orders, setOrders] = useState([]);
  
    const [auth, setAuth] = useAuth();
  
    const getOrders = async () => {
      try {
        const { data } = await axios.get(`${API}/api/v1/auth/all-orders`);
        console.log(data)
        setOrders(data);
      } catch (error) {
        console.log(error);
      }
    };

    const handleChange = async (orderId, value) => {
    try {
      const { data } = await axios.put(`${API}/api/v1/auth/order-status/${orderId}`, {
        status: value,
      });
      getOrders();
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
    <Layout title={"All orders data"}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <div className="text-center">All Orders</div>
            {/* show orders begin */}
   <div className="border shadow">
              {orders?.map((order, index) => (
                <div key={order._id} className="border shadow mb-4 me-4 m-2">
                  <table className="table">
                    <thead>
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">Status</th>
                        <th scope="col">Buyer</th>
                            <th scope="col">Date</th>
                        <th scope="col">Orders</th>
                        <th scope="col">Payment</th>
                        <th scope="col">Quantity</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{index + 1}</td>
                        {/* <td>{order?.status}</td> */}
                        <td>
                              <Select
                          bordered={false}
                          onChange={(value) => handleChange(order._id, value)}
                          defaultValue={order?.status}
                        >
                          {status.map((s, i) => (
                            <Option key={i} value={s}>
                              {s}
                            </Option>
                          ))}
                        </Select>
                        </td>
                        <td>{order?.buyer?.name}</td>
                        <td>{moment(order?.createAt).fromNow()}</td>
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
                            className="img-fluid rounded"
                            alt={p.name}
                            width="65%"
                            height="15%"
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
            {/* show orders end */}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminOrders;
