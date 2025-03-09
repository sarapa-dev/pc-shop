import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Mail, UserIcon, EditIcon, SaveIcon, XIcon } from "lucide-react";
import { UserType } from "../../types/user";
import { useState, useEffect } from "react";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { AxiosError } from "axios";
import toast from "react-hot-toast";
import { axiosInstance } from "../../lib/axios";

const ProfilePage = () => {
  const queryClient = useQueryClient();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<Partial<UserType>>({});
  const { data: authUser } = useQuery<UserType>({ queryKey: ["authUser"] });

  useEffect(() => {
    if (authUser) {
      setFormData({
        username: authUser.username,
        email: authUser.email,
        full_name: authUser.full_name,
      });
    }
  }, [authUser]);

  const hasChanges = (original: UserType, current: Partial<UserType>) => {
    return (
      current.username !== original.username ||
      current.email !== original.email ||
      current.full_name !== original.full_name
    );
  };

  const { mutate: updateProfile } = useMutation({
    mutationFn: async (updatedData: Partial<UserType>) => {
      const response = await axiosInstance.put(`/user/${authUser?.user_id}`, updatedData);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
      setIsEditing(false);
      toast.success("Profile updated successfully!");
    },
    onError: (error: AxiosError<{ message?: string }>) => {
      toast.error(error.response?.data?.message || "Email or username are taken");
    },
  });

  const handleInputChange = (field: keyof UserType) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleSave = () => {
    if (!authUser) return;

    if (!hasChanges(authUser, formData)) {
      toast("No changes to save");
      setIsEditing(false);
      return;
    }

    updateProfile(formData);
  };

  if (!authUser) return null;

  return (
    <div className="container mx-auto md:p-6">
      <Card className="mx-auto max-w-2xl">
        <CardHeader className="flex flex-wrap flex-row items-center gap-4 space-y-0">
          <Avatar className="h-20 w-20">
            <AvatarImage src={`https://avatar.vercel.sh/${authUser.username}`} />
            <AvatarFallback>{authUser.full_name[0]}</AvatarFallback>
          </Avatar>
          <div className="flex flex-wrap flex-col flex-1">
            <div className="flex flex-wrap gap-2 items-center justify-between">
              <div>
                <CardTitle className="text-2xl">
                  {isEditing ? (
                    <Input
                      value={formData.full_name || ""}
                      onChange={handleInputChange("full_name")}
                    />
                  ) : (
                    authUser.full_name
                  )}
                </CardTitle>

                <div className="flex items-center gap-2">
                  <Badge variant={authUser.role === "admin" ? "default" : "secondary"}>
                    {authUser.role}
                  </Badge>
                </div>
              </div>
              <div className="flex gap-2">
                {isEditing ? (
                  <>
                    <Button size="sm" onClick={handleSave}>
                      <SaveIcon className="h-4 w-4 mr-2" />
                      Save
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => setIsEditing(false)}>
                      <XIcon className="h-4 w-4 mr-2" />
                      Cancel
                    </Button>
                  </>
                ) : (
                  <Button size="sm" onClick={() => setIsEditing(true)}>
                    <EditIcon className="h-4 w-4 mr-2" />
                    Edit Profile
                  </Button>
                )}
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Username</p>
              <div className="flex items-center gap-2">
                <UserIcon className="h-4 w-4 text-muted-foreground" />
                {isEditing ? (
                  <Input value={formData.username || ""} onChange={handleInputChange("username")} />
                ) : (
                  <span className="font-medium">{authUser.username}</span>
                )}
              </div>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Email</p>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                {isEditing ? (
                  <Input
                    type="email"
                    value={formData.email || ""}
                    onChange={handleInputChange("email")}
                  />
                ) : (
                  <span className="font-medium">{authUser.email}</span>
                )}
              </div>
            </div>
          </div>
          <div className="border-t pt-4">
            <p className="text-sm text-muted-foreground">Account Balance</p>
            <p className="mt-1 text-3xl font-bold">${authUser.balance || 0}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfilePage;
