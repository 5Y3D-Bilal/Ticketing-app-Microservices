import Header from "../components/Header";
import Link from "next/link";

const LandingPage = ({ currentUser, tickets }) => {
  console.log(tickets);
  return (
    <>
      <Header currentUser={currentUser} />
      <div className="bg-[rgba(0,0,0,0.7)] w-full h-screen  text-white p-10 items-center justify-center gap-y-5 flex flex-col">
        <h2 className="text-2xl font-bold">Latest Tickets</h2>
        <div className="">
          <div className="grid grid-cols-3 w-full gap-y-5 gap-x-10">
            {tickets.map((ticket) => (
              <div
                className="flex flex-col bg-white rounded-3xl w-72"
                key={ticket.id}
              >
                <div className="px-6 py-8 sm:p-10 sm:pb-6">
                  <div className="grid items-center justify-center w-full grid-cols-1 text-left">
                    <div>
                      <h2 className="text-lg font-medium tracking-tighter text-gray-600 lg:text-3xl">
                        {ticket.title}
                      </h2>
                    </div>
                    <div className="mt-6">
                      <p>
                        <span className="text-5xl font-light tracking-tight text-black">
                          ${ticket.price}
                        </span>
                        <span className="text-base font-medium text-gray-500">
                          {" "}
                          /mo{" "}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex px-6 pb-8 sm:px-8">
                  <Link
                    aria-describedby="tier-company"
                    className="flex items-center justify-center w-full px-6 py-2.5 text-center text-white duration-200 bg-black border-2 border-black rounded-full nline-flex hover:bg-transparent hover:border-black hover:text-black focus:outline-none focus-visible:outline-black text-sm focus-visible:ring-black"
                    href={`/tickets/${ticket.id}`}
                  >
                    Order Now
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

LandingPage.getInitialProps = async (context, client, currentUser) => {
  const { data } = await client.get("/api/tickets");

  return { tickets: data };
};

export default LandingPage;
