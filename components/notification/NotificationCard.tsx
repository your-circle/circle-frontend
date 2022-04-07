import Link from "next/link";
import Card from "../../shared/components/Card";
import { NotificationCardType } from "../../shared/schemas/notificationDetails.schema";

const NotificationCard: React.FC<NotificationCardType> = ({
  project,
  title,
}) => {
  return (
    <div>
      <Card scale>
        <Link href={`projects/${project}`}>
          <div>{title}</div>
        </Link>
      </Card>
    </div>
  );
};

export default NotificationCard;
