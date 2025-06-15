import { UserResource } from "@clerk/types";
const AccountHeader = ({ user }: { user: UserResource | null | undefined }) => {
  if (!user) return null;
  const getUserInitials = () => {
    const fullName = user.fullName || "";
    return fullName.charAt(0) || "U";
  };
  return (
    <div className="mb-12 relative backdrop-blur-sm border border-border rounded-lg p-7">
      <div className="flex flex-col md:flex-row items-start md:items-center gap-7">
        {}
        <div className="relative">
          {user?.imageUrl ? (
            <div className="relative w-24 h-24 overflow-hidden rounded-lg border-2 border-secondary/20">
              <img
                src={user.imageUrl}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
          ) : (
            <div className="w-24 h-24 rounded-lg bg-gradient-to-br from-secondary/20 to-secondary/50 flex items-center justify-center">
              <span className="text-3xl font-bold text-secondary">
                {getUserInitials()}
              </span>
            </div>
          )}
          {}
          <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-green-500 border-2 border-background"></div>
        </div>
        {}
        <div className="flex-1">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-3">
            <h1 className="text-3xl font-bold">
              <span className="text-foreground">{user.fullName}</span>
            </h1>
            {}
          </div>
          {}
          <div className="h-px w-full bg-gradient-to-r from-transparent via-secondary/40 to-transparent my-3"></div>
          {}
          <p className="text-muted-foreground">
            {user.primaryEmailAddress?.emailAddress}
          </p>
        </div>
      </div>
    </div>
  );
};
export default AccountHeader;
