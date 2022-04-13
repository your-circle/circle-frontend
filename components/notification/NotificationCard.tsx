import Link from "next/link";
import Card from "../../shared/components/Card";
import { NotificationCardType } from "../../shared/schemas/notificationDetails.schema";

const NotificationCard: React.FC<NotificationCardType> = (props) => {
  const { project, title } = props;
  console.log("project", props);

  return (
    <div>
      <Card>
        <Link href={`projects/${project}`}>
          <a>
            <div className="flex justify-between">
              <span className="opacity-80">{props.type}</span>
              {/* comment for future use */}
              {/* <span className="opacity-80">{props.createdAt || "time"}</span> */}
            </div>
            <div className="w-[calc(100vw-100px)]">{title}</div>
          </a>
        </Link>
      </Card>
    </div>
  );
};

export default NotificationCard;
