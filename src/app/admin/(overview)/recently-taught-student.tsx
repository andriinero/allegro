import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/app/_components/ui/avatar";

type RecentlyTaughtStudentProps = {
  avatar: string;
  name: string;
  email: string;
};

export default function RecentlyTaughtStudent({
  avatar,
  name,
  email,
}: RecentlyTaughtStudentProps) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-2">
      <div className="flex gap-4">
        <Avatar>
          <AvatarImage src={avatar} />
          <AvatarFallback>AN</AvatarFallback>
        </Avatar>

        <div>
          <p className="text-sm font-medium">{name}</p>
          <p className="text-sm text-muted-foreground">{email}</p>
        </div>
      </div>

      <div className="font-medium">45 minutes</div>
    </div>
  );
}
