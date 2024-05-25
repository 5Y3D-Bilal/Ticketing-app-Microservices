import { useEffect, useState } from "react";
import Header from "../../components/Header";
import StripeCheckout from "react-stripe-checkout";
import useRequest from "../../hooks/use-request";

const OrderShow = ({ order, currentUser }) => {
  const [timeleft, setTimeleft] = useState(0);

  const { doRequest, errors } = useRequest({
    url: "/api/payments",
    method: "post",
    body: {
      orderId: order.id,
    },

    onSuccess: (payment) => console.log(payment)
  });

  useEffect(() => {
    const findTimeLeft = () => {
      const msLeft = new Date(order.expiresAt) - new Date();
      setTimeleft(Math.round(msLeft / 1000));
    };
    findTimeLeft();
    const timerId = setInterval(findTimeLeft, 1000);
    return () => {
      clearInterval(timerId);
    };
  }, [order]);

  if (timeleft < 0) return "Your order has been expired";
  return (
    <div>
      <Header currentUser={currentUser} />
      <div className="w-full h-[100vh] bg-[rgba(0,0,0,0.7)] py-10 px-20 text-white">
        <h1>This order will expire in {timeleft}</h1>
        <StripeCheckout
          token={(id) => doRequest({ token: id })}
          stripeKey="pk_test_51OpkycA7WohN8GIQfKZFsWvgUua7AewAvMFszppCNUDDw7cpHmM9gkMT8DHpkI5juCuBYzSVCAWECaB5UatMkox800JPS5w84D"
          amount={order.ticket.price * 100}
          email={currentUser.email}
        />
        {/* {errors.map((err)=> <h1>{err.message}</h1>)} */}
      </div>
    </div>
  );
};

OrderShow.getInitialProps = async (context, client) => {
  const { orderId } = context.query;
  const { data } = await client.get(`/api/orders/${orderId}`);

  return { order: data };
};

export default OrderShow;
