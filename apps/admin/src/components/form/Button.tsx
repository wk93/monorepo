type Props = Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "className">;

const Button: React.FC<Props> = ({ ...props }) => {
  return (
    <button
      {...props}
      className="rounded-md bg-primary-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-xs hover:bg-primary-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
    />
  );
};

export default Button;
