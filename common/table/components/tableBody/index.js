import React, { useState } from "react";
import { FaSortUp, FaSortDown } from "react-icons/fa";
import CTA from "../cta";
import Modal from "../modal";

const TableBody = ({
  data = [],
  setIsLoading,
  handleSort,
  sortConfig,
  setData,
  columns,
  uniqueKey,
  showActions,
  excludeKeys = [],
}) => {
  const [modalData, setModalData] = useState(null);

  if (data.length === 0) return null;

  const openModal = (item) => {
    setModalData(item);
  };

  const closeModal = () => {
    setModalData(null);
  };

  return (
    <>
      {modalData && (
        <Modal
          isOpen={modalData !== null}
          modalData={modalData}
          onClose={closeModal}
          excludeKeys={excludeKeys}
        />
      )}
      <div className="w-full flex flex-col">
        {/* Table Headers */}
        <div className="flex text-black font-bold">
          {columns.map((key) => (
            <div
              key={key}
              className="p-2 border cursor-pointer flex-grow flex-shrink-0 min-w-[120px] overflow-hidden"
              style={{
                flex: 1,
                background: "gray",
              }}
              onClick={() => handleSort(key)}
            >
              <div style={{ display: "flex", alignItems: "center" }}>
                {sortConfig.key === key ? (
                  sortConfig.direction === "ascending" ? (
                    <FaSortUp style={{ marginRight: "5px", color: "green" }} />
                  ) : (
                    <FaSortDown style={{ marginRight: "5px", color: "red" }} />
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
                {key}
              </div>
            </div>
          ))}
          {showActions && (
            <div
              className="p-2 border flex-shrink-0 min-w-[100px] overflow-hidden"
              style={{ background: "gray" }}
            >
              Actions
            </div>
          )}
        </div>

        {/* Table Rows */}
        {data.map((item) => (
          <div
            className="flex hover:bg-gray-200 cursor-pointer"
            key={item[uniqueKey]}
            onClick={() => openModal(item)}
          >
            {columns.map((key) => (
              <div
                className="p-2 border text-black flex-grow flex-shrink-0 min-w-[120px] overflow-hidden"
                key={key}
                style={{
                  background: "lightgray",
                  whiteSpace: "nowrap",
                  textOverflow: "ellipsis",
                  overflow: "hidden",
                  flex: 1,
                }}
              >
                {Array.isArray(item[key])
                  ? item[key].join(", ")
                  : item[key] !== null && item[key] !== undefined
                  ? item[key].toString()
                  : ""}
              </div>
            ))}
            {showActions && (
              <div
                className="p-2 border flex-shrink-0 min-w-[100px] flex items-center overflow-hidden"
                style={{ background: "lightgray" }}
              >
                <CTA
                  item={item}
                  data={data}
                  setIsLoading={setIsLoading}
                  setData={setData}
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
};

export default TableBody;
