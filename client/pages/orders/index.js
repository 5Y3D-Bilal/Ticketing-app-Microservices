import React from "react";
import Header from "../../components/Header";

export default function Orderindex({ orders, currentUser }) {
  return (
    <div>
      <Header currentUser={currentUser} />
      <ul>
        {orders.map((order) => {
          return (
            <li key={order.id}>
              {order.ticket.title} - {order.status}
            </li>
          );
        })}
      </ul>
      ;
    </div>
  );
}

Orderindex.getInitialProps = async (context, client) => {
  const { data } = await client.get(`/api/orders`);

  return { orders: data };
};
