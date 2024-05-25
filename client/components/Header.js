import React from "react";
import { MdOutlineAirplaneTicket } from "react-icons/md";
import Link from "next/link";

export default function Header({ currentUser }) {
  console.log(currentUser);
  return (
    <div className="py-5 w-[90%] container mx-auto flex justify-between items-center">
      <div>
        <a href="/" className="text-2xl font-bold flex space-x-2 items-center">
          <span>Tickets</span> <MdOutlineAirplaneTicket />
        </a>
      </div>
      <div className="">
        {currentUser ? (
          <div className="flex space-x-2 items-center">
            <Link href={"/tickets/new"}>
              <button
                class="group cursor-pointer outline-none hover:rotate-90 duration-300"
                title="Add New"
              >
                <svg
                  class="stroke-teal-500 fill-none group-hover:fill-teal-800 group-active:stroke-teal-200 group-active:fill-teal-600 group-active:duration-0 duration-300"
                  viewBox="0 0 24 24"
                  height="50px"
                  width="50px"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-width="1.5"
                    d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z"
                  ></path>
                  <path stroke-width="1.5" d="M8 12H16"></path>
                  <path stroke-width="1.5" d="M12 16V8"></path>
                </svg>
              </button>
            </Link>
            <Link href={'/orders'}>Orders</Link>
            <p>{currentUser?.email}</p>
            <a href="/auth/signout">Logout</a>
          </div>
        ) : (
          !currentUser && (
            <div className="space-x-4">
              <a href="/auth/signup" className="font-medium">
                Sign Up
              </a>
              <a href="/auth/signin" className="font-medium">
                Sign In
              </a>
            </div>
          )
        )}
      </div>
    </div>
  );
}
