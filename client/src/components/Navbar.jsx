import React from "react";

import { GiHamburgerMenu } from "react-icons/gi";
import { RxAvatar } from "react-icons/rx";
import { Menu, Button, Text, rem } from "@mantine/core";
import { IoSearch } from "react-icons/io5";
import { IoIosNotifications } from "react-icons/io";
import { IoMail } from "react-icons/io5";
import { IoIosArrowDown } from "react-icons/io";
import { logout } from "../api/authApi";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { queryClient } from "../main";

const Navbar = ({ user }) => {
  const navigate = useNavigate();
  const { mutate, isPending } = useMutation({
    mutationKey: "logout",
    mutationFn: logout,
    onSuccess: () => {
      toast.success("Logged out successfully");
      queryClient.invalidateQueries("checkAuth");
      navigate("/login");
    },
    onError: (err) => toast.error(err.response.data.message),
  });
  function handleLogout() {
    mutate();
  }
  return (
    <div className="px-20 py-3 border-b  border-gray-100 shadow-md bg-white">
      <div className="flex justify-between items-center">
        <GiHamburgerMenu size={24} color="gray" />
        <div className="flex gap-4 items-center">
          <IoSearch size={24} color="gray" />
          <IoIosNotifications size={24} color="gray" />
          <IoMail size={24} color="gray" />

          <Menu shadow="md" width={200} trigger="hover" withArrow>
            <Menu.Target>
              <div className="cursor-pointer flex items-center justify-start gap-2 pl-3 border-l-2 border-gray-300">
                <RxAvatar size={30} color="gray" />
                <div>
                  <p className="text-sm">{user?.name}</p>
                  <p className="text-xs">{user?.role}</p>
                </div>
                <IoIosArrowDown />
              </div>
            </Menu.Target>

            <Menu.Dropdown>
              <Menu.Label>Application</Menu.Label>
              <Menu.Item>Settings</Menu.Item>
              <Menu.Item onClick={handleLogout} disabled={isPending}>
                Logout
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
