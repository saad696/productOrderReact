import { Button, Divider, Space, Table, Typography } from "antd";
import React, { useEffect, useMemo, useState } from "react";
import useWindowDimensions from "../../../hooks/use-widnow-dimensions";
import { useDispatch, useSelector } from "react-redux";
import { DeleteOutlined } from "@ant-design/icons";
import {
  addToCart,
  clearProducts,
  getItemsInCart,
  removeProductById,
} from "../../../redux/slice/productSlice";

const ProductDetailCart = ({ handleProductDrawer }) => {
  const { width } = useWindowDimensions();

  const selectedProducts = useSelector((state) => state.product.list);
  const dispatch = useDispatch();

  // table columns
  const columns = [
    {
      title: "Product",
      dataIndex: "productName",
      key: "productName",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Price",
      dataIndex: "grossPrice",
      key: "grossPrice",
      render: (_, record) => <p>{record.total.toLocaleString()}</p>,
    },
    {
      title: "",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <a
            onClick={() => {
              dispatch(removeProductById(record.addedItemUid));
            }}
          >
            <DeleteOutlined />
          </a>
        </Space>
      ),
    },
  ];
  // table columns

  const addItemToCart = () => {
    
    dispatch(addToCart(selectedProducts));
    dispatch(clearProducts());
    dispatch(getItemsInCart())
    handleProductDrawer()
  };

  const calculateTotal = useMemo(() => {
    return selectedProducts.reduce((acc, product) => +acc + +product.total, 0);
  }, [selectedProducts]);

  return (
    <>
      <div className="w-full mt-8 lg:mt-0">
        <Space className="justify-between w-full">
          <Typography.Title level={width < 768 ? 4 : 3}>
            Order List
          </Typography.Title>
          <Button
            onClick={() => {
              dispatch(clearProducts());
            }}
          >
            Clear
          </Button>
        </Space>
      </div>
      <Divider />
      <Table
        columns={columns}
        dataSource={selectedProducts}
        pagination={false}
        footer={() => (
          <strong className="text-right block">
            Total Price: {calculateTotal} {selectedProducts[0]?.currency.symbol}
          </strong>
        )}
      />
      <Divider />
      <Button
        danger
        className="w-full"
        onClick={addItemToCart}
      >
        <span className="font-semibold">Add to cart</span>
      </Button>
    </>
  );
};

export default ProductDetailCart;
