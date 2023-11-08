import clsx from "clsx";

interface Props {
  className?: string;
}

const Attribution: React.FC<Props> = ({ className }) => {
  return (
    <div
      className={clsx(
        "text-white text-center absolute left-4 bottom-4 flex items-center",
        className
      )}
    >
      <button className="rounded-full bg-primary-bright-blue border-white w-10 h-10 peer z-20">
        A
      </button>
      <div className="hidden peer-hover:flex hover:flex bg-primary-bright-blue h-10 pl-7 pr-4 -ml-5 items-center rounded-r-full overflow-hidden">
        <span>
          Challenge by{" "}
          <a
            href="https://www.frontendmentor.io?ref=challenge"
            target="_blank"
            className="underline"
          >
            Frontend Mentor
          </a>
          . Coded by{" "}
          <a href="#" className="underline">
            Edgar Avila
          </a>
          .
        </span>
      </div>
    </div>
  );
};

export default Attribution;
