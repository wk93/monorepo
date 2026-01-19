import LoadingIcon from "./LoadingIcon";

const LoadingScreen = () => {
  return (
    <div className="backdrop-blur-xs fixed inset-0 z-50 flex items-center justify-center">
      <div className="p-8 bg-white rounded-lg border border-gray-200">
        <LoadingIcon className="w-8 h-8 text-blue-500" />
      </div>
    </div>
  );
};

export default LoadingScreen;
