const Modal = ({ isOpen, onClose, modalData }) => {
  if (!isOpen) return null;

  const closeModal = (e) => {
    if (e.target.id === "tableModal") {
      onClose();
    }
  };

  return (
    <div
      id="tableModal"
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[99999999]"
      onClick={closeModal}
    >
      <div
        className="bg-white p-5 rounded-lg shadow-lg max-w-lg w-full relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
          onClick={onClose}
        >
          Close
        </button>
        <div className="flex flex-col">
          <h2 className="text-xl font-bold mb-2 text-black ">
            {modalData.title}
          </h2>
          <p className="mb-4  text-black">{modalData.desc}</p>
          <p>
            <strong>Price:</strong> ${modalData.price}
          </p>
          <p>
            <strong>SKU:</strong> {modalData.sku}
          </p>
          <p>
            <strong>Quantity:</strong> {modalData.quantity}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Modal;
