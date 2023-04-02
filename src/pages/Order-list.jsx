import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { getOrders } from "../Http_service/Httpservice";

const Orderlist = () => {
  const [orders, setorders] = useState([]);

  const columns = [
    {
      title: "S.No",
      dataIndex: "key",
    },
    {
      title: "order Id",
      dataIndex: "orderid",
    },
    {
      title: "product",
      dataIndex: "product",
    },
    {
      title: "order Date",
      dataIndex: "date",
    },
    {
      title: "Delivery Address",
      dataIndex: "address",
    },
    {
      title: "Customer Info",
      dataIndex: "Customer",
    },
    {
      title: "Total Amount",
      dataIndex: "total",
    },
    {
      title: "Payment Method",
      dataIndex: "status",
    },
  ];
  const data1 = [];
  for (let i = 0; i < orders.length; i++) {
    data1.push({
      key: i + 1,
      orderid: orders[i]._id,
      address: (
        <>
          <p className="mb-0">
            {orders[i].userdetails?.address} ,{orders[i].userdetails?.zipcode}
          </p>
          <p className="mb-0">
            {orders[i].userdetails?.city},{orders[i].userdetails?.country}
          </p>
        </>
      ),
      product: orders[i].products.map((item, k) => {
        return (
          <ol key={k}>
            <li>
              <img
                src={item.product.productimage[1].url}
                width="50px"
                alt="product"
              />{" "}
              {item.product.title}-Qty: {item.quantity}
            </li>
          </ol>
        );
      }),
      date: new Date(orders[i].createdAt).toLocaleString(),
      Customer: (
        <>
          <p className="mb-0">{orders[i].orderby?.fullname}</p>
          <p className="mb-0">{orders[i].orderby?.phone}</p>
        </>
      ),
      total: `$${orders[i].subtotal + 10}`,
      status: orders[i].paymentIntent,
    });
  }
  useEffect(() => {
    const getitems = async () => {
      const { data } = await getOrders();
      setorders(data);
    };
    getitems();
  }, [orders]);
  return (
    <div className="my-5 bg-white p-2">
      <h3 className="p-3">Recent Orders</h3>
      <div>
        {" "}
        <Table columns={columns} dataSource={data1} />
      </div>
    </div>
  );
};

export default Orderlist;
