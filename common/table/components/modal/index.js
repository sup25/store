const Modal = ({
  isOpen,
  onClose,
  modalData,
  excludeKeys = [],
  columnLabels = {},
}) => {
  if (!isOpen) return null;

  const closeModal = (e) => {
    if (e.target.id === "tableModal") {
      onClose();
    }
  };

  const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

  const renderContent = () => {
    return Object.entries(modalData)
      .filter(([key]) => !excludeKeys.includes(key))
      .map(([key, value]) => {
        let displayValue;

        if (Array.isArray(value)) {
          displayValue = value
            .map((item) =>
              typeof item === "object" ? JSON.stringify(item) : item
            )
            .join(", ");
        } else if (typeof value === "object" && value !== null) {
          displayValue = JSON.stringify(value, null, 2);
        } else {
          displayValue = value?.toString() || "N/A";
        }

        return (
          <p key={key} className="mb-2 text-black">
            <strong>{columnLabels[key] || key}:</strong> {displayValue}
          </p>
        );
      });
  };

  return (
    <div
      id="tableModal"
      className="fixed inset-0  bg-black bg-opacity-50 flex items-center justify-center z-[99999999]"
      onClick={closeModal}
    >
      <div
        className="bg-white mx-1 p-5 rounded-lg shadow-lg max-w-lg w-full relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
          onClick={onClose}
        >
          Close
        </button>
        <div className="flex flex-col">
          <h2 className="text-xl font-bold mb-4 text-black">Details</h2>
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default Modal;
