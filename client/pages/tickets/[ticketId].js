import React from "react";
import Header from "../../components/Header";
import Router from "next/router";
import useRequest from "../../hooks/use-request";

export default function TicketShow({ ticket, currentUser }) {
  const { doRequest, errors } = useRequest({
    url: "/api/orders",
    method: "post",
    body: {
      ticketId: ticket.id,
    },

    onSuccess: (order) => Router.push(`/orders/${order.id}`),
  });

  return (
    <div className="">
      <Header currentUser={currentUser} />
      <div className="w-full h-[100vh] bg-[rgba(0,0,0,0.7)] py-10 px-20 text-white">
        <h2>{ticket.title}</h2>
        <h2>{ticket.price}</h2>
        <h2>{ticket.status}</h2>
        <p>{errors}</p>
        <div onClick={() => doRequest()}>
          <button className="overflow-hidden relative w-32 p-2 h-12 bg-black text-white border-none rounded-md text-xl font-bold cursor-pointer relative z-10 group">
            Buy
            <span className="absolute w-36 h-32 -top-8 -left-2 bg-sky-200 rotate-12 transform scale-x-0 group-hover:scale-x-100 transition-transform group-hover:duration-500 duration-1000 origin-right"></span>
            <span className="absolute w-36 h-32 -top-8 -left-2 bg-sky-400 rotate-12 transform scale-x-0 group-hover:scale-x-100 transition-transform group-hover:duration-700 duration-700 origin-right"></span>
            <span className="absolute w-36 h-32 -top-8 -left-2 bg-sky-600 rotate-12 transform scale-x-0 group-hover:scale-x-100 transition-transform group-hover:duration-1000 duration-500 origin-right"></span>
            <span className="group-hover:opacity-100 group-hover:duration-1000 duration-100 opacity-0 absolute top-2.5 left-6 z-10">
              Buy Now
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}

TicketShow.getInitialProps = async (context, client) => {
  const { ticketId } = context.query;
  const { data } = await client.get(`/api/tickets/${ticketId}`);
  console.log(data);
  return { ticket: data };
};
