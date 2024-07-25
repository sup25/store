import React, { useState } from "react";
import { FaSortUp, FaSortDown } from "react-icons/fa";
import CTA from "../cta";
import Modal from "../modal";

const TableBody = ({
  data = [],
  setIsLoading,
  handleSort,
  sortConfig,
  setProducts,
  products,
}) => {
  const [modalData, setModalData] = useState(null);

  if (data.length === 0) return null;

  const excludeKeys = ["adminId", "orderId", "images"];
  const visibleKeys = Object.keys(data[0]).filter(
    (key) => !excludeKeys.includes(key)
  );

  const openModal = (item) => {
    setModalData(item);
  };

  const closeModal = () => {
    setModalData(null);
  };

  return (
    <>
      <div className="w-full flex flex-col">
        {/* Table Headers */}
        <div className="flex text-black font-bold">
          {visibleKeys.map((key) => (
            <div
              key={key}
              className="p-2 border cursor-pointer flex-grow flex-shrink-0 min-w-[120px] overflow-hidden"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                background: "gray",
              }}
              onClick={() => key === "id" && handleSort(key)}
            >
              <div style={{ display: "flex", alignItems: "center" }}>
                {key === "id" && (
                  <>
                    {sortConfig.key === key ? (
                      sortConfig.direction === "ascending" ? (
                        <FaSortUp
                          style={{ marginRight: "5px", color: "green" }}
                        />
                      ) : (
                        <FaSortDown
                          style={{ marginRight: "5px", color: "red" }}
                        />
                      )
                    ) : (
                      <FaSortUp
                        style={{
                          marginRight: "5px",
                          color: "black",
                          transform: "rotate(90deg)",
                        }}
                      />
                    )}
                  </>
                )}
                {key}
              </div>
            </div>
          ))}
          <div
            className="p-2 border flex-shrink-0 min-w-[100px] overflow-hidden"
            style={{ background: "gray" }}
          >
            Actions
          </div>
        </div>

        {/* Table Rows */}
        {data.map((item) => (
          <div
            className="flex hover:bg-gray-200 cursor-pointer"
            key={item.id}
            onClick={() => openModal(item)}
          >
            {visibleKeys.map((key, index) => (
              <div
                className="p-2 border text-black flex-grow flex-shrink-0 min-w-[120px] overflow-hidden"
                key={index}
                style={{
                  background: "lightgray",
                  maxWidth: "120px",
                  whiteSpace: "nowrap",
                  textOverflow: "ellipsis",
                  overflow: "hidden",
                }}
              >
                {Array.isArray(item[key])
                  ? item[key].join(", ")
                  : item[key] !== null && item[key] !== undefined
                  ? item[key].toString()
                  : ""}
              </div>
            ))}
            <div
              className="p-2 border flex-shrink-0 min-w-[100px] flex items-center overflow-hidden"
              style={{ background: "lightgray" }}
            >
              <CTA
                item={item}
                products={products}
                setIsLoading={setIsLoading}
                setProducts={setProducts}
              />
            </div>
          </div>
        ))}
      </div>

      {modalData && (
        <Modal
          isOpen={modalData !== null}
          modalData={modalData}
          onClose={closeModal}
        />
      )}
    </>
  );
};

export default TableBody;
