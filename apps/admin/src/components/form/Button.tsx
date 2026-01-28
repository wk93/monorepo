import LoadingIcon from "../feedback/LoadingIcon";

interface Props
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "className"> {
  isLoading?: boolean;
}

const Button: React.FC<Props> = ({ isLoading = false, children, ...props }) => {
  return (
    <button
      {...props}
      className="rounded-md bg-primary-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-xs hover:bg-primary-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
    >
      {isLoading ? (
        <span className="w-full flex items-center justify-center">
          <LoadingIcon className="size-5" />
        </span>
      ) : (
        children
      )}
    </button>
  );
};

export default Button;
