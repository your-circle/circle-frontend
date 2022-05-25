import { useContext } from "react";
import { themeContext } from "../../providers/themeProvider";
import { NotificationCardType } from "../../shared/schemas/notificationDetails.schema";

const NotificationCard: React.FC<NotificationCardType> = (props) => {
  const { project, title } = props;
  const { theme } = useContext(themeContext);

  return (
    <div
      className={`w-3/4 ${
        theme === "light" ? "bg-slate-100 text-[#202020]" : "bg-main-bg"
      } border border-gray p-4 border-gray-border`}
    >
      {/* <Card> */}
      <div
        className=" cursor-pointer"
        onClick={() => {
          window.location.href = `projects/${project}`;
        }}
      >
        <div>
          <div className="flex justify-between">
            <span className="opacity-80">{props.type}</span>
            {/* comment for future use */}
            {/* <span className="opacity-80">{props.createdAt || "time"}</span> */}
          </div>
          <div>{title}</div>
        </div>
      </div>
      {/* </Card> */}
    </div>
  );
};

export default NotificationCard;
