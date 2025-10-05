import { RxCross1 } from "react-icons/rx";

const MessageModal = ({ modalState, setModalState }) => {
  const closeModal = () => {
    setModalState((prev) => ({
      ...prev,
      isOpen: false,
    }));
  };

  return (
    <div
      className={
        modalState.isOpen
          ? "fixed font-lato inset-0 z-50 flex items-center justify-center"
          : "hidden"
      }
    >
      <div className="absolute inset-0 bg-black opacity-55 z-0"></div>

      <div className="z-10 flex justify-center items-center h-full w-full">
        <div
          className={
            modalState.type === "error"
              ? "relative bg-red-600 w-[50%] px-10 py-20 rounded-lg shadow-lg flex justify-between"
              : "relative bg-green-500 w-[50%] px-10 py-20 rounded-lg shadow-lg flex justify-between"
          }
        >
          <div className="text-xl text-white flex uppercase flex-col gap-1">
            <p>{modalState.type === "error" ? "Error occured:" : "Success:"}</p>
            <p>{modalState.message}</p>
          </div>
          <RxCross1
            onClick={closeModal}
            className="absolute top-4 right-4 text-white text-xl duration-200 hover:scale-[1.1] cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
};

export default MessageModal;
