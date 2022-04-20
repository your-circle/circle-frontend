import Link from "next/link";
import Card from "../../shared/components/Card";
import { NotificationCardType } from "../../shared/schemas/notificationDetails.schema";
import { SiCountingworkspro } from "react-icons/si";
const NotificationCard: React.FC<NotificationCardType> = (props) => {
  const { project, title } = props;

  return (
    <div className="w-3/4  bg-main-gray border border-gray p-4 border-gray-border">
      {/* <Card> */}
      <div

        className=" cursor-pointer"
        onClick={() => {
          window.location.href = `projects/${project}`;
        }}>

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
