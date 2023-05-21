import React from "react";

import { Avatar, Badge, Button, Layout } from "antd";
import { Logo } from "..";
import useWindowDimensions from "../../hooks/use-widnow-dimensions";
import { MenuOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getItemsCountInCart } from "../../redux/slice/productSlice";

const { Header } = Layout;

const CustomHeader = ({ handleRightBar }) => {
  const { width } = useWindowDimensions();
  const dispatch = useDispatch();
  const itemsInCart = useSelector((state) => state.product.totalItems);

  useEffect(() => {
    dispatch(getItemsCountInCart())
  }, []);

  return (
    <>
      <Header>
        <div className="flex justify-between items-center">
          <img
            src={Logo}
            alt="Logo"
            style={{
              float: "left",
              width: 120,
              height: 31,
              margin: "16px 24px 16px 0",
            }}
          />
          <div className="flex items-center">
            {width > 500 && (
              <>
                <Avatar className="bg-[#fde3cf] text-[#f56a00]">A</Avatar>
                <div className=" ml-2">
                  <p className="text-white font-semibold text-xs">User Admin</p>
                  <p className="text-gray-500 text-xs">user.admin@elred.com</p>
                </div>
              </>
            )}
            {width < 1000 && (
              <Badge count={itemsInCart}>
                <Button
                  className="text-white ml-8 flex items-center"
                  onClick={handleRightBar}
                  size={"small"}
                >
                  <ShoppingCartOutlined />
                </Button>
              </Badge>
            )}
          </div>
        </div>
      </Header>
    </>
  );
};

export default CustomHeader;
