import React, { useState } from "react";
import Header from "../../components/Header";
import useRequest from "../../hooks/use-request";
import Router from 'next/router'

export default function New({ currentUser }) {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const { doRequest, errors } = useRequest({
    url: "/api/tickets",
    method: "post",
    body: {
      title,
      price,
    },
    onSuccess: () => Router.push('/'),
  });

  const onSubmit = (e) => {
    e.preventDefault();

    doRequest();
  };

  const onBlur = () => {
    const value = parseFloat(price);

    if (isNaN(value)) {
      return;
    }

    setPrice(value.toFixed(2));
  };

  return (
    <div>
      <Header currentUser={currentUser} />
      <div>
        <div className="w-full h-[100vh] bg-[rgba(0,0,0,0.7)] flex justify-center items-center">
          <div className="w-1/3">
            <form
              onSubmit={onSubmit}
              className="bg-white dark:bg-zinc-900 shadow-lg shadow-white rounded-2xl overflow-hidden border-4 border-blue-400 dark:border-blue-800"
            >
              <div className="px-8 py-10 md:px-10">
                <h2 className="text-4xl font-extrabold text-center text-zinc-800 dark:text-white">
                  Create a Ticket
                </h2>
                <div className="mt-10">
                  <div className="relative">
                    <label
                      className="block mb-3 text-sm font-medium text-zinc-600 dark:text-zinc-200"
                      for="Title"
                    >
                      Title
                    </label>
                    <input
                      placeholder="Enter Ticket Tilte"
                      className="block w-full px-4 py-3 mt-2 text-zinc-800 bg-white border-2 rounded-lg dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-200 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-opacity-50 focus:outline-none focus:ring focus:ring-blue-400"
                      name="Title"
                      id="title"
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                    <p className="text-[10px] text-red-500">
                      {errors?.map(
                        (err) => err.field === "title" && err.message
                      )}
                    </p>
                  </div>
                  <div className="mt-6">
                    <label
                      className="block mb-3 text-sm font-medium text-zinc-600 dark:text-zinc-200"
                      for="password"
                    >
                      Price
                    </label>
                    <input
                      placeholder="Enter Ticket Price"
                      className="block w-full px-4 py-3 mt-2 text-zinc-800 bg-white border-2 rounded-lg dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-200 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-opacity-50 focus:outline-none focus:ring focus:ring-blue-400"
                      name="price"
                      id="price"
                      type="text"
                      onBlur={onBlur}
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                    />
                    <p className="text-[10px] text-red-500">
                      {errors?.map(
                        (err) => err.field === "price" && err.message
                      )}
                    </p>
                  </div>
                  <div className="mt-10">
                    <button
                      className="w-full px-4 py-3 tracking-wide text-white transition-colors duration-200 transform bg-gradient-to-r from-blue-600 to-cyan-600 rounded-lg hover:from-blue-700 hover:to-cyan-700 focus:outline-none focus:ring-4 focus:ring-blue-400 dark:focus:ring-blue-800"
                      type="submit"
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
